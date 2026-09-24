# Pathwisse website architecture

**Status:** APPROVED  
**Approved:** 2026-09-20  
**Current phase:** Technical foundation scaffold complete

## Context

Pathwisse is a greenfield public marketing website with multiple narrative pages, premium editorial visuals, restrained motion, strong SEO, forms, and possible future program content. There is currently no application code or package manifest. The authenticated product is out of scope.

## Evaluation

| Option             | Strengths                                                                                                              | Costs / risks                                                                                                        | Fit                                                                       |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Static HTML/CSS/JS | Small runtime, excellent direct performance, simple deployment, no framework lock-in.                                  | Reuse, typed content, routing, testing, and progressively richer motion become manual.                               | Good for a small brochure site; less suitable if pages and programs grow. |
| Astro              | Static-first output, islands for motion/forms, good content ergonomics, strong SEO/performance, framework flexibility. | Adds a framework and conventions; team familiarity and form patterns must be confirmed.                              | Strong fit for content-led public site with selective interactivity.      |
| React + Vite       | Familiar components, ecosystem, straightforward client interactions, good testing options.                             | Client-rendering requires deliberate SEO/static strategy; more hydration than necessary for narrative pages.         | Viable, but requires discipline to avoid a client-heavy site.             |
| Next.js            | Static/server rendering, routing, image tooling, metadata, React ecosystem, future growth path.                        | Larger platform surface, more configuration/deployment choices, easy to overuse client components or infrastructure. | Strong fit if React ecosystem and deployment support are confirmed.       |

## Approved decision

**Framework: Astro + TypeScript, static-first rendering, Astro-native CSS, typed local content, and minimal client JavaScript.** It matches a mostly static public site, preserves fast HTML delivery and SEO, and allows interactive behavior only where needed. It avoids turning the entire site into client-side React.

The user’s proposed Next.js stack remains a credible alternative if the team has a strong Next.js deployment standard, expects substantial React interaction, or plans authenticated surfaces in the same project. It is not accepted automatically because there is no existing stack and the current public scope does not require a full application runtime.

Astro is approved and scaffolded. React, Tailwind, Framer Motion, and other frontend runtimes or motion libraries remain unapproved and should not be installed without a verified requirement and architecture update.

## Approved foundation stack

Astro + TypeScript; semantic HTML; CSS variables and scoped styles; native CSS/SVG motion first; a small accessible client island for contact forms; Playwright later for browser QA; ESLint/Prettier or repository-approved equivalents. A motion library is not required initially. No backend, database, CMS, authentication, Redux, Zustand, Supabase, or Firebase is justified by the PRD.

## Production and hosting decision (2026-09-20)

- **Hosting:** Vercel (approved). Vercel detects Astro automatically; the project ships no `vercel.json`.
- **Runtime:** fully static Astro (`output: "static"`, no adapter). Every route is prerendered to HTML at build time and there is no server process, serverless function, edge middleware, or environment variable. Vercel serverless functions are **not** used.
- **Origin:** `https://pathwisse.com`, defined once in `src/content/site.ts` and read by `astro.config.mjs`, canonical and `og:url` tags, the sitemap, and `robots.txt`.
- **Sitemap:** official `@astrojs/sitemap` (`sitemap-index.xml`), excluding `/style-guide` and `/404`. `trailingSlash: "never"` keeps sitemap and canonical URLs identical.
- **Form provider:** TBD — not selected. The site is email-first (`pathwisse@gmail.com`). Resend and `@astrojs/node` were added and then removed on 2026-09-20 because no provider is approved; the static site needs neither.
- **If a server route is later needed:** add `@astrojs/vercel` only then, and only after `npm audit --audit-level=high` passes. A previous evaluation of `@astrojs/vercel` 11.0.10 installed a high-severity `path-to-regexp` advisory through `@vercel/routing-utils`; re-check the current version before adopting it, and do not suppress the audit. A hosted-form provider that posts directly from the browser would keep the site fully static.

## Rendering and hydration

- Render public pages as static HTML at build time wherever possible.
- Keep navigation, content, visual sections, and SEO metadata server/static rendered.
- Hydrate only form behavior, accessible menu state, and motion that cannot be expressed with CSS/SVG.
- Use `prefers-reduced-motion` as a first-class fallback.
- Use optimized responsive images; video is optional and must not carry essential meaning.

### Decision: generated motion-graphic video (2026-09-24)

- **Decision:** the owner requested cinematic, video-led storytelling. Silent, decorative, looping motion-graphic videos are approved for selected sections (one per viewport at most). Details and inventory: `docs/design/MOTION_SYSTEM.md` → "Generated motion-graphic video".
- **Authoring:** scenes are Canvas 2D sources in `motion/` built with the canvas-video skill architecture, sharing one palette (`motion/shared/palette.js`, copied from `tokens.css`) and one shape vocabulary (`motion/shared/base.js`).
- **Export:** `motion/export.mjs` renders offline (headless Chrome via `puppeteer-core` + ffmpeg) to WebM (VP9), MP4 (H.264) and a WebP poster in `public/media/motion/<page>/`. `puppeteer-core` is **not** a project dependency; it is installed in a scratch folder only when re-rendering (`MOTION_TOOLS_DIR`). No frame sequences are written into the repository.
- **Runtime:** no new packages. Playback is handled by the existing `CinematicMedia.astro` (native `<video>`, `IntersectionObserver`), so the site stays static with no third-party scripts.
- **Alternatives rejected:** Lottie/GSAP/Remotion (runtime or build dependencies), live `<canvas>` rendering on the page (continuous main-thread cost on every visitor), stock or generated-people footage (claims and brand risk).
- Forms require a confirmed submission destination before implementation. A serverless endpoint or external form service is a later decision, not an assumption.

## Route responsibilities

`/` tells the full student-first story; `/how-it-works` explains the model; `/students` translates it into student value; `/institutions` explains institutional relevance and boundaries; `/programs` presents only verified programs; `/about` establishes company and principles; `/contact` starts the appropriate conversation. `/demo` should not exist initially unless a distinct institutional workflow requires a separate route; otherwise use `/contact` with a demo state.

## Proposed source structure

```text
src/
  pages/ or app/             # route entry points, according to approved framework
  components/
    layout/                  # shell, header, footer, containers
    navigation/              # desktop/mobile navigation
    sections/                # page-owned narrative sections
    ui/                      # small accessible primitives
    motion/                  # purposeful, reduced-motion-aware helpers
    forms/                   # form presentation and validation
  content/                   # typed local page/program/FAQ content
  lib/                       # metadata, claim helpers, utilities
  styles/                    # tokens, global styles, typography
  types/                     # shared content and event types
public/
  images/
  icons/
  fonts/                     # only approved/licensed fonts
docs/
```

Avoid premature generic abstractions. Sections own narrative structure; primitives own repeated mechanics.

## Content architecture

Use typed local content/configuration files initially. Keep copy, CTA destinations, claim status, alt text, and media references separate from layout logic. Markdown/MDX is appropriate later for editorial articles if needed. A CMS is not justified until update frequency, content ownership, preview, validation, and deployment needs are known.

## Security and maintainability

Validate all form input at the boundary, do not expose secrets in client code, use approved privacy/consent language, and avoid third-party scripts until reviewed. Keep client JavaScript narrow, components focused, and architecture decisions documented.

## Verification before scaffold

Confirm architecture, hosting, package manager, media handling, form destination, privacy requirements, font licensing, and analytics consent. Record approval or change this document before creating the application.
