# Pathwisse public website

Greenfield public marketing website for Pathwisse, built with Astro and TypeScript using static-first rendering and minimal client JavaScript.

## Setup

Use Node.js 22.19 or newer. The repository declares this minimum because the
current dependency graph includes packages that require Node 22.19+.

```bash
npm install
npm run dev
```

## Deployment (Vercel)

The site is fully static Astro and is hosted on Vercel. No adapter, `vercel.json`, server runtime, or environment variable is required.

1. Import the GitHub repository into Vercel.
2. Framework preset: Astro (auto-detected). Build command `npm run build`, output directory `dist`.
3. Node.js version: 22.x. The project requires Node >=22.19 (`engines` in `package.json`, `.nvmrc`).
4. Add the production domain `pathwisse.com` in the project’s Domains settings and follow Vercel’s DNS instructions.

The contact form provider is not yet decided. Until it is, `/contact` is email-first and points to `pathwisse@gmail.com`.

## Commands

- `npm run dev` — local development server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run check` — Astro and TypeScript checks
- `npm run lint` — ESLint
- `npm run format` — format supported files
- `npm run format:check` — verify formatting

## Documentation

Read [AGENTS.md](AGENTS.md), then the source-of-truth documents in this order:

1. `docs/product/PRD.md`
2. `docs/product/POSITIONING.md`
3. `docs/product/MESSAGING.md`
4. `docs/product/VOCABULARY.md`
5. `docs/product/UX_PSYCHOLOGY.md`
6. `docs/product/PATHWISSE_WEBSITE_BLUEPRINT.md`
7. `docs/architecture/WEBSITE_ARCHITECTURE.md`
8. `docs/design/`
9. `docs/plans/WEBSITE_IMPLEMENTATION_PLAN.md`

## Current phase

The approved public routes, design foundation, bounded content, restrained
motion, production origin, and product links are implemented as a fully static
site. Launch remains blocked by approved Privacy Policy and Terms content and
by a decision on live web contact submission (the site is currently
email-first).
