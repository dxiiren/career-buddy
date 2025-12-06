<script setup lang="ts">
import type { ToneType } from '@/composables/useNetworking'

interface Props {
  currentTone: ToneType
  loading: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  change: [tone: ToneType]
}>()

const tones: { id: ToneType; label: string; description: string }[] = [
  { id: 'formal', label: 'Formal', description: 'Professional and respectful' },
  { id: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
  { id: 'confident', label: 'Confident', description: 'Direct and assertive' },
]
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-4">
    <Transition
      mode="out-in"
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <!-- Skeleton Loading -->
      <div v-if="loading" key="skeleton" class="space-y-3">
        <Skeleton class="h-5 w-24 mb-2" />
        <div class="flex gap-2">
          <Skeleton v-for="i in 3" :key="i" class="h-10 flex-1 rounded-lg" />
        </div>
      </div>

      <!-- Actual Content -->
      <div v-else key="content">
        <p class="text-sm font-medium mb-3">Message Tone</p>
        <div class="flex gap-2">
          <button
            v-for="tone in tones"
            :key="tone.id"
            @click="emit('change', tone.id)"
            class="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200"
            :class="currentTone === tone.id
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
            "
            :title="tone.description"
          >
            {{ tone.label }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
