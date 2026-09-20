# Pathwisse homepage visual storytelling plan

**Status:** Phase 5A static browser-built assets implemented; external media pending  
**Updated:** 2026-09-20  
**Scope:** Homepage media, motion, and production dependencies only

## 1. Visual north star

The homepage should make a disconnected education-to-employment journey become legible, then connected. Media is useful only when it performs one of three jobs: create human recognition, explain a relationship, or prove that a real product exists.

The recommended system is predominantly static editorial composition plus browser-built CSS/SVG motion where sequence needs explanation. Real photography should be used when human credibility matters. Real product screenshots should be used when functional trust matters. Generated media is optional and subordinate to those sources.

### V1 media policy

- The browser-built journey hero is approved for v1 and will not be replaced by photography or video.
- V1 uses no video.
- Aanya remains a browser-built illustrative editorial journey without a portrait. Real or commissioned photography may be evaluated later.
- Real human photography is optional, not a homepage-launch dependency. Do not introduce stock photography to fill space.
- Verified product screenshots are the highest-priority real media because they provide functional product proof.
- Institution visuals remain browser-built and conceptual until verified institutional product context or proof is approved.
- Trust follows this priority: real product, verified methodology, approved company/team identity, then real customer or institution proof. Decorative trust photography is excluded.

### Priority system

- **A — Essential visual storytelling:** the section depends materially on a visual explanation or proof.
- **B — Helpful but not essential:** media can improve recognition or continuity, but the section must work without it.
- **C — Typography/layout is sufficient:** media would add little explanatory value.
- **D — Avoid media:** additional imagery would compete with the section’s purpose.

## 2. Homepage media map

| Section                       | Priority | Media decision                                      | Primary source                              | Motion category                 |
| ----------------------------- | -------- | --------------------------------------------------- | ------------------------------------------- | ------------------------------- |
| 01 Hero                       | A        | One defining employability-journey composition      | Editorial visual + browser-built SVG/CSS    | Narrative, explanatory          |
| 02 Student Reality            | B        | Student-artifact fragments integrated with timeline | Real artifacts or editorial collage         | Narrative, minimal              |
| 03 Education → Employment Gap | A        | Simple split/disconnected pathway                   | CSS/SVG diagram                             | Explanatory                     |
| 04 Introducing Pathwisse      | A        | Reusable connected Pathwisse path                   | CSS/SVG diagram                             | Explanatory                     |
| 05 How It Works               | B        | One continuous four-stage visual cue                | CSS/SVG + typography                        | Explanatory                     |
| 06 Illustrative Student Story | A        | Editorial story sequence for Aanya                  | Real photography or controlled illustration | Narrative                       |
| 07 Product Experience         | A        | Three verified product views                        | Real product screenshots                    | Explanatory, product transition |
| 08 Student Value              | C        | Typography and layout remain sufficient             | Typography only                             | Interaction feedback only       |
| 09 Institution Transition     | B        | Tonal change plus one shared-journey composition    | Editorial illustration or photography       | Narrative, minimal              |
| 10 Institution Value          | B        | Non-quantitative collaboration/journey diagram      | CSS/SVG or real product context             | Explanatory                     |
| 11 Programs                   | C        | Editorial rows/pathways once data is verified       | Typography/layout                           | Interaction feedback only       |
| 12 Trust / Methodology        | B        | Method diagram; team image only if approved         | CSS/SVG; optional real photography          | Explanatory                     |
| 13 Brand Belief               | C        | Strong typography is the visual                     | Typography only                             | None beyond feedback            |
| 14 Final CTA                  | D        | Avoid new media                                     | Typography and surface                      | Interaction feedback only       |

This distribution keeps the page from becoming a sequence of media blocks and protects reading rhythm.

## 3. Section plans

### 01 Hero — A: essential

**Role:** Communicate direction → structured learning → applied work → evidence → opportunity before the visitor reads the complete explanation.

**Recommended concept:** An editorial motion graphic built around a calm directional path. The left side begins with fragmented learning artifacts; the path consolidates through applied work and evidence; one restrained warm accent appears at opportunity. A human student may anchor the composition only if real or exceptionally credible imagery is available.

- **Type:** Editorial illustration/composition with inline SVG path and optional real student photography.
- **State:** Static artwork first; browser-built motion enhancement later.
- **Desktop:** Wide 16:9 or approximately 3:2 composition, preserving the existing asymmetric copy/media balance.
- **Mobile:** Purpose-built crop or simplified vertical path; do not shrink a dense desktop scene.
- **Reduced motion:** Complete static composition with all stages visible.
- **Loading:** Critical media; provide intrinsic dimensions, preload only the final hero image variant, avoid video as LCP.
- **Fallback:** Existing numbered static journey.
- **Avoid:** Student-with-laptop stock photography, floating dashboards, fantasy landscapes, HUDs, neon light tunnels, or a visual that implies guaranteed employment.

#### Hero concept evaluation

| Concept                           | Brand fit             | Clarity                  | Effort | Performance       | Realism                                               | Mobile                 | Generic/AI risk                                  |
| --------------------------------- | --------------------- | ------------------------ | ------ | ----------------- | ----------------------------------------------------- | ---------------------- | ------------------------------------------------ |
| Cinematic student + symbolic path | High if real/credible | High                     | High   | Medium            | High with real photography; low with synthetic people | Requires art direction | High if generated poorly                         |
| Editorial motion graphic          | Very high             | High                     | Medium | High with SVG/CSS | Conceptual rather than literal                        | Strong                 | Low when built from the Pathwisse visual grammar |
| Product-led visual journey        | Medium                | Medium until UI is known | Medium | High              | High if screenshots are real                          | Moderate               | Risks making Pathwisse look like a dashboard     |

**Recommendation:** Editorial motion graphic. It communicates the system rather than a generic study scene, adapts cleanly to mobile, and can start as a static SVG/CSS composition. If approved real student photography becomes available, it may be composited as an anchor without changing the underlying visual grammar.

### 02 Student Reality — B: helpful

Use an editorial artifact collage integrated with the current timeline: a course note, certificate edge, workshop sheet, project sketch, and interview preparation page. The artifacts should feel real and incomplete rather than decorative.

- **Communication:** Activity accumulates, but the relationship among activities is unclear.
- **Motion:** Optional finite alignment of fragments; no continuous floating paper.
- **Desktop:** Collage can overlap the timeline edge while text remains readable.
- **Mobile:** A short horizontal/vertical artifact strip; no overlapping that disrupts reading.
- **Reduced motion:** Static collage.
- **Loading:** Below fold; responsive lazy-loaded image or lightweight CSS/SVG fragments.
- **Fallback:** Current timeline is complete without media.
- **Avoid:** An icon for every item, fake certificates, identifiable student data, or chaotic paper effects.

### 03 Education → Employment Gap — A: essential

Use a simple two-part pathway. Learning/activity travels along one line; hiring questions begin on another. A visible gap sits between them. The diagram should be understandable in two seconds and contain no more labels than the existing three perspectives.

- **Type:** CSS/SVG editorial diagram.
- **Motion:** Optional one-time explanatory line draw; static by default.
- **Desktop:** Wide split pathway aligned to the three editorial rows.
- **Mobile:** Stacked before/after relationship with the gap still explicit.
- **Reduced motion:** Fully drawn lines.
- **Performance:** Inline SVG, minimal paths, no filters.
- **Fallback:** Existing perspective rows.
- **Avoid:** Flowchart boxes, arrows in every direction, numerical charts, or a funnel.

### 04 Introducing Pathwisse — A: essential

This section establishes the reusable Pathwisse visual language: one royal-blue path with six meaningful stations—Discover, Learn, Apply, Evidence, Prepare, Opportunity. The path consolidates rather than branches endlessly. Opportunity alone receives the warm-orange accent.

- **Type:** Layered inline SVG path and typographic stations.
- **Motion:** Explanatory; a finite left-to-right path draw after the section enters view, subject to later approval.
- **Desktop:** Horizontal journey with slight vertical variation for editorial depth.
- **Mobile:** Vertical sequence; preserve order without horizontal scrolling.
- **Reduced motion:** Completed path and all labels visible.
- **Loading:** Inline with markup; no external request.
- **Fallback:** Existing numbered sequence.
- **Avoid:** Metro-map complexity, glowing neon, progress percentages, or clickable product-tour behavior.

### 05 How It Works — B: helpful

Keep the current numbered editorial sequence. Add one continuous visual thread through the four stages rather than four illustrations or thumbnails. Each stage may have a small abstract mark derived from the same path geometry, but not an icon.

- **Type:** Typography plus CSS/SVG connective line.
- **Motion:** Optional explanatory progression; no per-card animation.
- **Desktop:** Alternating alignment or one shared margin path.
- **Mobile:** Straight vertical sequence.
- **Reduced motion:** Static connector.
- **Fallback:** Current ordered list.
- **Avoid:** Four identical cards, generic illustrations, or unverified product thumbnails.

### 06 Illustrative Student Story — A: essential

The preferred treatment is a scroll-led editorial sequence made from three or four static story moments, not a video by default. One consistent Aanya visual identity should move from uncertainty, to focused learning, to applied work, to preparation. The label **Illustrative student journey** remains persistent and visible.

| Direction                  | Credibility         | Performance | Production | Recommendation                               |
| -------------------------- | ------------------- | ----------- | ---------- | -------------------------------------------- |
| Cinematic short sequence   | High if filmed well | Lowest      | Highest    | Reserve for future campaign, not v1 homepage |
| Scroll-led editorial story | High                | High        | Medium     | Preferred                                    |
| Static story panels        | High                | Highest     | Medium     | Strong reduced-motion/base implementation    |
| Simple illustration        | Medium-high         | High        | Medium     | Viable if photography is unavailable         |
| Photography + UI overlays  | Medium              | Medium      | High       | Avoid until real product UI is approved      |

- **Source:** Prefer real photography from one controlled shoot. If unavailable, use a clearly editorial generated/illustrated treatment with no claim of depicting a real student.
- **Desktop:** 3–4 wide moments integrated with the seven textual steps.
- **Mobile:** One image at a time in reading order; no pinned horizontal scroll.
- **Reduced motion:** Static ordered panels.
- **Loading:** Lazy load all but the first story image; consistent aspect ratios.
- **Fallback:** Current text journey.
- **Avoid:** Testimonial quotes, “before/after” success, job-offer imagery, inconsistent generated faces, or fake product overlays.

### 07 Product Experience — A: essential

This is functional proof and must use real, approved product UI. Required product-team assets:

1. **Direction view:** the real view that supports role/career direction, if it exists.
2. **Progress view:** the real view that represents development/progress, if it exists and is accurately named.
3. **Evidence view:** the real view that captures or presents evidence, if it exists.

The screenshot intake, privacy standard, approval workflow, delivery format, and integration contract are defined in `PRODUCT_SCREENSHOT_SPEC.md`. Until product verification is complete, all three editorial reserved frames remain visible and no public asset path is assigned.

Use two or three screens maximum. One screen may be dominant; the others support the sequence. Use browser-free framing unless browser context is genuinely necessary. Annotations should identify only verified interactions or information and should be plain text outside the screenshot where possible.

- **Motion:** Optional simple crossfade/slide between real states; not required for comprehension.
- **Desktop:** One large approved view plus two supporting crops.
- **Mobile:** One stacked view at a time; preserve legibility rather than showing an entire desktop screen.
- **Reduced motion:** Static sequence.
- **Loading:** Responsive AVIF/WebP exports; below fold and lazy loaded.
- **Fallback:** Retain the current structural reserve or omit the section. Never substitute fake UI.

### 08 Student Value — C: typography sufficient

Retain the current numbered benefit rows. Media would repeat concepts already explained in the journey and product sections. A subtle path continuation in the margin is acceptable later, but no new asset is required.

### 09 Institution Transition — B: helpful

Use the existing dark tonal shift as the primary signal. Optionally add one calm composition showing the student at the center of connected faculty, mentor, and industry context. It should continue the same Pathwisse path from the student section rather than introduce a new enterprise visual language.

- **Type:** Editorial illustration or observational campus photography with a lightweight SVG connector.
- **Motion:** Narrative continuity only; path may extend into the institution context.
- **Mobile:** Tonal shift and simplified composition.
- **Reduced motion:** Static connections.
- **Fallback:** Typography-only dark transition, which already works.
- **Avoid:** Office meetings, handshake photography, dashboards, control rooms, or readiness scores.

### 10 Institution Value — B: helpful

Use a non-quantitative journey diagram: student work and context in the center; faculty, mentor, placement team, and industry-connected project context around it. Lines represent collaboration, not data flow or analytics.

- **Type:** CSS/SVG diagram; real product context only if verified.
- **Motion:** Gentle line reveal later; explanatory, finite.
- **Mobile:** Stacked relationships with the student journey first.
- **Reduced motion:** Complete diagram.
- **Fallback:** Current editorial value rows.
- **Avoid:** KPI cards, cohort charts, percentages, heatmaps, intervention alerts, or claims of measurement.

### 11 Programs — C: typography sufficient

Until programs are verified, retain the conceptual sequence. When content is approved, use editorial rows grouped by role direction, audience, or intervention purpose. Do not use thumbnail card grids or filters unless programme volume creates a genuine retrieval problem.

### 12 Trust / Methodology — B: helpful

The current definition-list structure should remain primary. Add a small methodology diagram only if it clarifies Direction → Capability → Evidence → Opportunity. Real team photography can support institutional trust later, but only when team identities and publication approval exist.

- **Source:** CSS/SVG for methodology; real photography for people.
- **Motion:** None required; optional explanatory line reveal.
- **Fallback:** Typography-only methodology.
- **Avoid:** Badges, certification seals, customer logos, generic shield icons, or staged team photography.

### 13 Brand Belief — C: typography sufficient

No media. The typographic contrast between “I completed it” and “I can show you what I can do” is the visual. Additional imagery would weaken the pause before conversion.

### 14 Final CTA — D: avoid media

No new visual or ambient animation. Keep the two audience choices clear and calm. Interaction feedback on links/buttons is sufficient.

## 4. Media style system

All Pathwisse assets should share:

- deep ink/navy foundations where contrast is needed;
- royal-blue lines or pathways as the direction signal;
- cool white details;
- one restrained warm-orange accent at opportunity or next action;
- editorial composition with physical texture and human context;
- believable Indian higher-education environments when people appear;
- calm lighting and observational framing;
- enough negative space for responsive crops and nearby copy.

Avoid glossy synthetic faces, fantasy lighting, holograms, HUD overlays, generic corporate meetings, stock-photo gestures, floating UI cards, excessive neon, and visual promises of employment.

## 5. Human photography guidelines

- **Subjects:** Primarily students in the approximate higher-education age range; include faculty/mentors only where the story requires them.
- **Context:** Recognizably Indian higher-education environments without relying on clichés or institution branding.
- **Wardrobe:** Everyday campus clothing; clean and realistic, not styled as corporate executives.
- **Expression/posture:** Focused, uncertain, thoughtful, collaborative, or quietly confident; never exaggerated enthusiasm.
- **Framing:** Observational, over-the-shoulder, environmental portrait, or activity detail. Leave compositional room for crops.
- **Diversity:** Reflect varied gender presentation, skin tones, disciplines, regions, and socioeconomic context without tokenistic group shots.
- **Lighting:** Natural or motivated practical light; controlled but not fantasy-cinematic.
- **Privacy:** Written releases and no identifiable private information on papers or screens.

Avoid graduation caps, pointing at laptops, handshakes, staged cheering, artificial bokeh portraits, and the polished “AI student” look.

## 6. Motion language

- **Narrative motion:** Hero consolidation, artifact alignment, and Aanya’s progression. Allowed only where it advances the story.
- **Explanatory motion:** Path drawing and relationship lines in the gap, Pathwisse journey, and institution diagram. Preferred category.
- **Interaction feedback:** Existing hover, focus, menu, and button states. Always allowed within the motion system.
- **Ambient motion:** Minimal. A very slow light travel may support the hero/path once, but continuous background activity is discouraged.

No section requires a motion library at this stage. CSS transforms/opacity, inline SVG, and a small Intersection Observer helper should be evaluated first during implementation. Any observer must reveal enhancement only; content remains visible without JavaScript.

> **Update 2026-09-20:** the product owner has directed a richer visual ambition. Video slots (hero and student journey), scroll-bound storytelling, and merged/removed sections are specified in `HOMEPAGE_VISUAL_UPGRADE.md`, which takes precedence over sections 2–3 and 7 of this document where they differ.

## 7. Video decision

**Recommendation: zero videos for v1.** The editorial SVG/CSS path and static story panels explain the homepage with lower production risk, better mobile behavior, and stronger performance.

**Decision:** Approved. V1 will ship with no video.

At most one video may be justified later—either a hero journey film or the Aanya story, never both. If approved, target a short 8–15 second muted sequence with no essential dialogue, a purposeful end state rather than an obvious infinite loop, a strong poster frame, mobile still-image fallback, reduced-motion still, lazy loading unless it is the hero, and no autoplay when it would compete with reading. External embeds are not appropriate.

## 8. Image and screenshot strategy

### Editorial images

- Prefer AVIF with WebP fallback where practical; retain a high-quality source master.
- Use Astro image optimization and explicit width/height to prevent layout shift.
- Produce desktop and mobile crops rather than relying on `object-position` alone.
- Default ratios: hero 16:9 or 3:2; story panels 4:3 or 3:2; institution visual 16:9; product crops based on real UI readability.
- Eager-load only the critical hero asset; lazy-load below-fold media.
- Alt text should explain the narrative information. Decorative path layers use empty alt text or `aria-hidden`.

### Product screenshots

- Capture from an approved stable build at one consistent viewport and zoom.
- Use realistic synthetic/demo data with no personal information.
- Remove debug tools, unfinished controls, test labels, and notifications.
- Preserve the real product theme; do not recolor UI to match marketing.
- Use consistent crop, scale, and background treatment.
- Keep annotations outside the UI unless a pointer is essential.
- Never composite unverified controls, metrics, or states into the capture.

## 9. Performance principles

- Hero media must not materially delay the largest contentful paint.
- Static content and poster imagery render before enhancement code.
- Lazy-load every below-fold raster image and all optional motion code.
- Use responsive `srcset`/Astro image variants and mobile-specific crops.
- Avoid multiple video decoders, large SVG filters, canvas, WebGL, and continuous animation.
- Defer path/story motion until the section is near the viewport.
- Every motion asset needs a still fallback and intrinsic dimensions.
- Evaluate actual output sizes after asset production; do not set arbitrary budgets before source assets exist.

## 10. Asset inventory

| ID       | Section                | Asset                                                | Source/type                                              | Priority | Status           | Dependency                       |
| -------- | ---------------------- | ---------------------------------------------------- | -------------------------------------------------------- | -------- | ---------------- | -------------------------------- |
| HERO-01  | Hero                   | Connected employability journey master composition   | CSS/SVG editorial graphic                                | A        | Implemented      | Static Phase 5A complete         |
| HERO-02  | Hero                   | Mobile-specific journey composition                  | CSS/SVG art direction                                    | A        | Implemented      | Responsive static variant        |
| REAL-01  | Student Reality        | Fragmented student artifact set                      | Real scanned/photographed artifacts or editorial collage | B        | Not created      | Artifacts and privacy review     |
| GAP-01   | Employment Gap         | Disconnected pathway diagram                         | CSS/SVG                                                  | A        | Implemented      | Static Phase 5A complete         |
| PATH-01  | Introducing Pathwisse  | Six-stage connected path                             | CSS/SVG                                                  | A        | Implemented      | Reusable path primitive complete |
| WORK-01  | How It Works           | Four-stage connector                                 | CSS/SVG                                                  | B        | Implemented      | Reuses path grammar              |
| STORY-01 | Student Story          | Aanya moment: uncertainty/direction                  | Real photography preferred                               | A        | Not created      | Persona and photography approval |
| STORY-02 | Student Story          | Aanya moment: learning/applied work                  | Real photography preferred                               | A        | Not created      | Same shoot/subject as STORY-01   |
| STORY-03 | Student Story          | Aanya moment: evidence/preparation                   | Real photography preferred                               | A        | Not created      | Same shoot/subject as STORY-01   |
| PROD-01  | Product Experience     | Direction view                                       | Real product screenshot                                  | A        | Blocked          | Product team verification        |
| PROD-02  | Product Experience     | Progress/development view                            | Real product screenshot                                  | A        | Blocked          | Product team verification        |
| PROD-03  | Product Experience     | Evidence view                                        | Real product screenshot                                  | A        | Blocked          | Product team verification        |
| INST-01  | Institution Transition | Shared student-support composition                   | Editorial illustration or real photography               | B        | Not created      | Institution direction approval   |
| INST-02  | Institution Value      | Student/faculty/mentor/industry relationship diagram | CSS/SVG                                                  | B        | Implemented      | Conceptual, non-quantitative     |
| TRUST-01 | Trust                  | Direction-to-opportunity methodology diagram         | CSS/SVG                                                  | B        | Implemented      | Static Phase 5A complete         |
| TEAM-01  | Trust/About future     | Team/company photograph                              | Real photography                                         | B        | Optional/blocked | Team and publication approval    |

Sections 08, 11, 13, and 14 require no dedicated media asset. Section 05 reuses the PATH-01 geometry rather than creating an unrelated style.

### Phase 5A implementation note

The static browser-built system is now implemented for HERO-01, GAP-01, PATH-01, WORK-01, the Aanya editorial timeline treatment, INST-02, and TRUST-01. HERO-02 is handled through responsive restructuring rather than duplicate markup. Product records PROD-01 through PROD-03 remain explicitly reserved for verified screenshots; no interface has been fabricated. REAL-01, STORY photography, INST-01, and TEAM-01 remain unproduced because approved real media is not available.

## 11. Production order

1. Approve the Pathwisse visual grammar and HERO-01 concept.
2. Build PATH-01 and GAP-01 as the reusable browser visual language.
3. Art-direct and produce the Aanya story sequence.
4. Obtain and review PROD-01 through PROD-03 from the product team.
5. Produce INST-01 and INST-02 using the same path language.
6. Add WORK-01 and TRUST-01 as lightweight supporting diagrams.
7. Produce REAL-01 and optional TEAM-01 only if they materially improve the page.
8. Optimize, art-direct mobile variants, write alt text, and verify performance before integration.

## 12. Source decision by asset

- **Must be real:** Product screenshots; any team image; privacy/security evidence; customer proof if introduced later.
- **Prefer real:** Human/student photography and the Aanya sequence.
- **Browser built:** Hero path, education/employment gap, connected journey, four-stage connector, institution relationship diagram, methodology diagram.
- **Generated image acceptable only with approval:** A clearly editorial, non-testimonial Aanya or institution composition when a real shoot is impossible. Generated humans must not be mistaken for real users.
- **Generated motion/video:** Not recommended for v1.
- **Typography only:** Student Value, Programs until verified, Brand Belief, Final CTA.

Real human photography is optional for v1 and must not block homepage launch. The approved browser-built hero, Aanya treatment, and institution relationship visual remain the launch treatments unless a later review explicitly changes them.

## 13. Code impact plan

| Component                            | Future input/change                                                        | Likely path                                            | Client JS                            | New dependency |
| ------------------------------------ | -------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------ | -------------- |
| `HeroSection.astro`                  | Hero asset metadata, desktop/mobile sources, alt text; optional path layer | `/public/images/home/hero/` or `src/assets/home/hero/` | Only for later narrative enhancement | None expected  |
| `StudentRealitySection.astro`        | Artifact asset list and alt/decorative status                              | `src/assets/home/reality/`                             | Optional finite alignment            | None expected  |
| `EmploymentGapSection.astro`         | Inline diagram component                                                   | `src/components/media/`                                | Optional path draw                   | None expected  |
| `PathwisseIntroSection.astro`        | Reusable `JourneyPath` component                                           | `src/components/media/`                                | Optional Intersection Observer       | None expected  |
| `HowItWorksSection.astro`            | Shared path geometry/stage anchors                                         | `src/components/media/`                                | Optional                             | None expected  |
| `StudentStorySection.astro`          | Typed story media array, captions, alt text, crops                         | `src/assets/home/story/`                               | Optional narrative progression       | None expected  |
| `ProductExperienceSection.astro`     | Typed approved screenshot records and annotations                          | `src/assets/product/`                                  | Optional simple state transition     | None expected  |
| `InstitutionTransitionSection.astro` | One editorial media source and alt text                                    | `src/assets/home/institutions/`                        | Optional continuation                | None expected  |
| `InstitutionValueSection.astro`      | Relationship diagram data/labels                                           | `src/components/media/`                                | Optional line reveal                 | None expected  |
| `TrustSection.astro`                 | Method diagram; optional approved team asset                               | `src/components/media/`, `src/assets/company/`         | No requirement                       | None expected  |

Student Value, Programs, Brand Belief, and Final CTA need no media props. Content records should remain typed local configuration. A motion library is not currently justified.

## 14. Open approvals

Explicit approval is required for:

1. Hero editorial-motion concept and visual grammar.
2. Whether any human video is used; current recommendation is no.
3. Whether generated human/editorial imagery is acceptable at all.
4. Aanya’s name, appearance, and real-photography versus illustration treatment.
5. Availability, names, and publication approval for Direction, Progress, and Evidence product screens.
6. Institution visual direction and the relationships it may accurately depict.
7. Logo asset and permitted treatment within media.
8. Final brand colors and whether the working blue/orange roles are approved.
9. Final Instrument Sans approval.
10. Image rights, releases, privacy review, and asset ownership.

## 15. Approval gate before production

Asset production should begin only after a single visual-direction review approves HERO-01, PATH-01, the human-media policy, and the product screenshot request. That review should produce a small visual brief and named approvers. Do not generate or commission a full asset set before the visual grammar is accepted.
