# Pathwisse website implementation plan

**Status:** Active; Phases 0–5A completed on 2026-09-20

## Phase 0 — Project / ECC foundation

**Status:** Completed.

**Objective:** Confirm repository instructions, architecture, approved destinations, product scope, proof status, privacy needs, and media rights.  
**Dependencies:** Approved PRD and architecture decision.  
**Deliverables:** Bootstrap decision, ADRs, claim register, route/destination register.  
**Verification:** Instruction audit and decision review.  
**Exit:** Architecture and prerequisites approved.

## Phase 1 — Application scaffold

**Status:** Completed. Astro check, ESLint, formatting, and production build pass; seven static routes are generated.

**Objective:** Create only the approved greenfield app shell.  
**Dependencies:** Phase 0.  
**Deliverables:** Framework config, scripts, source structure, baseline route shell.  
**Verification:** Install/build/lint/typecheck.  
**Exit:** Empty shell builds with no unnecessary infrastructure.

## Phase 2 — Tokens and typography

**Status:** Completed. The provisional v1 palette, Instrument Sans typography, spacing/layout tokens, section rhythms, buttons, links, surfaces, focus states, and responsive foundations are implemented and verified.

**Objective:** Implement approved design foundations.  
**Dependencies:** Brand/font decisions.  
**Deliverables:** Tokens, global styles, type loading, focus and responsive foundations.  
**Verification:** Contrast, font loading, breakpoint checks.  
**Exit:** Foundations are reusable and documented.

## Phase 3 — Global shell

**Status:** Completed alongside Phase 2. Header, mobile navigation, footer, base layout metadata, active-route states, and the internal noindex style guide are implemented and verified.

**Objective:** Build navigation, footer, layout, containers, metadata baseline.  
**Dependencies:** Phases 1–2; verified routes and legal links.  
**Deliverables:** Header, mobile menu, footer, shell, CTA configuration.  
**Verification:** Keyboard, route, responsive, and link checks.  
**Exit:** All public routes can use the shell.

## Phase 4 — Homepage structural build

**Status:** Completed. All fourteen approved sections are implemented as static Astro components with typed local content. Responsive inspection passed at 375px, 768px, 1024px, and 1440px; accessibility structure, CTA routes, build, lint, and type checks pass. Advanced motion and production media remain intentionally excluded.

**Objective:** Implement the fourteen-section information hierarchy without advanced motion.  
**Dependencies:** Approved homepage content and claims.  
**Deliverables:** Semantic sections, responsive structure, placeholder-free approved media or honest fallbacks.  
**Verification:** Content, accessibility, responsive, and claims QA.  
**Exit:** Narrative works as a static page.

## Phase 5 — Homepage visual storytelling

**Status:** Phase 5A static browser-built storytelling implemented. The hero, gap, connected journey, student story, product reservations, institution relationship, and methodology now share one static path language. Real product screenshots and approved human media remain blocked and incomplete.

**Objective:** Add approved editorial visuals and explanatory compositions.  
**Dependencies:** Media rights and design foundation.  
**Deliverables:** Career-path visual, student story visual, institution visual where approved.  
**Verification:** Visual meaning, performance, alt text, mobile review.  
**Exit:** Visuals clarify rather than decorate.

### Phase 5A — Visual direction approval

Approve the hero concept, Pathwisse path grammar, human-media policy, Aanya treatment, institution direction, and product screenshot request.

**Status:** Completed. Approved direction implemented without advanced motion, generated media, or fabricated UI.

### Phase 5B.1 — Product screenshot preparation

**Status:** Completed. Screenshot requirements, privacy constraints, capture standards, approval workflow, typed asset manifest, public directory structure, and safe placeholder fallback are defined. Direction, Progress, and Evidence remain blocked pending product verification.

### Phase 5B.2 — Approved media integration

**Status:** Blocked pending authoritative product access. The homepage has been refined to remain launchable without screenshots or capability-specific product claims. Integrate only approved, optimized real product screenshots after product and privacy verification.

### Phase 5B.1A — Product capability verification

**Status:** Blocked by external dependency. The available website documents and old prototype are not authoritative product evidence. Verification resumes when the current product repository or build is available; product verification remains an external dependency and does not block other public website development.

### Phase 5C — Motion refinement

**Status:** Completed. Finite CSS/SVG path and sequence enhancements now support the hero, employment gap, connected journey, four-stage approach, Aanya story, institution relationship, and trust methodology. One shared native observer runs each enhancement once; static and reduced-motion states remain complete. No animation dependency or framework hydration was added.

Authoritative product capability verification remains a separate unresolved external dependency. Product screenshot integration may proceed later when access is restored; it does not block continued public website development.

## Phase 5B — Homepage visual experience upgrade

**Status:** Completed (2026-09-20). Homepage only. Redesigned hero (layered browser-built scene, media slot), scroll-bound Employment Gap, merged six-stage Approach sequence (native-scroll pin on desktop), sticky Aanya illustration with media slot, section bridges, and larger editorial typography. Added `CinematicMedia.astro` and a small shared scroll engine (`PageShell.astro`). No dependency added; no media files fabricated; no product UI. See `docs/design/HOMEPAGE_VISUAL_UPGRADE.md`. Secondary-page propagation is the next visual phase.

## Phase 6 — How It Works + Students + Institutions

**Objective:** Implement the model, student journey, and institution narrative pages.  
**Dependencies:** Verified capabilities and safe CTA destinations.  
**Deliverables:** Routes, content, product-safe explanatory experiences, and FAQs.  
**Verification:** Claims, navigation, links, responsive behavior, and accessibility QA.  
**Exit:** Student and institution journeys are clear and bounded.

### Phase 6A — How It Works

**Status:** Completed. The route now explains the product-agnostic Pathwisse employability approach through fragmentation, the six-part model, five editorial stages, connection logic, student and institution perspectives, explicit claim boundaries, and two audience CTAs. Responsive, accessibility, claim-governance, build, lint, and browser verification passed. No product UI or unverified workflow was introduced.

### Phase 6B — Students

**Status:** Completed. The route now gives students a personal, product-safe explanation of fragmented learning, direction, purposeful development, application, demonstration, placement conversations, the illustrative Aanya journey, Pathwisse's intended role, conceptual program support, and bounded FAQs. Responsive, accessibility, claim-governance, build, lint, and browser verification passed. No product UI or unverified capability was introduced.

### Phase 6C — Institutions

**Status:** Completed. The route now gives colleges, universities, placement teams, and TPOs a product-safe explanation of the timing problem, fragmented employability activity, the institutional Pathwisse perspective, earlier structure, the student development journey, TPO questions, intended connections, conceptual program support, implementation principles, data responsibility, and bounded FAQs. Responsive, accessibility, claim-governance, build, lint, and browser verification passed. No dashboard, analytics, integration, readiness score, monitoring workflow, or institutional outcome claim was introduced.

## Phase 7 — Institutions

**Status:** Superseded by and completed through Phase 6C. The original institution milestone was retained for planning history; Programs remain unstarted.

**Objective:** Implement institution narrative and demo path.  
**Dependencies:** Workflow, privacy, implementation, and form decisions.  
**Deliverables:** Institution page, verified visuals, demo entry.  
**Verification:** Institutional claims, privacy, form, responsive, and accessibility QA.  
**Exit:** No invented dashboard, score, integration, or outcome claim remains.

## Phase 8 — Programs + About + Contact

**Objective:** Add verified catalogue, company story, and contact behavior.  
**Dependencies:** Program data, company approvals, form destination and legal copy.  
**Deliverables:** Routes and content architecture.  
**Verification:** Content, SEO, forms, links, and claims QA.  
**Exit:** All approved public routes are complete.

### Phase 8A — Programs

**Status:** Completed in Mode B. Catalogue verification found no authoritative named offering or approved fields for audience, format, duration, delivery, pricing, certification, curriculum, outcomes, eligibility, enrollment, or institutional delivery. `PROGRAM_CATALOGUE.md` records the evidence boundary and claim register. The route now explains program philosophy, conceptual roles, student and institution perspectives, evaluation principles, prohibited claims, bounded FAQs, and safe audience CTAs without presenting a fabricated catalogue. Responsive, accessibility, claim-governance, build, lint, and browser verification passed.

### Phase 8B — About

**Status:** Completed. The route now explains the problem behind Pathwisse, the bounded “last mile” idea, intended product role, employability approach, brand beliefs, definition of employability, verified company identity, explicit claim boundaries, future direction, and audience CTAs. Only Shaquantum Labs Private Limited's approved identity and role as builder of Pathwisse are published. Team identities, photography, founding details, locations, registrations, investors, awards, traction, customers, and partners remain omitted pending approval. Responsive, accessibility, claim-governance, build, lint, and browser verification passed.

### Phase 8C — Contact / Request a conversation

**Status:** Completed for the static front end. The route now provides an institution-first conversation request, minimal data collection, accessible local validation, honest privacy boundaries, next-step context, student redirection, company identity, and alternative routes. Submission infrastructure remains blocked pending approval of a provider, destination, privacy terms, abuse protection, and operational ownership. Until then, valid submissions are stopped locally and explicitly state that no information was submitted.

## Phase 9 — Motion / media refinement

**Objective:** Add finite, purposeful motion.  
**Dependencies:** Static pages and motion system.  
**Deliverables:** Scroll reveals, paths, transitions, reduced-motion fallbacks.  
**Verification:** Reduced motion, performance, mobile, keyboard, and visual QA.  
**Exit:** Motion never blocks or changes essential meaning.

**Status (2026-09-24):** Generated motion-graphic video pass complete — six branded Canvas loops embedded via `CinematicMedia` (see `docs/design/MOTION_SYSTEM.md`); redundant sections merged or removed; copy reduced. Open: real-device Safari/iOS and screen-reader QA.

## Phase 10 — SEO / accessibility / performance

**Objective:** Complete technical quality pass.  
**Dependencies:** All routes.  
**Deliverables:** Metadata, canonical behavior, image optimization, audits, analytics consent.  
**Verification:** Automated and manual audits.  
**Exit:** Launch checklist passes.

## Phase 11 — Browser and responsive QA

**Objective:** Validate supported browsers, devices, content lengths, forms, and routes.  
**Dependencies:** Phase 10.  
**Deliverables:** QA report and fixes.  
**Verification:** Browser matrix, visual review, broken-link and console checks.  
**Exit:** No release-blocking defects.

## Phase 12 — Deployment readiness

**Objective:** Prepare the approved hosting/deployment path.  
**Dependencies:** Hosting, domain, legal, analytics, form, and rollback decisions.  
**Deliverables:** Deployment configuration and runbook.  
**Verification:** Production-like build, smoke test, monitoring/rollback review.  
**Exit:** Explicit release approval.

## Full-site launch readiness audit

**Status:** Completed on 2026-09-20; website remains **not launch-ready** while P0 blockers remain.

**Completed:** All public routes and the internal style guide were audited for content, claims, navigation, CTAs, accessibility, responsive behavior, SEO, motion, performance, forms, security, privacy, links, browser quality, Node compatibility, and deployment readiness. Safe corrections include honest unavailable product actions, active-route normalization, one-H1 style-guide structure, Twitter metadata, a branded 404, `robots.txt`, current repository status, and Node engine guidance. Full findings are recorded in `docs/qa/LAUNCH_READINESS_AUDIT.md`.

**Second pass (2026-09-20):** Re-verified built output, links, metadata, claims, placeholders, and dependencies. Fixed two contrast issues (accent-colored small text, form control borders). Verdict unchanged: **not launch-ready** while the five P0 blockers below remain. Real-browser re-check of the contrast fixes is pending.

### P0 resolution phase — production wiring, then Vercel preparation

**Status:** Completed for engineering; **not launch-ready.**

- **Done:** approved Get Started (`https://app.pathwisse.com/signup`) and Sign In (`https://app.pathwisse.com/login`) wired from one config (`src/content/site.ts`); all six "Start Your Journey" CTAs and the header actions are live links; Request a Demo still goes to `/contact`. Production origin `https://pathwisse.com` drives canonicals, `og:url`, the sitemap (`@astrojs/sitemap`), and `robots.txt`. **Vercel selected as host.**
- **Deferred / removed:** A Resend-backed `/api/demo-request` endpoint and the `@astrojs/node` adapter were built and then removed when Resend was not approved. The site is **fully static again**, with no adapter, no server route, and no environment variables. `/contact` is email-first with `pathwisse@gmail.com`. The form provider remains **open**. Provider-agnostic validation (`src/lib/demoRequest.ts`) and the front-end form component are kept unused for a future decision.
- **Still open:** approved Privacy Policy, Terms, and any legally required company details (`/privacy` and `/terms` were intentionally not created or linked); product-owner decision on launch strategy A (web form required) or B (verified email contact only).

**Pre-launch blockers (original list, superseded by the status above):** Approve student signup and Sign In destinations; configure institution form submission and privacy/abuse controls; provide approved Privacy Policy, Terms, and company contact details; approve hosting and production origin; configure canonicals/sitemap; and use Node 22.19+ in the delivery environment.

**Pre-launch quality work:** Add an approved social sharing image, verify final capability-adjacent copy against the authoritative product, establish final visual baselines, and complete assistive-technology verification on a production-like preview.

**Post-launch candidates:** Privacy-reviewed analytics, approved product screenshots, and verified program catalogue data. These must not be inferred or fabricated to unblock launch.

## Open decisions

Hosting, analytics, form handling, program data shape, media hosting, fonts, brand tokens, signup/sign-in destinations, demo destination, privacy/consent, and ownership are TBD. Framework is approved as Astro + TypeScript. CMS, backend, database, and authentication are explicitly out of scope for the current architecture. Do not guess.
