# Publishing Pipeline

> How content goes from repository to live site. GitHub Actions → static build → GitHub Pages.

## Overview

```
git push / merge to main
   → GitHub Actions
      → install (pnpm) → validate content → astro build
      → pagefind index → sitemap/RSS → OG images
      → deploy /dist to GitHub Pages
```

## Branching Model

- `main` — production. Every merge deploys.
- feature branches — one per content batch or code change; open a PR.
- PRs get a **preview deploy** (renders `draft`/`review` content) for review.

Protect `main`: require passing checks (validate + build) before merge.

## CI Workflows (`.github/workflows/`)

1. **`validate.yml`** (on PR): install → content schema validation → lint → KaTeX/link checks → test build. Blocks merge on failure.
2. **`deploy.yml`** (on push to `main`): full build → Pagefind index → sitemap/RSS/OG → deploy to Pages.
3. **`preview.yml`** (on PR): build including non-published statuses → publish preview artifact/environment.
4. **(future) `transform.yml`**: triggered on a labeled branch to run AI transforms in batch.

## Build Steps (deploy)

1. `pnpm install --frozen-lockfile`
2. Content validation (fail fast).
3. `astro build` → `/dist`.
4. `pagefind` post-build indexing over `/dist`.
5. Generate `sitemap.xml`, `rss.xml`.
6. Generate Open Graph images (per lesson/article).
7. Upload `/dist` as Pages artifact; deploy.

## GitHub Pages Configuration

- Repository: **`jamfinityweb`**. Without a custom domain, the project site publishes at `https://<github-user>.github.io/jamfinityweb/`.
- Deploy via the official **GitHub Pages Actions** flow (not the legacy `gh-pages` branch).
- HTTPS enforced (Pages-provided certificate).

### Base-path & domain decision (LOCKED — resolves the prior open question)

To avoid GitHub Pages' `base`-path pitfalls and the conflict between "launch with custom domain" and "domain is open," the decision is:

- `astro.config.mjs` reads **`site`** and **`base`** from environment variables with safe defaults, so switching domains is config-only and requires **zero code rework**:
  - **Default (no custom domain yet):** `site = https://<user>.github.io`, `base = /jamfinityweb`.
  - **Custom domain live:** `site = https://jamfinity.com`, `base = /` — add `public/CNAME` + DNS.
- **All internal links must be base-aware** — use Astro's URL helpers / `import.meta.env.BASE_URL`, never hardcode leading-slash paths. This is the single rule that makes the domain switch painless.
- Purchasing `jamfinity.com` is an **operational** task, not an architectural blocker. The site is fully functional on the project URL until then.

## Caching & Reproducibility

- Cache pnpm store and Astro build cache in Actions for speed.
- `--frozen-lockfile` guarantees reproducible installs.
- Builds must be deterministic — no network content fetched at build time except pinned assets.

## Rollback

- Pages keeps deployment history; redeploy a previous commit to roll back.
- Content is versioned in git; reverting a commit reverts the content.

## URLs & Redirects

- URL = taxonomy path (`/subject/track/lesson/`), trailing slash consistent.
- Moves/renames → add to `src/data/redirects.ts`; generate static redirect pages or `<meta refresh>`/`_redirects`-style handling compatible with Pages.
- Never break a published URL silently — SEO and inbound links depend on stability.

## Post-Deploy Artifacts (always regenerated)

- `sitemap.xml`, `rss.xml`, `robots.txt`
- Pagefind search index
- OG images
- 404 page

## Monitoring

- Plausible/GA for traffic.
- Optional Lighthouse CI in `validate.yml` to enforce performance budgets (see `performance-strategy.md`).
