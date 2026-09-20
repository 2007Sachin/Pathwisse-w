# Pathwisse repository instructions

## Scope

This repository is for the public Pathwisse marketing website. Authenticated student, institution, LMS, admin, and back-office functionality is out of scope unless explicitly added to the approved PRD.

## Required reading order

Before product, UX, content, design, or implementation work, read:

1. `docs/product/PRD.md`
2. `docs/product/POSITIONING.md`
3. `docs/product/MESSAGING.md`
4. `docs/product/VOCABULARY.md`
5. `docs/product/UX_PSYCHOLOGY.md`
6. `docs/product/PATHWISSE_WEBSITE_BLUEPRINT.md`
7. Relevant architecture, design, and implementation-plan documents.

The approved PRD takes precedence where approved documents differ. ECC is retained in `ECC/` as a reference/workflow repository; its guidance is not silently treated as Pathwisse product requirements. Follow applicable ECC/Codex guidance without modifying or duplicating ECC source.

## Product and content guardrails

- Do not invent capabilities, metrics, testimonials, partnerships, customers, rankings, accreditation improvements, placement rates, salary outcomes, or employment guarantees.
- Distinguish verified facts, approved positioning, hypotheses, illustrative examples, and validation-required claims.
- Do not invent design or content decisions when the product documents leave them unresolved; record the decision as TBD or propose it for approval.
- Keep the website student-first, human, accessible, responsive, performant, SEO-ready, and maintainable.
- Prefer progressive disclosure, clear narrative continuity, restrained motion, and explanatory media over feature walls or decorative complexity.

## Engineering workflow

- Plan before major architectural or cross-page changes.
- Research unfamiliar technical decisions and document important architecture choices.
- Validate implementation with appropriate content, accessibility, responsive, performance, SEO, route, form, analytics, and browser checks.
- Do not add a framework, package, backend, CMS, authentication, analytics platform, or infrastructure without an explicit architecture decision.
- Preserve existing user work and avoid broad rewrites without cause.

## Current state

The project is a greenfield website foundation. Do not assume application code, framework, package manager, build system, or deployment configuration exists. The technical foundation documents must be reviewed before scaffolding.
