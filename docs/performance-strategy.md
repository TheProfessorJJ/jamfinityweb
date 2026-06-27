# Performance Strategy

> Premium feel = instant pages. Performance is a design constraint with enforced budgets, not a nice-to-have.

## Targets (budgets)

- **Lighthouse:** ≥ 95 Performance, 100 Accessibility, 100 Best Practices, ≥ 95 SEO.
- **Core Web Vitals:** LCP < 1.5s, CLS < 0.05, INP < 200ms (good thresholds, beaten where possible).
- **JS per page (default content page):** < 30KB transferred; many pages 0KB.
- **Total page weight (typical lesson):** < 300KB including fonts.
- **Time to interactive:** effectively immediate for static content.

Budgets are enforceable via Lighthouse CI in `validate.yml`.

## How We Get There

### Zero-JS by default (islands)
Astro ships no JavaScript unless an island requires it. A prose lesson is pure HTML/CSS. Interactivity is hydrated selectively (`client:visible` / `client:idle`), never eagerly.

### Build-time everything
- Math via **KaTeX at build** (no runtime engine).
- Diagrams pre-rendered (Mermaid → SVG; hand-authored SVG).
- Search index built at compile time (Pagefind), loaded incrementally on demand.
- No runtime data fetching for content.

### Fonts
- Self-hosted, subset, `font-display: swap`, preloaded for the primary face.
- Limit families/weights. Variable font where it reduces requests.
- System-font fallback stack to avoid layout shift.

### Images & media
- Astro image optimization: responsive `srcset`, modern formats (AVIF/WebP), lazy-loading below the fold.
- Explicit dimensions to prevent CLS.
- SVG for diagrams/icons (small, sharp, themeable).

### CSS
- Token-driven, utility-based; minimal and purged.
- Critical CSS inlined by the framework where applicable.
- No runtime CSS-in-JS.

### Caching
- Hashed asset filenames → long-lived immutable caching.
- HTML revalidated; assets cached aggressively.

### Islands discipline
- Each island justifies its bytes (`component-library.md` island budget).
- Heavy visualizations: Svelte (compiled, small), lazy-hydrated, code-split.
- No island loads above-the-fold unless essential.

## Measurement & Enforcement

- Lighthouse CI (optional gate) in PR validation.
- Real-user vitals via Plausible/analytics where available.
- Regression policy: a PR that blows a budget must justify or fix before merge.

## Scalability of Performance

Performance must not degrade as content grows:
- Pagefind scales to thousands of pages without shipping a giant index.
- Per-page weight is independent of total site size (static, per-route output).
- Build time grows with content; mitigate with build caching and, if needed, incremental builds.

## Anti-Patterns

- Eager-hydrating islands.
- Large client frameworks as the page baseline.
- Unsubsetted fonts, render-blocking third-party scripts.
- Shipping the whole search index to the client.
