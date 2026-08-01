#!/usr/bin/env pwsh

# Career Buddy Bootstrap Setup
#
# Installs required development tools for local development.
# Works on a FRESH PC -- only prerequisites are PowerShell and winget.
# Safe to re-run (idempotent) -- skips tools that are already installed.
#
# Usage: pwsh ./setup.ps1   or   powershell -ExecutionPolicy Bypass -File ./setup.ps1
# Note: run from PowerShell, NOT cmd.exe.

$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $false

function Test-Command($Name) {
    $null -ne (Get-Command $Name -ErrorAction SilentlyContinue)
}

function Refresh-Path {
    # Reload PATH from registry so newly installed tools are found in this session
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" +
                [System.Environment]::GetEnvironmentVariable("Path", "User")
}

function Install-Winget($PackageId, $DisplayName) {
    Write-Host "[INSTALL] Installing $DisplayName via winget ($PackageId)..." -ForegroundColor Yellow
    $savedEAP = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    & winget install --id $PackageId --exact --silent --accept-package-agreements --accept-source-agreements 2>&1 | Out-Host
    $code = $LASTEXITCODE
    $ErrorActionPreference = $savedEAP
    Refresh-Path
    # winget returns 0 on fresh install, -1978335189 (0x8A15002B) when already installed -- both are fine
    return ($code -eq 0 -or $code -eq -1978335189)
}

function Add-UserPath($Dir) {
    if (-not (Test-Path $Dir)) { return }
    $userPath = [System.Environment]::GetEnvironmentVariable("Path", "User")
    if ($userPath -notlike "*$Dir*") {
        [System.Environment]::SetEnvironmentVariable("Path", "$userPath;$Dir", "User")
        Write-Host "[INFO] Added $Dir to User PATH" -ForegroundColor Yellow
    }
    Refresh-Path
}

Write-Host ""
Write-Host "Career Buddy Bootstrap Setup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# ---------- 0. Prerequisites check ----------
Refresh-Path
$hasWinget = Test-Command "winget"
if (-not $hasWinget) {
    Write-Host "[WARN] winget not found. Auto-install for Git/Node will be skipped." -ForegroundColor Yellow
    Write-Host "       Install App Installer from the Microsoft Store to enable winget." -ForegroundColor DarkGray
}

# ---------- 1. Git ----------
Refresh-Path
if (Test-Command "git") {
    Write-Host "[OK] Git already installed: $(git --version)" -ForegroundColor Green
} elseif ($hasWinget) {
    if (Install-Winget "Git.Git" "Git") {
        Refresh-Path
        if (Test-Command "git") {
            Write-Host "[OK] Git installed: $(git --version)" -ForegroundColor Green
        } else {
            Write-Host "[FAIL] Git installed but not on PATH. Close and reopen PowerShell, then re-run." -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "[FAIL] Git install failed via winget" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "[FAIL] Git missing and winget unavailable. Install from https://git-scm.com/download/win" -ForegroundColor Red
    exit 1
}

# ---------- 2. Node.js (LTS) ----------
Refresh-Path
if (Test-Command "node") {
    Write-Host "[OK] Node.js already installed: $(node -v)" -ForegroundColor Green
} elseif ($hasWinget) {
    if (Install-Winget "OpenJS.NodeJS.LTS" "Node.js (LTS)") {
        Refresh-Path
        if (Test-Command "node") {
            Write-Host "[OK] Node.js installed: $(node -v)" -ForegroundColor Green
        } else {
            Write-Host "[FAIL] Node.js installed but not on PATH. Close and reopen PowerShell, then re-run." -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "[FAIL] Node.js install failed via winget" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "[FAIL] Node.js missing and winget unavailable. Install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# ---------- 3. Claude Code CLI ----------
Refresh-Path
if (Test-Command "claude") {
    $claudeVer = & claude --version 2>&1 | Select-Object -First 1
    Write-Host "[OK] Claude Code already installed: $claudeVer" -ForegroundColor Green
} else {
    Write-Host "[INSTALL] Installing Claude Code via npm..." -ForegroundColor Yellow
    $savedEAP = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    & npm install -g "@anthropic-ai/claude-code" 2>&1 | Out-Host
    $ErrorActionPreference = $savedEAP
    Refresh-Path
    if (Test-Command "claude") {
        $claudeVer = & claude --version 2>&1 | Select-Object -First 1
        Write-Host "[OK] Claude Code installed: $claudeVer" -ForegroundColor Green
    } else {
        Write-Host "[WARN] Claude Code install failed -- check npm output above" -ForegroundColor Yellow
    }
}

# ---------- 4. uv (Python package manager / tool runner) ----------
Refresh-Path
if (Test-Command "uv") {
    $uvVer = & uv --version 2>&1 | Select-Object -First 1
    Write-Host "[OK] uv already installed: $uvVer" -ForegroundColor Green
} else {
    Write-Host "[INSTALL] Installing uv..." -ForegroundColor Yellow
    Invoke-RestMethod https://astral.sh/uv/install.ps1 | Invoke-Expression
    Refresh-Path
    if (-not (Test-Command "uv")) {
        Write-Host "[FAIL] uv installed but not found on PATH. Close and reopen PowerShell, then re-run this script." -ForegroundColor Red
        exit 1
    }
    $uvVer = & uv --version 2>&1 | Select-Object -First 1
    Write-Host "[OK] uv installed: $uvVer" -ForegroundColor Green
}

# Ensure uv's tool bin directory is registered in PATH
$uvToolBin = & uv tool dir --bin 2>&1 | Select-Object -First 1
if ($uvToolBin) { Add-UserPath $uvToolBin }

# ---------- 5. Python (used by .claude tooling, e.g. the statusline + skill scripts) ----------
Write-Host "[INFO] Ensuring Python is available via uv..." -ForegroundColor Cyan
$savedEAP = $ErrorActionPreference
$ErrorActionPreference = 'Continue'
& uv python install 2>&1 | Out-Null
$ErrorActionPreference = $savedEAP
$pyPath = & uv python find 2>&1 | Select-Object -First 1
if ($pyPath) {
    Write-Host "[OK] Python managed by uv: $pyPath" -ForegroundColor Green
} else {
    Write-Host "[FAIL] Failed to install Python via uv" -ForegroundColor Red
    exit 1
}

# ---------- 6. just (task runner) ----------
Refresh-Path
if (Test-Command "just") {
    $justVer = & just --version 2>&1 | Select-Object -First 1
    Write-Host "[OK] just already installed: $justVer" -ForegroundColor Green
} else {
    Write-Host "[INSTALL] Installing just..." -ForegroundColor Yellow
    & uv tool install rust-just
    Refresh-Path
    if (Test-Command "just") {
        $justVer = & just --version 2>&1 | Select-Object -First 1
        Write-Host "[OK] just installed: $justVer" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] just installed but not found on PATH" -ForegroundColor Red
        exit 1
    }
}

# ---------- 7. GitHub CLI ----------
# Used by the /create-pr and /commit skills. Run `gh auth login` once interactively.
Refresh-Path
if (Test-Command "gh") {
    Write-Host "[OK] GitHub CLI already installed: $(gh --version 2>&1 | Select-Object -First 1)" -ForegroundColor Green
} elseif ($hasWinget) {
    if (Install-Winget "GitHub.cli" "GitHub CLI") {
        Refresh-Path
        if (Test-Command "gh") {
            Write-Host "[OK] GitHub CLI installed: $(gh --version 2>&1 | Select-Object -First 1)" -ForegroundColor Green
            Write-Host "     Next: run 'gh auth login' once to authenticate." -ForegroundColor DarkGray
        } else {
            Write-Host "[WARN] GitHub CLI installed but not on PATH. Close and reopen PowerShell." -ForegroundColor Yellow
        }
    } else {
        Write-Host "[WARN] GitHub CLI install failed via winget" -ForegroundColor Yellow
    }
} else {
    Write-Host "[WARN] GitHub CLI skipped -- winget unavailable. Install from https://cli.github.com/" -ForegroundColor Yellow
}

# ---------- 8. Claude MCP config (.mcp.json from stub) ----------
Write-Host ""
Write-Host "Configuring Claude MCP servers..." -ForegroundColor Cyan
$mcpStub = Join-Path $PSScriptRoot ".mcp.json.stub"
$mcpJson = Join-Path $PSScriptRoot ".mcp.json"
if (Test-Path $mcpJson) {
    Write-Host "[OK] .mcp.json already exists -- leaving your local config untouched." -ForegroundColor Green
} elseif (Test-Path $mcpStub) {
    Copy-Item $mcpStub $mcpJson
    Write-Host "[OK] Created .mcp.json from .mcp.json.stub (git-ignored -- never committed)." -ForegroundColor Green
    Write-Host "     Fill REPLACE_WITH_* placeholders (GitHub PAT) by hand." -ForegroundColor DarkGray
} else {
    Write-Host "[INFO] No .mcp.json.stub found -- skipping MCP setup." -ForegroundColor Cyan
}

# ---------- Final verification ----------
Refresh-Path
Write-Host ""
Write-Host "Verifying installations..." -ForegroundColor Cyan
$missing = @()
foreach ($tool in @('git','node','npm','claude','uv','just','gh')) {
    if (Test-Command $tool) {
        Write-Host "  [OK] $tool" -ForegroundColor Green
    } else {
        Write-Host "  [MISSING] $tool" -ForegroundColor Red
        $missing += $tool
    }
}
if ($missing.Count -gt 0) {
    Write-Host ""
    Write-Host "[WARN] Some tools not found on PATH in this session: $($missing -join ', ')" -ForegroundColor Yellow
    Write-Host "       CLOSE AND REOPEN PowerShell and run them to confirm." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""

# ---------- Next steps (manual) ----------
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Install dependencies:            just install" -ForegroundColor Gray
Write-Host "  2. Start the dev server (:8114):  just start   (foreground: just dev)" -ForegroundColor Gray
Write-Host "  3. Production build check:          just build" -ForegroundColor Gray
Write-Host "  4. Login to Claude Code:            claude" -ForegroundColor Gray
Write-Host ""
