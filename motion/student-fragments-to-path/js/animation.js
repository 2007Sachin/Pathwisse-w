/* global PathwisseScene */
// student-fragments-to-path — fragmentation → coherence (1920×1080, light).
//
// Timeline (9 s seamless loop, ms):
//   0–1400     learning fragments drift, scattered and tilted, slightly faded
//   900–4900   one blue journey path draws left → right through the frame
//   1100–5300  fragments glide + rotate onto the path (staggered, left → right);
//              each node fills and a short stem connects as its card settles
//   4800–5700  small orange opportunity node at the path end warms
//   5700–7300  calm hold with micro-drift (poster frame 6400)
//   7300–9000  path releases from the left, cards loosen back to their
//              scattered drift, destination cools (t = 9000 ≡ t = 0)
class StudentFragmentsToPath extends PathwisseScene {
  constructor(canvas) {
    super(canvas, {
      designW: 1920,
      designH: 1080,
      duration: 9000,
      theme: "light",
    });
    this.path = this.makePath([
      [150, 560],
      [420, 500],
      [700, 580],
      [980, 510],
      [1260, 575],
      [1540, 505],
      [1760, 540],
    ]);
    this.dest = this.path.pts[this.path.pts.length - 1];
    // Aligned pose (x, y, r) + scattered pose (lx, ly, lr); side: -1 above, 1 below.
    this.cards = [
      {
        draw: "courseCard",
        s: 250,
        x: 330,
        y: 300,
        r: 0,
        side: -1,
        lx: 560,
        ly: 860,
        lr: -0.26,
      },
      {
        draw: "certificate",
        s: 250,
        x: 590,
        y: 800,
        r: 0,
        side: 1,
        lx: 250,
        ly: 330,
        lr: 0.22,
      },
      {
        draw: "trainingBoard",
        s: 250,
        x: 850,
        y: 280,
        r: 0,
        side: -1,
        lx: 1210,
        ly: 860,
        lr: -0.18,
      },
      {
        draw: "projectSheet",
        s: 250,
        x: 1110,
        y: 805,
        r: 0,
        side: 1,
        lx: 800,
        ly: 250,
        lr: 0.24,
      },
      {
        draw: "assignment",
        s: 230,
        x: 1370,
        y: 290,
        r: 0,
        side: -1,
        lx: 1640,
        ly: 800,
        lr: 0.2,
      },
      {
        draw: "skillTile",
        s: 250,
        x: 1600,
        y: 800,
        r: 0,
        side: 1,
        lx: 1430,
        ly: 250,
        lr: -0.28,
      },
    ];
    this.cards.forEach((c) => {
      c.f = this.fAtX(c.x);
      c.p = this.pointAt(this.path, c.f);
      c.edge = c.side < 0 ? c.y + this.cardHalfH(c) : c.y - this.cardHalfH(c);
    });
  }

  // Local override of the base grid: the shared vignette fades from
  // transparent *black* to bg, which greys the light theme. Fade from a
  // transparent copy of bg instead so the paper stays clean.
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
  cardHalfH(c) {
    const k = {
      courseCard: 0.7,
      certificate: 0.72,
      trainingBoard: 0.66,
      projectSheet: 0.74,
      assignment: 1,
      skillTile: 0.62,
    };
    return (c.s * k[c.draw]) / 2;
  }
  // Time at which the (eased) path reaches fraction f.
  arrival(f) {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 20; i++) {
      const mid = (lo + hi) / 2;
      if (this.easeInOut(mid) < f) lo = mid;
      else hi = mid;
    }
    return this.lerp(900, 4900, lo);
  }

  render(t) {
    const drawn = this.ease(t, 900, 4900);
    const release = this.ease(t, 7300, 8700);
    const destOn = this.hold(t, 4800, 5700, 7200, 8300);

    if (destOn > 0) {
      this.radial(
        this.dest[0],
        this.dest[1],
        300,
        this.rgba("orange", 0.12 * destOn),
      );
    }

    // Faint dotted trace is always present; the drawn path grows then releases.
    this.drawJourneyPath(this.path, release > 0 ? 1 : drawn, {
      from: release,
      width: 4,
      comet: release === 0,
      traceAlpha: 0.7,
    });

    const align = this.cards.map((c, i) => {
      const at = this.arrival(c.f);
      return this.hold(t, at - 1000, at + 350, 7300 + i * 140, 8500 + i * 70);
    });

    // Stems + nodes under the cards.
    this.cards.forEach((c, i) => {
      const a = align[i];
      if (a > 0.01) {
        const len = (c.edge - c.p.y) * a;
        this.line(
          c.p.x,
          c.p.y,
          c.p.x,
          c.p.y + len,
          this.rgba("blue", 0.35),
          2,
          a,
        );
      }
      this.node(c.p.x, c.p.y, 11, a, "filled");
    });

    // Cards.
    this.cards.forEach((c, i) => {
      const a = align[i];
      const loose = 1 - a;
      const dx = (22 * loose + 4) * this.wave(t, 1, i * 1.9);
      const dy = (18 * loose + 5) * this.wave(t, 2, i * 1.1 + 0.6);
      const x = this.lerp(c.lx, c.x, a) + dx;
      const y = this.lerp(c.ly, c.y, a) + dy;
      const rot =
        this.lerp(c.lr, c.r, a) +
        (0.04 * loose + 0.006) * this.wave(t, 1, i * 2.3);
      const alpha = 0.6 + 0.4 * a;
      const scale = 0.9 + 0.1 * a;
      this.at(x, y, { rot, alpha, scale }, () => {
        if (c.draw === "projectSheet") this.projectSheet(c.s, 1);
        else if (c.draw === "skillTile") this.skillTile(c.s, 0.6 + 0.4 * a);
        else this[c.draw](c.s);
      });
    });

    // Opportunity destination: outline always, warms last.
    this.at(this.dest[0], this.dest[1], {}, () => {
      this.node(0, 0, 14, 0.4, "outline");
      this.at(0, 0, { alpha: destOn }, () => this.opportunity(14, destOn, t));
    });
  }
}
window.StudentFragmentsToPath = StudentFragmentsToPath;
