// Pathwisse motion palette.
// Every value is copied from src/styles/tokens.css or from the existing hero
// scene CSS (HeroSection.astro) so rendered video matches the website exactly.
// Canvas animations must read colours from here only.
window.PATHWISSE_COLORS = Object.freeze({
  // Light surfaces (tokens.css)
  bg: "#f8fafc", // --color-bg
  surface: "#ffffff", // --color-surface
  surfaceSubtle: "#eef2f7", // --color-surface-subtle
  surfaceStrong: "#e3e9f2", // --color-surface-strong
  paper: "#f3f7fd", // --color-paper
  paperBack: "#cfdcf0", // hero .paper.back

  // Ink / dark scenes (tokens.css)
  ink: "#08172d", // --color-ink
  inkRaised: "#102747", // --color-ink-raised
  inkDeep: "#050f1f", // --color-ink-deep
  text: "#10213a", // --color-text
  textMuted: "#536176", // --color-text-muted
  textOnDark: "#f5f8fc", // --color-text-on-dark
  textMutedOnDark: "#b8c5d7", // --color-text-muted-on-dark

  // Brand blues
  blue: "#175cd3", // --color-primary
  blueDeep: "#124aa8", // --color-primary-hover
  blueDeeper: "#0f3d8b", // --color-primary-active
  blueBright: "#4d8bff", // hero path stroke on ink
  bluePale: "#d6e4ff", // hero comet / highlight on ink

  // Warm accent — destination / opportunity only
  orange: "#c86823", // --color-accent
  orangeSoft: "#f0a56b", // hero destination fill

  // Lines
  border: "#cbd5e1", // --color-border
  borderStrong: "#94a3b8", // --color-border-strong
  white: "#ffffff",

  // rgb triplets for alpha blending: `rgba(${PATHWISSE_COLORS.rgb.blue}, 0.2)`
  rgb: Object.freeze({
    blue: "23, 92, 211",
    blueBright: "77, 139, 255",
    bluePale: "214, 228, 255",
    ink: "8, 23, 45",
    orange: "200, 104, 35",
    orangeSoft: "240, 165, 107",
    white: "255, 255, 255",
  }),
});
