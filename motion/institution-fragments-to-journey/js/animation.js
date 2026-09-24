/* global PathwisseScene */
// institution-fragments-to-journey — institutions page (16:9, light).
//
// Conceptual only: separate institutional activities (courses, projects,
// training, workshops, placement preparation) bend into one student
// development path, which then sits among other individual paths heading
// toward a shared destination region. Abstract lines, nodes and paper
// objects only: no people, numbers, charts, badges, check marks or text.
//
// Timeline (10 s loop, ms):
//   0–1400     Phase A  five disconnected dashed lanes, one object each,
//                       slightly misaligned and drifting independently
//   1400–4200  Phase B  lane segments bend onto one path (staggered) while
//                       objects glide to their places beside it
//   2600–5200           the blue path draws through every segment
//   5000–5800           path arrives; orange destination warms
//   4800–7700  Phase C  four softer individual paths draw in and converge
//                       on the shared destination region
//   7700–8600  Phase D  calm hold (poster frame 8200 = fully resolved)
//   8600–10000          release: cohort fades, path retracts, segments
//                       unbend into lanes, objects drift home (t=10000 ≡ 0)
class InstitutionFragmentsToJourney extends PathwisseScene {
  constructor(canvas) {
    super(canvas, {
      designW: 1920,
      designH: 1080,
      duration: 10000,
      theme: "light",
    });

    this.path = this.makePath([
      [150, 640],
      [255, 590],
      [370, 560],
      [525, 570],
      [680, 620],
      [840, 605],
      [990, 530],
      [1140, 540],
      [1290, 600],
      [1430, 585],
      [1560, 525],
      [1670, 525],
      [1755, 540],
    ]);
    this.dest = this.path.pts[this.path.pts.length - 1];

    // Lane (Phase A) pose → path node + object pose (Phase B/C).
    // ly: lane y; lx: lane centre x; tilt: lane angle; node: point on path;
    // oy: object offset from node (alternating above / below).
    const defs = [
      {
        draw: "courseCard",
        s: 250,
        lx: 480,
        ly: 225,
        tilt: -0.025,
        node: [370, 560],
        oy: -215,
        r: -0.02,
      },
      {
        draw: "projectSheet",
        s: 245,
        lx: 1260,
        ly: 385,
        tilt: 0.03,
        node: [680, 620],
        oy: 215,
        r: 0.02,
      },
      {
        draw: "trainingBoard",
        s: 245,
        lx: 740,
        ly: 550,
        tilt: -0.015,
        node: [990, 530],
        oy: -230,
        r: -0.015,
      },
      {
        draw: "workshopBoard",
        s: 240,
        lx: 1480,
        ly: 710,
        tilt: 0.035,
        node: [1290, 600],
        oy: 205,
        r: 0.02,
      },
      {
        draw: "conversationCard",
        s: 235,
        lx: 1000,
        ly: 870,
        tilt: -0.03,
        node: [1560, 525],
        oy: -235,
        r: -0.02,
      },
    ];
    this.laneHalf = 300; // half-length of each lane segment
    this.win = 150 / this.path.total; // half-window on the path per lane
    this.objects = defs.map((d, i) => ({
      ...d,
      f: this.nearestF(this.path, d.node),
      dr: [-0.06, 0.05, -0.04, 0.06, -0.05][i],
    }));

    // Other individual student paths (Phase C) converging near the destination.
    const [dx, dy] = this.dest;
    this.cohort = [
      [
        [150, 225],
        [440, 195],
        [790, 245],
        [1150, 215],
        [1450, 320],
        [1640, 460],
        [dx - 8, dy - 14],
      ],
      [
        [150, 430],
        [420, 470],
        [760, 425],
        [1100, 430],
        [1400, 470],
        [1610, 505],
        [dx - 10, dy - 5],
      ],
      [
        [150, 800],
        [470, 835],
        [830, 775],
        [1140, 820],
        [1430, 720],
        [1630, 590],
        [dx - 8, dy + 8],
      ],
      [
        [150, 945],
        [500, 955],
        [870, 925],
        [1210, 935],
        [1480, 800],
        [1660, 620],
        [dx - 6, dy + 14],
      ],
    ].map((pts, k) => ({
      path: this.makePath(pts),
      start: 4800 + k * 300,
      nodes: [0.28 + (k % 2) * 0.08, 0.58 - (k % 2) * 0.06],
    }));
  }

  // ─── helpers (scene-local) ───
  // Light background with gradients that fade to a transparent version of
  // their own colour (fading to transparent black greys out light scenes).
  radial(x, y, r, color) {
    const ctx = this.ctx;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color);
    g.addColorStop(1, color.replace(/,\s*[\d.]+\)$/, ", 0)"));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, this.designW, this.designH);
  }
  drawBackground() {
    const ctx = this.ctx;
    const w = this.designW;
    const h = this.designH;
    const C = this.C;
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
    const step = Math.round(w / 22);
    ctx.save();
    ctx.strokeStyle = this.rgba("ink", 0.035);
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = step; x < w; x += step) {
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, h);
    }
    for (let y = step; y < h; y += step) {
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(w, y + 0.5);
    }
    ctx.stroke();
    const bg = C.bg
      .match(/\w\w/g)
      .map((v) => parseInt(v, 16))
      .join(", ");
    const v = ctx.createRadialGradient(
      w * 0.55,
      h * 0.45,
      h * 0.2,
      w * 0.55,
      h * 0.45,
      w * 0.75,
    );
    v.addColorStop(0, `rgba(${bg}, 0)`);
    v.addColorStop(1, `rgba(${bg}, 0.85)`);
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }
  nearestF(path, [x, y]) {
    let best = 0;
    let bd = Infinity;
    path.pts.forEach((p, i) => {
      const d = Math.hypot(p[0] - x, p[1] - y);
      if (d < bd) {
        bd = d;
        best = i;
      }
    });
    return path.lengths[best] / path.total;
  }
  invEase(f) {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 20; i++) {
      const mid = (lo + hi) / 2;
      if (this.easeInOut(mid) < f) lo = mid;
      else hi = mid;
    }
    return lo;
  }
  arrival(f) {
    return this.lerp(2600, 5200, this.invEase(f));
  }
  polyline(pts, style) {
    const ctx = this.ctx;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = style.color;
    ctx.lineWidth = style.width;
    ctx.globalAlpha *= style.alpha ?? 1;
    if (style.dash) ctx.setLineDash(style.dash);
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.stroke();
    ctx.restore();
  }
  dot(x, y, r, color, a = 1) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha *= a;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }
  /** Workshop: a pin board with a few loose note tiles (no text). */
  workshopBoard(s) {
    const C = this.C;
    const w = s;
    const h = s * 0.66;
    this.paper(w, h, { radius: s * 0.04, fill: C.surface });
    this.bar(-w * 0.38, -h * 0.34, w * 0.34, h * 0.07, C.ink, 0.7);
    const tiles = [
      [-0.3, -0.08, -0.06, 0.16],
      [-0.02, -0.12, 0.05, 0.85],
      [0.24, -0.04, -0.03, 0.3],
      [-0.14, 0.2, 0.04, 0.3],
      [0.12, 0.18, -0.05, 0.16],
    ];
    const ctx = this.ctx;
    tiles.forEach(([tx, ty, rot, a]) => {
      ctx.save();
      ctx.translate(tx * w, ty * h);
      ctx.rotate(rot);
      this.roundRect(-s * 0.075, -s * 0.06, s * 0.15, s * 0.12, s * 0.015);
      ctx.fillStyle = this.rgba("blue", a);
      ctx.fill();
      ctx.restore();
    });
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

  render(t) {
    const C = this.C;
    const O = this.objects;

    // Envelopes.
    const drawn = this.ease(t, 2600, 5200);
    const retract = this.ease(t, 8600, 9500);
    const destOn = this.hold(t, 5000, 5800, 8800, 9600);
    const destFrame = this.hold(t, 2200, 3600, 9000, 9900);
    const cohortOut = 1 - this.ease(t, 8500, 9300);

    // Per-object morph (lane → path) and glide (object → path side).
    const morph = O.map((o, i) =>
      this.hold(
        t,
        1400 + i * 280,
        2900 + i * 280,
        8700 + i * 150,
        9700 + i * 50,
      ),
    );
    const glide = O.map((o, i) =>
      this.hold(
        t,
        1500 + i * 280,
        3200 + i * 280,
        8750 + i * 150,
        9800 + i * 40,
      ),
    );

    // Warm glow at the shared destination region.
    if (destOn > 0)
      this.radial(
        this.dest[0],
        this.dest[1],
        300,
        this.rgba("orange", 0.16 * destOn),
      );

    // Phase C: other individual paths (behind everything else).
    this.cohort.forEach((c, k) => {
      const d = this.ease(t, c.start, c.start + 2000);
      if (d <= 0 || cohortOut <= 0) return;
      const drift = 4 * this.wave(t, 1, k * 1.3);
      this.ctx.save();
      this.ctx.translate(0, drift * (1 - d * 0.6));
      this.strokePath(c.path, 0, d, {
        color: C.blue,
        width: 3,
        alpha: 0.34 * cohortOut,
      });
      this.dot(
        c.path.pts[0][0],
        c.path.pts[0][1],
        6,
        C.blue,
        0.4 * cohortOut * this.clamp(d * 8),
      );
      c.nodes.forEach((f) => {
        const on = this.clamp((d - f) / 0.08);
        if (on <= 0) return;
        const p = this.pointAt(c.path, f);
        this.at(p.x, p.y, { alpha: 0.7 * on * cohortOut, scale: 0.7 }, () =>
          this.node(0, 0, 9, on, "filled"),
        );
      });
      this.ctx.restore();
    });

    // Destination frame (blue outline) before it warms.
    this.at(this.dest[0], this.dest[1], { alpha: destFrame * 0.9 }, () =>
      this.node(0, 0, 18, 1, "outline"),
    );

    // Lane segments: dashed + faint when separate, solid blue on the path.
    const K = 28;
    O.forEach((o, i) => {
      const m = this.easeInOut(morph[i]);
      const cx = o.lx + 10 * this.wave(t, 1, i * 1.9);
      const cy = o.ly + 6 * this.wave(t, 2, i * 1.1);
      const ang = o.tilt + 0.012 * this.wave(t, 1, i * 0.7);
      const ca = Math.cos(ang);
      const sa = Math.sin(ang);
      const pts = [];
      for (let k = 0; k <= K; k++) {
        const u = k / K;
        const l = (u * 2 - 1) * this.laneHalf;
        const lx = cx + l * ca;
        const ly = cy + l * sa;
        const p = this.pointAt(this.path, o.f - this.win + 2 * this.win * u);
        // Building: the middle leads the bend, ends follow. Releasing: the
        // segment lifts off as one piece so it never kinks.
        const mm =
          t < 7000 ? this.clamp(m * 1.25 - Math.abs(u - 0.5) * 0.5) : m;
        const e = t < 7000 ? this.easeInOut(mm) : mm;
        pts.push([this.lerp(lx, p.x, e), this.lerp(ly, p.y, e)]);
      }
      this.polyline(pts, {
        color: this.rgba("ink", 0.32),
        width: 2.5,
        dash: [10, 12],
        alpha: 1 - m,
      });
      this.polyline(pts, {
        color: C.blue,
        width: this.lerp(2.5, 4, m),
        alpha: m,
      });
      // Lane end caps (Phase A only).
      this.dot(pts[0][0], pts[0][1], 4, C.borderStrong, 1 - m);
      this.dot(pts[K][0], pts[K][1], 4, C.borderStrong, 1 - m);
    });

    // The single student-development path.
    if (drawn > retract) {
      this.strokePath(this.path, retract, drawn, { color: C.blue, width: 4 });
      if (drawn > 0.01 && drawn < 0.995) {
        this.strokePath(this.path, Math.max(0, drawn - 0.05), drawn, {
          color: C.blueBright,
          width: 5.5,
          glow: this.rgba("blueBright", 0.7),
          glowBlur: 20,
        });
      }
    }
    // Start node of the path.
    const startOn = this.hold(t, 2300, 2900, 8700, 9300);
    this.at(this.path.pts[0][0], this.path.pts[0][1], { alpha: startOn }, () =>
      this.node(0, 0, 9, 1, "filled"),
    );

    // Nodes where objects join the path.
    O.forEach((o, i) => {
      const at = this.arrival(o.f);
      const reached = this.hold(
        t,
        at - 150,
        at + 350,
        8650 + i * 120,
        9400 + i * 60,
      );
      if (reached <= 0) return;
      const p = this.pointAt(this.path, o.f);
      this.at(p.x, p.y, { alpha: reached }, () =>
        this.node(0, 0, 11, reached, "filled"),
      );
    });

    // Objects: from their lanes to their places beside the path.
    O.forEach((o, i) => {
      const g = this.easeInOut(glide[i]);
      const node = this.pointAt(this.path, o.f);
      const lx = o.lx + 10 * this.wave(t, 1, i * 1.9);
      const ly = o.ly + 6 * this.wave(t, 2, i * 1.1);
      const tx = node.x + 3 * this.wave(t, 1, i * 2.3);
      const ty = node.y + o.oy + 4 * this.wave(t, 2, i * 0.8);
      const x = this.lerp(lx, tx, g);
      const y = this.lerp(ly, ty, g);
      const rot = this.lerp(o.tilt + o.dr, o.r, g) + 0.008 * this.wave(t, 1, i);
      const alpha = 0.82 + 0.18 * g;
      // Thin tether from object to its node once placed.
      if (g > 0.6) {
        const a = (g - 0.6) / 0.4;
        const dir = Math.sign(o.oy);
        const halfH = o.s * 0.36;
        this.line(
          node.x,
          node.y + dir * 16,
          x,
          y - dir * halfH,
          this.rgba("blue", 0.3),
          2,
          a,
        );
      }
      this.at(x, y, { rot, alpha, scale: 0.94 + 0.06 * g }, () => {
        if (o.draw === "projectSheet") this.projectSheet(o.s, 1);
        else if (o.draw === "workshopBoard") this.workshopBoard(o.s);
        else this[o.draw](o.s, 1);
      });
    });

    // Opportunity destination (only warm colour in the scene).
    this.at(this.dest[0], this.dest[1], { alpha: destOn }, () =>
      this.opportunity(18, destOn, t),
    );
  }
}
window.InstitutionFragmentsToJourney = InstitutionFragmentsToJourney;
