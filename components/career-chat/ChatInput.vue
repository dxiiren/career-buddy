<script setup lang="ts">
import { Send } from 'lucide-vue-next'
import { ref } from 'vue'

interface Props {
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits<{
  send: [message: string]
}>()

const inputValue = ref('')

function handleSubmit() {
  if (inputValue.value.trim() && !props.disabled) {
    emit('send', inputValue.value.trim())
    inputValue.value = ''
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSubmit()
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex gap-3">
    <input
      v-model="inputValue"
      type="text"
      :disabled="props.disabled"
      placeholder="Ask me anything about your career..."
      class="flex-1 px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
      @keydown="handleKeydown"
    />
    <Button
      type="submit"
      :disabled="props.disabled || !inputValue.trim()"
      class="px-4"
    >
      <Send class="h-5 w-5" />
    </Button>
  </form>
</template>
