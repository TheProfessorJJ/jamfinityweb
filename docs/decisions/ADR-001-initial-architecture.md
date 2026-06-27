# ADR-001 — Initial Architecture

- **Status:** Accepted / **LOCKED**
- **Date:** 2026-06-27
- **Deciders:** Chief Architect (Claude Opus chat), Founder
- **Supersedes:** none
- **Affected docs:** all of `/docs`

> This ADR is the authoritative, consolidated record of every architectural decision now considered **locked**. Locked means: do not change during implementation without a new ADR (e.g. `ADR-002`) that explicitly supersedes the relevant point. The detailed rationale lives in the referenced documents; this is the single-page contract.

---

## 1. Project Vision (LOCKED)

Jamfinity is a **premium, interactive, static educational platform** that transforms source material (slides, notes, PDFs) into beautiful, searchable, interconnected lessons. It is **not** a blog, docs site, or traditional LMS. Subject-agnostic from day one (Economics first → Math, Stats, Econometrics, Finance/CFA, Programming, AI, articles, tools). Intended to become a business; **no decision may preclude future monetization**. Five-year+ horizon: optimize for maintainability, scalability, GitHub Pages, SEO, UI/UX, AI-assisted authoring, monetization, growth. _Ref: `project-vision.md`._

## 2. Technology Stack (LOCKED)

- **SSG:** Astro (5.x) — islands architecture, typed content collections, MDX.
- **Content:** MDX + frontmatter, validated by **Zod** via Astro content collections.
- **Styling:** Tailwind CSS v4 (CSS-first `@theme`) driven by a **CSS custom-property token layer** (`src/styles/tokens.css` = source of truth).
- **Islands:** **Preact** default; **Svelte** added only when a data-heavy visualization needs it; vanilla TS when no framework needed.
- **Math:** KaTeX at build (`remark-math` + `rehype-katex`).
- **Search:** Pagefind (static, client-side, post-build index).
- **Diagrams:** pre-rendered Mermaid + hand-authored SVG.
- **Toolchain:** Node 20/22 LTS, pnpm 9+, TypeScript.
- **Edge services (stateless, hosted, optional):** Giscus (comments), Plausible/GA (analytics), Gumroad/Stripe/Polar (future checkout).
- **Explicitly rejected:** Next.js, Eleventy (as primary), jQuery/Bootstrap, runtime CSS-in-JS, any self-hosted backend/database.
_Ref: `tech-stack.md`._

## 3. Repository Structure (LOCKED)

- **Single monorepo**, root **`jamfinityweb/`** (the GitHub Pages repo), to keep the cross-subject knowledge graph intact.
- Stable, contract-bound directories: `content-source/`, `src/content/` (+ `config.ts`), `src/components/{primitives,layout,content,interactive,navigation,seo}`, `src/styles/`, `src/lib/`, `scripts/`, `.github/workflows/`, `docs/` (+ `docs/decisions/`).
- Naming: `kebab-case` files/dirs, `PascalCase` components, `camelCase` utils.
- URL = taxonomy path `/subject/track/lesson/`; IDs derived from path, immutable; moves require redirect entries.
_Ref: `folder-structure.md`._

## 4. Design Philosophy (LOCKED)

Typography-led, minimal, compact, premium (Linear/Apple/Stripe/Raycast/Vercel/Notion). **Three-layer tokens** (primitive → semantic → component) as the only source of color/space/type values — no hardcoded values in components. Light + dark are equal first-class themes. Subtle, fast, purposeful motion respecting `prefers-reduced-motion`. One accent + neutral-first palette. _Ref: `design-system.md`, `component-library.md`._

## 5. Content Architecture (LOCKED)

Taxonomy: **Subject → Track → Lesson**, plus cross-cutting **Concepts**, standalone **Tools**, and **Articles**. Each collection has a Zod schema (the contract). Lessons carry provenance (`sources`), lifecycle (`draft → review → published`), and graph links (`prerequisites`, `concepts`, `related`). The **knowledge graph is derived at build time**; broken references **fail the build**. Schema + authoring spec — not memory — guarantee consistency. _Ref: `content-strategy.md`._

## 6. Automation Workflow (LOCKED)

Pipeline: **Ingest → Extract → Transform (AI) → Validate → Review → Publish**. Claude Code (Sonnet Lead Engineer) drafts schema-valid lessons from sources into `content-source/`-mirrored paths. Validation gate = Zod + reference integrity + lint + KaTeX parse + link check. **Human review is mandatory before `published`**; AI never auto-publishes factual content. _Ref: `automation-workflow.md`._

## 7. Publishing Workflow (LOCKED)

GitHub Actions → validate → `astro build` → Pagefind index → sitemap/RSS/OG → deploy to **GitHub Pages** via official Pages Actions flow. `main` always deployable; PRs get preview deploys rendering non-published content. **`site`/`base` come from env vars** (default `…github.io` + `/jamfinityweb`; custom domain = config-only switch). Reproducible builds (`--frozen-lockfile`); no network content fetched at build. Published URLs never break without a redirect. _Ref: `publishing-pipeline.md`._

## 8. Development Rules (LOCKED)

We build systems, not pages. Docs are the single source of truth; no silent doc/code drift. Zero-JS default; justify every island. Tokens only — no magic values. Rule of three for abstraction. Typed everything; pure logic in `src/lib/`. a11y + SEO are definition-of-done. Feature-branch + PR + passing checks; `main` deployable. Add dependencies only when they earn their weight; no backend/database. _Ref: `development-rules.md`._

## 9. Performance Philosophy (LOCKED)

Performance is an enforced constraint. Budgets: Lighthouse ≥95 perf / 100 a11y / 100 BP / ≥95 SEO; LCP <1.5s, CLS <0.05, INP <200ms; default content page <30KB JS (many 0KB); typical lesson <300KB. Achieved via zero-JS islands, build-time math/diagrams/search, subset self-hosted fonts, optimized images, token-driven purged CSS. Regressions must be fixed or justified. _Ref: `performance-strategy.md`._

## 10. Accessibility Philosophy (LOCKED)

WCAG 2.2 AA baseline, Lighthouse a11y target 100. Semantic HTML first, full keyboard operability, visible focus, correct screen-reader semantics, contrast-passing token pairs in both themes, motion-reduction respected, accessible math/diagram alternatives. a11y is a definition-of-done criterion, not a later phase. _Ref: `accessibility.md`._

---

## Consequences

- **Positive:** instant pages, low operating cost, AI-authorable at scale, SEO-strong, monetization-ready, framework-portable content + tokens.
- **Trade-offs accepted:** no cross-device sync without a future hosted auth layer; build time grows with content (mitigated by caching/incremental builds); contributors must learn the token + schema discipline.

## Change Process

Any change to a LOCKED item requires a new ADR (`ADR-00N`) that names what it supersedes, updates the affected `/docs`, and updates `project-state.md`. Until then, these decisions stand.
