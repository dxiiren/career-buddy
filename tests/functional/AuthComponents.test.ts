import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Checkbox } from '../../components/ui/checkbox'
import { Skeleton } from '../../components/ui/skeleton'

describe('Input component', () => {
  it('should render with placeholder', async () => {
    const wrapper = await mountSuspended(Input, {
      props: {
        placeholder: 'Enter your email',
      },
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter your email')
  })

  it('should emit update:modelValue on input', async () => {
    const wrapper = await mountSuspended(Input, {
      props: {
        modelValue: '',
      },
    })

    await wrapper.find('input').setValue('test@example.com')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['test@example.com'])
  })

  it('should render with correct type', async () => {
    const wrapper = await mountSuspended(Input, {
      props: {
        type: 'password',
      },
    })

    expect(wrapper.find('input').attributes('type')).toBe('password')
  })

  it('should be disabled when disabled prop is true', async () => {
    const wrapper = await mountSuspended(Input, {
      props: {
        disabled: true,
      },
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('should display the modelValue', async () => {
    const wrapper = await mountSuspended(Input, {
      props: {
        modelValue: 'initial value',
      },
    })

    expect(wrapper.find('input').element.value).toBe('initial value')
  })
})

describe('Label component', () => {
  it('should render slot content', async () => {
    const wrapper = await mountSuspended(Label, {
      slots: {
        default: 'Email Address',
      },
    })

    expect(wrapper.text()).toBe('Email Address')
  })

  it('should have for attribute when provided', async () => {
    const wrapper = await mountSuspended(Label, {
      props: {
        for: 'email-input',
      },
      slots: {
        default: 'Email',
      },
    })

    expect(wrapper.find('label').attributes('for')).toBe('email-input')
  })
})

describe('Checkbox component', () => {
  it('should render unchecked by default', async () => {
    const wrapper = await mountSuspended(Checkbox, {
      props: {
        modelValue: false,
      },
    })

    expect(wrapper.find('button').attributes('aria-checked')).toBe('false')
  })

  it('should render checked when modelValue is true', async () => {
    const wrapper = await mountSuspended(Checkbox, {
      props: {
        modelValue: true,
      },
    })

    expect(wrapper.find('button').attributes('aria-checked')).toBe('true')
  })

  it('should emit update:modelValue on click', async () => {
    const wrapper = await mountSuspended(Checkbox, {
      props: {
        modelValue: false,
      },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('should not emit when disabled', async () => {
    const wrapper = await mountSuspended(Checkbox, {
      props: {
        modelValue: false,
        disabled: true,
      },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('should have correct role', async () => {
    const wrapper = await mountSuspended(Checkbox, {
      props: {
        modelValue: false,
      },
    })

    expect(wrapper.find('button').attributes('role')).toBe('checkbox')
  })
})

describe('Skeleton component', () => {
  it('should render a div element', async () => {
    const wrapper = await mountSuspended(Skeleton)

    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('should have animation class', async () => {
    const wrapper = await mountSuspended(Skeleton)

    expect(wrapper.find('div').classes()).toContain('skeleton-shimmer')
  })

  it('should have rounded-md class', async () => {
    const wrapper = await mountSuspended(Skeleton)

    expect(wrapper.find('div').classes()).toContain('rounded-md')
  })
})
