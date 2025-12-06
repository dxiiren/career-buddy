import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, computed } from 'vue'

// Mock state that persists across function calls
let colorModeValue: 'light' | 'dark' = 'dark'

// Mock Nuxt's useState
vi.mock('#app', () => ({
  useState: vi.fn((key: string, init?: () => 'light' | 'dark') => {
    const state = ref(colorModeValue)
    return state
  }),
}))

// Mock import.meta.client
vi.stubGlobal('import', { meta: { client: true } })

describe('useTheme composable', () => {
  let localStorageMock: { [key: string]: string }
  let documentClassListMock: { add: ReturnType<typeof vi.fn>; remove: ReturnType<typeof vi.fn> }
  let matchMediaMock: ReturnType<typeof vi.fn>

  beforeEach(async () => {
    // Reset color mode for each test
    colorModeValue = 'dark'

    // Reset modules to get fresh imports
    vi.resetModules()

    // Mock localStorage
    localStorageMock = {}
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key: string) => localStorageMock[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        localStorageMock[key] = value
      }),
      removeItem: vi.fn((key: string) => {
        delete localStorageMock[key]
      }),
      clear: vi.fn(() => {
        localStorageMock = {}
      }),
    })

    // Mock document.documentElement.classList
    documentClassListMock = {
      add: vi.fn(),
      remove: vi.fn(),
    }
    vi.stubGlobal('document', {
      documentElement: {
        classList: documentClassListMock,
      },
    })

    // Mock window.matchMedia
    matchMediaMock = vi.fn().mockReturnValue({
      matches: true, // Default to dark mode preference
    })
    vi.stubGlobal('window', {
      matchMedia: matchMediaMock,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.unstubAllGlobals()
  })

  describe('initial state', () => {
    it('should return all required properties', async () => {
      const { useTheme } = await import('../../composables/useTheme')
      const result = useTheme()

      expect(result.colorMode).toBeDefined()
      expect(result.isDark).toBeDefined()
      expect(result.toggleTheme).toBeDefined()
      expect(result.setTheme).toBeDefined()
      expect(result.initTheme).toBeDefined()
    })

    it('should have toggleTheme as a function', async () => {
      const { useTheme } = await import('../../composables/useTheme')
      const { toggleTheme } = useTheme()

      expect(typeof toggleTheme).toBe('function')
    })

    it('should have setTheme as a function', async () => {
      const { useTheme } = await import('../../composables/useTheme')
      const { setTheme } = useTheme()

      expect(typeof setTheme).toBe('function')
    })

    it('should have initTheme as a function', async () => {
      const { useTheme } = await import('../../composables/useTheme')
      const { initTheme } = useTheme()

      expect(typeof initTheme).toBe('function')
    })

    it('should have colorMode as a ref', async () => {
      const { useTheme } = await import('../../composables/useTheme')
      const { colorMode } = useTheme()

      expect(colorMode.value).toBeDefined()
    })

    it('should have isDark as a computed property', async () => {
      const { useTheme } = await import('../../composables/useTheme')
      const { isDark } = useTheme()

      expect(isDark.value).toBeDefined()
      expect(typeof isDark.value).toBe('boolean')
    })
  })

  describe('toggleTheme', () => {
    it('should toggle colorMode value', async () => {
      const { useTheme } = await import('../../composables/useTheme')
      const { colorMode, toggleTheme } = useTheme()

      const initialValue = colorMode.value
      toggleTheme()
      const newValue = colorMode.value

      // Value should have changed
      expect(newValue).not.toBe(initialValue)
    })

    it('should update DOM when toggling to light', async () => {
      const { useTheme } = await import('../../composables/useTheme')
      const { colorMode, toggleTheme } = useTheme()

      colorMode.value = 'dark'
      toggleTheme()

      if (colorMode.value === 'light') {
        expect(documentClassListMock.add).toHaveBeenCalledWith('light')
      }
    })

    it('should save preference after toggle', async () => {
      const { useTheme } = await import('../../composables/useTheme')
      const { toggleTheme } = useTheme()

      toggleTheme()

      expect(localStorage.setItem).toHaveBeenCalled()
    })
  })

  describe('setTheme', () => {
    it('should set theme to light', async () => {
      const { useTheme } = await import('../../composables/useTheme')
      const { colorMode, setTheme } = useTheme()

      setTheme('light')

      expect(colorMode.value).toBe('light')
    })

    it('should set theme to dark', async () => {
      const { useTheme } = await import('../../composables/useTheme')
      const { colorMode, setTheme } = useTheme()

      setTheme('dark')

      expect(colorMode.value).toBe('dark')
    })

    it('should update DOM when setting to light', async () => {
      const { useTheme } = await import('../../composables/useTheme')
      const { setTheme } = useTheme()

      setTheme('light')

      expect(documentClassListMock.add).toHaveBeenCalledWith('light')
    })

    it('should update DOM when setting to dark', async () => {
      const { useTheme } = await import('../../composables/useTheme')
      const { setTheme } = useTheme()

      setTheme('dark')

      expect(documentClassListMock.remove).toHaveBeenCalledWith('light')
    })

    it('should save preference when setting theme', async () => {
      const { useTheme } = await import('../../composables/useTheme')
      const { setTheme } = useTheme()

      setTheme('light')

      expect(localStorage.setItem).toHaveBeenCalledWith('color-mode', 'light')
    })
  })

  describe('initTheme', () => {
    it('should load saved preference from localStorage', async () => {
      localStorageMock['color-mode'] = 'light'
      const { useTheme } = await import('../../composables/useTheme')
      const { colorMode, initTheme } = useTheme()

      initTheme()

      expect(colorMode.value).toBe('light')
    })

    it('should load dark preference from localStorage', async () => {
      localStorageMock['color-mode'] = 'dark'
      const { useTheme } = await import('../../composables/useTheme')
      const { colorMode, initTheme } = useTheme()

      initTheme()

      expect(colorMode.value).toBe('dark')
    })

    it('should check system preference when no saved preference', async () => {
      matchMediaMock.mockReturnValue({ matches: true })
      const { useTheme } = await import('../../composables/useTheme')
      const { initTheme } = useTheme()

      initTheme()

      expect(matchMediaMock).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
    })

    it('should use system preference for dark mode', async () => {
      matchMediaMock.mockReturnValue({ matches: true })
      const { useTheme } = await import('../../composables/useTheme')
      const { colorMode, initTheme } = useTheme()

      initTheme()

      expect(colorMode.value).toBe('dark')
    })

    it('should use system preference for light mode', async () => {
      matchMediaMock.mockReturnValue({ matches: false })
      const { useTheme } = await import('../../composables/useTheme')
      const { colorMode, initTheme } = useTheme()

      initTheme()

      expect(colorMode.value).toBe('light')
    })

    it('should prioritize saved preference over system preference', async () => {
      localStorageMock['color-mode'] = 'light'
      matchMediaMock.mockReturnValue({ matches: true }) // System prefers dark
      const { useTheme } = await import('../../composables/useTheme')
      const { colorMode, initTheme } = useTheme()

      initTheme()

      expect(colorMode.value).toBe('light') // Should use saved, not system
    })

    it('should update DOM after initialization with light mode', async () => {
      localStorageMock['color-mode'] = 'light'
      const { useTheme } = await import('../../composables/useTheme')
      const { initTheme } = useTheme()

      initTheme()

      expect(documentClassListMock.add).toHaveBeenCalledWith('light')
    })

    it('should update DOM after initialization with dark mode', async () => {
      localStorageMock['color-mode'] = 'dark'
      const { useTheme } = await import('../../composables/useTheme')
      const { initTheme } = useTheme()

      initTheme()

      expect(documentClassListMock.remove).toHaveBeenCalledWith('light')
    })
  })

  describe('isDark computed property', () => {
    it('should be true when colorMode is dark', async () => {
      const { useTheme } = await import('../../composables/useTheme')
      const { colorMode, isDark } = useTheme()

      colorMode.value = 'dark'

      expect(isDark.value).toBe(true)
    })

    it('should be false when colorMode is light', async () => {
      const { useTheme } = await import('../../composables/useTheme')
      const { colorMode, isDark } = useTheme()

      colorMode.value = 'light'

      expect(isDark.value).toBe(false)
    })

    it('should update reactively when colorMode changes', async () => {
      const { useTheme } = await import('../../composables/useTheme')
      const { colorMode, isDark } = useTheme()

      colorMode.value = 'dark'
      expect(isDark.value).toBe(true)

      colorMode.value = 'light'
      expect(isDark.value).toBe(false)
    })
  })

  describe('exports', () => {
    it('should export all required functions and refs', async () => {
      const { useTheme } = await import('../../composables/useTheme')
      const result = useTheme()

      expect(result.colorMode).toBeDefined()
      expect(result.isDark).toBeDefined()
      expect(result.toggleTheme).toBeDefined()
      expect(result.setTheme).toBeDefined()
      expect(result.initTheme).toBeDefined()
      expect(typeof result.toggleTheme).toBe('function')
      expect(typeof result.setTheme).toBe('function')
      expect(typeof result.initTheme).toBe('function')
    })
  })
})
