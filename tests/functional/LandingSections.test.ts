import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HeroSection from '../../components/landing/HeroSection.vue'
import ProblemSection from '../../components/landing/ProblemSection.vue'
import FeaturesSection from '../../components/landing/FeaturesSection.vue'
import HowItWorksSection from '../../components/landing/HowItWorksSection.vue'
import FaqSection from '../../components/landing/FaqSection.vue'
import CtaFooter from '../../components/landing/CtaFooter.vue'
import TrustBadgesSection from '../../components/landing/TrustBadgesSection.vue'

describe('HeroSection Component', () => {
  it('renders the main headline', async () => {
    const wrapper = await mountSuspended(HeroSection)

    expect(wrapper.text()).toContain('Your Career Journey')
    expect(wrapper.text()).toContain('Starts Here')
  })

  it('renders the subheadline', async () => {
    const wrapper = await mountSuspended(HeroSection)

    expect(wrapper.text()).toContain('Stop scrolling through endless TikToks')
  })

  it('renders the primary CTA button', async () => {
    const wrapper = await mountSuspended(HeroSection)

    expect(wrapper.text()).toContain('Get Started Free')
  })

  it('renders the secondary CTA', async () => {
    const wrapper = await mountSuspended(HeroSection)

    expect(wrapper.text()).toContain('Watch Demo')
  })

  it('renders feature highlights', async () => {
    const wrapper = await mountSuspended(HeroSection)

    expect(wrapper.text()).toContain('Resume Templates')
    expect(wrapper.text()).toContain('AI Interview Prep')
    expect(wrapper.text()).toContain('Networking Guides')
  })

  it('has gradient background class', async () => {
    const wrapper = await mountSuspended(HeroSection)

    const section = wrapper.find('section')
    expect(section.classes()).toContain('gradient-bg')
  })

  it('renders decorative floating elements', async () => {
    const wrapper = await mountSuspended(HeroSection)

    const floatingElements = wrapper.findAll('.animate-float')
    expect(floatingElements.length).toBeGreaterThan(0)
  })
})

describe('ProblemSection Component', () => {
  it('renders the section headline', async () => {
    const wrapper = await mountSuspended(ProblemSection)

    expect(wrapper.text()).toContain('We Know Job Hunting Feels')
    expect(wrapper.text()).toContain('Overwhelming')
  })

  it('renders all three pain point cards', async () => {
    const wrapper = await mountSuspended(ProblemSection)

    expect(wrapper.text()).toContain('Information Overload')
    expect(wrapper.text()).toContain('No Clear Roadmap')
    expect(wrapper.text()).toContain('Feeling Lost')
  })

  it('renders the solution transition text', async () => {
    const wrapper = await mountSuspended(ProblemSection)

    expect(wrapper.text()).toContain('That\'s why we built')
    expect(wrapper.text()).toContain('Career Buddy')
  })
})

describe('FeaturesSection Component', () => {
  it('renders the section headline', async () => {
    const wrapper = await mountSuspended(FeaturesSection)

    expect(wrapper.text()).toContain('One Platform')
    expect(wrapper.text()).toContain('Complete Preparation')
  })

  it('renders all six feature cards', async () => {
    const wrapper = await mountSuspended(FeaturesSection)

    expect(wrapper.text()).toContain('Resume & Cover Letter')
    expect(wrapper.text()).toContain('AI Interview Simulation')
    expect(wrapper.text()).toContain('Networking Guides')
    expect(wrapper.text()).toContain('Job Search Strategies')
    expect(wrapper.text()).toContain('Self-Promotion Tools')
    expect(wrapper.text()).toContain('Career Buddy AI Chat')
  })

  it('has the correct section id for navigation', async () => {
    const wrapper = await mountSuspended(FeaturesSection)

    const section = wrapper.find('section')
    expect(section.attributes('id')).toBe('features')
  })
})

describe('HowItWorksSection Component', () => {
  it('renders the section headline', async () => {
    const wrapper = await mountSuspended(HowItWorksSection)

    expect(wrapper.text()).toContain('How Career Buddy')
    expect(wrapper.text()).toContain('Works')
  })

  it('renders all three steps', async () => {
    const wrapper = await mountSuspended(HowItWorksSection)

    expect(wrapper.text()).toContain('Sign Up Free')
    expect(wrapper.text()).toContain('Choose Your Focus')
    expect(wrapper.text()).toContain('Start Preparing')
  })

  it('renders step numbers', async () => {
    const wrapper = await mountSuspended(HowItWorksSection)

    expect(wrapper.text()).toContain('01')
    expect(wrapper.text()).toContain('02')
    expect(wrapper.text()).toContain('03')
  })

  it('has the correct section id for navigation', async () => {
    const wrapper = await mountSuspended(HowItWorksSection)

    const section = wrapper.find('section')
    expect(section.attributes('id')).toBe('how-it-works')
  })
})

describe('FaqSection Component', () => {
  it('renders the section headline', async () => {
    const wrapper = await mountSuspended(FaqSection)

    expect(wrapper.text()).toContain('Frequently Asked')
    expect(wrapper.text()).toContain('Questions')
  })

  it('renders FAQ questions', async () => {
    const wrapper = await mountSuspended(FaqSection)

    expect(wrapper.text()).toContain('Is Career Buddy completely free?')
    expect(wrapper.text()).toContain('Who is Career Buddy for?')
    expect(wrapper.text()).toContain('Is this only for Malaysians?')
  })

  it('has the correct section id for navigation', async () => {
    const wrapper = await mountSuspended(FaqSection)

    const section = wrapper.find('section')
    expect(section.attributes('id')).toBe('faq')
  })
})

describe('CtaFooter Component', () => {
  it('renders the final CTA headline', async () => {
    const wrapper = await mountSuspended(CtaFooter)

    expect(wrapper.text()).toContain('Ready to Take Control of Your Career?')
  })

  it('renders CTA buttons', async () => {
    const wrapper = await mountSuspended(CtaFooter)

    expect(wrapper.text()).toContain('Get Started Free')
    expect(wrapper.text()).toContain('Talk to Career Buddy AI')
  })

  it('renders the free notice', async () => {
    const wrapper = await mountSuspended(CtaFooter)

    expect(wrapper.text()).toContain('No credit card required')
    expect(wrapper.text()).toContain('5,000+')
  })
})

describe('TrustBadgesSection Component', () => {
  it('renders stats', async () => {
    const wrapper = await mountSuspended(TrustBadgesSection)

    expect(wrapper.text()).toContain('5,000+')
    expect(wrapper.text()).toContain('Active Users')
    expect(wrapper.text()).toContain('94%')
    expect(wrapper.text()).toContain('Success Rate')
  })

  it('renders university names', async () => {
    const wrapper = await mountSuspended(TrustBadgesSection)

    expect(wrapper.text()).toContain('UM')
    expect(wrapper.text()).toContain('UTM')
    expect(wrapper.text()).toContain('UPM')
    expect(wrapper.text()).toContain('USM')
    expect(wrapper.text()).toContain('UKM')
  })

  it('renders trust message', async () => {
    const wrapper = await mountSuspended(TrustBadgesSection)

    expect(wrapper.text()).toContain('Trusted by students from')
  })
})
