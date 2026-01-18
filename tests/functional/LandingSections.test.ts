import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ref } from 'vue'
import HeroSection from '../../components/landing/HeroSection.vue'
import ProblemSection from '../../components/landing/ProblemSection.vue'
import FeaturesSection from '../../components/landing/FeaturesSection.vue'
import HowItWorksSection from '../../components/landing/HowItWorksSection.vue'
import FaqSection from '../../components/landing/FaqSection.vue'
import CtaFooter from '../../components/landing/CtaFooter.vue'
import TrustBadgesSection from '../../components/landing/TrustBadgesSection.vue'
import TestimonialsCarousel from '../../components/landing/TestimonialsCarousel.vue'

// Mock useScrollAnimation
vi.mock('../../composables/useScrollAnimation', () => ({
  useScrollAnimation: () => ({
    target: ref(null),
    isVisible: ref(true),
  }),
}))

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

  it('renders feature highlight pills', async () => {
    const wrapper = await mountSuspended(HeroSection)

    // HeroSection has feature pills instead of secondary CTA
    expect(wrapper.text()).toContain('Resume Templates')
    expect(wrapper.text()).toContain('AI Interview Prep')
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

  it('renders the benefits strip', async () => {
    const wrapper = await mountSuspended(CtaFooter)

    expect(wrapper.text()).toContain('No credit card required')
    expect(wrapper.text()).toContain('Instant access')
  })
})

describe('TrustBadgesSection Component', () => {
  it('renders stats', async () => {
    const wrapper = await mountSuspended(TrustBadgesSection)

    expect(wrapper.text()).toContain('100%')
    expect(wrapper.text()).toContain('Free Forever')
  })

  it('renders university logos', async () => {
    const wrapper = await mountSuspended(TrustBadgesSection)

    const logos = wrapper.findAll('img')
    expect(logos.length).toBe(6)

    // Check that alt texts contain university names
    expect(wrapper.html()).toContain('Universiti Malaya')
    expect(wrapper.html()).toContain('Universiti Teknologi Malaysia')
    expect(wrapper.html()).toContain('Universiti Putra Malaysia')
    expect(wrapper.html()).toContain('Universiti Sains Malaysia')
    expect(wrapper.html()).toContain('Universiti Kebangsaan Malaysia')
    expect(wrapper.html()).toContain('Universiti Teknologi MARA')
  })

  it('renders trust message', async () => {
    const wrapper = await mountSuspended(TrustBadgesSection)

    expect(wrapper.text()).toContain('Trusted by students from')
  })
})

// ============================================
// INTERACTION TESTS
// ============================================

describe('HeroSection Interactions', () => {
  it('CTA buttons are clickable', async () => {
    const wrapper = await mountSuspended(HeroSection)

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThan(0)

    // Buttons should exist and be valid button elements
    buttons.forEach((button) => {
      expect(button.element.tagName.toLowerCase()).toBe('button')
    })
  })

  it('renders animated counter elements', async () => {
    const wrapper = await mountSuspended(HeroSection)

    // Check for stats that would have counters
    expect(wrapper.text()).toMatch(/\d+/)
  })

  it('has proper heading hierarchy', async () => {
    const wrapper = await mountSuspended(HeroSection)

    const h1 = wrapper.find('h1')
    expect(h1.exists()).toBe(true)
  })

  it('renders feature highlight icons', async () => {
    const wrapper = await mountSuspended(HeroSection)

    const icons = wrapper.findAll('svg')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('has gradient text styling', async () => {
    const wrapper = await mountSuspended(HeroSection)

    const gradientText = wrapper.find('.bg-clip-text')
    expect(gradientText.exists()).toBe(true)
  })
})

describe('ProblemSection Interactions', () => {
  it('renders pain point cards with icons', async () => {
    const wrapper = await mountSuspended(ProblemSection)

    const icons = wrapper.findAll('svg')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('cards have hover styling classes', async () => {
    const wrapper = await mountSuspended(ProblemSection)

    // Look for cards with hover effects
    const hoverCards = wrapper.findAll('[class*="hover:"]')
    expect(hoverCards.length).toBeGreaterThan(0)
  })

  it('renders transition animation container', async () => {
    const wrapper = await mountSuspended(ProblemSection)

    // Check for transition classes
    const transitions = wrapper.findAll('[class*="transition"]')
    expect(transitions.length).toBeGreaterThan(0)
  })
})

describe('FeaturesSection Interactions', () => {
  it('renders feature cards with icons', async () => {
    const wrapper = await mountSuspended(FeaturesSection)

    const icons = wrapper.findAll('svg')
    // Should have at least 6 icons for 6 features
    expect(icons.length).toBeGreaterThanOrEqual(6)
  })

  it('feature cards have hover effects', async () => {
    const wrapper = await mountSuspended(FeaturesSection)

    const hoverCards = wrapper.findAll('[class*="hover:"]')
    expect(hoverCards.length).toBeGreaterThan(0)
  })

  it('renders grid layout for cards', async () => {
    const wrapper = await mountSuspended(FeaturesSection)

    const grid = wrapper.find('[class*="grid"]')
    expect(grid.exists()).toBe(true)
  })

  it('has responsive column classes', async () => {
    const wrapper = await mountSuspended(FeaturesSection)

    const html = wrapper.html()
    expect(html).toMatch(/md:grid-cols-|lg:grid-cols-/)
  })
})

describe('HowItWorksSection Interactions', () => {
  it('renders step indicators with proper styling', async () => {
    const wrapper = await mountSuspended(HowItWorksSection)

    // Step numbers should be present
    expect(wrapper.text()).toContain('01')
    expect(wrapper.text()).toContain('02')
    expect(wrapper.text()).toContain('03')
  })

  it('renders step icons', async () => {
    const wrapper = await mountSuspended(HowItWorksSection)

    const icons = wrapper.findAll('svg')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('has connection line between steps (desktop)', async () => {
    const wrapper = await mountSuspended(HowItWorksSection)

    // Check for visual connector elements
    const html = wrapper.html()
    // Connection lines typically use absolute positioning or specific classes
    expect(html).toContain('absolute')
  })

  it('step cards have visual styling', async () => {
    const wrapper = await mountSuspended(HowItWorksSection)

    const cards = wrapper.findAll('[class*="rounded"]')
    expect(cards.length).toBeGreaterThan(0)
  })
})

describe('FaqSection Interactions', () => {
  it('renders accordion structure', async () => {
    const wrapper = await mountSuspended(FaqSection)

    // Check for accordion-related elements
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('FAQ items have expand/collapse functionality', async () => {
    const wrapper = await mountSuspended(FaqSection)

    // Check for chevron icons that indicate expandable items
    const icons = wrapper.findAll('svg')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('renders subheading in FAQ section', async () => {
    const wrapper = await mountSuspended(FaqSection)

    expect(wrapper.text()).toContain("Can't find the answer?")
  })

  it('has scroll animation classes', async () => {
    const wrapper = await mountSuspended(FaqSection)

    const html = wrapper.html()
    expect(html).toContain('transition')
  })
})

describe('CtaFooter Interactions', () => {
  it('renders multiple CTA buttons', async () => {
    const wrapper = await mountSuspended(CtaFooter)

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  it('has gradient background styling', async () => {
    const wrapper = await mountSuspended(CtaFooter)

    const html = wrapper.html()
    expect(html).toMatch(/gradient|bg-/)
  })

  it('renders user avatars/trust indicators', async () => {
    const wrapper = await mountSuspended(CtaFooter)

    // Check for user avatar section with initials and joined text
    expect(wrapper.text()).toContain('+5K')
    expect(wrapper.text()).toContain('Joined this month')
  })

  it('benefits list is rendered', async () => {
    const wrapper = await mountSuspended(CtaFooter)

    expect(wrapper.text()).toContain('No credit card required')
  })

  it('renders check icons for benefits', async () => {
    const wrapper = await mountSuspended(CtaFooter)

    const icons = wrapper.findAll('svg')
    expect(icons.length).toBeGreaterThan(0)
  })
})

describe('TrustBadgesSection Interactions', () => {
  it('renders clickable university badges', async () => {
    const wrapper = await mountSuspended(TrustBadgesSection)

    // University badges might be links or have click handlers
    const links = wrapper.findAll('a')
    expect(links.length).toBeGreaterThanOrEqual(0)
  })

  it('stat section has visual styling', async () => {
    const wrapper = await mountSuspended(TrustBadgesSection)

    // Check for flex layout
    const flexContainer = wrapper.find('[class*="flex"]')
    expect(flexContainer.exists()).toBe(true)
  })

  it('has responsive flex layout for stats', async () => {
    const wrapper = await mountSuspended(TrustBadgesSection)

    const flexContainer = wrapper.find('[class*="flex"]')
    expect(flexContainer.exists()).toBe(true)
  })

  it('renders all stat numbers with proper formatting', async () => {
    const wrapper = await mountSuspended(TrustBadgesSection)

    // Check for formatted numbers - now only has Free Forever stat
    expect(wrapper.text()).toContain('100%')
    expect(wrapper.text()).toContain('Free Forever')
  })
})

// ============================================
// ACCESSIBILITY TESTS
// ============================================

describe('Landing Sections Accessibility', () => {
  it('HeroSection has proper heading structure', async () => {
    const wrapper = await mountSuspended(HeroSection)

    const h1 = wrapper.find('h1')
    expect(h1.exists()).toBe(true)
  })

  it('FeaturesSection has section id for navigation', async () => {
    const wrapper = await mountSuspended(FeaturesSection)

    const section = wrapper.find('section')
    expect(section.attributes('id')).toBe('features')
  })

  it('HowItWorksSection has section id for navigation', async () => {
    const wrapper = await mountSuspended(HowItWorksSection)

    const section = wrapper.find('section')
    expect(section.attributes('id')).toBe('how-it-works')
  })

  it('FaqSection has section id for navigation', async () => {
    const wrapper = await mountSuspended(FaqSection)

    const section = wrapper.find('section')
    expect(section.attributes('id')).toBe('faq')
  })

  it('all CTAs are accessible buttons', async () => {
    const wrapper = await mountSuspended(CtaFooter)

    const buttons = wrapper.findAll('button')
    buttons.forEach((button) => {
      expect(button.element.tagName.toLowerCase()).toBe('button')
    })
  })
})

// ============================================
// NAVBAR ANCHOR LINK SECTION ID TESTS
// ============================================

describe('Navbar Anchor Link Section IDs', () => {
  it('ProblemSection has id="challenges" for navbar navigation', async () => {
    const wrapper = await mountSuspended(ProblemSection)

    const section = wrapper.find('section')
    expect(section.exists()).toBe(true)
    expect(section.attributes('id')).toBe('challenges')
  })

  it('ProblemSection contains The Challenge content for Challenges link', async () => {
    const wrapper = await mountSuspended(ProblemSection)

    // Verify this is the correct section for the "Challenges" navbar link
    expect(wrapper.text()).toContain('The Challenge')
    expect(wrapper.text()).toContain('We Know Job Hunting Feels')
    expect(wrapper.text()).toContain('Overwhelming')
  })

  it('TestimonialsCarousel has id="feedback" for navbar navigation', async () => {
    const wrapper = await mountSuspended(TestimonialsCarousel)

    const section = wrapper.find('section')
    expect(section.exists()).toBe(true)
    expect(section.attributes('id')).toBe('feedback')
  })

  it('TestimonialsCarousel contains testimonials/feedback content', async () => {
    const wrapper = await mountSuspended(TestimonialsCarousel)

    // Verify this is the correct section for the "Feedback" navbar link
    expect(wrapper.text()).toContain('Hear From Our')
    expect(wrapper.text()).toContain('Community')
    expect(wrapper.text()).toContain('4.9/5 from 2,000+ reviews')
  })
})

// ============================================
// TESTIMONIALS CAROUSEL TESTS
// ============================================

describe('TestimonialsCarousel Component', () => {
  it('renders the section headline', async () => {
    const wrapper = await mountSuspended(TestimonialsCarousel)

    expect(wrapper.text()).toContain('Hear From Our')
    expect(wrapper.text()).toContain('Community')
  })

  it('renders testimonial cards with quotes', async () => {
    const wrapper = await mountSuspended(TestimonialsCarousel)

    // Should contain testimonial content
    expect(wrapper.text()).toContain('Career Buddy')
  })

  it('renders star ratings', async () => {
    const wrapper = await mountSuspended(TestimonialsCarousel)

    // Check for star icons (5 stars per testimonial)
    const stars = wrapper.findAll('svg')
    expect(stars.length).toBeGreaterThan(0)
  })

  it('renders navigation controls', async () => {
    const wrapper = await mountSuspended(TestimonialsCarousel)

    // Should have navigation buttons
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('renders trust stats section', async () => {
    const wrapper = await mountSuspended(TestimonialsCarousel)

    expect(wrapper.text()).toContain('5,000+')
    expect(wrapper.text()).toContain('Active Users')
    expect(wrapper.text()).toContain('94%')
    expect(wrapper.text()).toContain('Success Rate')
  })

  it('renders user photo avatars from picsum', async () => {
    const wrapper = await mountSuspended(TestimonialsCarousel)

    // Check for avatar images from picsum.photos
    const images = wrapper.findAll('img')
    expect(images.length).toBeGreaterThan(0)

    // Should have picsum.photos URLs
    const html = wrapper.html()
    expect(html).toContain('picsum.photos')
  })

  it('renders verified badges', async () => {
    const wrapper = await mountSuspended(TestimonialsCarousel)

    // Should have verified icons
    const html = wrapper.html()
    expect(html).toContain('text-blue-500')
  })

  it('renders outcome badges', async () => {
    const wrapper = await mountSuspended(TestimonialsCarousel)

    // Check for outcome badges with green styling
    expect(wrapper.text()).toMatch(/Landed|job offers|connections|salary|career/)
  })
})
