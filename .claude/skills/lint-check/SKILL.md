---
name: lint-check
description: Use when the developer says 'lint check', 'run lint', 'check lint', 'run the quality suite', or 'lint everything' — runs the quality layers for this repo (TypeScript typecheck via `npx nuxt typecheck`, Vitest via `just test`) and reports pass/fail per layer. There is no ESLint/Prettier in this repo.
model: sonnet
---

# lint-check — Quality suite (Typecheck · Vitest)

Run the quality layers this repo has and report pass/fail per layer. This is a
TypeScript Nuxt 3 repo with **no ESLint and no Prettier** (no `lint`/`format` npm
scripts exist — do not invent them). The layers are the TypeScript typecheck and the
Vitest suite; there is no CI, so these checks are the whole gate.

## Trigger

When the developer says any of: "lint check", "run lint", "check lint",
"run the quality suite", "lint everything".

---

## What to Do

Run each layer and record its result. Run them independently so one failure doesn't
hide the others.

### 1 — Typecheck (vue-tsc via Nuxt)

There is no `typecheck` npm script — run the Nuxt CLI directly:

```bash
npx nuxt typecheck
```

Pass = exit 0, no `error TS` lines. The first run is slow (Nuxt prepares `.nuxt/`
types and may fetch `vue-tsc`) — that's expected. If types look stale
(`Cannot find module '#app'`-style errors), regenerate with `npx nuxt prepare` and
re-run. For fixing reported errors, follow `/fix-typecheck`.

### 2 — Vitest (unit + functional)

```bash
just test            # vitest --run: tests/unit + tests/functional, single pass
```

Pass = exit 0, `N passed` summary, 0 failed. Never leave bare `npm run test`
running — it starts Vitest in watch mode and hangs the terminal; always use
`just test` (which forces `--run`) or `npm run test:unit` / `npm run test:functional`.

---

## Reporting back

Report a per-layer table, then an overall verdict:

```
LAYER      TOOL                    STATUS
typecheck  npx nuxt typecheck      PASS | FAIL (N errors)
tests      just test (vitest)      PASS | FAIL (N failed / N passed)
OVERALL: PASS | FAIL
```

- **typecheck** failures need real fixes at the root cause — never `// @ts-ignore`,
  `as any`, or watering a type down to force green (see `/fix-typecheck`).
- **tests** — never weaken an assertion to make a spec pass; fix the source, or raise
  it with the developer if the spec itself encodes the wrong behavior.

---

## Notes

- Run from the **repo root** — `tsconfig.json` extends the generated
  `.nuxt/tsconfig.json`, so `just install` (which runs `nuxt prepare` via postinstall)
  must have run at least once.
- **Known baseline (2026-08-01):** the typecheck layer currently FAILS with 26
  pre-existing errors (landing sections, `layouts/dashboard.vue` `user.email`,
  `nuxt.config.ts` `routeRules.robots`, several test fixture shapes) — see
  `.docs/06-troubleshooting/common-issues.md`. Report against that baseline: new
  errors are regressions; don't claim the layer green until the baseline is cleared.
- Playwright e2e (`npm run test:e2e`) is NOT part of this quality sweep — it boots its
  own dev server and needs browsers installed (`npx playwright install`); run it only
  when e2e coverage is the point (see `/generate-playwright-tests`).
- There are no pre-commit hooks in this repo — nothing runs these automatically. Run
  this skill before `/commit` on any non-trivial change.
