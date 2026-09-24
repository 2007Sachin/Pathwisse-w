/* global PATHWISSE_COLORS */
// Shared base for every Pathwisse canvas motion graphic.
//
// Follows the canvas-video skill architecture (time-based animate loop,
// progress/easeOut/easeInOut/lerp utilities, no DOM drawing) and adds the
// Pathwisse shape vocabulary: thin blue paths, circular nodes, rounded paper
// cards, restrained shadows, soft radial depth and an orange destination.
//
// Scenes draw in a fixed design space (designW × designH) and are scaled to
// the canvas, so the exporter can render at any resolution.
//
// Loop rule: every scene must look identical at t = 0 and t = duration.
// Use `wave()` (integer cycles per loop) for ambient drift and `hold()` for
// build-then-release envelopes so exported loops never visibly restart.
(function () {
  const C = PATHWISSE_COLORS;
  const TAU = Math.PI * 2;

  class PathwisseScene {
    constructor(canvas, options = {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.width = canvas.width;
      this.height = canvas.height;
      this.designW = options.designW || 1920;
      this.designH = options.designH || 1080;
      this.duration = options.duration || 10000;
      this.theme = options.theme || "light";
      this.startTime = null;
      this.isPlaying = false;
      this.C = C;
    }

    // ─── UTILITY METHODS (skill contract) ───
    progress(t, s, e) {
      return t < s ? 0 : t > e ? 1 : (t - s) / (e - s);
    }
    easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }
    easeInOut(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    lerp(a, b, t) {
      return a + (b - a) * t;
    }

    // ─── MAIN LOOP (skill contract) ───
    animate(timestamp) {
      if (!this.isPlaying) return;
      if (!this.startTime) this.startTime = timestamp;
      const t = (timestamp - this.startTime) % this.duration;
      this.renderAt(t);
      requestAnimationFrame((ts) => this.animate(ts));
    }
    /** Draw one frame at time t (ms). Subclasses implement render(t). */
    renderAt(t) {
      const ctx = this.ctx;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, this.width, this.height);
      ctx.setTransform(
        this.width / this.designW,
        0,
        0,
        this.height / this.designH,
        0,
        0,
      );
      ctx.globalAlpha = 1;
      this.drawBackground(t);
      this.render(t);
    }
    render() {}
    start() {
      this.isPlaying = true;
      this.startTime = null;
      requestAnimationFrame((ts) => this.animate(ts));
    }
    stop() {
      this.isPlaying = false;
    }
    restart() {
      this.startTime = null;
      if (!this.isPlaying) this.start();
    }

    // ─── EXTRA TIMING HELPERS ───
    clamp(v, lo = 0, hi = 1) {
      return Math.min(hi, Math.max(lo, v));
    }
    /** Eased 0→1 between s and e. */
    ease(t, s, e) {
      return this.easeInOut(this.progress(t, s, e));
    }
    /** 0→1 (eased) over [inS,inE], hold, then 1→0 over [outS,outE]. */
    hold(t, inS, inE, outS, outE) {
      const a = this.easeInOut(this.progress(t, inS, inE));
      const b = 1 - this.easeInOut(this.progress(t, outS, outE));
      return Math.min(a, b);
    }
    /** Periodic drift that completes `cycles` whole cycles per loop. */
    wave(t, cycles = 1, phase = 0) {
      return Math.sin((TAU * cycles * t) / this.duration + phase);
    }
    rgba(name, a) {
      return `rgba(${C.rgb[name]}, ${a})`;
    }

    // ─── BACKGROUNDS ───
    drawBackground(t) {
      const ctx = this.ctx;
      const w = this.designW;
      const h = this.designH;
      if (this.theme === "ink") {
        const g = ctx.createLinearGradient(w * 0.2, 0, w * 0.8, h);
        g.addColorStop(0, C.inkRaised);
        g.addColorStop(1, C.inkDeep);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
        this.radial(
          w * 0.18,
          h * 0.88,
          Math.max(w, h) * 0.55,
          this.rgba("blue", 0.42),
        );
        this.radial(
          w * 0.8,
          h * 0.14,
          Math.max(w, h) * 0.42,
          this.rgba("blue", 0.18),
        );
        this.drawGrid(this.rgba("white", 0.045), t);
      } else {
        ctx.fillStyle = C.bg;
        ctx.fillRect(0, 0, w, h);
        this.radial(
          w * 0.82,
          h * 0.12,
          Math.max(w, h) * 0.6,
          this.rgba("blue", 0.07),
        );
        this.radial(
          w * 0.15,
          h * 0.95,
          Math.max(w, h) * 0.45,
          this.rgba("blue", 0.05),
        );
        this.drawGrid(this.rgba("ink", 0.035), t);
      }
    }
    radial(x, y, r, color) {
      const ctx = this.ctx;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color);
      // Fade to the same colour at zero alpha (never transparent black, which
      // greys out light backgrounds).
      g.addColorStop(1, color.replace(/,\s*[\d.]+\)$/, ", 0)"));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, this.designW, this.designH);
    }
    drawGrid(color) {
      const ctx = this.ctx;
      const step = Math.round(this.designW / 22);
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = step; x < this.designW; x += step) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, this.designH);
      }
      for (let y = step; y < this.designH; y += step) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(this.designW, y + 0.5);
      }
      ctx.stroke();
      // Vignette so the grid fades toward the frame edges.
      const v = ctx.createRadialGradient(
        this.designW * 0.55,
        this.designH * 0.45,
        this.designH * 0.2,
        this.designW * 0.55,
        this.designH * 0.45,
        this.designW * 0.75,
      );
      const edge = this.theme === "ink" ? "5, 15, 31" : "248, 250, 252"; // inkDeep / bg
      v.addColorStop(0, `rgba(${edge}, 0)`);
      v.addColorStop(1, `rgba(${edge}, 1)`);
      ctx.fillStyle = v;
      ctx.globalAlpha = 0.85;
      ctx.fillRect(0, 0, this.designW, this.designH);
      ctx.restore();
    }

    // ─── PATHS ───
    /** Smooth Catmull-Rom path through points, sampled for partial drawing. */
    makePath(points, samplesPerSegment = 40) {
      const pts = [];
      const p = [points[0], ...points, points[points.length - 1]];
      for (let i = 1; i < p.length - 2; i++) {
        const [p0, p1, p2, p3] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
        for (let s = 0; s < samplesPerSegment; s++) {
          const u = s / samplesPerSegment;
          const u2 = u * u;
          const u3 = u2 * u;
          const f = (a, b, c, d) =>
            0.5 *
            (2 * b +
              (-a + c) * u +
              (2 * a - 5 * b + 4 * c - d) * u2 +
              (-a + 3 * b - 3 * c + d) * u3);
          pts.push([
            f(p0[0], p1[0], p2[0], p3[0]),
            f(p0[1], p1[1], p2[1], p3[1]),
          ]);
        }
      }
      pts.push(points[points.length - 1]);
      const lengths = [0];
      for (let i = 1; i < pts.length; i++) {
        lengths.push(
          lengths[i - 1] +
            Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]),
        );
      }
      return { pts, lengths, total: lengths[lengths.length - 1] };
    }
    pointAt(path, f) {
      const target = this.clamp(f) * path.total;
      let i = 1;
      while (i < path.lengths.length - 1 && path.lengths[i] < target) i++;
      const a = path.pts[i - 1];
      const b = path.pts[i];
      const seg = path.lengths[i] - path.lengths[i - 1] || 1;
      const u = (target - path.lengths[i - 1]) / seg;
      return {
        x: this.lerp(a[0], b[0], u),
        y: this.lerp(a[1], b[1], u),
        angle: Math.atan2(b[1] - a[1], b[0] - a[0]),
      };
    }
    /** Stroke the section of `path` between fractions `from` and `to`. */
    strokePath(path, from, to, style = {}) {
      if (to <= from) return;
      const ctx = this.ctx;
      const a = this.clamp(from) * path.total;
      const b = this.clamp(to) * path.total;
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = style.color || C.blue;
      ctx.lineWidth = style.width || 4;
      ctx.globalAlpha *= style.alpha ?? 1;
      if (style.dash) ctx.setLineDash(style.dash);
      if (style.glow) {
        ctx.shadowColor = style.glow;
        ctx.shadowBlur = style.glowBlur || 18;
      }
      ctx.beginPath();
      let started = false;
      for (let i = 0; i < path.pts.length; i++) {
        const l = path.lengths[i];
        if (l < a) continue;
        if (l > b) {
          const q = this.pointAt(path, b / path.total);
          ctx.lineTo(q.x, q.y);
          break;
        }
        if (!started) {
          const q = this.pointAt(path, a / path.total);
          ctx.moveTo(q.x, q.y);
          started = true;
        }
        ctx.lineTo(path.pts[i][0], path.pts[i][1]);
      }
      ctx.stroke();
      ctx.restore();
    }
    /** The signature path: faint full trace, drawn stroke, bright comet head. */
    drawJourneyPath(path, drawn, opts = {}) {
      const dark = this.theme === "ink";
      const trace = opts.traceAlpha ?? 0.9;
      this.strokePath(path, 0, 1, {
        color: dark ? this.rgba("white", 0.12) : this.rgba("blue", 0.14),
        width: opts.width || 3,
        dash: [2, 12],
        alpha: trace,
      });
      this.strokePath(path, opts.from || 0, drawn, {
        color: dark ? C.blueBright : C.blue,
        width: opts.width || 4,
        glow: dark ? this.rgba("blueBright", 0.55) : null,
        glowBlur: 16,
      });
      if (
        opts.comet !== false &&
        drawn > (opts.from || 0) + 0.01 &&
        drawn < 0.995
      ) {
        const len = 0.06;
        this.strokePath(path, Math.max(opts.from || 0, drawn - len), drawn, {
          color: dark ? C.bluePale : C.blueBright,
          width: (opts.width || 4) + 1.5,
          glow: this.rgba(dark ? "bluePale" : "blueBright", 0.8),
          glowBlur: 22,
        });
      }
    }

    // ─── PRIMITIVES ───
    roundRect(x, y, w, h, r) {
      const ctx = this.ctx;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
    }
    /** Transform wrapper: translate to (x,y), rotate, scale, set alpha. */
    at(x, y, { rot = 0, scale = 1, alpha = 1 } = {}, draw) {
      if (alpha <= 0.001) return;
      const ctx = this.ctx;
      ctx.save();
      ctx.translate(x, y);
      if (rot) ctx.rotate(rot);
      if (scale !== 1) ctx.scale(scale, scale);
      ctx.globalAlpha *= alpha;
      draw(ctx);
      ctx.restore();
    }
    shadow(on = true, strength = 1) {
      const ctx = this.ctx;
      if (!on) {
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        return;
      }
      const dark = this.theme === "ink";
      ctx.shadowColor = dark
        ? `rgba(0,0,0,${0.42 * strength})`
        : this.rgba("ink", 0.12 * strength);
      ctx.shadowBlur = 38 * strength;
      ctx.shadowOffsetY = 16 * strength;
    }
    /** Rounded paper card centred on the local origin. */
    paper(w, h, { fill = C.paper, radius = 14, shadow = 1, stroke } = {}) {
      const ctx = this.ctx;
      ctx.save();
      this.shadow(shadow > 0, shadow);
      this.roundRect(-w / 2, -h / 2, w, h, radius);
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.restore();
      if (stroke || this.theme !== "ink") {
        this.roundRect(-w / 2 + 0.5, -h / 2 + 0.5, w - 1, h - 1, radius);
        ctx.strokeStyle = stroke || this.rgba("ink", 0.08);
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }
    /** Non-readable text stand-in: a rounded bar. */
    bar(x, y, w, h, color, a = 1) {
      const ctx = this.ctx;
      ctx.save();
      ctx.globalAlpha *= a;
      ctx.fillStyle = color;
      this.roundRect(x, y, w, h, h / 2);
      ctx.fill();
      ctx.restore();
    }
    line(x1, y1, x2, y2, color, width = 2, a = 1) {
      const ctx = this.ctx;
      ctx.save();
      ctx.globalAlpha *= a;
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    }
    /** Journey node. state: 'outline' | 'filled' | 'dest'. `on` 0..1 warms it. */
    node(x, y, r, on = 1, state = "filled") {
      const ctx = this.ctx;
      const dark = this.theme === "ink";
      ctx.save();
      if (state === "dest") {
        const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 5);
        glow.addColorStop(0, this.rgba("orange", 0.42 * on));
        glow.addColorStop(1, this.rgba("orange", 0));
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, r * 5, 0, TAU);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, r, 0, TAU);
        ctx.fillStyle = dark ? C.orangeSoft : C.orange;
        ctx.globalAlpha *= 0.35 + 0.65 * on;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = C.orange;
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, TAU);
        ctx.fillStyle = dark ? C.inkDeep : C.surface;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = dark ? C.blueBright : C.blue;
        ctx.globalAlpha *= 0.45 + 0.55 * on;
        ctx.stroke();
        if (state === "filled" && on > 0) {
          ctx.beginPath();
          ctx.arc(x, y, r * 0.48 * on, 0, TAU);
          ctx.fillStyle = dark ? C.bluePale : C.blue;
          ctx.fill();
        }
      }
      ctx.restore();
    }
    /** Soft concentric rings used for gentle "arrival" pulses. */
    rings(x, y, r, a, color = "orange") {
      const ctx = this.ctx;
      ctx.save();
      for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        ctx.arc(x, y, r * (1.6 + i * 0.8), 0, TAU);
        ctx.strokeStyle = this.rgba(color, a * (0.35 - i * 0.14));
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.restore();
    }

    // ─── PATHWISSE OBJECT VOCABULARY ───
    // Each draws centred on the local origin at nominal size `s` (px width).

    compass(s, needle = 0, on = 1) {
      const ctx = this.ctx;
      const r = s / 2;
      ctx.save();
      this.shadow(true, 0.9);
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, TAU);
      ctx.fillStyle = C.paper;
      ctx.fill();
      this.shadow(false);
      ctx.lineWidth = r * 0.07;
      ctx.strokeStyle = C.blue;
      ctx.globalAlpha *= 0.6 + 0.4 * on;
      ctx.stroke();
      ctx.globalAlpha = 1;
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * TAU;
        const inner = i % 3 === 0 ? r * 0.68 : r * 0.78;
        this.line(
          Math.cos(a) * inner,
          Math.sin(a) * inner,
          Math.cos(a) * r * 0.86,
          Math.sin(a) * r * 0.86,
          this.rgba("ink", 0.35),
          r * 0.03,
        );
      }
      ctx.rotate(needle);
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.62);
      ctx.lineTo(r * 0.12, 0);
      ctx.lineTo(-r * 0.12, 0);
      ctx.closePath();
      ctx.fillStyle = C.orange;
      ctx.globalAlpha = 0.5 + 0.5 * on;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(0, r * 0.62);
      ctx.lineTo(r * 0.12, 0);
      ctx.lineTo(-r * 0.12, 0);
      ctx.closePath();
      ctx.fillStyle = C.ink;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.08, 0, TAU);
      ctx.fillStyle = C.paper;
      ctx.fill();
      ctx.restore();
    }

    notebook(s, fill = 1) {
      const w = s;
      const h = s * 1.28;
      this.paper(w, h, { radius: s * 0.06 });
      this.bar(-w * 0.36, -h * 0.38, w * 0.42, h * 0.06, C.blue);
      for (let i = 0; i < 5; i++) {
        const lw = i === 3 ? 0.55 : 0.72;
        this.bar(
          -w * 0.36,
          -h * 0.2 + i * h * 0.1,
          w * lw * Math.min(1, fill * 1.2),
          h * 0.022,
          this.rgba("ink", 0.2),
        );
      }
      // Ring binding
      for (let i = 0; i < 6; i++) {
        const y = -h * 0.4 + i * h * 0.16;
        this.line(
          -w * 0.5 - s * 0.02,
          y,
          -w * 0.5 + s * 0.06,
          y,
          C.borderStrong,
          s * 0.025,
        );
      }
    }

    skillTile(s, on = 1) {
      const ctx = this.ctx;
      const w = s;
      const h = s * 0.62;
      this.paper(w, h, { radius: h * 0.5, fill: C.paper });
      ctx.save();
      ctx.beginPath();
      ctx.arc(-w * 0.3, 0, h * 0.26, 0, TAU);
      ctx.fillStyle = C.blue;
      ctx.globalAlpha *= 0.55 + 0.45 * on;
      ctx.fill();
      ctx.restore();
      // Small hexagon glyph inside the dot
      ctx.save();
      ctx.strokeStyle = C.white;
      ctx.lineWidth = s * 0.018;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * TAU + Math.PI / 6;
        const px = -w * 0.3 + Math.cos(a) * h * 0.12;
        const py = Math.sin(a) * h * 0.12;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
      this.bar(
        -w * 0.08,
        -h * 0.1,
        w * 0.46 * on + w * 0.02,
        h * 0.1,
        C.ink,
        0.75,
      );
      this.bar(-w * 0.08, h * 0.08, w * 0.3, h * 0.08, this.rgba("ink", 0.22));
    }

    projectSheet(s, build = 1) {
      const w = s;
      const h = s * 0.74;
      this.paper(w, h, { radius: s * 0.05 });
      this.bar(-w * 0.42, -h * 0.4, w * 0.36, h * 0.07, C.ink, 0.8);
      // Three module blocks that "build" in
      for (let i = 0; i < 3; i++) {
        const a = this.clamp(build * 3 - i);
        const bx = -w * 0.42 + i * w * 0.29;
        this.ctx.save();
        this.ctx.globalAlpha *= a;
        this.roundRect(bx, -h * 0.18, w * 0.25, h * 0.36, s * 0.025);
        this.ctx.fillStyle =
          i === 1 ? this.rgba("blue", 0.9) : this.rgba("blue", 0.14);
        this.ctx.fill();
        this.ctx.restore();
      }
      this.bar(-w * 0.42, h * 0.28, w * 0.7, h * 0.045, this.rgba("ink", 0.18));
    }

    laptop(s, screenOn = 1) {
      const ctx = this.ctx;
      const w = s;
      const h = s * 0.62;
      ctx.save();
      this.shadow(true, 0.9);
      this.roundRect(-w / 2, -h / 2, w, h, s * 0.03);
      ctx.fillStyle = C.ink;
      ctx.fill();
      this.shadow(false);
      this.roundRect(
        -w / 2 + s * 0.03,
        -h / 2 + s * 0.03,
        w - s * 0.06,
        h - s * 0.06,
        s * 0.015,
      );
      ctx.fillStyle = C.inkRaised;
      ctx.fill();
      ctx.globalAlpha *= screenOn;
      // A document on screen (work in progress) — no app UI, no charts.
      this.roundRect(-w * 0.24, -h * 0.36, w * 0.48, h * 0.72, s * 0.012);
      ctx.fillStyle = C.paper;
      ctx.fill();
      this.bar(-w * 0.19, -h * 0.28, w * 0.2, h * 0.05, C.blue);
      this.roundRect(-w * 0.19, -h * 0.17, w * 0.38, h * 0.2, s * 0.01);
      ctx.fillStyle = this.rgba("blue", 0.14);
      ctx.fill();
      for (let i = 0; i < 4; i++) {
        this.bar(
          -w * 0.19,
          h * 0.08 + i * h * 0.065,
          w * (i === 3 ? 0.22 : 0.36),
          h * 0.03,
          this.rgba("ink", 0.25),
        );
      }
      ctx.restore();
      // Base
      ctx.save();
      this.roundRect(
        -w * 0.58,
        h / 2 - s * 0.005,
        w * 1.16,
        s * 0.045,
        s * 0.02,
      );
      ctx.fillStyle = C.borderStrong;
      ctx.fill();
      ctx.restore();
    }

    workSample(s, reveal = 1) {
      const w = s;
      const h = s * 1.2;
      this.ctx.save();
      this.ctx.translate(s * 0.06, -s * 0.06);
      this.paper(w, h, { radius: s * 0.05, fill: C.paperBack, shadow: 0.4 });
      this.ctx.restore();
      this.paper(w, h, { radius: s * 0.05 });
      // Hero band with abstract image block
      this.ctx.save();
      this.roundRect(-w * 0.4, -h * 0.4, w * 0.8, h * 0.34, s * 0.03);
      this.ctx.fillStyle = this.rgba("blue", 0.12);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.moveTo(-w * 0.34, -h * 0.12);
      this.ctx.lineTo(-w * 0.12, -h * 0.3);
      this.ctx.lineTo(w * 0.04, -h * 0.18);
      this.ctx.lineTo(w * 0.18, -h * 0.27);
      this.ctx.lineTo(w * 0.34, -h * 0.12);
      this.ctx.strokeStyle = C.blue;
      this.ctx.lineWidth = s * 0.025;
      this.ctx.lineJoin = "round";
      this.ctx.stroke();
      this.ctx.restore();
      for (let i = 0; i < 4; i++) {
        const a = this.clamp(reveal * 4 - i);
        this.bar(
          -w * 0.4,
          h * 0.02 + i * h * 0.09,
          w * (i === 0 ? 0.5 : 0.76 - i * 0.08) * a,
          h * 0.035,
          i === 0 ? C.ink : this.rgba("ink", 0.2),
          i === 0 ? 0.8 : 1,
        );
      }
    }

    conversationCard(s, dots = 1) {
      const ctx = this.ctx;
      const w = s;
      const h = s * 0.62;
      ctx.save();
      this.shadow(true);
      ctx.beginPath();
      ctx.roundRect(-w / 2, -h / 2, w, h, s * 0.1);
      ctx.moveTo(-w * 0.22, h / 2 - 1);
      ctx.lineTo(-w * 0.32, h / 2 + s * 0.14);
      ctx.lineTo(-w * 0.06, h / 2 - 1);
      ctx.fillStyle = C.paper;
      ctx.fill();
      ctx.restore();
      // Two speakers as circles + message bars (no people, no text)
      ctx.save();
      ctx.beginPath();
      ctx.arc(-w * 0.3, -h * 0.12, s * 0.07, 0, TAU);
      ctx.fillStyle = this.rgba("blue", 0.2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(w * 0.3, h * 0.14, s * 0.07, 0, TAU);
      ctx.fillStyle = C.blue;
      ctx.fill();
      ctx.restore();
      this.bar(
        -w * 0.18,
        -h * 0.17,
        w * 0.4 * this.clamp(dots * 2),
        h * 0.1,
        this.rgba("ink", 0.22),
      );
      this.bar(
        -w * 0.18 + w * 0.02,
        h * 0.09,
        w * 0.32 * this.clamp(dots * 2 - 1),
        h * 0.1,
        this.rgba("blue", 0.5),
      );
    }

    certificate(s) {
      const w = s;
      const h = s * 0.72;
      this.paper(w, h, { radius: s * 0.04 });
      const ctx = this.ctx;
      ctx.save();
      ctx.strokeStyle = this.rgba("blue", 0.35);
      ctx.lineWidth = s * 0.012;
      this.roundRect(-w * 0.42, -h * 0.4, w * 0.84, h * 0.8, s * 0.02);
      ctx.stroke();
      ctx.restore();
      this.bar(-w * 0.26, -h * 0.2, w * 0.52, h * 0.07, C.ink, 0.7);
      this.bar(-w * 0.2, -h * 0.04, w * 0.4, h * 0.04, this.rgba("ink", 0.2));
      ctx.save();
      ctx.beginPath();
      ctx.arc(w * 0.22, h * 0.2, s * 0.08, 0, TAU);
      ctx.fillStyle = this.rgba("blue", 0.85);
      ctx.fill();
      ctx.restore();
    }

    courseCard(s) {
      const w = s;
      const h = s * 0.7;
      this.paper(w, h, { radius: s * 0.05 });
      const ctx = this.ctx;
      ctx.save();
      this.roundRect(-w * 0.4, -h * 0.36, w * 0.8, h * 0.4, s * 0.03);
      ctx.fillStyle = this.rgba("ink", 0.85);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-w * 0.05, -h * 0.26);
      ctx.lineTo(w * 0.09, -h * 0.16);
      ctx.lineTo(-w * 0.05, -h * 0.06);
      ctx.closePath();
      ctx.fillStyle = C.white;
      ctx.fill();
      ctx.restore();
      this.bar(-w * 0.4, h * 0.14, w * 0.5, h * 0.06, C.ink, 0.7);
      this.bar(-w * 0.4, h * 0.26, w * 0.68, h * 0.045, this.rgba("ink", 0.2));
    }

    assignment(s) {
      const w = s * 0.8;
      const h = s;
      this.paper(w, h, { radius: s * 0.04 });
      for (let i = 0; i < 4; i++) {
        const y = -h * 0.3 + i * h * 0.18;
        const ctx = this.ctx;
        ctx.save();
        // Plain bullets — no ticks or completion states.
        ctx.beginPath();
        ctx.arc(-w * 0.33, y, s * 0.022, 0, TAU);
        ctx.fillStyle = this.rgba("blue", 0.55);
        ctx.fill();
        ctx.restore();
        this.bar(
          -w * 0.18,
          y - h * 0.018,
          w * (0.46 - i * 0.05),
          h * 0.036,
          this.rgba("ink", 0.22),
        );
      }
    }

    /** Training / workshop: a small board with a simple concept diagram. */
    trainingBoard(s) {
      const w = s;
      const h = s * 0.66;
      this.paper(w, h, { radius: s * 0.04, fill: C.surface });
      const ctx = this.ctx;
      // Three linked ideas — deliberately not a chart or trend line.
      const pts = [
        [-w * 0.22, h * 0.12],
        [0, -h * 0.1],
        [w * 0.22, h * 0.12],
      ];
      ctx.save();
      ctx.strokeStyle = this.rgba("blue", 0.55);
      ctx.lineWidth = s * 0.012;
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      ctx.lineTo(pts[1][0], pts[1][1]);
      ctx.lineTo(pts[2][0], pts[2][1]);
      ctx.stroke();
      pts.forEach(([px, py], i) => {
        ctx.beginPath();
        ctx.arc(px, py, s * 0.055, 0, TAU);
        ctx.fillStyle = i === 1 ? C.blue : C.surface;
        ctx.fill();
        ctx.strokeStyle = C.blue;
        ctx.lineWidth = s * 0.014;
        ctx.stroke();
      });
      ctx.restore();
      this.bar(-w * 0.38, -h * 0.34, w * 0.4, h * 0.07, C.ink, 0.7);
      this.line(
        -w * 0.2,
        h / 2,
        -w * 0.28,
        h / 2 + s * 0.16,
        C.borderStrong,
        s * 0.02,
      );
      this.line(
        w * 0.2,
        h / 2,
        w * 0.28,
        h / 2 + s * 0.16,
        C.borderStrong,
        s * 0.02,
      );
    }

    /** Work sheet: rows of words (5×5 cells); `mark` highlights a few like
     *  a highlighter pen. Deliberately text-like — not a table of values. */
    dataset(s, mark = 0) {
      const w = s;
      const h = s * 0.78;
      this.paper(w, h, { radius: s * 0.04 });
      const cols = 5;
      const rows = 5;
      const cw = (w * 0.84) / cols;
      const ch = (h * 0.8) / rows;
      const highlighted = [7, 11, 12, 18];
      const widths = [0.9, 0.6, 0.8, 0.7, 0.5];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          if (r === rows - 1 && c > 2) continue; // ragged last line
          const x = -w * 0.42 + c * cw;
          const y = -h * 0.4 + r * ch + ch / 2;
          const ww = (cw - 10) * widths[(i * 3) % widths.length];
          const hot = highlighted.indexOf(i);
          const a = hot >= 0 ? this.clamp(mark * 4 - hot) : 0;
          if (a > 0) {
            this.ctx.save();
            this.ctx.globalAlpha *= a;
            this.roundRect(x, y - ch * 0.26, (cw - 4) * a, ch * 0.52, 4);
            this.ctx.fillStyle = this.rgba("blue", 0.22);
            this.ctx.fill();
            this.ctx.restore();
          }
          this.bar(
            x + 3,
            y - ch * 0.07,
            ww,
            ch * 0.14,
            r === 0 && c < 2 ? C.ink : this.rgba("ink", 0.24),
            r === 0 && c < 2 ? 0.7 : 1,
          );
        }
      }
    }

    /** Insight: a note card where one line becomes highlighted, with a small
     *  blue spark. No axes, trend lines, or values. */
    insightCard(s, on = 1) {
      const w = s;
      const h = s * 0.7;
      this.paper(w, h, { radius: s * 0.05 });
      const ctx = this.ctx;
      const lines = [
        [-0.4, -0.26, 0.5, C.ink, 0.75],
        [-0.4, -0.08, 0.74, this.rgba("ink", 0.2), 1],
        [-0.4, 0.08, 0.66, this.rgba("ink", 0.2), 1],
        [-0.4, 0.24, 0.42, this.rgba("ink", 0.2), 1],
      ];
      // Highlight sweeps across the key line.
      const k = this.clamp(on * 1.25);
      if (k > 0) {
        ctx.save();
        this.roundRect(-w * 0.43, 0, w * 0.8 * k, h * 0.16, s * 0.02);
        ctx.fillStyle = this.rgba("blue", 0.18);
        ctx.fill();
        ctx.restore();
      }
      lines.forEach(([x, y, lw, color, a], i) => {
        const hot = i === 2 && k > 0;
        this.bar(
          x * w,
          y * h - h * 0.025,
          lw * w,
          h * 0.05,
          hot ? C.blue : color,
          hot ? 0.4 + 0.6 * k : a,
        );
      });
      if (on > 0.85) {
        const a = this.clamp((on - 0.85) / 0.15);
        ctx.save();
        ctx.globalAlpha *= a;
        ctx.beginPath();
        ctx.arc(w * 0.36, -h * 0.26, s * 0.045, 0, TAU);
        ctx.fillStyle = C.blue;
        ctx.fill();
        this.rings(w * 0.36, -h * 0.26, s * 0.03, a, "blue");
        ctx.restore();
      }
    }

    /** Orange opportunity destination (only warm colour in any scene). */
    opportunity(r, on = 1, t = 0) {
      const breathe = 1 + 0.04 * this.wave(t, 2);
      this.node(0, 0, r * breathe, on, "dest");
      if (on > 0.05) this.rings(0, 0, r * breathe, on * 0.9);
    }
  }

  window.PathwisseScene = PathwisseScene;
})();
