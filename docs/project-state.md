# Project State

> Living status document. Read this first to know where things stand. The Lead Engineer updates it as work progresses. Dates are absolute.

_Last updated: 2026-06-28 — Milestone 0-G (deploy workflow) complete; Phase 0 core CI/CD is live._

## Current Phase

**Phase 0 — Foundations.** Milestones 0-A through 0-G complete. All CI/CD infrastructure is in place. Remaining Phase 0 work: real Economics lesson with KaTeX math, `@astrojs/sitemap`, and final Lighthouse/a11y validation before Phase 0 sign-off.

## Completed

- ✅ Full architectural proposal — 15 core documents in `/docs`.
- ✅ System-wide consistency review; inconsistencies corrected (repo name `jamfinityweb`, Tailwind v4 CSS-first, base-path/domain conflict, toolchain concreteness).
- ✅ Architecture locked in `decisions/ADR-001-initial-architecture.md`.
- ✅ Handoff package authored: `implementation-guide.md` (zero-question start for Sonnet).
- ✅ Repository confirmed at `jamfinityweb/` with all docs tracked, working tree clean.
- ✅ **Milestone 0-A** — Astro 5.x + pnpm + TypeScript scaffold; ESLint v9 / Prettier / markdownlint; GitHub Actions `validate.yml` CI; bare index page. Key files: `astro.config.mjs`, `eslint.config.mjs`, `tsconfig.json`, `.nvmrc`, `package.json`, `.github/workflows/validate.yml`.
- ✅ **Pre-0-C fix** — markdownlint two-pass scoping: relaxed config for `docs/`, strict config for all other markdown. Key files: `docs/.markdownlint.json`, `.markdownlintignore`, updated `package.json` lint script.
- ✅ **Milestone 0-B** — Three-layer CSS token system (primitive → semantic → component), Tailwind v4 CSS-first wiring, light/dark theming, no-flash inline script. Key files: `src/styles/tokens.css`, `src/styles/global.css`, `src/pages/index.astro`.
- ✅ **Milestone 0-C** — Six Zod content collection schemas in `src/content/config.ts`; minimum sample content to verify reference integrity. Key files: `src/content/config.ts`, `src/content/subjects/economics.yaml`, `src/content/tracks/economics/microeconomics-i.yaml`, `src/content/lessons/economics/microeconomics-i/introduction.md`, `src/content/concepts/economics/scarcity.yaml`.
- ✅ **Milestone 0-D** — `BaseLayout`, `Prose`, `LessonLayout` (skeleton) layouts; `Meta`, `OpenGraph`, `JsonLd` SEO components; `index.astro` updated to use `BaseLayout`. Build: 0 errors, 0 warnings, 0 hints. Key files: `src/layouts/BaseLayout.astro`, `src/layouts/Prose.astro`, `src/layouts/LessonLayout.astro`, `src/components/seo/Meta.astro`, `src/components/seo/OpenGraph.astro`, `src/components/seo/JsonLd.astro`, `src/pages/index.astro`.
- ✅ **Milestone 0-E** — `Definition`, `Callout`, `Summary` content components; token-driven, zero-JS, accessible, MDX-ready. Build: 0 errors, 0 warnings, 0 hints (14 files). Key files: `src/components/content/Definition.astro`, `src/components/content/Callout.astro`, `src/components/content/Summary.astro`.
- ✅ **Milestone 0-F** — MDX integration (`@astrojs/mdx@5.0.6` for Astro 5.x); `[...slug].astro` lesson route via `getStaticPaths` + `lesson.slug`; sample lesson converted from `.md` to `.mdx` using `Definition`, `Callout`, `Summary`. Route generates `/economics/microeconomics-i/introduction/` with correct LearningResource JSON-LD, noindex (draft), all component output verified in built HTML. Build: 0 errors, 0 warnings, 0 hints (15 files). Key files: `astro.config.mjs`, `src/pages/[...slug].astro`, `src/content/lessons/economics/microeconomics-i/introduction.mdx`.
  - **Note:** `@astrojs/mdx@7.0.0` (Astro 7 era) installed first and failed — downgraded to `5.0.6`. When upgrading Astro, upgrade MDX integration in lockstep.
  - **Note:** `lesson.slug` (not `lesson.id`) used for URL params — `id` includes the `.mdx` extension in Astro 5 legacy collections; `slug` is clean.
- ✅ **Milestone 0-G** — `deploy.yml` GitHub Actions workflow: install → build → Pagefind index → upload artifact → deploy to GitHub Pages via official Pages Actions (`configure-pages@v5`, `upload-pages-artifact@v3`, `deploy-pages@v4`). Triggers on push to `main` only. Concurrency group `pages` cancels in-progress runs on new push. Build: 0 errors, 0 warnings, 0 hints (15 files). Key files: `.github/workflows/deploy.yml`.

## Remaining Phase 0 Work

Before Phase 0 sign-off (per `implementation-guide.md` DoD):
- [ ] `remark-math` + `rehype-katex` + KaTeX CSS (math rendering)
- [ ] `@astrojs/sitemap` (sitemap.xml)
- [ ] One real Economics lesson as MDX (heading hierarchy, Definition, Callout, KaTeX math, Summary)
- [ ] GitHub Pages Pages source configured to use Actions (repo settings, one-time)
- [ ] Lighthouse / a11y budget verification on the lesson page

## Next Session Starting Point

Read: `project-state.md` → `decisions/ADR-001-initial-architecture.md` → `implementation-guide.md` (Phase 0 DoD checklist).

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

### Open Schema Decisions (non-blocking — require Architect confirmation)

Surfaced during Milestone 0-C review:

- [ ] **`accentHue` type** — `content-strategy.md` specifies `string`; `src/content/config.ts` implements `z.number().int().min(0).max(360)`. HSL hue is semantically a number (0–360 integer), so `number` is more type-safe and validation-friendly. If the Architect intended a full CSS string (e.g. `"217deg"` or `"hsl(217 80% 50%)"`) the schema must change. Confirm and update `content-strategy.md` to match whichever is canonical.
- [ ] **Track `level` enum values** — Architecture specifies lesson `difficulty` as `intro | core | advanced` but does not enumerate track `level` values. Implementation chose `intro | intermediate | advanced`. The middle values differ (`core` vs. `intermediate`) and are not synonyms. If tracks and lessons should share a vocabulary, the track enum needs updating. Architect to confirm or specify.

## Risks

- **Build time as content scales** → mitigate with Actions caching / incremental builds.
- **Math/economics correctness in AI drafts** → human review mandatory before `published`.
- **Island sprawl** harming performance budgets → enforce island budget + Lighthouse gate.
- **Doc/code drift** → enforce "docs are source of truth"; ADRs for changes.
- **Base-path link bugs** on GitHub Pages → mandatory base-aware links rule.

## AI Context Management

See `docs/AI_WORKFLOW.md` for the full rules. Summary:

- Repository docs are the source of truth; chat history is not.
- New sessions start from: `project-state.md` → `decisions/ADR-001-initial-architecture.md` → `implementation-guide.md` → milestone-specific docs.
- After each milestone, this file is updated before the milestone is reported as done.
- Infer current state from files, not from chat history.

## Technical Debt

_(none yet — record every deliberate shortcut here with a remediation note and date.)_

## Future Expansion

- Subjects beyond Economics: Math, Statistics, Econometrics, Finance/CFA, Programming, AI.
- Interactivity: quizzes, plots, calculators, flashcards, visual knowledge-graph explorer.
- Automation: embedding-based link/summary suggestions; batch transforms.
- Audience: original articles, topic-cluster hubs, comments (Giscus).
- Monetization: gated premium tracks/tools via hosted checkout; optional hosted auth for sync/entitlements.
- All expansion must remain GitHub-Pages-static with no operated backend.
