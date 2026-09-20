# Pathwisse product screenshot specification

**Status:** Intake foundation complete; all three screenshots blocked pending product verification  
**Scope:** Homepage Product Experience section  
**Owner:** Product owner and website content owner TBD

## Purpose

This specification governs the intake, review, optimization, and publication of real Pathwisse product screenshots. A screenshot may enter the website only when the represented capability exists, the screen name is accurate, its data is safe to publish, and product and privacy reviewers approve it.

Product screenshots are deferred until authoritative product access is available. No prototype, conceptual diagram, old admin interface, unrelated screen, or recreated UI may substitute for a verified product screenshot.

An unrelated screen must never be relabeled to satisfy one of these requirements. No screenshot may be recreated, composited, or visually embellished to imply unavailable functionality.

## Shared capture and visual standard

- Capture the real application from an approved demo or product-owned test account.
- Start with a 1440 × 1000 CSS-pixel desktop viewport at 100% browser zoom. Adjust only when this clips or damages the real interface; record any deviation.
- Capture PNG source files in the product’s native light or dark theme. Do not recolor the product for the marketing site.
- Exclude browser chrome unless the URL or browser context is genuinely required to understand the workflow.
- Use a clean, level crop without a device mockup, perspective distortion, floating window, decorative backdrop, or heavy shadow.
- Deliver optimized WebP and, where its measured output is beneficial, AVIF derivatives. Preserve the PNG source outside the shipped public directory.
- Use one restrained website treatment for all three views: intrinsic dimensions, subtle border, existing medium radius, and only the design system’s light elevation if separation is necessary.
- Default to no annotations. Add at most two or three external callouts only after review shows that the real interface is otherwise difficult to understand.
- Prefer desktop captures because these screens are intended to establish product detail. Request a separate mobile capture only if the actual mobile product is materially different and approved for public use.

The expected source ratio is approximately 36:25 (1440 × 1000). The final crop may vary to preserve meaningful interface context; consistency must not make the UI unreadable.

## PROD-01 — Direction

**Status:** **BLOCKED — PRODUCT CAPABILITY NOT VERIFIED**

| Requirement             | Specification                                                                                                                      |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Required product screen | The real student-facing screen used to explore, understand, or select a career or role direction.                                  |
| Capability demonstrated | Career or role direction, only if the product genuinely supports it.                                                               |
| Screenshot objective    | Show how Pathwisse gives a student useful role context rather than presenting an abstract category claim.                          |
| Minimum visible UI      | Product identity/context, the real role or direction content, and enough surrounding navigation to establish where the student is. |
| Hide                    | Unrelated navigation, internal tooling, debug controls, notifications, browser toolbar, internal URLs, and unfinished features.    |
| Personal data           | Use only approved demo or product-owned test data. Remove names, contact details, identifiers, and private profile information.    |
| Recommended viewport    | 1440 × 1000 CSS pixels at 100% zoom; document any justified alternative.                                                           |
| Recommended crop        | Landscape crop centered on the direction context; preserve labels needed to understand the real workflow.                          |
| Device preference       | Desktop preferred; mobile only if it is a distinct verified product surface.                                                       |
| Theme                   | Product-native theme; no marketing-site recoloring.                                                                                |
| Annotation              | None by default.                                                                                                                   |
| Expected ratio          | Approximately 36:25, flexible when required for legibility.                                                                        |
| Homepage replacement    | First frame in `ProductExperienceSection.astro` (`direction`).                                                                     |

## PROD-02 — Progress / Development

**Status:** **BLOCKED — PRODUCT CAPABILITY NOT VERIFIED**

| Requirement             | Specification                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Required product screen | The real student-facing screen that represents development progression or identifies a next relevant step.                               |
| Capability demonstrated | Structured development or progress, using the product’s actual terminology and mechanism.                                                |
| Screenshot objective    | Demonstrate how a student can understand the relationship between completed work, current development, and what comes next.              |
| Minimum visible UI      | The real development sequence or progress context, meaningful labels, and enough product navigation to establish location.               |
| Hide                    | Confidential scores, unsupported readiness measures, unrelated modules, admin controls, internal URLs, and debug/test information.       |
| Personal data           | Use approved demo/test data only. Remove student identity, institution identifiers, private assessment details, and contact information. |
| Recommended viewport    | 1440 × 1000 CSS pixels at 100% zoom; document any justified alternative.                                                                 |
| Recommended crop        | Landscape crop that preserves sequence and next-step context without reducing labels below readable size.                                |
| Device preference       | Desktop preferred.                                                                                                                       |
| Theme                   | Product-native theme.                                                                                                                    |
| Annotation              | None by default. External callouts only if the sequence remains unclear after cropping.                                                  |
| Expected ratio          | Approximately 36:25, flexible for the real layout.                                                                                       |
| Homepage replacement    | Second frame in `ProductExperienceSection.astro` (`progress`).                                                                           |

## PROD-03 — Evidence

**Status:** **BLOCKED — PRODUCT CAPABILITY NOT VERIFIED**

| Requirement             | Specification                                                                                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Required product screen | The real screen that creates, organizes, reviews, or presents applied work or evidence of capability.                                                              |
| Capability demonstrated | Evidence or applied-work context, only if a genuine product workflow exists.                                                                                       |
| Screenshot objective    | Show how Pathwisse represents work, contribution, decisions, or review context without implying that an artifact guarantees readiness.                             |
| Minimum visible UI      | A real evidence item or collection, its truthful context, and the product labels required to understand what the student or reviewer can inspect.                  |
| Hide                    | Private documents, confidential feedback or scores, proprietary project material, personal profile details, internal moderation/admin controls, and internal URLs. |
| Personal data           | Use approved demo/test artifacts with confirmed publication rights. Remove names, emails, phone numbers, institution IDs, and any identifiable private content.    |
| Recommended viewport    | 1440 × 1000 CSS pixels at 100% zoom; document any justified alternative.                                                                                           |
| Recommended crop        | Landscape crop focused on the evidence and its context; do not crop away qualifiers, ownership, or contribution information.                                       |
| Device preference       | Desktop preferred.                                                                                                                                                 |
| Theme                   | Product-native theme.                                                                                                                                              |
| Annotation              | None by default; never annotate an unsupported interpretation of the evidence.                                                                                     |
| Expected ratio          | Approximately 36:25, flexible for legibility.                                                                                                                      |
| Homepage replacement    | Third frame in `ProductExperienceSection.astro` (`evidence`).                                                                                                      |

If no evidence workflow exists, retain the current editorial frame and replace the public story only after product/content approval. A truthful alternative could explain applied work as part of the Pathwisse methodology without presenting it as product functionality.

## Privacy and data restrictions

Screenshots must not contain real student names without explicit written approval, personal email addresses, phone numbers, institution IDs, private documents, personal profile information, confidential scores, backend or admin details, internal URLs, tokens, credentials, or other secrets.

Use an approved demo account, sanitized representative data, or product-owned test data. A synthetic test identity must be plainly internal and must not be presented as a real customer, institution, testimonial, or result. Sanitization must happen in the source account before capture; do not rely on a marketing crop to conceal sensitive data.

## Asset architecture

Shipped optimized files belong in:

```text
public/images/product/
├── direction/
├── progress/
└── evidence/
```

Recommended published filenames are `direction.webp`, `progress.webp`, and `evidence.webp`, with AVIF siblings only when useful. Do not add these paths to the manifest before files exist and approval is complete.

Source PNG captures must not be shipped under `public/`. Store them in an approved private product/design workspace with capture date, product version or commit, viewport, account type, reviewer, and approval record. The public repository receives only approved optimized derivatives.

The typed manifest is `src/content/productAssets.ts`. Unavailable assets use `src: null`. This project uses public static assets rather than Astro `<Image />` because future filenames are data-driven and absent assets must not break the build. Intrinsic dimensions, responsive CSS, native lazy loading, and asynchronous decoding provide layout stability without a third-party image library.

## Approval workflow

```text
REQUESTED
  ↓
CAPTURED
  ↓
PRIVACY REVIEW
  ↓
PRODUCT REVIEW
  ↓
APPROVED
  ↓
OPTIMIZED
  ↓
INTEGRATED
```

The privacy reviewer confirms data safety and publication rights. The product reviewer confirms that the screen, terminology, and represented capability are accurate. Only then may the optimized asset be assigned a public path and changed to `approved` in the manifest.

## Integration and regression checks

When an approved screenshot replaces a reserved frame:

1. Add the optimized file to its designated public directory.
2. Set its manifest `src`, intrinsic dimensions, truthful alt text, optional caption, and status.
3. Preserve the Product Experience section’s overall hierarchy and avoid redesigning it around a single screenshot.
4. Check the crop and readable interface detail at 375, 768, 1024, and 1440 pixels.
5. Verify section height remains reasonable, no horizontal overflow appears, and loading does not cause layout shift.
6. Re-run formatting, type checks, lint, build, audit, and browser review.

## Intake status

### AVAILABLE

- Static homepage integration boundary and honest reserved frames.
- Typed asset manifest with intrinsic target dimensions and safe null sources.
- Public directory structure for approved optimized derivatives.

### BLOCKED

- **PROD-01 Direction:** blocked until the actual product capability and public screen are verified.
- **PROD-02 Progress / Development:** blocked until the actual product capability, terminology, and public screen are verified.
- **PROD-03 Evidence:** blocked until an actual evidence/applied-work capability and publishable screen are verified.

### REQUIRES PRODUCT CONFIRMATION

- Exact live screen names and routes.
- Whether each capability exists in the current product and is ready for public demonstration.
- Correct product terminology, theme, and account state.
- Approved demo/test account and representative data.
- Screenshot owner, privacy reviewer, product reviewer, and final approver.
- Publication rights for all visible content and artifacts.
- Whether any annotation is genuinely necessary.
