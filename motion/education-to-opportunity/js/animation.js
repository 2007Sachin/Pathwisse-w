/* global PathwisseScene */
// education-to-opportunity — About page (16:9, 9 s loop).
//
// Learning on the left, the world of work on the right, an empty gap between.
// A single Pathwisse blue pathway bridges the gap; learning objects lean toward
// it and an orange opportunity resolves on the far side. Calm, not a demo.
//
// Timeline (ms):
//   0–900      rest: two separated clusters, faint dashed gap, gentle drift
//   700–4300   pathway draws across the gap; bridge nodes light as reached;
//              learning objects lean and align toward the path (1000–3800)
//   2600–3600  dashed gap edges dissolve
//   3700–5200  opportunity resolves in orange; work objects warm and settle
//   5200–7200  calm hold (poster at 6800)
//   7200–8900  release: pathway runs on into the destination, objects lean
//              back, gap returns (t = 9000 ≡ t = 0)
class EducationToOpportunity extends PathwisseScene {
  constructor(canvas) {
    super(canvas, {
      designW: 1920,
      designH: 1080,
      duration: 9000,
      theme: "ink",
    });
    this.path = this.makePath([
      [660, 600],
      [820, 530],
      [960, 500],
      [1110, 505],
      [1270, 550],
      [1400, 560],
    ]);
    this.nodeF = [0, 0.34, 0.67];
    this.dest = this.pointAt(this.path, 1);
    // Learning (left) and work (right) objects.
    // x,y aligned pose; dx,dy,dr = loose offset at rest; lean toward path.
    this.left = [
      {
        draw: "courseCard",
        s: 300,
        x: 440,
        y: 320,
        r: 0.04,
        dx: -40,
        dy: -20,
        dr: -0.16,
      },
      {
        draw: "notebook",
        s: 210,
        x: 300,
        y: 730,
        r: 0.06,
        dx: -30,
        dy: 30,
        dr: -0.18,
      },
      {
        draw: "certificate",
        s: 260,
        x: 570,
        y: 790,
        r: -0.03,
        dx: -40,
        dy: 40,
        dr: 0.14,
      },
    ];
    this.right = [
      {
        draw: "laptop",
        s: 380,
        x: 1560,
        y: 300,
        r: -0.02,
        dx: 40,
        dy: -20,
        dr: 0.06,
      },
      {
        draw: "conversationCard",
        s: 280,
        x: 1370,
        y: 800,
        r: 0.02,
        dx: 30,
        dy: 30,
        dr: 0.08,
      },
      {
        draw: "workSample",
        s: 210,
        x: 1680,
        y: 740,
        r: 0.04,
        dx: 40,
        dy: 20,
        dr: -0.08,
      },
    ];
  }

  drawObj(o, a) {
    if (o.draw === "courseCard") this.courseCard(o.s);
    else if (o.draw === "notebook") this.notebook(o.s, 1);
    else if (o.draw === "certificate") this.certificate(o.s);
    else if (o.draw === "laptop") this.laptop(o.s, 0.4 + 0.6 * a);
    else if (o.draw === "conversationCard")
      this.conversationCard(o.s, 0.5 + 0.5 * a);
    else this.workSample(o.s, 1);
  }

  render(t) {
    const bridge = this.ease(t, 700, 4300);
    const retract = this.ease(t, 7200, 8700);
    const lean = this.hold(t, 1000, 3800, 7200, 8800);
    const gapGone = this.hold(t, 2600, 3600, 7700, 8800);
    const destOn = this.hold(t, 3700, 5200, 7600, 8800);

    // Two quiet pools of light, one per world; a warm one joins on arrival.
    this.radial(420, 560, 560, this.rgba("blue", 0.1));
    this.radial(1540, 560, 560, this.rgba("blue", 0.06 + 0.04 * destOn));
    if (destOn > 0)
      this.radial(
        this.dest.x,
        this.dest.y,
        320,
        this.rgba("orange", 0.2 * destOn),
      );

    // A soft light gathers along the bridge once it is complete.
    const joined = this.hold(t, 3200, 4600, 7200, 8600);
    if (joined > 0)
      this.radial(1000, 530, 420, this.rgba("blue", 0.14 * joined));

    // Dashed gap edges (the unbridged space).
    const gapA = 1 - gapGone;
    [740, 1230].forEach((x, i) => {
      const drift = 4 * this.wave(t, 1, i * 2);
      this.ctx.save();
      this.ctx.setLineDash([3, 14]);
      this.line(
        x + drift,
        330,
        x + drift,
        790,
        this.rgba("white", 0.22),
        2,
        gapA,
      );
      this.ctx.restore();
    });

    // Pathway across the gap.
    this.drawJourneyPath(this.path, retract > 0 ? 1 : bridge, {
      from: retract,
      width: 4,
      comet: retract === 0,
      traceAlpha: 0.5 + 0.5 * gapA,
    });
    this.nodeF.forEach((f, i) => {
      const p = this.pointAt(this.path, f);
      const on = this.hold(
        t,
        700 + f * 3200,
        1100 + f * 3200,
        7200 + i * 150,
        8200 + i * 120,
      );
      this.node(p.x, p.y, 12, on, "filled");
    });

    // Learning objects lean toward the path.
    this.left.forEach((o, i) => this.placed(t, o, i, lean, 0.62 + 0.38 * lean));
    // Work objects warm and settle as the opportunity resolves.
    this.right.forEach((o, i) =>
      this.placed(t, o, i + 3, destOn, 0.5 + 0.5 * destOn),
    );

    // Destination: outline always, warms on arrival.
    this.at(this.dest.x, this.dest.y, {}, () => {
      this.node(0, 0, 24, 1, "outline");
      this.at(0, 0, { alpha: destOn, scale: 0.85 + 0.15 * destOn }, () =>
        this.opportunity(24, destOn, t),
      );
    });
  }

  placed(t, o, i, a, alpha) {
    const x = o.x + o.dx * (1 - a) + 5 * this.wave(t, 1, i * 1.7);
    const y = o.y + o.dy * (1 - a) + 6 * this.wave(t, 2, i * 0.9);
    const rot = o.r + o.dr * (1 - a) + 0.008 * this.wave(t, 1, i);
    this.at(x, y, { rot, alpha, scale: 0.95 + 0.05 * a }, () =>
      this.drawObj(o, a),
    );
  }
}
window.EducationToOpportunity = EducationToOpportunity;
