# Common Issues

> **TL;DR** Real symptoms hit while verifying this kit, with fixes. Headliners: Vitest watch
> mode hangs terminals, first page load is slow (poll `localhost`, never `127.0.0.1`), and
> `npx nuxt typecheck` fails with a known 26-error baseline that predates the kit.

### `npm run test` never exits / terminal appears frozen

The `test` script is bare `vitest`, which starts **watch mode** in a TTY. Nothing is broken —
it's waiting for file changes. Use `just test` (runs `vitest --run`) or the scoped
`npm run test:unit` / `npm run test:functional`, which are run-once by definition.

### First request to http://localhost:8114 hangs or times out

Nuxt dev compiles routes on demand — the first page load after `just start` regularly takes
30–120 seconds on this app (~1900 modules). Poll rather than assume failure:

```powershell
curl.exe -s -o NUL -w "%{http_code}" http://localhost:8114/
```

Two gotchas baked into that line: use **`curl.exe`** (the PowerShell `curl` alias is
`Invoke-WebRequest`), and use **`localhost`** — the dev server binds the IPv6 loopback
(`[::1]`) on Windows, so `127.0.0.1` can refuse connections while the server is perfectly
healthy.

### `just typecheck` reports errors

The baseline is **zero errors** — `just typecheck` (`npx nuxt typecheck`) was verified clean
on 2026-08-02, so any error it prints is a regression from your working tree. Fix it before
pushing (see `/fix-typecheck`); `just verify` runs tests + typecheck as one gate.

For history: the repo carried a documented 26-error baseline until 2026-08. It was cleared by
typing the shadcn `Card` `class` prop as `HTMLAttributes['class']` (landing sections), adding
the optional `email` to the auth `User`, replacing the uninstalled-module `robots` route rule
with typed `X-Robots-Tag` headers in `nuxt.config.ts`, typing `pages/about.vue`'s `stats`,
and correcting test fixtures. If a similar cross-cutting error shows up, fix the type at its
definition — not with `any` or `@ts-ignore` at every call site.

### `npm run test:e2e` errors immediately

Two usual causes:

1. **Browsers not installed** — run `npx playwright install` once (chromium alone is enough
   for local authoring: `--project=chromium`).
2. **Port 3000 occupied** — the Playwright `webServer` boots `npm run dev` on `localhost:3000`
   (and reuses an existing :3000 server outside CI). If another project owns :3000, stop it
   first. This is separate from the kit's :8114 server.

### `npm run test:coverage` fails asking for a package

`@vitest/coverage-v8` is not in `devDependencies`, so the coverage script cannot run as
shipped. Either install it (a dependency change — commit it deliberately) or skip coverage.

### Port 8114 already in use / server won't start

Another instance from this repo is usually the culprit: `just stop` kills exactly those (it
matches the repo path on the process command line — other projects' node processes are safe).
`just start` also runs `stop` first for this reason. If :8114 is held by something else
entirely, find it: `netstat -ano | findstr :8114`.

### Weird `nuxt-site-config` behavior after installing

The postinstall chain must run `patch-package`, which applies
`patches/nuxt-site-config+3.2.18.patch`. If you installed with scripts disabled
(`--ignore-scripts`), re-run `npm ci` normally, and check the install log for
`nuxt-site-config@3.2.18 ✔`.

### Logged in state persists after restarting the dev server

Expected — the mock session lives in the browser's `localStorage` under `auth_user`
(`composables/useAuth.ts`). Clear that key (or use the app's logout) to reset. Credentials
are `admin` / `admin`.

## Related docs

| Doc | Why |
| --- | --- |
| [`../02-setup/getting-started.md`](../02-setup/getting-started.md) | The happy path these issues deviate from |
| [`../05-reference/commands.md`](../05-reference/commands.md) | The commands referenced above |
| [`../07-faq/faq.md`](../07-faq/faq.md) | Conceptual questions rather than breakage |
