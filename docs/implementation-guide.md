# Implementation Guide (Lead Engineer Handoff)

> **Audience:** the Lead Software Engineer chat (Claude Sonnet 4.6). This is your starting point. It assumes the architecture in `/docs` and `docs/decisions/ADR-001-initial-architecture.md` is **locked**. Read ADR-001 first, then this. The goal: you can begin Phase 0 with **zero additional architectural questions**.

## Your Role & Boundaries

- You **implement** the locked architecture. You do not redesign it.
- If you believe an architectural decision is wrong, **stop and raise it** with the Architect (Opus chat) for a new ADR — do not silently deviate.
- Keep `/docs` and code in sync. Update `project-state.md` as milestones land. Log any deliberate shortcut in its Technical Debt section.

## Ground Truth (read in this order)

1. `decisions/ADR-001-initial-architecture.md` — the locked contract.
2. `development-rules.md` — how to work.
3. `tech-stack.md` — exact tools/versions.
4. `folder-structure.md` — where things go.
5. `content-strategy.md` — the content schemas you'll encode in `src/content/config.ts`.
6. `design-system.md` — the token system you'll author first.
7. The remaining docs as needed per task.

## Environment & Conventions (decided — do not re-litigate)

- **OS context:** developed on Windows; CI runs on Linux (GitHub Actions). Keep paths/scripts cross-platform.
- **Node:** 20 or 22 LTS; add `.nvmrc`. **pnpm** 9+; commit `pnpm-lock.yaml`.
- **Repo root:** `jamfinityweb/` (already a git repo, remote `origin`, branch `main`).
- **TypeScript** strict. **ESLint + Prettier + markdownlint**.
- **Branching:** feature branch → PR → checks pass → merge to `main`. `main` always deployable.
- **`site`/`base`:** from env vars (see `publishing-pipeline.md`). Default `https://<user>.github.io` + `/jamfinityweb`. **Never hardcode absolute internal links** — use Astro URL helpers / `import.meta.env.BASE_URL`.

## Phase 0 — Definition of Done (your first milestone)

Build the skeleton that proves the whole pipeline end-to-end. Done when **all** are true:

1. Astro + TypeScript + pnpm project initialized at repo root; `.nvmrc`, ESLint/Prettier/markdownlint configured.
2. Tailwind v4 wired (`@tailwindcss/vite`); `src/styles/tokens.css` holds the **three-layer token system** (primitive → semantic → component) for light + dark; no-flash theme script in `<head>`.
3. Integrations installed: `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/preact`; markdown configured with `remark-math` + `rehype-katex` + KaTeX CSS.
4. `src/content/config.ts` defines Zod schemas for **all six collections** (subjects, tracks, lessons, concepts, tools, articles) per `content-strategy.md`. Reference integrity enforced.
5. `BaseLayout` + `Prose` + a minimal `LessonLayout`; SEO `Meta`/`OpenGraph`/`JsonLd` components emitting valid tags.
6. **One real Economics lesson** authored as MDX, schema-valid, rendering with: heading hierarchy, a `Definition`, a `Callout`, KaTeX math, and a `Summary`.
7. CI: `validate.yml` (install → content validate → lint → build) blocking PRs; `deploy.yml` building + Pagefind + sitemap + deploying to GitHub Pages.
8. Site is live on the GitHub Pages project URL over HTTPS, passing performance/a11y budgets on the lesson page.

> Stop at the end of Phase 0 and report. Do not race ahead into Phases 1–3.

## Build Order Within Phase 0 (recommended)

1. Project init + tooling + CI skeleton (fail-fast feedback loop first).
2. Tokens + base layout + theming.
3. Content schemas (`config.ts`).
4. Lesson rendering (`Prose`, `LessonLayout`, content components used by the sample lesson).
5. Sample lesson + SEO + Pagefind + deploy.

## Decisions Already Made For You (do not ask)

| Question you might have | Answer |
|---|---|
| Which framework for islands now? | Preact only. Svelte later. |
| Tailwind config file? | None needed; CSS-first `@theme`. Tokens in `src/styles/tokens.css`. |
| How is math rendered? | Build-time KaTeX via remark-math/rehype-katex. |
| Custom domain now? | No. Ship to project URL with env-driven `base`. Domain is operational, later. |
| Where do raw PDFs go? | `content-source/<subject>/<track>/`. Never published. |
| Multi-repo per subject? | No. Single monorepo. |
| Can I add a backend for X? | No. Static + stateless edge services only. |
| OG images? | `astro-og-canvas` (or Satori) at build. |
| Comments/analytics now? | No. Phase 5 (Giscus) / later (Plausible). |

## Things You Must NOT Do

- Do not introduce a backend, database, or server runtime.
- Do not hardcode colors/spacing/type — tokens only.
- Do not eager-hydrate islands or add React as the page default.
- Do not break a published URL without a redirect.
- Do not let `/docs` drift from code.

## When You're Unsure

- Mechanical/implementation choice → make the most maintainable, reversible call and proceed; note it in `project-state.md`.
- Architectural choice → escalate to the Architect for an ADR before building.
