import { defineConfig, devices } from '@playwright/test'

// A port of our own, next to the kit's :8114 — NOT the :3000 default, which every
// other Node project on a dev box also claims. Override with E2E_PORT if 8115 is
// taken on your machine.
const PORT = Number(process.env.E2E_PORT ?? 8115)
const BASE_URL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 2,
  reporter: 'html',
  // The specs navigate with `waitUntil: 'networkidle'` against a Vite DEV server, and
  // this repo's own docs put a cold first load at 30-120s while Vite warms up. A 30s
  // navigationTimeout sat inside that window, so the first navigations of a run could
  // time out and be reported as test failures that had nothing to do with the app.
  // These bounds clear the documented warm-up; they are a floor for infrastructure,
  // not slack for assertions (expect() still uses its own 5s).
  timeout: 90000,
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    navigationTimeout: 60000,
    actionTimeout: 15000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  // reuseExistingServer stays FALSE everywhere. Adopting whatever already answers
  // on the port is how this suite once ran its whole matrix against a different
  // app on :3000 and reported 77 failures that had nothing to do with this repo.
  // A busy port must fail loudly here, not silently swap the system under test.
  webServer: {
    command: `npm run dev -- --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: false,
    timeout: 120 * 1000,
  },
})
