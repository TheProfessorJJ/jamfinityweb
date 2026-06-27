# Content Strategy

> The content model is the most important long-term asset. Schemas here are the contract every lesson — human- or AI-authored — must satisfy.

## Content Taxonomy

```
Subject  →  Track  →  Lesson
                  ↘  Concept (cross-cutting glossary)
Tool (standalone interactive)
Article (original essay / public resource)
```

- **Subject** — a domain (Economics, Statistics, AI…).
- **Track** — an ordered sequence within a subject (e.g. "Microeconomics I"). Roughly a course/module.
- **Lesson** — the atomic learning unit. One concept cluster, self-contained, ~5–20 min.
- **Concept** — a defined term/idea referenced by many lessons. Powers the knowledge graph and glossary.
- **Tool** — a standalone interactive utility (calculator, simulator).
- **Article** — original long-form content, less structured than a lesson.

## Collection Schemas (conceptual — implemented in `src/content/config.ts` with Zod)

### Lesson
```
id            string   (derived from path, immutable)
title         string
subject       ref→subjects
track         ref→tracks
order         number   (position within track)
summary       string   (1–2 sentences; used in cards, SEO)
difficulty    enum     (intro | core | advanced)   — per-lesson cognitive load (see Difficulty vs Level below)
estMinutes    number
prerequisites ref[]→lessons
concepts      ref[]→concepts
related       ref[]→lessons
sources       { title, type, ref }[]   (provenance of original material)
status        enum     (draft | review | published)
createdAt     date
updatedAt     date
tags          string[]
```

### Concept
```
id, term, aliases[], definition, subject, relatedConcepts ref[], firstSeenIn ref→lessons
```

### Track
```
id, title, subject ref, order, summary, level, status
level    enum    (intro | intermediate | advanced)   — curriculum positioning (see Difficulty vs Level below)
```

### Subject
```
id, name, description, accentHue, icon, order
accentHue    number    (integer 0–360)    — HSL hue angle for the subject's accent; consumed as hsl(var(--subject-hue) …)
```

### Difficulty vs Level (canonical — see ADR-002)

Track `level` and lesson `difficulty` are **two distinct, orthogonal axes** and intentionally use different vocabularies. Do **not** unify them.

- **Track `level`** = `intro | intermediate | advanced` — the track's *position in a learning path / curriculum* (catalog-style level).
- **Lesson `difficulty`** = `intro | core | advanced` — a *single lesson's cognitive demand*. `core` denotes the standard/main body tier.

They overlap on `intro`/`advanced` only as natural language; they are not the same dimension. An `intermediate`-level track may contain `intro`, `core`, and `advanced` lessons. Neither enum derives from the other.

### Tool / Article
```
Tool:    id, title, summary, component (island id), subject?, tags[], status
Article: id, title, summary, author, publishedAt, updatedAt, tags[], status, sources[]
```

## Lesson Anatomy (authoring template)

Every lesson MDX follows a consistent shape so the experience is predictable and the pipeline is deterministic:

1. **Frontmatter** (schema above).
2. **Hook / context** — why this matters, one short paragraph.
3. **Key ideas** — `KeyIdea` components up front.
4. **Body** — prose with `Definition`, `Callout`, `Math`, `Figure`, `Steps`.
5. **Interactive** — at least one `Quiz`, `Plot`, or tool where it adds understanding.
6. **Summary** — `Summary` recap.
7. **Sources** — `SourceRef` to the original material.

## Authoring Voice

- Clear, precise, slightly editorial. Explains *why*, not just *what*.
- Defines terms on first use (`Definition`).
- Visual-first: prefer a diagram/plot to a paragraph where possible.
- No filler, no padding. Compact like the design.

## Provenance & Integrity

- Every lesson records its `sources`. Source files stay in `content-source/`.
- AI-generated content is reviewed before `status: published`. The schema enforces structure; humans verify correctness — especially math and economics claims.

## The Knowledge Graph (content-driven)

`prerequisites`, `concepts`, and `related` are authored as IDs and resolved at build time into the graph. Authors maintain links; the system derives navigation, "learn next," and the visual map. **Broken references fail the build** — the graph is always valid.

## Lifecycle

`draft → review → published`. Only `published` content is built into production. `draft`/`review` visible in preview builds only.

## Versioning Content

- Lessons are living documents; `updatedAt` tracks revisions.
- Significant rewrites keep the same `id` (preserve URL + inbound links).
- Renames/moves require a redirect entry (see `folder-structure.md`).

## Scale Plan

The taxonomy supports thousands of lessons across dozens of subjects without structural change. Growth = more content files, not more architecture.
