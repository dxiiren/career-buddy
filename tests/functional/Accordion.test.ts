import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { h } from 'vue'
import Accordion from '../../components/ui/accordion/Accordion.vue'
import AccordionItem from '../../components/ui/accordion/AccordionItem.vue'
import AccordionTrigger from '../../components/ui/accordion/AccordionTrigger.vue'
import AccordionContent from '../../components/ui/accordion/AccordionContent.vue'

describe('Accordion Component', () => {
  describe('rendering', () => {
    it('forwards radix-vue events back out to the caller', async () => {
      // The root's entire job is useForwardPropsEmits. Props are covered by the
      // class and default-value specs below; the emit half was covered nowhere,
      // and a v-model on the FAQ accordion depends on it.
      const onUpdate = vi.fn()
      const TestComponent = {
        components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
        setup: () => ({ onUpdate }),
        template: `
          <Accordion type="single" collapsible @update:model-value="onUpdate">
            <AccordionItem value="item-1">
              <AccordionTrigger>Question 1</AccordionTrigger>
              <AccordionContent>Answer 1</AccordionContent>
            </AccordionItem>
          </Accordion>
        `,
      }
      const wrapper = await mountSuspended(TestComponent)

      await wrapper.find('button').trigger('click')

      expect(onUpdate).toHaveBeenCalledWith('item-1')
    })

    it('renders slot content', async () => {
      const wrapper = await mountSuspended(Accordion, {
        props: {
          type: 'single',
          collapsible: true,
        },
        slots: {
          default: '<div class="test-content">Test Content</div>',
        },
      })

      expect(wrapper.find('.test-content').exists()).toBe(true)
    })

    it('has w-full class by default', async () => {
      const wrapper = await mountSuspended(Accordion, {
        props: {
          type: 'single',
        },
        slots: {
          default: '<div>Content</div>',
        },
      })

      const classes = wrapper.classes().join(' ')
      expect(classes).toContain('w-full')
    })

    it('accepts custom class prop', async () => {
      const wrapper = await mountSuspended(Accordion, {
        props: {
          type: 'single',
          class: 'custom-accordion-class',
        },
        slots: {
          default: '<div>Content</div>',
        },
      })

      const classes = wrapper.classes().join(' ')
      expect(classes).toContain('custom-accordion-class')
    })
  })
})

describe('Accordion with nested components', () => {
  // Helper to create a complete accordion structure
  const createAccordionWithItems = () => {
    return {
      components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
      template: `
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Question 2</AccordionTrigger>
            <AccordionContent>Answer 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      `,
    }
  }

  describe('AccordionItem within Accordion', () => {
    it('renders accordion items', async () => {
      const TestComponent = createAccordionWithItems()
      const wrapper = await mountSuspended(TestComponent)

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.text()).toContain('Question 1')
      expect(wrapper.text()).toContain('Question 2')
    })

    it('separates accordion items with a bottom border', async () => {
      const TestComponent = createAccordionWithItems()
      const wrapper = await mountSuspended(TestComponent)

      const items = wrapper.findAllComponents(AccordionItem)
      expect(items.length).toBe(2)
      for (const item of items) {
        expect(item.classes()).toContain('border-b')
      }
    })
  })

  describe('AccordionTrigger within Accordion', () => {
    it('renders trigger buttons', async () => {
      const TestComponent = createAccordionWithItems()
      const wrapper = await mountSuspended(TestComponent)

      const buttons = wrapper.findAll('button')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('triggers display question text', async () => {
      const TestComponent = createAccordionWithItems()
      const wrapper = await mountSuspended(TestComponent)

      expect(wrapper.text()).toContain('Question 1')
      expect(wrapper.text()).toContain('Question 2')
    })

    it('triggers have chevron icons', async () => {
      const TestComponent = createAccordionWithItems()
      const wrapper = await mountSuspended(TestComponent)

      const svgs = wrapper.findAll('svg')
      expect(svgs.length).toBeGreaterThan(0)
    })
  })

  describe('AccordionContent within Accordion', () => {
    it('keeps every answer collapsed until asked', async () => {
      const TestComponent = createAccordionWithItems()
      const wrapper = await mountSuspended(TestComponent)

      expect(wrapper.findAllComponents(AccordionContent)).toHaveLength(2)
      expect(wrapper.text()).not.toContain('Answer 1')
      expect(wrapper.text()).not.toContain('Answer 2')
    })
  })

  describe('Accordion interactions', () => {
    it('clicking a trigger reveals its answer', async () => {
      const TestComponent = createAccordionWithItems()
      const wrapper = await mountSuspended(TestComponent)

      const firstTrigger = wrapper.findAll('button')[0]
      expect(firstTrigger.attributes('aria-expanded')).toBe('false')

      await firstTrigger.trigger('click')

      expect(firstTrigger.attributes('aria-expanded')).toBe('true')
      expect(firstTrigger.attributes('data-state')).toBe('open')
      expect(wrapper.text()).toContain('Answer 1')
    })

    it('closes the open item when another is opened, in single mode', async () => {
      const TestComponent = createAccordionWithItems()
      const wrapper = await mountSuspended(TestComponent)

      const [first, second] = wrapper.findAll('button')

      await first.trigger('click')
      expect(first.attributes('aria-expanded')).toBe('true')

      await second.trigger('click')

      // "single" is the whole reason this mode exists — two open panels here
      // would be the bug.
      expect(first.attributes('aria-expanded')).toBe('false')
      expect(second.attributes('aria-expanded')).toBe('true')
      expect(wrapper.text()).toContain('Answer 2')
      expect(wrapper.text()).not.toContain('Answer 1')
    })
  })
})

describe('Accordion with multiple mode', () => {
  const createMultipleAccordion = () => {
    return {
      components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
      template: `
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>FAQ 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>FAQ 2</AccordionTrigger>
            <AccordionContent>Answer 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      `,
    }
  }

  it('starts with every item closed', async () => {
    const TestComponent = createMultipleAccordion()
    const wrapper = await mountSuspended(TestComponent)

    for (const button of wrapper.findAll('button')) {
      expect(button.attributes('aria-expanded')).toBe('false')
    }
  })

  it('allows multiple items to be open at once', async () => {
    const TestComponent = createMultipleAccordion()
    const wrapper = await mountSuspended(TestComponent)

    const [first, second] = wrapper.findAll('button')

    await first.trigger('click')
    await second.trigger('click')

    expect(first.attributes('aria-expanded')).toBe('true')
    expect(second.attributes('aria-expanded')).toBe('true')
    expect(wrapper.text()).toContain('Answer 1')
    expect(wrapper.text()).toContain('Answer 2')
  })
})

describe('Accordion styling', () => {
  it('accordion has w-full class', async () => {
    const wrapper = await mountSuspended(Accordion, {
      props: { type: 'single' },
      slots: { default: '<div>Content</div>' },
    })

    expect(wrapper.classes()).toContain('w-full')
  })

  it('accordion items have proper structure', async () => {
    const TestComponent = {
      components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
      template: `
        <Accordion type="single" collapsible>
          <AccordionItem value="test" class="custom-item">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      `,
    }
    const wrapper = await mountSuspended(TestComponent)

    expect(wrapper.html()).toContain('custom-item')
  })

  it('trigger has proper hover styling', async () => {
    const TestComponent = {
      components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
      template: `
        <Accordion type="single" collapsible>
          <AccordionItem value="test">
            <AccordionTrigger>Hover me</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      `,
    }
    const wrapper = await mountSuspended(TestComponent)

    const button = wrapper.find('button')
    expect(button.classes()).toContain('hover:underline')
    // The chevron flips via a data-state selector rather than a bound class,
    // so it only works while that exact selector is on the trigger.
    expect(button.classes()).toContain('[&[data-state=open]>svg]:rotate-180')
  })
})

describe('Accordion accessibility', () => {
  it('triggers are buttons', async () => {
    const TestComponent = {
      components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
      template: `
        <Accordion type="single" collapsible>
          <AccordionItem value="test">
            <AccordionTrigger>Accessible trigger</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      `,
    }
    const wrapper = await mountSuspended(TestComponent)

    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.element.tagName.toLowerCase()).toBe('button')
  })

  it('content has proper overflow handling', async () => {
    const TestComponent = {
      components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
      template: `
        <Accordion type="single" collapsible>
          <AccordionItem value="test">
            <AccordionTrigger>Trigger</AccordionTrigger>
            <AccordionContent>Long content that might overflow</AccordionContent>
          </AccordionItem>
        </Accordion>
      `,
    }
    const wrapper = await mountSuspended(TestComponent)

    expect(wrapper.html()).toContain('overflow-hidden')
  })

  it('accordion items are keyboard navigable', async () => {
    const TestComponent = {
      components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
      template: `
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>First</AccordionTrigger>
            <AccordionContent>First content</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Second</AccordionTrigger>
            <AccordionContent>Second content</AccordionContent>
          </AccordionItem>
        </Accordion>
      `,
    }
    const wrapper = await mountSuspended(TestComponent)

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(2)

    // Buttons should be focusable
    buttons.forEach((button) => {
      expect(button.element.tagName.toLowerCase()).toBe('button')
    })
  })
})

describe('Accordion default values', () => {
  it('can have a default open item', async () => {
    const TestComponent = {
      components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
      template: `
        <Accordion type="single" collapsible default-value="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Open by default</AccordionTrigger>
            <AccordionContent>This should be visible</AccordionContent>
          </AccordionItem>
        </Accordion>
      `,
    }
    const wrapper = await mountSuspended(TestComponent)

    expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
    expect(wrapper.text()).toContain('This should be visible')
  })

  it('collapsible accordion can close all items', async () => {
    const TestComponent = {
      components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
      template: `
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Collapsible item</AccordionTrigger>
            <AccordionContent>Can be closed</AccordionContent>
          </AccordionItem>
        </Accordion>
      `,
    }
    const wrapper = await mountSuspended(TestComponent)

    const button = wrapper.find('button')

    await button.trigger('click')
    expect(button.attributes('aria-expanded')).toBe('true')

    // Without `collapsible`, this second click would be a no-op.
    await button.trigger('click')

    expect(button.attributes('aria-expanded')).toBe('false')
    expect(wrapper.text()).not.toContain('Can be closed')
  })
})
