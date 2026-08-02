---
name: claude-transfer
description: "Use when the developer says '/claude-transfer', 'close this session', 'hand off to a new session', 'continue this later', or 'pause work cleanly' - writes a lean, pointer-based handoff brief (.md) to git-ignored .claude/workspace/reports/transfers/claude/ that a fresh Claude session on this repo can resume from, without poisoning unrelated sessions (never touches auto-loaded memory)."
model: sonnet
---

# claude-transfer - Poison-Free Session Handoff

Close the current session and resume the **same work** later - in a new session or another
Claude Code instance **on this repo** - without dragging stale or irrelevant context into
that next session. This skill writes a **lean, pointer-based brief** to a git-ignored folder
that is read **only when you explicitly resume**, never auto-loaded.

Why lean: model recall degrades as the context window fills ("context rot"), so a handoff
must carry the _smallest set of high-signal tokens_, not a transcript - see Design basis below.

## Why this is NOT llm-transfer (or project memory)

The reader is a **fresh Claude on this same repo** - it has the files, the tools, CLAUDE.md,
and the skills. So the brief must be the **opposite** of a context dump.

|         | `.claude/memory/`   | `llm-transfer` (external) | **claude-transfer**              |
| ------- | ------------------- | ------------------------- | -------------------------------- |
| Loaded  | auto, every session | human copy-pastes         | **only on explicit resume**      |
| Reader  | any future session  | external LLM (no repo)    | **fresh Claude on this repo**    |
| Content | durable facts       | payloads - embed all      | **pointers - link, don't paste** |
| Secrets | n/a                 | verbatim (local file)     | **fine, stays local**            |

Claude Code auto-injects `CLAUDE.md` and the `.claude/memory/MEMORY.md` index at the start of
**every** session. Those always-loaded files are the "information poisoning" vector. The official
guidance is explicit: _task-specific/handoff instructions belong in a **skill** that loads only
when invoked, not in always-on memory_ - which is exactly what this is. **claude-transfer never
writes to any auto-loaded path.**

## Trigger

```text
/claude-transfer                 # close: write a brief for the current work
/claude-transfer close {topic}   # close: brief scoped to {topic}
/claude-transfer resume          # resume: read the latest brief and continue
/claude-transfer resume {file}   # resume: read a specific brief
close this session / continue this later / pause work cleanly
```

## Mode A - CLOSE (write the brief)

1. **Enter plan mode.** Call `EnterPlanMode`. The brief is drafted and reviewed before a
   single byte is written - this is where you strip anything poisonous.

2. **Scope.** Use the `{topic}` argument if given; otherwise the current task.

3. **Gather durable state only.** Pull what will _still be true_ when you resume - mission,
   what's done/in-progress/next, the files touched (as `path:line`), the branch/PR, **recent
   commit hashes**, evidence-tagged facts, open questions, dead-ends, and freshness-sensitive
   state. **Link, don't paste** - the next session re-reads files itself (a fresh session
   begins with no memory of this one; durable continuity lives in the brief + git, not in
   carried context).

4. **Assemble** using the brief template below. Keep it to ~one page.

5. **Review in plan mode**, then on approval (create the folder if missing):
   - Write `.claude/workspace/reports/transfers/claude/{YYYY-MM-DD}-{topic}.md`, where
     `{topic}` names **what the session did** (e.g. `add-upload-progress-bar`), **not** this
     skill's name.
   - Update `.claude/workspace/reports/transfers/claude/latest.md` to point at the new brief
     (filename + one-line mission).
   - Confirm the saved path, then `ExitPlanMode`.

## Mode B - RESUME (pick up the brief)

1. Read `.claude/workspace/reports/transfers/claude/latest.md` (or the named file) to find
   the active brief.
2. Read the brief, then **read every pointed-to file fresh** - the repo is the source of
   truth, not the brief's summary of it.
3. **Re-ground before acting** (do NOT start new work first): read the brief's pointers + the
   recent `git log`, then run a **basic functional check** (e.g. `just test`, or `just start`
   and load http://localhost:8114) to catch drift or undocumented breakage. Building a new
   feature on a silently-broken state makes it worse. Report any drift you find.
4. Give a short "here's where we are + the next concrete step", then continue. Leave the brief
   in place (you refresh or delete it yourself).

## The brief template

Fill only what applies; keep it lean. Every fact carries its source or is flagged.

```markdown
# HANDOFF - {one-line title}

Topic: {topic} Branch: {branch} Saved: {YYYY-MM-DD HH:MM}
Status: {IN PROGRESS | BLOCKED | READY TO COMMIT/MERGE}
Mission: {the goal that survives this handoff, one sentence}

> SCOPE GUARD: This brief is the ONLY carryover. The repo is the source of truth -
> re-verify anything time-sensitive below before acting. Ignore ambient/unrelated
> context from the loaded session.

## State

- DONE: {item} - evidence: `path:line` / test output / command
- IN PROGRESS: {item} - where it stands
- NEXT: {item}

## Pointers (open these - do not rely on memory)

- Files: `pages/interview/simulation.vue:40-120`, `composables/useInterview.ts`
- Recent commits: `<hash> <subject>` (run `git log --oneline -5`)
- Branch: {branch} PR: #{id}
- Commands: `just start`, `just test`, `just build`

## Sources read (what this brief is based on)

- `path/a`, `path/b`, `<command output>` - so the next session can re-open them

## Verified facts

- {fact} - source: `path:line` / command output
- {claim} - [assumption] / [unverified] {say so plainly}

## Open questions / decisions pending

- {unresolved question}

## Dead-ends (do NOT retry)

- Tried {X} -> failed because {Y}

## Freshness-sensitive (re-verify on resume)

- Dev server on :8114 was {up/down} at close - re-check
- Vitest suite was {green/red} at close (`just test`) - re-check before building on it
- Uncommitted changes: {yes/no} - `git status`

## First action on resume

{the single next concrete step}
```

## Anti-poison rules (the craft)

- **Pointers over payloads.** The reader has the repo - link (`path:line`), don't paste.
  Inline only a _tiny_ high-value excerpt when re-reading is genuinely expensive (a hybrid;
  "never paste anything" is too absolute).
- **Durable over ephemeral.** Only what's still true when resumed. Drop chatter, false starts,
  and tangents - they mislead a cold reader (context rot).
- **One task per brief / new session per task.** Don't fold two unrelated tasks into one
  handoff; a resumed session should own a single scope.
- **Evidence-tagged or flagged.** Every fact carries a source, or is explicitly marked
  `[assumption]` / `[unverified]`. Never launder a guess as a fact.
- **Buckets + status, no blur.** DONE, IN PROGRESS, NEXT stay separate; the Status flag states
  completion state at a glance.
- **Freshness flags + re-verify.** Stale-prone facts are marked and re-checked on resume
  before any action is taken on them.
- **Minimal surface.** Aim for one page. Less content = less poison.
- **Never write to an auto-loaded file.** Not CLAUDE.md, not `.claude/memory/`, not any
  path loaded at session start. The brief is opt-in only.
- **Prune, don't accumulate.** Stale or contradictory notes actively mislead (when two
  statements conflict, the model may pick one arbitrarily). `latest.md` points at the current
  brief; refresh or delete old ones.

## Storage

- Location: `.claude/workspace/reports/transfers/claude/` - **git-ignored** via the existing
  `.claude/workspace/` rule (local, never committed). Create the folder if missing.
- One `.md` per handoff: `{YYYY-MM-DD}-{topic}.md` (topic = the session's work). `latest.md`
  points at the newest, so `resume` with no argument picks it.
- Separate from `llm-transfer` (ChatGPT/Ollama/Gemini), which writes to the sibling
  `transfers/{gpt,ollama,...}/` - so it's obvious which output is a Claude handoff vs. an
  external-LLM master prompt.

## Design basis (researched 2026-07-01)

Grounded in primary sources, adversarially fact-checked (deep-research run):

- Smallest high-signal token set; pointers/references over pasted content -
  [Anthropic: Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents).
- "Context rot" - recall degrades as context grows, so keep briefs lean and start a new
  session per task - same source + [Claude Code session management](https://claude.com/blog/using-claude-code-session-management-and-1m-context).
- Continuity in durable external artifacts (progress file + git commits + task list), not
  carried context; compaction alone is insufficient -
  [Anthropic: harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents).
- On resume, re-ground first: read notes + git log, run a basic functional check - same
  harnesses source.
- Keep handoffs OUT of always-loaded memory; use a skill; prune stale/conflicting notes -
  [Claude Code memory docs](https://docs.anthropic.com/en/docs/claude-code/memory).

## Evolution Log

- Ported from the upload-product-vue pilot for career-buddy: pointer-based, read only on
  explicit resume, never auto-loaded; SCOPE GUARD + freshness re-verify. Commands + freshness
  checks adapted to this repo (just recipes, port 8114, the Vitest suite as the drift check).
