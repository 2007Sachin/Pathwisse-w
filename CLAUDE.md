# CLAUDE.md — Pathwisse public website

Operating guide for Claude Code. This project was previously built with Codex; continue it, do not restart it.

## Read first

1. Read `AGENTS.md` before any product, content, design, or code work. It is binding.
2. Then read the product docs in the order AGENTS.md lists (`docs/product/PRD.md` → `POSITIONING` → `MESSAGING` → `VOCABULARY` → `UX_PSYCHOLOGY` → `PATHWISSE_WEBSITE_BLUEPRINT`).
3. For the task at hand, also read the relevant docs below.

| Need                        | Read                                                                                    |
| --------------------------- | --------------------------------------------------------------------------------------- |
| Any copy or claim           | `docs/product/HOMEPAGE_CLAIM_AUDIT.md`, `docs/product/PROGRAM_CATALOGUE.md`             |
| Architecture / dependencies | `docs/architecture/WEBSITE_ARCHITECTURE.md`                                             |
| Styling, layout, components | `docs/design/DESIGN_SYSTEM_FOUNDATION.md` (see also `/style-guide`)                     |
| Animation                   | `docs/design/MOTION_SYSTEM.md`                                                          |
| Visuals / media             | `docs/design/HOMEPAGE_VISUAL_STORYTELLING.md`, `docs/design/PRODUCT_SCREENSHOT_SPEC.md` |
| Contact form                | `docs/product/CONTACT_FORM_REQUIREMENTS.md`                                             |
| Current phase / what's next | `docs/plans/WEBSITE_IMPLEMENTATION_PLAN.md`, `docs/qa/LAUNCH_READINESS_AUDIT.md`        |

`ECC/` is a reference/workflow repository (its own CLAUDE.md and rules describe the ECC plugin, not this site). Use its workflows where helpful. Never edit or duplicate ECC source, and never treat ECC guidance as Pathwisse product requirements.

## Document precedence

1. Repository instructions / `AGENTS.md`
2. Approved PRD
3. Approved positioning, messaging, vocabulary, and UX psychology
4. Approved architecture and design-system docs
5. Implementation plan
6. Code

If code conflicts with approved documentation, **flag the conflict and ask**. Do not silently rewrite strategy or copy to match the code, and do not silently change code in a way that contradicts a higher-precedence doc.

## Current architecture (approved, implemented)

- Astro 7 + TypeScript, `output: "static"`, static-first HTML. Node `>=22.19`.
- Astro-native scoped CSS + semantic CSS custom properties (`src/styles/tokens.css`, `global.css`). Instrument Sans Variable, self-hosted via `@fontsource-variable`.
- Typed local content in `src/content/` (copy, routes, nav, site metadata); section components in `src/components/sections/<page>/`; shared shell in `layout/`, `navigation/`, `media/JourneyPath.astro`.
- Minimal client JS only: mobile nav, one shared `IntersectionObserver` for finite motion, contact-form validation.
- Browser-built SVG/CSS journey graphics. No raster media, video, analytics, or third-party scripts.
- Routes: `/`, `/how-it-works`, `/students`, `/institutions`, `/programs`, `/about`, `/contact`, `404`, and `/style-guide` (internal, `noindex, nofollow`, not in nav).
- Not present and not approved: React, Tailwind, animation libraries, CMS, backend/database, auth, analytics, form provider.

Rules:

- **Do not replace Astro** or add any framework, package, backend, CMS, analytics, or infrastructure without an explicit architecture decision recorded in `docs/architecture/`.
- Prefer native CSS/SVG/HTML. Justify any new dependency (need, size, alternatives) before installing it.
- Don't rebuild what exists. Extend existing components, tokens, and content files; avoid broad rewrites.

## Product-verification constraints

The authoritative Pathwisse product application is **unavailable**. These are **unverified** and must be treated as unresolved:

Direction capability · progress tracking · evidence workflow · readiness tracking/measurement · institution dashboards · analytics · resume support · interview preparation · product screenshots · program catalogue (names, formats, price, duration, outcomes).

- Do not infer them from prototypes, old mockups, or `admin/pathwisse-prototype` (non-authoritative; its admin metrics are fictional and must not be used).
- Public copy stays qualified: strategic belief, intended direction, or clearly labeled illustrative (e.g. "Illustrative student journey" for Aanya). Not current functionality.
- Sign In, student Get Started, and demo-submission destinations are **not approved**. Do not invent or guess URLs (including `app.pathwisse.com`); keep them visibly unavailable until the owner supplies them.
- Only approved company identity is published: Shaquantum Labs Private Limited as builder of Pathwisse.

## Forbidden

- Unsupported claims: capabilities, metrics, testimonials, customers, partners, logos, rankings, accreditation (NAAC/NBA) effects, placement/salary/hiring outcomes, guarantees, readiness scores.
- Fabricated product UI: no fake dashboards, screenshots, status badges, sample data, fake browser/device chrome, or generated placeholder people.
- Buzzwords banned by `VOCABULARY.md`/PRD (Transform, Empower, Unlock, Revolutionize, Future-ready, Seamless, Holistic, AI-powered, etc.) unless validated in context.
- Fake success states: the contact form must not claim anything was sent until an approved adapter (`src/lib/contact.ts`) returns a real success.
- Adding legal text, company contact details, social links, or team information that has not been approved.

When a decision is unresolved, record it as TBD or propose it for approval. Do not decide it.

## Workflow

**Plan first.** For any major, cross-page, architectural, or copy-strategy change, write a short plan (scope, files, risks, docs affected) and get agreement before editing. Small, local fixes can proceed directly.

**Verify after every change.** Run what applies, and report failures honestly with output:

```bash
npm run format:check
npm run check
npm run lint
npm run build
npm audit --audit-level=high
```

For UI changes also check in a browser at 375, 768, 1024, and 1440px: no horizontal overflow, one H1, heading order, keyboard operation, visible focus, console clean, links resolve.

**Preserve, do not regress:**

- **Accessibility:** semantic landmarks, skip link, one H1 per page, logical headings, labelled forms with `aria-describedby`/`aria-invalid`, visible focus, ≥44px primary targets, meaningful alt text, decorative SVG `aria-hidden`, no color-only meaning, no hover-only interaction.
- **Responsive:** mobile-first; narrative order and CTA hierarchy hold at all breakpoints; no desktop-only comprehension.
- **Reduced motion:** content must be complete without JS and without motion. Motion is finite, opacity/transform/SVG-stroke only, runs once, and is disabled under `prefers-reduced-motion`. No continuous loops, scroll-jacking, or animation libraries.
- **Claims governance:** classify new material claims (verified / approved positioning / hypothesis / illustrative / requires validation). Hypotheses and validation-required claims do not publish as facts.

**Keep docs current.** When a major decision changes (architecture, dependency, phase status, claim status, destination approval, form provider, design tokens), update the relevant doc in the same change: implementation plan phase status, `LAUNCH_READINESS_AUDIT.md`, architecture, design, or claim/catalogue docs. Never edit approved strategy docs (PRD, positioning, messaging, vocabulary, UX psychology, blueprint) unless explicitly asked.

## Housekeeping

- No git repository exists at present. Do not `git init`, commit, or push unless asked.
- `dist/`, `.astro/`, `.playwright-mcp/`, `artifacts/` are generated/ignored; don't commit or hand-edit them.
- Use conventional commit prefixes if/when committing (fix, feat, docs, test).
