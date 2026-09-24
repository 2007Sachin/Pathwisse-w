# Programs & About Evidence Audit

## Programs

| Item                                 | Evidence                                                                                                                  | Source                                                               | Status | Public wording allowed                                                                    | Missing information                                                                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Actual Pathwisse programs            | No authoritative catalogue or verified program entries.                                                                   | `docs/product/PROGRAM_CATALOGUE.md`, `docs/product/PRD.md`           | RED    | None as named offerings.                                                                  | Program names, status, audience, eligibility, duration, format, delivery, curriculum, certificate, pricing, enrollment, owner approval. |
| Program philosophy                   | Programs may support employability journey stages conceptually.                                                           | `docs/product/PROGRAM_CATALOGUE.md`, `src/content/pages/programs.ts` | GREEN  | "Programs can support direction, development, application, preparation, and opportunity." | None if kept conceptual.                                                                                                                |
| Program outcomes / placement support | Placement, hiring access, salaries, guarantees, projects, mentorship, certificates, pricing, and duration are unverified. | `docs/product/PROGRAM_CATALOGUE.md`, `src/content/pages/programs.ts` | RED    | None.                                                                                     | Exact service definition, eligibility, proof, legal review, owner approval.                                                             |

## My Skill

| Claim                                              | Evidence                                                                                            | Status       | Safe interpretation                             | Missing information                                                                      |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------ | ----------------------------------------------- | ---------------------------------------------------------------------------------------- |
| My Skill exists as a public product module         | No route, component, data model, screenshot, or approved source found.                              | NOT VERIFIED | Do not publish.                                 | Product source, route/screen, owner confirmation.                                        |
| My Skill shows skill improvement over time         | Skills measurement, progress tracking, readiness calculation, and dashboards are blocked elsewhere. | RED          | Do not publish.                                 | Baseline/current logic, formula, validation limits, product proof, approved screenshots. |
| My Skill uses scores/current level/time comparison | No evidence found.                                                                                  | RED          | Do not publish.                                 | Data model, calculation method, UX proof.                                                |
| Institutions can see My Skill data                 | Explicitly unsupported by current claim audit.                                                      | RED          | Do not publish.                                 | Permission model, privacy/legal review, screen proof.                                    |
| Generic skill-development language                 | Supported as problem framing only.                                                                  | GREEN        | Use as student need, not as product capability. | None if not tied to My Skill.                                                            |

## Product Media

| Asset                          | Evidence                                                                                                                                                                       | Status | Use                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ----------------------------------------- |
| Product screenshots            | `src/content/productAssets.ts` has `PROD-01`, `PROD-02`, `PROD-03` blocked with `src: null`; `docs/design/PRODUCT_SCREENSHOT_SPEC.md` blocks screenshots pending verification. | RED    | Do not publish.                           |
| Public media folders           | Product/media folders are empty reserved slots.                                                                                                                                | RED    | Await approved media.                     |
| `public/favicon.svg`           | Only publishable standalone asset found.                                                                                                                                       | GREEN  | Favicon / compact brand mark only.        |
| QA screenshots in `artifacts/` | Internal page captures only.                                                                                                                                                   | AMBER  | QA/design review only, not proof content. |

## About Evidence

| Item                             | Evidence                                                                                          | Status | Recommendation                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------- |
| Company identity                 | Shaquantum Labs Private Limited appears in approved site/product content.                         | GREEN  | BUILD NOW.                                                    |
| Address / contact email          | Address and `pathwisse@gmail.com` appear in legal/contact docs; legal pages still pending review. | AMBER  | BUILD AFTER owner/legal approval if desired on About.         |
| Founder names / bios / photos    | No approved founder/team evidence.                                                                | RED    | Do not build.                                                 |
| Mission / vision                 | Strategic beliefs exist, but no exact approved formal mission/vision statements.                  | AMBER  | Use beliefs now; label Mission/Vision only after owner input. |
| Company story / why              | Bounded education-to-employment rationale is documented.                                          | GREEN  | BUILD NOW as rationale, not proof of outcomes.                |
| Student feedback / ratings       | No real testimonials, ratings, consent, or source records.                                        | RED    | Do not build.                                                 |
| Recognitions / awards / partners | None verified.                                                                                    | RED    | Do not build.                                                 |
| Seminars / events / photos       | No verified event names, photos, or media rights.                                                 | RED    | Do not build.                                                 |

## Claims Review

| Level | Claims                                                                                                                                                                                                                                          |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GREEN | Conceptual program philosophy; generic skill concern; Shaquantum Labs identity; bounded company rationale.                                                                                                                                      |
| AMBER | Address/contact on About; founder/team names if supplied; exact mission/vision; events with proof; product screenshots after capability/privacy approval.                                                                                       |
| RED   | Named programs; certificates; projects; mentorship; pricing; outcomes; placement support; My Skill scores/progress/recommendations/institution visibility; testimonials; ratings; recognitions; partners; placement/salary/improvement results. |

## Programs Page Recommendation

MODE C - KEEP CURRENT CONCEPTUAL PROGRAMS PAGE. Current evidence is sufficient only for conceptual program philosophy. It is not sufficient to rebuild `/programs` around actual offerings or My Skill because no verified catalogue, My Skill source, product screenshots, delivery terms, or placement-support definition exists.

## About Page Recommendation

BUILD NOW:

- Why Pathwisse exists.
- Company story/rationale.
- Shaquantum Labs Private Limited identity.
- Strategic beliefs/principles, not formal Mission/Vision labels.

BUILD AFTER OWNER INPUT:

- Founder story.
- Mission.
- Vision.
- Team.
- Address/contact details on About.
- Product screenshots/media.
- Events/seminars/gallery.

DO NOT BUILD:

- Student voices/testimonials/ratings.
- Recognitions/awards/partners/logos.
- User outcome/result modules.
- Program proof modules.

## Product Owner Inputs Needed

- What is the public name, current status, duration, format, and target audience of each actual Pathwisse program?
- Which program fields may be published: eligibility, curriculum, projects, mentorship, certificate, pricing, enrollment path?
- Does any program provide placement-related support? If yes, what exactly is provided to which eligible participants?
- Is "My Skill" a live product module? Provide route/screen, owner, user type, inputs, outputs, and data source.
- Does My Skill calculate improvement over time? Provide baseline/current logic, formula, and validation limits.
- Can institutions see any My Skill data? Provide permission/privacy model and screen proof.
- Provide approved product screenshots for Direction/Progress/Evidence or My Skill, captured from an approved demo/test account.
- Who are approved founders/team members for public About, with titles, bios, photos, and consent?
- What exact Mission and Vision statements should be published?
- Which recognitions/awards/partners/events are approved for public use with source proof and logos/photos?
- Which testimonials/ratings/student feedback are approved, with consent and source?
