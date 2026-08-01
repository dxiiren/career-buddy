# Interrogation guide - question banks, the confirm loop, and the answer->section map

The `define-goal` procedure is a guided interrogation. This file supplies the probes for each goal
type, the exact confirm-loop wording, and how each answer lands in the goal file.

## Contents

- [How to run the interrogation](#how-to-run-the-interrogation)
- [Universal probes (every goal)](#universal-probes-every-goal)
- [Per-goal-type question banks](#per-goal-type-question-banks)
- [The confirm loop (verbatim)](#the-confirm-loop-verbatim)
- [Answer -> template-section map](#answer---template-section-map)

## How to run the interrogation

- **One theme per round.** React to each answer before moving on. If an answer is vague ("make it
  fast", "handle the pages"), drill in until it's checkable ("LCP < 2.5s in Lighthouse", "these 3
  named components").
- **Use `AskUserQuestion` for discrete choices** (goal type, attended/unattended, commit-or-not,
  known-list vs sweep) and free-form for specifics (paths, counts, DoD checks).
- **Never assume the safe answer silently** - for an unattended run, if the developer didn't say
  "may commit", _ask_; don't just forbid it without confirming.
- **Detect hidden ambiguity.** The two most common gaps: (1) an uncheckable success criterion, and
  (2) an unknown-size work-list with no discovery plan. If either is present, you are not done.

## Universal probes (every goal)

Ask these regardless of type:

1. State the goal in one line. What does "done" concretely deliver?
2. Is the work a **known finite list**, or must it be **discovered first**? If discovered - by what
   (grep / glob / route scan)? Roughly how many items?
3. What proves **one** item is done? (Push for an evidence artifact - a pasted `just test` line,
   a typecheck exit code, a screenshot path - not just a feeling.)
4. Attended or unattended? If unattended - nobody answers questions mid-run; every decision must be
   pre-answered in the file.
5. May it `git commit` / `push` / stage? May it open a GitHub PR/issue, or touch any external
   service? Any destructive ops or off-limits paths?
6. What is a **real** blocker for this goal (a code fact), versus something it must push through?
7. What must it read/follow - reference files, `/skill-name` playbooks - and where do artifacts +
   reports go?
8. Any decisions already locked that it must **not** reopen?

## Per-goal-type question banks

Add these on top of the universal probes.

### Unattended sweep (overnight)

- What's the environment bootstrap, and how is each step verified up / recovered if down?
- What's the per-item timebox before it annotates and moves on (so one item can't eat the night)?
- Which interactive gates get pre-answered to an override (e.g. "auto-approve triage", "never open a
  PR overnight", "pick the next row, never your own order")?
- Where does it write progress so a compaction mid-night doesn't lose the place?

### Audit / review

- Read-only, or may it fix what it finds? If fix - same guardrails as a change goal.
- What's the scoring/verdict rubric, and where does the report go?
- Is the target list the whole codebase (-> discovery sweep) or a named set?

### Migration / refactor sweep

- What's the before->after transformation, stated concretely enough to apply uniformly (e.g.
  Options API -> `<script setup>`, or a Tailwind class rename)?
- Isolation: do items touch shared files (-> serialize) or disjoint ones (-> can parallelize)?
- What's the per-item verification (`npx nuxt typecheck` / `just test` / grep / a manual check
  on :8114) that proves the change is safe?

### Bugfix batch

- Is each bug independently reproducible? What's the repro + the fix-verified check per bug?
- Root-cause required, or is a scoped workaround acceptable (and logged as such)?

### Research

- What question must be answered, and what makes an answer _trustworthy_ (sources, cross-checks)?
- What's the deliverable shape (a cited report? a decision + rationale?) and where does it land?

### Deployment / infra

- This repo runs locally only (no CI/CD, no deploy target) - a "deployment" goal here usually
  means the local stack: `just build` green and `just preview` serving the Nitro build on
  :8114. State the health-verify that proves success.
- What's the rollback / stop-loss if a step fails? (Outward-facing -> usually attended, not `/goal`.)

## The confirm loop (verbatim)

After assembling the full spec, present it back in full (every template section, filled), then ask:

> "Here's the complete goal as I understand it. Is this **100% correct and complete**? Point at
> anything ambiguous, missing, wrong, or under-specified - or say 'confirmed' and I'll write it."

- Any correction -> revise -> **re-present the whole spec** -> ask again.
- Only an explicit "confirmed" / "100%" / "that's it" / "ship it" ends the loop and unlocks writing.
- Never shortcut with "this seems clear enough" - the loop existing is what makes the goal reliable.

## Answer -> template-section map

| Interrogation answer                                   | Lands in `{topic}-goal.md` section                                                              |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| One-line goal + what success delivers                  | **Mission**                                                                                     |
| Allowed terminal statuses + the global done bar        | **STOP CONDITION** + **Definition of Done** (global)                                            |
| Known list vs discover-first + count + how to discover | **Work List** (Form 1 table, or Form 2 Goal-0 sweep)                                            |
| What proves one item done + evidence artifact          | **Definition of Done** (per-item checklist)                                                     |
| commit/push/PR/destructive answers                     | **Hard prohibitions / guardrails**                                                              |
| Decisions already made, not to reopen                  | **Locked decisions**                                                                            |
| Deps / dev server / sanity-gate to bring up            | **Environment bootstrap**                                                                       |
| Real-blocker (code fact) vs banned excuse              | **What counts as a REAL blocker**                                                               |
| Reference files / skills / output paths                | woven into **Mission**, **Environment bootstrap**, **guardrails**, and per-item DoD as relevant |
| Where progress is tracked                              | **Resume protocol** + **Run Log**                                                               |
