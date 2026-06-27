# Tech Stack

> Every tool choice with its justification and the alternatives rejected. Changing anything here requires updating `project-architecture.md`.

## Summary Table

| Concern | Choice | Why |
|---|---|---|
| Static site generator | **Astro** | Islands architecture, content collections, MDX, zero-JS default |
| Content format | **MDX + frontmatter** | AI-friendly prose + embedded interactivity; portable |
| Schema/validation | **Zod** (via Astro content config) | Build-time content contract; type safety |
| Styling | **Tailwind CSS v4 + CSS custom-property tokens** | Scalable utilities driven by a token source of truth |
| Interactive islands | **Preact** (default) + **Svelte** (heavy viz) | Tiny runtime; framework-agnostic via Astro |
| Search | **Pagefind** | Static, client-side, scales to thousands of pages |
| Math rendering | **KaTeX** (build-time) | Fast, no runtime MathJax cost; essential for Econ/Math |
| Diagrams | **Mermaid** (pre-rendered) + hand-authored SVG | Static output, no runtime weight |
| Charts/plots | **Plot/D3 or uPlot** in Svelte islands | Interactive only where hydrated |
| Hosting | **GitHub Pages + custom domain** | Free, reliable, matches constraint |
| CI/CD | **GitHub Actions** | Native to repo; runs build + deploy + validation |
| Comments (later) | **Giscus** | GitHub Discussions-backed, static-compatible |
| Analytics | **Plausible** (or GA4) | Privacy-friendly, lightweight |
| Monetization (later) | **Gumroad / Stripe Payment Links / Polar** | Hosted checkout, no backend |
| Language | **TypeScript** | Type safety across content + utils |
| Package manager | **pnpm** | Fast, disk-efficient, strict |

## Key Decisions & Trade-offs

### Astro vs Next.js vs Eleventy
- **Next.js (static export):** Powerful but React-everywhere ships excess JS for a content site; static export fights SSR-first design. Rejected.
- **Eleventy:** Lightweight and excellent for pure content, but weak ergonomics for rich interactive islands and typed content. Rejected as primary.
- **Astro:** Wins on the exact axis that matters — content-heavy *with selective interactivity*. Zero-JS default serves the premium/fast goal. Typed content collections are the long-term moat. **Chosen.**

### Islands framework: Preact + Svelte
- **Preact** as the default island runtime: ~3KB, React-like DX, plenty for quizzes/calculators.
- **Svelte** for data-heavy visualizations (interactive plots, graph explorer) where its compiled output and reactivity shine.
- Astro lets both coexist. Avoid full React to keep bundles small. **Rule:** reach for the lightest tool that does the job; vanilla TS island if no framework is needed.

### Tailwind v4 + tokens (not Tailwind alone, not CSS-in-JS)
- CSS custom properties in `src/styles/tokens.css` are the **source of truth**.
- Tailwind is configured *from* those tokens, so utilities and components reference the same semantic values.
- Enables light/dark theming and one-place visual evolution. CSS-in-JS rejected (runtime cost, wrong for SSG).

### Search: Pagefind (not Algolia, not Lunr)
- **Algolia:** great UX but a hosted service with quotas/keys — adds an operational dependency and cost. Rejected for now.
- **Lunr/FlexSearch:** index ships whole to client; doesn't scale well to thousands of pages.
- **Pagefind:** builds a chunked static index, loads incrementally, runs fully client-side. Purpose-built for large static sites. **Chosen.**

### Math: KaTeX at build time
Economics/Math/Econometrics demand heavy equation rendering. KaTeX pre-rendered at build avoids shipping a runtime math engine and keeps pages instant.

## Version Policy

- Pin major versions; update deliberately, not automatically.
- Astro and Tailwind majors are reviewed before adoption.
- `pnpm-lock.yaml` committed; reproducible builds required.

## Explicitly Avoided

- jQuery, Bootstrap, generic CSS frameworks.
- Any self-hosted database or server runtime.
- Heavy client frameworks as the page default.
- Runtime CSS-in-JS.
