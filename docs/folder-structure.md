# Folder Structure

> Physical layout of the repository. Stable directories are a contract — the automation pipeline and engineer rely on these paths.

## Top Level

> The Git repository root is **`jamfinityweb/`** (this is the published GitHub Pages repo). All paths below are relative to that root.

```
jamfinityweb/                 # Git repository root
├── docs/                     # Project documentation — single source of truth
│   └── decisions/            # Architecture Decision Records (ADRs)
├── content-source/           # Raw uploads (PDFs, slides, notes). Never published.
│   └── <subject>/<track>/    # Mirrors content taxonomy for traceability
├── public/                   # Static assets copied verbatim (favicons, fonts, robots.txt, CNAME)
├── scripts/                  # Build/automation scripts (pipeline helpers, validators)
├── src/
│   ├── content/              # Astro Content Collections (the content layer)
│   │   ├── config.ts         # Zod schemas — the content contract
│   │   ├── subjects/
│   │   ├── tracks/
│   │   ├── lessons/
│   │   ├── concepts/
│   │   ├── tools/
│   │   └── articles/
│   ├── components/           # Component library (see component-library.md)
│   │   ├── primitives/       # Button, Card, Badge, Tag, Kbd…
│   │   ├── layout/           # Container, Grid, Stack, Section…
│   │   ├── content/          # Lesson rendering: Callout, Definition, Figure, Steps…
│   │   ├── interactive/      # Islands: Quiz, Plot, Calculator, GraphExplorer…
│   │   ├── navigation/       # Nav, Sidebar, Breadcrumbs, TOC, CommandMenu…
│   │   └── seo/              # Meta, OpenGraph, JsonLd
│   ├── layouts/              # Page shells (BaseLayout, LessonLayout, ArticleLayout…)
│   ├── pages/                # Route definitions (Astro file-based routing)
│   ├── styles/               # tokens.css (source of truth), global.css, fonts.css
│   ├── lib/                  # Pure TS utilities (graph building, content queries, formatting)
│   └── data/                 # Derived/config data (nav config, redirects)
├── .github/
│   └── workflows/            # CI/CD: build, deploy, content-validate, pipeline triggers
├── astro.config.mjs          # Astro config: site, base, integrations, markdown plugins
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
└── README.md
```

> **Tailwind v4 note:** Tailwind v4 is CSS-first. Theme/tokens are declared with `@theme` inside `src/styles/`, not a JS config. A `tailwind.config.ts` is optional and only added if a plugin requires it. The token source of truth remains `src/styles/tokens.css` (see `design-system.md`).

## Naming Conventions

- **Directories & files:** `kebab-case` (`game-theory/`, `nash-equilibrium.mdx`).
- **Components:** `PascalCase.astro` / `.tsx` / `.svelte`.
- **Content IDs:** derived from path; stable and never reused. Renaming a lesson requires a redirect entry (`src/data/redirects.ts`).
- **Utilities:** `camelCase.ts`.

## Content File Layout

A lesson lives at:
```
src/content/lessons/<subject>/<track>/<lesson-slug>.mdx
```
Its URL is:
```
/<subject>/<track>/<lesson-slug>/
```
URL ↔ path mapping is mechanical and stable. This predictability is what lets the pipeline place files without ambiguity.

## What Goes Where — Decision Rules

- Is it raw, unpublished source? → `content-source/`
- Is it published learning content? → `src/content/`
- Is it visual/interactive UI reused across pages? → `src/components/`
- Is it a pure function with no markup? → `src/lib/`
- Is it the source of truth for a color/space/type value? → `src/styles/tokens.css`
- Is it a route? → `src/pages/`

## Stability Contract

These paths must not move without updating `automation-workflow.md` and the pipeline scripts:
- `content-source/`
- `src/content/` and `src/content/config.ts`
- `scripts/`
- `.github/workflows/`
