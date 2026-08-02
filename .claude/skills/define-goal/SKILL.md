---
name: define-goal
description: "Use when the developer says '/define-goal', 'define a goal', 'write a goal file', 'set up an autonomous goal', or 'make a goal for /goal to run' - interactively interrogates the developer round by round until the objective is 100 percent unambiguous (never writing early), then writes a stop-proof {topic}-goal.md (checkable stop condition, fully enumerated work-list with terminal statuses, guardrails, resume protocol) into .claude/checklist/{topic}/ that the built-in /goal command runs autonomously in a fresh Fable instance."
model: opus
---

# define-goal - Author a stop-proof goal for autonomous `/goal` runs

Turn a fuzzy intention into a **stop-proof `{topic}-goal.md`** - a spec so tight that a fresh
instance running the built-in **`/goal`** command works through it to genuine completion and
**cannot be talked into finishing early**.

This skill is the **authoring half** of a two-part workflow:

1. **`/define-goal`** (this skill, interactive) -> interrogates you until the goal is airtight, then
   writes `{topic}-goal.md`.
2. **`/goal`** (built-in Claude Code command, autonomous - usually a fresh **Fable** instance) ->
   _"set a completion condition and keep working across turns until it's met."_ It **re-reads the
   goal file on every Stop-evaluation**, so the file's own text is what decides whether it may stop.

The whole point is the file. A vague file lets the agent quit with work undone (see the failure
story in "The stop-proof law"). This skill exists so every goal is stop-proof **by construction**.

## Trigger

- `/define-goal` or `/define-goal {topic}`
- "define a goal" - "write a goal file" - "set up an autonomous goal"
- "make a goal for /goal to run" - "I want to run something overnight"

## What you produce

One file: `.claude/checklist/{topic}/{topic}-goal.md`, built from the exact template in
[`references/goal-template.md`](references/goal-template.md). Then you print the `/goal` invocation
that runs it. You do **not** run the goal yourself - that happens in a separate instance.

## The golden rule

**Do NOT write the file until the developer has EXPLICITLY confirmed the assembled spec is 100%
correct and complete.** The interrogation loop is the whole value - a goal written from half-formed
answers is a goal that fails at 3am. Keep asking. Only "confirmed" / "100%" / "that's it" / "ship
it" ends the questionnaire.

This skill does **not** use plan mode - the confirm-until-100% conversation _is_ the review gate.

## Procedure

### A. Kickoff (one screen)

Ask the developer for the one-line goal, then classify - use `AskUserQuestion` for the choices:

- **Goal type** - unattended sweep - audit - migration/refactor sweep - bugfix batch - research -
  deployment - other. (Picks the question bank in `references/interrogation-guide.md`.)
- **Attended or unattended?** Unattended (overnight, nobody answers questions) demands stricter
  guardrails and gate-overrides; attended can defer some decisions to you live.
- **Which instance runs it?** Usually a fresh Fable instance via `/goal`. Note the model so the goal
  file's effort/verbosity expectations match.

### B. Interrogate - extract the stop-proof essentials

Work the themes below one at a time (`AskUserQuestion` for discrete choices, free-form for
specifics). Do not batch them into one wall of questions - one theme per round, react to each
answer, drill in where an answer is vague. The per-type probes and the answer->section map live in
[`references/interrogation-guide.md`](references/interrogation-guide.md).

1. **Mission & success** - the single objective in 1-2 sentences; what "success" concretely
   delivers. If you can't state success as something checkable, keep asking.
2. **Work list & discovery** - is the work a **known enumerable list**, or must the agent
   **discover it via a sweep first**? What is one unit of work? Rough count? (This becomes the
   per-row status table, or a "Goal-0 discovery sweep" that populates it.)
3. **Definition of Done** - for ONE item, what proves it done (the per-item DoD checklist)? What are
   the allowed **terminal statuses** (e.g. `DONE` / `GAP` / `BLOCKED`)? What is the single global
   **STOP CONDITION**?
4. **Guardrails & locked decisions** - may it `git commit` / `push` / stage? May it open a PR /
   comment on GitHub, or touch any external service? Any destructive ops? What decisions are
   **locked** (do-not-relitigate)? Any **environment bootstrap** (`npm ci`, the dev server on
   :8114, a sanity gate like `just test`)?
5. **Real-blocker definition** - what counts as a _genuine_ blocker (a code fact: a 404 route, a
   missing component export, a hard infra failure it can't fix) versus a banned excuse ("it's late",
   "complex", "needs a focused session")? Code-ground it.
6. **Resources** - reference files/paths, skills to follow (`/skill-name`), and where work artifacts
   - reports go.

### C. Reflect & confirm loop (the questionnaire that doesn't stop early)

Echo the **entire** assembled spec back as a structured summary (every template section, filled).
Then ask, verbatim intent:

> "Here's the complete goal as I understand it. Is this **100% correct and complete**? Point at
> anything ambiguous, missing, wrong, or under-specified - or say 'confirmed' and I'll write it."

If the developer corrects anything -> revise -> **re-present the whole thing** -> ask again. Loop
until an explicit confirmation. Never shortcut this because the goal "seems clear enough".

### D. Write & hand off

1. Confirm (or accept an override of) the path: default `.claude/checklist/{topic}/{topic}-goal.md`.
   `{topic}` is a short kebab-case slug of the mission - not "goal", not this skill's name.
2. Write the file from `references/goal-template.md`, filling **every** section (omit a section only
   when it truly doesn't apply, and say so in one line rather than leaving it blank). Save as
   **UTF-8 without a BOM**.
3. Print the handoff block - terse, one-liners (no narration paragraphs):

   ```text
   Wrote .claude/checklist/{topic}/{topic}-goal.md
   Run it in a fresh instance (Fable):
     /goal Work through @.claude/checklist/{topic}/{topic}-goal.md until the STOP CONDITION at the
     top is met. Follow every rule in it; update statuses + Run Log after each item.
   ```

## The stop-proof law (why the template is shaped the way it is)

Five pillars, distilled from a real overnight failure and its fix:

1. **An explicit, checkable STOP CONDITION.** One bold line the `/goal` evaluator can test by
   re-reading the file - "NOT complete until EVERY row has a TERMINAL status."
2. **A fully enumerated work-list with per-row statuses.** Unknown-size work gets a **Goal-0
   discovery sweep** that enumerates the list _before_ execution, plus a copy-paste Task Template.
3. **Ban "deferred" / summary-while-`TODO`.** "deferred" / "next session" / "focused session" /
   "later" are **banned as a status**, and no completion-flavoured summary may be written while any
   row is still non-terminal - a premature summary is exactly what reads as _done_.
4. **A code-grounded "real blocker".** A blocker counts only if it's a fact in the code or a hard
   infra failure - never a feeling. Everything else is worked, not skipped.
5. **A resume protocol.** Statuses/checkboxes in the file are the single source of truth (not the
   agent's memory); on every restart or context compaction, re-read the file and continue from the
   first non-terminal row; set `IN-PROGRESS` the moment an item starts.

> **The failure this prevents (13-6-2026).** An overnight `/goal` run _stopped with ~55 work rows
> still `TODO`_ - because it wrote a "Night Summary" and tagged the rest "deferred to focused
> sessions", which the `/goal` evaluator read as **complete**. The cure became these five pillars.
> Every goal this skill writes bakes them in so the same failure cannot recur.

## Anti-patterns (do not ship a goal that does any of these)

- Writing the file **before** an explicit 100% confirmation.
- A STOP CONDITION that isn't checkable ("do a good job", "finish the work") - the evaluator can't
  test it, so the agent self-certifies done.
- A work-list with **no per-row statuses**, or unknown-size work with **no discovery sweep** to
  enumerate it.
- Allowing "deferred" / "next session" as a status, or permitting a summary while rows are open.
- A blocker defined by vibes instead of a code fact.
- No resume protocol -> a compaction mid-run silently loses the place and the agent re-guesses.
- Naming the file `goal.md` or `{skill}-goal.md` instead of a topic slug.

## References

- [`references/goal-template.md`](references/goal-template.md) - the exact output shape (fill every
  section) + field guidance + a worked example + the handoff block.
- [`references/interrogation-guide.md`](references/interrogation-guide.md) - per-goal-type question
  banks, the confirm-loop wording, and the answer->template-section map.

## Evolution Log

- Ported from the vue-inventory-ui pilot for career-buddy - same interrogation ->
  confirm-until-100% -> stop-proof `{topic}-goal.md` flow and the five stop-proof pillars;
  examples and environment bootstrap adapted to this repo (Nuxt 3 + Vue 3 + TypeScript,
  port 8114, Vitest suite as the sanity gate, no coverage gate, no deploy).
