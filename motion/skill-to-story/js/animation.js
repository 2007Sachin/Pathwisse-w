/* global PathwisseScene */
// skill-to-story — illustrative: a skill becomes work, work becomes an
// insight, the insight becomes a story you can tell (1920×1080, light).
// Illustrative only: no UI chrome, no screens, no scores, nothing "generated".
//
// Timeline (10 s seamless loop, ms):
//   0–900      skill chip at rest on the left; faint dotted trace across frame
//   500–2000   path draws skill → dataset; dataset lifts in to full presence
//   1700–3300  dataset cells highlight one by one (the work)
//   2500–3700  pen marks: a hand-drawn loop + underline over the found cells
//   3200–4500  path draws dataset → insight; highlighted fragments travel it
//   3700–5200  insight card assembles; its single rising line draws
//   4700–5900  path draws insight → story; work sample slides out behind
//   5000–6500  conversation card rises, its exchange fills in
//   6100–7100  path reaches the small orange destination, which warms
//   7100–8600  calm hold with micro-drift (poster frame 7800)
//   8600–10000 release: path clears from the left, later stages settle away,
//              marks lift, dataset dims back (t = 10000 ≡ t = 0)
class SkillToStory extends PathwisseScene {
  constructor(canvas) {
    super(canvas, {
      designW: 1920,
      designH: 1080,
      duration: 10000,
      theme: "light",
    });
    this.st = {
      skill: { x: 255, y: 600, s: 300 },
      data: { x: 655, y: 545, s: 380 },
      insight: { x: 1100, y: 615, s: 340 },
      story: { x: 1510, y: 555, s: 350 },
    };
    this.path = this.makePath([
      [255, 600],
      [450, 655],
      [655, 545],
      [880, 505],
      [1100, 615],
      [1300, 685],
      [1510, 555],
      [1680, 475],
      [1785, 515],
    ]);
    this.dest = this.path.pts[this.path.pts.length - 1];
    this.f = {
      data: this.fAtX(655),
      insight: this.fAtX(1100),
      story: this.fAtX(1510),
    };
  }

  // Local override of the base grid: fade toward a transparent copy of bg
  // (the shared vignette fades from transparent black, which greys light scenes).
  drawGrid(color) {
    const ctx = this.ctx;
    const W = this.designW;
    const H = this.designH;
    const step = Math.round(W / 22);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = step; x < W; x += step) {
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, H);
    }
    for (let y = step; y < H; y += step) {
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(W, y + 0.5);
    }
    ctx.stroke();
    const hex = this.C.bg.replace("#", "");
    const rgb = [0, 2, 4]
      .map((i) => parseInt(hex.slice(i, i + 2), 16))
      .join(", ");
    const v = ctx.createRadialGradient(
      W * 0.5,
      H * 0.5,
      H * 0.2,
      W * 0.5,
      H * 0.5,
      W * 0.62,
    );
    v.addColorStop(0, `rgba(${rgb}, 0)`);
    v.addColorStop(1, `rgba(${rgb}, 1)`);
    ctx.fillStyle = v;
    ctx.globalAlpha = 0.85;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  fAtX(x) {
    let best = 0;
    let d = Infinity;
    this.path.pts.forEach((p, i) => {
      const dd = Math.abs(p[0] - x);
      if (dd < d) {
        d = dd;
        best = this.path.lengths[i] / this.path.total;
      }
    });
    return best;
  }

  // Path head position: grows stage by stage with overlapping eases.
  drawnAt(t) {
    const { data, insight, story } = this.f;
    let d = this.lerp(0, data, this.ease(t, 500, 2000));
    d = this.lerp(d, insight, this.ease(t, 3200, 4500));
    d = this.lerp(d, story, this.ease(t, 4700, 5900));
    d = this.lerp(d, 1, this.ease(t, 6000, 7000));
    return d;
  }

  // Hand-drawn pen loop (partial by k) — an annotation mark, not UI.
  penLoop(cx, cy, rx, ry, k, rot) {
    if (k <= 0) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.strokeStyle = this.C.blueDeep;
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    const n = 60;
    const a0 = -2.6;
    const span = Math.PI * 2.15 * k;
    for (let i = 0; i <= n; i++) {
      const a = a0 + (span * i) / n;
      const wob = 1 + 0.05 * Math.sin(a * 3);
      const x = Math.cos(a) * rx * wob;
      const y = Math.sin(a) * ry * wob;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  render(t) {
    const C = this.C;
    const S = this.st;
    const out = this.ease(t, 8600, 9800); // global release
    const drawn = this.drawnAt(t);
    const clearFrom = this.ease(t, 8600, 9900);
    const destOn = this.hold(t, 6200, 7100, 8700, 9600);

    if (destOn > 0) {
      this.radial(
        this.dest[0],
        this.dest[1],
        240,
        this.rgba("orange", 0.12 * destOn),
      );
    }

    this.drawJourneyPath(this.path, clearFrom > 0 ? 1 : drawn, {
      from: clearFrom,
      width: 4,
      comet: clearFrom === 0,
      traceAlpha: 0.7,
    });

    // ── Stage 5 back layer: work sample behind the conversation card ──
    const ws = this.hold(t, 4900, 6200, 8600, 9500);
    {
      const s = S.story;
      const x = s.x + this.lerp(-20, -115, ws) + 4 * this.wave(t, 1, 2.2);
      const y = s.y + this.lerp(10, -175, ws) + 5 * this.wave(t, 2, 0.4);
      this.at(
        x,
        y,
        {
          rot: this.lerp(0, -0.06, ws),
          alpha: ws * 0.95,
          scale: 0.9 + 0.1 * ws,
        },
        () => this.workSample(220, this.ease(t, 5500, 6600) * (1 - out)),
      );
    }

    // ── Stage 1: skill chip ──
    {
      const s = S.skill;
      const on = 0.65 + 0.35 * this.hold(t, 0, 900, 8800, 9900);
      const lift = this.hold(t, 300, 1100, 8600, 9800);
      this.at(
        s.x + 4 * this.wave(t, 1, 0.3),
        s.y - 12 * lift + 5 * this.wave(t, 2, 1.1),
        { scale: 0.97 + 0.03 * lift },
        () => this.skillTile(s.s, on),
      );
    }

    // ── Stage 2+3: dataset, cell highlights, pen marks ──
    const dataIn = 0.35 + 0.65 * this.hold(t, 500, 1900, 8700, 9900);
    const mark = this.hold(t, 1700, 3300, 8500, 9500);
    const pen = this.hold(t, 2500, 3500, 8400, 9200);
    const pen2 = this.hold(t, 3100, 3700, 8400, 9200);
    {
      const s = S.data;
      const x = s.x + 4 * this.wave(t, 1, 1.4);
      const y =
        s.y +
        this.lerp(40, 0, (dataIn - 0.35) / 0.65) +
        5 * this.wave(t, 2, 2.3);
      this.at(
        x,
        y,
        {
          alpha: dataIn,
          scale: 0.94 + 0.06 * ((dataIn - 0.35) / 0.65),
          rot: this.lerp(-0.05, 0, (dataIn - 0.35) / 0.65),
        },
        () => {
          this.dataset(s.s, mark);
          const w = s.s;
          const h = s.s * 0.78;
          const cw = (w * 0.84) / 5;
          const ch = (h * 0.8) / 5;
          // Loop around the paired cells (row 2, cols 1–2).
          this.penLoop(
            -w * 0.42 + cw * 2,
            -h * 0.4 + ch * 2.5,
            cw * 1.25,
            ch * 0.78,
            pen,
            -0.06,
          );
          // Underline beneath the lone cell (row 3, col 3).
          if (pen2 > 0) {
            const ux = -w * 0.42 + cw * 3 + 4;
            const uy = -h * 0.4 + ch * 4 + 3;
            this.line(
              ux,
              uy,
              ux + (cw - 8) * pen2,
              uy - 2 * pen2,
              C.blueDeep,
              4,
            );
          }
        },
      );
    }

    // ── Hand-off fragments: highlighted cells travel data → insight ──
    {
      const s = S.data;
      const w = s.s;
      const h = s.s * 0.78;
      const cw = (w * 0.84) / 5;
      const ch = (h * 0.8) / 5;
      const cells = [
        [1, 2],
        [2, 1],
        [2, 2],
        [3, 3],
      ];
      cells.forEach(([r, c], i) => {
        const k = this.ease(t, 3300 + i * 140, 4500 + i * 140);
        if (k <= 0 || k >= 1) return;
        const sx = s.x - w * 0.42 + c * cw + cw / 2;
        const sy = s.y - h * 0.4 + r * ch + ch / 2;
        const p = this.pointAt(
          this.path,
          this.lerp(this.f.data, this.f.insight, k),
        );
        const bx = this.lerp(sx, p.x, Math.min(1, k * 2.2));
        const by = this.lerp(sy, p.y, Math.min(1, k * 2.2));
        const x = k < 0.45 ? bx : p.x;
        const y = k < 0.45 ? by : p.y;
        const a = Math.sin(Math.PI * k);
        this.at(x, y, { alpha: a, rot: k * 0.6 }, (ctx) => {
          this.roundRect(-11, -8, 22, 16, 4);
          ctx.fillStyle = this.rgba("blue", 0.75);
          ctx.fill();
        });
      });
    }

    // ── Stage 4: insight ──
    const ins = this.hold(t, 3800, 4900, 8600, 9500);
    {
      const s = S.insight;
      const x = s.x + 4 * this.wave(t, 1, 3.1);
      const y = s.y + this.lerp(50, 0, ins) + 5 * this.wave(t, 2, 0.2);
      this.at(
        x,
        y,
        { alpha: ins, scale: 0.9 + 0.1 * ins, rot: this.lerp(0.05, 0, ins) },
        () => this.insightCard(s.s, this.ease(t, 4200, 5300) * (1 - out)),
      );
    }

    // ── Stage 5: conversation / story ──
    const st = this.hold(t, 5000, 6300, 8600, 9500);
    {
      const s = S.story;
      const x = s.x + 4 * this.wave(t, 1, 4.4);
      const y = s.y + this.lerp(60, 0, st) + 5 * this.wave(t, 2, 1.7);
      this.at(
        x,
        y,
        { alpha: st, scale: 0.9 + 0.1 * st, rot: this.lerp(-0.05, 0, st) },
        () => this.conversationCard(s.s, this.ease(t, 5600, 6800) * (1 - out)),
      );
    }

    // Small orange destination accent at the story end.
    this.at(this.dest[0], this.dest[1], {}, () => {
      this.node(0, 0, 12, 0.4, "outline");
      this.at(0, 0, { alpha: destOn }, () => this.opportunity(12, destOn, t));
    });
  }
}
window.SkillToStory = SkillToStory;
