<script setup lang="ts">
import { Copy, Check } from 'lucide-vue-next'
import type { MessageTemplate, ToneType } from '@/composables/useNetworking'

interface Props {
  template: MessageTemplate
  currentTone: ToneType
  copiedId: string | null
  loading: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  copy: [templateId: string, content: string]
}>()

function getContent() {
  return props.template.tones[props.currentTone]
}

function handleCopy() {
  emit('copy', props.template.id, getContent())
}
</script>

<template>
  <div class="rounded-xl border border-border p-4 hover:border-primary/50 hover:bg-muted/30 transition-all duration-300">
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
        <div class="flex items-center justify-between">
          <Skeleton class="h-5 w-40" />
          <Skeleton class="h-8 w-20 rounded-lg" />
        </div>
        <Skeleton class="h-32 w-full rounded-lg" />
        <div class="flex gap-2">
          <Skeleton class="h-6 w-16 rounded-full" />
          <Skeleton class="h-6 w-20 rounded-full" />
        </div>
      </div>

      <!-- Actual Content -->
      <div v-else key="content">
        <!-- Header -->
        <div class="flex items-center justify-between mb-3">
          <h4 class="font-medium">{{ template.title }}</h4>
          <Button
            size="sm"
            :variant="copiedId === template.id ? 'default' : 'outline'"
            @click="handleCopy"
            class="gap-1.5"
          >
            <Check v-if="copiedId === template.id" class="h-3.5 w-3.5" />
            <Copy v-else class="h-3.5 w-3.5" />
            <span>{{ copiedId === template.id ? 'Copied!' : 'Copy' }}</span>
          </Button>
        </div>

        <!-- Template Content -->
        <div class="bg-muted/50 rounded-lg p-4 mb-3 max-h-48 overflow-y-auto">
          <pre class="text-sm whitespace-pre-wrap font-sans text-muted-foreground">{{ getContent() }}</pre>
        </div>

        <!-- Placeholders -->
        <div class="flex flex-wrap gap-2">
          <span
            v-for="placeholder in template.placeholders"
            :key="placeholder"
            class="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
          >
            {{ placeholder }}
          </span>
        </div>
      </div>
    </Transition>
  </div>
</template>
