# Component Library

> Reusable building blocks. Components are systems, not one-offs. Every component consumes design tokens and is documented before it is used twice.

## Organizing Principle

Components live in `src/components/` grouped by role. Prefer **Astro components** (zero JS) for anything static. Promote to an **island** (Preact/Svelte) only when interactivity is required.

```
primitives/   layout/   content/   interactive/   navigation/   seo/
```

## 1. Primitives (`primitives/`)
Static, token-driven, no state.
- `Button`, `LinkButton` — variants: primary / secondary / ghost; sizes; loading.
- `Badge`, `Tag`, `Pill` — subject/difficulty/status labels.
- `Card` — base surface with elevation variants.
- `Kbd` — keyboard hint (for command menu, shortcuts).
- `Avatar`, `Icon` (inline SVG wrapper), `Divider`, `Tooltip`.

## 2. Layout (`layout/`)
- `Container` — max-width + padding rhythm.
- `Stack` / `Grid` / `Cluster` — composable spacing primitives (no ad-hoc margins).
- `Section` — vertical rhythm wrapper.
- `Prose` — typographic wrapper for MDX body content (sets measure, spacing, heading styles).

## 3. Content (`content/`)
Used inside MDX lessons. The vocabulary AI uses to author rich lessons.
- `Callout` — note / tip / warning / important.
- `Definition` — term + meaning; links to a `concept` (feeds knowledge graph).
- `Figure` — image/diagram + caption + source.
- `Math` — KaTeX block & inline (build-time).
- `Steps` — numbered procedure.
- `KeyIdea` / `Summary` — highlighted takeaways.
- `SourceRef` — citation to original material (provenance).
- `Collapsible` / `Details` — progressive disclosure.
- `Table` — styled, responsive, scrollable.

## 4. Interactive (`interactive/`) — Islands
Hydrated only on demand (`client:visible` / `client:idle`).
- `Quiz` — MCQ / multi-select, local scoring, progress saved to IndexedDB.
- `Plot` — interactive function/data plot (Svelte + uPlot/D3).
- `GraphExplorer` — supply/demand, game-theory matrices, parametric curves.
- `Calculator` — generic input→output tool framework (powers `tools` collection).
- `Flashcards` — spaced-repetition-lite review.
- `KnowledgeGraph` — visual map of lesson interconnections.

## 5. Navigation (`navigation/`)
- `SiteNav` — top bar, minimal.
- `Sidebar` — subject/track/lesson tree.
- `Breadcrumbs` — subject → track → lesson (and prerequisites).
- `TableOfContents` — right rail, scroll-spy.
- `CommandMenu` — ⌘K palette: search, jump, theme toggle (Raycast-style).
- `Pagination` — prev/next lesson within a track.
- `RelatedLessons` — derived from the knowledge graph.

## 6. SEO (`seo/`)
- `Meta`, `OpenGraph`, `JsonLd` (Course / Article / BreadcrumbList schema). See `seo-strategy.md`.

## Component Standards

Every component must:
1. Consume tokens — no hardcoded colors/spacing.
2. Have typed props (TypeScript / Zod where dynamic).
3. Be keyboard-accessible and screen-reader-correct (see `accessibility.md`).
4. Default to **no JavaScript**; justify any island.
5. Be documented (props + usage example) before its second use.
6. Render correctly in light and dark.

## Promotion Rule (avoiding debt)

A pattern repeated **twice** is fine inline; on the **third** occurrence it must become a component. Conversely, do not abstract before three real uses — premature abstraction is also debt.

## Island Budget

Each lesson page targets a small number of islands. If a page needs many heavy islands, reconsider the content design. Performance budgets in `performance-strategy.md` are binding.
