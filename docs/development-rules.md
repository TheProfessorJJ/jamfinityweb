# Development Rules

> The constitution for everyone who touches the codebase — the Lead Engineer (Sonnet), future developers, and future AI. These rules exist to prevent technical debt and protect long-term scalability.

## Prime Directives

1. **We build systems, not pages.** Everything reusable, everything scalable.
2. **The docs are the single source of truth.** Code follows `/docs`. If code and docs disagree, fix one deliberately — never let them drift silently.
3. **Prefer incremental improvement over rewrites.**
4. **Avoid technical debt.** When a shortcut is unavoidable, record it in `project-state.md` with a remediation note.

## Content & Schema

- All content validates against the Zod schemas. **Broken references fail the build.**
- Never hand-maintain derived data (knowledge graph, nav, sitemap) — derive it.
- Provenance required: every lesson records its `sources`.
- `published` status requires human review.

## Components

- No hardcoded colors/spacing/type — consume **design tokens** only.
- Default to **zero JavaScript**; justify every island.
- Typed props; documented before second use.
- Accessible by construction (see `accessibility.md`).
- Light + dark both correct.
- **Rule of three:** abstract a pattern on its third real use, not before.

## Styling

- `src/styles/tokens.css` is the source of truth. Visual changes are token changes wherever possible.
- Tailwind utilities reference tokens. No magic numbers.

## Code Quality

- TypeScript everywhere; no `any` without justification.
- Pure logic in `src/lib/` (testable, framework-free).
- Small, focused modules. Clear naming over cleverness.
- Match surrounding code style.

## Performance

- Respect the budgets in `performance-strategy.md`. A PR that regresses them must fix or justify.
- No eager hydration. No unsubsetted fonts. No render-blocking third-party scripts.

## Git & Workflow

- Feature branch per change; PR with passing checks.
- `main` is always deployable.
- Commits: clear, scoped, present-tense.
- Never break a published URL without a redirect.

## Dependencies

- Add a dependency only when it earns its weight. Prefer the platform.
- Pin majors; update deliberately.
- No dependency that requires a server/runtime backend.

## Accessibility & SEO

- a11y and SEO are definition-of-done criteria, not later passes.
- Every page: unique title/description, valid structured data, semantic HTML.

## Definition of Done

A change is done when it is: schema-valid, token-driven, accessible, within performance budget, documented if it introduces a reusable pattern, and consistent with `/docs`.

## When In Doubt

- Choose the option that is most maintainable and most reversible.
- If a decision is architectural, defer to the Chief Architect (Opus chat) and update `/docs` before building.
- Question assumptions; do not cargo-cult. Recommend the objectively strongest option.

## Anti-Patterns (forbidden)

- Page-specific one-off CSS that duplicates a token.
- Copy-pasted components instead of shared ones.
- Hand-edited generated artifacts.
- Silent doc/code drift.
- Premature abstraction.
- Adding a backend/database.
