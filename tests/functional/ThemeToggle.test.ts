import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ref, computed } from 'vue'
import ThemeToggle from '../../components/shared/ThemeToggle.vue'

// Mock the useTheme composable
const mockIsDark = ref(true)
const mockToggleTheme = vi.fn()
const mockInitTheme = vi.fn()

vi.mock('../../composables/useTheme', () => ({
  useTheme: () => ({
    isDark: computed(() => mockIsDark.value),
    toggleTheme: mockToggleTheme,
    initTheme: mockInitTheme,
  }),
}))

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockIsDark.value = true
  })

  describe('rendering', () => {
    it('renders a button element', async () => {
      const wrapper = await mountSuspended(ThemeToggle)

      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('renders with ghost variant styling', async () => {
      const wrapper = await mountSuspended(ThemeToggle)

      const button = wrapper.find('button')
      const classes = button.classes().join(' ')
      expect(classes).toContain('h-9')
      expect(classes).toContain('w-9')
    })

    it('has sr-only label for accessibility', async () => {
      const wrapper = await mountSuspended(ThemeToggle)

      const srOnly = wrapper.find('.sr-only')
      expect(srOnly.exists()).toBe(true)
      expect(srOnly.text()).toBe('Toggle theme')
    })
  })

  describe('icon rendering', () => {
    it('renders Sun icon when isDark is true', async () => {
      mockIsDark.value = true
      const wrapper = await mountSuspended(ThemeToggle)

      // Sun icon should be visible in dark mode (to switch to light)
      const sunIcon = wrapper.find('svg')
      expect(sunIcon.exists()).toBe(true)
    })

    it('renders Moon icon when isDark is false', async () => {
      mockIsDark.value = false
      const wrapper = await mountSuspended(ThemeToggle)

      // Moon icon should be visible in light mode (to switch to dark)
      const moonIcon = wrapper.find('svg')
      expect(moonIcon.exists()).toBe(true)
    })

    it('icon has correct styling classes', async () => {
      const wrapper = await mountSuspended(ThemeToggle)

      const icon = wrapper.find('svg')
      const classes = icon.classes().join(' ')
      expect(classes).toContain('h-4')
      expect(classes).toContain('w-4')
      expect(classes).toContain('text-muted-foreground')
    })
  })

  describe('interactions', () => {
    it('calls toggleTheme when clicked', async () => {
      const wrapper = await mountSuspended(ThemeToggle)

      await wrapper.find('button').trigger('click')

      expect(mockToggleTheme).toHaveBeenCalledTimes(1)
    })

    it('calls toggleTheme on multiple clicks', async () => {
      const wrapper = await mountSuspended(ThemeToggle)

      await wrapper.find('button').trigger('click')
      await wrapper.find('button').trigger('click')
      await wrapper.find('button').trigger('click')

      expect(mockToggleTheme).toHaveBeenCalledTimes(3)
    })
  })

  describe('lifecycle', () => {
    it('calls initTheme on mount', async () => {
      await mountSuspended(ThemeToggle)

      expect(mockInitTheme).toHaveBeenCalledTimes(1)
    })
  })

  describe('accessibility', () => {
    it('button is focusable', async () => {
      const wrapper = await mountSuspended(ThemeToggle)

      const button = wrapper.find('button')
      expect(button.attributes('tabindex')).not.toBe('-1')
    })

    it('has proper button role', async () => {
      const wrapper = await mountSuspended(ThemeToggle)

      const button = wrapper.find('button')
      // Button elements have implicit role="button"
      expect(button.element.tagName.toLowerCase()).toBe('button')
    })
  })
})
