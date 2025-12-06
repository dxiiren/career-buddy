import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Skeleton from '../../components/ui/skeleton/Skeleton.vue'

describe('Skeleton Component', () => {
  it('renders with default shimmer class', async () => {
    const wrapper = await mountSuspended(Skeleton)

    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('skeleton-shimmer')
    expect(classes).toContain('rounded-md')
  })

  it('accepts custom classes', async () => {
    const wrapper = await mountSuspended(Skeleton, {
      attrs: {
        class: 'h-8 w-48 rounded-full',
      },
    })

    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('h-8')
    expect(classes).toContain('w-48')
    expect(classes).toContain('rounded-full')
  })

  it('renders as a div element', async () => {
    const wrapper = await mountSuspended(Skeleton)

    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('applies different size classes correctly', async () => {
    const sizes = [
      { class: 'h-4 w-full', expected: ['h-4', 'w-full'] },
      { class: 'h-6 w-32', expected: ['h-6', 'w-32'] },
      { class: 'h-10 w-10', expected: ['h-10', 'w-10'] },
      { class: 'h-24 w-24 rounded-full', expected: ['h-24', 'w-24', 'rounded-full'] },
    ]

    for (const size of sizes) {
      const wrapper = await mountSuspended(Skeleton, {
        attrs: {
          class: size.class,
        },
      })

      const classes = wrapper.classes()
      for (const expectedClass of size.expected) {
        expect(classes).toContain(expectedClass)
      }
    }
  })

  it('maintains skeleton-shimmer class when custom classes are added', async () => {
    const wrapper = await mountSuspended(Skeleton, {
      attrs: {
        class: 'custom-class another-class',
      },
    })

    const classes = wrapper.classes()
    expect(classes).toContain('skeleton-shimmer')
    expect(classes).toContain('custom-class')
    expect(classes).toContain('another-class')
  })

  it('renders with position relative for shimmer effect', async () => {
    const wrapper = await mountSuspended(Skeleton)

    // The skeleton-shimmer class includes position: relative
    expect(wrapper.classes()).toContain('skeleton-shimmer')
  })

  it('renders with overflow hidden for shimmer animation', async () => {
    const wrapper = await mountSuspended(Skeleton)

    // The skeleton-shimmer class includes overflow: hidden
    expect(wrapper.classes()).toContain('skeleton-shimmer')
  })
})

describe('Skeleton Loading Patterns', () => {
  it('can be used for text placeholder', async () => {
    const wrapper = await mountSuspended(Skeleton, {
      attrs: {
        class: 'h-4 w-3/4',
      },
    })

    const classes = wrapper.classes()
    expect(classes).toContain('h-4')
    expect(classes).toContain('w-3/4')
  })

  it('can be used for avatar placeholder', async () => {
    const wrapper = await mountSuspended(Skeleton, {
      attrs: {
        class: 'h-12 w-12 rounded-full',
      },
    })

    const classes = wrapper.classes()
    expect(classes).toContain('h-12')
    expect(classes).toContain('w-12')
    expect(classes).toContain('rounded-full')
  })

  it('can be used for button placeholder', async () => {
    const wrapper = await mountSuspended(Skeleton, {
      attrs: {
        class: 'h-10 w-32 rounded-lg',
      },
    })

    const classes = wrapper.classes()
    expect(classes).toContain('h-10')
    expect(classes).toContain('w-32')
    expect(classes).toContain('rounded-lg')
  })

  it('can be used for card placeholder', async () => {
    const wrapper = await mountSuspended(Skeleton, {
      attrs: {
        class: 'h-64 w-full rounded-2xl',
      },
    })

    const classes = wrapper.classes()
    expect(classes).toContain('h-64')
    expect(classes).toContain('w-full')
    expect(classes).toContain('rounded-2xl')
  })
})
