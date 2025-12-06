import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

// Create stub components
const Skeleton = defineComponent({
  props: ['class'],
  template: '<div class="skeleton" :class="$props.class"><slot /></div>',
})

const Button = defineComponent({
  props: ['disabled', 'variant', 'size', 'type'],
  emits: ['click'],
  template: '<button :disabled="disabled" @click="$emit(\'click\')"><slot /></button>',
})

const Input = defineComponent({
  props: ['id', 'name', 'modelValue', 'type', 'placeholder', 'class'],
  emits: ['update:modelValue'],
  template: '<input :id="id" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" :placeholder="placeholder" />',
})

const Label = defineComponent({
  props: ['for', 'class'],
  template: '<label :for="$props.for"><slot /></label>',
})

const Textarea = defineComponent({
  props: ['id', 'name', 'modelValue', 'placeholder', 'rows', 'class'],
  emits: ['update:modelValue'],
  template: '<textarea :id="id" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" :placeholder="placeholder" :rows="rows"></textarea>',
})

const Select = defineComponent({
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: '<select :value="modelValue" @change="$emit(\'update:modelValue\', $event.target.value)"><slot /></select>',
})

const SelectTrigger = defineComponent({
  props: ['class'],
  template: '<div class="select-trigger"><slot /></div>',
})

const SelectValue = defineComponent({
  props: ['placeholder'],
  template: '<span><slot>{{ placeholder }}</slot></span>',
})

const SelectContent = defineComponent({
  template: '<div class="select-content"><slot /></div>',
})

const SelectItem = defineComponent({
  props: ['value'],
  template: '<option :value="value"><slot /></option>',
})

const Accordion = defineComponent({
  props: ['type', 'collapsible'],
  template: '<div class="accordion"><slot /></div>',
})

const AccordionItem = defineComponent({
  props: ['value'],
  template: '<div class="accordion-item" :data-value="value"><slot /></div>',
})

const AccordionTrigger = defineComponent({
  template: '<button class="accordion-trigger"><slot /></button>',
})

const AccordionContent = defineComponent({
  template: '<div class="accordion-content"><slot /></div>',
})

const globalStubs = {
  Skeleton,
  Button,
  Input,
  Label,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  NuxtLink: {
    template: '<a :href="to"><slot /></a>',
    props: ['to'],
  },
}

describe('HelpHero', () => {
  it('renders title and subtitle', async () => {
    const HelpHero = (await import('../../components/help/HelpHero.vue')).default

    const wrapper = mount(HelpHero, {
      props: { loading: false },
      global: { stubs: globalStubs },
    })

    expect(wrapper.text()).toContain('Help & Support')
    expect(wrapper.text()).toContain('Find answers')
  })

  it('shows skeleton when loading', async () => {
    const HelpHero = (await import('../../components/help/HelpHero.vue')).default

    const wrapper = mount(HelpHero, {
      props: { loading: true },
      global: { stubs: globalStubs },
    })

    expect(wrapper.findAll('.skeleton').length).toBeGreaterThan(0)
  })
})

describe('FAQSearchBar', () => {
  it('renders search input', async () => {
    const FAQSearchBar = (await import('../../components/help/FAQSearchBar.vue')).default

    const wrapper = mount(FAQSearchBar, {
      props: { loading: false, modelValue: '' },
      global: { stubs: globalStubs },
    })

    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('emits update on input', async () => {
    const FAQSearchBar = (await import('../../components/help/FAQSearchBar.vue')).default

    const wrapper = mount(FAQSearchBar, {
      props: { loading: false, modelValue: '' },
      global: { stubs: globalStubs },
    })

    await wrapper.find('input').setValue('test query')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['test query'])
  })

  it('shows clear button when has value', async () => {
    const FAQSearchBar = (await import('../../components/help/FAQSearchBar.vue')).default

    const wrapper = mount(FAQSearchBar, {
      props: { loading: false, modelValue: 'some text' },
      global: { stubs: globalStubs },
    })

    expect(wrapper.find('[data-testid="clear-button"]').exists()).toBe(true)
  })
})

describe('FAQCategoryFilter', () => {
  const mockCategories = [
    { id: 'getting-started', name: 'Getting Started', icon: 'Rocket', description: '' },
    { id: 'resume', name: 'Resume', icon: 'FileText', description: '' },
  ]

  it('renders all category buttons', async () => {
    const FAQCategoryFilter = (await import('../../components/help/FAQCategoryFilter.vue')).default

    const wrapper = mount(FAQCategoryFilter, {
      props: { categories: mockCategories, selectedCategory: null, loading: false },
      global: { stubs: globalStubs },
    })

    // Should have "All" button plus category buttons
    expect(wrapper.findAll('button').length).toBe(3)
  })

  it('highlights selected category', async () => {
    const FAQCategoryFilter = (await import('../../components/help/FAQCategoryFilter.vue')).default

    const wrapper = mount(FAQCategoryFilter, {
      props: { categories: mockCategories, selectedCategory: 'resume', loading: false },
      global: { stubs: globalStubs },
    })

    const resumeButton = wrapper.findAll('button').find(b => b.text().includes('Resume'))
    expect(resumeButton?.classes()).toContain('bg-primary')
  })

  it('emits select on click', async () => {
    const FAQCategoryFilter = (await import('../../components/help/FAQCategoryFilter.vue')).default

    const wrapper = mount(FAQCategoryFilter, {
      props: { categories: mockCategories, selectedCategory: null, loading: false },
      global: { stubs: globalStubs },
    })

    const resumeButton = wrapper.findAll('button').find(b => b.text().includes('Resume'))
    await resumeButton?.trigger('click')

    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')![0]).toEqual(['resume'])
  })
})

describe('FAQAccordion', () => {
  const mockItems = [
    { id: '1', question: 'How to start?', answer: 'Just begin!', category: 'getting-started' as const },
    { id: '2', question: 'What is this?', answer: 'A help section.', category: 'getting-started' as const },
  ]

  it('renders FAQ items', async () => {
    const FAQAccordion = (await import('../../components/help/FAQAccordion.vue')).default

    const wrapper = mount(FAQAccordion, {
      props: { items: mockItems, loading: false },
      global: { stubs: globalStubs },
    })

    expect(wrapper.text()).toContain('How to start?')
    expect(wrapper.text()).toContain('What is this?')
  })

  it('shows empty state when no items', async () => {
    const FAQAccordion = (await import('../../components/help/FAQAccordion.vue')).default

    const wrapper = mount(FAQAccordion, {
      props: { items: [], loading: false },
      global: { stubs: globalStubs },
    })

    expect(wrapper.text()).toContain('No questions found')
  })

  it('shows skeleton when loading', async () => {
    const FAQAccordion = (await import('../../components/help/FAQAccordion.vue')).default

    const wrapper = mount(FAQAccordion, {
      props: { items: [], loading: true },
      global: { stubs: globalStubs },
    })

    expect(wrapper.findAll('.skeleton').length).toBeGreaterThan(0)
  })
})

describe('HelpResources', () => {
  const mockResources = [
    { title: 'User Guide', description: 'Docs', icon: 'BookOpen', href: '/docs' },
    { title: 'Videos', description: 'Tutorials', icon: 'PlayCircle', href: '/videos' },
  ]

  it('renders resource cards', async () => {
    const HelpResources = (await import('../../components/help/HelpResources.vue')).default

    const wrapper = mount(HelpResources, {
      props: { resources: mockResources, loading: false },
      global: { stubs: globalStubs },
    })

    expect(wrapper.text()).toContain('User Guide')
    expect(wrapper.text()).toContain('Videos')
  })

  it('shows skeleton when loading', async () => {
    const HelpResources = (await import('../../components/help/HelpResources.vue')).default

    const wrapper = mount(HelpResources, {
      props: { resources: [], loading: true },
      global: { stubs: globalStubs },
    })

    expect(wrapper.findAll('.skeleton').length).toBeGreaterThan(0)
  })
})

describe('ContactForm', () => {
  it('renders all form fields', async () => {
    const ContactForm = (await import('../../components/help/ContactForm.vue')).default

    const wrapper = mount(ContactForm, {
      props: { loading: false, submitting: false, errors: {} },
      global: { stubs: globalStubs },
    })

    expect(wrapper.find('input[id="name"]').exists()).toBe(true)
    expect(wrapper.find('input[id="email"]').exists()).toBe(true)
    expect(wrapper.find('textarea[id="message"]').exists()).toBe(true)
  })

  it('shows validation errors', async () => {
    const ContactForm = (await import('../../components/help/ContactForm.vue')).default

    const wrapper = mount(ContactForm, {
      props: {
        loading: false,
        submitting: false,
        errors: { name: 'Name is required', email: 'Invalid email' },
      },
      global: { stubs: globalStubs },
    })

    expect(wrapper.text()).toContain('Name is required')
    expect(wrapper.text()).toContain('Invalid email')
  })

  it('emits submit with form data', async () => {
    const ContactForm = (await import('../../components/help/ContactForm.vue')).default

    const wrapper = mount(ContactForm, {
      props: { loading: false, submitting: false, errors: {} },
      global: { stubs: globalStubs },
    })

    await wrapper.find('input[id="name"]').setValue('John Doe')
    await wrapper.find('input[id="email"]').setValue('john@example.com')
    await wrapper.find('textarea[id="message"]').setValue('Test message')

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')).toBeTruthy()
  })

  it('disables button when submitting', async () => {
    const ContactForm = (await import('../../components/help/ContactForm.vue')).default

    const wrapper = mount(ContactForm, {
      props: { loading: false, submitting: true, errors: {} },
      global: { stubs: globalStubs },
    })

    // Find the submit button (stub renders as button)
    const submitButton = wrapper.findAll('button').find(b => b.text().includes('Sending'))
    expect(submitButton?.attributes('disabled')).toBeDefined()
  })
})
