# Project Overview

> **TL;DR** Career Buddy is a frontend-only Nuxt 3 prototype of a career-preparation platform
> for Malaysian youth aged 18–30. Public landing page + mock-auth app shell with seven feature
> modules. All data is mock data inside composables — no backend, no database, no `.env`.

## What it is

Career Buddy helps young adults prepare for the job market: not a job board, but a coaching
tool. This repo is the **prototype** — the full UI and interaction design, with every piece of
data mocked client-side so the product can be demonstrated without any infrastructure.

Canonical site metadata points at `https://careerbuddy.yanasharif.com` (see `nuxt.config.ts`),
but this repo itself has no deployment pipeline — it runs locally on
`http://localhost:8114` via `just start`.

## Feature modules

| Module | Route(s) | What it does |
| --- | --- | --- |
| Landing | `/` | SEO-tuned marketing page: hero, problem, features, how-it-works, testimonials carousel, trust badges, FAQ (with JSON-LD), CTA footer |
| Auth (mock) | `/login`, `/register` | Login `admin`/`admin`; register accepts anything; session kept in `localStorage` |
| Dashboard | `/dashboard` | Progress tracking, daily tasks, motivational content, recent activity |
| AI Career Chat | `/chat` | Chat UI with canned assistant responses (`useCareerChat`) |
| Resume Builder | `/resume`, `/resume/templates`, `/resume/cover-letter` | Templates, ATS tips, cover-letter guides |
| Interview Prep | `/interview`, `/interview/questions`, `/interview/simulation` | STAR method, question bank, mock "AI" interview simulation with feedback |
| Job Search | `/job-search`, `/job-search/salary`, `/job-search/scams` | Platform recommendations, salary ranges, scam detection |
| Networking | `/networking`, `/networking/templates` | Message templates, introduction guides, LinkedIn strategies |
| Self-Promotion | `/self-promotion`, `/self-promotion/linkedin`, `/self-promotion/workplace` | Personal branding, workplace visibility, LinkedIn headlines |
| Support & misc | `/help`, `/settings`, `/about`, `/contact`, `/privacy` | FAQ/support, user settings, company pages |

Every module follows the same pattern: a page (or folder of pages) in `pages/`, a component
folder in `components/{module}/`, and a `composables/use{Module}.ts` that returns the module's
mock data and state.

## The mock-data premise

There is deliberately **no backend**. `composables/` is the entire data layer — hardcoded
content, simulated latency (`setTimeout`), and client-side state. The "AI" features (career
chat, interview simulation) return canned content. Keep it that way in the prototype: new
features get mock composables, not network calls.

## Project history

- Built page-by-page on `dxiiren/*` feature branches (landing, auth+dashboard, career modules,
  mobile fixes, SEO/PWA polish, interview simulation) merged into `main`.
- **`PLAN.md`** (repo root) is the design plan for the company pages (`/about`, `/contact`,
  `/privacy`) — since implemented, kept as a historical reference and as the house style for
  writing feature plans.
- **`docs/plans/`** holds four earlier dated design documents (landing, auth+dashboard, career
  modules, dashboard mobile responsiveness) — same status: historical, useful for intent.
- License: none published — the old README declared the project **Private** (no open-source
  license file exists).

## Quality snapshot (verified 2026-08-02)

- `just build` — green (Nuxt 3.17.5 / Nitro 2.12.4 / Vue 3.5.25, Node v24).
- `just test` — green: 39 Vitest files, **843 tests passing** (223 unit + 620 functional).
- `just typecheck` (`npx nuxt typecheck`) — **green, 0 errors** (the historical 26-error
  baseline was cleared in 2026-08; see
  [`../06-troubleshooting/common-issues.md`](../06-troubleshooting/common-issues.md)).
- Playwright e2e — 5 specs exist; they need `npx playwright install` once and boot their own
  dev server on `:3000`.

## Related docs

| Doc | Why |
| --- | --- |
| [`architecture.md`](architecture.md) | How the code is organised |
| [`../02-setup/getting-started.md`](../02-setup/getting-started.md) | Run it yourself |
| [`../07-faq/faq.md`](../07-faq/faq.md) | Quick answers about the mock premise |
