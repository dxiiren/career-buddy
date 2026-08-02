# FAQ

> **TL;DR** Quick answers about the mock premise, ports, logins, e2e, and tooling choices.

## Is there a backend / API / database?

No. This is a **prototype**. `composables/` holds all data as hardcoded content with simulated
latency. The "AI" chat and interview feedback are canned responses. Keep new features mocked
the same way — introducing real network calls changes the nature of the repo.

## What are the login credentials?

`admin` / `admin` (`composables/useAuth.ts` — the user is named "Yana"). Register accepts any
well-formed input. The session persists in `localStorage` (`auth_user`).

## Why does the kit serve on 8114 but e2e uses 8115?

Port **8114** is this repo's assigned port in the multi-repo onboarding standard — `just
start`/`dev`/`preview` all use it so parallel repos never collide. Playwright manages a
*separate* server with its own lifecycle (started and torn down per run), so it takes the next
port along, **8115**, rather than sharing the one a developer may already be serving on.

It used to use `:3000` — Nuxt's default, and therefore also the default of every other Node
project on the machine. Combined with the old `reuseExistingServer: !process.env.CI`, that let
Playwright silently adopt a stray server belonging to a *different repo* and run the whole
matrix against the wrong app (77 failures, 2 passes, no hint of the real cause in the output).
The config now pins :8115 and sets `reuseExistingServer: false`, so an occupied port is a loud
error. Override with `$env:E2E_PORT` if 8115 is taken.

## Why isn't e2e part of `just verify`?

`just e2e` exists and is a first-class recipe (plus `just e2e-chromium` for the fast loop), but
it stays out of the pre-push gate: five browser projects over 79 specs is ~10 minutes and needs
three browser engines on disk, versus seconds for Vitest + typecheck. `just verify-all` is
`verify` + `e2e` when you want everything — see
[`../05-reference/commands.md`](../05-reference/commands.md).

## Why is there no ESLint / Prettier?

The repo shipped without them, and the onboarding kit documents reality rather than adding
tooling. The quality layers that exist are the TypeScript typecheck (`just typecheck`,
baseline 0 errors) and the Vitest suite (`just test`) — `just verify` runs both. Adding a
linter would be a deliberate, separate decision.

## What is `patches/` and why does install run `patch-package`?

`patches/nuxt-site-config+3.2.18.patch` carries a local fix to the pinned `nuxt-site-config`
package. `npm install`'s postinstall applies it automatically. Don't remove the folder or the
postinstall hook; if you upgrade that package, regenerate the patch (`npx patch-package
nuxt-site-config`) or verify it's no longer needed.

## Is `PLAN.md` current work?

No — it's the (implemented) design plan for the `/about`, `/contact`, `/privacy` pages, kept
as a reference and as the house style for feature plans. Same for the dated docs in
`docs/plans/`. Current developer documentation lives in [`.docs/`](../README.md).

## Why do I see two `error.vue` files (root and `app/`)?

Under Nuxt 3 the source dir is the repo **root**, so the root `error.vue` is the active error
page. The `app/app.vue` + `app/error.vue` pair follows the Nuxt 4 directory convention and is
currently **not loaded** (verified: the served HTML lacks `app/app.vue`'s route announcer and
page-transition styles). Edit the root `error.vue` for error-page changes; reconciling the
duplicates is a worthwhile cleanup chore.

## Where does the theme live?

`composables/useTheme.ts` — **dark is the default**; light mode adds a `light` class to
`<html>` and the choice is persisted client-side. Style with the Tailwind theme tokens
(`bg-card`, `text-muted-foreground`, ...) so both modes keep working.

## Can I deploy this?

Nothing stops a Nitro deploy technically (see
[`../04-deployment/deployment.md`](../04-deployment/deployment.md)), but there is no CI/CD,
hosting target, or real auth — it's a local prototype by design.

## Related docs

| Doc | Why |
| --- | --- |
| [`../01-overview/project-overview.md`](../01-overview/project-overview.md) | The long-form version of these answers |
| [`../06-troubleshooting/common-issues.md`](../06-troubleshooting/common-issues.md) | When something is actually broken |
