import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('useInterview', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('interview overview content', () => {
    it('should have interview purpose content', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { interviewPurpose } = useInterview()

      expect(interviewPurpose.value.length).toBeGreaterThan(0)
    })

    it('should have types of interviews', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { interviewTypes } = useInterview()

      expect(interviewTypes.value.length).toBeGreaterThan(0)
      interviewTypes.value.forEach(type => {
        expect(type).toHaveProperty('name')
        expect(type).toHaveProperty('description')
        expect(type).toHaveProperty('tips')
      })
    })

    it('should have dos and donts', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { interviewDos, interviewDonts } = useInterview()

      expect(interviewDos.value.length).toBeGreaterThan(0)
      expect(interviewDonts.value.length).toBeGreaterThan(0)
    })

    it('should have preparation steps', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { prepSteps } = useInterview()

      expect(prepSteps.value.length).toBeGreaterThan(0)
      prepSteps.value.forEach(step => {
        expect(step).toHaveProperty('title')
        expect(step).toHaveProperty('description')
      })
    })
  })

  describe('question bank content', () => {
    it('should have interview questions', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { questions } = useInterview()

      expect(questions.value.length).toBeGreaterThan(0)
      questions.value.forEach(question => {
        expect(question).toHaveProperty('id')
        expect(question).toHaveProperty('category')
        expect(question).toHaveProperty('question')
        expect(question).toHaveProperty('exampleAnswer')
        expect(question).toHaveProperty('answerStructure')
        expect(question).toHaveProperty('tips')
      })
    })

    it('should have questions in multiple categories', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { questions } = useInterview()

      const categories = new Set(questions.value.map(q => q.category))
      expect(categories.size).toBeGreaterThan(1)
    })

    it('should have STAR method explanation', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { starMethod } = useInterview()

      expect(starMethod.value).toHaveProperty('situation')
      expect(starMethod.value).toHaveProperty('task')
      expect(starMethod.value).toHaveProperty('action')
      expect(starMethod.value).toHaveProperty('result')
    })
  })

  describe('simulation state', () => {
    it('should have simulation settings', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { simulationSettings } = useInterview()

      expect(simulationSettings.value).toHaveProperty('mode')
      expect(simulationSettings.value).toHaveProperty('category')
      expect(simulationSettings.value).toHaveProperty('timeLimit')
    })

    it('should have simulation state', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { simulationState } = useInterview()

      expect(simulationState.value).toHaveProperty('isActive')
      expect(simulationState.value).toHaveProperty('currentQuestionIndex')
      expect(simulationState.value).toHaveProperty('answers')
    })

    it('should start simulation', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { simulationState, startSimulation } = useInterview()

      expect(simulationState.value.isActive).toBe(false)
      startSimulation()
      expect(simulationState.value.isActive).toBe(true)
    })

    it('should end simulation', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { simulationState, startSimulation, endSimulation } = useInterview()

      startSimulation()
      expect(simulationState.value.isActive).toBe(true)
      endSimulation()
      expect(simulationState.value.isActive).toBe(false)
    })
  })

  describe('loading state', () => {
    it('should have isLoading state', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { isLoading } = useInterview()

      expect(isLoading.value).toBe(false)
    })

    it('should set isLoading during loadInterview', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { isLoading, loadInterview } = useInterview()

      const promise = loadInterview()
      expect(isLoading.value).toBe(true)

      await vi.advanceTimersByTimeAsync(1000)
      await promise

      expect(isLoading.value).toBe(false)
    })
  })
})
