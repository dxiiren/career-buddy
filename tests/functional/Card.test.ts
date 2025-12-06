import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Card from '../../components/ui/card/Card.vue'
import CardHeader from '../../components/ui/card/CardHeader.vue'
import CardTitle from '../../components/ui/card/CardTitle.vue'
import CardDescription from '../../components/ui/card/CardDescription.vue'
import CardContent from '../../components/ui/card/CardContent.vue'
import CardFooter from '../../components/ui/card/CardFooter.vue'

describe('Card Component', () => {
  it('renders with default classes', async () => {
    const wrapper = await mountSuspended(Card, {
      slots: {
        default: 'Card content',
      },
    })

    expect(wrapper.text()).toBe('Card content')
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('rounded-xl')
    expect(classes).toContain('border')
    expect(classes).toContain('bg-card')
  })

  it('accepts custom classes', async () => {
    const wrapper = await mountSuspended(Card, {
      props: {
        class: 'custom-class',
      },
      slots: {
        default: 'Content',
      },
    })

    expect(wrapper.classes()).toContain('custom-class')
  })

  it('has hover shadow transition', async () => {
    const wrapper = await mountSuspended(Card, {
      slots: {
        default: 'Content',
      },
    })

    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('hover:shadow-md')
  })
})

describe('CardHeader Component', () => {
  it('renders with default styling', async () => {
    const wrapper = await mountSuspended(CardHeader, {
      slots: {
        default: 'Header content',
      },
    })

    expect(wrapper.text()).toBe('Header content')
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('flex')
    expect(classes).toContain('flex-col')
    expect(classes).toContain('p-6')
  })
})

describe('CardTitle Component', () => {
  it('renders as h3 element', async () => {
    const wrapper = await mountSuspended(CardTitle, {
      slots: {
        default: 'Card Title',
      },
    })

    expect(wrapper.find('h3').exists()).toBe(true)
    expect(wrapper.text()).toBe('Card Title')
  })

  it('has correct typography styles', async () => {
    const wrapper = await mountSuspended(CardTitle, {
      slots: {
        default: 'Title',
      },
    })

    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('font-semibold')
    expect(classes).toContain('font-heading')
  })
})

describe('CardDescription Component', () => {
  it('renders with muted text styling', async () => {
    const wrapper = await mountSuspended(CardDescription, {
      slots: {
        default: 'Description text',
      },
    })

    expect(wrapper.text()).toBe('Description text')
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('text-sm')
    expect(classes).toContain('text-muted-foreground')
  })
})

describe('CardContent Component', () => {
  it('renders with correct padding', async () => {
    const wrapper = await mountSuspended(CardContent, {
      slots: {
        default: 'Main content',
      },
    })

    expect(wrapper.text()).toBe('Main content')
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('p-6')
    expect(classes).toContain('pt-0')
  })
})

describe('CardFooter Component', () => {
  it('renders with flex layout', async () => {
    const wrapper = await mountSuspended(CardFooter, {
      slots: {
        default: 'Footer content',
      },
    })

    expect(wrapper.text()).toBe('Footer content')
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('flex')
    expect(classes).toContain('items-center')
    expect(classes).toContain('p-6')
  })
})

describe('Card Composition', () => {
  it('works correctly when composed together', async () => {
    const wrapper = await mountSuspended(Card, {
      slots: {
        default: `
          <div class="card-header">Header</div>
          <div class="card-content">Content</div>
          <div class="card-footer">Footer</div>
        `,
      },
    })

    expect(wrapper.find('.card-header').exists()).toBe(true)
    expect(wrapper.find('.card-content').exists()).toBe(true)
    expect(wrapper.find('.card-footer').exists()).toBe(true)
  })
})
