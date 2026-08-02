import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    testTimeout: 15000,
    hookTimeout: 15000,
    environmentOptions: {
      nuxt: {
        domEnvironment: 'happy-dom',
      },
    },
    include: ['tests/unit/**/*.{test,spec}.{js,ts}', 'tests/functional/**/*.{test,spec}.{js,ts}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'components/**/*.vue',
        'composables/**/*.ts',
        'layouts/**/*.vue',
        'lib/**/*.ts',
      ],
      // A ratchet, not an aspiration: each number sits just under what the
      // suite measures today (97.08 / 91.89 / 74.22 statements / branches /
      // functions), with only enough slack that unrelated churn does not red
      // the gate. Coverage costs no measurable time here, so `just verify`
      // runs it — a threshold nothing enforces is a comment.
      //
      // Raise these when the real number rises. Never lower one to go green.
      thresholds: {
        statements: 96,
        branches: 90,
        functions: 72,
        lines: 96,
      },
    },
  },
})
