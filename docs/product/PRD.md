# Pathwisse public website PRD

**Status:** Implementation-ready product specification; pre-build  
**Owner:** TBD  
**Source documents:** `PATHWISSE_WEBSITE_BLUEPRINT.md`, `POSITIONING.md`, `VOCABULARY.md`, `MESSAGING.md`, `UX_PSYCHOLOGY.md`

## 1. Document purpose and scope

This PRD is the shared source of truth for product ownership, UX, UI, content, frontend engineering, motion, QA, SEO, and analytics decisions for the public Pathwisse website.

Scope is limited to the public marketing website: Home, How It Works, For Students, For Institutions, Programs, About, and Contact / Demo. Authenticated student, institution, LMS, dashboard, administration, and back-office experiences are out of scope. The public site may link to authenticated destinations, but does not redesign them.

No UI, product capability, proof point, or outcome may be invented to satisfy this specification.

Until the authoritative Pathwisse product source is verified, the public website must not present capability-specific UI, screenshots, dashboards, measurements, or workflow claims. Product-dependent concepts may appear only as clearly qualified strategic beliefs, intended directions, or illustrative examples—not as current functionality.

## 2. Product summary

- **Company:** Shaquantum Labs Private Limited.
- **Product:** Pathwisse.
- **Category direction:** Employability Operating System for higher education, always explained in plain language.
- **Primary audience:** Students.
- **Secondary audiences:** Colleges / universities, then placement teams / TPOs.
- **Strategic territory:** The last mile between learning and being able to communicate capability in an opportunity context.
- **Core idea:** Connect the space between “I learned this” and “I can prove it.”
- **Working product role:** Connect career direction, structured development, applied work, evidence, and preparation.

“Employability Operating System” remains a working category direction, not immutable final copy. The site must explain it functionally and must not imply a job, placement, salary, ranking, or accreditation outcome.

## 3. Objectives and non-goals

### Business objectives

1. Help qualified students begin the appropriate signup journey.
2. Generate qualified institutional demo conversations.
3. Build credibility before requesting high-friction information.
4. Explain how verified programs fit within the employability journey.
5. Establish a distinctive, premium, human technology brand.

No numeric targets are approved. Analytics should measure behavior first; targets require business confirmation.

### UX objectives

1. A visitor can identify the learning/employability context quickly.
2. Students recognize their fragmented journey without shame.
3. Visitors understand the model before seeing detailed features.
4. Students and institutions can find the correct path with few choices.
5. Claims, examples, and product proof are clearly distinguished.
6. Essential meaning survives mobile layout and reduced motion.

### Non-goals

- Redesigning the authenticated student app or institution dashboard.
- Building an LMS, internal admin, or placement operating workflow.
- Creating capabilities, dashboards, analytics, integrations, assessments, or readiness scores not verified by product owners.
- Inventing metrics, testimonials, partnerships, customer logos, case studies, or employment outcomes.
- Turning Pathwisse into a generic course marketplace.
- Adding pages without a strategic visitor question.
- Installing a framework or packages before an architecture decision.

## 4. Audience definitions

| Audience                | Needs / questions                                                                                  | Likely objections                                                                              | Desired action                                   |
| ----------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Students                | Direction, relevant development, applied work, evidence, and preparation; “What should I do next?” | Another course platform? Will it get me hired? Is it for my stage? Will it take too much time? | Begin the verified signup / journey destination. |
| Colleges / universities | Visibility into development, support coordination, relevance, privacy, implementation clarity      | Difference from LMS or placement software? Who uses it? What proof exists?                     | Request a Demo.                                  |
| Placement teams / TPOs  | Earlier support conversations, coordination, student context, workload clarity                     | How is readiness defined? What data is visible? Does this add process?                         | Request a Demo or discuss context.               |

These are hypotheses from the UX psychology document and require research validation.

## 5. Information architecture and navigation

### Routes

```text
/
/how-it-works
/students
/institutions
/programs
/about
/contact
```

Use `/contact` for the institution demo flow unless business testing shows that `/demo` deserves a distinct route. A separate `/demo` is justified only if it has a materially different form, audience, or conversion context.

Destinations for **Sign In**, student **Get Started**, and institution **Request a Demo** are currently configuration decisions. Do not fabricate URLs; use environment/configuration values or visibly mark the links as pending until confirmed.

### Global navigation

Desktop: logo, How It Works, For Students, For Institutions, Programs, About, Sign In, and one primary CTA. On institution-focused pages the primary CTA may be Request a Demo. Avoid mega menus until real content volume justifies them.

Mobile: collapsed menu in logical reading order, with audience pages before About; keep Sign In as a utility action and distinguish Get Started from Request a Demo. Use semantic buttons, keyboard access, focus management, Escape-to-close, and no hover-only content.

### Footer

Include only existing routes: Product / How It Works, Students, Institutions, Programs, Company / About, Contact, Sign In, Privacy, Terms, company name, and copyright. Add social links only when verified. Legal pages and legal copy require confirmation before publishing.

## 6. Homepage requirements

The homepage is a narrative, not a feature catalogue. Its order is:

```text
01 Hero
02 Student Reality
03 Education → Employment Gap
04 Introducing Pathwisse
05 How Pathwisse Works
06 Illustrative Student Story
07 Product Experience
08 Student Value
09 Institution Transition
10 Institution Value
11 Programs
12 Trust / Methodology
13 Brand Belief
14 Final CTA
```

Each section must have one question, one job, one dominant message, and a natural transition. The following requirements apply to all sections: semantic headings, responsive layout, accessible media alternatives, no unsupported claims, and content that remains complete without motion.

### 6.1 Hero

- **ID:** `home-hero`.
- **Objective:** Establish relevance and the student-first promise in the first viewport.
- **Audience:** Students first; institution route visible but secondary.
- **Visitor question:** What is Pathwisse and why should I continue?
- **Copy intent:** Structured direction, demonstrable capability, and preparation for opportunity. Use working category language only with a plain explanation.
- **Working copy direction:** “Connect what you learn with the work you can show.” Final production copy requires approval.
- **Hierarchy:** Eyebrow/category → concise H1 → supporting explanation → one student CTA → subtle institution path.
- **CTA:** Student Get Started / Start Your Journey, destination pending. Secondary: Explore for Institutions or Request a Demo, visually subordinate.
- **Media:** Approved cinematic career-path visual or equivalent editorial asset with a meaningful learning-to-opportunity relationship.
- **Interaction/motion:** Slow path/light movement or layered depth only; no meaning depends on animation. Reduced motion shows the still image.
- **Accessibility/responsive:** H1 readable at mobile widths; meaningful alt text; decorative SVG hidden from assistive technology; text contrast verified.
- **Acceptance:** User can identify context within first viewport; student CTA is clear; institution path is visible; no feature wall; no unsupported promise.

### 6.2 Student Reality

- **ID:** `home-student-reality`.
- **Objective:** Create recognition through courses, certificates, workshops, projects, and a final-year interview without shame.
- **Question:** “I have done these things, but how do they connect?”
- **Content:** Familiar fragments moving toward a question, not a list of failures.
- **Visual:** Editorial fragments or student context; explanatory composition preferred over decorative stock photography.
- **Motion:** Fragments may gently align; static state must communicate the same idea.
- **CTA:** None or low-friction See How It Works.
- **Acceptance:** Tone says “the journey is disconnected,” not “your education failed.”

### 6.3 Education → Employment Gap

- **ID:** `home-gap`.
- **Objective:** Expand personal recognition into a structural explanation.
- **Question:** Why are learning and hiring often separate journeys?
- **Content:** Student perspective (activity without a clear story), college perspective (support visibility), TPO perspective (late preparation context).
- **Message:** Learning → Application → Evidence → Opportunity; do not claim employment causation.
- **Visual/motion:** One calm path replacing separated fragments; no charts or fake data.
- **Acceptance:** Visitor understands the gap is structural and sees why a connecting role could matter.

### 6.4 Introducing Pathwisse

- **ID:** `home-introduction`.
- **Objective:** Present Pathwisse as the answer to the preceding tension.
- **Question:** What would a connected journey look like?
- **Content:** Pathwisse is intended to connect direction, development, applied work, evidence, and preparation.
- **Visual:** Transition from fragmented elements to a coherent editorial path.
- **CTA:** Low-friction How It Works.
- **Acceptance:** Category label is paired with a plain explanation; no implied guarantee or unverified capability.

### 6.5 How Pathwisse Works

- **ID:** `home-model`.
- **Objective:** Provide a compact mental model.
- **Stages:** Find your direction; Build intentionally; Turn learning into evidence; Prepare to prove it.
- **For each stage:** Use a title, one intent sentence, an approved capability only if verified, and a simple explanatory visual.
- **Interaction:** Scroll or sequential reveal is optional; do not require hover or clicking to understand stages.
- **Acceptance:** A visitor can retell the four-stage model without seeing a dashboard or feature grid.

### 6.6 Illustrative Student Story

- **ID:** `home-story`.
- **Objective:** Make the model concrete through one continuous fictional journey.
- **Persona:** A student such as Aanya, subject to content approval and not presented as a real user.
- **Mandatory label:** **Illustrative student journey**.
- **Progression:** uncertainty → direction → intentional development → applied work → evidence → preparation.
- **Length:** Short enough to preserve the homepage rhythm; one moment per stage, no invented outcome.
- **Motion:** Gentle movement between moments; no testimonial styling, quotes, metrics, or “after” result.
- **Acceptance:** The story is visibly illustrative and does not imply customer proof.

### 6.7 Product Experience

- **ID:** `home-product`.
- **Objective:** Establish functional trust after conceptual understanding.
- **Requirements:** Use real approved product UI only. Screens such as Direction, Progress, or Evidence are allowed only if they exist and are named accurately.
- **Annotations:** Add only annotations that advance understanding; never fabricate sample data or status badges.
- **Fallback:** If screenshots are not approved, use an honest conceptual diagram or omit the section until real UI is available.
- **Acceptance:** UI demonstrates the concept rather than decorating it; no fake dashboards; screen count is minimal and coherent.

### 6.8 Student Value

- **ID:** `home-student-value`.
- **Objective:** Translate capability into personal meaning.
- **Structure:** Know where you’re going; know what to work on; have something to show; prepare to communicate it.
- **CTA:** Explore Pathwisse for Students, destination pending.
- **Acceptance:** Benefits are not presented as guaranteed outcomes and remain distinct from feature labels.

### 6.9 Institution Transition

- **ID:** `home-institution-transition`.
- **Objective:** Expand the same story to institutions.
- **Message:** A student journey should not become visible only during placement season.
- **Constraint:** Do not imply analytics, tracking, readiness measurement, or earlier visibility unless product capability is verified.
- **Acceptance:** This feels like an expansion of the student problem, not a second corporate website.

### 6.10 Institution Value

- **ID:** `home-institution-value`.
- **Objective:** Explain institutional relevance with credible boundaries.
- **Potential themes:** clearer support conversations, faculty and mentor collaboration, applied work, and placement preparation where supported.
- **CTA:** Request a Demo; secondary Explore for Institutions.
- **Acceptance:** No placement, ranking, NAAC/NBA, KPI, or outcome promises; every workflow claim has a validation status.

### 6.11 Programs

- **ID:** `home-programs`.
- **Objective:** Show programs as interventions within the journey, not the category itself.
- **Content:** Verified program categories only; audience and intent; no invented modules, price, duration, outcomes, or success statistics.
- **Visual:** Editorial program context, not marketplace card grids.
- **CTA:** Explore a Program or enquire only when route and catalogue are verified.
- **Acceptance:** The visitor understands system → journey → program, not catalogue → brand.

### 6.12 Trust / Methodology

- **ID:** `home-trust`.
- **Objective:** Earn trust without manufacturing proof.
- **Available forms:** company identity, method, product clarity, privacy information when approved, transparent claims, approved team information, and real UI.
- **Reserved future slots:** metrics, testimonials, case studies, and partner logos only after evidence and approval.
- **Acceptance:** Trust language distinguishes evidence from positioning and states limits plainly.

### 6.13 Brand Belief

- **ID:** `home-belief`.
- **Objective:** Close emotionally with the strategic idea.
- **Theme:** Education should move from completion toward demonstrable capability.
- **Visual/motion:** Restrained typography and a calm forward path; no new product concept.
- **Acceptance:** Belief is memorable but not a hiring guarantee.

### 6.14 Final CTA

- **ID:** `home-final-cta`.
- **Objective:** Make the next action unambiguous.
- **Student:** Start Your Journey.
- **Institution:** Request a Demo.
- **Constraint:** No competing primary actions, false urgency, or invented expectation after submit.

## 7. Secondary page requirements

Each page should preserve the narrative logic and use the common fields: objective, audience, visitor question, psychological job, content hierarchy, visual/motion, CTA, accessibility, responsive behavior, dependencies, and acceptance criteria.

### How It Works

Flow: intro → fragmented employability problem → Pathwisse journey → career direction → structured development → application → evidence → preparation → connection → student/institution CTA. Explain the model before detailed UI. Acceptance: visitor understands the sequence and its limits without a feature wall.

### For Students

Flow: hero → student problem → Pathwisse role → direction → development → applied work → evidence → preparation → approved product walkthrough → verified programs → FAQ → Get Started. Address course-platform, time, stage, payment, and outcome objections without guarantees. Acceptance: a student can identify a practical next step and understand what remains unverified.

### For Institutions

Flow: hero → institution problem → late visibility → Pathwisse model → student progression → institution relevance → programs/intervention → approved product experience → implementation → privacy/security → FAQ → Request Demo. Do not invent dashboards, analytics, reports, integrations, scores, or outcomes. Acceptance: a team understands what conversation to have next and what must be evaluated.

### Programs

Purpose: explain verified programs in the context of direction, capability, applied work, and evidence. Use taxonomy only when real catalogue volume requires it. Use cards only when each card has verified content. Filters are optional and must not create marketplace clutter. Pricing and detail behavior are pending business confirmation.

### About

Flow: why Pathwisse exists → problem → approach → Shaquantum Labs → approved team → principles → contact. Publish company, team, and claims only after verification. Acceptance: legitimacy is established without invented credentials or proof.

### Contact / Demo

Objective: start the correct conversation and set expectations. Include institution demo and relevant student contact/support only if confirmed. Use minimum necessary fields, clear labels, inline errors, loading, success, duplicate-submit prevention, privacy reassurance, keyboard access, and a truthful post-submit message. Exact fields, routing, CRM, response expectations, and legal copy are pending business confirmation.

## 8. Content requirements and copy rules

Content types: eyebrow, H1, supporting copy, section intro, body, CTA, proof block, product annotation, program item, FAQ, and legal microcopy. Content must follow `VOCABULARY.md` and `MESSAGING.md`.

Enforce clarity before cleverness, active voice, short paragraphs, human student language, plain institutional language, value before technology, and no unsupported superlatives or guaranteed outcomes. Avoid Transform, Empower, Unlock, Revolutionize, Future-ready, Next-generation, Cutting-edge, Seamless, Holistic, AI-powered, Ecosystem, 360-degree, Personalized, and Innovative unless explicitly validated in context.

Classify every material claim as verified fact, approved positioning, hypothesis, illustrative, requires validation, or prohibited until verified. Hypotheses and validation-required claims do not publish as facts.

## 9. Design, media, and motion direction

Direction is premium technology plus human/student storytelling: editorial layout, strong typography, purposeful whitespace, restrained color, real product UI, explanatory visuals, and meaningful motion. Avoid template SaaS patterns, excessive gradients, glass cards, floating dashboards, pills/badges, generic icon grids, and decorative 3D.

Establish reusable tokens for typography, spacing, content width, radius, borders, elevation, breakpoints, colors, motion durations, and focus states. Token values require design approval; do not duplicate arbitrary values.

Media may include approved student imagery, cinematic educational environments, motion graphics, editorial diagrams, and real product screenshots. Every major asset needs a narrative purpose, alt text or equivalent, an owner, and usage rights.

Motion categories are entry reveals, path animation, product transitions, hover, section transitions, and video. Each needs purpose, trigger, duration, and reduced-motion fallback. CSS transforms and opacity are preferred. Motion must not block reading, require autoplay, or carry essential information alone. Do not use paid video tools, external stock footage, YouTube embeds, or placeholder autoplay video.

## 10. Responsive, accessibility, and performance requirements

Support mobile, tablet, laptop, and large desktop while preserving narrative order and CTA hierarchy. Avoid horizontal overflow, unreadable text, desktop-only comprehension, and heavy mobile motion.

Accessibility is an acceptance requirement: semantic HTML, logical heading hierarchy, WCAG-conscious contrast, keyboard operation, visible focus, reduced motion, meaningful alt text, accessible forms and error announcements, touch-friendly controls, and no hover-only interaction.

Performance principles: minimize JavaScript, lazy-load non-critical media, use responsive optimized images, avoid oversized video and blocking animation libraries, preserve fast first content rendering, and avoid layout shifts. Numeric budgets require technical review; none are invented here.

## 11. SEO requirements

Create an SEO record for every public route containing title, meta description, canonical URL, H1, social metadata, structured data where appropriate, internal links, and crawl/index behavior. Do not keyword-stuff or publish pages whose content is not ready.

| Route           | Search intent to define                                  | Required SEO status                          |
| --------------- | -------------------------------------------------------- | -------------------------------------------- |
| `/`             | Pathwisse category and learning-to-employability context | Copy and metadata pending approval.          |
| `/how-it-works` | How the employability journey connects                   | Pending content validation.                  |
| `/students`     | Student direction, applied work, evidence, preparation   | Pending audience research and product scope. |
| `/institutions` | Institutional employability support and evaluation       | Pending workflow/privacy validation.         |
| `/programs`     | Verified Pathwisse programs                              | Pending catalogue and access model.          |
| `/about`        | Shaquantum Labs and Pathwisse rationale                  | Pending company/team approval.               |
| `/contact`      | Demo/contact intent                                      | Pending form and legal configuration.        |

## 12. Analytics requirements

Measure without selecting a platform until one is approved. Candidate events: student CTA click, institution CTA click, demo-form start, demo-form submit, signup outbound click, program view, program CTA, navigation usage, FAQ interaction, and strategically relevant media play. Define event names, parameters, consent behavior, ownership, and retention before implementation. Do not treat raw clicks as outcomes.

## 13. Forms

All forms require clear labels, field purpose, inline validation, meaningful errors, loading state, success state, duplicate-submit prevention, privacy text, keyboard access, and accessible announcements. Exact fields, validation, routing, notification, CRM, retention, and consent wording are pending business/legal confirmation. Do not over-collect data.

## 14. Claims and proof governance

Before publication, content owner and product/business owner must review every proof-related statement. No content may publish a claim currently classified as hypothesis, requires validation, or prohibited until verified. Metrics, outcomes, testimonials, logos, partnerships, case studies, placement rates, salaries, rankings, accreditation improvements, readiness scores, and guarantees remain blocked without evidence and approval.

## 15. CMS and content architecture

Initial recommendation: use code-managed content unless the repository audit and operating model show frequent non-engineering updates. A hybrid or CMS approach may be justified for programs, FAQs, blog/case studies, or trust content only after update frequency, content ownership, preview, validation, and deployment needs are known. Do not introduce a CMS automatically. Decision: **TBD**.

## 16. Technical architecture constraints

The current workspace contains no application code or package manifest; the previous website codebase was removed. Therefore current stack, package manager, build tooling, deployment, dependencies, and framework cannot be asserted from the repository.

Do not automatically introduce Next.js, React, Astro, Vue, or another framework. Before implementation, complete a repository/bootstrap audit and record an architecture decision against website complexity, motion, maintainability, SEO, deployment, performance, and ECC workflow. A no-framework static approach may be suitable; this is not an approval. Do not install packages during this documentation task.

## 17. ECC / Codex working rules

Before implementation: read repository instructions, research unfamiliar technical decisions, plan major changes, preserve approved strategy, avoid broad rewrites, and verify incrementally. Any conflict between code and approved strategy must be flagged rather than silently resolved. Documentation and implementation changes should use conventional commits when a repository exists.

## 18. Testing and definition of done

Future QA layers: content and claims QA; route/navigation QA; form and CTA QA; responsive QA; accessibility audit; visual regression where useful; reduced-motion QA; performance audit; SEO metadata/canonical/structured-data QA; analytics event QA; cross-browser QA; and console/error review.

A page is done only when it matches this PRD, uses approved content, has no unsupported claims or placeholder media, works responsively, is accessible, performs acceptably, has working navigation and CTA destinations, respects reduced motion, has no console errors, and has been reviewed at major breakpoints.

## 19. Phased implementation plan

### Phase 0 — Repository and product audit

Confirm repository/bootstrap state, architecture, routes, destinations, product capabilities, media rights, privacy/legal requirements, and proof status.

### Phase 1 — Foundation

Choose and document architecture; establish project structure, tokens, typography, layout primitives, navigation, footer, SEO baseline, and accessibility baseline.

### Phase 2 — Homepage

Implement the fourteen-section narrative using approved content, media, and claims.

### Phase 3 — Students and How It Works

Implement student story, journey model, approved product explanation, and conversion routes.

### Phase 4 — Institutions

Implement institution narrative, privacy/implementation explanation, and demo route only after workflow validation.

### Phase 5 — Programs, About, Contact

Add verified catalogue, company content, forms, legal microcopy, and appropriate routes.

### Phase 6 — Motion and media refinement

Add restrained motion, reduced-motion fallbacks, responsive media, and performance optimization.

### Phase 7 — Accessibility, performance, SEO, analytics

Complete audits, metadata, events, consent, and technical refinements.

### Phase 8 — QA and release review

Run content, claims, route, form, responsive, browser, accessibility, motion, performance, SEO, analytics, and regression checks.

No phase is authorized by this document alone; implementation starts only after prerequisites and architecture decisions are approved.

## 20. Acceptance criteria summary

### Strategy and content

- [ ] Student-first narrative is intact.
- [ ] Every section answers a meaningful visitor question.
- [ ] Vocabulary and messaging follow approved documents.
- [ ] Illustrative stories are labeled.
- [ ] No unsupported claims, metrics, proof, or outcomes.

### Navigation and conversion

- [ ] All routes and CTA destinations are verified.
- [ ] Student and institution paths are distinct and clear.
- [ ] Mobile navigation is keyboard accessible.
- [ ] Forms have truthful success/error behavior.

### UX, design, and responsive

- [ ] Homepage follows the fourteen-section order or documents an approved change.
- [ ] No roadmap selector, dashboard-card visual language, fake UI, or feature-grid overload.
- [ ] Layout works at mobile, tablet, laptop, and large desktop.
- [ ] Whitespace, hierarchy, and editorial visuals support comprehension.

### Accessibility and motion

- [ ] Semantic structure, contrast, focus, keyboard, labels, alt text, and announcements pass review.
- [ ] Essential meaning works without animation.
- [ ] Reduced motion disables nonessential movement.
- [ ] Motion is purposeful and does not block reading.

### Performance and SEO

- [ ] Media is optimized and non-critical assets are deferred.
- [ ] No unnecessary heavy animation or oversized video.
- [ ] Metadata, canonical URLs, headings, social tags, internal links, and crawl behavior are reviewed.

### QA and claims

- [ ] Cross-browser and breakpoint review complete.
- [ ] No console errors or broken links.
- [ ] Analytics events are documented and consent-aware.
- [ ] Claims approval is recorded before release.

## 21. Open decisions register

| Category         | Decision                                                        | Current assumption                          | Owner | Required before           | Status |
| ---------------- | --------------------------------------------------------------- | ------------------------------------------- | ----- | ------------------------- | ------ |
| Product          | Which capabilities are live and publicly demonstrable?          | Blueprint describes intended role only.     | TBD   | Product/UI content        | Open   |
| Product          | What does Evidence mean in the actual product?                  | Conceptual term; validation required.       | TBD   | Claims and UI             | Open   |
| Product          | What is the program catalogue and access model?                 | Unknown.                                    | TBD   | Programs page             | Open   |
| Brand            | Is Employability Operating System the final category?           | Working hypothesis.                         | TBD   | Final copy                | Open   |
| Brand            | Is “last mile of education” primary or supporting?              | Working belief.                             | TBD   | Brand approval            | Open   |
| Content          | Final headlines, CTAs, FAQs, and proof language                 | Working intent only.                        | TBD   | Build                     | Open   |
| Design           | Final tokens, type, colors, assets, and motion values           | Not yet defined.                            | TBD   | UI implementation         | Open   |
| Technical        | Framework or no-framework approach                              | No current app exists; no assumption.       | TBD   | Bootstrap                 | Open   |
| Technical        | Hosting, deployment, package manager, and analytics platform    | Unknown.                                    | TBD   | Implementation            | Open   |
| Technical        | Code-managed, CMS, or hybrid content                            | Code-managed is the initial recommendation. | TBD   | Content architecture      | Open   |
| Legal / privacy  | Privacy, consent, retention, security, Terms                    | Must be approved.                           | TBD   | Forms and launch          | Open   |
| Business         | Signup, demo, pricing, response expectations, CRM routing       | Unknown.                                    | TBD   | Conversion implementation | Open   |
| Data / analytics | Event taxonomy, consent, ownership, retention                   | Candidate events only.                      | TBD   | Analytics implementation  | Open   |
| Business         | Approved company, team, customer, partner, or proof information | No public proof assumed.                    | TBD   | Trust/About               | Open   |

## 22. Source-of-truth hierarchy

```text
AGENTS.md / repository instructions
↓
Approved PRD
↓
Approved positioning / messaging / vocabulary / psychology documents
↓
Approved design system
↓
Implementation plan
↓
Code
```

If code conflicts with this PRD, flag the conflict and obtain a decision; do not silently change strategy to match an existing implementation.

## 23. Final PRD summary

- **Website purpose:** Explain and route visitors through Pathwisse’s learning-to-employability story, then make the appropriate student or institution action clear.
- **Audience priority:** Students; colleges/universities; placement teams/TPOs.
- **Primary student action:** Start Your Journey / verified signup destination.
- **Primary institution action:** Request a Demo.
- **Homepage narrative:** Recognition → fragmentation → connected model → Pathwisse → understanding → illustrative journey → product proof → value → institutions → programs → trust → belief → action.
- **Strategic territory:** The last mile between learning and demonstrable capability.
- **Biggest current risk:** Overclaiming product capability or proof while the live scope, evidence model, destinations, and institutional workflow remain unresolved.
- **Implementation prerequisites:** Repository/bootstrap audit; architecture decision; verified product capabilities and UI; approved content and claims; media rights; CTA destinations; privacy/legal approval; design tokens; analytics and deployment decisions.
