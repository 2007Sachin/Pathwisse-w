/* global PathwisseScene */
// pathwisse-hero-journey — homepage hero (portrait 6:7 to fit the hero stage).
//
// Timeline (10 s loop, ms):
//   0–1400     compass activates, needle finds direction
//   800–6200   blue path draws bottom-left → top-right
//   1600–5600  objects align onto the path as it reaches them
//   5800–6600  path arrives; orange opportunity warms
//   6200–8300  calm hold with micro-drift
//   8300–10000 path travels on into the destination, objects loosen back
//              to their starting drift (loop point identical to t = 0)
class PathwisseHeroJourney extends PathwisseScene {
  constructor(canvas) {
    super(canvas, {
      designW: 960,
      designH: 1120,
      duration: 10000,
      theme: "ink",
    });
    this.path = this.makePath([
      [96, 1040],
      [200, 930],
      [360, 900],
      [520, 820],
      [520, 690],
      [400, 600],
      [440, 470],
      [640, 440],
      [760, 330],
      [700, 220],
      [820, 150],
    ]);
    // Each object: aligned pose (x, y, rot) + loose offset (dx, dy, dr),
    // path fraction it attaches at, and draw function.
    this.objects = [
      {
        f: 0.06,
        x: 196,
        y: 930,
        r: 0,
        dx: -30,
        dy: 40,
        dr: -0.2,
        s: 150,
        draw: "compass",
      },
      {
        f: 0.22,
        x: 360,
        y: 990,
        r: -0.06,
        dx: -50,
        dy: 30,
        dr: -0.22,
        s: 118,
        draw: "notebook",
      },
      {
        f: 0.36,
        x: 700,
        y: 850,
        r: 0.03,
        dx: 60,
        dy: 40,
        dr: 0.18,
        s: 200,
        draw: "skillTile",
      },
      {
        f: 0.5,
        x: 250,
        y: 650,
        r: -0.04,
        dx: -70,
        dy: -20,
        dr: -0.2,
        s: 210,
        draw: "projectSheet",
      },
      {
        f: 0.62,
        x: 680,
        y: 590,
        r: 0.02,
        dx: 70,
        dy: 30,
        dr: 0.12,
        s: 250,
        draw: "laptop",
      },
      {
        f: 0.74,
        x: 300,
        y: 380,
        r: 0.05,
        dx: -60,
        dy: -40,
        dr: 0.22,
        s: 150,
        draw: "workSample",
      },
      {
        f: 0.86,
        x: 560,
        y: 210,
        r: -0.03,
        dx: 40,
        dy: -60,
        dr: -0.16,
        s: 190,
        draw: "conversationCard",
      },
    ];
    this.dest = this.path.pts[this.path.pts.length - 1];
  }

  // Path progress → time (ms) at which the path reaches fraction f.
  arrival(f) {
    return this.lerp(800, 6200, this.pathTimeInverse(f));
  }
  pathTimeInverse(f) {
    // Inverse of easeInOut, solved numerically (cheap, 20 steps).
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 20; i++) {
      const mid = (lo + hi) / 2;
      if (this.easeInOut(mid) < f) lo = mid;
      else hi = mid;
    }
    return lo;
  }

  render(t) {
    const drawn = this.ease(t, 800, 6200);
    const retract = this.ease(t, 8300, 9700);
    const destOn = this.hold(t, 5800, 6600, 8900, 9900);

    // Warm glow behind the destination, like the website hero.
    if (destOn > 0) {
      this.radial(
        this.dest[0],
        this.dest[1],
        260,
        this.rgba("orange", 0.22 * destOn),
      );
    }

    this.drawJourneyPath(this.path, retract > 0 ? 1 : drawn, {
      from: retract,
      width: 4,
      comet: retract === 0,
    });

    // Path nodes where objects attach.
    this.objects.forEach((o, i) => {
      const p = this.pointAt(this.path, o.f);
      const reached = this.hold(
        t,
        this.arrival(o.f) - 150,
        this.arrival(o.f) + 350,
        8300 + i * 120,
        9500 + i * 60,
      );
      this.node(p.x, p.y, 10, reached, "filled");
    });

    // Objects, back to front.
    this.objects.forEach((o, i) => {
      const at = this.arrival(o.f);
      const a = this.hold(t, at - 900, at + 300, 8300 + i * 120, 9600 + i * 50);
      const driftX = 5 * this.wave(t, 1, i * 1.7);
      const driftY = 6 * this.wave(t, 2, i * 0.9);
      const x = o.x + o.dx * (1 - a) + driftX;
      const y = o.y + o.dy * (1 - a) + driftY;
      const rot = o.r + o.dr * (1 - a) + 0.01 * this.wave(t, 1, i);
      const alpha = 0.62 + 0.38 * a;
      this.at(x, y, { rot, alpha, scale: 0.94 + 0.06 * a }, () => {
        if (o.draw === "compass") {
          const needle = this.lerp(-1.3, 0.55, a) + 0.05 * this.wave(t, 2);
          this.compass(o.s, needle, a);
        } else if (o.draw === "notebook") this.notebook(o.s, a);
        else if (o.draw === "skillTile") this.skillTile(o.s, a);
        else if (o.draw === "projectSheet") this.projectSheet(o.s, a);
        else if (o.draw === "laptop") this.laptop(o.s, a);
        else if (o.draw === "workSample") this.workSample(o.s, a);
        else this.conversationCard(o.s, a);
      });
    });

    // Opportunity destination: always present as an outline, warms on arrival.
    this.at(this.dest[0], this.dest[1], {}, () => {
      this.node(0, 0, 18, 1, "outline");
      this.at(0, 0, { alpha: destOn }, () => this.opportunity(18, destOn, t));
    });
  }
}
window.PathwisseHeroJourney = PathwisseHeroJourney;
