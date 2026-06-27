# Phase 0 Architectural Review

> Authored: 2026-06-28 — Lead Engineer (Claude Sonnet 4.6)
> Scope: Full inspection of all Phase 0 code against architecture docs.
> Verdict: **Phase 0 foundation is sound. Three items must be resolved before Phase 1 begins.**

---

## What Was Audited

Every file produced in Milestones 0-A through 0-G was read against the architecture docs in `/docs`. This covers 18 source files (styles, layouts, components, content, pages, workflows), `package.json`, `astro.config.mjs`, `tsconfig.json`, and both CI workflows.

---

## Issues by Severity

### CRITICAL — Must fix before Phase 1

None. The build is clean (0 errors / 0 warnings / 0 hints across 15 files). Type-check, lint, and build all pass.

---

### RECOMMENDED — Should resolve before Phase 1 begins

**R1. Draft content publicly accessible via direct URL**

`src/pages/[...slug].astro` calls `getCollection('lessons')` with no filter. All lessons, regardless of `status`, are built and served. Anyone who guesses the URL can read draft content.

The `noIndex` flag in `LessonLayout` keeps search engines away, but the pages are publicly reachable. The architecture requires only `published` content in production.

Fix (3 lines in `[...slug].astro`):
```ts
const lessons = await getCollection('lessons', ({ data }) =>
  import.meta.env.PROD ? data.status === 'published' : true
);
```

**R2. Architect confirmation needed on two open schema decisions**

Both are logged in `project-state.md § Open Schema Decisions`. They are non-breaking now (only one content file exists) but will cause schema migration pain if confirmed wrong after content scales.

- **`accentHue` type**: `content-strategy.md` says `string`; `config.ts` implements `z.number().int().min(0).max(360)`. If the Architect intended a full CSS string (`"217deg"`, `"hsl(217 80% 50%)"`) the schema must change before colors are wired to subjects in Phase 1.
- **Track `level` vs lesson `difficulty` vocabulary**: track uses `intro | intermediate | advanced`; lesson uses `intro | core | advanced`. The middle values differ. If they are meant to share a vocabulary, one enum needs updating.

Neither blocks Phase 0 sign-off, but the Architect should confirm both before the first real content batch lands.

**R3. TypeScript path alias for `src/`**

MDX files import components with relative paths four levels deep:
```
import Definition from '../../../../components/content/Definition.astro';
```

This works today but will silently break if lesson directory nesting changes, and it makes every MDX file harder to audit. A path alias in `tsconfig.json` resolves this:
```json
"paths": { "@/*": ["./src/*"] }
```

After which all MDX imports become `@/components/content/Definition.astro`. This is a small `tsconfig.json` change with significant authoring ergonomics payoff as content scales, especially for AI-assisted authoring.

---

### OPTIONAL — Good to have; not blocking Phase 1

**O1. `validate.yml` triggers on both PR and push to `main`**

The architecture describes CI as PR-only. `deploy.yml` already builds on every `main` push, so the `validate.yml` run on `main` is redundant. Harmless, but contradicts the architecture doc and burns CI minutes on every merge. Restrict `validate.yml` to `pull_request` only when convenient.

**O2. `lesson.slug` is deprecated in Astro 5 (stable through Phase 1)**

`[...slug].astro` uses `lesson.slug` from the legacy `type: 'content'` API. This is stable now, but when the project eventually migrates to Astro's Content Layer API the route must switch to stripping the extension from `lesson.id`. No action needed in Phase 1; record in technical debt.

**O3. `public/` directory does not exist**

The token system references `var(--font-sans)` etc. which resolve to the system font stack. Phase 1 requires a `public/fonts/` directory and `fonts.css` for self-hosted web fonts (Inter/Geist-class). Also missing: favicon, `robots.txt`. These are Phase 1 items; flagging here so the first Phase 1 milestone includes them.

**O4. No `404.astro` page**

Without it, GitHub Pages serves a generic `404`. Astro supports `src/pages/404.astro`. Low priority, but adds polish to the live site.

**O5. `src/lib/` does not exist**

Architecture requires pure TS utilities here for knowledge-graph building, content queries, and formatting. These are Phase 1 concerns — `prerequisites`/`related` navigation and concept linking will need them. No action in Phase 0.

**O6. `Summary` component renders `<h2>` unconditionally inside lesson content**

`LessonLayout` renders the lesson `<h1>` title in the header. Lesson MDX content should therefore start at `<h2>`. The `Summary` component renders its own `<h2>` for the summary heading. This is the correct heading level — document outline is: `h1` (lesson title in header) → `h2` (Summary, and any section headings in lesson body) → `h3+` (sub-sections). This is by design; recording it so the content authoring guide documents the convention.

**O7. Phase 0 DoD items deferred to Phase 1 (or wrap-up milestone)**

Per `implementation-guide.md`, these items remain:
- `remark-math` + `rehype-katex` + KaTeX CSS
- `@astrojs/sitemap`
- `@astrojs/preact`
- One real Economics lesson with heading hierarchy, Definition, Callout, KaTeX math, Summary
- GitHub Pages repo setting (Pages → Source → "GitHub Actions") — one-time UI action
- Lighthouse / a11y budget verification on the live lesson page

These may be folded into Phase 1's first sprint or completed as a distinct "Phase 0 wrap-up" milestone. Architect should specify.

---

## Doc / Code Consistency

| Doc | Code | Status |
|---|---|---|
| `content-strategy.md` taxonomy | `src/content/config.ts` six collections | ✅ In sync (except two open schema questions) |
| `folder-structure.md` | Actual directory tree | ✅ In sync; missing dirs (`src/lib/`, `public/`, etc.) are correctly Phase 1+ |
| `decisions/ADR-001` | `astro.config.mjs`, `package.json`, `tsconfig.json` | ✅ In sync |
| `tech-stack.md` toolchain | Installed versions | ✅ In sync |
| `seo-strategy.md` | `Meta.astro`, `OpenGraph.astro`, `JsonLd.astro`, `LessonLayout` | ✅ In sync |
| `design-system.md` token model | `tokens.css` three-layer structure | ✅ In sync |
| `implementation-guide.md` Phase 0 DoD | Milestones 0-A through 0-G | ⚠️ DoD items O7 above still outstanding |
| `project-state.md` | Actual code state | ✅ Current and accurate |
| `AI_WORKFLOW.md` | Session practice | ✅ Followed throughout |

---

## Overall Verdict

Phase 0 has delivered a clean architectural foundation:

- CI/CD pipeline is wired end-to-end (validate on PR, deploy on main push)
- Content schema is Zod-validated with compile-time reference integrity
- Token system is three-layer, theme-pure, dark mode is first-class
- Layout architecture (BaseLayout → LessonLayout → Prose) is correct
- SEO is fully structured (Meta, OpenGraph, JSON-LD, noIndex for draft content)
- MDX rendering pipeline is verified end-to-end with real components
- Pagefind integration is in place

**Phase 1 can begin after:**
1. R1 — Production content filter in `[...slug].astro` (3 lines, no architecture question)
2. R2 — Architect confirms `accentHue` type and track `level` enum vocabulary
3. R3 — TypeScript path alias in `tsconfig.json` (1 block, no architecture question)

R1 and R3 are code changes the Lead Engineer can implement in the next session immediately. R2 requires the Architect.
