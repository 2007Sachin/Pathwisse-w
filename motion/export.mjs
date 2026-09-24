#!/usr/bin/env node
// Pathwisse motion exporter — adapted from the canvas-video skill's
// scripts/export.js. Differences: 30 fps web loops, frames are piped straight
// into ffmpeg (no PNG sequences on disk), and each scene is encoded to
// WebM (VP9), MP4 (H.264 fallback) and a WebP poster, all silent.
//
// puppeteer-core is intentionally NOT a project dependency. Install it in any
// scratch folder and point MOTION_TOOLS_DIR at it:
//
//   cd <scratch> && npm i puppeteer-core
//   MOTION_TOOLS_DIR=<scratch> CHROME_PATH=<chrome.exe> node motion/export.mjs [scene ...]
//
// Requires ffmpeg (with libvpx-vp9, libx264, libwebp) on PATH.
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FPS = 30;

// ── SCENES ── design space is set inside each class; w/h is output size.
const SCENES = {
  "pathwisse-hero-journey": {
    cls: "PathwisseHeroJourney",
    w: 960,
    h: 1120,
    duration: 10000,
    poster: 7600,
    out: "public/media/motion/home",
  },
  "student-fragments-to-path": {
    cls: "StudentFragmentsToPath",
    w: 1600,
    h: 900,
    duration: 9000,
    poster: 6400,
    out: "public/media/motion/students",
  },
  "skill-to-story": {
    cls: "SkillToStory",
    w: 1600,
    h: 900,
    duration: 10000,
    poster: 7800,
    out: "public/media/motion/students",
  },
  "employability-journey": {
    cls: "EmployabilityJourney",
    w: 1600,
    h: 900,
    duration: 12000,
    poster: 10000,
    out: "public/media/motion/how-it-works",
  },
  "institution-fragments-to-journey": {
    cls: "InstitutionFragmentsToJourney",
    w: 1600,
    h: 900,
    duration: 10000,
    poster: 8200,
    out: "public/media/motion/institutions",
  },
  "education-to-opportunity": {
    cls: "EducationToOpportunity",
    w: 1600,
    h: 900,
    duration: 9000,
    poster: 6800,
    out: "public/media/motion/about",
  },
};

const require = createRequire(
  join(process.env.MOTION_TOOLS_DIR || root, "package.json"),
);
const puppeteer = require("puppeteer-core");
const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

function run(args, input) {
  return new Promise((ok, fail) => {
    const p = spawn("ffmpeg", ["-hide_banner", "-loglevel", "error", ...args], {
      stdio: [input ? "pipe" : "ignore", "inherit", "inherit"],
    });
    p.on("error", fail);
    p.on("close", (code) =>
      code === 0 ? ok() : fail(new Error(`ffmpeg exited ${code}`)),
    );
    if (input) input(p.stdin);
  });
}

async function exportScene(browser, name) {
  const s = SCENES[name];
  if (!s) throw new Error(`Unknown scene ${name}`);
  const html = join(root, "motion", name, "animation.html");
  const outDir = join(root, s.out);
  mkdirSync(outDir, { recursive: true });
  const work = join(tmpdir(), `pathwisse-motion-${name}`);
  rmSync(work, { recursive: true, force: true });
  mkdirSync(work, { recursive: true });
  const master = join(work, "master.mkv");
  const frames = Math.round((s.duration / 1000) * FPS);

  const page = await browser.newPage();
  await page.setViewport({ width: s.w, height: s.h, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(html).href, { waitUntil: "load" });
  await page.waitForFunction("window.animation && window.animation.isPlaying");
  await page.evaluate(
    (w, h, cls) => {
      window.animation.stop();
      const canvas = document.getElementById("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      window.exportAnim = new window[cls](canvas);
      window.renderFrame = (t) => {
        window.exportAnim.renderAt(t);
        return canvas.toDataURL("image/png").split(",")[1];
      };
    },
    s.w,
    s.h,
    s.cls,
  );

  console.log(`${name}: ${frames} frames @ ${s.w}x${s.h}`);
  // Lossless master first, then web encodes from it.
  await run(
    [
      "-y",
      "-f",
      "image2pipe",
      "-framerate",
      String(FPS),
      "-c:v",
      "png",
      "-i",
      "-",
      "-c:v",
      "ffv1",
      "-pix_fmt",
      "yuv444p",
      master,
    ],
    async (stdin) => {
      for (let i = 0; i < frames; i++) {
        const b64 = await page.evaluate(
          (t) => window.renderFrame(t),
          (i / FPS) * 1000,
        );
        if (!stdin.write(Buffer.from(b64, "base64"))) {
          await new Promise((r) => stdin.once("drain", r));
        }
      }
      stdin.end();
    },
  );
  const posterPng = join(work, "poster.png");
  const b64 = await page.evaluate((t) => window.renderFrame(t), s.poster);
  const { writeFileSync } = await import("node:fs");
  writeFileSync(posterPng, Buffer.from(b64, "base64"));
  await page.close();

  const base = join(outDir, name);
  await run([
    "-y",
    "-i",
    master,
    "-an",
    "-c:v",
    "libvpx-vp9",
    "-b:v",
    "0",
    "-crf",
    String(s.crfWebm || 36),
    "-row-mt",
    "1",
    "-deadline",
    "good",
    "-cpu-used",
    "2",
    "-pix_fmt",
    "yuv420p",
    `${base}.webm`,
  ]);
  await run([
    "-y",
    "-i",
    master,
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    String(s.crfMp4 || 27),
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    `${base}.mp4`,
  ]);
  await run([
    "-y",
    "-i",
    posterPng,
    "-c:v",
    "libwebp",
    "-quality",
    "80",
    `${base}-poster.webp`,
  ]);
  rmSync(work, { recursive: true, force: true });

  for (const ext of [".webm", ".mp4", "-poster.webp"]) {
    const kb = (statSync(`${base}${ext}`).size / 1024).toFixed(0);
    console.log(`  ${s.out}/${name}${ext}  ${kb} KB`);
  }
}

const names = process.argv.slice(2).length
  ? process.argv.slice(2)
  : Object.keys(SCENES);
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--allow-file-access-from-files"],
});
try {
  for (const name of names) await exportScene(browser, name);
} finally {
  await browser.close();
}
