# Development Workflow

> **TL;DR** Branch off `main`, code against the running dev server, mirror the existing
> test layout for anything logic-bearing, gate with `just verify` (tests + typecheck, both
> expected fully green), commit Conventional-style with no AI attribution, PR into `main`.

## Daily loop

1. **Branch** — `git checkout -b feat/<topic>` off `main`. History shows the
   `dxiiren/<topic>` naming for feature branches; either style works, just don't commit
   feature work straight to `main`.
2. **Serve** — `just start` (background) or `just dev` (foreground). The dev server hot-reloads
   pages, components, and composables.
3. **Code** — follow the module pattern (see below).
4. **Test** — add/extend specs in `tests/`, then `just test`.
5. **Commit / PR** — `/commit` and `/create-pr` skills, or by hand per the conventions below.

## Where new code goes

| You are adding... | Put it in... |
| --- | --- |
| A new public page | `pages/<name>.vue` + `useSeo({...})` call + footer/nav link if relevant |
| A new app (dashboard) page | `pages/<module>/<name>.vue` with `layout: 'dashboard'` + add the route to `sitemap.exclude` AND `routeRules` (noindex) in `nuxt.config.ts` |
| A feature widget | `components/<module>/` |
| A reusable primitive | `components/ui/` (shadcn-vue style) |
| Cross-page chrome | `components/shared/` |
| Data/state for a module | `composables/use<Module>.ts` — mock data only, no real network calls |
| A unit spec (composable) | `tests/unit/use<Module>.test.ts` |
| A component/page spec | `tests/functional/<Name>.test.ts` |
| An e2e spec | `tests/e2e/<page>.spec.ts` — follow `/generate-playwright-tests` |

Style points the codebase already follows: `<script setup lang="ts">`, typed
`defineProps`/`defineEmits`, `NuxtLink` for internal navigation, Tailwind theme tokens over
raw colors, `cn()` from `lib/utils.ts` for class merges, `useScrollAnimation` for reveal
effects, and SSR-safe browser-API access (`import.meta.client` / `onMounted`).

## Quality gates (no CI — you are the gate)

| Gate | Command | Expectation |
| --- | --- | --- |
| Unit + functional tests | `just test` | 100% pass (843 baseline) — never weaken an assertion to go green |
| Typecheck | `just typecheck` | **0 errors** is the baseline; any error is a regression (see `/fix-typecheck`). `just verify` = tests + typecheck |
| E2E (when relevant) | `npm run test:e2e -- --project=chromium` | pass; needs `npx playwright install` once |

There is no ESLint or Prettier in this repo — don't invent `npm run lint`; `/lint-check` runs
the two real layers above.

## Commit & PR conventions

- **Conventional Commits**: `feat(interview): ...`, `fix(dashboard): ...`, `docs: ...`.
  Scope by module (see the `/commit` skill's scope table).
- Author email for this repo is `mohdakmal875@gmail.com` (already set repo-locally).
- **Never** add `Co-Authored-By` / "Generated with Claude Code" footers to commits or PRs.
- PRs go into `main` on `github.com/dxiiren/carreer-buddy-proto`; review is manual (no CI
  bots). `/pre-pr-review` gives you the self-review checklist first.

## Writing a feature plan

For multi-page features, write the plan first — `PLAN.md` (company pages) is the house
example: overview, per-page content structure, shared patterns, tests to create, and a file
summary table. Drop dated plans in `docs/plans/`.

## Related docs

| Doc | Why |
| --- | --- |
| [`../01-overview/architecture.md`](../01-overview/architecture.md) | The structure you're extending |
| [`../05-reference/commands.md`](../05-reference/commands.md) | Every command in one table |
| [`../06-troubleshooting/common-issues.md`](../06-troubleshooting/common-issues.md) | When the loop breaks |
