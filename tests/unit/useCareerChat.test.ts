import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('useCareerChat', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
    vi.resetModules()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('chat state', () => {
    it('should have empty messages initially', async () => {
      const { useCareerChat } = await import('../../composables/useCareerChat')
      const { messages } = useCareerChat()

      expect(messages.value).toEqual([])
    })

    it('should have isTyping state', async () => {
      const { useCareerChat } = await import('../../composables/useCareerChat')
      const { isTyping } = useCareerChat()

      expect(isTyping.value).toBe(false)
    })

    it('should have suggested prompts', async () => {
      const { useCareerChat } = await import('../../composables/useCareerChat')
      const { suggestedPrompts } = useCareerChat()

      expect(suggestedPrompts.value.length).toBeGreaterThan(0)
    })
  })

  describe('sending messages', () => {
    it('should add user message', async () => {
      const { useCareerChat } = await import('../../composables/useCareerChat')
      const { messages, sendMessage } = useCareerChat()

      sendMessage('Hello')

      expect(messages.value.length).toBe(1)
      expect(messages.value[0].role).toBe('user')
      expect(messages.value[0].content).toBe('Hello')
    })

    it('should set isTyping when sending message', async () => {
      const { useCareerChat } = await import('../../composables/useCareerChat')
      const { isTyping, sendMessage } = useCareerChat()

      sendMessage('Hello')

      expect(isTyping.value).toBe(true)
    })

    it('should add assistant response after delay', async () => {
      const { useCareerChat } = await import('../../composables/useCareerChat')
      const { messages, sendMessage } = useCareerChat()

      sendMessage('Hello')

      await vi.advanceTimersByTimeAsync(1500)

      expect(messages.value.length).toBe(2)
      expect(messages.value[1].role).toBe('assistant')
    })

    it('should clear isTyping after response', async () => {
      const { useCareerChat } = await import('../../composables/useCareerChat')
      const { isTyping, sendMessage } = useCareerChat()

      sendMessage('Hello')
      await vi.advanceTimersByTimeAsync(1500)

      expect(isTyping.value).toBe(false)
    })
  })

  describe('clear messages', () => {
    it('should clear all messages', async () => {
      const { useCareerChat } = await import('../../composables/useCareerChat')
      const { messages, sendMessage, clearMessages } = useCareerChat()

      sendMessage('Hello')
      await vi.advanceTimersByTimeAsync(1500)

      expect(messages.value.length).toBe(2)

      clearMessages()

      expect(messages.value.length).toBe(0)
    })
  })

  describe('chat topics', () => {
    it('should have career topics', async () => {
      const { useCareerChat } = await import('../../composables/useCareerChat')
      const { careerTopics } = useCareerChat()

      expect(careerTopics.value.length).toBeGreaterThan(0)
      careerTopics.value.forEach(topic => {
        expect(topic).toHaveProperty('id')
        expect(topic).toHaveProperty('title')
        expect(topic).toHaveProperty('icon')
      })
    })
  })
})
