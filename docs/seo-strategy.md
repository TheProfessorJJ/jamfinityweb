# SEO Strategy

> Jamfinity is a public knowledge resource and a future business. Discoverability is a first-class feature, not an afterthought. A static, fast, structured site is already an SEO advantage — we maximize it.

## Foundations (built-in)

- **Static, fast pages** — Core Web Vitals are strong by construction (see `performance-strategy.md`). Speed is a ranking factor and a UX win.
- **Clean, stable URLs** — `/subject/track/lesson/`, human-readable, never reused. URL stability protects accrued ranking.
- **Semantic HTML** — correct heading hierarchy, landmarks, lists. Helps crawlers and accessibility together.

## Per-Page Metadata (SEO components)

Every page emits via the `seo/` components:
- `<title>` — `Lesson — Track — Jamfinity` pattern, unique per page.
- `<meta name="description">` — from lesson `summary`.
- Canonical URL.
- Open Graph + Twitter card (title, description, generated OG image).
- `lang`, viewport, theme-color.

## Structured Data (JSON-LD)

- **Article / LearningResource** schema for lessons and articles.
- **Course** schema for tracks.
- **BreadcrumbList** for navigation hierarchy.
- **Organization / WebSite** with `SearchAction` on the homepage.
- **DefinedTerm** for concepts (glossary) — strong for "what is X" queries.

These map naturally from the content schema — generated, not hand-written.

## Content-Driven SEO

- **Concept/glossary pages** target high-intent "what is / definition of" queries — a large, durable long-tail.
- **Interconnected lessons** create deep internal linking (prerequisites, related) — distributes authority and aids crawl depth.
- **Original articles** target broader informational queries and build topical authority per subject.
- Each subject becomes a **topic cluster**: subject hub → tracks → lessons → concepts.

## Technical SEO

- `sitemap.xml` auto-generated, submitted to Google Search Console.
- `robots.txt` permits crawl, points to sitemap.
- `rss.xml` for syndication and feed readers.
- No duplicate content; canonical tags enforce single source.
- Redirects for moved content preserve link equity.
- Mobile-first, responsive (Google indexes mobile).

## AI / Answer-Engine Optimization (forward-looking)

- Clear, well-structured, citable content with definitions and summaries is favored by AI answer engines.
- Structured data + concise `KeyIdea`/`Summary` blocks make content easy to quote and attribute.
- This positions Jamfinity for both traditional search and LLM-driven discovery.

## Measurement

- Google Search Console (impressions, queries, coverage).
- Plausible/GA for behavior.
- Track: indexed pages, query growth per subject, top concepts.

## Anti-Patterns to Avoid

- Keyword stuffing, thin pages, duplicate descriptions.
- Blocking JS-dependent content from crawlers (our content is static HTML — safe by default).
- Changing URLs without redirects.

## Monetization Linkage

SEO drives the top of the funnel. Free, discoverable lessons attract; premium tracks/tools convert. SEO and monetization are complementary — see `roadmap.md`.
