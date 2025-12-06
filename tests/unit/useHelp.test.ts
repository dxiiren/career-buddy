import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('useHelp', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.resetModules()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('initial state', () => {
    it('should have initial loading state as false', async () => {
      const { useHelp } = await import('../../composables/useHelp')
      const { isLoading } = useHelp()

      expect(isLoading.value).toBe(false)
    })

    it('should have FAQ items array', async () => {
      const { useHelp } = await import('../../composables/useHelp')
      const { faqItems } = useHelp()

      expect(Array.isArray(faqItems.value)).toBe(true)
      expect(faqItems.value.length).toBeGreaterThan(0)
    })

    it('should have FAQ categories', async () => {
      const { useHelp } = await import('../../composables/useHelp')
      const { faqCategories } = useHelp()

      expect(Array.isArray(faqCategories.value)).toBe(true)
      expect(faqCategories.value.length).toBeGreaterThan(0)
      expect(faqCategories.value[0]).toHaveProperty('id')
      expect(faqCategories.value[0]).toHaveProperty('name')
    })

    it('should have help resources', async () => {
      const { useHelp } = await import('../../composables/useHelp')
      const { helpResources } = useHelp()

      expect(Array.isArray(helpResources.value)).toBe(true)
      expect(helpResources.value.length).toBeGreaterThan(0)
      expect(helpResources.value[0]).toHaveProperty('title')
      expect(helpResources.value[0]).toHaveProperty('href')
    })
  })

  describe('loading state', () => {
    it('should set isLoading during loadHelp', async () => {
      const { useHelp } = await import('../../composables/useHelp')
      const { isLoading, loadHelp } = useHelp()

      const promise = loadHelp()
      expect(isLoading.value).toBe(true)

      await vi.advanceTimersByTimeAsync(1000)
      await promise

      expect(isLoading.value).toBe(false)
    })
  })

  describe('FAQ filtering', () => {
    it('should filter FAQs by search query (case insensitive)', async () => {
      const { useHelp } = await import('../../composables/useHelp')
      const { faqItems, filteredFAQs, searchFAQ } = useHelp()

      // Get initial count
      const initialCount = faqItems.value.length

      // Search for something specific
      searchFAQ('resume')

      expect(filteredFAQs.value.length).toBeLessThan(initialCount)
      expect(filteredFAQs.value.every(item =>
        item.question.toLowerCase().includes('resume') ||
        item.answer.toLowerCase().includes('resume')
      )).toBe(true)
    })

    it('should filter FAQs by category', async () => {
      const { useHelp } = await import('../../composables/useHelp')
      const { filteredFAQs, filterByCategory } = useHelp()

      filterByCategory('resume')

      expect(filteredFAQs.value.length).toBeGreaterThan(0)
      expect(filteredFAQs.value.every(item => item.category === 'resume')).toBe(true)
    })

    it('should clear filters', async () => {
      const { useHelp } = await import('../../composables/useHelp')
      const { faqItems, filteredFAQs, searchFAQ, filterByCategory, clearFilters } = useHelp()

      // Apply filters
      searchFAQ('resume')
      filterByCategory('resume')

      // Clear filters
      clearFilters()

      expect(filteredFAQs.value.length).toBe(faqItems.value.length)
    })
  })

  describe('contact form validation', () => {
    it('should validate contact form - name required', async () => {
      const { useHelp } = await import('../../composables/useHelp')
      const { submitContactForm, contactErrors } = useHelp()

      const result = await submitContactForm({
        name: '',
        email: 'test@example.com',
        subject: 'General Inquiry',
        message: 'Test message',
      })

      expect(result.success).toBe(false)
      expect(contactErrors.value.name).toBe('Name is required')
    })

    it('should validate contact form - email format', async () => {
      const { useHelp } = await import('../../composables/useHelp')
      const { submitContactForm, contactErrors } = useHelp()

      const result = await submitContactForm({
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'General Inquiry',
        message: 'Test message',
      })

      expect(result.success).toBe(false)
      expect(contactErrors.value.email).toBe('Please enter a valid email address')
    })

    it('should validate contact form - subject required', async () => {
      const { useHelp } = await import('../../composables/useHelp')
      const { submitContactForm, contactErrors } = useHelp()

      const result = await submitContactForm({
        name: 'John Doe',
        email: 'test@example.com',
        subject: '',
        message: 'Test message',
      })

      expect(result.success).toBe(false)
      expect(contactErrors.value.subject).toBe('Subject is required')
    })

    it('should validate contact form - message required', async () => {
      const { useHelp } = await import('../../composables/useHelp')
      const { submitContactForm, contactErrors } = useHelp()

      const result = await submitContactForm({
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'General Inquiry',
        message: '',
      })

      expect(result.success).toBe(false)
      expect(contactErrors.value.message).toBe('Message is required')
    })

    it('should submit valid contact form successfully', async () => {
      const { useHelp } = await import('../../composables/useHelp')
      const { submitContactForm, contactErrors } = useHelp()

      const promise = submitContactForm({
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'General Inquiry',
        message: 'This is a test message with enough content.',
      })

      await vi.advanceTimersByTimeAsync(1000)
      const result = await promise

      expect(result.success).toBe(true)
      expect(contactErrors.value.name).toBeFalsy()
      expect(contactErrors.value.email).toBeFalsy()
      expect(contactErrors.value.subject).toBeFalsy()
      expect(contactErrors.value.message).toBeFalsy()
    })

    it('should set isSubmitting during form submission', async () => {
      const { useHelp } = await import('../../composables/useHelp')
      const { submitContactForm, isSubmitting } = useHelp()

      const promise = submitContactForm({
        name: 'John Doe',
        email: 'test@example.com',
        subject: 'General Inquiry',
        message: 'This is a test message.',
      })

      expect(isSubmitting.value).toBe(true)

      await vi.advanceTimersByTimeAsync(1000)
      await promise

      expect(isSubmitting.value).toBe(false)
    })
  })
})
