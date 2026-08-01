---
name: fix-typecheck
description: Use when `npx nuxt typecheck` (vue-tsc) fails with TypeScript errors, or when the developer says 'fix typecheck', 'fix type errors', or 'typecheck failing' — reads the reported errors, fixes the root cause in the `.vue`/`.ts` source, and re-runs until clean, pasting the clean result before claiming done.
model: sonnet
---

# fix-typecheck — Resolve Nuxt typecheck / vue-tsc errors

Fix the TypeScript errors blocking `npx nuxt typecheck` (backed by `vue-tsc`). There is
no `typecheck` npm script in this repo — always invoke the Nuxt CLI directly. Fix the
**root cause** in the source — never suppress to force green — and re-run until it
reports 0 errors.

## When to Use

- `npx nuxt typecheck` reports errors (there are no git hooks or CI in this repo — this
  check only runs when you run it).
- Developer says "fix typecheck", "fix type errors", "typecheck failing".
- After merging/rebasing a branch that introduced type errors.

## Process

### Step 1 — Capture all errors

Run the full check once to get the complete list upfront (don't fix one file and
rediscover the rest later):

```bash
npx nuxt typecheck
```

`vue-tsc` prints `path/to/File.vue(line,col): error TSxxxx: <message>`. Note every
distinct file + error code. `nuxt typecheck` prepares Nuxt types first, so the first
run is slow — that's expected.

### Step 2 — Read the source and fix the root cause

For each error, **read the actual `.vue`/`.ts` file** (and the type it references —
a prop interface, a composable's return type in `composables/`, or `lib/utils.ts`)
before editing. Verify the real shape; don't guess. Then apply the minimal
correct fix (see patterns below). If several files share one bad type, fix the type
at its definition, not at every call site.

### Step 3 — Re-run until clean

```bash
npx nuxt typecheck
```

🚨 Re-run after each batch of fixes and **paste the clean result**
(`0 errors` / no `error TS` lines) into your reply **before** you say "done",
"fixed", or "clean". Do not claim success from memory — prove it.

### Step 4 — Commit (only when asked)

Do not auto-commit. When the developer says "commit", stage only the touched files and
use a Conventional message, e.g. `fix(types): resolve vue-tsc errors in interview module`.
Never add a `Co-Authored-By` / Claude attribution footer.

## Common Error Patterns

| Error                                             | Fix                                                                                                                                        |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `Property 'X' does not exist on type 'Y'`         | Add `X` to the interface/type in `types/` or the component's `defineProps`; or cast at the boundary if the value is genuinely dynamic      |
| `'X' is possibly 'undefined' / null`              | Optional chaining `x?.y`, nullish coalescing `x ?? fallback`, or a proper guard — don't `!`-assert away a real nullable                    |
| Prop type mismatch on a component                 | Fix the `defineProps<{...}>()` type or the value passed; align with the composable's exported interface                                                 |
| `Type 'string' is not assignable to '"a" \| "b"'` | Narrow the literal at the source, or widen the target union if the value really is open                                                    |
| `Cannot find module 'X' or its type declarations` | If X is a dependency, ensure it's installed (`npm install`) and typed; if it's a local alias, fix the `~/`/`@/` path or `tsconfig` `paths` |
| `implicitly has an 'any' type`                    | Add the explicit type/annotation (event handlers, refs, function params) — Nuxt runs `strict`                                              |
| Auto-imported composable/util untyped             | Ensure it's under `composables/`/`utils/` (Nuxt auto-import) and typed; run `nuxt prepare` if `.nuxt` types are stale                      |
| Stale `.nuxt` generated types                     | `npm run postinstall` (runs `nuxt prepare`) to regenerate, then re-check                                                                   |

## Guardrails (do NOT do these)

- **Never** silence an error with `// @ts-ignore` / `// @ts-expect-error` / `as any`
  to pass — fix the underlying type. (If a third-party type is genuinely wrong, isolate
  the cast to the single boundary and comment why.)
- **Never** water down a type to `any`/`unknown` just to clear the check.
- **Minimal fixes only** — type annotations, guards, interface corrections. Don't
  refactor runtime logic to dodge a type error.
- **Pre-existing vs new** — errors in files you didn't touch still fail the full-project
  check; fix them too (or flag them clearly) rather than ignoring them.

## Notes

- `nuxt typecheck` is the full-project gate (this repo has no CI and no hooks — `/lint-check`
  runs it as part of the quality suite). Fixing per-file with `vue-tsc` directly is fine while
  iterating, but the **final green must come from `npx nuxt typecheck`**.
- Warnings are not errors; only `error TS...` lines block. Report warnings but don't
  churn on them.
