<script setup lang="ts">
import { FileText, Copy, Check } from 'lucide-vue-next'
import { ref } from 'vue'
import type { CoverLetterExample as CoverLetterExampleType } from '@/composables/useResume'

interface Props {
  example: CoverLetterExampleType | null
  loading: boolean
}

defineProps<Props>()

const copied = ref(false)

async function copyContent(content: string) {
  await navigator.clipboard.writeText(content)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-4 sm:p-5 lg:p-6">
    <Transition
      mode="out-in"
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="loading" key="skeleton" class="space-y-4">
        <div class="flex justify-between">
          <Skeleton class="h-6 w-40 skeleton-shimmer" />
          <Skeleton class="h-8 w-20 skeleton-shimmer" />
        </div>
        <Skeleton class="h-64 w-full skeleton-shimmer" />
      </div>

      <div v-else-if="example" key="content">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <FileText class="h-5 w-5 text-primary" />
            <h3 class="font-heading font-semibold">{{ example.title }}</h3>
          </div>
          <Button
            size="sm"
            :variant="copied ? 'default' : 'outline'"
            @click="copyContent(example.content)"
            class="gap-1.5"
          >
            <Check v-if="copied" class="h-3.5 w-3.5" />
            <Copy v-else class="h-3.5 w-3.5" />
            {{ copied ? 'Copied!' : 'Copy' }}
          </Button>
        </div>
        <div class="bg-muted/50 rounded-xl p-6 max-h-96 overflow-y-auto">
          <pre class="text-sm whitespace-pre-wrap font-sans text-muted-foreground">{{ example.content }}</pre>
        </div>
      </div>
    </Transition>
  </div>
</template>
