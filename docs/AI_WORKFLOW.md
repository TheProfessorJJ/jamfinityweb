# AI Workflow — Context and Continuity Rules

> These rules govern how Claude sessions are structured across this project. They exist because chat history is ephemeral, context windows are finite, and the repository is the only durable source of truth.

## Core Principle

**The repository is the source of truth. Chat history is not.**

State, decisions, and open questions live in `/docs`. Chat is a scratchpad. When the two conflict, trust the files.

## Before Each Milestone

1. Read `docs/project-state.md` to know where things stand.
2. Read the specific docs relevant to the milestone — no more. Do not load the entire `/docs` tree speculatively.
3. Do not ask the user to paste docs into chat. Read them directly with file tools.
4. Infer current code state from the files themselves, not from chat history.

## During a Milestone

- Keep tool call output summaries concise. Do not echo large file contents back into the conversation unless the user requests it.
- When a decision is made (or deferred), note it immediately — either in chat as a brief update or directly in `project-state.md` if it will matter beyond this session.

## After Each Milestone

Update `docs/project-state.md` with:

- The milestone just completed (one-line description).
- Files created or significantly changed.
- The next milestone.
- Any open questions or risks surfaced.

This update should happen before the milestone is reported as done.

## When Context Grows Long

If a session's context is approaching limits or becoming unwieldy:

1. Create a handoff note inside the repo at `docs/handoff-<date>.md` (or update `project-state.md` directly) covering:
   - Exact state of work in progress.
   - Any mid-milestone decisions made.
   - Unresolved questions.
2. Tell the user the handoff note exists and where it is.
3. The next session should start from `project-state.md` → relevant ADRs → relevant milestone docs — not from the previous chat summary.

## Starting a New Session

A fresh Claude session should begin by reading, in order:

1. `docs/project-state.md` — current phase, completed milestones, open questions.
2. `decisions/ADR-001-initial-architecture.md` — the locked architectural contract.
3. `docs/implementation-guide.md` — engineering constraints and build order.
4. Any milestone-specific doc referenced in `project-state.md`.

Do not ask the user to summarize what happened in prior sessions. Read the files.

## What Belongs Where

| Information | Lives in |
|---|---|
| Locked architectural decisions | `decisions/ADR-*.md` |
| Current phase, completed work, open questions | `docs/project-state.md` |
| Engineering constraints, build order | `docs/implementation-guide.md` |
| Schema contracts | `src/content/config.ts` + `docs/content-strategy.md` |
| Mid-session handoff notes | `docs/handoff-<YYYY-MM-DD>.md` |
| Chat history | Nowhere durable — do not rely on it |
