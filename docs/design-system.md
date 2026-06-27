# Design System

> The visual language. Tokens here are the source of truth; components consume them. Reference feel: Linear, Apple, Stripe, Raycast, Vercel, Notion.

## Design Principles

1. **Typography-led.** Content is the hero. Type hierarchy carries the design before color or decoration.
2. **Restraint.** Minimal surfaces, generous whitespace, few colors. Premium = what we leave out.
3. **Compact density.** Information-rich without clutter. Tight but breathable.
4. **Motion as feedback.** Subtle, purposeful, fast (150–250ms). Never decorative or slow.
5. **Light and dark are equals.** Both first-class, both designed.
6. **Accessible by construction.** Contrast, focus, and motion-reduction are non-negotiable.

## Token Architecture (three layers)

Source of truth: `src/styles/tokens.css` as CSS custom properties.

1. **Primitive tokens** — raw values. `--color-gray-900`, `--space-4`, `--font-size-3`.
2. **Semantic tokens** — intent. `--color-text-primary`, `--color-surface`, `--color-border`, `--color-accent`. Theme switches remap *these*.
3. **Component tokens** — component-scoped, reference semantic. `--button-bg`, `--card-radius`.

Tailwind is configured from these tokens so utilities and hand-written CSS share one vocabulary.

## Color

- Neutral-first palette: a refined gray scale carries 90% of the UI.
- **One accent** (brand) used sparingly for emphasis, links, focus. A second "subject hue" may tint per-subject accents (Economics, Statistics…) — derived, restrained.
- Semantic states: success / warning / danger / info — muted, not loud.
- All text/background pairs meet **WCAG AA** (4.5:1 body, 3:1 large). See `accessibility.md`.

## Typography

- **Sans** for UI and body: a modern, neutral grotesque (e.g. Inter / Geist-class). Self-hosted in `public/fonts`, `font-display: swap`, subset.
- **Serif** (optional) for long-form articles to add editorial warmth.
- **Mono** for code, formulas-adjacent, and `Kbd`.
- Modular type scale (~1.2 ratio). Fluid clamp() sizing for headings.
- Measure capped ~68ch for readability. Generous line-height for body (1.6–1.75).

## Spacing & Layout

- 4px base spacing scale (`--space-1` = 4px … geometric).
- Consistent radii scale; mostly small/medium radii (premium, not bubbly).
- Shadows: subtle, layered, used for elevation hierarchy only.
- Grid: content column + optional sidebar (nav) + optional right rail (TOC).

## Motion

- Durations: 150ms (micro), 250ms (standard), 400ms (page-level max).
- Easing: standard ease-out for entrances; respect `prefers-reduced-motion` (disable non-essential motion entirely).
- Page transitions via Astro view transitions where supported, with graceful fallback.

## Theming

- `data-theme="light|dark"` on `<html>`; defaults to system, user-overridable, persisted in localStorage.
- No flash of wrong theme: inline head script sets theme before paint.

## Iconography

- One cohesive icon set (e.g. Lucide-class), consistent stroke weight, rendered inline as SVG (no icon-font runtime).

## What to Avoid

- Drop shadows everywhere, heavy gradients, neon, skeuomorphism.
- More than one accent competing for attention.
- Decorative animation that delays content.
- University-website or WordPress-theme aesthetics.

## Design ↔ Code Contract

Designers and AI both edit **tokens**, not scattered values. A visual change should, wherever possible, be a token change. If a component hardcodes a color or spacing value, that is a bug.
