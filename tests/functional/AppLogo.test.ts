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

    it('renders the brand name', async () => {
      const wrapper = await mountSuspended(AppLogo)

      expect(wrapper.text()).toContain('Career Buddy')
    })

    it('renders the logo icon container', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const iconContainer = wrapper.find('.bg-primary')
      expect(iconContainer.exists()).toBe(true)
    })

    it('renders the SVG logo icon', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const svg = wrapper.find('svg')
      expect(svg.exists()).toBe(true)
    })

    it('SVG has correct viewBox', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const svg = wrapper.find('svg')
      expect(svg.attributes('viewBox')).toBe('0 0 24 24')
    })

    it('SVG has proper stroke attributes', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const svg = wrapper.find('svg')
      expect(svg.attributes('stroke')).toBe('currentColor')
      expect(svg.attributes('stroke-width')).toBe('2')
      expect(svg.attributes('stroke-linecap')).toBe('round')
      expect(svg.attributes('stroke-linejoin')).toBe('round')
    })

    it('SVG contains path elements', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const paths = wrapper.findAll('svg path')
      expect(paths.length).toBe(3)
    })
  })

  describe('styling', () => {
    it('link has flex layout', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const link = wrapper.find('a')
      const classes = link.classes().join(' ')
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('gap-2')
    })

    it('icon container has correct dimensions', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const iconContainer = wrapper.find('.bg-primary')
      const classes = iconContainer.classes().join(' ')
      expect(classes).toContain('h-9')
      expect(classes).toContain('w-9')
    })

    it('icon container is rounded', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const iconContainer = wrapper.find('.bg-primary')
      const classes = iconContainer.classes().join(' ')
      expect(classes).toContain('rounded-lg')
    })

    it('icon container has flex centering', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const iconContainer = wrapper.find('.bg-primary')
      const classes = iconContainer.classes().join(' ')
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('justify-center')
    })

    it('SVG icon has correct size', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const svg = wrapper.find('svg')
      const classes = svg.classes().join(' ')
      expect(classes).toContain('h-5')
      expect(classes).toContain('w-5')
    })

    it('SVG icon is white', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const svg = wrapper.find('svg')
      const classes = svg.classes().join(' ')
      expect(classes).toContain('text-white')
    })

    it('brand name has correct typography', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const brandName = wrapper.find('span')
      const classes = brandName.classes().join(' ')
      expect(classes).toContain('text-xl')
      expect(classes).toContain('font-bold')
      expect(classes).toContain('font-heading')
    })

    it('brand name uses foreground color', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const brandName = wrapper.find('span')
      const classes = brandName.classes().join(' ')
      expect(classes).toContain('text-foreground')
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
      expect(classes).toContain('gap-2')
    })
  })

  describe('accessibility', () => {
    it('link is accessible for navigation', async () => {
      const wrapper = await mountSuspended(AppLogo)

      const link = wrapper.find('a')
      expect(link.element.tagName.toLowerCase()).toBe('a')
      expect(link.attributes('href')).toBeDefined()
    })

    it('brand name is visible text content', async () => {
      const wrapper = await mountSuspended(AppLogo)

      // The brand name should be readable by screen readers
      expect(wrapper.text()).toBe('Career Buddy')
    })
  })
})
