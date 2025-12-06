<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { Trash2 } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
})

const { isAuthenticated, initAuth } = useAuth()
const {
  messages,
  isTyping,
  suggestedPrompts,
  sendMessage,
  clearMessages,
} = useCareerChat()

const isLoading = ref(true)
const messagesContainer = ref<HTMLElement | null>(null)
const animatedCards = ref<Set<number>>(new Set())

const showCard = (index: number) => {
  return !isLoading.value && animatedCards.value.has(index)
}

async function scrollToBottom() {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

function handleSendMessage(message: string) {
  sendMessage(message)
  scrollToBottom()
}

function handleSelectPrompt(prompt: string) {
  sendMessage(prompt)
  scrollToBottom()
}

onMounted(async () => {
  initAuth()
  if (!isAuthenticated.value) {
    navigateTo('/login')
    return
  }

  await new Promise(resolve => setTimeout(resolve, 500))
  isLoading.value = false

  for (let i = 0; i < 3; i++) {
    setTimeout(() => animatedCards.value.add(i), i * 100)
  }
})

// Watch for new messages and scroll
watch(messages, () => {
  scrollToBottom()
}, { deep: true })
</script>

<template>
  <div class="flex flex-col h-[calc(100vh-8rem)]">
    <div
      class="transition-all duration-500 mb-4"
      :class="showCard(0) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <CareerChatChatHero :loading="isLoading" />
    </div>

    <div
      class="flex-1 transition-all duration-500 flex flex-col min-h-0"
      :class="showCard(1) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <div class="rounded-2xl bg-card border border-border flex-1 flex flex-col min-h-0">
        <div class="p-4 border-b border-border flex items-center justify-between">
          <h2 class="font-heading font-semibold">Chat</h2>
          <Button
            v-if="messages.length > 0"
            variant="ghost"
            size="sm"
            @click="clearMessages"
            class="gap-2"
          >
            <Trash2 class="h-4 w-4" />
            Clear
          </Button>
        </div>

        <div
          ref="messagesContainer"
          class="flex-1 overflow-y-auto p-4 space-y-4"
        >
          <template v-if="messages.length === 0 && !isTyping">
            <div class="flex flex-col items-center justify-center h-full text-center">
              <p class="text-muted-foreground mb-4">
                Start a conversation by asking a question or selecting a prompt below.
              </p>
            </div>
          </template>

          <CareerChatChatMessage
            v-for="message in messages"
            :key="message.id"
            :message="message"
          />

          <CareerChatTypingIndicator v-if="isTyping" />
        </div>
      </div>
    </div>

    <div
      class="transition-all duration-500 mt-4 space-y-4"
      :class="showCard(2) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <CareerChatSuggestedPrompts
        v-if="messages.length === 0"
        :prompts="suggestedPrompts.slice(0, 4)"
        @select="handleSelectPrompt"
      />

      <CareerChatChatInput
        :disabled="isTyping"
        @send="handleSendMessage"
      />
    </div>
  </div>
</template>
