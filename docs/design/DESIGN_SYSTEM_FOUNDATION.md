# Pathwisse design system foundation

**Status:** v1 implemented; brand palette and typography remain provisional  
**Updated:** 2026-09-20

## Design intent

Pathwisse uses a premium editorial technology language: intelligent, calm, human, student-aware, and credible for institutions. The system supports Learning → Application → Evidence → Employability and Recognition → Understanding → Trust → Action. It rejects generic SaaS card grids, glassmorphism, neon effects, excessive pills, and dashboard visual language.

## Foundation audit

The original semantic HTML, typed navigation, skip link, active-route state, reduced-motion baseline, `BaseLayout`, and small mobile-menu script remain. Temporary generic tokens, provisional typography, basic header/footer styling, and the visible legal placeholder were refined or replaced. Page content and narrative sections remain untouched.

## Typography

The v1 family is **Instrument Sans Variable**, self-hosted from the open-source `@fontsource-variable/instrument-sans` package. It provides editorial character without sacrificing long-form readability or institution credibility. One family is used throughout.

Roles are display, H1, H2, H3, body large, body, small, caption, navigation, and button. Display and heading sizes use restrained fluid `clamp()` values; body remains readable at 1rem with generous line height. Display type should not consume an entire mobile viewport. Final brand font approval remains open.

## Color

The v1 palette is provisional. It uses a cool light editorial background, white surfaces, deep ink typography, royal blue for direction/technology, and restrained warm orange only for opportunity or progression. Semantic roles include background, surfaces, ink, text, muted text, primary states, accent, border, focus, success, and error. Selective dark narrative sections are supported; the site is primarily light.

All text/action pairings must meet WCAG-conscious contrast. Form control boundaries use `--color-border-input` (#64748b, about 4.8:1 on white) to meet the 3:1 non-text contrast requirement; `--color-border-strong` is for decorative dividers only. The accent orange (about 3.7:1 on the light background) must not be used for text on light surfaces. Color never carries interaction meaning alone. Gradients are not a default surface treatment.

## Spacing and layout

The spacing scale runs from 0.25rem to 8rem and is used for gaps, component padding, and section rhythm. Horizontal gutters use one responsive `clamp()` value.

- Reading width: 43rem.
- Standard content width: 76rem.
- Wide media width: 90rem.
- Full bleed: only media/background may reach the viewport edge; readable content remains contained.
- Section rhythms: compact, standard, and spacious.

Whitespace must clarify hierarchy rather than create empty spectacle. Breakpoints are behavior-based, with mobile reductions to section rhythm and navigation layout.

## Surfaces, borders, radii, and elevation

Available surfaces are base, subtle, bordered grouping, emphasis, and dark narrative. Layout and typography are preferred over cards. Bordered surfaces indicate actual grouping. Radius roles are small, medium, and large; large rounding is reserved for meaningful media/grouping compositions. Elevation is subtle and tinted to the ink palette, never a default decoration.

## Buttons and links

Primary buttons serve Get Started and Request a Demo. Secondary buttons serve lower-commitment exploration. Tertiary actions use an underlined action link with a restrained directional arrow. Buttons use medium radii, 46–48px minimum height, visible focus, hover, active, and disabled states. Buttons are not pills and avoid decorative shadows.

Body links remain underlined. Navigation links gain clear hover and active-route treatment. Interaction is never communicated by color alone.

## Forms

Future fields use persistent labels, semantic descriptions/errors, a minimum touch target, visible focus, and the same surface/border language. Error and success states use text plus semantic color. Exact form patterns await the contact implementation.

## Navigation and footer

The header is calm, non-floating, and not sticky in v1. Desktop presents logo, primary navigation, Sign In, and Get Started. Mobile uses an in-flow disclosure menu with Menu/Close state, Escape dismissal, first-link focus, and focus restoration. Long labels and active routes must remain legible.

The footer contains only known Product, Explore, and Company destinations plus company attribution. Unverified legal and social destinations remain absent.

## Visual hierarchy and responsive rules

Each view should have one dominant heading and one primary action. Editorial alignment, type scale, spacing, and media relationships establish hierarchy before borders or surfaces. Essential meaning must survive narrow screens, missing motion, and long text. No interaction is hover-only.

## Icons and media

No icon library is installed. Use an icon only when it communicates faster than text; do not add icons to every bullet. Future icons should use one family, consistent weight, and accessible labels when meaningful.

Photography, product screenshots, video, diagrams, and editorial graphics must have a narrative purpose. Prefer full-bleed editorial imagery or restrained bordered viewports. Avoid fake browser chrome, device mockups, random stock imagery, and placeholder AI people.

## Accessibility and governance

Semantic landmarks, heading order, focus contrast, keyboard navigation, reduced motion, touch targets, readable measures, and text contrast are acceptance requirements. New tokens need a documented role; new components need repeated behavior or an accessibility boundary. The internal `/style-guide` route is noindex and excluded from public navigation.
