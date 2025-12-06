<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next'

interface Props {
  prompts: string[]
}

defineProps<Props>()

const emit = defineEmits<{
  select: [prompt: string]
}>()
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center gap-2 text-sm text-muted-foreground">
      <Sparkles class="h-4 w-4" />
      <span>Try asking:</span>
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="prompt in prompts"
        :key="prompt"
        class="px-3 py-2 text-sm rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors text-left"
        @click="emit('select', prompt)"
      >
        {{ prompt }}
      </button>
    </div>
  </div>
</template>
