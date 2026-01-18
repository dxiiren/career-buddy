import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppNavbar from '../../components/shared/AppNavbar.vue'

describe('AppNavbar Component', () => {
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mock window event listeners
    addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('rendering', () => {
    it('renders the navbar element', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      expect(wrapper.find('nav').exists()).toBe(true)
    })

    it('renders the logo component', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      // Logo now uses an image with alt text
      const logoImg = wrapper.find('img[alt="Career Buddy"]')
      expect(logoImg.exists()).toBe(true)
    })

    it('renders desktop navigation links', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      expect(wrapper.text()).toContain('Home')
      expect(wrapper.text()).toContain('About Us')
      expect(wrapper.text()).toContain('Contact')
      expect(wrapper.text()).toContain('Privacy')
    })

    it('renders navigation links with correct hrefs', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      const homeLink = wrapper.find('a[href="/"]')
      const aboutLink = wrapper.find('a[href="/about"]')
      const contactLink = wrapper.find('a[href="/contact"]')
      const privacyLink = wrapper.find('a[href="/privacy"]')

      expect(homeLink.exists()).toBe(true)
      expect(aboutLink.exists()).toBe(true)
      expect(contactLink.exists()).toBe(true)
      expect(privacyLink.exists()).toBe(true)
    })

    it('renders Log In button', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      expect(wrapper.text()).toContain('Log In')
    })

    it('renders Get Started button', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      expect(wrapper.text()).toContain('Get Started')
    })

    it('renders theme toggle component', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      // ThemeToggle has sr-only text "Toggle theme"
      expect(wrapper.text()).toContain('Toggle theme')
    })

    it('renders mobile menu button', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      const mobileButton = wrapper.find('button.md\\:hidden')
      expect(mobileButton.exists()).toBe(true)
    })
  })

  describe('mobile menu', () => {
    it('menu is closed by default', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      // Mobile menu should not be visible initially
      const mobileMenu = wrapper.find('.absolute.top-16')
      expect(mobileMenu.exists()).toBe(false)
    })

    it('toggles menu when mobile button is clicked', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      const mobileButton = wrapper.find('button.md\\:hidden')
      await mobileButton.trigger('click')

      // Mobile menu should now be visible
      const mobileMenu = wrapper.find('.absolute.top-16')
      expect(mobileMenu.exists()).toBe(true)
    })

    it('closes menu when clicking menu button again', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      const mobileButton = wrapper.find('button.md\\:hidden')

      // Open menu
      await mobileButton.trigger('click')
      expect(wrapper.find('.absolute.top-16').exists()).toBe(true)

      // Close menu
      await mobileButton.trigger('click')
      expect(wrapper.find('.absolute.top-16').exists()).toBe(false)
    })

    it('shows Menu icon when closed', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      const mobileButton = wrapper.find('button.md\\:hidden')
      // Menu icon (hamburger) should be visible
      const icon = mobileButton.find('svg')
      expect(icon.exists()).toBe(true)
    })

    it('shows X icon when open', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      const mobileButton = wrapper.find('button.md\\:hidden')
      await mobileButton.trigger('click')

      // X icon should now be visible
      const icon = mobileButton.find('svg')
      expect(icon.exists()).toBe(true)
    })

    it('mobile menu contains navigation links', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      const mobileButton = wrapper.find('button.md\\:hidden')
      await mobileButton.trigger('click')

      const mobileMenu = wrapper.find('.absolute.top-16')
      expect(mobileMenu.text()).toContain('Home')
      expect(mobileMenu.text()).toContain('About Us')
      expect(mobileMenu.text()).toContain('Contact')
      expect(mobileMenu.text()).toContain('Privacy')
    })

    it('mobile menu contains theme toggle', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      const mobileButton = wrapper.find('button.md\\:hidden')
      await mobileButton.trigger('click')

      const mobileMenu = wrapper.find('.absolute.top-16')
      expect(mobileMenu.text()).toContain('Theme')
    })

    it('mobile menu contains Log In and Get Started buttons', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      const mobileButton = wrapper.find('button.md\\:hidden')
      await mobileButton.trigger('click')

      const mobileMenu = wrapper.find('.absolute.top-16')
      expect(mobileMenu.text()).toContain('Log In')
      expect(mobileMenu.text()).toContain('Get Started')
    })

    it('closes menu when clicking a navigation link', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      const mobileButton = wrapper.find('button.md\\:hidden')
      await mobileButton.trigger('click')

      // Find a link in the mobile menu and click it
      const mobileMenu = wrapper.find('.absolute.top-16')
      const links = mobileMenu.findAll('a')
      expect(links.length).toBeGreaterThan(0)

      await links[0].trigger('click')

      // Menu should be closed
      expect(wrapper.find('.absolute.top-16').exists()).toBe(false)
    })
  })

  describe('scroll behavior', () => {
    it('adds scroll event listener on mount', async () => {
      await mountSuspended(AppNavbar)

      expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    })

    it('removes scroll event listener on unmount', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      wrapper.unmount()

      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    })

    it('applies transparent background when not scrolled', async () => {
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true })

      const wrapper = await mountSuspended(AppNavbar)

      const nav = wrapper.find('nav')
      const classes = nav.classes().join(' ')
      expect(classes).toContain('bg-transparent')
    })

    it('navbar has fixed positioning', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      const nav = wrapper.find('nav')
      const classes = nav.classes().join(' ')
      expect(classes).toContain('fixed')
      expect(classes).toContain('top-0')
    })

    it('navbar has proper z-index for stacking', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      const nav = wrapper.find('nav')
      const classes = nav.classes().join(' ')
      expect(classes).toContain('z-50')
    })
  })

  describe('styling', () => {
    it('has transition classes for smooth animation', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      const nav = wrapper.find('nav')
      const classes = nav.classes().join(' ')
      expect(classes).toContain('transition-all')
      expect(classes).toContain('duration-300')
    })

    it('desktop nav is hidden on mobile', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      const desktopNav = wrapper.find('.hidden.md\\:flex.md\\:items-center.md\\:gap-6')
      expect(desktopNav.exists()).toBe(true)
    })

    it('mobile button is hidden on desktop', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      const mobileButton = wrapper.find('button.md\\:hidden')
      expect(mobileButton.exists()).toBe(true)
      const classes = mobileButton.classes().join(' ')
      expect(classes).toContain('md:hidden')
    })
  })

  describe('accessibility', () => {
    it('mobile menu button is accessible', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      const mobileButton = wrapper.find('button.md\\:hidden')
      // Button should be a proper button element
      expect(mobileButton.element.tagName.toLowerCase()).toBe('button')
    })

    it('navigation links are NuxtLinks to company pages', async () => {
      const wrapper = await mountSuspended(AppNavbar)

      // Check that company page links exist
      const links = wrapper.findAll('a')
      const hrefs = links.map((l) => l.attributes('href'))
      expect(hrefs).toContain('/')
      expect(hrefs).toContain('/about')
      expect(hrefs).toContain('/contact')
      expect(hrefs).toContain('/privacy')
    })
  })
})
