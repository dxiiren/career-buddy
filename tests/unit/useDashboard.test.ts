import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('useDashboard composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  it('should initialize with isLoading as true', async () => {
    const { useDashboard } = await import('../../composables/useDashboard')
    const { isLoading } = useDashboard()

    expect(isLoading.value).toBe(true)
  })

  it('should have 6 progress modules', async () => {
    const { useDashboard } = await import('../../composables/useDashboard')
    const { progressModules } = useDashboard()

    expect(progressModules.value).toHaveLength(6)
  })

  it('should have correct module names', async () => {
    const { useDashboard } = await import('../../composables/useDashboard')
    const { progressModules } = useDashboard()

    const moduleNames = progressModules.value.map((m) => m.name)
    expect(moduleNames).toContain('Resume')
    expect(moduleNames).toContain('Cover Letter')
    expect(moduleNames).toContain('Interview Prep')
    expect(moduleNames).toContain('Networking')
    expect(moduleNames).toContain('Job Search Strategy')
    expect(moduleNames).toContain('Self-Promotion')
  })

  it('should have 3 daily tasks', async () => {
    const { useDashboard } = await import('../../composables/useDashboard')
    const { dailyTasks } = useDashboard()

    expect(dailyTasks.value).toHaveLength(3)
  })

  it('should have 4 recent activity items', async () => {
    const { useDashboard } = await import('../../composables/useDashboard')
    const { recentActivity } = useDashboard()

    expect(recentActivity.value).toHaveLength(4)
  })

  it('should have resume info with name, title, email', async () => {
    const { useDashboard } = await import('../../composables/useDashboard')
    const { resumeInfo } = useDashboard()

    expect(resumeInfo.value.name).toBeDefined()
    expect(resumeInfo.value.title).toBeDefined()
    expect(resumeInfo.value.email).toBeDefined()
    expect(resumeInfo.value.lastUpdated).toBeDefined()
  })

  it('should calculate overall progress as average of module progress', async () => {
    const { useDashboard } = await import('../../composables/useDashboard')
    const { overallProgress, progressModules } = useDashboard()

    const expectedAvg = Math.round(
      progressModules.value.reduce((sum, m) => sum + m.progress, 0) / progressModules.value.length
    )

    expect(overallProgress.value).toBe(expectedAvg)
  })

  it('should have a current quote', async () => {
    const { useDashboard } = await import('../../composables/useDashboard')
    const { currentQuote } = useDashboard()

    expect(currentQuote.value).toBeDefined()
    expect(typeof currentQuote.value).toBe('string')
    expect(currentQuote.value.length).toBeGreaterThan(0)
  })

  it('should have a current tip', async () => {
    const { useDashboard } = await import('../../composables/useDashboard')
    const { currentTip } = useDashboard()

    expect(currentTip.value).toBeDefined()
    expect(typeof currentTip.value).toBe('string')
    expect(currentTip.value.length).toBeGreaterThan(0)
  })

  it('should toggle task completion status', async () => {
    const { useDashboard } = await import('../../composables/useDashboard')
    const { dailyTasks, toggleTask } = useDashboard()

    const firstTaskId = dailyTasks.value[0].id
    const initialStatus = dailyTasks.value[0].completed

    toggleTask(firstTaskId)

    expect(dailyTasks.value[0].completed).toBe(!initialStatus)
  })

  it('should set isLoading to false after loadDashboard completes', async () => {
    const { useDashboard } = await import('../../composables/useDashboard')
    const { isLoading, loadDashboard } = useDashboard()

    expect(isLoading.value).toBe(true)

    await loadDashboard()

    expect(isLoading.value).toBe(false)
  })

  it('should have valid progress values (0-100) for all modules', async () => {
    const { useDashboard } = await import('../../composables/useDashboard')
    const { progressModules } = useDashboard()

    progressModules.value.forEach((module) => {
      expect(module.progress).toBeGreaterThanOrEqual(0)
      expect(module.progress).toBeLessThanOrEqual(100)
    })
  })

  it('should have CTA text for all modules', async () => {
    const { useDashboard } = await import('../../composables/useDashboard')
    const { progressModules } = useDashboard()

    progressModules.value.forEach((module) => {
      expect(module.cta).toBeDefined()
      expect(module.cta.length).toBeGreaterThan(0)
    })
  })
})
