import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

describe('Resume Components', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('ResumeHero', () => {
    it('renders hero section', async () => {
      const ResumeHero = await import('../../components/resume/ResumeHero.vue')
      const wrapper = await mountSuspended(ResumeHero.default, {
        props: { loading: false },
      })

      expect(wrapper.text()).toContain('Resume')
    })

    it('shows skeleton when loading', async () => {
      const ResumeHero = await import('../../components/resume/ResumeHero.vue')
      const wrapper = await mountSuspended(ResumeHero.default, {
        props: { loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('WhatIsResume', () => {
    const mockContent = ['A resume is...', 'Keep it concise']

    it('renders what is resume content', async () => {
      const WhatIsResume = await import('../../components/resume/WhatIsResume.vue')
      const wrapper = await mountSuspended(WhatIsResume.default, {
        props: { content: mockContent, loading: false },
      })

      expect(wrapper.text()).toContain('A resume is')
    })

    it('shows skeleton when loading', async () => {
      const WhatIsResume = await import('../../components/resume/WhatIsResume.vue')
      const wrapper = await mountSuspended(WhatIsResume.default, {
        props: { content: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('WhatEmployersLookFor', () => {
    const mockItems = [
      { title: 'Experience', description: 'Relevant work' },
    ]

    it('renders employer expectations', async () => {
      const WhatEmployersLookFor = await import('../../components/resume/WhatEmployersLookFor.vue')
      const wrapper = await mountSuspended(WhatEmployersLookFor.default, {
        props: { items: mockItems, loading: false },
      })

      expect(wrapper.text()).toContain('Experience')
      expect(wrapper.text()).toContain('Relevant work')
    })

    it('shows skeleton when loading', async () => {
      const WhatEmployersLookFor = await import('../../components/resume/WhatEmployersLookFor.vue')
      const wrapper = await mountSuspended(WhatEmployersLookFor.default, {
        props: { items: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('CommonMistakes', () => {
    const mockMistakes = [
      { mistake: 'Generic resume', fix: 'Customize it' },
    ]

    it('renders common mistakes', async () => {
      const CommonMistakes = await import('../../components/resume/CommonMistakes.vue')
      const wrapper = await mountSuspended(CommonMistakes.default, {
        props: { mistakes: mockMistakes, loading: false },
      })

      expect(wrapper.text()).toContain('Generic resume')
      expect(wrapper.text()).toContain('Customize it')
    })

    it('shows skeleton when loading', async () => {
      const CommonMistakes = await import('../../components/resume/CommonMistakes.vue')
      const wrapper = await mountSuspended(CommonMistakes.default, {
        props: { mistakes: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('TemplateCard', () => {
    const mockTemplate = {
      id: 't1',
      name: 'Modern',
      category: 'fresh-grad',
      description: 'Clean design',
    }

    it('renders template card', async () => {
      const TemplateCard = await import('../../components/resume/TemplateCard.vue')
      const wrapper = await mountSuspended(TemplateCard.default, {
        props: { template: mockTemplate, loading: false },
      })

      expect(wrapper.text()).toContain('Modern')
      expect(wrapper.text()).toContain('Clean design')
    })

    it('shows skeleton when loading', async () => {
      const TemplateCard = await import('../../components/resume/TemplateCard.vue')
      const wrapper = await mountSuspended(TemplateCard.default, {
        props: { template: null, loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('CoverLetterStructure', () => {
    const mockSections = [
      { title: 'Opening', content: 'State position' },
    ]

    it('renders cover letter structure', async () => {
      const CoverLetterStructure = await import('../../components/resume/CoverLetterStructure.vue')
      const wrapper = await mountSuspended(CoverLetterStructure.default, {
        props: { sections: mockSections, loading: false },
      })

      expect(wrapper.text()).toContain('Opening')
      expect(wrapper.text()).toContain('State position')
    })

    it('shows skeleton when loading', async () => {
      const CoverLetterStructure = await import('../../components/resume/CoverLetterStructure.vue')
      const wrapper = await mountSuspended(CoverLetterStructure.default, {
        props: { sections: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('CoverLetterExample', () => {
    const mockExample = {
      title: 'Fresh Grad',
      content: 'Dear Hiring Manager...',
    }

    it('renders cover letter example', async () => {
      const CoverLetterExample = await import('../../components/resume/CoverLetterExample.vue')
      const wrapper = await mountSuspended(CoverLetterExample.default, {
        props: { example: mockExample, loading: false },
      })

      expect(wrapper.text()).toContain('Fresh Grad')
      expect(wrapper.text()).toContain('Dear Hiring Manager')
    })

    it('shows skeleton when loading', async () => {
      const CoverLetterExample = await import('../../components/resume/CoverLetterExample.vue')
      const wrapper = await mountSuspended(CoverLetterExample.default, {
        props: { example: null, loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('ATSTips', () => {
    const mockTips = ['Use standard headings', 'Avoid tables']

    it('renders ATS tips', async () => {
      const ATSTips = await import('../../components/resume/ATSTips.vue')
      const wrapper = await mountSuspended(ATSTips.default, {
        props: { tips: mockTips, loading: false },
      })

      expect(wrapper.text()).toContain('Use standard headings')
    })

    it('shows skeleton when loading', async () => {
      const ATSTips = await import('../../components/resume/ATSTips.vue')
      const wrapper = await mountSuspended(ATSTips.default, {
        props: { tips: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })
})
