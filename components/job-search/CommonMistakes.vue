<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next'
import type { CommonMistake } from '@/composables/useJobSearch'

interface Props {
  mistakes: CommonMistake[]
  loading: boolean
}

defineProps<Props>()
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
        <div class="space-y-3">
          <Skeleton v-for="i in 5" :key="i" class="h-24 w-full skeleton-shimmer" />
        </div>
      </div>

      <div v-else key="content">
        <div class="flex items-center gap-2 mb-4">
          <AlertTriangle class="h-5 w-5 text-destructive" />
          <h2 class="text-lg font-heading font-semibold">Common Mistakes to Avoid</h2>
        </div>
        <div class="space-y-3">
          <div
            v-for="item in mistakes"
            :key="item.mistake"
            class="p-4 rounded-xl border border-border"
          >
            <p class="text-sm font-medium text-destructive mb-2">{{ item.mistake }}</p>
            <p class="text-sm text-muted-foreground">
              <span class="text-primary font-medium">Solution:</span> {{ item.solution }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
