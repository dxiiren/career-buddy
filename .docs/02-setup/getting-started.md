# Getting Started

> **TL;DR** `pwsh ./setup.ps1` once → reopen PowerShell → `just install` → `just start` →
> http://localhost:8114. Verify with `just test` (all 834 tests should pass). First page load
> can take up to two minutes.

## Prerequisites

A stock Windows 10/11 machine with PowerShell and winget. Everything else is installed by the
setup script.

## 1. One-time machine setup

```powershell
pwsh ./setup.ps1
```

Idempotent — safe to re-run any time; already-installed tools report `[OK]` and are skipped.
It installs/verifies:

| Tool | Purpose |
| --- | --- |
| Git | version control |
| Node.js LTS + npm | runtime + package manager |
| Claude Code CLI | AI-assisted development (optional day-to-day) |
| uv (+ managed Python) | runs `.claude/` tooling (statusline, skill scripts) |
| just | task runner — all daily commands are `just` recipes |
| GitHub CLI (`gh`) | used by the `/create-pr` and `/commit` skills |

It also seeds `.mcp.json` from the committed `.mcp.json.stub` (git-ignored; fill the GitHub
PAT placeholder by hand if you want the GitHub MCP).

**Then close and reopen PowerShell** so PATH updates land.

## 2. Install dependencies

```powershell
just install
```

Runs `npm ci` (lockfile-exact), then the postinstall chain: `patch-package` (applies
`patches/nuxt-site-config+3.2.18.patch`) and `nuxt prepare` (generates `.nuxt/` types —
required before the typecheck works). Expect ~1000 packages and a minute or two.

## 3. Run it

```powershell
just start        # background window
# or
just dev          # foreground, Ctrl+C to stop
```

Open **http://localhost:8114** (use `localhost`, not `127.0.0.1` — the server binds the IPv6
loopback on Windows). The very first request compiles the page on demand — allow 30–120
seconds. Poll instead of guessing:

```powershell
curl.exe -s -o NUL -w "%{http_code}" http://localhost:8114/    # 200 = up
```

Log in with **`admin` / `admin`** to reach the dashboard side of the app.

Stop with `just stop` — it kills only this repo's node processes.

## 4. Verify the toolchain

```powershell
just test         # all Vitest tests once — expect 843 passed
just typecheck    # full-project TypeScript check — expect 0 errors
just build        # production build — expect "Build complete!"
```

(`just verify` runs test + typecheck in one go.) All three were green at verification time
(2026-08-02); a typecheck error means your working tree introduced a regression — see
[`../06-troubleshooting/common-issues.md`](../06-troubleshooting/common-issues.md).

## Optional: e2e browsers

```powershell
npx playwright install     # once; then:
npm run test:e2e -- --project=chromium
```

The e2e run boots its own dev server on `localhost:3000` — it does not use the :8114 server.

## Related docs

| Doc | Why |
| --- | --- |
| [`../03-development/workflow.md`](../03-development/workflow.md) | What to do after setup |
| [`../05-reference/commands.md`](../05-reference/commands.md) | Full command reference |
| [`../06-troubleshooting/common-issues.md`](../06-troubleshooting/common-issues.md) | When any step above misbehaves |
