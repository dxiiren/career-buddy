---
name: generate-playwright-tests
description: Use when the developer says 'generate playwright tests', 'write e2e tests for [page]', 'automate tests for the dashboard', or when authoring any Playwright spec under tests/e2e/ — derives stable accessibility-tree locators via the Playwright MCP (browser_snapshot + browser_generate_locator), writes a two-layer .spec.ts, runs it, and pastes the result before claiming done.
model: opus
---

# generate-playwright-tests — Authoring Rulebook (this repo's `tests/e2e/`)

Write clean, non-brittle Playwright specs for Career Buddy. Specs live in `tests/e2e/` and run
against the dev server on `http://localhost:3000` (see `playwright.config.ts` — its `webServer`
runs `npm run dev` and reuses an already-running :3000 server outside CI, so the final run needs
no manual server). Five projects run by default (chromium, firefox, webkit, Mobile Chrome,
Mobile Safari) — author against `--project=chromium` first. Key targets:

- **`pages/index.vue`** — public landing page: hero, problem, features, how-it-works,
  testimonials carousel, trust badges, FAQ accordion, CTA footer (sections under
  `components/landing/`), plus `AppNavbar` (mobile menu behind a `md:hidden` button) and
  FAQ JSON-LD structured data.
- **`pages/login.vue` / `pages/register.vue`** — mock auth forms (`useAuth` accepts any
  well-formed input; no real backend).
- **`layouts/dashboard.vue` pages** — `/dashboard`, `/chat`, `/resume/**`, `/interview/**`,
  `/job-search/**`, `/networking/**`, `/self-promotion/**`, `/help`, `/settings` — sidebar
  navigation, all data mocked in `composables/`.

Existing specs: `tests/e2e/{landing-page,accessibility,responsive,seo,theme-toggle}.spec.ts`.
**Read the relevant one first and extend it — don't duplicate coverage.** (Note: some existing
specs use `waitForTimeout(...)` and `waitUntil: 'networkidle'`; do NOT copy those patterns into
new tests — see banned patterns.)

## Required MCP: Playwright (mandatory)

This skill derives locators by driving a real browser through the **Playwright MCP**
(`mcp__playwright__*`). Confirm it's available (one `mcp__playwright__browser_navigate` +
`mcp__playwright__browser_snapshot`). If not configured:

> **STOP.** "This skill needs the Playwright MCP — run `/setup-mcp playwright`, then re-run." Do not
> guess CSS selectors from memory; the live accessibility tree is what makes locators stable.

## THE RULE

**Every test verifies real behavior with a two-layer assertion: app/URL state AND rendered UI. Never
an OR'd success branch. Never `await expect(el).toBeVisible()` as the _only_ check after a user
action** — the element was probably already visible.

## Workflow

1. **Pick the target page and read its `.vue` source** (plus its section components and the
   composable behind it) — the roles, labels, `id`s, and `useSeo` meta. Assertions come from the
   code + intended behavior, not guesses.
2. **Start a server to author against.** For deriving locators, run the kit dev server and poll:
   ```bash
   just start           # http://localhost:8114 (background)
   # poll: curl.exe -s -o NUL -w "%{http_code}" http://localhost:8114/
   ```
   (The final `npm run test:e2e` run boots its own dev server on **:3000** via the config's
   `webServer` — `just start`'s :8114 instance is only for interactive locator derivation.)
3. **Derive selectors via the MCP** — never hand-write brittle CSS:
   - `mcp__playwright__browser_navigate` to the page (on :8114).
   - `mcp__playwright__browser_snapshot` — read the accessibility tree, find the target node.
   - `mcp__playwright__browser_generate_locator` on that node — get a stable role/name locator.
   - `mcp__playwright__browser_verify_text_visible` / `browser_verify_element_visible` to sanity-check
     an assertion before you bake it into the spec.
4. **Author the spec** following Part B below (`tests/e2e/<page>.spec.ts`).
5. **Run it and paste the result** (mandatory — see bottom).

## PART B — Authoring rules

### Role-based locators (accessibility-tree first)

Prefer role/label/text over CSS. Fall back to `#id` / `.class` only where semantically unique.

```ts
page.getByRole('button', { name: 'Get Started' })
page.getByRole('link', { name: 'Login' })
page.getByRole('heading', { level: 1 })
page.getByLabel('Email')
page.getByRole('navigation')
```

### Web-first assertions (auto-retrying)

`await expect(locator).toBeVisible()` — never `expect(await locator.isVisible()).toBe(true)` (samples
once, races). Give every `expect` a message second-arg.

### `waitFor` before assert — never arbitrary sleeps

For scroll-reveal sections, the testimonials carousel, and any animated content, wait for the
_condition_, not a timer:

```ts
// GOOD — waits for the actual content
await expect(
  page.getByRole('heading', { name: /how it works/i })
).toBeVisible({ timeout: 10_000 })

// BANNED
await page.waitForTimeout(2000)
```

### Two-layer assertions for stateful actions

| Action                        | State layer                                                       | Visible layer                                          |
| ----------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------ |
| Nav link click (`Login`)      | `await expect(page).toHaveURL(/\/login/)`                         | login form heading + fields visible                    |
| Mock login submit             | `await expect(page).toHaveURL(/\/dashboard/)`                     | dashboard greeting/widgets visible                     |
| FAQ accordion toggle          | trigger `aria-expanded` flips to `"true"`                         | the answer text visible                                |
| Theme toggle                  | `<html>` class list gains/loses `light` (dark is the default — see `useTheme`) | a themed surface changes (assert the class, not color) |
| Contact form submit (mock)    | required-field errors gone                                        | success toast/message visible                          |

### BANNED PATTERNS (each is a false green)

| Anti-pattern                                         | Why                                              | Correct form                                                                                            |
| ---------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `page.waitForTimeout(n)`                             | fixed sleep races the app                        | wait for the element/text/attribute                                                                     |
| `waitForLoadState('networkidle')` on Nuxt            | streamed/hydration means it rarely fires cleanly | web-first `expect(locator)` waits                                                                       |
| `const ok = a \|\| b; expect(ok).toBe(true)`         | passes if anything rendered                      | branch on observed state and assert each                                                                |
| `expect(await el.isVisible()).toBe(true)`            | one sample, no retry                             | `await expect(el).toBeVisible()`                                                                        |
| `click(); await expect(el).toBeVisible()` only       | it was already visible                           | assert the _change_ (URL/attribute/text) too                                                            |
| `test.skip()` / `test.fail()` with no reason         | hides gaps                                       | `test.skip(cond, 'explicit reason — <what/why>')`                                                       |
| Watering down an assertion to go green               | bakes a bug into a passing test                  | keep the assertion; if the app is wrong, `test.fail(true, 'BUG: <evidence>')` after verifying in code   |
| Asserting a real AI/chat response                    | the "AI" is mocked canned data                   | assert the mock's actual canned output from `useCareerChat`, labeled as mock                            |
| Brittle CSS from memory (`.grid > div:nth-child(3)`) | breaks on markup change                          | MCP-derived role/name locator                                                                           |
| Hardcoding copy that rotates (carousel testimonial)  | flakes as content changes                        | match the invariant (a role/structure or a regex over the known set)                                    |

### Mobile

The navbar collapses behind a `md:hidden` menu button on mobile (the existing `landing-page.spec.ts`
helper shows the pattern), and the config runs Mobile Chrome/Safari projects. Guard mobile-only
divergence explicitly:

```ts
test('navbar links scroll to section', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Desktop nav links are hidden behind the mobile menu')
  // ...
})
```

### Structure & helpers

- One `test()` per behavior; descriptive names. Group with `test.describe`.
- Keep helpers at the top of the spec; promote to a shared helper file only once a **second** spec
  needs them — not before.
- Use `test.beforeEach` to `page.goto('/')` / `'/dashboard'` (matches the existing specs).

## Self-check before claiming done

- [ ] Locators are MCP-derived role/label/text (CSS only where uniquely semantic).
- [ ] Every stateful action asserts both state AND visible layers.
- [ ] Zero `waitForTimeout` / `networkidle` / OR'd success branches.
- [ ] Every `expect` has a message; every `skip`/`fail`/`fixme` has an explicit reason.
- [ ] No duplicate of existing `tests/e2e/` coverage.
- [ ] Ran the spec against a live server; suite stable (pass / expected-fail / skip only).

## Run and paste — non-negotiable

**Run the spec and paste the `N passed` summary line BEFORE you say "done", "fixed", or "working".**
Never claim success from reading the code alone.

```bash
npm run test:e2e -- tests/e2e/<page>.spec.ts --project=chromium
# one test:      npx playwright test tests/e2e/<page>.spec.ts -g "faq accordion expands"
# interactive:   npm run test:e2e:ui  ·  report: npx playwright show-report
```

First-ever run needs browsers: `npx playwright install` (chromium alone is enough for authoring).
Paste the final `N passed, N failed, N skipped` line in your reply. If you didn't run it, the claim is
unverified.

## Companion skills

- `/pre-pr-review` — run before opening the PR (checks coverage + a11y/SEO).
- `/lint-check` — typecheck + unit/functional suite before you rely on the app's behavior.
