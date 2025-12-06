import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ref } from 'vue'
import ErrorPage from '../../app/error.vue'

// Mock useTheme composable
vi.mock('../../composables/useTheme', () => ({
  useTheme: () => ({
    theme: ref('light'),
    initTheme: vi.fn(),
    toggleTheme: vi.fn(),
  }),
}))

// Mock clearError
const mockClearError = vi.fn()
vi.stubGlobal('clearError', mockClearError)

describe('ErrorPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  // ==========================================
  // Error Display Tests
  // ==========================================

  describe('Error Display', () => {
    it('renders 404 error correctly', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: {
            statusCode: 404,
            statusMessage: 'Not Found',
          },
        },
      })

      expect(wrapper.text()).toContain('404')
      expect(wrapper.text()).toContain('Page Not Found')
      expect(wrapper.text()).toContain("The page you're looking for doesn't exist")
    })

    it('renders 500 error correctly', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: {
            statusCode: 500,
            statusMessage: 'Server Error',
          },
        },
      })

      expect(wrapper.text()).toContain('500')
      expect(wrapper.text()).toContain('Server Error')
      expect(wrapper.text()).toContain('technical difficulties')
    })

    it('renders 403 error correctly', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: {
            statusCode: 403,
            statusMessage: 'Forbidden',
          },
        },
      })

      expect(wrapper.text()).toContain('403')
      expect(wrapper.text()).toContain('Access Denied')
      expect(wrapper.text()).toContain("don't have permission")
    })

    it('renders generic error for unknown status codes', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: {
            statusCode: 418,
            message: 'Custom error message',
          },
        },
      })

      expect(wrapper.text()).toContain('418')
      expect(wrapper.text()).toContain('Oops! Something went wrong')
      expect(wrapper.text()).toContain('Custom error message')
    })

    it('shows fallback message when no custom message provided', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: {
            statusCode: 999,
          },
        },
      })

      expect(wrapper.text()).toContain('An unexpected error occurred')
    })
  })

  // ==========================================
  // Layout and Branding Tests
  // ==========================================

  describe('Layout and Branding', () => {
    it('renders Career Buddy logo and branding', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      expect(wrapper.text()).toContain('Career Buddy')
    })

    it('has header with navigation to home', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      const headerLink = wrapper.find('header a')
      expect(headerLink.exists()).toBe(true)
      expect(headerLink.attributes('href')).toBe('/')
    })

    it('renders footer with copyright', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      const currentYear = new Date().getFullYear()
      expect(wrapper.text()).toContain(`© ${currentYear}`)
      expect(wrapper.text()).toContain('Career Buddy')
      expect(wrapper.text()).toContain('All rights reserved')
    })

    it('has proper page structure (header, main, footer)', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      expect(wrapper.find('header').exists()).toBe(true)
      expect(wrapper.find('main').exists()).toBe(true)
      expect(wrapper.find('footer').exists()).toBe(true)
    })
  })

  // ==========================================
  // Action Buttons Tests
  // ==========================================

  describe('Action Buttons', () => {
    it('renders Go Home button', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      expect(wrapper.text()).toContain('Go Home')
    })

    it('renders Try Again button', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      expect(wrapper.text()).toContain('Try Again')
    })

    it('has at least 2 action buttons', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      const buttons = wrapper.findAll('button')
      expect(buttons.length).toBeGreaterThanOrEqual(2)
    })
  })

  // ==========================================
  // Snake Game Section Tests
  // ==========================================

  describe('Snake Game Section', () => {
    it('renders game section with heading', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      expect(wrapper.text()).toContain("While you're here, play a game!")
    })

    it('renders game instructions', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      expect(wrapper.text()).toContain('arrow keys')
      expect(wrapper.text()).toContain('WASD')
      expect(wrapper.text()).toContain('Space')
    })

    it('renders game canvas element', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      const canvas = wrapper.find('canvas')
      expect(canvas.exists()).toBe(true)
    })

    it('canvas has correct dimensions', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      const canvas = wrapper.find('canvas')
      // GRID_SIZE = 20, CELL_SIZE = 15, so dimensions = 300x300
      expect(canvas.attributes('width')).toBe('300')
      expect(canvas.attributes('height')).toBe('300')
    })

    it('displays score counter', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      expect(wrapper.text()).toContain('Score:')
    })

    it('displays high score counter', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      expect(wrapper.text()).toContain('High Score:')
    })

    it('renders Start Game button initially', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      expect(wrapper.text()).toContain('Start Game')
    })

    it('game section has proper card styling', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      // Find the game card container
      const gameCard = wrapper.find('.rounded-2xl.bg-card.border')
      expect(gameCard.exists()).toBe(true)
    })

    it('has gamepad icon in game section', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      // Check for Gamepad2 icon (lucide renders as svg with class)
      const icons = wrapper.findAll('svg')
      expect(icons.length).toBeGreaterThan(0)
    })
  })

  // ==========================================
  // Speed Control Tests
  // ==========================================

  describe('Speed Control', () => {
    it('renders speed control section', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      expect(wrapper.text()).toContain('Speed:')
    })

    it('renders all four speed options', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      expect(wrapper.text()).toContain('Slow')
      expect(wrapper.text()).toContain('Normal')
      expect(wrapper.text()).toContain('Fast')
      expect(wrapper.text()).toContain('Insane')
    })

    it('has four speed control buttons', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      // Find speed control buttons (they have specific classes)
      const speedButtons = wrapper.findAll('button').filter((btn) => {
        const text = btn.text()
        return text === 'Slow' || text === 'Normal' || text === 'Fast' || text === 'Insane'
      })

      expect(speedButtons.length).toBe(4)
    })

    it('Normal speed is selected by default', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      // Find the Normal button and check it has active styling
      const normalButton = wrapper.findAll('button').find((btn) => btn.text() === 'Normal')
      expect(normalButton).toBeDefined()
      expect(normalButton?.classes()).toContain('bg-primary')
    })

    it('speed buttons are clickable', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      const slowButton = wrapper.findAll('button').find((btn) => btn.text() === 'Slow')
      expect(slowButton).toBeDefined()

      // Click the Slow button
      await slowButton?.trigger('click')

      // Verify Slow is now active
      expect(slowButton?.classes()).toContain('bg-primary')
    })

    it('clicking speed button changes active state', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      // Initially Normal should be active
      let normalButton = wrapper.findAll('button').find((btn) => btn.text() === 'Normal')
      expect(normalButton?.classes()).toContain('bg-primary')

      // Click Fast button
      const fastButton = wrapper.findAll('button').find((btn) => btn.text() === 'Fast')
      await fastButton?.trigger('click')

      // Now Fast should be active, Normal should not
      expect(fastButton?.classes()).toContain('bg-primary')
      normalButton = wrapper.findAll('button').find((btn) => btn.text() === 'Normal')
      expect(normalButton?.classes()).not.toContain('bg-primary')
    })

    it('Insane speed button works', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      const insaneButton = wrapper.findAll('button').find((btn) => btn.text() === 'Insane')
      expect(insaneButton).toBeDefined()

      await insaneButton?.trigger('click')
      expect(insaneButton?.classes()).toContain('bg-primary')
    })

    it('speed control buttons have proper styling', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      const speedButtons = wrapper.findAll('button').filter((btn) => {
        const text = btn.text()
        return text === 'Slow' || text === 'Normal' || text === 'Fast' || text === 'Insane'
      })

      speedButtons.forEach((btn) => {
        expect(btn.classes()).toContain('rounded-md')
        expect(btn.classes()).toContain('transition-colors')
      })
    })
  })

  // ==========================================
  // Visual Elements Tests
  // ==========================================

  describe('Visual Elements', () => {
    it('displays large error status code', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      // Error code should be prominently displayed
      const errorCode = wrapper.find('.text-8xl')
      expect(errorCode.exists()).toBe(true)
      expect(errorCode.text()).toContain('404')
    })

    it('has proper responsive layout classes', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      // Check for responsive flex classes
      const html = wrapper.html()
      expect(html).toContain('sm:flex-row')
    })

    it('uses Career Buddy primary color scheme', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      // Check for primary color classes
      const html = wrapper.html()
      expect(html).toContain('text-primary')
      expect(html).toContain('bg-primary')
    })
  })

  // ==========================================
  // Accessibility Tests
  // ==========================================

  describe('Accessibility', () => {
    it('has proper heading hierarchy', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      const h1 = wrapper.find('h1')
      const h2 = wrapper.find('h2')
      expect(h1.exists()).toBe(true)
      expect(h2.exists()).toBe(true)
    })

    it('buttons are properly focusable', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      const buttons = wrapper.findAll('button')
      buttons.forEach((button) => {
        expect(button.element.tagName).toBe('BUTTON')
      })
    })

    it('links have proper href attributes', async () => {
      const wrapper = await mountSuspended(ErrorPage, {
        props: {
          error: { statusCode: 404 },
        },
      })

      const homeLink = wrapper.find('header a')
      expect(homeLink.attributes('href')).toBeDefined()
    })
  })
})

// ==========================================
// Integration Tests
// ==========================================

describe('ErrorPage Integration', () => {
  it('full page renders without errors', async () => {
    const wrapper = await mountSuspended(ErrorPage, {
      props: {
        error: { statusCode: 404 },
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.min-h-screen').exists()).toBe(true)
  })

  it('all main sections are present', async () => {
    const wrapper = await mountSuspended(ErrorPage, {
      props: {
        error: { statusCode: 500 },
      },
    })

    // Header with branding
    expect(wrapper.text()).toContain('Career Buddy')

    // Error info
    expect(wrapper.text()).toContain('500')
    expect(wrapper.text()).toContain('Server Error')

    // Action buttons
    expect(wrapper.text()).toContain('Go Home')
    expect(wrapper.text()).toContain('Try Again')

    // Game section
    expect(wrapper.text()).toContain('play a game')
    expect(wrapper.find('canvas').exists()).toBe(true)

    // Footer
    expect(wrapper.text()).toContain('All rights reserved')
  })
})
