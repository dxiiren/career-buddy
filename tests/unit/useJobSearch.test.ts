import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('useJobSearch', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('job search overview content', () => {
    it('should have where to search platforms', async () => {
      const { useJobSearch } = await import('../../composables/useJobSearch')
      const { searchPlatforms } = useJobSearch()

      expect(searchPlatforms.value.length).toBeGreaterThan(0)
      searchPlatforms.value.forEach(platform => {
        expect(platform).toHaveProperty('name')
        expect(platform).toHaveProperty('description')
      })
    })

    it('should have filtering tips', async () => {
      const { useJobSearch } = await import('../../composables/useJobSearch')
      const { filteringTips } = useJobSearch()

      expect(filteringTips.value.length).toBeGreaterThan(0)
    })

    it('should have common mistakes', async () => {
      const { useJobSearch } = await import('../../composables/useJobSearch')
      const { commonMistakes } = useJobSearch()

      expect(commonMistakes.value.length).toBeGreaterThan(0)
      commonMistakes.value.forEach(mistake => {
        expect(mistake).toHaveProperty('mistake')
        expect(mistake).toHaveProperty('solution')
      })
    })
  })

  describe('platform guide content', () => {
    it('should have detailed platform data', async () => {
      const { useJobSearch } = await import('../../composables/useJobSearch')
      const { platforms } = useJobSearch()

      expect(platforms.value.length).toBeGreaterThan(0)
      platforms.value.forEach(platform => {
        expect(platform).toHaveProperty('id')
        expect(platform).toHaveProperty('name')
        expect(platform).toHaveProperty('pros')
        expect(platform).toHaveProperty('cons')
        expect(platform).toHaveProperty('howToUse')
        expect(platform).toHaveProperty('whoShouldUse')
      })
    })
  })

  describe('salary content', () => {
    it('should have salary ranges by role', async () => {
      const { useJobSearch } = await import('../../composables/useJobSearch')
      const { salaryRanges } = useJobSearch()

      expect(salaryRanges.value.length).toBeGreaterThan(0)
      salaryRanges.value.forEach(range => {
        expect(range).toHaveProperty('role')
        expect(range).toHaveProperty('industry')
        expect(range).toHaveProperty('minSalary')
        expect(range).toHaveProperty('maxSalary')
      })
    })

    it('should have cost of living data', async () => {
      const { useJobSearch } = await import('../../composables/useJobSearch')
      const { costOfLiving } = useJobSearch()

      expect(costOfLiving.value.length).toBeGreaterThan(0)
      costOfLiving.value.forEach(city => {
        expect(city).toHaveProperty('city')
        expect(city).toHaveProperty('averageRent')
        expect(city).toHaveProperty('averageFood')
      })
    })

    it('should have expected salary answer scripts', async () => {
      const { useJobSearch } = await import('../../composables/useJobSearch')
      const { salaryAnswerScripts } = useJobSearch()

      expect(salaryAnswerScripts.value.length).toBeGreaterThan(0)
      salaryAnswerScripts.value.forEach(script => {
        expect(script).toHaveProperty('scenario')
        expect(script).toHaveProperty('script')
      })
    })

    it('should have negotiation scripts', async () => {
      const { useJobSearch } = await import('../../composables/useJobSearch')
      const { negotiationScripts } = useJobSearch()

      expect(negotiationScripts.value.length).toBeGreaterThan(0)
      negotiationScripts.value.forEach(script => {
        expect(script).toHaveProperty('situation')
        expect(script).toHaveProperty('whatToSay')
      })
    })
  })

  describe('scam awareness content', () => {
    it('should have scam tactics warning signs', async () => {
      const { useJobSearch } = await import('../../composables/useJobSearch')
      const { scamTactics } = useJobSearch()

      expect(scamTactics.value.length).toBeGreaterThan(0)
      scamTactics.value.forEach(tactic => {
        expect(tactic).toHaveProperty('sign')
        expect(tactic).toHaveProperty('explanation')
      })
    })

    it('should have real scam examples', async () => {
      const { useJobSearch } = await import('../../composables/useJobSearch')
      const { scamExamples } = useJobSearch()

      expect(scamExamples.value.length).toBeGreaterThan(0)
      scamExamples.value.forEach(example => {
        expect(example).toHaveProperty('title')
        expect(example).toHaveProperty('description')
        expect(example).toHaveProperty('redFlags')
      })
    })

    it('should have verification checklist', async () => {
      const { useJobSearch } = await import('../../composables/useJobSearch')
      const { verificationChecklist } = useJobSearch()

      expect(verificationChecklist.value.length).toBeGreaterThan(0)
    })

    it('should have what to do if suspicious', async () => {
      const { useJobSearch } = await import('../../composables/useJobSearch')
      const { suspiciousActions } = useJobSearch()

      expect(suspiciousActions.value.length).toBeGreaterThan(0)
    })
  })

  describe('loading state', () => {
    it('should have isLoading state', async () => {
      const { useJobSearch } = await import('../../composables/useJobSearch')
      const { isLoading } = useJobSearch()

      expect(isLoading.value).toBe(false)
    })

    it('should set isLoading during loadJobSearch', async () => {
      const { useJobSearch } = await import('../../composables/useJobSearch')
      const { isLoading, loadJobSearch } = useJobSearch()

      const promise = loadJobSearch()
      expect(isLoading.value).toBe(true)

      await vi.advanceTimersByTimeAsync(1000)
      await promise

      expect(isLoading.value).toBe(false)
    })
  })
})
