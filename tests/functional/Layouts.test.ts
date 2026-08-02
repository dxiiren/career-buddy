import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { h } from 'vue'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import DefaultLayout from '../../layouts/default.vue'
import DashboardLayout from '../../layouts/dashboard.vue'
import { useAuth } from '../../composables/useAuth'

/**
 * Both layouts wrap every page in the app, and neither was ever mounted by a
 * test — a broken sidebar or a missing footer would only have shown up in
 * Playwright, which `just verify` does not run.
 */
const navigateToMock = vi.hoisted(() => vi.fn())
mockNuxtImport('navigateTo', () => navigateToMock)

const PAGE = () => h('div', { class: 'page-body' }, 'Page body')

describe('default layout', () => {
  it('wraps the page in the public navbar and footer', async () => {
    const wrapper = await mountSuspended(DefaultLayout, {
      slots: { default: PAGE },
    })

    expect(wrapper.find('nav').exists()).toBe(true)
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  it('renders the page into main, between the two', async () => {
    const wrapper = await mountSuspended(DefaultLayout, {
      slots: { default: PAGE },
    })

    const main = wrapper.find('main')
    expect(main.exists()).toBe(true)
    expect(main.find('.page-body').exists()).toBe(true)
    expect(main.text()).toContain('Page body')
  })

  it('puts the navbar above the content and the footer below it', async () => {
    // Order is the whole point of a layout; a footer rendered above main is a
    // regression the mount alone would not notice.
    const wrapper = await mountSuspended(DefaultLayout, {
      slots: { default: PAGE },
    })

    const html = wrapper.html()
    expect(html.indexOf('<nav')).toBeLessThan(html.indexOf('<main'))
    expect(html.indexOf('<main')).toBeLessThan(html.indexOf('<footer'))
  })

  it('stretches to the full viewport so the footer sits at the bottom', async () => {
    const wrapper = await mountSuspended(DefaultLayout, {
      slots: { default: PAGE },
    })

    expect(wrapper.classes()).toContain('min-h-screen')
    expect(wrapper.find('main').classes()).toContain('flex-1')
  })
})

describe('dashboard layout', () => {
  beforeEach(() => {
    navigateToMock.mockClear()
    useAuth().logout()
  })

  afterEach(() => {
    useAuth().logout()
  })

  const mountDashboard = (route = '/dashboard') =>
    mountSuspended(DashboardLayout, { route, slots: { default: PAGE } })

  describe('app shell', () => {
    it('renders the sidebar, the top bar and the page area', async () => {
      const wrapper = await mountDashboard()

      expect(wrapper.find('aside').exists()).toBe(true)
      expect(wrapper.find('header').exists()).toBe(true)
      expect(wrapper.find('main .page-body').exists()).toBe(true)
    })

    it('renders breadcrumbs above the page content', async () => {
      const wrapper = await mountDashboard('/interview/questions')

      const breadcrumbs = wrapper.find('nav[aria-label="Breadcrumb"]')
      expect(breadcrumbs.exists()).toBe(true)
      expect(breadcrumbs.text()).toContain('Interview Prep')
    })

    it('links the sidebar logo back to the landing page', async () => {
      const wrapper = await mountDashboard()

      const logo = wrapper.find('aside a[href="/"]')
      expect(logo.exists()).toBe(true)
      expect(logo.find('img[alt="Career Buddy"]').exists()).toBe(true)
    })
  })

  describe('navigation', () => {
    it('offers every module in the sidebar', async () => {
      const wrapper = await mountDashboard()

      const sidebar = wrapper.find('aside').text()
      for (const item of [
        'Dashboard',
        'Resume Builder',
        'Interview Prep',
        'Networking',
        'Job Search',
        'Self-Promotion',
      ]) {
        expect(sidebar).toContain(item)
      }
    })

    it('keeps settings, help and sign out in the bottom section', async () => {
      const wrapper = await mountDashboard()

      expect(wrapper.find('aside a[href="/settings"]').exists()).toBe(true)
      expect(wrapper.find('aside a[href="/help"]').exists()).toBe(true)
      expect(wrapper.find('aside').text()).toContain('Sign Out')
    })

    it('highlights the module you are in, and only that one', async () => {
      const wrapper = await mountDashboard('/networking')

      // A module with children renders as a button, not a link.
      const networking = wrapper
        .findAll('aside button')
        .find((button) => button.text().includes('Networking'))!
      expect(networking.classes()).toContain('bg-primary')

      const jobSearch = wrapper
        .findAll('aside button')
        .find((button) => button.text().includes('Job Search'))!
      expect(jobSearch.classes()).not.toContain('bg-primary')
      expect(wrapper.find('aside a[href="/dashboard"]').classes()).not.toContain(
        'bg-primary',
      )
    })

    it('does not light up the dashboard from a deeper route', async () => {
      // isActive() special-cases /dashboard with an exact match precisely so a
      // startsWith rule cannot make it permanently active.
      const wrapper = await mountDashboard('/settings')

      expect(wrapper.find('aside a[href="/dashboard"]').classes()).not.toContain(
        'bg-primary',
      )
      expect(wrapper.find('aside a[href="/settings"]').classes()).toContain(
        'bg-primary',
      )
    })

    it('marks the dashboard active only on an exact match', async () => {
      const wrapper = await mountDashboard('/dashboard')

      expect(wrapper.find('aside a[href="/dashboard"]').classes()).toContain(
        'bg-primary',
      )
    })

    it('reveals a module submenu when its parent is clicked', async () => {
      const wrapper = await mountDashboard()

      expect(wrapper.find('aside a[href="/interview/questions"]').exists()).toBe(
        false,
      )

      const parent = wrapper
        .findAll('aside button')
        .find((button) => button.text().includes('Interview Prep'))!
      await parent.trigger('click')

      expect(wrapper.find('aside a[href="/interview/questions"]').exists()).toBe(
        true,
      )
      expect(
        wrapper.find('aside a[href="/interview/simulation"]').exists(),
      ).toBe(true)
    })

    it('folds the submenu away again on a second click', async () => {
      const wrapper = await mountDashboard()

      const parent = wrapper
        .findAll('aside button')
        .find((button) => button.text().includes('Job Search'))!

      await parent.trigger('click')
      expect(wrapper.find('aside a[href="/job-search/salary"]').exists()).toBe(
        true,
      )

      await parent.trigger('click')
      expect(wrapper.find('aside a[href="/job-search/salary"]').exists()).toBe(
        false,
      )
    })

    it('opens the right submenu already expanded when you land on a subpage', async () => {
      // Arriving at /resume/templates from a link must not leave the sidebar
      // showing no sign of where you are.
      const wrapper = await mountDashboard('/resume/templates')

      expect(wrapper.find('aside a[href="/resume/cover-letter"]').exists()).toBe(
        true,
      )
    })
  })

  describe('sidebar collapse', () => {
    it('starts expanded with the module names showing', async () => {
      const wrapper = await mountDashboard()

      expect(wrapper.find('aside').classes()).toContain('w-64')
      expect(wrapper.find('aside').text()).toContain('Dashboard')
    })

    it('narrows to icons only when collapsed', async () => {
      const wrapper = await mountDashboard()

      await wrapper.find('button[title="Collapse sidebar"]').trigger('click')

      const aside = wrapper.find('aside')
      expect(aside.classes()).toContain('w-16')
      expect(aside.text()).not.toContain('Sign Out')
      expect(wrapper.find('button[title="Expand sidebar"]').exists()).toBe(true)
    })
  })

  describe('mobile drawer', () => {
    it('is closed until the hamburger is used', async () => {
      const wrapper = await mountDashboard()

      expect(wrapper.findAll('aside')).toHaveLength(1)
    })

    it('opens a second nav over the page', async () => {
      const wrapper = await mountDashboard()

      // The first lg:hidden button in the top bar is the hamburger.
      const hamburger = wrapper
        .findAll('header button')
        .find((button) => button.classes().includes('lg:hidden'))!
      await hamburger.trigger('click')

      const drawers = wrapper.findAll('aside')
      expect(drawers).toHaveLength(2)
      expect(drawers[1].text()).toContain('Dashboard')
    })
  })

  describe('the signed-in user', () => {
    it('falls back to a placeholder when there is no session', async () => {
      const wrapper = await mountDashboard()

      expect(wrapper.find('header').text()).toContain('User')
    })

    it('shows the name and initial from the session', async () => {
      const { user } = useAuth()
      user.value = { username: 'yana', name: 'Yana', email: 'yana@example.com' }

      const wrapper = await mountDashboard()

      const header = wrapper.find('header').text()
      expect(header).toContain('Yana')
      expect(header).toContain('yana@example.com')
      expect(header).toContain('Y')
    })

    it('ends the session and returns to the landing page on sign out', async () => {
      const { user } = useAuth()
      user.value = { username: 'yana', name: 'Yana' }

      const wrapper = await mountDashboard()
      const signOut = wrapper
        .findAll('aside button')
        .find((button) => button.text().includes('Sign Out'))!
      await signOut.trigger('click')

      expect(user.value).toBeNull()
      expect(navigateToMock).toHaveBeenCalledWith('/')
    })
  })
})
