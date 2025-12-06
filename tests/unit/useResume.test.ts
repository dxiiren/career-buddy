import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('useResume', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('resume overview content', () => {
    it('should have what is resume content', async () => {
      const { useResume } = await import('../../composables/useResume')
      const { whatIsResume } = useResume()

      expect(whatIsResume.value.length).toBeGreaterThan(0)
    })

    it('should have what employers look for', async () => {
      const { useResume } = await import('../../composables/useResume')
      const { employerLookFor } = useResume()

      expect(employerLookFor.value.length).toBeGreaterThan(0)
      employerLookFor.value.forEach(item => {
        expect(item).toHaveProperty('title')
        expect(item).toHaveProperty('description')
      })
    })

    it('should have common mistakes', async () => {
      const { useResume } = await import('../../composables/useResume')
      const { resumeMistakes } = useResume()

      expect(resumeMistakes.value.length).toBeGreaterThan(0)
      resumeMistakes.value.forEach(mistake => {
        expect(mistake).toHaveProperty('mistake')
        expect(mistake).toHaveProperty('fix')
      })
    })
  })

  describe('templates content', () => {
    it('should have resume templates', async () => {
      const { useResume } = await import('../../composables/useResume')
      const { templates } = useResume()

      expect(templates.value.length).toBeGreaterThan(0)
      templates.value.forEach(template => {
        expect(template).toHaveProperty('id')
        expect(template).toHaveProperty('name')
        expect(template).toHaveProperty('category')
        expect(template).toHaveProperty('description')
      })
    })

    it('should have template categories', async () => {
      const { useResume } = await import('../../composables/useResume')
      const { templateCategories } = useResume()

      expect(templateCategories.value.length).toBeGreaterThan(0)
    })
  })

  describe('cover letter content', () => {
    it('should have cover letter structure', async () => {
      const { useResume } = await import('../../composables/useResume')
      const { coverLetterStructure } = useResume()

      expect(coverLetterStructure.value.length).toBeGreaterThan(0)
      coverLetterStructure.value.forEach(section => {
        expect(section).toHaveProperty('title')
        expect(section).toHaveProperty('content')
      })
    })

    it('should have cover letter tips', async () => {
      const { useResume } = await import('../../composables/useResume')
      const { coverLetterTips } = useResume()

      expect(coverLetterTips.value.length).toBeGreaterThan(0)
    })

    it('should have cover letter examples', async () => {
      const { useResume } = await import('../../composables/useResume')
      const { coverLetterExamples } = useResume()

      expect(coverLetterExamples.value.length).toBeGreaterThan(0)
      coverLetterExamples.value.forEach(example => {
        expect(example).toHaveProperty('title')
        expect(example).toHaveProperty('content')
      })
    })
  })

  describe('ATS content', () => {
    it('should have ATS tips', async () => {
      const { useResume } = await import('../../composables/useResume')
      const { atsTips } = useResume()

      expect(atsTips.value.length).toBeGreaterThan(0)
    })

    it('should have ATS keywords guidance', async () => {
      const { useResume } = await import('../../composables/useResume')
      const { atsKeywords } = useResume()

      expect(atsKeywords.value.length).toBeGreaterThan(0)
    })
  })

  describe('loading state', () => {
    it('should have isLoading state', async () => {
      const { useResume } = await import('../../composables/useResume')
      const { isLoading } = useResume()

      expect(isLoading.value).toBe(false)
    })

    it('should set isLoading during loadResume', async () => {
      const { useResume } = await import('../../composables/useResume')
      const { isLoading, loadResume } = useResume()

      const promise = loadResume()
      expect(isLoading.value).toBe(true)

      await vi.advanceTimersByTimeAsync(1000)
      await promise

      expect(isLoading.value).toBe(false)
    })
  })
})
