import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Progress from '../../components/ui/progress/Progress.vue'

describe('Progress Component', () => {
  it('renders with default props', async () => {
    const wrapper = await mountSuspended(Progress)

    expect(wrapper.attributes('role')).toBe('progressbar')
    expect(wrapper.attributes('aria-valuenow')).toBe('0')
    expect(wrapper.attributes('aria-valuemax')).toBe('100')
  })

  it('renders with default styling classes', async () => {
    const wrapper = await mountSuspended(Progress)

    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('relative')
    expect(classes).toContain('h-2')
    expect(classes).toContain('w-full')
    expect(classes).toContain('overflow-hidden')
    expect(classes).toContain('rounded-full')
  })

  it('displays correct progress value', async () => {
    const wrapper = await mountSuspended(Progress, {
      props: {
        modelValue: 50,
      },
    })

    expect(wrapper.attributes('aria-valuenow')).toBe('50')
  })

  it('calculates percentage correctly', async () => {
    const wrapper = await mountSuspended(Progress, {
      props: {
        modelValue: 75,
        max: 100,
      },
    })

    // Find the indicator by looking for the element with transform style
    const indicator = wrapper.find('[style*="transform"]')
    expect(indicator.exists()).toBe(true)
    expect(indicator.attributes('style')).toContain('transform: translateX(-25%)')
  })

  it('handles custom max value', async () => {
    const wrapper = await mountSuspended(Progress, {
      props: {
        modelValue: 50,
        max: 200,
      },
    })

    expect(wrapper.attributes('aria-valuemax')).toBe('200')
    // 50/200 = 25%, so translateX should be -75%
    const indicator = wrapper.find('[style*="transform"]')
    expect(indicator.exists()).toBe(true)
    expect(indicator.attributes('style')).toContain('transform: translateX(-75%)')
  })

  it('clamps percentage to 0 when value is negative', async () => {
    const wrapper = await mountSuspended(Progress, {
      props: {
        modelValue: -10,
      },
    })

    const indicator = wrapper.find('[style*="transform"]')
    expect(indicator.exists()).toBe(true)
    // Clamped to 0%, so translateX should be -100%
    expect(indicator.attributes('style')).toContain('transform: translateX(-100%)')
  })

  it('clamps percentage to 100 when value exceeds max', async () => {
    const wrapper = await mountSuspended(Progress, {
      props: {
        modelValue: 150,
        max: 100,
      },
    })

    const indicator = wrapper.find('[style*="transform"]')
    expect(indicator.exists()).toBe(true)
    // Clamped to 100%, so translateX should be 0%
    expect(indicator.attributes('style')).toContain('transform: translateX(-0%)')
  })

  it('accepts custom classes', async () => {
    const wrapper = await mountSuspended(Progress, {
      attrs: {
        class: 'custom-progress mb-2',
      },
    })

    const classes = wrapper.classes()
    expect(classes).toContain('custom-progress')
    expect(classes).toContain('mb-2')
  })

  it('accepts custom indicator class', async () => {
    const wrapper = await mountSuspended(Progress, {
      props: {
        modelValue: 50,
        indicatorClass: 'bg-green-500',
      },
    })

    const indicator = wrapper.find('[style*="transform"]')
    expect(indicator.exists()).toBe(true)
    expect(indicator.classes()).toContain('bg-green-500')
  })

  it('has transition for smooth animation', async () => {
    const wrapper = await mountSuspended(Progress, {
      props: {
        modelValue: 50,
      },
    })

    const indicator = wrapper.find('[style*="transform"]')
    expect(indicator.exists()).toBe(true)
    const classes = indicator.classes().join(' ')
    expect(classes).toContain('transition-all')
    expect(classes).toContain('duration-300')
  })

  it('indicator has correct base classes', async () => {
    const wrapper = await mountSuspended(Progress, {
      props: {
        modelValue: 50,
      },
    })

    const indicator = wrapper.find('[style*="transform"]')
    expect(indicator.exists()).toBe(true)
    const classes = indicator.classes().join(' ')
    expect(classes).toContain('h-full')
    expect(classes).toContain('w-full')
    expect(classes).toContain('bg-primary')
  })
})

describe('Progress Accessibility', () => {
  it('has proper ARIA attributes', async () => {
    const wrapper = await mountSuspended(Progress, {
      props: {
        modelValue: 60,
        max: 100,
      },
    })

    expect(wrapper.attributes('role')).toBe('progressbar')
    expect(wrapper.attributes('aria-valuenow')).toBe('60')
    expect(wrapper.attributes('aria-valuemax')).toBe('100')
  })

  it('updates ARIA value when progress changes', async () => {
    const wrapper = await mountSuspended(Progress, {
      props: {
        modelValue: 25,
      },
    })

    expect(wrapper.attributes('aria-valuenow')).toBe('25')

    await wrapper.setProps({ modelValue: 75 })
    expect(wrapper.attributes('aria-valuenow')).toBe('75')
  })
})

describe('Progress Edge Cases', () => {
  it('handles zero value', async () => {
    const wrapper = await mountSuspended(Progress, {
      props: {
        modelValue: 0,
      },
    })

    const indicator = wrapper.find('[style*="transform"]')
    expect(indicator.exists()).toBe(true)
    expect(indicator.attributes('style')).toContain('transform: translateX(-100%)')
  })

  it('handles 100% value', async () => {
    const wrapper = await mountSuspended(Progress, {
      props: {
        modelValue: 100,
      },
    })

    const indicator = wrapper.find('[style*="transform"]')
    expect(indicator.exists()).toBe(true)
    expect(indicator.attributes('style')).toContain('transform: translateX(-0%)')
  })

  it('handles decimal values', async () => {
    const wrapper = await mountSuspended(Progress, {
      props: {
        modelValue: 33.33,
      },
    })

    expect(wrapper.attributes('aria-valuenow')).toBe('33.33')
  })
})
