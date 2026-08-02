# TL;DR — every doc in 30 seconds

## [01-overview/project-overview.md](01-overview/project-overview.md)

Career Buddy is a frontend-only prototype of a career-preparation platform for Malaysian youth
aged 18–30: a public SEO-tuned landing page plus a mock-auth app with dashboard, AI career
chat, resume builder, interview prep, job search, networking, and self-promotion modules.
Everything is mock data in composables — no backend, no database, no `.env`. Login is
`admin`/`admin`. `PLAN.md` and `docs/plans/` are historical design notes.

## [01-overview/architecture.md](01-overview/architecture.md)

Nuxt 3 + TypeScript + Tailwind v3 + shadcn-vue. File-based routes in `pages/`, two layouts
(`default` public, `dashboard` app shell), per-module component folders, and one `useX.ts`
composable per module acting as that module's mock backend. SEO via `useSeo` + `@nuxtjs/sitemap`
with app routes noindex'd. Tests in three layers: unit (composables), functional (components,
happy-dom), e2e (Playwright, own server on :3000).

## [02-setup/getting-started.md](02-setup/getting-started.md)

`pwsh ./setup.ps1` once (installs Git, Node LTS, just, uv, Claude CLI; seeds `.mcp.json`),
reopen the shell, `just install`, `just start`, open http://localhost:8114. First page load
can take up to two minutes while Vite warms up. Verify with `just verify` (916 tests, coverage
above its thresholds, + typecheck, all green).

## [03-development/workflow.md](03-development/workflow.md)

Branch off `main`, run the dev server with `just start`/`just dev`, add tests mirroring the
existing `tests/` layout, gate with `just verify` (`just test-coverage` + `just typecheck`, both
fully green — the typecheck baseline is 0 errors, and the coverage thresholds are enforced;
`just verify-all` adds Playwright), commit with Conventional Commits (no AI
attribution footers), PR into `main`. The `.claude/skills/` catalog automates most of this.

## [04-deployment/deployment.md](04-deployment/deployment.md)

Honest status: there is **no CI/CD and no deployment target** — the prototype runs locally
only. `just build` produces a self-contained Nitro `node-server` bundle in `.output/`, and
`just preview` serves it on :8114; that plus the sitemap/SEO config is everything a future
deployment would build on.

## [05-reference/commands.md](05-reference/commands.md)

The daily table: `just install` / `start` / `dev` / `stop` / `build` / `preview` / `test` /
`test-unit` / `test-functional`, plus every underlying npm script (including the e2e family
that the justfile deliberately does not wrap) and the copy-paste health-check probe.

## [05-reference/project-layout.md](05-reference/project-layout.md)

Annotated tree of the repo: where pages, layouts, module components, shadcn-vue primitives,
composables, tests, patches, and the two docs systems (`.docs/` vs historical `docs/plans/`)
live, and which generated folders (`.nuxt/`, `.output/`) never get committed.

## [06-troubleshooting/common-issues.md](06-troubleshooting/common-issues.md)

Real symptoms with fixes: Vitest watch-mode hang, slow first page load (poll, use `localhost`
not `127.0.0.1`), the pre-existing 26-error typecheck baseline, Playwright browser install +
:3000 web server, patch-package on install, port 8114 conflicts, and the localStorage mock
session.

## [07-faq/faq.md](07-faq/faq.md)

Quick answers: why everything is mocked, the `admin`/`admin` login, why the kit serves :8114
while e2e uses :3000, where the "AI" content comes from, why there's no ESLint/Prettier, and
what `patches/` is for.
