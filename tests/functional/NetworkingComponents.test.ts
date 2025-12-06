import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

// Mock clipboard API
const mockWriteText = vi.fn().mockResolvedValue(undefined)
Object.defineProperty(navigator, 'clipboard', {
  value: { writeText: mockWriteText },
  writable: true,
  configurable: true,
})

describe('Networking Components', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
    mockWriteText.mockClear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('NetworkingHero', () => {
    it('renders hero section with title', async () => {
      const NetworkingHero = await import('../../components/networking/NetworkingHero.vue')
      const wrapper = await mountSuspended(NetworkingHero.default, {
        props: { loading: false },
      })

      expect(wrapper.text()).toContain('Networking')
    })

    it('shows skeleton when loading', async () => {
      const NetworkingHero = await import('../../components/networking/NetworkingHero.vue')
      const wrapper = await mountSuspended(NetworkingHero.default, {
        props: { loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('WhyNetworkingSection', () => {
    it('renders benefits list', async () => {
      const WhyNetworkingSection = await import('../../components/networking/WhyNetworkingSection.vue')
      const benefits = [
        { title: 'Benefit 1', description: 'Description 1', icon: 'Key' },
        { title: 'Benefit 2', description: 'Description 2', icon: 'Users' },
      ]
      const wrapper = await mountSuspended(WhyNetworkingSection.default, {
        props: { benefits, loading: false },
      })

      expect(wrapper.text()).toContain('Benefit 1')
      expect(wrapper.text()).toContain('Benefit 2')
    })

    it('shows skeleton when loading', async () => {
      const WhyNetworkingSection = await import('../../components/networking/WhyNetworkingSection.vue')
      const wrapper = await mountSuspended(WhyNetworkingSection.default, {
        props: { benefits: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('NetworkingTypesSection', () => {
    it('renders networking types', async () => {
      const NetworkingTypesSection = await import('../../components/networking/NetworkingTypesSection.vue')
      const types = [
        { title: 'Online', description: 'Digital networking', examples: ['LinkedIn', 'Webinars'] },
        { title: 'Offline', description: 'In-person networking', examples: ['Events', 'Meetups'] },
      ]
      const wrapper = await mountSuspended(NetworkingTypesSection.default, {
        props: { types, loading: false },
      })

      expect(wrapper.text()).toContain('Online')
      expect(wrapper.text()).toContain('Offline')
      expect(wrapper.text()).toContain('LinkedIn')
    })

    it('shows skeleton when loading', async () => {
      const NetworkingTypesSection = await import('../../components/networking/NetworkingTypesSection.vue')
      const wrapper = await mountSuspended(NetworkingTypesSection.default, {
        props: { types: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('OvercomingFearsSection', () => {
    it('renders fears and solutions', async () => {
      const OvercomingFearsSection = await import('../../components/networking/OvercomingFearsSection.vue')
      const fears = [
        { fear: "I'm shy", solution: 'Start small' },
        { fear: "I don't know anyone", solution: 'Attend events' },
      ]
      const wrapper = await mountSuspended(OvercomingFearsSection.default, {
        props: { fears, loading: false },
      })

      expect(wrapper.text()).toContain("I'm shy")
      expect(wrapper.text()).toContain('Start small')
    })

    it('shows skeleton when loading', async () => {
      const OvercomingFearsSection = await import('../../components/networking/OvercomingFearsSection.vue')
      const wrapper = await mountSuspended(OvercomingFearsSection.default, {
        props: { fears: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('IntroductionGuide', () => {
    it('renders introduction tips', async () => {
      const IntroductionGuide = await import('../../components/networking/IntroductionGuide.vue')
      const tips = ['Tip 1', 'Tip 2', 'Tip 3']
      const wrapper = await mountSuspended(IntroductionGuide.default, {
        props: { tips, loading: false },
      })

      expect(wrapper.text()).toContain('Tip 1')
      expect(wrapper.text()).toContain('Tip 2')
    })

    it('shows skeleton when loading', async () => {
      const IntroductionGuide = await import('../../components/networking/IntroductionGuide.vue')
      const wrapper = await mountSuspended(IntroductionGuide.default, {
        props: { tips: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('TemplateCategory', () => {
    it('renders category with title and description', async () => {
      const TemplateCategory = await import('../../components/networking/TemplateCategory.vue')
      const wrapper = await mountSuspended(TemplateCategory.default, {
        props: {
          category: { id: 'senior', name: 'Message to Senior', description: 'Reach out to seniors', icon: 'UserCheck' },
          loading: false,
        },
        slots: {
          default: '<div class="slot-content">Templates here</div>',
        },
      })

      expect(wrapper.text()).toContain('Message to Senior')
      expect(wrapper.text()).toContain('Reach out to seniors')
    })

    it('shows skeleton when loading', async () => {
      const TemplateCategory = await import('../../components/networking/TemplateCategory.vue')
      const wrapper = await mountSuspended(TemplateCategory.default, {
        props: {
          category: { id: 'senior', name: 'Test', description: 'Test', icon: 'UserCheck' },
          loading: true,
        },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('MessageTemplate', () => {
    const mockTemplate = {
      id: '1',
      category: 'senior' as const,
      title: 'Asking for Advice',
      template: 'Hello {name}...',
      placeholders: ['{name}', '{company}'],
      tones: {
        formal: 'Dear {name}, I hope this finds you well...',
        friendly: 'Hey {name}! Hope you are doing great...',
        confident: 'Hello {name}, I am reaching out because...',
      },
    }

    it('renders template title and content', async () => {
      const MessageTemplate = await import('../../components/networking/MessageTemplate.vue')
      const wrapper = await mountSuspended(MessageTemplate.default, {
        props: {
          template: mockTemplate,
          currentTone: 'formal',
          copiedId: null,
          loading: false,
        },
      })

      expect(wrapper.text()).toContain('Asking for Advice')
      expect(wrapper.text()).toContain('Dear {name}')
    })

    it('displays content based on current tone', async () => {
      const MessageTemplate = await import('../../components/networking/MessageTemplate.vue')
      const wrapper = await mountSuspended(MessageTemplate.default, {
        props: {
          template: mockTemplate,
          currentTone: 'friendly',
          copiedId: null,
          loading: false,
        },
      })

      expect(wrapper.text()).toContain('Hey {name}')
    })

    it('shows copy button', async () => {
      const MessageTemplate = await import('../../components/networking/MessageTemplate.vue')
      const wrapper = await mountSuspended(MessageTemplate.default, {
        props: {
          template: mockTemplate,
          currentTone: 'formal',
          copiedId: null,
          loading: false,
        },
      })

      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('emits copy event when copy button clicked', async () => {
      const MessageTemplate = await import('../../components/networking/MessageTemplate.vue')
      const wrapper = await mountSuspended(MessageTemplate.default, {
        props: {
          template: mockTemplate,
          currentTone: 'formal',
          copiedId: null,
          loading: false,
        },
      })

      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted('copy')).toBeTruthy()
    })

    it('shows "Copied!" when copiedId matches', async () => {
      const MessageTemplate = await import('../../components/networking/MessageTemplate.vue')
      const wrapper = await mountSuspended(MessageTemplate.default, {
        props: {
          template: mockTemplate,
          currentTone: 'formal',
          copiedId: '1',
          loading: false,
        },
      })

      expect(wrapper.text()).toContain('Copied')
    })

    it('shows skeleton when loading', async () => {
      const MessageTemplate = await import('../../components/networking/MessageTemplate.vue')
      const wrapper = await mountSuspended(MessageTemplate.default, {
        props: {
          template: mockTemplate,
          currentTone: 'formal',
          copiedId: null,
          loading: true,
        },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('ToneSelector', () => {
    it('renders all tone options', async () => {
      const ToneSelector = await import('../../components/networking/ToneSelector.vue')
      const wrapper = await mountSuspended(ToneSelector.default, {
        props: {
          currentTone: 'formal',
          loading: false,
        },
      })

      expect(wrapper.text()).toContain('Formal')
      expect(wrapper.text()).toContain('Friendly')
      expect(wrapper.text()).toContain('Confident')
    })

    it('highlights current tone', async () => {
      const ToneSelector = await import('../../components/networking/ToneSelector.vue')
      const wrapper = await mountSuspended(ToneSelector.default, {
        props: {
          currentTone: 'friendly',
          loading: false,
        },
      })

      const friendlyButton = wrapper.findAll('button').find(btn => btn.text().includes('Friendly'))
      expect(friendlyButton?.classes().join(' ')).toContain('bg-primary')
    })

    it('emits change event when tone clicked', async () => {
      const ToneSelector = await import('../../components/networking/ToneSelector.vue')
      const wrapper = await mountSuspended(ToneSelector.default, {
        props: {
          currentTone: 'formal',
          loading: false,
        },
      })

      const confidentButton = wrapper.findAll('button').find(btn => btn.text().includes('Confident'))
      await confidentButton?.trigger('click')

      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')![0]).toEqual(['confident'])
    })

    it('shows skeleton when loading', async () => {
      const ToneSelector = await import('../../components/networking/ToneSelector.vue')
      const wrapper = await mountSuspended(ToneSelector.default, {
        props: {
          currentTone: 'formal',
          loading: true,
        },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })
})
