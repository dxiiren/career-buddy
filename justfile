# Career Buddy justfile — development recipes

set shell := ["powershell.exe", "-NoProfile", "-Command"]

port := env_var_or_default('PORT', '8114')

# List available recipes
default:
    @just --list

# ─── Guards ───────────────────────────────────────────────

# Node/npm — installed by setup.ps1; needed by every recipe here.
[private]
_require-node:
    @if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { Write-Error "Node/npm not found on PATH.`n  -> Run setup.ps1 first:  pwsh ./setup.ps1"; exit 1 }

# ─── App lifecycle ───────────────────────────────────────

# Install dependencies (npm ci when the lockfile allows, else npm install).
install: _require-node
    if (Test-Path package-lock.json) { npm ci } else { npm install }

# Runs `stop` first so a previous run's server doesn't linger. The dev server's node
# process carries this repo's node_modules path on its command line — that's how
# `stop` scopes the kill to THIS project.
# Start the dev server on http://localhost:{{port}} (background window).
start: _require-node stop
    Start-Process powershell -ArgumentList "-NoProfile", "-Command", "cd '{{justfile_directory()}}'; npm run dev -- --port {{port}}"
    Start-Sleep -Seconds 2
    Write-Host "Started: http://localhost:{{port}}  (stop with: just stop)"

# Dev server in the FOREGROUND (Ctrl+C to stop).
dev: _require-node
    npm run dev -- --port {{port}}

# Matches node whose command line contains this repo's path (trailing '\').
# Stop only THIS project's node.exe processes, not every node on the box.
stop:
    $procs = @(Get-CimInstance Win32_Process -Filter "Name = 'node.exe'" | Where-Object { $_.CommandLine -like '*{{justfile_directory()}}\*' }); $procs | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }; Write-Host "Stopped $($procs.Count) project node.exe process(es)"

# Production build (Nitro server bundle in .output/).
build: _require-node
    npm run build

# The Nitro server behind `nuxt preview` reads the port from $env:PORT.
# Preview the production build on http://localhost:{{port}} (needs `just build` first).
preview: _require-node
    $env:PORT='{{port}}'; npm run preview

# ─── Quality ─────────────────────────────────────────────

# Run ALL Vitest tests once (unit + functional; `--run` disables watch mode).
test *flags: _require-node
    npm run test -- --run {{flags}}

# Run unit tests only (tests/unit — composables).
test-unit: _require-node
    npm run test:unit

# Run functional tests only (tests/functional — components).
test-functional: _require-node
    npm run test:functional

# Reporters and thresholds come from vitest.config.ts (text to console; json +
# html into the git-ignored coverage/). The thresholds are set just under the
# measured numbers, so a drop fails here instead of going unnoticed.
# Run all Vitest tests once with coverage, enforcing the thresholds.
test-coverage: _require-node
    npm run test:coverage

# Boots its OWN dev server on :3000 (playwright.config.ts webServer) across five
# browser projects, and needs the browsers once: `npx playwright install`.
# Playwright end-to-end specs (tests/e2e). Not part of `verify` — see verify-all.
e2e *flags: _require-node
    npm run test:e2e -- {{flags}}

# Full-project TypeScript check (vue-tsc via nuxt). Baseline is ZERO errors.
typecheck: _require-node
    npx nuxt typecheck

# Coverage instead of a plain run because it costs no measurable time here and
# is the only thing enforcing the thresholds.
# Full quality gate: all Vitest tests (coverage-gated) + typecheck. Before pushing.
verify: test-coverage typecheck
    Write-Host "verify OK: tests green + coverage above thresholds + typecheck clean"

# Deliberately separate from `verify`: Playwright here runs every spec across
# chromium, firefox, webkit and two mobile profiles, so it is minutes rather
# than seconds and needs three browser engines downloaded. Making the pre-push
# gate depend on that reds the repo on any machine that has not run
# `npx playwright install`, for reasons unrelated to the change being pushed.
# Everything, browsers included. Run before a release or after touching the UI.
verify-all: verify e2e
    Write-Host "verify-all OK: verify gate + Playwright e2e green"

# ─── Tools ───────────────────────────────────────────────

# Launch Claude Code with all permissions — Sonnet (latest)
claudex:
    claude --dangerously-skip-permissions --model sonnet

# Launch Claude Code with all permissions — Opus (latest)
claudeo:
    claude --dangerously-skip-permissions --model opus

# Launch Claude Code with all permissions — Haiku (latest)
claudeh:
    claude --dangerously-skip-permissions --model haiku
