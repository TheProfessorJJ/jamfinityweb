# Project State

> Living status document. Read this first to know where things stand. The Lead Engineer updates it as work progresses. Dates are absolute.

_Last updated: 2026-06-27 — architecture locked (see `decisions/ADR-001-initial-architecture.md`)._

## Current Phase

**Phase 0 — Foundations.** Architecture is finalized and **locked**. Implementation has not begun. Next chat (Sonnet Lead Engineer) starts here using `implementation-guide.md`.

## Completed

- ✅ Full architectural proposal — 15 core documents in `/docs`.
- ✅ System-wide consistency review; inconsistencies corrected (repo name `jamfinityweb`, Tailwind v4 CSS-first, base-path/domain conflict, toolchain concreteness).
- ✅ Architecture locked in `decisions/ADR-001-initial-architecture.md`.
- ✅ Handoff package authored: `implementation-guide.md` (zero-question start for Sonnet).
- ✅ Repository confirmed at `jamfinityweb/` with all docs tracked, working tree clean.

## Next Milestone

**Phase 0 scaffold** (owned by Sonnet Lead Engineer). Definition of Done in `implementation-guide.md`:
Astro+TS+pnpm init → Tailwind v4 tokens + theming → six Zod content collections → base/lesson layouts + SEO components → one real Economics lesson (math, definition, callout, summary) → CI validate+deploy → live on GitHub Pages project URL within budgets.

## Locked Decisions

Authoritative list: `decisions/ADR-001-initial-architecture.md`. Summary:

| Area | Decision |
|---|---|
| SSG | Astro 5.x (islands, content collections, MDX) |
| Content | MDX + Zod-validated collections; build-time knowledge graph |
| Styling | Tailwind v4 (CSS-first) + 3-layer CSS token system |
| Islands | Preact now; Svelte later; vanilla when possible |
| Math | KaTeX build-time (remark-math/rehype-katex) |
| Search | Pagefind (static, client-side) |
| Hosting | GitHub Pages, repo `jamfinityweb`, env-driven `site`/`base` |
| Backend | None — static + stateless edge services only |
| Toolchain | Node 20/22 LTS, pnpm 9+, TypeScript strict |
| Taxonomy | Subject → Track → Lesson (+ Concepts, Tools, Articles) |
| Pipeline | Ingest→Extract→Transform→Validate→Review→Publish; human review gates publish |

## Open Decisions

These are **operational, not architectural** — none block Phase 0:

- [ ] Purchase custom domain (assumed `jamfinity.com`). Until then, project URL + env `base`.
- [ ] Final primary typeface (Inter/Geist-class).
- [ ] Analytics provider: Plausible vs GA4 (decide by Phase 5).
- [ ] `content-source/` storage: in-repo vs sibling store (revisit if PDFs are large or non-public).

## Risks

- **Build time as content scales** → mitigate with Actions caching / incremental builds.
- **Math/economics correctness in AI drafts** → human review mandatory before `published`.
- **Island sprawl** harming performance budgets → enforce island budget + Lighthouse gate.
- **Doc/code drift** → enforce "docs are source of truth"; ADRs for changes.
- **Base-path link bugs** on GitHub Pages → mandatory base-aware links rule.

## Technical Debt

_(none yet — record every deliberate shortcut here with a remediation note and date.)_

## Future Expansion

- Subjects beyond Economics: Math, Statistics, Econometrics, Finance/CFA, Programming, AI.
- Interactivity: quizzes, plots, calculators, flashcards, visual knowledge-graph explorer.
- Automation: embedding-based link/summary suggestions; batch transforms.
- Audience: original articles, topic-cluster hubs, comments (Giscus).
- Monetization: gated premium tracks/tools via hosted checkout; optional hosted auth for sync/entitlements.
- All expansion must remain GitHub-Pages-static with no operated backend.
