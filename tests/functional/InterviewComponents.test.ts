import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

describe('Interview Components', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('InterviewHero', () => {
    it('renders hero section', async () => {
      const InterviewHero = await import('../../components/interview/InterviewHero.vue')
      const wrapper = await mountSuspended(InterviewHero.default, {
        props: { loading: false },
      })

      expect(wrapper.text()).toContain('Interview')
    })

    it('shows skeleton when loading', async () => {
      const InterviewHero = await import('../../components/interview/InterviewHero.vue')
      const wrapper = await mountSuspended(InterviewHero.default, {
        props: { loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('PurposeSection', () => {
    const mockPurpose = ['Assess skills', 'Evaluate fit']

    it('renders interview purpose', async () => {
      const PurposeSection = await import('../../components/interview/PurposeSection.vue')
      const wrapper = await mountSuspended(PurposeSection.default, {
        props: { purpose: mockPurpose, loading: false },
      })

      expect(wrapper.text()).toContain('Assess skills')
    })

    it('shows skeleton when loading', async () => {
      const PurposeSection = await import('../../components/interview/PurposeSection.vue')
      const wrapper = await mountSuspended(PurposeSection.default, {
        props: { purpose: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('TypesOfInterviews', () => {
    const mockTypes = [
      { name: 'Phone', description: 'Initial call', tips: ['Be ready'] },
    ]

    it('renders interview types', async () => {
      const TypesOfInterviews = await import('../../components/interview/TypesOfInterviews.vue')
      const wrapper = await mountSuspended(TypesOfInterviews.default, {
        props: { types: mockTypes, loading: false },
      })

      expect(wrapper.text()).toContain('Phone')
      expect(wrapper.text()).toContain('Initial call')
    })

    it('shows skeleton when loading', async () => {
      const TypesOfInterviews = await import('../../components/interview/TypesOfInterviews.vue')
      const wrapper = await mountSuspended(TypesOfInterviews.default, {
        props: { types: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('DosAndDonts', () => {
    const mockDos = ['Research company']
    const mockDonts = ['Be late']

    it('renders dos and donts', async () => {
      const DosAndDonts = await import('../../components/interview/DosAndDonts.vue')
      const wrapper = await mountSuspended(DosAndDonts.default, {
        props: { dos: mockDos, donts: mockDonts, loading: false },
      })

      expect(wrapper.text()).toContain('Research company')
      expect(wrapper.text()).toContain('Be late')
    })

    it('shows skeleton when loading', async () => {
      const DosAndDonts = await import('../../components/interview/DosAndDonts.vue')
      const wrapper = await mountSuspended(DosAndDonts.default, {
        props: { dos: [], donts: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('PrepSteps', () => {
    const mockSteps = [
      { title: 'Research', description: 'Study company' },
    ]

    it('renders preparation steps', async () => {
      const PrepSteps = await import('../../components/interview/PrepSteps.vue')
      const wrapper = await mountSuspended(PrepSteps.default, {
        props: { steps: mockSteps, loading: false },
      })

      expect(wrapper.text()).toContain('Research')
      expect(wrapper.text()).toContain('Study company')
    })

    it('shows skeleton when loading', async () => {
      const PrepSteps = await import('../../components/interview/PrepSteps.vue')
      const wrapper = await mountSuspended(PrepSteps.default, {
        props: { steps: [], loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('QuestionCard', () => {
    const mockQuestion = {
      id: 'q1',
      category: 'hr' as const,
      question: 'Tell me about yourself',
      exampleAnswer: 'I am...',
      answerStructure: ['Start with current', 'Add experience'],
      tips: ['Keep it brief'],
    }

    it('renders question card', async () => {
      const QuestionCard = await import('../../components/interview/QuestionCard.vue')
      const wrapper = await mountSuspended(QuestionCard.default, {
        props: { question: mockQuestion, loading: false },
      })

      expect(wrapper.text()).toContain('Tell me about yourself')
    })

    it('shows skeleton when loading', async () => {
      const QuestionCard = await import('../../components/interview/QuestionCard.vue')
      const wrapper = await mountSuspended(QuestionCard.default, {
        props: { question: null, loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('StarMethod', () => {
    const mockStar = {
      situation: 'Set scene',
      task: 'Your task',
      action: 'What you did',
      result: 'Outcome',
    }

    it('renders STAR method', async () => {
      const StarMethod = await import('../../components/interview/StarMethod.vue')
      const wrapper = await mountSuspended(StarMethod.default, {
        props: { star: mockStar, loading: false },
      })

      expect(wrapper.text()).toContain('Situation')
      expect(wrapper.text()).toContain('Set scene')
    })

    it('shows skeleton when loading', async () => {
      const StarMethod = await import('../../components/interview/StarMethod.vue')
      const wrapper = await mountSuspended(StarMethod.default, {
        props: { star: null, loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('SimulationSetup', () => {
    const mockSettings = {
      mode: 'text' as const,
      category: 'all',
      timeLimit: 120,
    }

    it('renders simulation setup', async () => {
      const SimulationSetup = await import('../../components/interview/SimulationSetup.vue')
      const wrapper = await mountSuspended(SimulationSetup.default, {
        props: { settings: mockSettings, loading: false },
      })

      expect(wrapper.text()).toContain('Simulation')
    })

    it('shows skeleton when loading', async () => {
      const SimulationSetup = await import('../../components/interview/SimulationSetup.vue')
      const wrapper = await mountSuspended(SimulationSetup.default, {
        props: { settings: mockSettings, loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })
})
