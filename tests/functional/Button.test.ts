import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Button from '../../components/ui/button/Button.vue'

describe('Button Component', () => {
  it('renders with default props', async () => {
    const wrapper = await mountSuspended(Button, {
      slots: {
        default: 'Click me',
      },
    })

    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('renders as different element when as prop is provided', async () => {
    const wrapper = await mountSuspended(Button, {
      props: {
        as: 'a',
      },
      slots: {
        default: 'Link Button',
      },
    })

    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('applies default variant classes', async () => {
    const wrapper = await mountSuspended(Button, {
      slots: {
        default: 'Default',
      },
    })

    const classes = wrapper.find('button').classes().join(' ')
    expect(classes).toContain('bg-primary')
    expect(classes).toContain('text-primary-foreground')
  })

  it('applies secondary variant classes', async () => {
    const wrapper = await mountSuspended(Button, {
      props: {
        variant: 'secondary',
      },
      slots: {
        default: 'Secondary',
      },
    })

    const classes = wrapper.find('button').classes().join(' ')
    expect(classes).toContain('bg-secondary')
  })

  it('applies outline variant classes', async () => {
    const wrapper = await mountSuspended(Button, {
      props: {
        variant: 'outline',
      },
      slots: {
        default: 'Outline',
      },
    })

    const classes = wrapper.find('button').classes().join(' ')
    expect(classes).toContain('border')
  })

  it('applies ghost variant classes', async () => {
    const wrapper = await mountSuspended(Button, {
      props: {
        variant: 'ghost',
      },
      slots: {
        default: 'Ghost',
      },
    })

    const classes = wrapper.find('button').classes().join(' ')
    expect(classes).toContain('hover:bg-accent')
  })

  it('applies link variant classes', async () => {
    const wrapper = await mountSuspended(Button, {
      props: {
        variant: 'link',
      },
      slots: {
        default: 'Link',
      },
    })

    const classes = wrapper.find('button').classes().join(' ')
    expect(classes).toContain('underline-offset-4')
  })

  it('applies destructive variant classes', async () => {
    const wrapper = await mountSuspended(Button, {
      props: {
        variant: 'destructive',
      },
      slots: {
        default: 'Destructive',
      },
    })

    const classes = wrapper.find('button').classes().join(' ')
    expect(classes).toContain('bg-destructive')
  })

  it('applies small size classes', async () => {
    const wrapper = await mountSuspended(Button, {
      props: {
        size: 'sm',
      },
      slots: {
        default: 'Small',
      },
    })

    const classes = wrapper.find('button').classes().join(' ')
    expect(classes).toContain('h-9')
  })

  it('applies large size classes', async () => {
    const wrapper = await mountSuspended(Button, {
      props: {
        size: 'lg',
      },
      slots: {
        default: 'Large',
      },
    })

    const classes = wrapper.find('button').classes().join(' ')
    expect(classes).toContain('h-12')
  })

  it('applies icon size classes', async () => {
    const wrapper = await mountSuspended(Button, {
      props: {
        size: 'icon',
      },
      slots: {
        default: '+',
      },
    })

    const classes = wrapper.find('button').classes().join(' ')
    expect(classes).toContain('h-10')
    expect(classes).toContain('w-10')
  })

  it('renders slot content correctly', async () => {
    const wrapper = await mountSuspended(Button, {
      slots: {
        default: '<span class="icon">Icon</span> Button Text',
      },
    })

    expect(wrapper.find('.icon').exists()).toBe(true)
    expect(wrapper.text()).toContain('Button Text')
  })

  it('is clickable and triggers click handler', async () => {
    let clicked = false
    const wrapper = await mountSuspended(Button, {
      slots: {
        default: 'Clickable',
      },
      attrs: {
        onClick: () => {
          clicked = true
        },
      },
    })

    await wrapper.find('button').trigger('click')
    expect(clicked).toBe(true)
  })
})
