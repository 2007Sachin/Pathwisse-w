# Pathwisse motion system

**Status:** Homepage motion upgraded and density-refined (2026-09-24); secondary pages use shared typography and spacing primitives
**Detail for the homepage:** `HOMEPAGE_VISUAL_UPGRADE.md`

Motion explains ideas, guides attention, and reinforces hierarchy. It must not delay comprehension, compete with reading, or make meaning depend on animation. Static markup is always the complete default; enhancement is opt-in.

## Motion tiers

| Tier | Name              | Use                                                         | Duration / easing                                                                | Allowed when                                                                               | Prohibited                                                                                         |
| ---- | ----------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| 1    | Interaction       | Buttons, links, focus, menu state                           | 120–220 ms; `--ease-standard`                                                    | Everywhere                                                                                 | Motion that delays activation; hover-only meaning                                                  |
| 2    | Reveal            | Text and illustration entrances, object settling            | 400–1300 ms; `--ease-emphasis`; once                                             | Section first visible; never on the LCP text                                               | Repeats, staggers > 1 s total for text, hiding content until reveal                                |
| 3    | Story progression | Path draws, stage activation, scroll-bound progress (`--p`) | Scroll-bound (no time easing) or 700–2000 ms once; opacity/transform/stroke only | Sections where order or connection is the point                                            | Scroll-jacking, intercepting wheel/touch, layout-property animation                                |
| 4    | Cinematic media   | Silent decorative video loops, complex hero scenes          | Loop ≥ 6 s, no flashes; fade-in 760 ms                                           | Hero and at most one secondary moment; visitor has not asked to reduce motion or save data | Audio, controls-dependent meaning, autoplay for reduced-motion users, more than one video per view |

Global rules for every tier: opacity, `transform`/`translate`, and SVG stroke offset only; no continuous loops except an approved Tier 4 video; warm orange appears only at a meaningful opportunity/next-step moment; meaning must survive with motion off.

## Implementation architecture

- `PageShell.astro` holds one small script (≈ 1.1 KB gz). It adds the `motion-enhanced` class only when reduced motion is **not** requested and `IntersectionObserver` exists.
- **Tier 2:** `[data-motion]` targets get `is-motion-visible` once (observer, with a 4 s safety completion).
- **Tier 3:** `[data-scrub]` sets `--p` (0–1). Modes: default (element centre travels from `data-scrub-from` to `data-scrub-to`, fractions of viewport), `leave` (progress as the element scrolls out; disabled ≤ 48rem), and `[data-stages]` (`pin` or `line`) which also sets `--f`, `--active`, and `is-active`/`is-past` on `[data-stage]` children. One rAF-throttled passive scroll listener; reads batched before writes.
- **Depth:** `[data-pointer]` sets `--px/--py` on fine-pointer, hover-capable devices ≥ 48rem. Layers use the independent `translate` property for pointer and `transform` for scroll depth so they compose.
- **Tier 4:** `CinematicMedia.astro` (see upgrade doc). Its script starts/pauses loops and honours reduced motion and `saveData`.
- CSS that depends on progress reads fallbacks (`var(--p, 1)`) that resolve to the finished state, so no-JS and reduced-motion visitors see the complete composition.
- The desktop pin (Approach) is CSS `position: sticky` in a tall section, enabled only under `.motion-enhanced` and `(min-width: 64rem) and (min-height: 44rem)`. Native scroll is never overridden.

## Homepage motion inventory

| Section                    | Tier | Motion                                                                                                        | Reduced-motion / no-JS fallback                       | Class |
| -------------------------- | ---- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ----- |
| Hero                       | 2–4  | Objects settle, path draws, light trail, node sequence, opportunity warms; pointer + scroll depth; video slot | Complete static composition; poster/video never plays | A     |
| Student Reality            | 3    | Timeline items strengthen with scroll; closing question emphasises                                            | All items and question at full strength               | B     |
| Education → Employment Gap | 3    | Fragments align, lines draw, answer point warms, bound to scroll                                              | Complete connected diagram                            | A     |
| Approach sequence          | 3    | Desktop pinned stage progression; vertical line and stage activation elsewhere; glow follows progress         | All six stages, complete path, all copy               | A     |
| Aanya story                | 3–4  | Steps activate; illustration layers swap; video slot                                                          | Final composed scene; all steps readable              | A     |
| Institution Transition     | 3    | Underline draws under "placement season."                                                                     | Full underline                                        | C     |
| Institution Value          | 2    | Relationship lines draw once                                                                                  | Fully drawn                                           | B     |
| Trust / Methodology        | 2    | Small sequential emphasis                                                                                     | Complete static method                                | B     |
| Others                     | 1    | Interaction feedback only                                                                                     | Static                                                | C     |

## Media performance rules

- Hero video: target ≤ 2.5 MB WebM, silent (no audio track), ≤ ~10 s loop. Secondary video: target ≤ 2 MB.
- Posters: WebP/AVIF, ≈ ≤ 120 KB, matching the first frame, with explicit ratio to prevent layout shift.
- `preload="none"` on every video; the script raises it to `auto` only when the frame is in view. Never preload all videos.
- Only hero media may use elevated loading priority (`fetchpriority="high"` poster). Hero playback begins after `window.load`.
- Skip playback when `prefers-reduced-motion: reduce` or `saveData` is set. Pause when off-screen.
- MP4 (H.264) is an optional fallback for Safari-era codecs; do not ship more than two formats.
- Decorative videos need no captions. **Any future video carrying unique information requires captions and a transcript** and must set `decorative={false}` with a label.
- No external embeds, stock filler, or generated people.

## Dependency budget

Native CSS + SVG + `IntersectionObserver` + one scroll handler. GSAP, Framer Motion, Three.js, and Lottie are not used and need a demonstrated interaction that these cannot reasonably deliver, recorded in `docs/architecture/`, before being added.

## Mobile

Do not shrink desktop motion. At ≤ 48rem: horizontal sequences become vertical, parallax and pointer depth are off, layer counts and distances are reduced, and readability wins. Primary targets stay ≥ 44 px.

## QA

Test keyboard focus, reduced motion, slow devices, mobile touch, long copy, background-tab behaviour, and screenshots with animation paused. Verify static states tell the same story. Check console, horizontal overflow, single H1, and layout shift at 375 / 768 / 1024 / 1440.

- Density refinement: the homepage keeps one major pinned journey at approximately 2.2 viewport heights; the student story is progressive rather than a second sticky sequence, and mobile uses normal flow.
- Native story primitives: inline SVG paths use shared stroke-dash progress (`--p`); outlined nodes strengthen as their section progresses, while FROM/TOWARD copy resolves through restrained opacity and translation. Desktop may use short native sticky ranges; mobile falls back to normal flow. Reduced motion completes paths and exposes all copy without a motion dependency.
- Visual vocabulary: paths communicate progression, nodes communicate stages, fragments communicate disconnected activity, and orange marks destination/opportunity only. Shared journey visuals are supplemental to semantic text and collapse to a vertical sequence on mobile.
