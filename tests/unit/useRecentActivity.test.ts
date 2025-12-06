import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useRecentActivity } from '../../composables/useRecentActivity'

// Mock sessionStorage
const mockSessionStorage = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(globalThis, 'sessionStorage', {
  value: mockSessionStorage,
})

// Mock import.meta.client
vi.stubGlobal('import', { meta: { client: true } })

describe('useRecentActivity', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSessionStorage.clear()
    // Reset the shared state between tests
    const { clearActivities } = useRecentActivity()
    clearActivities()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  // ==========================================
  // Initial State Tests
  // ==========================================

  describe('Initial State', () => {
    it('should have empty activities initially', () => {
      const { activities } = useRecentActivity()
      expect(activities.value).toEqual([])
    })

    it('should return empty array from getActivities when no activities', () => {
      const { getActivities } = useRecentActivity()
      expect(getActivities()).toEqual([])
    })
  })

  // ==========================================
  // Track Page Visit Tests
  // ==========================================

  describe('trackPageVisit', () => {
    it('should track a page visit', () => {
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/resume')
      const activities = getActivities()
      expect(activities.length).toBe(1)
      expect(activities[0].text).toBe('Visited Resume Builder')
      expect(activities[0].icon).toBe('FileText')
      expect(activities[0].path).toBe('/resume')
    })

    it('should track interview page with correct icon', () => {
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/interview')
      const activities = getActivities()
      expect(activities[0].text).toBe('Visited Interview Prep')
      expect(activities[0].icon).toBe('Mic')
    })

    it('should track networking page', () => {
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/networking')
      const activities = getActivities()
      expect(activities[0].text).toBe('Visited Networking')
      expect(activities[0].icon).toBe('Users')
    })

    it('should track job-search page', () => {
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/job-search')
      const activities = getActivities()
      expect(activities[0].text).toBe('Visited Job Search Strategy')
      expect(activities[0].icon).toBe('Target')
    })

    it('should track self-promotion page', () => {
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/self-promotion')
      const activities = getActivities()
      expect(activities[0].text).toBe('Visited Self-Promotion')
      expect(activities[0].icon).toBe('TrendingUp')
    })

    it('should track chat page', () => {
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/chat')
      const activities = getActivities()
      expect(activities[0].text).toBe('Chatted with Career Buddy')
      expect(activities[0].icon).toBe('MessageCircle')
    })

    it('should track help page', () => {
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/help')
      const activities = getActivities()
      expect(activities[0].text).toBe('Visited Help & Support')
      expect(activities[0].icon).toBe('HelpCircle')
    })

    it('should track dashboard page', () => {
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/dashboard')
      const activities = getActivities()
      expect(activities[0].text).toBe('Viewed Dashboard')
      expect(activities[0].icon).toBe('LayoutDashboard')
    })

    it('should not track unknown pages', () => {
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/unknown-page')
      expect(getActivities().length).toBe(0)
    })

    it('should add new activities at the beginning', () => {
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/resume')
      trackPageVisit('/interview')
      const activities = getActivities()
      expect(activities[0].path).toBe('/interview')
      expect(activities[1].path).toBe('/resume')
    })

    it('should limit activities to 4', () => {
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/resume')
      trackPageVisit('/interview')
      trackPageVisit('/networking')
      trackPageVisit('/job-search')
      trackPageVisit('/chat')
      const activities = getActivities()
      expect(activities.length).toBe(4)
      // First one should be the most recent
      expect(activities[0].path).toBe('/chat')
      // Resume should be dropped (was first added)
      expect(activities.find((a) => a.path === '/resume')).toBeUndefined()
    })

    it('should update position when revisiting a page', () => {
      vi.useFakeTimers()
      const { trackPageVisit, getActivities } = useRecentActivity()

      trackPageVisit('/resume')
      vi.advanceTimersByTime(61000) // Advance past 1 minute threshold
      trackPageVisit('/interview')
      vi.advanceTimersByTime(61000)
      trackPageVisit('/resume') // Revisit resume

      const activities = getActivities()
      expect(activities[0].path).toBe('/resume') // Most recent
      expect(activities[1].path).toBe('/interview')
      expect(activities.length).toBe(2) // No duplicate

      vi.useRealTimers()
    })

    it('should not duplicate recent visits within 1 minute', () => {
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/resume')
      trackPageVisit('/resume') // Same page again
      expect(getActivities().length).toBe(1)
    })
  })

  // ==========================================
  // Relative Time Tests
  // ==========================================

  describe('Relative Time', () => {
    it('should show seconds ago for activities within 60 seconds', () => {
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/resume')
      expect(getActivities()[0].time).toBe('0 seconds ago')
    })

    it('should show minutes ago for activities older than 1 minute', () => {
      vi.useFakeTimers()
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/resume')
      vi.advanceTimersByTime(2 * 60 * 1000) // 2 minutes
      expect(getActivities()[0].time).toBe('2 minutes ago')
      vi.useRealTimers()
    })

    it('should show singular minute for 1 minute ago', () => {
      vi.useFakeTimers()
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/resume')
      vi.advanceTimersByTime(60 * 1000) // 1 minute
      expect(getActivities()[0].time).toBe('1 minute ago')
      vi.useRealTimers()
    })

    it('should show hours ago for activities older than 1 hour', () => {
      vi.useFakeTimers()
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/resume')
      vi.advanceTimersByTime(3 * 60 * 60 * 1000) // 3 hours
      expect(getActivities()[0].time).toBe('3 hours ago')
      vi.useRealTimers()
    })

    it('should show singular hour for 1 hour ago', () => {
      vi.useFakeTimers()
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/resume')
      vi.advanceTimersByTime(60 * 60 * 1000) // 1 hour
      expect(getActivities()[0].time).toBe('1 hour ago')
      vi.useRealTimers()
    })

    it('should show "Yesterday" for activities 1 day old', () => {
      vi.useFakeTimers()
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/resume')
      vi.advanceTimersByTime(24 * 60 * 60 * 1000) // 1 day
      expect(getActivities()[0].time).toBe('Yesterday')
      vi.useRealTimers()
    })

    it('should show "X days ago" for activities less than 7 days old', () => {
      vi.useFakeTimers()
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/resume')
      vi.advanceTimersByTime(3 * 24 * 60 * 60 * 1000) // 3 days
      expect(getActivities()[0].time).toBe('3 days ago')
      vi.useRealTimers()
    })

    it('should show "Last week" for activities 7+ days old', () => {
      vi.useFakeTimers()
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/resume')
      vi.advanceTimersByTime(7 * 24 * 60 * 60 * 1000) // 7 days
      expect(getActivities()[0].time).toBe('Last week')
      vi.useRealTimers()
    })
  })

  // ==========================================
  // Clear Activities Tests
  // ==========================================

  describe('clearActivities', () => {
    it('should clear all activities', () => {
      const { trackPageVisit, clearActivities, getActivities } = useRecentActivity()
      trackPageVisit('/resume')
      trackPageVisit('/interview')
      expect(getActivities().length).toBe(2)
      clearActivities()
      expect(getActivities().length).toBe(0)
    })

    it('should remove from sessionStorage when clearing', () => {
      const { trackPageVisit, clearActivities } = useRecentActivity()
      trackPageVisit('/resume')
      clearActivities()
      expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('careerbuddy_recent_activity')
    })
  })

  // ==========================================
  // Session Storage Tests
  // ==========================================

  describe('sessionStorage', () => {
    it('should save activities to sessionStorage', () => {
      const { trackPageVisit } = useRecentActivity()
      trackPageVisit('/resume')
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
        'careerbuddy_recent_activity',
        expect.any(String)
      )
    })

    it('should load activities from sessionStorage', () => {
      const storedActivities = [
        {
          id: '12345',
          text: 'Visited Resume Builder',
          time: 'Just now',
          icon: 'FileText',
          timestamp: Date.now(),
          path: '/resume',
        },
      ]
      mockSessionStorage.getItem.mockReturnValueOnce(JSON.stringify(storedActivities))

      const { loadActivities, getActivities } = useRecentActivity()
      loadActivities()

      const activities = getActivities()
      expect(activities.length).toBe(1)
      expect(activities[0].path).toBe('/resume')
    })

    it('should handle malformed JSON in sessionStorage', () => {
      mockSessionStorage.getItem.mockReturnValueOnce('invalid-json')

      const { loadActivities, getActivities } = useRecentActivity()
      loadActivities()

      expect(getActivities().length).toBe(0)
    })
  })

  // ==========================================
  // Activity Properties Tests
  // ==========================================

  describe('Activity Properties', () => {
    it('should generate unique id for each activity', () => {
      vi.useFakeTimers()
      const { trackPageVisit, getActivities } = useRecentActivity()

      trackPageVisit('/resume')
      vi.advanceTimersByTime(61000)
      trackPageVisit('/interview')

      const activities = getActivities()
      expect(activities[0].id).not.toBe(activities[1].id)

      vi.useRealTimers()
    })

    it('should include timestamp in activity', () => {
      const { trackPageVisit, getActivities } = useRecentActivity()
      const before = Date.now()
      trackPageVisit('/resume')
      const after = Date.now()

      const activities = getActivities()
      expect(activities[0].timestamp).toBeGreaterThanOrEqual(before)
      expect(activities[0].timestamp).toBeLessThanOrEqual(after)
    })

    it('should track cover letter page', () => {
      const { trackPageVisit, getActivities } = useRecentActivity()
      trackPageVisit('/resume/cover-letter')
      const activities = getActivities()
      expect(activities[0].text).toBe('Visited Cover Letter')
      expect(activities[0].icon).toBe('Mail')
    })
  })
})
