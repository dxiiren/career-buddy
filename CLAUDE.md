# CLAUDE.md — carreer-buddy-proto

> Human-facing developer docs live in [`.docs/`](./.docs/README.md) — start at
> [`.docs/tldr.md`](./.docs/tldr.md). Keep them in sync when changing behavior they document.

## Project: Career Buddy

A frontend-only prototype of **Career Buddy** — a career-preparation platform for Malaysian
youth aged 18–30. A public SEO-tuned landing page (hero, features, testimonials, FAQ with
JSON-LD) plus a mock-auth app shell: dashboard, AI career chat, resume builder, interview
prep (including an AI simulation page), job search, networking, and self-promotion modules.
**All data is mock data served from composables** — there is no backend, no database, no
`.env`; the "AI" features return canned content.

- **Repo:** GitHub — `github.com/dxiiren/carreer-buddy-proto`
- **Live demo:** https://carreer-buddy-proto.vercel.app (Vercel). Local dev via `just start`
  on `http://localhost:8114` — no CI/CD.

### Tech Stack Quick Reference

| Layer | Technology | Key details |
| --- | --- | --- |
| Framework | **Nuxt 3.17** (Vue 3.5, `<script setup>`) | File-based routing in `pages/`, SSR + hydration, Nitro `node-server` preset |
| Language | **TypeScript 5** | `tsconfig.json` extends generated `.nuxt/tsconfig.json` (needs `nuxt prepare`); typecheck via `npx nuxt typecheck` (no npm script) |
| Styling | **Tailwind CSS v3** | `@nuxtjs/tailwindcss`, `tailwind.config.ts`, theme tokens + dark mode, `tailwindcss-animate` |
| UI | **shadcn-vue** (radix-vue + CVA) | components in `components/ui/` (no prefix), `lucide-vue-next` icons, `cn()` in `lib/utils.ts` |
| Utilities | **VueUse 10** | `@vueuse/nuxt` auto-imports |
| SEO | `@nuxtjs/sitemap` + `useSeo` composable | site `careerbuddy.yanasharif.com`; app routes noindex'd + sitemap-excluded in `nuxt.config.ts`; FAQ JSON-LD on the landing page |
| Data | Mock composables | one `useX.ts` per module in `composables/` — the entire "backend" |
| Tests | **Vitest 3** (`@nuxt/test-utils`, happy-dom) + **Playwright 1.57** | `tests/unit` + `tests/functional` (39 files / 843 tests, green) · `tests/e2e` (5 specs, boots its own dev server on **:3000**) |
| Package manager | **npm** | Node LTS (verified on v24); `package-lock.json`; postinstall runs **patch-package** (`patches/nuxt-site-config+3.2.18.patch`) + `nuxt prepare` |
| Task runner | `just` | wraps npm scripts (`justfile`), port 8114 |

### Project Structure

```
carreer-buddy-proto/
  nuxt.config.ts              # modules, SEO/sitemap, routeRules (noindex app pages), fonts
  tailwind.config.ts, tsconfig.json, vitest.config.ts, playwright.config.ts
  error.vue                   # ACTIVE error page (srcDir = repo root; app/app.vue +
                              # app/error.vue follow the Nuxt 4 convention, currently unused)
  pages/                      # index (landing), login, register, dashboard, chat, help,
                              # settings, about, contact, privacy + module folders:
                              # resume/, interview/, job-search/, networking/, self-promotion/
  layouts/                    # default (navbar+footer), dashboard (sidebar app shell)
  components/                 # per-module folders (landing/, dashboard/, interview/, ...)
                              # + shared/ (AppNavbar, AppFooter, ...) + ui/ (shadcn-vue)
  composables/                # useAuth, useCareerChat, useDashboard, ... — ALL data mocked here
  lib/utils.ts                # cn() class merge
  assets/css/, public/        # global styles; favicons, og-image, robots.txt, webmanifest
  patches/                    # patch-package diff applied on npm install
  tests/                      # unit/ (composables) + functional/ (components/pages) + e2e/
  docs/plans/, PLAN.md        # historical design notes (see .docs/01-overview)
  .docs/                      # numbered documentation set
  .claude/                    # skills, settings, statusline, memory
```

## Git Commits

- **Conventional Commits** (`feat:`, `fix:`, `chore:`, `docs:` ...).
- **NEVER** add `Co-Authored-By` lines or "Generated with Claude Code" / session-link footers to
  **any** outward artifact — commit messages, PR descriptions, or issue comments.
- Commit author email for this repo is `mohdakmal875@gmail.com` (set repo-locally).
- Only stage and commit files relevant to the change. **Never auto-commit** after a fix — the
  developer says "commit" first.

## Local Development

- One-time machine setup: `pwsh ./setup.ps1` (idempotent — installs Git, Node.js LTS,
  just, the Claude Code CLI). Then `just install`, then `just start`.
- All day-2 commands are `just` recipes — run `just` to list them. Never invent an alternative
  command for something a recipe already covers.
- `just stop` kills only THIS repo's server processes (matched by repo path on the command
  line) — safe to run while other projects are serving.
- Bare `npm run test` starts Vitest in **watch mode** and hangs the terminal — use `just test`
  (forces `--run`) or the scoped `npm run test:unit` / `npm run test:functional`.
- `just typecheck` (`npx nuxt typecheck`) passes with **ZERO errors** — the historical
  26-error baseline was cleared in 2026-08. Any typecheck error is a regression; `just verify`
  runs tests + typecheck as the pre-push gate.
- Playwright e2e (`npm run test:e2e`) boots its **own** dev server on `localhost:3000` (see
  `playwright.config.ts` `webServer`) and needs browsers once: `npx playwright install`. It is
  independent of the :8114 kit server.
- `npm install` must run `patch-package` (postinstall) — if `nuxt-site-config` behaves oddly,
  check the patch applied (`patches/nuxt-site-config+3.2.18.patch`).
- Mock login is `admin` / `admin` (`composables/useAuth.ts`); register accepts anything.
  The "session" persists in `localStorage` (`auth_user`) — clear it to sign out fully.

## Project Skills

Development skills live in `.claude/skills/` — check `.claude/skills/README.md` for the catalog
and **follow the relevant skill before writing code**. Notables: `/commit`, `/create-pr`,
`/pre-pr-review`, `/lint-check`, `/fix-typecheck`, `/generate-playwright-tests`,
`/claude-transfer`, `/llm-transfer`, `/define-goal`, `/setup-mcp`, `/test-all-mcp`,
`/audit-skills`.

## MCP Servers

Wired via the committed-stub + git-ignored-secret pattern: `.mcp.json.stub` (committed,
placeholders) → `.mcp.json` (git-ignored, real — seeded by `setup.ps1`). Turnkey: `context7`
(library docs — call `resolve-library-id` then `query-docs` instead of recalling APIs),
`playwright` (drive a real browser). Per-dev: `github` (fill the PAT in `.mcp.json`).
Health check: `/test-all-mcp`. Fall back to native tools silently if a server is unavailable.

## Memory

Lightweight, single-developer, file-based project memory at `.claude/memory/`:

- **`MEMORY.md`** is the index (one line per memory: `- [Title](file.md) — hook`), loaded each
  session.
- Each memory is **one fact in its own `*.md` file** with frontmatter (`name`, `description`,
  `metadata.type` = `reference` | `feedback` | `project`). Read the fact file on demand when its
  index hook is relevant.
- After writing a fact file, add its one-line pointer to `MEMORY.md`. Update rather than
  duplicate; delete a memory that turns out wrong. Don't store what the repo already records.
