# Project State

> Living status document. The Lead Engineer updates this as work progresses. Read this first to know where things stand. Convert relative dates to absolute.

_Last updated: 2026-06-27 (architecture established)_

## Current Phase

**Phase 0 — Foundations.** Architecture defined; implementation not yet started.

## Status Summary

- ✅ Architectural proposal complete (`/docs`, 15 documents).
- ⬜ Repository scaffold (Astro + TS + Tailwind v4 + pnpm).
- ⬜ Design tokens (`src/styles/tokens.css`).
- ⬜ Content collections + Zod schemas (`src/content/config.ts`).
- ⬜ Base layouts + `Prose`.
- ⬜ CI/CD (validate + deploy) to GitHub Pages.
- ⬜ Custom domain + HTTPS.
- ⬜ First end-to-end lesson.

## Key Decisions (locked)

| Decision | Choice | Doc |
|---|---|---|
| SSG | Astro | `tech-stack.md` |
| Content | MDX + Zod-validated collections | `content-strategy.md` |
| Styling | Tailwind v4 + CSS token layer | `design-system.md` |
| Islands | Preact (default) + Svelte (viz) | `tech-stack.md` |
| Search | Pagefind | `tech-stack.md` |
| Math | KaTeX (build-time) | `tech-stack.md` |
| Hosting | GitHub Pages + custom domain | `publishing-pipeline.md` |
| Backend | None (stateless edge services only) | `project-architecture.md` |

## Open Questions / To Confirm

- [ ] Custom domain name (assumed `jamfinity.com`) — confirm/purchase.
- [ ] Primary typeface selection (Inter/Geist-class) — final pick.
- [ ] Analytics: Plausible vs GA4.
- [ ] Whether `content-source/` lives in-repo or a sibling store (size/privacy of PDFs).

## Known Risks / Watch Items

- Build time as content scales → plan incremental builds / caching.
- Pipeline correctness on math-heavy content → human review mandatory.
- Avoid island sprawl harming performance budgets.

## Technical Debt Register

_(none yet — record any deliberate shortcut here with a remediation note)_

## How to Use This Document

- Update the Status Summary checkboxes as work lands.
- Add new locked decisions to the table (and the relevant doc).
- Log every accepted shortcut in the Technical Debt Register.
- Keep "Current Phase" aligned with `roadmap.md`.
