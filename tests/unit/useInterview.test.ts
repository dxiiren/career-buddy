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

  describe('answering during a simulation', () => {
    beforeEach(async () => {
      // The composable's state is module-level, so every run starts from a
      // fresh simulation rather than the previous test's leftovers.
      const { useInterview } = await import('../../composables/useInterview')
      useInterview().startSimulation()
    })

    it('should record an answer and advance to the next question', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { simulationState, submitAnswer } = useInterview()

      submitAnswer('I led the debugging session and we shipped on time.')

      expect(simulationState.value.answers).toEqual([
        'I led the debugging session and we shipped on time.',
      ])
      expect(simulationState.value.currentQuestionIndex).toBe(1)
    })

    it('should keep answers in the order they were given', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { simulationState, submitAnswer } = useInterview()

      submitAnswer('first')
      submitAnswer('second')
      submitAnswer('third')

      expect(simulationState.value.answers).toEqual([
        'first',
        'second',
        'third',
      ])
      expect(simulationState.value.currentQuestionIndex).toBe(3)
    })

    it('should stay active while the candidate is answering', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { simulationState, submitAnswer } = useInterview()

      submitAnswer('an answer')

      expect(simulationState.value.isActive).toBe(true)
    })

    it('should advance past a skipped question', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { simulationState, submitAnswer } = useInterview()

      submitAnswer('')

      // A blank answer is still a recorded turn — the index has to move or the
      // simulation sits on the same question forever.
      expect(simulationState.value.answers).toEqual([''])
      expect(simulationState.value.currentQuestionIndex).toBe(1)
    })

    it('should keep the answers after the simulation ends, for review', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { simulationState, submitAnswer, endSimulation } = useInterview()

      submitAnswer('an answer')
      endSimulation()

      expect(simulationState.value.isActive).toBe(false)
      expect(simulationState.value.answers).toEqual(['an answer'])
    })

    it('should carry nothing over into the next simulation', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { simulationState, submitAnswer, endSimulation, startSimulation } =
        useInterview()

      submitAnswer('an answer from the previous run')
      endSimulation()
      startSimulation()

      expect(simulationState.value.answers).toEqual([])
      expect(simulationState.value.currentQuestionIndex).toBe(0)
    })
  })

  describe('updating simulation settings', () => {
    const DEFAULTS = { mode: 'text' as const, category: 'all', timeLimit: 120 }

    afterEach(async () => {
      // Shared module state again: leave the defaults as they were found.
      const { useInterview } = await import('../../composables/useInterview')
      useInterview().updateSettings(DEFAULTS)
    })

    it('should apply a partial change without clearing the rest', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { simulationSettings, updateSettings } = useInterview()

      updateSettings({ mode: 'voice' })

      expect(simulationSettings.value).toEqual({
        mode: 'voice',
        category: 'all',
        timeLimit: 120,
      })
    })

    it('should narrow the simulation to one question category', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { simulationSettings, updateSettings } = useInterview()

      updateSettings({ category: 'behavioral' })

      expect(simulationSettings.value.category).toBe('behavioral')
      expect(simulationSettings.value.mode).toBe('text')
    })

    it('should change the per-question time limit', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { simulationSettings, updateSettings } = useInterview()

      updateSettings({ timeLimit: 60 })

      expect(simulationSettings.value.timeLimit).toBe(60)
    })

    it('should apply several changes at once', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { simulationSettings, updateSettings } = useInterview()

      updateSettings({ mode: 'voice', category: 'salary', timeLimit: 180 })

      expect(simulationSettings.value).toEqual({
        mode: 'voice',
        category: 'salary',
        timeLimit: 180,
      })
    })

    it('should leave settings untouched when given nothing to change', async () => {
      const { useInterview } = await import('../../composables/useInterview')
      const { simulationSettings, updateSettings } = useInterview()

      updateSettings({})

      expect(simulationSettings.value).toEqual(DEFAULTS)
    })

    it('should be visible to every caller of the composable', async () => {
      // The settings ref lives at module scope, so the settings panel and the
      // simulation page are looking at the same object, not two copies.
      const { useInterview } = await import('../../composables/useInterview')
      useInterview().updateSettings({ timeLimit: 45 })

      expect(useInterview().simulationSettings.value.timeLimit).toBe(45)
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
