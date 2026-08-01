# Skills Catalog — `carreer-buddy-proto`

Project development skills for this Nuxt 3 / Vue 3 / TypeScript / Tailwind + shadcn-vue career-preparation prototype (GitHub, local-only — no CI/CD). Each lives in its own directory with a `SKILL.md`. **Follow the relevant skill before writing code.** Run `/audit-skills` to verify every skill here is registered and that `CLAUDE.md` references only existing skills.

Model tiers: `sonnet` (floor) · `opus` (deep reasoning / generation).

Not included (and why): `monitor-ci` (no CI workflow files in this repo).

## Git

| Skill                           | What it does                                                                                                                                                              | Model  |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| [commit](commit/SKILL.md)       | Conventional-Commits stage + message flow (stale-lock preflight, `git add -A` fast path, scoped stage-by-name). Never auto-commits, never amends, no attribution footer.  | sonnet |
| [create-pr](create-pr/SKILL.md) | Push the current branch and open a GitHub PR into `main` via `gh` / GitHub MCP, with a clean Summary/Changes/Testing body and no attribution footer.                      | opus   |

## Quality & Review

| Skill                                                             | What it does                                                                                                                                  | Model  |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| [pre-pr-review](pre-pr-review/SKILL.md)                           | Self-review the branch diff against a Nuxt 3 / Vue 3 / Tailwind / a11y / SEO checklist; report to `workspace/reports/pr/`.                    | opus   |
| [lint-check](lint-check/SKILL.md)                                 | Run the quality layers (`npx nuxt typecheck` + `just test`); report pass/fail per layer. No ESLint/Prettier in this repo.                     | sonnet |
| [fix-typecheck](fix-typecheck/SKILL.md)                           | Resolve `npx nuxt typecheck` / `vue-tsc` errors at the root cause — never `@ts-ignore`/`as any` — and re-run until clean.                     | sonnet |
| [generate-playwright-tests](generate-playwright-tests/SKILL.md)   | Author `tests/e2e/*.spec.ts` with MCP-derived accessibility-tree locators and two-layer assertions; run and paste the result.                 | opus   |

## MCP tooling

| Skill                                 | What it does                                                                                                  | Model  |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------ |
| [setup-mcp](setup-mcp/SKILL.md)       | Registry-driven MCP setup / onboarding (reads `setup-mcp/registry.json`; wires stub + secret + enable tiers). | opus   |
| [test-all-mcp](test-all-mcp/SKILL.md) | Live per-server smoke-test sweep → PASS/FAIL/SKIP table (prompts in `test-all-mcp/checks/`).                  | sonnet |

## Maintenance

| Skill                                 | What it does                                                                                                     | Model  |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------ |
| [audit-skills](audit-skills/SKILL.md) | Verify every skill has a valid, registered `SKILL.md` (no BOM, valid model, no hardcoded secret) via `audit.py`. | sonnet |

## Planning & handoff

| Skill                                       | What it does                                                                                                        | Model  |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------ |
| [define-goal](define-goal/SKILL.md)         | Interrogate until a goal is unambiguous, then write a stop-proof `{topic}-goal.md` for the built-in `/goal` runner. | opus   |
| [claude-transfer](claude-transfer/SKILL.md) | Pointer-based session-handoff brief to `workspace/reports/transfers/claude/`.                                       | sonnet |
| [llm-transfer](llm-transfer/SKILL.md)       | Self-contained master prompt for an external LLM → `workspace/reports/transfers/{tool}/`.                           | sonnet |
