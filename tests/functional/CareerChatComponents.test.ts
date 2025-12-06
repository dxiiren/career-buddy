import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

describe('Career Chat Components', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('ChatHero', () => {
    it('renders hero section', async () => {
      const ChatHero = await import('../../components/career-chat/ChatHero.vue')
      const wrapper = await mountSuspended(ChatHero.default, {
        props: { loading: false },
      })

      expect(wrapper.text()).toContain('Career Buddy')
    })

    it('shows skeleton when loading', async () => {
      const ChatHero = await import('../../components/career-chat/ChatHero.vue')
      const wrapper = await mountSuspended(ChatHero.default, {
        props: { loading: true },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })
  })

  describe('ChatMessage', () => {
    const mockUserMessage = {
      id: '1',
      role: 'user' as const,
      content: 'Hello',
      timestamp: new Date(),
    }

    const mockAssistantMessage = {
      id: '2',
      role: 'assistant' as const,
      content: 'Hi there!',
      timestamp: new Date(),
    }

    it('renders user message', async () => {
      const ChatMessage = await import('../../components/career-chat/ChatMessage.vue')
      const wrapper = await mountSuspended(ChatMessage.default, {
        props: { message: mockUserMessage },
      })

      expect(wrapper.text()).toContain('Hello')
    })

    it('renders assistant message', async () => {
      const ChatMessage = await import('../../components/career-chat/ChatMessage.vue')
      const wrapper = await mountSuspended(ChatMessage.default, {
        props: { message: mockAssistantMessage },
      })

      expect(wrapper.text()).toContain('Hi there!')
    })
  })

  describe('ChatInput', () => {
    it('renders input field', async () => {
      const ChatInput = await import('../../components/career-chat/ChatInput.vue')
      const wrapper = await mountSuspended(ChatInput.default, {
        props: { disabled: false },
      })

      expect(wrapper.find('input').exists() || wrapper.find('textarea').exists()).toBe(true)
    })

    it('disables input when disabled prop is true', async () => {
      const ChatInput = await import('../../components/career-chat/ChatInput.vue')
      const wrapper = await mountSuspended(ChatInput.default, {
        props: { disabled: true },
      })

      const input = wrapper.find('input').exists() ? wrapper.find('input') : wrapper.find('textarea')
      expect(input.attributes('disabled')).toBeDefined()
    })
  })

  describe('SuggestedPrompts', () => {
    const mockPrompts = ['How to write a resume?', 'Interview tips?']

    it('renders suggested prompts', async () => {
      const SuggestedPrompts = await import('../../components/career-chat/SuggestedPrompts.vue')
      const wrapper = await mountSuspended(SuggestedPrompts.default, {
        props: { prompts: mockPrompts },
      })

      expect(wrapper.text()).toContain('How to write a resume?')
    })

    it('emits select event on click', async () => {
      const SuggestedPrompts = await import('../../components/career-chat/SuggestedPrompts.vue')
      const wrapper = await mountSuspended(SuggestedPrompts.default, {
        props: { prompts: mockPrompts },
      })

      await wrapper.find('button').trigger('click')

      expect(wrapper.emitted('select')).toBeTruthy()
    })
  })

  describe('TypingIndicator', () => {
    it('renders typing indicator', async () => {
      const TypingIndicator = await import('../../components/career-chat/TypingIndicator.vue')
      const wrapper = await mountSuspended(TypingIndicator.default)

      expect(wrapper.find('.animate-bounce').exists() || wrapper.text().includes('typing')).toBe(true)
    })
  })
})
