import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'

// Store callback for manual triggering
let intersectionCallback: (entries: { isIntersecting: boolean }[]) => void
let mockStop: ReturnType<typeof vi.fn>

// Mock useIntersectionObserver from VueUse
vi.mock('@vueuse/core', () => ({
  useIntersectionObserver: vi.fn((target, callback, options) => {
    intersectionCallback = callback
    mockStop = vi.fn()

    return {
      stop: mockStop,
      isSupported: ref(true),
    }
  }),
}))

describe('useScrollAnimation composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  describe('initial state', () => {
    it('should export target and isVisible refs', async () => {
      const { useScrollAnimation } = await import('../../composables/useScrollAnimation')

      const { target, isVisible } = useScrollAnimation()

      expect(target).toBeDefined()
      expect(isVisible).toBeDefined()
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

    it('should return refs that are reactive', async () => {
      const { useScrollAnimation } = await import('../../composables/useScrollAnimation')

      const { target, isVisible } = useScrollAnimation()

      expect(typeof target.value).toBe('object')
      expect(typeof isVisible.value).toBe('boolean')
    })
  })

  describe('intersection observer callback', () => {
    it('should set isVisible to true when element intersects', async () => {
      const { useScrollAnimation } = await import('../../composables/useScrollAnimation')

      const { isVisible } = useScrollAnimation()

      // Simulate element entering viewport
      intersectionCallback([{ isIntersecting: true }])

      expect(isVisible.value).toBe(true)
    })

    it('should not change isVisible when element is not intersecting', async () => {
      const { useScrollAnimation } = await import('../../composables/useScrollAnimation')

      const { isVisible } = useScrollAnimation()

      // Simulate element not in viewport
      intersectionCallback([{ isIntersecting: false }])

      expect(isVisible.value).toBe(false)
    })

    it('should call stop() after element becomes visible', async () => {
      const { useScrollAnimation } = await import('../../composables/useScrollAnimation')

      useScrollAnimation()

      // Simulate element entering viewport
      intersectionCallback([{ isIntersecting: true }])

      expect(mockStop).toHaveBeenCalledTimes(1)
    })

    it('should not call stop() when element is not visible', async () => {
      const { useScrollAnimation } = await import('../../composables/useScrollAnimation')

      useScrollAnimation()

      // Simulate element not in viewport
      intersectionCallback([{ isIntersecting: false }])

      expect(mockStop).not.toHaveBeenCalled()
    })

    it('should only become visible once (stop is called)', async () => {
      const { useScrollAnimation } = await import('../../composables/useScrollAnimation')

      const { isVisible } = useScrollAnimation()

      // First intersection
      intersectionCallback([{ isIntersecting: true }])
      expect(isVisible.value).toBe(true)
      expect(mockStop).toHaveBeenCalledTimes(1)

      // isVisible should stay true since observer is stopped
      expect(isVisible.value).toBe(true)
    })
  })

  describe('useIntersectionObserver configuration', () => {
    it('should pass target ref to useIntersectionObserver', async () => {
      const { useIntersectionObserver } = await import('@vueuse/core')
      const { useScrollAnimation } = await import('../../composables/useScrollAnimation')

      const { target } = useScrollAnimation()

      expect(useIntersectionObserver).toHaveBeenCalledWith(
        target,
        expect.any(Function),
        expect.objectContaining({ threshold: 0.1 }),
      )
    })

    it('should use threshold of 0.1', async () => {
      const { useIntersectionObserver } = await import('@vueuse/core')
      const { useScrollAnimation } = await import('../../composables/useScrollAnimation')

      useScrollAnimation()

      expect(useIntersectionObserver).toHaveBeenCalledWith(expect.anything(), expect.any(Function), { threshold: 0.1 })
    })
  })

  describe('multiple instances', () => {
    it('should create independent instances', async () => {
      // Reset module to get fresh mocks
      vi.resetModules()

      let callback1: (entries: { isIntersecting: boolean }[]) => void
      let callback2: (entries: { isIntersecting: boolean }[]) => void

      vi.doMock('@vueuse/core', () => ({
        useIntersectionObserver: vi.fn((target, callback) => {
          if (!callback1) {
            callback1 = callback
          } else {
            callback2 = callback
          }
          return { stop: vi.fn(), isSupported: ref(true) }
        }),
      }))

      const { useScrollAnimation } = await import('../../composables/useScrollAnimation')

      const instance1 = useScrollAnimation()
      const instance2 = useScrollAnimation()

      expect(instance1.isVisible).not.toBe(instance2.isVisible)
      expect(instance1.target).not.toBe(instance2.target)
    })
  })

  describe('return value structure', () => {
    it('should return object with target and isVisible properties', async () => {
      const { useScrollAnimation } = await import('../../composables/useScrollAnimation')

      const result = useScrollAnimation()

      expect(result).toHaveProperty('target')
      expect(result).toHaveProperty('isVisible')
      expect(Object.keys(result)).toHaveLength(2)
    })
  })
})
