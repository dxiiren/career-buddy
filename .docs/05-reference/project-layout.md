# Project Layout

> **TL;DR** Standard Nuxt 3 tree: `pages/` for routes, `layouts/` for the two shells,
> `components/` per module + `ui/` primitives, `composables/` as the mock data layer,
> `tests/` in three tiers. `.nuxt/` and `.output/` are generated — never committed.

## Annotated tree

```
career-buddy/
├── nuxt.config.ts            # modules (@nuxtjs/tailwindcss, @vueuse/nuxt, shadcn-nuxt,
│                             # @nuxtjs/sitemap), site URL, sitemap excludes + noindex
│                             # routeRules, shadcn config, global head (fonts, favicons)
├── tailwind.config.ts        # theme tokens, dark mode, animations
├── tsconfig.json             # extends generated .nuxt/tsconfig.json
├── vitest.config.ts          # nuxt env + happy-dom; includes tests/unit + tests/functional
├── playwright.config.ts      # testDir tests/e2e; webServer `npm run dev` on :3000;
│                             # 5 projects (desktop x3 + mobile x2)
├── package.json              # scripts; postinstall = patch-package && nuxt prepare
├── setup.ps1                 # one-time machine bootstrap (idempotent)
├── justfile                  # daily recipes (port 8114)
├── CLAUDE.md                 # AI-assistant project instructions
├── PLAN.md                   # historical: company-pages design plan (house plan style)
│
├── error.vue                 # ACTIVE error page (srcDir is the repo root)
├── app/
│   ├── app.vue               # Nuxt-4-convention pair — currently NOT loaded (see FAQ)
│   └── error.vue             #   "
├── pages/                    # file-based routes
│   ├── index.vue             # landing (SEO + FAQ JSON-LD)
│   ├── login.vue, register.vue, dashboard.vue, chat.vue
│   ├── help.vue, settings.vue, about.vue, contact.vue, privacy.vue
│   ├── resume/               # index, templates, cover-letter
│   ├── interview/            # index, questions, simulation
│   ├── job-search/           # index, salary, scams
│   ├── networking/           # index, templates
│   └── self-promotion/       # index, linkedin, workplace
├── layouts/
│   ├── default.vue           # AppNavbar + <main> + AppFooter
│   └── dashboard.vue         # sidebar app shell for authenticated pages
├── components/
│   ├── landing/              # hero, problem, features, how-it-works, testimonials,
│   │                         # trust badges, FAQ, CTA footer
│   ├── shared/               # AppNavbar, AppFooter, AppLogo, Breadcrumbs, ThemeToggle...
│   ├── ui/                   # shadcn-vue primitives (Button, Card, Accordion, Toast...)
│   └── {module}/             # auth, career-chat, dashboard, help, interview, job-search,
│                             # networking, resume, self-promotion, settings
├── composables/              # THE data layer — one useX.ts per module, all mock
├── lib/utils.ts              # cn() Tailwind class merge
├── assets/css/               # global styles (main.css)
├── public/                   # favicons, og-image.png, robots.txt, site.webmanifest, images/
├── patches/                  # nuxt-site-config+3.2.18.patch (patch-package, on install)
├── tests/
│   ├── unit/                 # composable specs (Vitest)
│   ├── functional/           # component/page specs (Vitest + happy-dom)
│   └── e2e/                  # Playwright: landing-page, accessibility, responsive,
│                             # seo, theme-toggle
├── docs/plans/               # historical dated design docs (landing, auth+dashboard,
│                             # career modules, dashboard mobile)
├── .docs/                    # THIS documentation set
└── .claude/                  # skills, settings, statusline hook, memory
```

## Generated / ignored (never commit)

| Path | Source |
| --- | --- |
| `node_modules/` | `just install` |
| `.nuxt/` | `nuxt prepare` / dev server (holds the generated tsconfig + types) |
| `.output/` | `just build` |
| `playwright-report/`, `test-results/` | Playwright runs |
| `.mcp.json`, `.claude/settings.local.json`, `.claude/workspace/` | per-dev Claude config/secrets |

## Two docs folders?

- **`.docs/`** — the maintained developer guide (this set).
- **`docs/plans/`** — historical, dated design plans kept for context. Don't extend `.docs/`
  content there; new plans go in `docs/plans/`, new documentation goes here.

## Related docs

| Doc | Why |
| --- | --- |
| [`../01-overview/architecture.md`](../01-overview/architecture.md) | How the pieces interact |
| [`commands.md`](commands.md) | The commands that generate/consume these paths |
