---
name: audit-skills
description: Use when the developer says 'audit skills' or '/audit-skills' — verifies every skill in .claude/skills/ has a valid SKILL.md and is registered in README.md, that CLAUDE.md references only existing skills, and that no skill hardcodes a secret; reports missing/orphaned entries and offers auto-fix.
model: sonnet
---

# audit-skills

Verifies every skill folder under `.claude/skills/` has a valid `SKILL.md`, is
registered in `.claude/skills/README.md`, that `README.md` and `CLAUDE.md`
reference only skills that exist on disk, that no `SKILL.md` pins an unsupported
model or carries a UTF-8 BOM, and that no skill file hardcodes a secret.

## Trigger

- `"audit skills"` / `"/audit-skills"`
- `"check skills"` / `"skills audit"`

---

## What to Do

**Run the committed script, then report.** It is the single source of truth for
the disk / README / CLAUDE diff and every check below.

```bash
python .claude/skills/audit-skills/audit.py
```

(If `python` is not on PATH, `uv run --no-project python ...` works — uv is installed
by `setup.ps1`.)

The script is read-only — it never edits README, CLAUDE, or any SKILL.md. Present
its output to the developer, then offer to auto-fix (see below).

> Do NOT re-derive the registration diff by hand each run. The script is committed;
> if detection is wrong, fix `audit.py` directly.

---

## What the Script Checks

Each check owns one failure mode. Any non-empty section fails the gate (exit 1).

| Section         | Meaning                                                                                                                                       |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `NO_SKILL_MD`   | A skill-looking subdir of `.claude/skills/` (not `_shared`, not a dot-dir) that lacks a `SKILL.md`.                                           |
| `FRONTMATTER`   | A `SKILL.md` whose frontmatter is missing/empty `description:`, or whose `name:` does not equal its folder name.                              |
| `BAD_MODEL`     | A `SKILL.md` whose `model:` is not one of `{sonnet, opus}` (catches a stray value, a dropped `model:` line, or a `[Nm]` context-tier suffix). |
| `SKILL_BOM`     | A `SKILL.md` saved with a UTF-8 BOM — the loader chokes on it and the description renders blank in the skill list. Checked on raw bytes.      |
| `MISSING`       | A skill present on disk but not linked in `README.md`.                                                                                        |
| `ORPHANED`      | A `README.md` link (or a CLAUDE.md backticked name that README also links) whose skill folder does not exist.                                 |
| `CRED_EXPOSURE` | A skill file hardcodes a secret (password / token / API key / connection string) instead of referencing a KEY or env var.                     |

The script prints each section then a `PASS` / `FAIL` summary line and exits
non-zero on any failure.

---

## Registration format

`audit.py` reads README rows linked as `[name](name/SKILL.md)` and CLAUDE.md
references as backticked single tokens `` `name` `` (anchored against the README
set so generic backticks like `` `npm` `` are not treated as orphans). When you
register a new skill in `README.md`, use that link format so the audit sees it.

---

## Auto-Fix (the MODEL's job, after the report)

The script reports — it never edits on its own. If the developer asks to fix:

- **NO_SKILL_MD** — the dir is either a real skill missing its `SKILL.md` (author
  one) or a stray/helper dir (rename it with a leading `_` or remove it — ask
  first).
- **FRONTMATTER** — add the missing `description:`, or correct `name:` to equal the
  folder name.
- **BAD_MODEL** — confirm the intended model with the developer, then set `model:`
  to `sonnet` or `opus`.
- **SKILL_BOM** — rewrite the file without a BOM (the `Write` tool is safe).
- **MISSING** — read the skill's `SKILL.md`, extract its title + trigger, add a
  table row in the correct `README.md` category section.
- **ORPHANED** — do NOT auto-remove; ask whether to delete the stale entry or
  recreate the skill.
- **CRED_EXPOSURE** — replace the hardcoded value: in a script read it from
  `os.environ` / `import.meta.env`; in a doc reference the KEY name or an env var —
  never the literal. The real value lives only in git-ignored config (`.mcp.json`,
  `.claude/settings.local.json`). If a value is a genuinely non-secret sanctioned
  literal, add it to `CRED_ALLOW_LITERALS` in `audit.py` — never weaken the scan
  otherwise.

Never delete skills or remove entries without asking.

---

## Maintaining the Script

The script lives at `.claude/skills/audit-skills/audit.py` and is committed. When
evolving it:

- New allowed model → add it to `ALLOWED_MODELS`.
- New credential pattern / sanctioned non-secret literal → update the `CRED_*`
  regexes / `CRED_ALLOW_LITERALS`. Keep it two-sided: re-prove clean on the current
  tree AND that it still catches a planted secret.
- README link-format change → update `readme_linked_skills()`.

---

## Anti-Patterns

- **Never** delete skills or remove entries without asking the developer.
- **Never** modify `SKILL.md` files during an audit — this is read-only.
- **Never** guess a README category for placement — ask if unclear.
- **Never** add duplicate entries — the script already reports partial state.

---

## Evolution Log

- Ported from the vue-inventory-ui pilot for career-buddy (Nuxt 3 / Vue 3 /
  TypeScript stack); `audit.py` copied verbatim — it is repo-agnostic (stdlib-only, reads
  `.claude/skills/` + `CLAUDE.md` relative to the repo root).
