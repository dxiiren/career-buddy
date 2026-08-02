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

  describe('builder persistence', () => {
    interface StubStorage {
      getItem: ReturnType<typeof vi.fn>
      setItem: ReturnType<typeof vi.fn>
      removeItem: ReturnType<typeof vi.fn>
    }

    function makeStubStorage(initial: string | null = null): StubStorage {
      return {
        getItem: vi.fn(() => initial),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      }
    }

    it('starts with default builder state', async () => {
      const { useResume } = await import('../../composables/useResume')
      const { builderState, resetBuilder } = useResume(makeStubStorage())

      resetBuilder()
      expect(builderState.value).toEqual({
        selectedTemplateId: null,
        selectedCategory: 'all',
      })
    })

    it('rehydrates from localStorage on init', async () => {
      const { useResume, RESUME_BUILDER_STORAGE_KEY } = await import('../../composables/useResume')
      const saved = JSON.stringify({ selectedTemplateId: 'tech-developer', selectedCategory: 'technical' })
      const storage = makeStubStorage(saved)
      const { builderState, initBuilder, resetBuilder } = useResume(storage)

      resetBuilder()
      initBuilder()

      expect(storage.getItem).toHaveBeenCalledWith(RESUME_BUILDER_STORAGE_KEY)
      expect(builderState.value).toEqual({
        selectedTemplateId: 'tech-developer',
        selectedCategory: 'technical',
      })
    })

    it('persists template selection through the storage adapter', async () => {
      const { useResume, RESUME_BUILDER_STORAGE_KEY } = await import('../../composables/useResume')
      const storage = makeStubStorage()
      const { selectTemplate, resetBuilder } = useResume(storage)

      resetBuilder()
      selectTemplate('fresh-grad-modern')

      expect(storage.setItem).toHaveBeenCalledWith(
        RESUME_BUILDER_STORAGE_KEY,
        JSON.stringify({ selectedTemplateId: 'fresh-grad-modern', selectedCategory: 'all' }),
      )
    })

    it('persists category selection through the storage adapter', async () => {
      const { useResume, RESUME_BUILDER_STORAGE_KEY } = await import('../../composables/useResume')
      const storage = makeStubStorage()
      const { builderState, selectCategory, resetBuilder } = useResume(storage)

      resetBuilder()
      selectCategory('internship')

      expect(builderState.value.selectedCategory).toBe('internship')
      expect(storage.setItem).toHaveBeenCalledWith(
        RESUME_BUILDER_STORAGE_KEY,
        JSON.stringify({ selectedTemplateId: null, selectedCategory: 'internship' }),
      )
    })

    it('keeps defaults when storage holds corrupt JSON', async () => {
      const { useResume } = await import('../../composables/useResume')
      const storage = makeStubStorage('{not-json')
      const { builderState, initBuilder, resetBuilder } = useResume(storage)

      resetBuilder()
      initBuilder()

      expect(builderState.value).toEqual({
        selectedTemplateId: null,
        selectedCategory: 'all',
      })
    })

    it('keeps defaults when storage holds a wrong shape', async () => {
      const { useResume } = await import('../../composables/useResume')
      const storage = makeStubStorage(JSON.stringify({ selectedTemplateId: 42 }))
      const { builderState, initBuilder, resetBuilder } = useResume(storage)

      resetBuilder()
      initBuilder()

      expect(builderState.value).toEqual({
        selectedTemplateId: null,
        selectedCategory: 'all',
      })
    })

    it('resetBuilder clears the stored state', async () => {
      const { useResume, RESUME_BUILDER_STORAGE_KEY } = await import('../../composables/useResume')
      const storage = makeStubStorage()
      const { builderState, selectTemplate, resetBuilder } = useResume(storage)

      resetBuilder()
      selectTemplate('creative-portfolio')
      resetBuilder()

      expect(storage.removeItem).toHaveBeenCalledWith(RESUME_BUILDER_STORAGE_KEY)
      expect(builderState.value).toEqual({
        selectedTemplateId: null,
        selectedCategory: 'all',
      })
    })

    describe('pure serializers', () => {
      it('parseBuilderState round-trips serializeBuilderState', async () => {
        const { parseBuilderState, serializeBuilderState } = await import('../../composables/useResume')
        const state = { selectedTemplateId: 'career-changer', selectedCategory: 'career-switch' }

        expect(parseBuilderState(serializeBuilderState(state))).toEqual(state)
      })

      it('parseBuilderState returns null for null, corrupt, or malformed input', async () => {
        const { parseBuilderState } = await import('../../composables/useResume')

        expect(parseBuilderState(null)).toBeNull()
        expect(parseBuilderState('{oops')).toBeNull()
        expect(parseBuilderState(JSON.stringify('a string'))).toBeNull()
        expect(parseBuilderState(JSON.stringify({ selectedTemplateId: 42, selectedCategory: 'all' }))).toBeNull()
        expect(parseBuilderState(JSON.stringify({ selectedTemplateId: null }))).toBeNull()
      })
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
