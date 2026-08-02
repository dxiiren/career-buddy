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

### Every e2e spec fails with "Executable doesn't exist at ...chrome-headless-shell.exe"

The Playwright npm package ships no browser engines, and nothing in `npm install` fetches
them — so a fresh clone reds all 79 specs for a reason unrelated to the code. `just e2e` and
`just e2e-chromium` now run `npx playwright install` for you via the `_require-browsers`
guard (~3s once the engines are on disk). Only a raw `npx playwright test` still needs the
manual install.

### e2e fails with "http://localhost:8115 is already used"

That is the guard working, not a bug. Free the port — `just stop` for this repo's own
processes, otherwise find the squatter:

```powershell
Get-NetTCPConnection -LocalPort 8115 -State Listen |
  ForEach-Object { Get-CimInstance Win32_Process -Filter "ProcessId = $($_.OwningProcess)" } |
  Select-Object ProcessId, CommandLine
```

Or move the run: `$env:E2E_PORT='8125'; just e2e`.

**Why the config refuses to reuse a running server.** The suite used to sit on `:3000` with
`reuseExistingServer: !process.env.CI`. On a dev box where several Node projects all default
to :3000, that meant Playwright would silently adopt *another project's* app as the system
under test — which it did, producing 77 failures and 2 passes (the 2 were the `request`-based
sitemap checks, which pass against any site serving a valid `sitemap.xml`). Nothing in that
output pointed at the real cause. The suite now owns `:8115` and sets
`reuseExistingServer: false` everywhere, so a busy port is a loud, immediate error instead of
a matrix-wide false failure.

### `npm run test:coverage` fails asking for a package

`@vitest/coverage-v8` is in `devDependencies` (its version must track `vitest`'s), so this
only happens on a stale install — run `just install` and retry (`just test-coverage`).

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
