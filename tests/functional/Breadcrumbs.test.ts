import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Breadcrumbs from '../../components/shared/Breadcrumbs.vue'

/**
 * Every assertion here is driven by a route, because the route is the only
 * input this component has. Mounting it at the default '/' renders nothing at
 * all, which is why "it mounted" said so little about it.
 */
const at = (route: string) => mountSuspended(Breadcrumbs, { route })

describe('Breadcrumbs Component', () => {
  describe('when there is nowhere to go back to', () => {
    it('renders nothing on the landing page', async () => {
      const wrapper = await at('/')

      expect(wrapper.find('nav').exists()).toBe(false)
      expect(wrapper.text()).toBe('')
    })
  })

  describe('the trail', () => {
    it('names each segment from the route label map', async () => {
      const wrapper = await at('/interview/questions')

      expect(wrapper.text()).toContain('Interview Prep')
      expect(wrapper.text()).toContain('Questions')
    })

    it('builds a cumulative href for each ancestor', async () => {
      const wrapper = await at('/job-search/salary')

      expect(wrapper.find('a[href="/job-search"]').exists()).toBe(true)
      expect(wrapper.find('a[href="/job-search"]').text()).toBe('Job Search')
    })

    it('leaves the current page unlinked', async () => {
      // A breadcrumb linking to the page you are already on is a dead control
      // and, for a crawler, a self-referential link.
      const wrapper = await at('/interview/questions')

      expect(wrapper.find('a[href="/interview/questions"]').exists()).toBe(false)

      const current = wrapper.findAll('li').at(-1)!.find('span')
      expect(current.text()).toBe('Questions')
      expect(current.classes()).toContain('font-medium')
    })

    it('capitalises a segment it has no label for', async () => {
      // /register is a real page with no entry in routeLabels, so it exercises
      // the fallback rather than a made-up route.
      const wrapper = await at('/register')

      expect(wrapper.text()).toContain('Register')
    })

    it.each([
      ['/dashboard', ['Dashboard']],
      ['/settings', ['Settings']],
      ['/help', ['Help & Support']],
      ['/chat', ['Career Chat']],
      ['/resume/cover-letter', ['Resume Builder', 'Cover Letter']],
      ['/resume/templates', ['Resume Builder', 'Templates']],
      ['/interview/simulation', ['Interview Prep', 'Simulation']],
      ['/networking/templates', ['Networking', 'Templates']],
      ['/job-search/scams', ['Job Search', 'Scams']],
      ['/self-promotion/linkedin', ['Self-Promotion', 'LinkedIn']],
      ['/self-promotion/workplace', ['Self-Promotion', 'Workplace']],
    ])('reads %s as %j', async (route, labels) => {
      const wrapper = await at(route)

      for (const label of labels) {
        expect(wrapper.text()).toContain(label)
      }
    })
  })

  describe('the home link', () => {
    it('sends a dashboard page back to the dashboard', async () => {
      const wrapper = await at('/networking/templates')

      const home = wrapper.findAll('li')[0].find('a')
      expect(home.attributes('href')).toBe('/dashboard')
      expect(home.text()).toBe('Dashboard')
    })

    it.each(['/about', '/contact', '/privacy'])(
      'sends the company page %s back to the landing page',
      async (route) => {
        // A visitor reading the privacy policy is not necessarily signed in;
        // pointing them at /dashboard would be a dead end.
        const wrapper = await at(route)

        const home = wrapper.findAll('li')[0].find('a')
        expect(home.attributes('href')).toBe('/')
        expect(home.text()).toBe('Home')
      },
    )

    it.each([
      ['/about', 'About Us'],
      ['/contact', 'Contact'],
      ['/privacy', 'Privacy Policy'],
    ])('titles %s as %s', async (route, label) => {
      const wrapper = await at(route)

      expect(wrapper.findAll('li').at(-1)!.text()).toBe(label)
    })
  })

  describe('accessibility', () => {
    it('is a nav labelled as a breadcrumb', async () => {
      const wrapper = await at('/dashboard')

      expect(wrapper.find('nav').attributes('aria-label')).toBe('Breadcrumb')
    })

    it('uses an ordered list, because the order is the meaning', async () => {
      const wrapper = await at('/dashboard')

      expect(wrapper.find('nav > ol').exists()).toBe(true)
    })

    it('gives one list item to home and one to each crumb', async () => {
      const wrapper = await at('/self-promotion/linkedin')

      expect(wrapper.findAll('ol > li')).toHaveLength(3)
    })
  })

  describe('icons', () => {
    it('shows a home icon and one separator per crumb', async () => {
      const wrapper = await at('/interview/questions')

      // Home + a chevron before each of the two crumbs.
      expect(wrapper.findAll('svg')).toHaveLength(3)
    })

    it('keeps the home label readable to a screen reader when hidden', async () => {
      const wrapper = await at('/dashboard')

      const label = wrapper.findAll('li')[0].find('span')
      expect(label.classes()).toContain('sr-only')
      expect(label.text()).toBe('Dashboard')
    })
  })
})
