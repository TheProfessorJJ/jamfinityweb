import { defineCollection, reference, z } from 'astro:content';

// ---------------------------------------------------------------------------
// Shared schemas reused across collections
// ---------------------------------------------------------------------------

const statusSchema = z.enum(['draft', 'review', 'published']);

const sourceSchema = z.object({
  title: z.string(),
  type: z.enum(['lecture', 'textbook', 'paper', 'slides', 'video', 'other']),
  ref: z.string(),
});

// ---------------------------------------------------------------------------
// subjects  — top-level knowledge domains (Economics, Statistics, AI…)
// type: data — pure metadata, no prose body
// path: src/content/subjects/<subject-id>.yaml
// ---------------------------------------------------------------------------

const subjects = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    // HSL hue (0–360) for per-subject accent tinting — used sparingly.
    accentHue: z.number().int().min(0).max(360),
    // Lucide-compatible icon name rendered inline as SVG.
    icon: z.string(),
    // Display order on the subjects index page.
    order: z.number().int().nonnegative(),
  }),
});

// ---------------------------------------------------------------------------
// tracks  — ordered sequences within a subject (roughly a course or module)
// type: data — metadata only; lessons carry the prose
// path: src/content/tracks/<subject-id>/<track-id>.yaml
// ID convention: <subject-id>/<track-id>  e.g. "economics/microeconomics-i"
// ---------------------------------------------------------------------------

const tracks = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    subject: reference('subjects'),
    // Position within the subject's track list.
    order: z.number().int().nonnegative(),
    summary: z.string(),
    level: z.enum(['intro', 'intermediate', 'advanced']),
    status: statusSchema,
  }),
});

// ---------------------------------------------------------------------------
// lessons  — the atomic learning unit (~5–20 min each)
// type: content — MDX body carries prose and interactive components
// path: src/content/lessons/<subject-id>/<track-id>/<lesson-slug>.mdx
// ID convention: <subject-id>/<track-id>/<lesson-slug>
// ---------------------------------------------------------------------------

const lessons = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subject: reference('subjects'),
    track: reference('tracks'),
    // Position within the track; used for prev/next navigation.
    order: z.number().int().nonnegative(),
    // 1–2 sentences — shown on cards, used as meta description.
    summary: z.string().max(300),
    difficulty: z.enum(['intro', 'core', 'advanced']),
    // Estimated reading + interaction time in minutes.
    estMinutes: z.number().int().positive(),
    // Knowledge-graph edges — all optional, default to empty.
    prerequisites: z.array(reference('lessons')).default([]),
    concepts: z.array(reference('concepts')).default([]),
    related: z.array(reference('lessons')).default([]),
    // Provenance: every lesson records its source material.
    sources: z.array(sourceSchema).default([]),
    status: statusSchema,
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

// ---------------------------------------------------------------------------
// concepts  — defined terms; cross-collection glossary; powers knowledge graph
// type: data — short structured definition; body prose not needed at this stage
// path: src/content/concepts/<subject-id>/<concept-id>.yaml
// ID convention: <subject-id>/<concept-id>  e.g. "economics/scarcity"
// ---------------------------------------------------------------------------

const concepts = defineCollection({
  type: 'data',
  schema: z.object({
    term: z.string(),
    // Alternative names or spellings for search and cross-referencing.
    aliases: z.array(z.string()).default([]),
    // Plain-text definition — concise, 1–3 sentences.
    definition: z.string(),
    // Concepts may be domain-specific or cross-subject (optional).
    subject: reference('subjects').optional(),
    // Lateral graph links to related concepts.
    relatedConcepts: z.array(reference('concepts')).default([]),
    // The first lesson where this concept is introduced (optional).
    firstSeenIn: reference('lessons').optional(),
  }),
});

// ---------------------------------------------------------------------------
// tools  — standalone interactive utilities (calculators, simulators)
// type: data — the UI is delivered by a Preact/Svelte island identified by `component`
// path: src/content/tools/<tool-id>.yaml
// ---------------------------------------------------------------------------

const tools = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    // Island component identifier resolved at render time (e.g. "ElasticityCalculator").
    component: z.string(),
    subject: reference('subjects').optional(),
    tags: z.array(z.string()).default([]),
    status: statusSchema,
  }),
});

// ---------------------------------------------------------------------------
// articles  — original essays and public knowledge resources
// type: content — MDX body; less structured than lessons
// path: src/content/articles/<article-slug>.mdx
// ---------------------------------------------------------------------------

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    author: z.string(),
    // Optional until the article is published.
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    status: statusSchema,
    sources: z.array(sourceSchema).default([]),
  }),
});

// ---------------------------------------------------------------------------
// Export — Astro reads this to build the content layer.
// ---------------------------------------------------------------------------

export const collections = {
  subjects,
  tracks,
  lessons,
  concepts,
  tools,
  articles,
};
