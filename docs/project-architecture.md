# Project Architecture

> The system-level design. Read `tech-stack.md` for tool choices and `folder-structure.md` for the physical layout.

## First Principles

1. **Static-first.** Output is pre-rendered HTML/CSS/JS served by GitHub Pages.
2. **No infrastructure we operate.** "No backend / no database" means *no servers or databases we run or pay to keep alive*. Stateless, hosted third-party services at the edges (search index, checkout, comments) are permitted because they require zero operational ownership.
3. **Content is data, not code.** Lessons are typed, schema-validated content. The schema is the most important long-term asset.
4. **Interactivity is opt-in.** Pages ship zero JavaScript unless a component needs it (islands architecture).
5. **Everything is reusable.** Components, tokens, content types, and pipeline steps are systems, not one-offs.
6. **The knowledge graph is a feature.** Content interlinks by prerequisite and concept.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ SOURCE MATERIAL (PDFs, slides, notes)  →  /content-source/    │
└───────────────────────────────┬─────────────────────────────┘
                                │  AI transformation (Claude Code)
                                ▼
┌─────────────────────────────────────────────────────────────┐
│ CONTENT LAYER  — MDX + frontmatter, validated by Zod schemas  │
│   /src/content/lessons, /tracks, /subjects, /tools, /articles │
└───────────────────────────────┬─────────────────────────────┘
                                │  Astro build (SSG)
                                ▼
┌─────────────────────────────────────────────────────────────┐
│ PRESENTATION LAYER — Astro pages + components + design tokens │
│   Islands (Preact/Svelte/vanilla) hydrate only where needed   │
└───────────────────────────────┬─────────────────────────────┘
                                │  build artifacts
                                ▼
┌─────────────────────────────────────────────────────────────┐
│ STATIC OUTPUT  /dist  →  GitHub Pages (custom domain)         │
│   + Pagefind search index  + sitemap  + RSS  + OG images      │
└───────────────────────────────┬─────────────────────────────┘
                                │  runtime (browser only)
                                ▼
┌─────────────────────────────────────────────────────────────┐
│ EDGE SERVICES (stateless, hosted, optional)                   │
│   Pagefind (client search) · Giscus (comments) ·              │
│   Gumroad/Stripe links (future monetization) · Plausible/GA   │
│   Browser storage: localStorage / IndexedDB (progress, prefs) │
└─────────────────────────────────────────────────────────────┘
```

## Layers

### 1. Source layer (`/content-source/`)
Raw uploads, kept in-repo (or in a sibling location) for provenance. Never published directly. The input to the automation pipeline.

### 2. Content layer (`/src/content/`)
Astro **Content Collections**. Each collection has a Zod schema (the contract). MDX bodies hold prose + embedded interactive components. This layer is framework-agnostic in spirit: if we ever migrate off Astro, the MDX + frontmatter survive.

Collections (see `content-strategy.md` for full schemas):
- `subjects` — top-level domains (Economics, Statistics…)
- `tracks` — ordered sequences within a subject (e.g. "Microeconomics I")
- `lessons` — the atomic unit of learning
- `tools` — standalone interactive educational tools
- `articles` — original essays / public resources
- `concepts` — glossary / definitions that lessons reference (powers the knowledge graph)

### 3. Presentation layer (`/src/`)
Astro pages, layouts, and the component library. Consumes design tokens. Renders content + hydrates islands.

### 4. Output layer (`/dist/`)
Fully static. Includes the Pagefind index, `sitemap.xml`, `rss.xml`, and generated Open Graph images.

### 5. Edge services
Stateless and hosted. Each is independently removable. None is a single point of failure for *reading* content.

## The Knowledge Graph

Built at compile time from frontmatter:
- `prerequisites: [lessonId]` → directed edges (learning order)
- `concepts: [conceptId]` → lessons ↔ concepts mapping
- `related: [lessonId]` → lateral links

This graph powers: prerequisite breadcrumbs, "what to learn next," related-lessons panels, and a future visual graph explorer. It is derived data — computed during build, never hand-maintained.

## State & Persistence Strategy

No server means no cross-device sync initially. Use browser storage:
- **localStorage** — theme, reading preferences, lightweight flags.
- **IndexedDB** — lesson progress, completed quizzes, bookmarks (larger/structured).

All client state is **enhancement, not requirement** — the site is fully usable with storage disabled. A future account system (for sync/monetization) can layer on via a hosted auth provider without changing the content architecture.

## Failure & Degradation

- JS disabled → all content readable; only interactive islands inert.
- Search service unavailable → static category/track navigation still works.
- Edge service down → core reading experience unaffected.

## Migration Safety

The two assets most protected from churn:
1. **Content** (MDX + frontmatter) — portable to any SSG.
2. **Design tokens** (CSS custom properties) — portable to any styling system.

Framework, build tooling, and components may evolve; these two must not require rewrites.
