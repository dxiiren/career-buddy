# Commands Reference

> **TL;DR** Everything daily is a `just` recipe (run `just` to list them). The npm scripts
> underneath are listed here too, including the e2e family the justfile deliberately doesn't
> wrap.

## just recipes (the daily interface)

| Recipe | What it does |
| --- | --- |
| `just` | List all recipes |
| `just install` | `npm ci` (falls back to `npm install` without a lockfile) + postinstall (patch-package, `nuxt prepare`) |
| `just start` | Dev server on http://localhost:8114 in a background window (runs `stop` first so nothing lingers) |
| `just dev` | Dev server in the foreground — Ctrl+C to stop |
| `just stop` | Kill only THIS repo's `node.exe` processes (matched by repo path on the command line) |
| `just build` | Production build → `.output/` |
| `just preview` | Serve the production build on http://localhost:8114 (`PORT` env; needs `just build` first) |
| `just test [flags]` | ALL Vitest tests once (`vitest --run`; extra flags pass through) |
| `just test-unit` | `tests/unit` only (composables) |
| `just test-functional` | `tests/functional` only (components/pages) |
| `just claudex` / `claudeo` / `claudeh` | Claude Code with all permissions — Sonnet / Opus / Haiku |

`PORT` is overridable per invocation: `$env:PORT='8200'; just start` (default 8114).

## npm scripts (underlying / not wrapped)

| Script | Notes |
| --- | --- |
| `npm run dev` | bare `nuxt dev` — defaults to :3000; the justfile passes `--port 8114` |
| `npm run build` / `generate` / `preview` | build · static generate (unused day-to-day) · preview |
| `npm run test` | **watch mode — hangs a terminal; prefer `just test`** |
| `npm run test:unit` / `test:functional` | run-once scoped suites |
| `npm run test:e2e` | Playwright, all 5 browser projects; boots its own dev server on **:3000**; needs `npx playwright install` once |
| `npm run test:e2e:ui` | Playwright UI mode |
| `npm run test:seo` | just the SEO spec on chromium |
| `npm run test:coverage` | **broken as shipped** — needs the missing `@vitest/coverage-v8` dev dependency |
| `npm run test:all` | vitest run + full playwright |

The justfile intentionally has no e2e recipe: the Playwright run manages its own server on a
different port (:3000) and needs a one-time browser download — keep it an explicit npm call.

## Quality commands

| Command | Notes |
| --- | --- |
| `just typecheck` (`npx nuxt typecheck`) | vue-tsc over the whole project; **baseline: 0 errors** — any error is a regression |
| `just verify` | full quality gate: `just test` + `just typecheck` |
| `npx nuxt prepare` | regenerate `.nuxt/` types (runs automatically on install) |

## Health probe

```powershell
curl.exe -s -o NUL -w "%{http_code}" http://localhost:8114/     # 200 = dev server up
```

Always `curl.exe` (the PowerShell `curl` alias is `Invoke-WebRequest` and behaves differently),
and always `localhost` (IPv6 loopback binding).

## Related docs

| Doc | Why |
| --- | --- |
| [`project-layout.md`](project-layout.md) | Where the files these commands touch live |
| [`../03-development/workflow.md`](../03-development/workflow.md) | Which command at which step |
| [`../06-troubleshooting/common-issues.md`](../06-troubleshooting/common-issues.md) | When a command misbehaves |
