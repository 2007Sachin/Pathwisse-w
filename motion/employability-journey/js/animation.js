/* global PathwisseScene */
// employability-journey — How It Works main explainer (16:9, 12 s loop).
//
// One continuous blue path crosses the frame left → right. Each stage grows
// out of the one before it; stage names are carried by the page HTML, never
// drawn here.
//
// Timeline (ms):
//   0–1100      Direction: compass warms, needle swings to point the way;
//               first node lights
//   1100–2500   path releases toward Development; skill tiles rise and three
//               small blocks stack beside them
//   2500–3900   Application: blocks lift across the path and become the
//               project sheet's modules
//   3900–5300   Demonstration: a work sample slides out of the project sheet
//   5300–6700   Preparation: a conversation card emerges from the work sample
//   6700–8100   path reaches the orange opportunity destination
//   8100–10400  whole journey resolves; focus drift eases to centre; calm hold
//               (poster at 10000)
//   10400–12000 release: path runs on into the destination, stages fade back to
//               the resting compass (t = 12000 ≡ t = 0)
class EmployabilityJourney extends PathwisseScene {
  constructor(canvas) {
    super(canvas, {
      designW: 1920,
      designH: 1080,
      duration: 12000,
      theme: "ink",
    });
    this.path = this.makePath([
      [236, 560],
      [400, 610],
      [560, 590],
      [720, 520],
      [880, 500],
      [1040, 560],
      [1200, 610],
      [1360, 580],
      [1520, 500],
      [1700, 470],
    ]);
    // Node k lights at T[k]; node fractions spaced along the path.
    this.T = [1100, 2500, 3900, 5300, 6700, 8100];
    this.F = [0, 0.2, 0.4, 0.6, 0.8, 1];
    this.nodes = this.F.map((f) => this.pointAt(this.path, f));
    const n = this.nodes;
    // Stage anchors: alternate above / below the path.
    this.stage = [
      { x: n[0].x + 10, y: n[0].y - 250 }, // compass
      { x: n[1].x + 10, y: n[1].y + 235 }, // skill tiles + blocks
      { x: n[2].x + 20, y: n[2].y - 240 }, // project sheet
      { x: n[3].x + 10, y: n[3].y + 250 }, // work sample
      { x: n[4].x + 10, y: n[4].y - 240 }, // conversation card
      { x: n[5].x, y: n[5].y }, // opportunity
    ];
    this.sheetS = 300;
    // Stack slots for the three development blocks.
    const d = this.stage[1];
    this.blockSlots = [
      { x: d.x + 190, y: d.y + 110 },
      { x: d.x + 190, y: d.y + 52 },
      { x: d.x + 190, y: d.y - 6 },
    ];
    // Where each block lands inside the project sheet (module centres).
    const a = this.stage[2];
    const w = this.sheetS;
    this.blockTargets = [0, 1, 2].map((i) => ({
      x: a.x + (-0.42 + i * 0.29 + 0.125) * w,
      y: a.y,
    }));
  }

  // Emphasis of stage k while it is the active one.
  active(t, k) {
    const T = this.T;
    const next = k < 5 ? T[k + 1] : 99999;
    const start = k === 0 ? 150 : T[k] - 350;
    return this.hold(t, start, T[k] + 250, next, next + 700);
  }
  // Whole-journey resolve (every stage returns to full presence).
  resolve(t) {
    return this.hold(t, 8200, 9100, 10400, 11500);
  }
  appear(t, k) {
    return this.hold(
      t,
      this.T[k] - 700,
      this.T[k] + 500,
      10400 + k * 110,
      11300 + k * 90,
    );
  }
  focusOf(t, k) {
    return Math.max(this.active(t, k), this.resolve(t));
  }

  drawn(t) {
    let f = 0;
    for (let k = 0; k < 5; k++) {
      f +=
        (this.F[k + 1] - this.F[k]) *
        this.ease(t, this.T[k] + 100, this.T[k + 1] - 120);
    }
    return f;
  }

  render(t) {
    const ctx = this.ctx;
    // ── Focus drift: the frame leans gently toward the active stage.
    let fi = 0;
    for (let k = 1; k < 6; k++)
      fi += this.ease(t, this.T[k] - 500, this.T[k] + 400);
    fi -= 5 * this.ease(t, 9300, 10300); // reset while the drift is parked
    const camHold = this.hold(t, 8200, 9200, 10500, 11900);
    const lo = Math.floor(this.clamp(fi, 0, 4.999));
    const u = fi - lo;
    const fx = this.lerp(
      this.stage[lo].x,
      this.stage[Math.min(5, lo + 1)].x,
      u,
    );
    const fy = this.lerp(
      this.nodes[lo].y,
      this.nodes[Math.min(5, lo + 1)].y,
      u,
    );
    const camX = (960 - fx) * 0.035 * (1 - camHold);

    // Soft light that follows the active stage.
    this.radial(fx + camX, fy, 520, this.rgba("blue", 0.14 * (1 - camHold)));

    ctx.save();
    ctx.translate(camX, 0);

    const destOn = this.hold(t, this.T[5] - 350, this.T[5] + 700, 10700, 11800);
    const dest = this.nodes[5];
    if (destOn > 0)
      this.radial(dest.x, dest.y, 300, this.rgba("orange", 0.2 * destOn));

    // ── Connectors from each stage to its node (thin, quiet).
    for (let k = 0; k < 5; k++) {
      const a = k === 0 ? 0.35 + 0.65 * this.focusOf(t, 0) : this.appear(t, k);
      const s = this.stage[k];
      const n = this.nodes[k];
      const dir = s.y < n.y ? 1 : -1;
      const reach =
        k === 0 ? 120 : k === 1 ? 135 : k === 2 ? 128 : k === 3 ? 150 : 110;
      this.line(
        n.x,
        n.y + dir * -16,
        s.x - 10,
        s.y + dir * reach,
        this.rgba("bluePale", 0.28),
        2,
        a,
      );
    }

    // ── Path
    const retract = this.ease(t, 10400, 11800);
    const drawn = this.drawn(t);
    this.drawJourneyPath(this.path, retract > 0 ? 1 : drawn, {
      from: retract,
      width: 4,
      comet: retract === 0,
    });

    // ── Nodes
    for (let k = 0; k < 5; k++) {
      const n = this.nodes[k];
      const on = this.hold(
        t,
        this.T[k] - 250,
        this.T[k] + 300,
        10400 + k * 130,
        11300 + k * 90,
      );
      this.node(n.x, n.y, 12, on, "filled");
    }

    // ── Stages
    this.drawCompass(t);
    this.drawDevelopment(t);
    this.drawBlocks(t);
    this.drawApplication(t);
    this.drawDemonstration(t);
    this.drawPreparation(t);

    // ── Opportunity destination (the only warm element)
    this.at(dest.x, dest.y, {}, () => {
      this.node(0, 0, 24, 1, "outline");
      this.at(0, 0, { alpha: destOn, scale: 0.85 + 0.15 * destOn }, () =>
        this.opportunity(24, destOn, t),
      );
    });

    ctx.restore();
  }

  // Shared pose helper: calm/active emphasis + periodic drift.
  pose(t, k, x, y, extra = {}) {
    const f = this.focusOf(t, k);
    return {
      x: x + 5 * this.wave(t, 1, k * 1.9),
      y: y + 6 * this.wave(t, 2, k * 1.1),
      rot: (extra.rot || 0) + 0.008 * this.wave(t, 1, k * 0.7),
      scale: (extra.scale ?? 1) * (0.95 + 0.05 * f),
      alpha: (extra.alpha ?? 1) * (0.5 + 0.5 * f),
    };
  }

  drawCompass(t) {
    const s = this.stage[0];
    const p = this.pose(t, 0, s.x, s.y);
    const orient = this.hold(t, 250, 1100, 10500, 11700);
    const needle =
      this.lerp(-0.85, Math.PI * 0.78, orient) + 0.04 * this.wave(t, 2, 0.4);
    const on = this.focusOf(t, 0);
    this.at(p.x, p.y, p, () => this.compass(230, needle, 0.4 + 0.6 * on));
  }

  drawDevelopment(t) {
    const s = this.stage[1];
    const a = this.appear(t, 1);
    if (a <= 0) return;
    const rise = (1 - a) * 60;
    const pA = this.pose(t, 1, s.x - 40, s.y - 40 + rise, {
      rot: -0.03,
      alpha: a,
    });
    this.at(pA.x, pA.y, pA, () =>
      this.skillTile(240, this.ease(t, this.T[1] - 200, this.T[1] + 700)),
    );
    const b = this.hold(t, this.T[1] - 400, this.T[1] + 700, 10450, 11350);
    const pB = this.pose(t, 1, s.x + 10, s.y + 92 + (1 - b) * 60, {
      rot: 0.025,
      alpha: b,
    });
    this.at(pB.x, pB.y, pB, () =>
      this.skillTile(210, this.ease(t, this.T[1], this.T[1] + 900)),
    );
  }

  // Three blocks drop into a stack, then lift across the path into the sheet.
  drawBlocks(t) {
    const C = this.C;
    const colors = [C.bluePale, C.blueBright, C.bluePale];
    const T1 = this.T[1];
    const T2 = this.T[2];
    for (let i = 0; i < 3; i++) {
      const drop = this.ease(t, T1 - 100 + i * 220, T1 + 600 + i * 220);
      const fly = this.ease(t, T2 - 1000 + i * 160, T2 - 50 + i * 160);
      if (drop <= 0) continue;
      const slot = this.blockSlots[i];
      const tgt = this.blockTargets[i];
      const sx = slot.x;
      const sy = slot.y - (1 - drop) * 90;
      const x = this.lerp(sx, tgt.x, fly);
      const lift = Math.sin(fly * Math.PI) * 120;
      const y = this.lerp(sy, tgt.y, fly) - lift;
      const w = this.lerp(82, 75, fly);
      const h = this.lerp(50, 80, fly);
      const alpha =
        drop *
        (1 - this.progress(fly, 0.82, 1)) *
        (0.55 + 0.45 * Math.max(this.focusOf(t, 1), fly > 0 ? 1 : 0));
      const drift = 4 * this.wave(t, 2, 1.1);
      this.at(
        x,
        y + (fly > 0 ? 0 : drift),
        { alpha, rot: this.lerp(0.04 * (i - 1), 0, fly) },
        (ctx) => {
          ctx.save();
          this.shadow(true, 0.5);
          this.roundRect(-w / 2, -h / 2, w, h, 9);
          ctx.fillStyle = colors[i];
          ctx.fill();
          ctx.restore();
        },
      );
    }
  }

  drawApplication(t) {
    const s = this.stage[2];
    const a = this.appear(t, 2);
    const build = this.ease(t, this.T[2] - 350, this.T[2] + 350);
    const p = this.pose(t, 2, s.x, s.y + (1 - a) * 30, {
      rot: -0.015,
      alpha: a,
    });
    this.at(p.x, p.y, p, () => this.projectSheet(this.sheetS, build));
  }

  // Emerges out of the previous stage and settles below the path.
  emerge(t, k, from, draw) {
    const s = this.stage[k];
    const a = this.appear(t, k);
    if (a <= 0) return;
    const m = this.ease(t, this.T[k] - 900, this.T[k] + 250);
    const x = this.lerp(from.x, s.x, m);
    const y = this.lerp(from.y, s.y, m);
    const p = this.pose(t, k, x, y, { scale: this.lerp(0.45, 1, m), alpha: a });
    this.at(p.x, p.y, p, draw);
  }

  drawDemonstration(t) {
    this.emerge(t, 3, this.stage[2], () =>
      this.workSample(210, this.ease(t, this.T[3] - 200, this.T[3] + 800)),
    );
  }

  drawPreparation(t) {
    this.emerge(t, 4, this.stage[3], () =>
      this.conversationCard(
        290,
        this.ease(t, this.T[4] - 200, this.T[4] + 900),
      ),
    );
  }
}
window.EmployabilityJourney = EmployabilityJourney;
