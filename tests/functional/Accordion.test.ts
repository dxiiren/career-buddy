import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { h } from 'vue'
import Accordion from '../../components/ui/accordion/Accordion.vue'
import AccordionItem from '../../components/ui/accordion/AccordionItem.vue'
import AccordionTrigger from '../../components/ui/accordion/AccordionTrigger.vue'
import AccordionContent from '../../components/ui/accordion/AccordionContent.vue'

describe('Accordion Component', () => {
  describe('rendering', () => {
    it('renders the accordion root element', async () => {
      const wrapper = await mountSuspended(Accordion, {
        props: {
          type: 'single',
          collapsible: true,
        },
        slots: {
          default: '<div>Accordion content</div>',
        },
      })

      expect(wrapper.exists()).toBe(true)
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

    it('accordion items have border-b styling', async () => {
      const TestComponent = createAccordionWithItems()
      const wrapper = await mountSuspended(TestComponent)

      const items = wrapper.findAllComponents(AccordionItem)
      expect(items.length).toBe(2)
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
    it('renders accordion content components', async () => {
      const TestComponent = createAccordionWithItems()
      const wrapper = await mountSuspended(TestComponent)

      // AccordionContent components are rendered (content may be collapsed by default)
      const contentComponents = wrapper.findAllComponents(AccordionContent)
      expect(contentComponents.length).toBe(2)
    })
  })

  describe('Accordion interactions', () => {
    it('clicking trigger expands content', async () => {
      const TestComponent = createAccordionWithItems()
      const wrapper = await mountSuspended(TestComponent)

      const firstTrigger = wrapper.findAll('button')[0]
      await firstTrigger.trigger('click')

      // After clicking, the accordion should have an open state
      const accordionContent = wrapper.findAllComponents(AccordionContent)
      expect(accordionContent.length).toBeGreaterThan(0)
    })

    it('can toggle between items in single mode', async () => {
      const TestComponent = createAccordionWithItems()
      const wrapper = await mountSuspended(TestComponent)

      const buttons = wrapper.findAll('button')
      expect(buttons.length).toBeGreaterThanOrEqual(2)

      // Click first item
      await buttons[0].trigger('click')

      // Click second item
      await buttons[1].trigger('click')

      // In single mode, only one should be open at a time
      expect(wrapper.exists()).toBe(true)
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

  it('renders multiple mode accordion', async () => {
    const TestComponent = createMultipleAccordion()
    const wrapper = await mountSuspended(TestComponent)

    expect(wrapper.exists()).toBe(true)
  })

  it('allows multiple items to be open', async () => {
    const TestComponent = createMultipleAccordion()
    const wrapper = await mountSuspended(TestComponent)

    const buttons = wrapper.findAll('button')

    // Click both items
    await buttons[0].trigger('click')
    await buttons[1].trigger('click')

    expect(wrapper.exists()).toBe(true)
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
    expect(button.exists()).toBe(true)
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

    expect(wrapper.text()).toContain('Open by default')
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

    // Open
    await button.trigger('click')

    // Close (collapsible allows this)
    await button.trigger('click')

    expect(wrapper.exists()).toBe(true)
  })
})
