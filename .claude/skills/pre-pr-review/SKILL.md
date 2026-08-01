---
name: pre-pr-review
description: Use when the developer says 'pre-pr review', 'review my branch', 'audit my work', or 'self review' — self-reviews the current branch's diff against a Nuxt 3 / Vue 3 / Tailwind / accessibility checklist before opening a PR, then saves a report to .claude/workspace/reports/pr/.
model: opus
---

# Pre-PR Review (Self-Audit)

Self-review your feature-branch diff **before** opening a PR. This is a single-stack
(Nuxt 3 / Vue 3 / TypeScript / Tailwind v3 + shadcn-vue) frontend prototype — all data is
mock data inside composables; there is no backend or API code in this repo. The goal is to
catch reactivity, a11y, SEO, and test-coverage problems early, not to nitpick style.

## Trigger

- `"pre-pr review"` / `"self review"`
- `"review my branch"` / `"review my work"` / `"review my code"`
- `"audit my work"` / `"audit my branch"`

## Do NOT flag (owned by other tools — see CLAUDE.md)

- **Type errors** — `/lint-check` runs `npx nuxt typecheck`; `/fix-typecheck` fixes them.
- Pre-existing patterns the developer copied from the codebase — not this branch's problem.

> Note: this repo has NO pre-commit hooks and NO CI — nothing runs the quality layers
> automatically, so start by running `/lint-check` and treat its failures as blocking issues.

## Step 1 — Branch & base

```bash
git branch --show-current
```

If on `main`: **STOP** — "You're on `main`; switch to your feature branch first."

```bash
git fetch origin main
git diff origin/main...HEAD --name-only
```

If no files changed: **STOP** — "No changes vs `main`."

Scope the review to reviewable source: `**/*.vue` (pages, layouts, components),
`**/*.ts` (composables, `lib/`, `tests/`), `assets/css/**`, `nuxt.config.ts`,
`tailwind.config.ts`, `vitest.config.ts`, `playwright.config.ts`. **Exclude**
`package-lock.json`, `patches/` and `.claude/`. If only excluded files changed:
**STOP** — "No reviewable source changed."

Report: "Branch `{name}` changed {N} source files ({vue} .vue, {ts} .ts). Running FE review."

## Step 2 — Fetch the diff

```bash
git diff origin/main...HEAD -- '*.vue' '*.ts' '*.css'
```

For context-dependent checks (composable cleanup, page/layout wiring, SEO meta), read the
**full file**, not just the hunk. If the diff exceeds ~4000 lines, prioritise the
highest-change files and note "focused review on largest files".

## Step 3 — Run the checklist

Verify each finding against the actual code before reporting it (grep how existing components
do the same thing; don't invent a rule the codebase doesn't follow).

| #   | Check                      | Label      | What to look for                                                                                                                                                                                                                                              |
| --- | -------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Accessibility**          | issue      | Interactive `<div>`/`<span>` with `@click` instead of `<button>`/`NuxtLink`; icon-only buttons (lucide icons) without `aria-label`; `<img>` without meaningful `alt`; inputs without an associated label; heading order (no jumps); e2e a11y spec (`tests/e2e/accessibility.spec.ts`) sets the bar. |
| 2   | **Semantic HTML**          | issue      | Landmarks (`<main>`, `<header>`, `<nav>`, `<footer>` — the layouts set the pattern); one `<h1>` per page; lists as `<ul>/<ol>`; internal navigation uses `NuxtLink`, not `<a href>`.                                                                            |
| 3   | **Reactivity**             | issue      | Destructuring `props` or a `reactive()` object (loses reactivity — use `toRef`/`toRefs` or keep `props.x`); mutating a prop; `ref` read/written without `.value` in `<script>`; `computed` vs method chosen wrong; state that belongs in the page's composable (`composables/useX.ts`) created ad-hoc in a component. |
| 4   | **`v-for` keys**           | issue      | Missing `:key`, `:key="index"` on a list that reorders/filters, or `v-if` on the same element as `v-for`.                                                                                                                                                      |
| 5   | **Composable correctness** | issue      | Missing cleanup (`onUnmounted` / `onScopeDispose`) for listeners, intervals, observers (`useScrollAnimation` sets the IntersectionObserver pattern); SSR safety — no bare `window`/`document`/`localStorage` outside `onMounted`/`import.meta.client` guards (this app server-renders); composables returning raw values where callers expect refs. |
| 6   | **SEO & routing**          | issue      | New public pages call `useSeo`/`useSeoMeta` with title + description; private/app pages added under an excluded prefix or wired into `nuxt.config.ts` `sitemap.exclude` + `routeRules` (noindex) like the existing dashboard/chat routes; correct layout chosen (`default` for public, `dashboard` for app screens). |
| 7   | **Forms / validation**     | issue      | Required-field validation before "submit" with visible error states; success feedback via the existing toast pattern; forms are mock-only (no real network calls introduced — this is a prototype).                                                             |
| 8   | **Security**               | issue      | No `v-html` with untrusted content (XSS); no hardcoded credentials/tokens (the auth flow is mock — keep it obviously mock); nothing secret in committed config.                                                                                                 |
| 9   | **No debug leftovers**     | issue      | `console.log` / `console.debug` / `debugger` / commented-out dead blocks / `TODO` without a follow-up.                                                                                                                                                         |
| 10  | **Tests**                  | suggestion | The suite mirrors source: composables get `tests/unit/useX.test.ts`, components/pages get `tests/functional/*.test.ts` — new logic-bearing code without a matching spec grows the untested surface; changed behavior needs the existing spec updated, not deleted. |
| 11  | **Component design**       | suggestion | TS `defineProps`/`defineEmits` typed for every prop/event used; oversized page sections worth splitting into the module's component folder (`components/{module}/`); reusable primitives belong in `components/ui/` (shadcn-vue), module widgets in their module folder. |
| 12  | **Tailwind hygiene**       | nitpick    | Conflicting/duplicate utilities on one element; arbitrary values (`w-[137px]`) where a scale token exists; raw colors instead of the theme tokens (`bg-card`, `text-muted-foreground`, `border-border`); class merges via `cn()` (`lib/utils.ts`), not string concat; dark-mode variants kept in sync with the theme toggle. |

## Step 4 — Quality gate

Run `/lint-check` (`npx nuxt typecheck` + `just test`). Any failure is a blocking **issue**.

## Step 5 — Finding labels & caps

- **issue** (blocking) — fix before opening the PR.
- **suggestion** (non-blocking) — recommended.
- **nitpick** (non-blocking) — minor/optional.

Every finding must carry: the label, the `file:line`, and **WHY** it matters (not just what).
Issues: uncapped. Suggestions + nitpicks: cap at 15 total; note "{X} more non-blocking findings
omitted" if over.

## Step 6 — Present

```
## Pre-PR Review: {branch}
Branch: {branch} -> main   |   Files: {N} ({vue} .vue, {ts} .ts)
Quality gate: {typecheck/tests pass/fail}

### Issues (fix before PR)
1. [path:line] Finding — why it matters

### Suggestions
2. [path:line] Finding

### Nitpicks
3. [path:line] Finding

---
{Total} findings: {issues} issues, {suggestions} suggestions, {nitpicks} nitpicks
```

Zero findings → "No issues found — branch looks clean. Ready to open the PR."

## Step 7 — Save the report

Path: `.claude/workspace/reports/pr/{branch}-{YYYY-MM-DD}.md` (replace `/` in the branch name
with `-`; overwrite on a same-day re-run; create the folder if missing — it is git-ignored).
Frontmatter then the same body as the terminal output:

```yaml
---
branch: { branch }
base: main
date: { YYYY-MM-DD }
files_changed: { N }
issues: { count }
suggestions: { count }
nitpicks: { count }
---
```

Confirm: "Report saved to `{path}`".

## Tone

Self-improvement, not a verdict from a lead. "Consider extracting…", not "You must fix…". Never
directive, never judgmental.
