<script setup lang="ts">
import type { PrepStep } from '@/composables/useInterview'

interface Props {
  steps: PrepStep[]
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
        <div class="space-y-4">
          <Skeleton v-for="i in 3" :key="i" class="h-24 w-full skeleton-shimmer" />
        </div>
      </div>

      <div v-else key="content">
        <h2 class="text-lg font-heading font-semibold mb-4">3-Step Interview Preparation</h2>
        <div class="space-y-4">
          <div
            v-for="(step, index) in steps"
            :key="step.title"
            class="flex gap-4"
          >
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span class="text-lg font-bold text-primary">{{ index + 1 }}</span>
            </div>
            <div class="flex-1">
              <h3 class="font-medium mb-1">{{ step.title }}</h3>
              <p class="text-sm text-muted-foreground">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
