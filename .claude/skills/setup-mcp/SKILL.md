---
name: setup-mcp
description: "Use when the developer says 'Setup {X} MCP', 'Add {X} MCP', 'Install {X} MCP', 'onboard an MCP', or names a capability/URL to wire up — the ONE MCP skill for this repo. Reads registry.json for the server's setup metadata and walks the committed-stub + git-ignored-secret + tiered-enable wiring. Also onboards a NEW server by adding a registry record (never authoring a per-server skill)."
model: opus
---

# Setup MCP — the one registry-driven MCP skill

Every MCP for this repo is a **data record in `registry.json`**. Setting one up = read its record,
then do the standard wiring. Onboarding a new one = **add a record**, not author a new skill. This
skill does two jobs:

- **Job A — set up an already-registered server** for a developer (the roster in CLAUDE.md
  `## MCP Servers`): resolve the name → its `registry.json` record → wire config + enablement → verify.
- **Job B — onboard a NEW capability**: research the best-in-class server, then **wire in a registry
  record** + stub block + check prompt + a CLAUDE.md mention, and verify.

## Files & where each kind of content lives

Config never duplicates. Each type of content has exactly one home:

| Content type                                                           | Home                                                                       |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `command` / `args` / `url` / `headers`                                 | `.mcp.json.stub` (committed placeholders) + `.mcp.json` (git-ignored real) |
| setup metadata (installType, secret, enableTier, endpoint, setup note) | the `registry.json` record                                                 |
| "when to use this MCP" prose                                           | the CLAUDE.md `## MCP Servers` section                                     |
| the smoke test                                                         | `test-all-mcp/checks/{server}.txt`                                         |

`registry.json` is the single source of truth for per-server setup. Each record carries: `name`,
`purpose`, `installType` (`http`/`npx`/`sse`/`node`), `secret` (`none`/`PAT`/`OAuth`/`seat`),
`enableTier` (`turnkey`/`per-dev`/`conditional`), `endpointOrPackage`, and a `setup` note.

## The wiring mechanism (same for every server)

1. **Config** — real values live in the **git-ignored `.mcp.json`**; the committed `.mcp.json.stub`
   holds the same block with `REPLACE_WITH_...` placeholders for any secret. Merge under `mcpServers`,
   never overwrite or duplicate. On a fresh machine `setup.ps1` seeds `.mcp.json` from the stub —
   fill in real secrets in `.mcp.json` only.
2. **Enablement** by the record's `enableTier`:
   - `turnkey` → the name is in `enabledMcpjsonServers` in the **committed `.claude/settings.json`**
     (already true for context7, playwright).
   - `per-dev` (secret/OAuth: github) → add the name to `enabledMcpjsonServers` in the
     **git-ignored `.claude/settings.local.json`** — never the committed settings.
   - `conditional` → off by default; opt in the same per-dev way only when you actually use it.
3. **Secrets never in git.** A PAT/token goes only in `.mcp.json` (git-ignored); OAuth servers carry
   no token in config — they do a browser login on first use. This repo has NO secret-scanning
   hooks, so the git-ignore discipline is the only guard — double-check `git status` before any
   commit that touches MCP config.

## Job A — set up an already-registered server

1. **Resolve** `{X}` to a record in `registry.json` (match the server name / capability,
   case-insensitive). If it resolves to no record → it's a NEW capability → **Job B**.
2. **Read the record** — note `installType`, `secret`, `enableTier`, `endpointOrPackage`, and the
   `setup` note. Follow the `setup` note verbatim (e.g. github PAT scopes, playwright's Chromium
   install).
3. **Wire config + enablement** per the mechanism above for this server's `installType`/`enableTier`.
4. **Verify (restart-gated)** — MCP servers load at Claude **session start**, so a newly wired
   server's `mcp__{server}__*` tools appear only after a restart. Tell the developer to restart
   Claude, run `test-all-mcp/checks/{server}.txt` in a fresh session, and paste the result; judge
   PASS/FAIL against that file's criterion. Never claim it works before the developer confirms
   post-restart.

## Job B — onboard a NEW capability (research → wire in a record)

1. **Research (official sources, never from memory).** Find the best server: repo & maintainer
   (prefer first-party/official), install type (http/npx/sse/node), auth model + exact scope,
   version/prereq gates, whether it's turnkey or secret-bearing. Dispatch parallel subagents for
   breadth. Present a one-paragraph verdict to the developer and get a nod **before** wiring. For a
   git-URL input (an internal Node server), clone/build to `dist/index.js` and use `command: node`
   + an absolute forward-slash path.
2. **Add the registry record** — one entry under `servers` in `registry.json` with all fields
   (`name`, `purpose`, `installType`, `secret`, `enableTier`, `endpointOrPackage`, `setup`).
   Turnkey vs secret-bearing (from step 1) drives `enableTier`.
3. **Config** — add the block to `.mcp.json.stub` (placeholders if secret) and to the git-ignored
   `.mcp.json` (real). Enable per the tier (committed `settings.json` for turnkey;
   `settings.local.json` for per-dev/conditional). Add `permissions.deny` rules in the committed
   `settings.json` if the server has destructive tools you must lock out.
4. **Check prompt** — write `test-all-mcp/checks/{server}.txt` (exact `mcp__{server}__{tool}` + args
   + concrete PASS criterion + known non-failures) and add its line to `checks/README.txt`. This is
   both the restart-gated single-server test and how the server joins the `test-all-mcp` sweep.
5. **Docs** — mention the server in the CLAUDE.md `## MCP Servers` section (purpose, secret, enable
   tier). No new skill, no README skill row.
6. **Verify** — restart-gated, as in Job A step 4.

## Anti-Patterns

- **Never author a new `setup-{x}-mcp` skill** — onboarding is a `registry.json` record. One skill.
- **Never** put a real token/PAT/password in any committed file (SKILL.md, `registry.json`, the stub,
  `settings.json`). Placeholders / KEY names only.
- **Never** enable a secret-bearing server (github) in the committed `settings.json` — per-dev via
  `settings.local.json`.
- **Never** answer a research question (repo, install type, auth scope, version gate) from memory —
  verify against the official source in Job B step 1.
- **Never** script an in-session MCP handshake as a stand-in for the restart-gated
  `checks/{server}.txt` test — the tools don't exist until Claude restarts.
