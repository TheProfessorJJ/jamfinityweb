# Project Vision

> Single source of truth for *why* Jamfinity exists and *what* it must become.
> If a decision elsewhere in `/docs` contradicts this document, this document wins until it is explicitly amended.

## What Jamfinity Is

Jamfinity is a **premium, interactive educational platform** that transforms complex academic material into beautiful, highly visual, searchable, and interconnected learning experiences.

It is **not**:
- a blog
- a documentation site
- a traditional LMS
- a university course website
- a WordPress-style theme

It **is**:
- a long-lived knowledge product
- a system for turning raw source material (lecture slides, notes, textbook chapters, PDFs) into polished lessons
- a public knowledge resource that will grow into a business

## The Founder

The author is pursuing an MSc in Economics. Jamfinity begins as the durable, beautiful record of everything learned during that degree, then expands well beyond it.

## Subject Expansion Path

The platform is built subject-agnostic from day one. Planned domains, roughly in order:

1. Economics (initial focus — micro, macro, game theory, etc.)
2. Mathematics
3. Statistics
4. Econometrics
5. Finance / CFA
6. Programming
7. Artificial Intelligence
8. Research methods
9. Interactive educational tools
10. Original articles & essays
11. Public knowledge resources

The architecture must never assume "Economics only." Subjects are data, not code.

## Core Experience Goals

- **Beautiful** — typography-led, minimal, compact, premium. Reference points: Linear, Apple, Stripe, Raycast, Vercel, Notion.
- **Interactive** — embedded calculators, plots, quizzes, and visualizations, not static prose.
- **Searchable** — instant client-side search across all content.
- **Interconnected** — lessons link by prerequisite and concept, forming a knowledge graph, not a flat list.
- **Fast** — pages paint instantly; JavaScript is the exception, not the rule.
- **Accessible** — WCAG-conscious from the start.

## Operating Model

Every week the founder uploads source material. Claude Code (Lead Engineer chat, Sonnet) transforms it into lessons that conform to the content schema and publishes them automatically via the pipeline. Human review gates publication, but the heavy lifting is automated.

## Business Intent

Jamfinity is intended to become a business. Monetization is **not** built now, but **no architectural decision may preclude it**. Likely future paths: gated premium tracks, paid interactive tools, sponsorships, and original long-form content. See `seo-strategy.md` and `roadmap.md`.

## Time Horizon

Assume Jamfinity is actively developed five-plus years from now. Optimize every decision for: maintainability, scalability, GitHub Pages compatibility, SEO, UI/UX, AI-assisted content creation, future monetization, and long-term growth. Prefer incremental improvement over rewrites. Avoid technical debt. **We build systems, not pages.**

## Non-Goals (for now)

- Real-time collaboration
- User accounts / personal progress sync across devices (local-first only initially)
- A maintained backend or database
- Native mobile apps
