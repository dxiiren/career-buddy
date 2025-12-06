<script setup lang="ts">
import { Bot } from 'lucide-vue-next'

interface Props {
  tips: string[]
  loading: boolean
}

defineProps<Props>()
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
        <Skeleton class="h-6 w-52 skeleton-shimmer" />
        <div class="space-y-2">
          <Skeleton v-for="i in 8" :key="i" class="h-8 w-full skeleton-shimmer" />
        </div>
      </div>

      <div v-else key="content">
        <div class="flex items-center gap-2 mb-4">
          <Bot class="h-5 w-5 text-primary" />
          <h2 class="text-lg font-heading font-semibold">ATS-Friendly Resume Tips</h2>
        </div>
        <p class="text-sm text-muted-foreground mb-4">
          Applicant Tracking Systems (ATS) scan resumes before humans see them. Follow these tips to pass the filter:
        </p>
        <ul class="space-y-2">
          <li
            v-for="tip in tips"
            :key="tip"
            class="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <span class="text-primary mt-0.5">✓</span>
            {{ tip }}
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
