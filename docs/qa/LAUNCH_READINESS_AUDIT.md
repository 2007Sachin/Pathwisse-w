# Pathwisse full-site launch readiness audit

**Audit date:** 2026-09-20  
**Scope:** `/`, `/how-it-works`, `/students`, `/institutions`, `/programs`, `/about`, `/contact`, `/style-guide`, global shell, public assets, and production build  
**Verdict:** **BLOCKED — not launch-ready**

## Status definitions

- **PASS:** Verified and no launch action is required.
- **PASS WITH NOTE:** Safe for the current bounded site, with a documented follow-up.
- **BLOCKED:** Requires an external decision, approved content, destination, or infrastructure before launch.
- **FAIL:** A verifiable defect exists in the repository or rendered site.

## Executive summary

The static site is structurally sound, product-safe, responsive at the required breakpoints, and unusually disciplined about distinguishing strategic intent from verified product functionality. Safe audit corrections added a branded 404, robots policy, Twitter metadata, accurate repository status, Node guidance, current-page navigation normalization, a one-H1 style guide, and honest disabled states for unresolved student and authentication actions.

Launch remains blocked by three conversion/deployment dependencies: there is no student Get Started or Sign In destination, the institution contact form cannot submit, and no production origin/hosting configuration is approved. Legal content and operational company contact details also require owner review before any personal-information collection is enabled.

## Second-pass re-verification (2026-09-20)

A second full pass re-checked the built output and source after the first audit. **Verdict unchanged: BLOCKED — not launch-ready.**

### Verified this pass (built HTML in `dist/`, all 9 pages)

- One H1, one `<main>`, `lang` set, skip link present, no heading-level jumps, and no duplicate IDs on every page.
- Title, description, Open Graph, and Twitter card tags present on every page. `noindex, nofollow` is present only on `/style-guide` and `/404`.
- Every internal href and hash anchor resolves. No empty, `#`, or external hrefs are published anywhere. No sitemap exists; none was added because a sitemap requires the unapproved production origin.
- Source search for TBD, TODO, placeholder, coming soon, lorem, dummy, sample, mock, temporary, pending, and replace-later found one internal HTML comment (`ProgramsSection.astro`, not rendered) and the internal `pending`/`blocked` asset status type. Nothing renders publicly.
- Claim-word search (visibility, track, monitor, readiness, intervention, analytics, insight, score, dashboard, recommend, resume, interview, predict, assess) found these terms only in explicit boundary or non-claim language, in general employability context, or as a deliberate concept ("intervention" for programs). No copy was changed.
- Client JS: two inline module scripts per page (menu, motion observer; contact validation on `/contact`). No hydration framework, no images or video, no external requests. CSS per route is 7–26 KB; the only font files are two Instrument Sans WOFF2 subsets (11 KB and 30 KB). The only `infinite`/iteration override found is the reduced-motion reset. `public/images/product`, `public/icons`, and `public/video` are empty.
- No secrets, keys, or credentials in `src`. Dependency audit: 0 vulnerabilities.
- Node: still 22.16.0 locally; `engines` already declares `>=22.19` and README says so. System Node was not changed.

### Fixed this pass

1. **Contrast, small text.** `.journey-path__destination strong` used the accent orange (#c86823, 3.68:1 on the light background), below AA for small text. It now uses the path copy color; the orange remains on the node border and line.
2. **Contrast, form controls.** Input and textarea borders used `--color-border-strong` (#94a3b8, 2.45:1), below the 3:1 non-text requirement. Added `--color-border-input` (#64748b, about 4.8:1 on white) and applied it to the contact form. Documented in `DESIGN_SYSTEM_FOUNDATION.md`.

### Not re-run this pass

Real-browser checks (four breakpoints, keyboard walk-through, console) were **not** repeated in this session because no browser automation is available here. The first-pass results above still stand, but the two contrast changes are unverified visually. Confirm at the next browser QA. Contrast ratios above were computed from the design tokens, not measured on rendered pixels.

## P0 resolution update — Vercel preparation and form-provider decoupling (2026-09-20)

**Verdict: still BLOCKED — not launch-ready** because legal content is missing and the launch strategy for the contact form has not been decided by the product owner.

| Former P0                          | Status now                                 | Detail                                                                                                                                                                                                                         |
| ---------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Student Get Started destination    | **RESOLVED**                               | `https://app.pathwisse.com/signup` on the header button and all six "Start Your Journey" CTAs, same-tab, from one config.                                                                                                      |
| Sign In destination                | **RESOLVED**                               | `https://app.pathwisse.com/login` in the header.                                                                                                                                                                               |
| Production origin                  | **RESOLVED**                               | `https://pathwisse.com`; canonical and `og:url` correct on the seven public pages; `/style-guide` and `/404` are `noindex` with no canonical; sitemap lists the seven public routes only; `robots.txt` references the sitemap. |
| Hosting provider                   | **RESOLVED**                               | Vercel. The site is fully static, so no adapter, functions, or `vercel.json` are needed. Deployment itself has not been performed.                                                                                             |
| Institution form / live submission | **OPEN — product-owner decision required** | The provider is not selected. `/contact` is email-first with `pathwisse@gmail.com`; no form is rendered and nothing can be falsely reported as sent. See the launch strategies below.                                          |
| Legal content                      | **OPEN (blocked)**                         | No approved Privacy Policy or Terms. `/privacy` and `/terms` were not created or linked. Only the approved contact email is published; no postal address, phone, or registered-office details were invented.                   |

### Launch strategies for the contact form (product owner to decide)

- **A — Launch requires a web form.** Then a provider decision is a **P0**: select a provider, owner, destination, privacy notice, and abuse controls; possibly add a Vercel function (then adopt `@astrojs/vercel` only if it passes `npm audit --audit-level=high`); test end to end.
- **B — Launch with verified email contact only.** Then the form provider is **P2** (post-launch), and the only contact-related launch checks are that `pathwisse@gmail.com` is monitored and that Privacy content covers email enquiries.

This has intentionally not been decided in the repository.

### Verification for this phase

Resend and `@astrojs/node` are uninstalled; `/api/demo-request` is deleted; `.env.example` is deleted (it held only Resend variables). The build produces static files only in `dist/` (no `dist/server`). Built HTML contains no `RESEND`, `DEMO_FROM_EMAIL`, key-shaped strings, or `/api/demo-request` reference. Real-browser checks of the redesigned contact section were not run in this session.

The P0/P1/P2 tables further down pre-date this update; where they conflict, this section governs.

## Homepage visual upgrade update (2026-09-20)

Phase 5B changed the homepage only: new hero scene, scroll-bound gap and approach sequences, illustrative Aanya scene, video/poster slots (no files present; browser-built fallback is the shipped experience), and merged/removed sections. Copy claims, CTAs, and destinations are unchanged. Checks: type check, lint, build, and audit pass; console clean and no horizontal overflow at 375/768/1024/1440; reduced-motion and missing-video fallbacks verified. Open: Approach stage sentences need copy-owner approval; investigate 0.027 CLS at 375; real-device pinned-scroll pass. Details in `docs/design/HOMEPAGE_VISUAL_UPGRADE.md`.

## Audit findings by area

| Area            | Status         | Finding                                                                                                                                                                                        |
| --------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Product/content | PASS WITH NOTE | All seven public narratives are complete and bounded. Programs remain intentionally conceptual; product screenshots remain omitted.                                                            |
| Claims          | PASS WITH NOTE | Public copy consistently qualifies product-dependent concepts. Product capability verification is still outstanding.                                                                           |
| Navigation      | BLOCKED        | Public routes and footer links work. Sign In and Get Started have no approved destinations and are now visibly unavailable instead of misrouting to `/contact`.                                |
| UX              | PASS WITH NOTE | Narrative progression and audience routes are clear. Disabled student conversion is an intentional but material dead end until a destination is approved.                                      |
| Responsive      | PASS           | Required routes reflow at 375, 768, 1024, and 1440 CSS pixels without horizontal overflow.                                                                                                     |
| Accessibility   | PASS WITH NOTE | Semantic landmarks, skip link, focus treatment, labels, form errors, reduced motion, and menu focus management are present. Automated checks do not replace assistive-technology user testing. |
| SEO             | BLOCKED        | Titles, descriptions, H1s, OG and Twitter basics are present. Canonicals and sitemap correctly remain absent until a production origin is approved.                                            |
| Performance     | PASS           | Static Astro output, no hydration framework, no external media, one self-hosted variable font family, and small native scripts.                                                                |
| Motion          | PASS           | Motion is finite, opt-in, transform/opacity based, nonessential, and disabled for reduced motion. Content is visible without JavaScript.                                                       |
| Forms           | BLOCKED        | Validation is accessible and honest, but no provider or destination exists; no information can be submitted.                                                                                   |
| Technical       | PASS WITH NOTE | Format, typecheck, lint, build, links, browser console, duplicate IDs, and dependency audit pass. Local Node 22.16 is below the dependency-supported recommendation of 22.19+.                 |
| Legal/privacy   | BLOCKED        | No Privacy Policy, Terms, approved company contact details, or final form-processing notice exists. No analytics or cookie-requiring tracking is present.                                      |
| Deployment      | BLOCKED        | Hosting, production origin, canonical base, deployment configuration, rollback, and release ownership are unresolved.                                                                          |

## Route audit

| Route           | Loads/layout                 | H1  | Metadata | Temporary UI     | Media           | CTA/navigation                                            | Status         |
| --------------- | ---------------------------- | --- | -------- | ---------------- | --------------- | --------------------------------------------------------- | -------------- |
| `/`             | Pass; 14-section narrative   | 1   | Present  | None visible     | No broken media | Institution paths work; student action unavailable        | PASS WITH NOTE |
| `/how-it-works` | Pass; approach-led           | 1   | Present  | None visible     | No broken media | Audience routes work; student action unavailable          | PASS WITH NOTE |
| `/students`     | Pass; student-first          | 1   | Present  | None visible     | No broken media | Supporting links work; primary student action unavailable | BLOCKED        |
| `/institutions` | Pass; institution narrative  | 1   | Present  | None visible     | No broken media | Request Demo reaches `/contact`                           | PASS WITH NOTE |
| `/programs`     | Pass; conceptual Mode B      | 1   | Present  | None visible     | No broken media | No fabricated catalogue; student action unavailable       | PASS WITH NOTE |
| `/about`        | Pass; verified company scope | 1   | Present  | None visible     | No broken media | Audience routes work                                      | PASS           |
| `/contact`      | Pass; institution purpose    | 1   | Present  | None visible     | No broken media | Form intentionally cannot submit                          | BLOCKED        |
| `/style-guide`  | Pass; internal reference     | 1   | Present  | Clearly internal | No broken media | Excluded from navigation; `noindex, nofollow`             | PASS           |
| `/404`          | Branded fallback             | 1   | Present  | None             | None required   | Home and main audience links                              | PASS           |

Current-page navigation state now normalizes trailing slashes before applying `aria-current="page"`. The home logo is the home affordance; no separate Home item exists in the primary navigation.

## Navigation and link audit

### Desktop and mobile

- Logo, How It Works, For Students, For Institutions, Programs, and About resolve to implemented routes.
- Mobile menu uses a semantic button, updates `aria-expanded`, moves focus to the first link when opened, closes on Escape, and restores focus to the trigger.
- Current-page state uses `aria-current="page"` on primary navigation routes.
- Sign In and Get Started remain visible but non-interactive with an accessible “unavailable” qualification. This prevents the previous misleading route to the institution enquiry form.
- Footer includes only implemented routes. There are no dead legal or social links because unapproved destinations are omitted.

### Broken-link result

No internal route link resolves to an unimplemented page after the corrections. Hash links target existing IDs. No empty, `#`, fabricated external, or placeholder URL is published. Product destinations are disabled rather than represented as links.

## CTA inventory

| Label                                  | Audience       | Destination/state                        | Locations                                         | Assessment                                      |
| -------------------------------------- | -------------- | ---------------------------------------- | ------------------------------------------------- | ----------------------------------------------- |
| Start Your Journey                     | Student        | Unavailable pending approved destination | Home, How It Works, Students, Programs            | Consistent and honest; conversion blocker       |
| Get Started                            | Student        | Unavailable pending approved destination | Header                                            | Consistent; destination required                |
| Sign In                                | Existing users | Unavailable pending approved destination | Header                                            | Destination required; must not route to contact |
| Request a Demo                         | Institution    | `/contact`                               | Home, How It Works, Institutions, Programs, About | Consistent; form submission remains blocked     |
| See How It Works / See the approach    | General        | `/how-it-works`                          | Home and supporting pages                         | Consistent, low friction                        |
| Explore for Students / student journey | Student        | `/students`                              | Home, About, How It Works                         | Consistent                                      |
| Explore for Institutions               | Institution    | `/institutions`                          | Home, How It Works                                | Consistent                                      |
| Explore Programs                       | General        | `/programs`                              | Home, Students, Institutions                      | Consistent and appropriately conceptual         |
| Share your context                     | Institution    | `#request-form`                          | Contact                                           | Valid in-page destination                       |

## Copy and terminology audit

Approved vocabulary is used consistently: **student**, **institution**, **direction**, **development**, **application/applied work**, **evidence/demonstration**, **placement preparation**, and **opportunity**. “Employability Operating System” is paired with plain-language explanation and not treated as a verified technical architecture. “Readiness,” “tracking,” “monitoring,” “analytics,” “dashboard,” “score,” and “integration” appear only in explicit boundary or non-claim language. No broad rewrite was warranted.

The placeholder component and internal TODOs remain source-only and are not rendered by a public route. Stale route descriptions and README phase copy were corrected. Product asset statuses such as `pending` and `blocked` remain appropriate internal metadata.

## Product claim table

| Claim                                                                                              | Page                                   | Status                               | Action                                                               |
| -------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------ | -------------------------------------------------------------------- |
| Pathwisse is being built around a connected employability journey                                  | Site-wide                              | Approved positioning                 | Retain qualified wording                                             |
| Direction can help students choose development more intentionally                                  | Home, How It Works, Students           | Strategic approach                   | Retain; not presented as an automated recommendation capability      |
| Applied work can help students demonstrate learning                                                | Site-wide                              | Strategic belief                     | Retain; no storage, verification, or scoring claim                   |
| Preparation may include resume and interview articulation                                          | How It Works, Students                 | General employability context        | Retain; no current product feature claim                             |
| Institutions can ask earlier support questions                                                     | Home, Institutions                     | Strategic approach                   | Retain; no monitoring, alert, intervention, or analytics claim       |
| Programs may support stages of the journey                                                         | Home, Students, Institutions, Programs | Conceptual; catalogue unverified     | Retain qualification; do not add names, formats, prices, or outcomes |
| Pathwisse provides dashboards, analytics, readiness scores, tracking, integrations, or predictions | Boundary copy only                     | Not claimed / unverified             | Continue prohibiting until authoritative verification                |
| Pathwisse guarantees placement, hiring, interviews, salaries, rankings, or accreditation outcomes  | Boundary copy only                     | Explicitly not claimed               | Retain prohibition                                                   |
| Product screenshots represent live capability                                                      | Home                                   | Not claimed; reserved frames omitted | Integrate only after product and privacy approval                    |

## Page-specific narrative review

- **Home:** All 14 required sections are present. Recognition → structural gap → approach → illustrative story → audience value → trust → action remains coherent. The Aanya story is labelled illustrative. CTA frequency is controlled; the unresolved student action is disabled.
- **How It Works:** Deepens the model without becoming a feature inventory. Capability boundaries are unusually explicit, and audience links are correct.
- **Students:** Language is personal and non-corporate. Aanya remains illustrative. No outcome, program, or product-workflow guarantee is present. Primary conversion remains blocked.
- **Institutions:** TPO questions are planning questions. “Visibility,” “monitor,” “readiness,” “analytics,” and related terms are used only to deny or bound unverified functionality. Request Demo is primary.
- **Programs:** Mode B is implemented. No names, prices, durations, certifications, eligibility, formats, or outcomes are fabricated.
- **About:** Shaquantum Labs Private Limited is the only published company identity. No founders, team, funding, size, launch date, traction, awards, partners, or location claims are present.
- **Contact:** Institution purpose, minimal fields, accessible validation, bounded privacy wording, and honest unconfigured behavior pass. There is no backend or response-time promise.

## SEO audit

| Route           | Title                | Description        | H1  | Canonical       | Indexable | Status         |
| --------------- | -------------------- | ------------------ | --- | --------------- | --------- | -------------- |
| `/`             | Pathwisse            | Present and unique | 1   | Awaiting origin | Yes       | PASS WITH NOTE |
| `/how-it-works` | Unique               | Present and unique | 1   | Awaiting origin | Yes       | PASS WITH NOTE |
| `/students`     | Unique               | Present and unique | 1   | Awaiting origin | Yes       | PASS WITH NOTE |
| `/institutions` | Unique               | Present and unique | 1   | Awaiting origin | Yes       | PASS WITH NOTE |
| `/programs`     | Unique               | Present and unique | 1   | Awaiting origin | Yes       | PASS WITH NOTE |
| `/about`        | Unique               | Present and unique | 1   | Awaiting origin | Yes       | PASS WITH NOTE |
| `/contact`      | Unique               | Present and unique | 1   | Awaiting origin | Yes       | PASS WITH NOTE |
| `/style-guide`  | Internal style guide | Present            | 1   | Awaiting origin | No        | PASS           |
| `/404`          | Page not found       | Present            | 1   | Not required    | No        | PASS           |

Open Graph title, description, type, and conditional URL are supported. Twitter summary-card title and description are now supported. No OG image exists; an approved production social image is a P1 asset requirement, not a reason to fabricate one. `robots.txt` allows crawling and intentionally omits a sitemap directive until the production origin is approved. Generate a sitemap only after configuring the authoritative origin; no package is needed for the current small static route set.

## Accessibility audit

- One H1 per rendered route after correcting the style-guide type specimen.
- Heading hierarchy, header/main/footer landmarks, skip link, native links/buttons, and visible focus styles are present.
- Mobile menu has keyboard open/close, Escape, focus entry, and focus restoration behavior.
- FAQ content uses native disclosure elements where present.
- Contact inputs have persistent labels, hints/errors through `aria-describedby`, `aria-invalid`, live status, value retention, and first-error focus.
- Decorative visual SVG is hidden from assistive technology; explanatory structures have text equivalents.
- Reduced motion removes transitions/animations and essential content is visible before scripts run.
- Interactive global navigation and buttons meet at least the WCAG 2.2 24×24 CSS-pixel target; primary controls are approximately 44–48 pixels high.
- No observed color-only status communication. Token contrast is designed for AA, but final brand-token changes require renewed contrast testing.

**Limitation:** No committed visual baseline or dedicated axe dependency exists, so visual regression is **INCONCLUSIVE** and automated accessibility coverage is partial. Manual keyboard and accessibility-tree checks passed; screen-reader user testing remains recommended.

## Responsive and motion audit

All audited routes were rendered at 375, 768, 1024, and 1440 CSS pixels. No horizontal overflow, duplicate IDs, hidden essential motion content, or broken media was observed. Mobile navigation replaces desktop navigation at the established breakpoint; forms, CTAs, footer groups, path visuals, FAQ content, and editorial grids reflow without requiring horizontal scrolling.

Motion uses one shared `IntersectionObserver`, runs once, and falls back after four seconds if observation fails. It uses opacity/transforms, has no scroll-jacking or constant ambient loop, and is disabled under `prefers-reduced-motion`.

## Performance and font audit

- Static Astro output; no framework hydration islands.
- Client scripts are limited to mobile navigation, one shared reveal observer, and contact validation.
- No raster images, video, third-party media, analytics, advertising, or runtime font requests.
- Instrument Sans Variable is self-hosted through `@fontsource-variable`, with Latin and Latin-ext WOFF2 assets generated at build time.
- One variable family avoids duplicate discrete weights; system fallbacks are defined.
- Largest obvious assets are the self-hosted font files and route CSS. No production media asset dominates transfer size.
- No layout-shifting image content exists. Future images must include dimensions per the screenshot specification.
- Dependencies are minimal and no heavy animation or SEO package is installed.

## Security and privacy audit

Repository searches found no API keys, credentials, secrets, private product URLs, personal student data, or hidden prototype datasets. Dependency audit reports no known high-severity vulnerability. The website makes no certification, encryption, retention, deletion, or regulatory-compliance claim.

Analytics status: **NOT CONFIGURED**. Do not add a cookie banner while no cookie-setting analytics exists. Minimum future events from the PRD are page views, audience-route selections, primary CTA attempts, institution form starts, validation failures, and confirmed successful submissions. Events must not be represented as success before real outcomes exist.

## Form production readiness

Status: **BLOCKED**.

Required resolution:

1. Approve a provider and receiving destination.
2. Assign operational and data-processing ownership.
3. Approve the Privacy Policy and form-specific notice.
4. Define server-side validation, sanitisation, rate limiting, and spam/abuse protection.
5. Integrate authoritative success and failure responses.
6. Test data delivery, failure retention, accessibility, monitoring, and deletion/retention behavior.

Until then, valid submissions remain local and explicitly state that no information was submitted.

## Legal readiness

**BLOCKED — LEGAL CONTENT REQUIRED.** Privacy Policy, Terms, approved company contact details, governing entity details appropriate to the launch jurisdiction, and form-processing language require owner/legal approval. Cookie consent is not currently required by implemented tracking because analytics and nonessential cookies are absent; reassess if that changes.

## Node and production configuration

The audit machine uses Node 22.16.0. The current dependency graph warns for packages requiring Node 22.19+. `package.json` and README now recommend `>=22.19`; the user’s system was not modified.

`site.siteUrl` intentionally remains unset. Set it to the approved HTTPS production origin at deployment time so canonical and `og:url` metadata are generated. Do not publish canonicals or a sitemap using an invented domain.

## Brand assets and style-guide policy

The SVG favicon builds and loads. Text logo links have the accessible name “Pathwisse home.” No temporary icons are published. A production OG image and any final approved brand marks remain P1 assets.

Recommendation for `/style-guide`: **Option A — keep the route with `noindex, nofollow`**. It is the simplest current policy, is excluded from navigation, and avoids unnecessary authentication or environment branching. Excluding it from production can be reconsidered when deployment requirements are approved.

## Launch blockers

### P0 — Must fix before launch

| Issue                                                | Severity | Affected pages                                        | Recommended action                                                                                           | Fix now? | Owner                            |
| ---------------------------------------------------- | -------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------- | -------------------------------- |
| Student Get Started destination is unapproved        | P0       | Global header, Home, Students, How It Works, Programs | Approve the authoritative signup/onboarding URL, then enable and test all student CTAs                       | No       | Product owner — TBD              |
| Sign In destination is unapproved                    | P0       | Global header                                         | Approve the authoritative authentication URL, then enable and test the link                                  | No       | Product/engineering owner — TBD  |
| Institution form has no submission path              | P0       | Contact and all Request Demo journeys                 | Complete the six form-readiness actions above                                                                | No       | Product/operations/privacy — TBD |
| Production origin and deployment path are unresolved | P0       | Site-wide                                             | Approve hosting/domain, configure `site.siteUrl`, canonical/sitemap, release checks, rollback, and ownership | No       | Engineering/operations — TBD     |
| Legal launch content is absent                       | P0       | Site-wide; especially Contact                         | Obtain approved Privacy Policy, Terms, company contact details, and form processing notice before collection | No       | Legal/product owner — TBD        |

### P1 — Should fix before launch

| Issue                                                           | Severity | Affected pages                                  | Recommended action                                                                           | Fix now?          | Owner               |
| --------------------------------------------------------------- | -------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------- | ------------------- |
| Production OG image absent                                      | P1       | Social sharing site-wide                        | Approve and add one appropriately sized brand asset; do not fabricate it                     | No                | Brand owner — TBD   |
| Node runtime below recommended minimum                          | P1       | Build/deployment                                | Upgrade local and CI runtime to Node 22.19+                                                  | No; system change | Engineering — TBD   |
| Product capability verification incomplete                      | P1       | Product-experience and capability-adjacent copy | Review against authoritative product source before adding screenshots or feature claims      | No                | Product owner — TBD |
| No visual regression baseline or assistive-technology user test | P1       | Site-wide                                       | Capture approved baselines after final assets/domain and complete screen-reader verification | Partly            | QA — TBD            |

### P2 — Can follow after launch

| Issue                                | Severity | Affected pages                   | Recommended action                                                                                   | Fix now? | Owner                   |
| ------------------------------------ | -------- | -------------------------------- | ---------------------------------------------------------------------------------------------------- | -------- | ----------------------- |
| Analytics not configured             | P2       | Site-wide                        | Choose a privacy-reviewed platform and implement only approved PRD events if measurement is required | No       | Product/marketing — TBD |
| Product screenshots unavailable      | P2       | Home product-experience section  | Integrate only approved real UI; current honest conceptual fallback can ship                         | No       | Product/brand — TBD     |
| Program catalogue remains unverified | P2       | Programs and supporting sections | Publish catalogue data only after authoritative business verification                                | No       | Program owner — TBD     |

## Safe corrections completed in this audit

1. Prevented Sign In, Get Started, and Start Your Journey from misrouting to the institution form.
2. Fixed trailing-slash-safe active navigation state.
3. Corrected the internal style guide to one H1.
4. Added Twitter summary-card metadata without inventing an image.
5. Added a branded, noindex 404 route.
6. Added a domain-neutral `robots.txt`.
7. Replaced stale internal route descriptions and README implementation status.
8. Added the technically justified Node `>=22.19` engine recommendation.

## Final recommendation

Do not deploy yet. The exact next action is for the product owner to approve the student signup URL, Sign In URL, production domain/host, and the owner/provider/privacy package for institution-form submissions. Once those decisions are recorded, implement the destinations and form adapter, add approved legal content, configure the canonical origin and sitemap, upgrade CI to Node 22.19+, and rerun this audit against a production-like preview.
