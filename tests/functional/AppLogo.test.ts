import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppLogo from '../../components/shared/AppLogo.vue'

describe('AppLogo Component', () => {
  describe('rendering', () => {
    it('renders a link element', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const link = wrapper.find('a')
      expect(link.exists()).toBe(true)
    })

    it('links to home page', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const link = wrapper.find('a')
      expect(link.attributes('href')).toBe('/')
    })

    it('renders the logo image', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const img = wrapper.find('img')
      expect(img.exists()).toBe(true)
    })

    it('logo image has correct alt text for accessibility', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const img = wrapper.find('img')
      expect(img.attributes('alt')).toBe('Career Buddy')
    })

    it('logo image has correct src', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const img = wrapper.find('img')
      expect(img.attributes('src')).toBe('/images/brand/logo-full.png')
    })
  })

  describe('styling', () => {
    it('link has flex layout', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const link = wrapper.find('a')
      const classes = link.classes().join(' ')
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
    })

    it('logo image has proper sizing', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const img = wrapper.find('img')
      const classes = img.classes().join(' ')
      expect(classes).toContain('h-16')
      expect(classes).toContain('w-auto')
    })

    it('logo image has object-contain class', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const img = wrapper.find('img')
      const classes = img.classes().join(' ')
      expect(classes).toContain('object-contain')
    })

    it('logo image has margin top', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const img = wrapper.find('img')
      const classes = img.classes().join(' ')
      expect(classes).toContain('mt-2')
    })
  })

  describe('props', () => {
    it('accepts custom class prop', async () => {
      const wrapper = await mountSuspended(AppLogo, {
        props: {
          class: 'custom-class',
        },
      })

      // The component should render with the prop passed
      expect(wrapper.exists()).toBe(true)
      // Check that the link has the default flex classes
      const link = wrapper.find('a')
      expect(link.classes()).toContain('flex')
    })

    it('maintains default classes', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const link = wrapper.find('a')
      const classes = link.classes().join(' ')
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
    })
  })

  describe('accessibility', () => {
    it('link is accessible for navigation', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const link = wrapper.find('a')
      expect(link.element.tagName.toLowerCase()).toBe('a')
      expect(link.attributes('href')).toBeDefined()
    })

    it('logo image has descriptive alt text', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const img = wrapper.find('img')
      // Alt text should be meaningful for screen readers
      expect(img.attributes('alt')).toBe('Career Buddy')
    })
  })
})
