# Homepage visual upgrade (Phase 5B)

**Status:** Implemented on `/` only. Secondary pages receive shared primitives later.
**Updated:** 2026-09-20
**Supersedes:** the "zero videos for v1" decision in `HOMEPAGE_VISUAL_STORYTELLING.md` §7, at the product owner's direction. Video is now supported architecturally; no video files exist yet and none are fabricated.

## Direction

The homepage moves from stacked text/diagram sections to an unfolding story: recognition → tension → journey → application → evidence → opportunity. Movement explains; it does not decorate. The static Astro build is unchanged. Palette, Instrument Sans, and claim governance are unchanged.

No product UI is shown. Every "digital" or object metaphor is an abstract editorial illustration (paper sheets, sketches, speech shapes) built in the browser from SVG/CSS.

## Section classification

A cinematic/immersive · B motion-supported · C editorial/static · D simplify or merge.

| #   | Section                    | Class | Treatment                                                                                                                                                                                                             |
| --- | -------------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Hero                       | A     | Redesigned. Layered dark stage (`CinematicMedia` + browser-built scene): fragments settle onto a blue path that draws once and warms into an orange opportunity point. Pointer depth (desktop), scroll depth.         |
| 2   | Student Reality            | B     | Timeline items strengthen in sequence with scroll; closing question emphasises at the end. Larger statement type.                                                                                                     |
| 3   | Education → Employment Gap | A     | Rebuilt as scroll-scrubbed diagram: scattered fragments (Course, Certificate, Project, Assignment, Skill) align and connect by one line to the hiring-conversation question. Perspective rows kept as editorial rows. |
| 4   | Introducing Pathwisse      | A     | **Merged** with How It Works (D) into `ApproachSequenceSection`: the dark cinematic moment. Six-stage journey (Direction → Opportunity), native-scroll pinned on desktop, vertical on mobile.                         |
| 5   | How It Works (four ideas)  | D     | Merged into #4. Its four sentences are reused as stage copy; two stages reuse copy from Student Value.                                                                                                                |
| 6   | Aanya story                | A     | Sticky illustrative desk scene changes per step (uncertainty → direction → checklist → sketch → reflection → conversation). Hosts the student-journey video slot. Still labelled "Illustrative student journey".      |
| 7   | Where Pathwisse fits       | D     | **Removed.** It repeated the four-stage journey; its caveat ("product workflows shown only after verification") moved into the approach section footer.                                                               |
| 8   | Student Value              | C     | Unchanged editorial list.                                                                                                                                                                                             |
| 9   | Institution Transition     | C     | Converted from dark to light so darkness stays rare. Oversized statement; underline draws with scroll.                                                                                                                |
| 10  | Institution Value          | B     | Unchanged (existing finite line draw).                                                                                                                                                                                |
| 11  | Programs                   | C     | Unchanged.                                                                                                                                                                                                            |
| 12  | Trust / Methodology        | B     | Unchanged (existing finite sequence).                                                                                                                                                                                 |
| 13  | Brand Belief               | C     | Larger statement type only.                                                                                                                                                                                           |
| 14  | Final CTA                  | C     | Stays dark; gained restrained blue/orange light fields. Actions unchanged and immediately usable.                                                                                                                     |

### Darkness budget

Two dark full-width sections: **Approach sequence** and **Final CTA**. The hero stage is a contained dark media panel, not a section. Light→dark transitions use `.bridge` bands in `global.css`; a blue line descends the bridge and lands on the first approach node.

### Card audit

The homepage had no boxed card walls. Remaining repeated structures are rows or columns (perspective rows, numbered lists, three editorial columns in Institution Value). No information was removed for aesthetics except the redundant "Where Pathwisse fits" section.

## Copy and claims

- H1, hero lead, eyebrow, all CTAs and destinations are unchanged. The suggested eyebrow "Evidence-backed employability journey" was **not** adopted: "evidence-backed" reads as a verified-product claim. Proposed for approval only.
- Approach stage names use the six-part model already published on `/about` (Direction, Development, Application, Demonstration, Preparation, Opportunity). Stage sentences are recombined from existing homepage copy. **Copy owner review recommended** (stages 4 and 6 are recombinations).
- Scattered "learning fragments" are conceptual. The gap diagram states no storage, tracking, or product capability.

## New components and files

| File                                                                                                                                                  | Purpose                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `src/components/media/CinematicMedia.astro`                                                                                                           | Reusable decorative/meaningful media frame: fallback slot → optional poster → optional video, plus overlay slot. |
| `src/components/sections/home/ApproachSequenceSection.astro`                                                                                          | Replaces PathwisseIntro + HowItWorks. Pinned/vertical stage sequence.                                            |
| Rewritten: `HeroSection`, `EmploymentGapSection`, `StudentStorySection`; edited: `StudentReality`, `InstitutionTransition`, `BrandBelief`, `FinalCTA` | Homepage visual language.                                                                                        |
| Removed: `PathwisseIntroSection`, `HowItWorksSection`, `ProductExperienceSection`                                                                     | Merged or redundant. `productAssets.ts` is retained for later screenshot work.                                   |

`StorySequence`, `MotionPath`, and `LayeredScene` were **not** created: each would have had one caller. The scroll engine is data-attribute driven in `PageShell.astro`.

## Video architecture

```
public/media/home/hero/pathwisse-hero-journey.webm      (target ≤ 2.5 MB, no audio)
public/media/home/hero/pathwisse-hero-journey.mp4       (optional fallback)
public/media/home/hero/pathwisse-hero-poster.webp
public/media/home/student-journey/student-journey.webm  (target ≤ 2 MB, no audio)
public/media/home/student-journey/student-journey.mp4   (optional)
public/media/home/student-journey/student-journey-poster.webp
```

Behaviour of `CinematicMedia`:

- Files are detected **at build time**. A missing file is not rendered, so there is never a broken box. The slotted browser-built composition is what visitors see; the site is finished without any video.
- Poster (if present) is a real `<img>` (hero: eager + `fetchpriority=high`; others lazy) so it paints immediately and can be the LCP candidate. Video is layered above and fades in only on the `playing` event; a failing or corrupt video leaves the fallback visible (verified with a zero-byte file).
- `muted loop playsinline preload="none"`, no controls, no `autoplay` attribute. A small script starts playback when the frame is ≥25% visible **and** the visitor has not requested reduced motion **or** data saving; it pauses off-screen. Hero playback waits for `window.load`, so video never competes with LCP.
- Decorative by default (`aria-hidden`). If a future video carries unique information, set `decorative={false}` with a `label`, and add captions and a transcript before publishing.

## Scroll and motion behaviour

Native scroll only. Nothing is intercepted. See `MOTION_SYSTEM.md` for tiers.

- **Hero:** stage objects settle from scattered positions; blue path draws once (2 s); a light trail travels the path once; nodes activate in sequence; the opportunity point warms last. Layers move at different depths on scroll and, on fine-pointer desktops only, follow the pointer by ≤ ~22 px.
- **Gap:** progress (`--p`) is bound to scroll position. Chips align, lines draw, the answer point warms at completion.
- **Approach:** desktop (≥ 64rem, ≥ 44rem tall) is a 340vh section with a sticky 100vh stage; scroll position selects the active stage. Below that it is a normal vertical list whose stages activate as they cross the reading line. Inactive copy stays in the DOM at readable contrast (≥ 4.5:1).
- **Aanya:** stage activation swaps illustration layers via `--active`.

## Mobile (375–768)

Hero scene keeps aspect ratio with labels hidden and larger objects; hero parallax and pointer are off. Gap uses a separate vertical layout (own SVG). Approach is vertical with a continuous line. Aanya's scene is sticky at the top of the steps. No horizontal scrolling; primary controls ≥ 44 px.

## Reduced motion and no-JS

When `prefers-reduced-motion: reduce` (or JS is off) the `motion-enhanced` class is never added: no drawing, no parallax, no pin, no video playback, all copy visible, the complete static compositions shown. All progress-driven CSS reads `var(--p, 1)`-style fallbacks that resolve to the finished state.

## Performance (measured)

| Metric                      | Result                                                            |
| --------------------------- | ----------------------------------------------------------------- |
| Client JS (inline, gz)      | ≈ 1.8 KB total (shared engine 1.1 KB, nav 0.35 KB, media 0.34 KB) |
| Homepage CSS                | 39 KB raw / 6.3 KB gz                                             |
| Homepage HTML               | 39.5 KB raw / 9.4 KB gz                                           |
| Images/video                | none shipped                                                      |
| CLS (headless, full scroll) | 0.000 at 768 / 1024 / 1440; 0.027 at 375 (see follow-ups)         |
| Console                     | clean at 375 / 768 / 1024 / 1440                                  |

No dependency was added. GSAP/Framer/Three/Lottie were not needed: every effect is CSS transforms, opacity, SVG stroke offset, `IntersectionObserver`, and one rAF-throttled scroll handler.

## Media files still required

Nothing blocks launch. To upgrade later: the six files listed under "Video architecture". Posters should match the first frame and be WebP/AVIF ≤ ~120 KB.

## Follow-ups / open decisions

- Approve or revise the Approach stage sentences and the (unadopted) eyebrow wording.
- Investigate the 0.027 CLS at 375 (likely the sticky scene reflow while scrolling); not user-visible in review but worth a device pass.
- Real-device pass for pinned-scroll feel on trackpads and short laptop viewports.
- Next phase: propagate the path language, bridges, and statement typography to How It Works, Students, Institutions.
