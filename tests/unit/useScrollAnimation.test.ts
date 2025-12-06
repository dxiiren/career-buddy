import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'

// Mock useIntersectionObserver from VueUse
vi.mock('@vueuse/core', () => ({
  useIntersectionObserver: vi.fn((target, callback) => {
    // Store the callback for manual triggering in tests
    const mockStop = vi.fn()

    // Simulate intersection observer behavior
    return {
      stop: mockStop,
      isSupported: ref(true),
    }
  }),
}))

describe('useScrollAnimation composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should export target and isVisible refs', async () => {
    // Import after mocking
    const { useScrollAnimation } = await import('../../composables/useScrollAnimation')

    const { target, isVisible } = useScrollAnimation()

    expect(target).toBeDefined()
    expect(isVisible).toBeDefined()
    expect(target.value).toBeNull()
    expect(isVisible.value).toBe(false)
  })

  it('should initialize with isVisible as false', async () => {
    const { useScrollAnimation } = await import('../../composables/useScrollAnimation')

    const { isVisible } = useScrollAnimation()

    expect(isVisible.value).toBe(false)
  })

  it('should initialize with target as null', async () => {
    const { useScrollAnimation } = await import('../../composables/useScrollAnimation')

    const { target } = useScrollAnimation()

    expect(target.value).toBeNull()
  })
})
