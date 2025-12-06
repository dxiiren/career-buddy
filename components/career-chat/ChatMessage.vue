<script setup lang="ts">
import { User, Bot } from 'lucide-vue-next'
import type { ChatMessage as ChatMessageType } from '@/composables/useCareerChat'

interface Props {
  message: ChatMessageType
}

defineProps<Props>()
</script>

<template>
  <div
    :class="[
      'flex gap-3',
      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
    ]"
  >
    <div
      :class="[
        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
        message.role === 'user' ? 'bg-primary' : 'bg-muted'
      ]"
    >
      <User v-if="message.role === 'user'" class="h-4 w-4 text-primary-foreground" />
      <Bot v-else class="h-4 w-4 text-muted-foreground" />
    </div>
    <div
      :class="[
        'flex-1 max-w-[80%] p-4 rounded-2xl',
        message.role === 'user'
          ? 'bg-primary text-primary-foreground rounded-tr-sm'
          : 'bg-muted rounded-tl-sm'
      ]"
    >
      <div class="text-sm whitespace-pre-wrap" v-html="formatMessage(message.content)" />
    </div>
  </div>
</template>

<script lang="ts">
function formatMessage(content: string): string {
  // Convert markdown-like formatting to HTML
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
}
</script>
