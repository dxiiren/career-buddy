import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock clipboard API
const mockWriteText = vi.fn().mockResolvedValue(undefined)
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: mockWriteText,
  },
  writable: true,
  configurable: true,
})

describe('useNetworking', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
    mockWriteText.mockClear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('message templates', () => {
    it('should have initial templates data', async () => {
      const { useNetworking } = await import('../../composables/useNetworking')
      const { templates } = useNetworking()

      expect(templates.value.length).toBeGreaterThan(0)
    })

    it('should have templates for all categories', async () => {
      const { useNetworking } = await import('../../composables/useNetworking')
      const { templates, categories } = useNetworking()

      const templateCategories = new Set(templates.value.map(t => t.category))

      expect(categories.value.length).toBeGreaterThan(0)
      categories.value.forEach(cat => {
        expect(templateCategories.has(cat.id)).toBe(true)
      })
    })

    it('should have valid template structure', async () => {
      const { useNetworking } = await import('../../composables/useNetworking')
      const { templates } = useNetworking()

      templates.value.forEach(template => {
        expect(template).toHaveProperty('id')
        expect(template).toHaveProperty('category')
        expect(template).toHaveProperty('title')
        expect(template).toHaveProperty('template')
        expect(template).toHaveProperty('placeholders')
        expect(template).toHaveProperty('tones')
        expect(template.tones).toHaveProperty('formal')
        expect(template.tones).toHaveProperty('friendly')
        expect(template.tones).toHaveProperty('confident')
      })
    })

    it('should filter templates by category', async () => {
      const { useNetworking } = await import('../../composables/useNetworking')
      const { templates, getTemplatesByCategory } = useNetworking()

      const firstCategory = templates.value[0].category
      const filtered = getTemplatesByCategory(firstCategory)

      expect(filtered.length).toBeGreaterThan(0)
      filtered.forEach(t => {
        expect(t.category).toBe(firstCategory)
      })
    })
  })

  describe('tone selection', () => {
    it('should have default tone as formal', async () => {
      const { useNetworking } = await import('../../composables/useNetworking')
      const { currentTone } = useNetworking()

      expect(currentTone.value).toBe('formal')
    })

    it('should change tone', async () => {
      const { useNetworking } = await import('../../composables/useNetworking')
      const { currentTone, setTone } = useNetworking()

      setTone('friendly')
      expect(currentTone.value).toBe('friendly')

      setTone('confident')
      expect(currentTone.value).toBe('confident')
    })

    it('should get template content based on current tone', async () => {
      const { useNetworking } = await import('../../composables/useNetworking')
      const { templates, currentTone, setTone, getTemplateContent } = useNetworking()

      const template = templates.value[0]

      setTone('formal')
      expect(getTemplateContent(template)).toBe(template.tones.formal)

      setTone('friendly')
      expect(getTemplateContent(template)).toBe(template.tones.friendly)

      setTone('confident')
      expect(getTemplateContent(template)).toBe(template.tones.confident)
    })
  })

  describe('copy to clipboard', () => {
    it('should copy template content to clipboard', async () => {
      const { useNetworking } = await import('../../composables/useNetworking')
      const { copyToClipboard, copiedId } = useNetworking()

      await copyToClipboard('test-id', 'Hello World')

      expect(mockWriteText).toHaveBeenCalledWith('Hello World')
      expect(copiedId.value).toBe('test-id')
    })

    it('should reset copiedId after timeout', async () => {
      const { useNetworking } = await import('../../composables/useNetworking')
      const { copyToClipboard, copiedId } = useNetworking()

      await copyToClipboard('test-id', 'Hello')
      expect(copiedId.value).toBe('test-id')

      await vi.advanceTimersByTimeAsync(2000)
      expect(copiedId.value).toBe(null)
    })
  })

  describe('placeholder replacement', () => {
    it('should replace placeholders with values', async () => {
      const { useNetworking } = await import('../../composables/useNetworking')
      const { replacePlaceholders } = useNetworking()

      const template = 'Hello {name}, I am from {company}.'
      const values = { name: 'John', company: 'Acme Corp' }

      const result = replacePlaceholders(template, values)
      expect(result).toBe('Hello John, I am from Acme Corp.')
    })

    it('should keep placeholder if value not provided', async () => {
      const { useNetworking } = await import('../../composables/useNetworking')
      const { replacePlaceholders } = useNetworking()

      const template = 'Hello {name}, welcome to {company}.'
      const values = { name: 'Jane' }

      const result = replacePlaceholders(template, values)
      expect(result).toBe('Hello Jane, welcome to {company}.')
    })
  })

  describe('loading state', () => {
    it('should have isLoading state', async () => {
      const { useNetworking } = await import('../../composables/useNetworking')
      const { isLoading } = useNetworking()

      expect(isLoading.value).toBe(false)
    })

    it('should set isLoading during loadNetworking', async () => {
      const { useNetworking } = await import('../../composables/useNetworking')
      const { isLoading, loadNetworking } = useNetworking()

      const promise = loadNetworking()
      expect(isLoading.value).toBe(true)

      await vi.advanceTimersByTimeAsync(1000)
      await promise

      expect(isLoading.value).toBe(false)
    })
  })

  describe('networking overview content', () => {
    it('should have networking benefits data', async () => {
      const { useNetworking } = await import('../../composables/useNetworking')
      const { networkingBenefits } = useNetworking()

      expect(networkingBenefits.value.length).toBeGreaterThan(0)
      networkingBenefits.value.forEach(benefit => {
        expect(benefit).toHaveProperty('title')
        expect(benefit).toHaveProperty('description')
        expect(benefit).toHaveProperty('icon')
      })
    })

    it('should have networking types data', async () => {
      const { useNetworking } = await import('../../composables/useNetworking')
      const { networkingTypes } = useNetworking()

      expect(networkingTypes.value.length).toBeGreaterThan(0)
      networkingTypes.value.forEach(type => {
        expect(type).toHaveProperty('title')
        expect(type).toHaveProperty('description')
        expect(type).toHaveProperty('examples')
      })
    })

    it('should have common fears data', async () => {
      const { useNetworking } = await import('../../composables/useNetworking')
      const { commonFears } = useNetworking()

      expect(commonFears.value.length).toBeGreaterThan(0)
      commonFears.value.forEach(fear => {
        expect(fear).toHaveProperty('fear')
        expect(fear).toHaveProperty('solution')
      })
    })

    it('should have introduction tips', async () => {
      const { useNetworking } = await import('../../composables/useNetworking')
      const { introductionTips } = useNetworking()

      expect(introductionTips.value.length).toBeGreaterThan(0)
    })
  })
})
