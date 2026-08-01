---
name: test-all-mcp
description: "Use when the developer says 'test all mcp', 'check mcp status', 'are the mcps working', 'mcp health check', 'test the mcp servers', or 'which mcps are up' — builds the MCP roster from the real config, then in the LIVE session calls each enabled server's smoke-test tool from checks/ and reports a per-server PASS/FAIL/SKIP table. Also the home for the per-server .txt check prompts that setup-mcp writes."
model: sonnet
---

# Test All MCP — live MCP health check

Walks every MCP server this repo wires and reports its status in one pass. MCP servers load at Claude
**session start**, so in a normal session their `mcp__<server>__*` tools are already available — this
skill **calls them for real** and judges each against a concrete PASS criterion. It is the live-session
counterpart to `setup-mcp`'s restart-gated single-server check: same `checks/*.txt` prompts, run at once.

The per-server smoke-test prompts live in [`checks/`](checks/). `setup-mcp` drops a new server's
`checks/<server>.txt` here whenever an MCP is onboarded — so this skill always covers the full inventory.

## Trigger

- "test all mcp" / "test the mcp servers" / "test every mcp"
- "check mcp status" / "mcp status" / "which mcps are up"
- "are the mcps working" / "mcp health check"
- Or names one server: "test the github mcp" / "check context7" (run just that row).

## Procedure

### 1. Build the roster (from the real config)

Read the config files — they are the ground truth, not memory:

- **`.claude/settings.json` → `enabledMcpjsonServers`** = the turnkey servers (currently
  `context7`, `playwright`).
- **`.claude/settings.local.json` → `enabledMcpjsonServers`** (git-ignored, may not exist) = the
  per-dev opt-ins (`github`).
- **`checks/`** = which servers have a smoke prompt.

The **TO TEST** list = servers that are enabled **and** have a `checks/<server>.txt`. A server that isn't
enabled for this dev/machine is a **SKIP** (not a FAIL). A server enabled with no check prompt is a
gap → note it (author `checks/<server>.txt`).

### 2. Run each server's smoke test (live, in this session)

For every server in TO TEST:

1. **Read** `checks/<server>.txt` — it names the exact tool (`mcp__<server>__<tool>`), its args, and the
   concrete PASS criterion.
2. **Load the schema if the tool is deferred.** Most MCP tools are surfaced as _deferred_ (name only).
   Before the first call to a server, run `ToolSearch` with `select:mcp__<server>__<tool>` to load its
   schema, then call it. If a server was _still connecting_ at session start, re-run `ToolSearch` after a
   moment.
3. **Call** the tool with the args from the `.txt`.
4. **Judge** the result against the `.txt`'s PASS criterion.

**Parallelize.** These are lightweight calls (one or two per server) — fire several in a single message
(parallel tool calls, not subagents) to keep it fast.

### 3. Classify each server

| Verdict  | When                                                                                                                                  |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **PASS** | tool returned the expected value/shape from the `.txt` criterion                                                                      |
| **FAIL** | tool is enabled but errored / returned wrong data (and it is not a known non-failure below)                                           |
| **SKIP** | not enabled for this dev, or a precondition is absent (dev server down, PAT not filled in)                                            |

**Bake in the known non-failures** — do not misread these as FAIL:

- **playwright (localhost:8114)** — needs `just start` running. With the dev server stopped, a
  connection-refused is a SKIP, not a FAIL (retest against about:blank — still proves the MCP works).
  First-ever call may need `npx playwright install chromium`.
- **github** — a 401/403 = PAT wrong/expired/missing scopes → `/setup-mcp github`. Not enabled for
  this dev → SKIP.
- **context7** — keyless remote HTTP; a transient rate-limit is a retry, not a FAIL.

### 4. Report

Print the status table (SERVER · ENABLED · CONNECTED · VERDICT · NOTE), then a one-line summary:
`N PASS / M FAIL / K SKIP`. Call out any FAIL with the fix pointer (usually `/setup-mcp <server>`).

```text
SERVER            ENABLED     CONNECTED  VERDICT  NOTE
context7          turnkey     yes        PASS     resolved /vuejs/vue
playwright        turnkey     yes        PASS     snapshot returned
github            per-dev     yes        PASS     login: dxiiren
```

Offer to save the table to `.claude/workspace/reports/audits/mcp-status/<YYYY-MM-DD>.md` if the developer
wants it tracked over time — default is in-session only.

## Keeping this skill in sync

This skill's coverage **is** the set of `checks/*.txt`. Whenever an MCP is onboarded or changed, its check
prompt must live here — `setup-mcp` does this automatically (writes `checks/<server>.txt` + a
`checks/README.txt` line). If you add one by hand, do the same: one `.txt` (tool + args + concrete PASS
criterion + known non-failures) + one index line. Removing a server: delete its `checks/<server>.txt` and
its stub/config entry.

## Anti-Patterns

- **Do NOT** report a server as broken without reading its `checks/<server>.txt` criterion first — a
  per-dev server that's simply not enabled, or a known non-failure, is a **SKIP**, never a FAIL.
- **Do NOT** guess the roster from memory or from the session-start "connecting" list — read
  `settings.json` + `settings.local.json`; they are the ground truth.
- **Do NOT** spawn a server + `tools/list` handshake as a stand-in for a real call — in a live session the
  `mcp__<server>__*` tools already exist; call them.
- **Do NOT** call a deferred tool before loading its schema with `ToolSearch` — it fails with
  `InputValidationError`. Load, then call.
- **Do NOT** hardcode any credential here — the check prompts reference tool names and expected shapes
  only; secrets stay in `.mcp.json`.
