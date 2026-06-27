# Roadmap

> Sequenced plan from empty repo to a growing business. Phases are outcome-oriented, not date-bound. Each builds on the last; avoid skipping foundations.

## Phase 0 — Foundations (architecture & scaffold)

- Repo, tooling (Astro, TypeScript, pnpm, Tailwind v4).
- Design tokens (`tokens.css`), base layouts, `Prose`.
- Content collections + Zod schemas (`config.ts`).
- CI: validate + build + deploy to GitHub Pages.
- Custom domain + HTTPS.
- **Exit:** one real lesson renders end-to-end, deployed, validated.

## Phase 1 — Core Reading Experience

- Component library: primitives, layout, content components.
- Lesson + track + subject pages; navigation (sidebar, breadcrumbs, TOC, pagination).
- Light/dark theming.
- Math (KaTeX), figures, callouts, definitions.
- **Exit:** a full track of Economics lessons is publishable and beautiful.

## Phase 2 — Discovery

- Pagefind search + ⌘K command menu.
- Concept/glossary pages.
- Knowledge graph derivation (prerequisites/related/concepts) → "learn next" + related panels.
- SEO: metadata, JSON-LD, sitemap, RSS, OG images.
- **Exit:** content is searchable, interlinked, and indexable.

## Phase 3 — Interactivity

- Island framework conventions (Preact/Svelte).
- `Quiz`, `Plot`, `Calculator`, `Flashcards`.
- Local progress/bookmarks (IndexedDB).
- First standalone `tools`.
- **Exit:** lessons are interactive; at least one flagship interactive tool ships.

## Phase 4 — Automation at Scale

- Mature transform pipeline (ingest → extract → transform → validate).
- Preview deploys for review.
- Weekly cadence operational; batch transforms.
- Auto-suggested links/summaries (build-time embeddings).
- **Exit:** weekly uploads become published lessons with minimal manual work.

## Phase 5 — Audience & Authority

- Original articles; subject hubs as topic clusters.
- Comments (Giscus).
- Analytics-driven content decisions.
- Visual knowledge graph explorer.
- **Exit:** measurable organic traffic growth; recurring readers.

## Phase 6 — Monetization

- Premium tracks/tools gated via hosted checkout (Gumroad/Stripe/Polar).
- Optional accounts via hosted auth for cross-device sync + entitlements.
- Sponsorships / original premium content.
- **Exit:** first revenue; architecture still fully static + edge services.

## Phase 7+ — Long-Term Growth

- Multi-subject breadth (Math, Stats, Econometrics, CFA, Programming, AI).
- Spaced-repetition review system across subjects.
- Community/contribution model (if desired).
- Continuous design/perf/SEO refinement.

## Guiding Constraints Across All Phases

- Stay GitHub-Pages-static; no operated backend.
- Protect content + tokens from churn.
- Each phase ends with docs updated and `project-state.md` current.

## Sequencing Logic

Reading experience before interactivity; discovery before automation; automation before scale; audience before monetization. Monetizing thin content fails — build the asset first.
