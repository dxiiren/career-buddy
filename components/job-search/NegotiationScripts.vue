<script setup lang="ts">
import { MessageSquare, Copy, Check } from 'lucide-vue-next'
import { ref } from 'vue'
import type { NegotiationScript } from '@/composables/useJobSearch'

interface Props {
  scripts: NegotiationScript[]
  loading: boolean
}

defineProps<Props>()

const copiedIndex = ref<number | null>(null)

async function copyScript(index: number, script: string) {
  await navigator.clipboard.writeText(script)
  copiedIndex.value = index
  setTimeout(() => {
    copiedIndex.value = null
  }, 2000)
}
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-6">
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
        <Skeleton class="h-6 w-44 skeleton-shimmer" />
        <div class="space-y-4">
          <div v-for="i in 3" :key="i" class="p-4 rounded-xl border border-border space-y-3">
            <Skeleton class="h-5 w-40 skeleton-shimmer" />
            <Skeleton class="h-24 w-full skeleton-shimmer" />
          </div>
        </div>
      </div>

      <div v-else key="content">
        <div class="flex items-center gap-2 mb-4">
          <MessageSquare class="h-5 w-5 text-primary" />
          <h2 class="text-lg font-heading font-semibold">Negotiation Scripts</h2>
        </div>
        <div class="space-y-4">
          <div
            v-for="(script, index) in scripts"
            :key="script.situation"
            class="p-4 rounded-xl border border-border"
          >
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-medium text-sm">{{ script.situation }}</h3>
              <Button
                size="sm"
                :variant="copiedIndex === index ? 'default' : 'outline'"
                @click="copyScript(index, script.whatToSay)"
                class="gap-1.5"
              >
                <Check v-if="copiedIndex === index" class="h-3.5 w-3.5" />
                <Copy v-else class="h-3.5 w-3.5" />
                {{ copiedIndex === index ? 'Copied!' : 'Copy' }}
              </Button>
            </div>
            <div class="bg-muted/50 rounded-lg p-4">
              <p class="text-sm text-muted-foreground italic">"{{ script.whatToSay }}"</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
