import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

describe('Self-Promotion Components', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('BrandingHero', () => {
    it('renders hero section', async () => {
      const BrandingHero = await import('../../components/self-promotion/BrandingHero.vue')
      const wrapper = await mountSuspended(BrandingHero.default, {
        props: { loading: false },
      })

      expect(wrapper.text()).toContain('Personal Branding')
    })

    it('shows skeleton when loading', async () => {
      const BrandingHero = await import('../../components/self-promotion/BrandingHero.vue')
      const wrapper = await mountSuspended(BrandingHero.default, {
        props: { loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('StrengthsSection', () => {
    const mockCategories = [
      { title: 'Communication', strengths: ['Speaking', 'Writing'] },
      { title: 'Technical', strengths: ['Coding', 'Design'] },
    ]

    it('renders strengths categories', async () => {
      const StrengthsSection = await import('../../components/self-promotion/StrengthsSection.vue')
      const wrapper = await mountSuspended(StrengthsSection.default, {
        props: { categories: mockCategories, loading: false },
      })

      expect(wrapper.text()).toContain('Communication')
      expect(wrapper.text()).toContain('Speaking')
    })

    it('shows skeleton when loading', async () => {
      const StrengthsSection = await import('../../components/self-promotion/StrengthsSection.vue')
      const wrapper = await mountSuspended(StrengthsSection.default, {
        props: { categories: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('StorySection', () => {
    const mockTemplates = [
      { title: 'Origin', prompt: 'What sparked?', example: 'I discovered...' },
    ]

    it('renders story templates', async () => {
      const StorySection = await import('../../components/self-promotion/StorySection.vue')
      const wrapper = await mountSuspended(StorySection.default, {
        props: { templates: mockTemplates, loading: false },
      })

      expect(wrapper.text()).toContain('Origin')
      expect(wrapper.text()).toContain('What sparked?')
    })

    it('shows skeleton when loading', async () => {
      const StorySection = await import('../../components/self-promotion/StorySection.vue')
      const wrapper = await mountSuspended(StorySection.default, {
        props: { templates: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('LinkedInHeadlines', () => {
    const mockExamples = [
      { type: 'Student', example: 'CS Student @ NUS', tip: 'Shows education' },
    ]

    it('renders headline examples', async () => {
      const LinkedInHeadlines = await import('../../components/self-promotion/LinkedInHeadlines.vue')
      const wrapper = await mountSuspended(LinkedInHeadlines.default, {
        props: { examples: mockExamples, loading: false },
      })

      expect(wrapper.text()).toContain('Student')
      expect(wrapper.text()).toContain('CS Student @ NUS')
    })

    it('shows skeleton when loading', async () => {
      const LinkedInHeadlines = await import('../../components/self-promotion/LinkedInHeadlines.vue')
      const wrapper = await mountSuspended(LinkedInHeadlines.default, {
        props: { examples: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('AboutMeSection', () => {
    const mockTemplates = [
      { title: 'Fresh Grad', template: 'Hi, I am...' },
    ]

    it('renders about me templates', async () => {
      const AboutMeSection = await import('../../components/self-promotion/AboutMeSection.vue')
      const wrapper = await mountSuspended(AboutMeSection.default, {
        props: { templates: mockTemplates, loading: false },
      })

      expect(wrapper.text()).toContain('Fresh Grad')
    })

    it('shows skeleton when loading', async () => {
      const AboutMeSection = await import('../../components/self-promotion/AboutMeSection.vue')
      const wrapper = await mountSuspended(AboutMeSection.default, {
        props: { templates: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('PostIdeasSection', () => {
    const mockIdeas = [
      { title: 'Share Learning', description: 'Document journey', example: 'Just completed...' },
    ]

    it('renders post ideas', async () => {
      const PostIdeasSection = await import('../../components/self-promotion/PostIdeasSection.vue')
      const wrapper = await mountSuspended(PostIdeasSection.default, {
        props: { ideas: mockIdeas, loading: false },
      })

      expect(wrapper.text()).toContain('Share Learning')
      expect(wrapper.text()).toContain('Document journey')
    })

    it('shows skeleton when loading', async () => {
      const PostIdeasSection = await import('../../components/self-promotion/PostIdeasSection.vue')
      const wrapper = await mountSuspended(PostIdeasSection.default, {
        props: { ideas: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('FirstDaySection', () => {
    const mockGuide = [
      { title: 'Before Arrival', tips: ['Confirm time', 'Prepare outfit'] },
    ]

    it('renders first day guide', async () => {
      const FirstDaySection = await import('../../components/self-promotion/FirstDaySection.vue')
      const wrapper = await mountSuspended(FirstDaySection.default, {
        props: { guide: mockGuide, loading: false },
      })

      expect(wrapper.text()).toContain('Before Arrival')
      expect(wrapper.text()).toContain('Confirm time')
    })

    it('shows skeleton when loading', async () => {
      const FirstDaySection = await import('../../components/self-promotion/FirstDaySection.vue')
      const wrapper = await mountSuspended(FirstDaySection.default, {
        props: { guide: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('FeedbackSection', () => {
    const mockTips = [
      { scenario: 'Critical feedback', response: 'Thank you...' },
    ]

    it('renders feedback tips', async () => {
      const FeedbackSection = await import('../../components/self-promotion/FeedbackSection.vue')
      const wrapper = await mountSuspended(FeedbackSection.default, {
        props: { tips: mockTips, loading: false },
      })

      expect(wrapper.text()).toContain('Critical feedback')
      expect(wrapper.text()).toContain('Thank you')
    })

    it('shows skeleton when loading', async () => {
      const FeedbackSection = await import('../../components/self-promotion/FeedbackSection.vue')
      const wrapper = await mountSuspended(FeedbackSection.default, {
        props: { tips: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('EmailTemplatesSection', () => {
    const mockTemplates = [
      { title: 'Clarification', subject: 'Quick Question', body: 'Hi...' },
    ]

    it('renders email templates', async () => {
      const EmailTemplatesSection = await import('../../components/self-promotion/EmailTemplatesSection.vue')
      const wrapper = await mountSuspended(EmailTemplatesSection.default, {
        props: { templates: mockTemplates, loading: false },
      })

      expect(wrapper.text()).toContain('Clarification')
      expect(wrapper.text()).toContain('Quick Question')
    })

    it('shows skeleton when loading', async () => {
      const EmailTemplatesSection = await import('../../components/self-promotion/EmailTemplatesSection.vue')
      const wrapper = await mountSuspended(EmailTemplatesSection.default, {
        props: { templates: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })
})
