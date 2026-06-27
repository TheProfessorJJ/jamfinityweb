# ADR-002 — Schema Conventions: `accentHue` and Difficulty/Level Vocabularies

- **Status:** Accepted / **LOCKED**
- **Date:** 2026-06-28
- **Deciders:** Chief Architect (Claude Opus chat)
- **Type:** Addendum to `ADR-001-initial-architecture.md` (§5 Content Architecture). Does not supersede ADR-001; clarifies two underspecified schema points surfaced in the Phase 0 audit (`docs/phase-0-review.md`, item R2).
- **Affected docs:** `content-strategy.md`
- **Code impact:** none — both decisions confirm the existing `src/content/config.ts` implementation.

---

## Context

The Phase 0 audit found two schema points where `content-strategy.md` and the implemented Zod schema diverged or were underspecified:

1. `accentHue` — doc said `string`; implementation used `z.number().int().min(0).max(360)`.
2. Track `level` (`intro | intermediate | advanced`) vs lesson `difficulty` (`intro | core | advanced`) — different middle values, with no documented rationale for whether they should share a vocabulary.

## Decision 1 — `accentHue` is a numeric HSL hue angle (LOCKED)

`accentHue` is an **integer in `[0, 360]`** representing an HSL hue angle.

```
accentHue: z.number().int().min(0).max(360)
```

**Rationale:**
- An accent hue *is* semantically a number; the type should model the domain.
- Numeric range is validatable at build time; a free CSS string is not and would let authors inject arbitrary colors, breaking theming consistency.
- Composes directly with the token system: `hsl(var(--subject-hue) <s>% <l>%)`, keeping saturation/lightness under design-system control while subjects vary only hue.

**Rejected:** `accentHue: string` (e.g. `"217deg"`, `"hsl(...)"`) — unvalidatable, invites palette drift, defeats the token discipline in `design-system.md`.

## Decision 2 — `level` and `difficulty` are distinct, non-unified axes (LOCKED)

Track `level` and lesson `difficulty` measure **orthogonal things** and keep **separate vocabularies**:

- **Track `level`** = `intro | intermediate | advanced` — curriculum positioning of the track within a learning path.
- **Lesson `difficulty`** = `intro | core | advanced` — cognitive demand of a single lesson; `core` = the standard/main tier.

**Rationale:**
- A track is a *sequence positioned in a curriculum*; a lesson is an *atomic unit with its own demand*. An `intermediate` track may contain `intro`, `core`, and `advanced` lessons. Collapsing them into one enum would lose a real dimension.
- Unifying would force a semantic compromise (`core` and `intermediate` are not synonyms) for no scalability gain.

**Guardrail (this is the actual fix):** the distinction must be *explicit*, not accidental. `content-strategy.md` now documents both axes and states they are orthogonal and must not be unified or derived from each other. Future authors/AI must treat the shared `intro`/`advanced` words as coincidence of language, not a shared scale.

**Rejected:** a single shared `level`/`difficulty` enum for both collections — conflates two axes, reduces expressiveness.

## Consequences

- No application-code change; `src/content/config.ts` already matches both decisions. Phase 0 audit item **R2 is resolved**.
- `content-strategy.md` updated to specify `accentHue` (numeric 0–360) and a "Difficulty vs Level" canonical section.
- Any future change to either decision requires a new ADR superseding this one.
