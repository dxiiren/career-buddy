# Architecture

> **TL;DR** Standard Nuxt 3 file-based app: routes in `pages/`, two layouts, per-module
> component folders + shadcn-vue primitives in `components/ui/`, and one mock-data composable
> per module. TypeScript throughout, Tailwind v3 theme tokens, SEO handled centrally, three
> test layers.

## The stack

| Layer | Technology | Notes |
| --- | --- | --- |
| Framework | Nuxt 3.17 (Vue 3.5) | SSR + hydration; Nitro `node-server` preset |
| Language | TypeScript 5 | `tsconfig.json` extends generated `.nuxt/tsconfig.json` |
| Styling | Tailwind CSS v3 | `tailwind.config.ts` theme tokens (`bg-card`, `text-muted-foreground`, ...), `tailwindcss-animate` |
| UI kit | shadcn-vue (radix-vue + class-variance-authority) | generated into `components/ui/`, used with no prefix (`<Button>`, `<Input>`) |
| Icons | lucide-vue-next | imported per icon |
| Utilities | VueUse (`@vueuse/nuxt`) | auto-imported |
| Fonts | Google Fonts (Inter + Plus Jakarta Sans) | preconnect + stylesheet in `nuxt.config.ts` head |

## Routing & layouts

- **`pages/`** is the router. Top-level pages (`index`, `login`, `register`, `dashboard`,
  `chat`, `help`, `settings`, `about`, `contact`, `privacy`) plus one folder per career module
  (`resume/`, `interview/`, `job-search/`, `networking/`, `self-promotion/`).
- **`layouts/default.vue`** — public shell: `SharedAppNavbar` + `<main>` + `SharedAppFooter`.
- **`layouts/dashboard.vue`** — the authenticated app shell: sidebar navigation, user chip,
  theme toggle. App pages opt into it.
- Root component: none in effect — Nuxt 3's srcDir is the repo root, there is no root
  `app.vue`, so Nuxt uses its default root and the root **`error.vue`** as the error page.
  The `app/app.vue` + `app/error.vue` pair follows the Nuxt 4 convention and is currently
  not loaded (see the FAQ).

## Components

```
components/
  landing/        # HeroSection, ProblemSection, FeaturesSection, HowItWorksSection,
                  # TestimonialsCarousel, TrustBadgesSection, FaqSection, CtaFooter
  shared/         # AppNavbar, AppFooter, AppLogo, Breadcrumbs, ThemeToggle, ...
  ui/             # shadcn-vue primitives (Button, Card, Input, Accordion, Toast, Skeleton...)
  auth/ career-chat/ dashboard/ help/ interview/ job-search/
  networking/ resume/ self-promotion/ settings/    # one folder per module
```

Rule of thumb: reusable primitives go in `ui/`, cross-page chrome in `shared/`, everything
feature-specific in its module folder.

## Data layer — mock composables

`composables/` is the whole backend. One `use{Module}.ts` per module returns refs + actions
with hardcoded content and simulated latency:

- `useAuth` — hardcoded `admin`/`admin`, 1.5 s fake delay, `localStorage` (`auth_user`) session.
- `useCareerChat` — canned assistant responses.
- `useDashboard`, `useInterview`, `useJobSearch`, `useNetworking`, `useResume`,
  `useSelfPromotion`, `useHelp`, `useSettings`, `useRecentActivity` — per-module mock content.
- `useTheme` — `useState('color-mode')`, **dark by default**; light mode adds the `light`
  class to `<html>` and persists the preference client-side.
- `useScrollAnimation` — IntersectionObserver-based reveal-on-scroll helper.
- `useSeo` — see below.

Composables are SSR-rendered, so browser APIs (`localStorage`, `document`) are guarded behind
`import.meta.client` / `onMounted` — keep that discipline in new code.

## SEO

- **`composables/useSeo.ts`** — central helper: canonical URL, `title | Career Buddy`
  pattern, description/keywords, Open Graph + Twitter cards, optional `noindex`. Every public
  page calls it.
- **`nuxt.config.ts`** — `@nuxtjs/sitemap` (zeroRuntime, prerendered at build) with all app
  routes excluded, matching `routeRules` that mark them `noindex, nofollow`, and the global
  head (favicons, og-image, webmanifest, `geo.region: MY`).
- The landing page also emits FAQ JSON-LD structured data for rich results.
- New public pages: call `useSeo`. New app pages: add the route to both `sitemap.exclude` and
  `routeRules` in `nuxt.config.ts`.

## Testing

| Layer | Tool | Location | Status (2026-08-02) |
| --- | --- | --- | --- |
| Unit (composables) | Vitest 3 + `@nuxt/test-utils` (nuxt env, happy-dom) | `tests/unit/` | 14 files / 223 tests, green |
| Functional (components/pages) | same | `tests/functional/` | 25 files / 620 tests, green |
| E2E | Playwright 1.57 | `tests/e2e/` | 5 specs; boots its own dev server on `:3000`, five browser projects |

`vitest.config.ts` runs unit+functional with a 15 s timeout; coverage config exists but the
coverage provider package is not installed (see troubleshooting).

## Build & patching

- `npm install` postinstall = `patch-package && nuxt prepare`. The single patch
  (`patches/nuxt-site-config+3.2.18.patch`) fixes the pinned `nuxt-site-config` package —
  do not delete `patches/` or reorder the postinstall.
- `just build` → `.output/` (client assets + Nitro server); sitemap + its XSL are prerendered
  at build time.

## Related docs

| Doc | Why |
| --- | --- |
| [`project-overview.md`](project-overview.md) | What the product is |
| [`../03-development/workflow.md`](../03-development/workflow.md) | How to work in this structure |
| [`../05-reference/project-layout.md`](../05-reference/project-layout.md) | Full annotated tree |
