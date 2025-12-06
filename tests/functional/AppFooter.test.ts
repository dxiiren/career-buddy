import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppFooter from '../../components/shared/AppFooter.vue'

describe('AppFooter Component', () => {
  beforeEach(() => {
    // Mock Date to ensure consistent year in tests
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-06-15'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('rendering', () => {
    it('renders the footer element', async () => {
      const wrapper = await mountSuspended(AppFooter)

      expect(wrapper.find('footer').exists()).toBe(true)
    })

    it('renders the brand section with logo', async () => {
      const wrapper = await mountSuspended(AppFooter)

      expect(wrapper.text()).toContain('Career Buddy')
    })

    it('renders the brand description', async () => {
      const wrapper = await mountSuspended(AppFooter)

      expect(wrapper.text()).toContain('Your all-in-one career preparation platform')
      expect(wrapper.text()).toContain('Helping young adults navigate their career journey')
    })

    it('renders the logo SVG icon', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const logoContainer = wrapper.find('.bg-primary')
      expect(logoContainer.exists()).toBe(true)

      const svg = logoContainer.find('svg')
      expect(svg.exists()).toBe(true)
    })
  })

  describe('footer links - Product section', () => {
    it('renders Product section heading', async () => {
      const wrapper = await mountSuspended(AppFooter)

      expect(wrapper.text()).toContain('Product')
    })

    it('renders Features link', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const link = wrapper.find('a[href="#features"]')
      expect(link.exists()).toBe(true)
      expect(link.text()).toBe('Features')
    })

    it('renders How It Works link', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const link = wrapper.find('a[href="#how-it-works"]')
      expect(link.exists()).toBe(true)
      expect(link.text()).toBe('How It Works')
    })

    it('renders FAQ link', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const link = wrapper.find('a[href="#faq"]')
      expect(link.exists()).toBe(true)
      expect(link.text()).toBe('FAQ')
    })
  })

  describe('footer links - Resources section', () => {
    it('renders Resources section heading', async () => {
      const wrapper = await mountSuspended(AppFooter)

      expect(wrapper.text()).toContain('Resources')
    })

    it('renders Resume Templates link', async () => {
      const wrapper = await mountSuspended(AppFooter)

      expect(wrapper.text()).toContain('Resume Templates')
    })

    it('renders Interview Guide link', async () => {
      const wrapper = await mountSuspended(AppFooter)

      expect(wrapper.text()).toContain('Interview Guide')
    })

    it('renders Career Blog link', async () => {
      const wrapper = await mountSuspended(AppFooter)

      expect(wrapper.text()).toContain('Career Blog')
    })
  })

  describe('footer links - Company section', () => {
    it('renders Company section heading', async () => {
      const wrapper = await mountSuspended(AppFooter)

      expect(wrapper.text()).toContain('Company')
    })

    it('renders About Us link', async () => {
      const wrapper = await mountSuspended(AppFooter)

      expect(wrapper.text()).toContain('About Us')
    })

    it('renders Contact link', async () => {
      const wrapper = await mountSuspended(AppFooter)

      expect(wrapper.text()).toContain('Contact')
    })

    it('renders Privacy Policy link', async () => {
      const wrapper = await mountSuspended(AppFooter)

      expect(wrapper.text()).toContain('Privacy Policy')
    })
  })

  describe('social media links', () => {
    it('renders Twitter link with aria-label', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const twitterLink = wrapper.find('a[aria-label="Twitter"]')
      expect(twitterLink.exists()).toBe(true)
    })

    it('renders LinkedIn link with aria-label', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const linkedinLink = wrapper.find('a[aria-label="LinkedIn"]')
      expect(linkedinLink.exists()).toBe(true)
    })

    it('renders Instagram link with aria-label', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const instagramLink = wrapper.find('a[aria-label="Instagram"]')
      expect(instagramLink.exists()).toBe(true)
    })

    it('renders Email link with aria-label', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const emailLink = wrapper.find('a[aria-label="Email"]')
      expect(emailLink.exists()).toBe(true)
    })

    it('social links have proper styling', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const socialLinks = wrapper.findAll('a[aria-label]')
      socialLinks.forEach((link) => {
        const classes = link.classes().join(' ')
        expect(classes).toContain('h-10')
        expect(classes).toContain('w-10')
        expect(classes).toContain('rounded-full')
      })
    })

    it('social links have hover effects', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const socialLinks = wrapper.findAll('a[aria-label]')
      socialLinks.forEach((link) => {
        const classes = link.classes().join(' ')
        expect(classes).toContain('hover:bg-primary')
      })
    })

    it('renders 4 social media links total', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const socialLinks = wrapper.findAll('a[aria-label]')
      expect(socialLinks.length).toBe(4)
    })

    it('social links contain icons', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const socialLinks = wrapper.findAll('a[aria-label]')
      socialLinks.forEach((link) => {
        const icon = link.find('svg')
        expect(icon.exists()).toBe(true)
      })
    })
  })

  describe('copyright section', () => {
    it('renders copyright notice', async () => {
      const wrapper = await mountSuspended(AppFooter)

      expect(wrapper.text()).toContain('Career Buddy. All rights reserved.')
    })

    it('displays current year dynamically', async () => {
      const wrapper = await mountSuspended(AppFooter)

      expect(wrapper.text()).toContain('2024')
    })

    it('copyright section has border top', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const copyrightSection = wrapper.find('.border-t')
      expect(copyrightSection.exists()).toBe(true)
    })

    it('copyright text is centered', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const copyrightText = wrapper.find('.text-center')
      expect(copyrightText.exists()).toBe(true)
    })
  })

  describe('layout and styling', () => {
    it('has responsive grid layout', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const grid = wrapper.find('.grid')
      expect(grid.exists()).toBe(true)
      const classes = grid.classes().join(' ')
      expect(classes).toContain('md:grid-cols-2')
      expect(classes).toContain('lg:grid-cols-5')
    })

    it('brand section spans 2 columns on large screens', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const brandSection = wrapper.find('.lg\\:col-span-2')
      expect(brandSection.exists()).toBe(true)
    })

    it('has proper background styling', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const footer = wrapper.find('footer')
      const classes = footer.classes().join(' ')
      expect(classes).toContain('bg-muted')
    })

    it('has container with proper padding', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const container = wrapper.find('.container')
      expect(container.exists()).toBe(true)
      const classes = container.classes().join(' ')
      expect(classes).toContain('py-12')
    })
  })

  describe('accessibility', () => {
    it('uses semantic footer element', async () => {
      const wrapper = await mountSuspended(AppFooter)

      expect(wrapper.find('footer').exists()).toBe(true)
    })

    it('uses heading elements for section titles', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const headings = wrapper.findAll('h4')
      expect(headings.length).toBe(3) // Product, Resources, Company
    })

    it('all social links have aria-labels', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const socialLinks = wrapper.findAll('.flex.gap-4 a')
      socialLinks.forEach((link) => {
        expect(link.attributes('aria-label')).toBeDefined()
      })
    })

    it('links have proper href attributes', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const allLinks = wrapper.findAll('a')
      allLinks.forEach((link) => {
        expect(link.attributes('href')).toBeDefined()
      })
    })
  })

  describe('link interactions', () => {
    it('footer links have hover color transition', async () => {
      const wrapper = await mountSuspended(AppFooter)

      const productLinks = wrapper.findAll('ul a')
      productLinks.forEach((link) => {
        const classes = link.classes().join(' ')
        expect(classes).toContain('hover:text-primary')
        expect(classes).toContain('transition-colors')
      })
    })
  })
})
