# Automation Workflow

> How raw source material becomes published lessons with AI assistance. The pipeline is deterministic and schema-gated.

## Goal

Founder uploads source material weekly → Claude Code (Lead Engineer, Sonnet) transforms it into schema-valid lessons → review → automatic publish. Minimize manual formatting; maximize consistency.

## Roles

- **Chief Architect (Opus chat):** owns `/docs`, schemas, system design. Does not author routine content.
- **Lead Engineer (Sonnet chat):** implements components, runs the transformation, fixes build issues.
- **Founder (human):** uploads sources, reviews drafts, approves publish.

## Pipeline Stages

```
1. INGEST      Drop source into content-source/<subject>/<track>/
2. EXTRACT     Parse PDF/slides → structured text + figures
3. TRANSFORM   AI generates MDX lessons against the lesson schema
4. VALIDATE    Schema (Zod) + link integrity + lint + math check
5. REVIEW      Human reviews draft (status: review) in preview build
6. PUBLISH     Approve → status: published → CI builds & deploys
```

### 1. Ingest
Source files placed under `content-source/` mirroring the target taxonomy. Filenames and folder give the pipeline subject/track context.

### 2. Extract
- PDFs/slides → text + extracted figures/equations.
- Figures saved to the lesson's asset folder; equations captured as LaTeX for `Math`.
- Output: a structured intermediate (outline + raw content) in `scripts/` scratch space.

### 3. Transform (AI)
Claude Code generates one or more lesson `.mdx` files:
- Fills frontmatter per schema (best-effort `prerequisites`/`concepts`/`related`; flagged for human confirmation).
- Writes prose in Jamfinity voice using the content component vocabulary.
- Inserts at least one interactive element where pedagogically useful.
- Sets `status: draft`.
- Records `sources` for provenance.

**Prompt contract:** the engineer follows a stored authoring spec (mirrors `content-strategy.md`). Consistency comes from the schema + spec, not from memory.

### 4. Validate (automated gate)
Run before any merge:
- Zod schema validation (Astro content collections).
- Reference integrity: every `prerequisites`/`concepts`/`related`/ref resolves. **Broken ref = build fails.**
- Lint + format (Prettier/ESLint/markdownlint).
- KaTeX parse check (no broken equations).
- Link check (internal links resolve).

### 5. Review
- Preview deploy (PR-based) renders `draft`/`review` content.
- Human verifies correctness, links, math, and figures.
- Author sets `status: review` then, on approval, `published`.

### 6. Publish
- Merge to `main` triggers production build & deploy (see `publishing-pipeline.md`).
- Search index, sitemap, RSS, OG images regenerate automatically.

## Human-in-the-Loop Boundaries

AI may: structure, format, draft prose, suggest links, build interactives.
Human must approve: factual/mathematical correctness, final `published` status, prerequisite graph edits.

## Weekly Cadence (typical)

1. Founder uploads the week's material.
2. Engineer runs transform → opens a PR with draft lessons.
3. Preview build; founder reviews.
4. Corrections; flip to `published`; merge.

## Failure Handling

- Validation failure blocks merge with a clear report.
- Ambiguous source content → lesson flagged `status: draft` with `TODO` callouts for human resolution, never silently published.

## Future Automation (roadmap)

- Auto-suggested `related`/`concepts` via embeddings (build-time, local).
- Auto-generated lesson summaries and OG images.
- Scheduled batch transforms via GitHub Actions on a labeled branch.

Anything automated must remain **GitHub-Pages-static** and **schema-gated**.
