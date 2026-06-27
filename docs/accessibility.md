# Accessibility

> Accessibility is a non-negotiable, built-in property — not a remediation phase. Target: WCAG 2.2 AA across the site.

## Principles

1. Content is usable by keyboard, screen reader, and assistive tech.
2. Accessibility and good design are the same goal, not a trade-off.
3. Automated checks catch the basics; human judgment covers the rest.

## Standards

- **WCAG 2.2 Level AA** baseline.
- Lighthouse Accessibility target: **100**.

## Color & Contrast

- Body text ≥ 4.5:1; large text & UI elements ≥ 3:1.
- Both light and dark themes meet contrast (tested as token pairs).
- Color never the sole carrier of meaning (icons/text accompany state colors).

## Typography & Readability

- Resizable text; layouts survive 200% zoom without loss.
- Adequate line-height and measure (≤ ~68ch).
- No justified text; sufficient paragraph spacing.

## Keyboard

- All interactive elements reachable and operable by keyboard.
- Visible, high-contrast focus indicators (never `outline: none` without replacement).
- Logical tab order; skip-to-content link.
- Command menu (⌘K) and all islands fully keyboard-driven.

## Screen Readers & Semantics

- Semantic HTML first (`nav`, `main`, `article`, `aside`, headings in order).
- ARIA only when semantics are insufficient; never redundant ARIA.
- Landmarks, labelled regions, descriptive link text (no "click here").
- Images: meaningful `alt`; decorative images `alt=""`.

## Interactive Components (islands)

- Quizzes, calculators, plots: labelled controls, status announcements via `aria-live` where state changes.
- Charts/visualizations: provide a text/table alternative or description for non-visual users.
- Focus management for any disclosure/modal (trap + restore).

## Motion

- Respect `prefers-reduced-motion`: disable non-essential animation and view transitions.
- No content that flashes more than 3×/second.

## Math & Diagrams

- KaTeX outputs accessible MathML where possible.
- Diagrams have descriptive captions/alt; complex figures get longer text descriptions.

## Forms (search, future inputs)

- Associated labels, clear error messaging, programmatic error association.

## Testing & Enforcement

- Automated: axe / Lighthouse in CI.
- Manual: periodic keyboard-only and screen-reader passes on key templates (lesson, article, home, search).
- New components ship with an accessibility checklist satisfied (see `component-library.md` standards).

## Definition of Done (a11y)

A component/page is not "done" unless: keyboard-operable, screen-reader-correct, contrast-passing, motion-respecting, and zoom-resilient.
