import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

describe('Job Search Components', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('SearchHero', () => {
    it('renders hero section', async () => {
      const SearchHero = await import('../../components/job-search/SearchHero.vue')
      const wrapper = await mountSuspended(SearchHero.default, {
        props: { loading: false },
      })

      expect(wrapper.text()).toContain('Job Search')
    })

    it('shows skeleton when loading', async () => {
      const SearchHero = await import('../../components/job-search/SearchHero.vue')
      const wrapper = await mountSuspended(SearchHero.default, {
        props: { loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('WhereToSearch', () => {
    const mockPlatforms = [
      { name: 'LinkedIn', description: 'Professional networking' },
      { name: 'JobStreet', description: 'SEA job portal' },
    ]

    it('renders search platforms', async () => {
      const WhereToSearch = await import('../../components/job-search/WhereToSearch.vue')
      const wrapper = await mountSuspended(WhereToSearch.default, {
        props: { platforms: mockPlatforms, loading: false },
      })

      expect(wrapper.text()).toContain('LinkedIn')
      expect(wrapper.text()).toContain('Professional networking')
    })

    it('shows skeleton when loading', async () => {
      const WhereToSearch = await import('../../components/job-search/WhereToSearch.vue')
      const wrapper = await mountSuspended(WhereToSearch.default, {
        props: { platforms: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('FilteringTips', () => {
    const mockTips = ['Use specific job titles', 'Set location filters']

    it('renders filtering tips', async () => {
      const FilteringTips = await import('../../components/job-search/FilteringTips.vue')
      const wrapper = await mountSuspended(FilteringTips.default, {
        props: { tips: mockTips, loading: false },
      })

      expect(wrapper.text()).toContain('Use specific job titles')
    })

    it('shows skeleton when loading', async () => {
      const FilteringTips = await import('../../components/job-search/FilteringTips.vue')
      const wrapper = await mountSuspended(FilteringTips.default, {
        props: { tips: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('CommonMistakes', () => {
    const mockMistakes = [
      { mistake: 'Applying everywhere', solution: 'Be selective' },
    ]

    it('renders common mistakes', async () => {
      const CommonMistakes = await import('../../components/job-search/CommonMistakes.vue')
      const wrapper = await mountSuspended(CommonMistakes.default, {
        props: { mistakes: mockMistakes, loading: false },
      })

      expect(wrapper.text()).toContain('Applying everywhere')
      expect(wrapper.text()).toContain('Be selective')
    })

    it('shows skeleton when loading', async () => {
      const CommonMistakes = await import('../../components/job-search/CommonMistakes.vue')
      const wrapper = await mountSuspended(CommonMistakes.default, {
        props: { mistakes: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('PlatformCard', () => {
    const mockPlatform = {
      id: 'linkedin',
      name: 'LinkedIn',
      pros: ['Large network'],
      cons: ['High competition'],
      howToUse: ['Optimize profile'],
      whoShouldUse: 'Everyone',
    }

    it('renders platform details', async () => {
      const PlatformCard = await import('../../components/job-search/PlatformCard.vue')
      const wrapper = await mountSuspended(PlatformCard.default, {
        props: { platform: mockPlatform, loading: false },
      })

      expect(wrapper.text()).toContain('LinkedIn')
      expect(wrapper.text()).toContain('Everyone')

      // Expand card to show pros/cons
      await wrapper.find('button').trigger('click')
      expect(wrapper.text()).toContain('Large network')
    })

    it('shows skeleton when loading', async () => {
      const PlatformCard = await import('../../components/job-search/PlatformCard.vue')
      const wrapper = await mountSuspended(PlatformCard.default, {
        props: { platform: null, loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('SalaryRanges', () => {
    const mockRanges = [
      { role: 'Engineer', industry: 'Tech', minSalary: 4000, maxSalary: 7000 },
    ]

    it('renders salary ranges', async () => {
      const SalaryRanges = await import('../../components/job-search/SalaryRanges.vue')
      const wrapper = await mountSuspended(SalaryRanges.default, {
        props: { ranges: mockRanges, loading: false },
      })

      expect(wrapper.text()).toContain('Engineer')
      expect(wrapper.text()).toContain('Tech')
    })

    it('shows skeleton when loading', async () => {
      const SalaryRanges = await import('../../components/job-search/SalaryRanges.vue')
      const wrapper = await mountSuspended(SalaryRanges.default, {
        props: { ranges: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('NegotiationScripts', () => {
    const mockScripts = [
      { situation: 'Lower offer', whatToSay: 'Thank you...' },
    ]

    it('renders negotiation scripts', async () => {
      const NegotiationScripts = await import('../../components/job-search/NegotiationScripts.vue')
      const wrapper = await mountSuspended(NegotiationScripts.default, {
        props: { scripts: mockScripts, loading: false },
      })

      expect(wrapper.text()).toContain('Lower offer')
      expect(wrapper.text()).toContain('Thank you')
    })

    it('shows skeleton when loading', async () => {
      const NegotiationScripts = await import('../../components/job-search/NegotiationScripts.vue')
      const wrapper = await mountSuspended(NegotiationScripts.default, {
        props: { scripts: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('ScamTactics', () => {
    const mockTactics = [
      { sign: 'Upfront payment', explanation: 'Never pay for jobs' },
    ]

    it('renders scam tactics', async () => {
      const ScamTactics = await import('../../components/job-search/ScamTactics.vue')
      const wrapper = await mountSuspended(ScamTactics.default, {
        props: { tactics: mockTactics, loading: false },
      })

      expect(wrapper.text()).toContain('Upfront payment')
      expect(wrapper.text()).toContain('Never pay for jobs')
    })

    it('shows skeleton when loading', async () => {
      const ScamTactics = await import('../../components/job-search/ScamTactics.vue')
      const wrapper = await mountSuspended(ScamTactics.default, {
        props: { tactics: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('ScamExamples', () => {
    const mockExamples = [
      { title: 'Training Fee', description: 'Pay for training', redFlags: ['Upfront payment'] },
    ]

    it('renders scam examples', async () => {
      const ScamExamples = await import('../../components/job-search/ScamExamples.vue')
      const wrapper = await mountSuspended(ScamExamples.default, {
        props: { examples: mockExamples, loading: false },
      })

      expect(wrapper.text()).toContain('Training Fee')
      expect(wrapper.text()).toContain('Upfront payment')
    })

    it('shows skeleton when loading', async () => {
      const ScamExamples = await import('../../components/job-search/ScamExamples.vue')
      const wrapper = await mountSuspended(ScamExamples.default, {
        props: { examples: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('VerificationChecklist', () => {
    const mockChecklist = ['Verify company exists', 'Check email domain']

    it('renders verification checklist', async () => {
      const VerificationChecklist = await import('../../components/job-search/VerificationChecklist.vue')
      const wrapper = await mountSuspended(VerificationChecklist.default, {
        props: { checklist: mockChecklist, loading: false },
      })

      expect(wrapper.text()).toContain('Verify company exists')
    })

    it('shows skeleton when loading', async () => {
      const VerificationChecklist = await import('../../components/job-search/VerificationChecklist.vue')
      const wrapper = await mountSuspended(VerificationChecklist.default, {
        props: { checklist: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })
})
