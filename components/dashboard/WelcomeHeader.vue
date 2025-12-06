<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  userName: string
  overallProgress: number
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

// Calculate stroke-dasharray for progress ring
const circumference = 2 * Math.PI * 45 // radius = 45
const strokeDashoffset = computed(() => {
  return circumference - (props.overallProgress / 100) * circumference
})
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-6 lg:p-8">
    <!-- Skeleton Loading -->
    <div v-if="loading" class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div class="flex-1">
        <UiSkeleton class="h-9 w-64 mb-3" />
        <UiSkeleton class="h-5 w-48" />
      </div>
      <div class="flex items-center gap-4">
        <UiSkeleton class="h-24 w-24 rounded-full" />
        <div>
          <UiSkeleton class="h-4 w-16 mb-1" />
          <UiSkeleton class="h-4 w-12" />
        </div>
      </div>
    </div>

    <!-- Actual Content -->
    <div v-else class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <!-- Text Content -->
      <div>
        <h1 class="text-2xl lg:text-3xl font-heading font-bold mb-2">
          Welcome back, {{ userName }}!
        </h1>
        <p class="text-muted-foreground text-lg">
          Let's continue your career prep.
        </p>
      </div>

      <!-- Progress Ring -->
      <div class="flex items-center gap-4">
        <div class="relative w-24 h-24">
          <svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <!-- Background circle -->
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              stroke-width="8"
              class="text-muted/30"
            />
            <!-- Progress circle -->
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              stroke-width="8"
              stroke-linecap="round"
              class="text-primary transition-all duration-1000"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="strokeDashoffset"
            />
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-xl font-bold">{{ overallProgress }}%</span>
          </div>
        </div>
        <div class="text-sm text-muted-foreground">
          Overall<br />Progress
        </div>
      </div>
    </div>
  </div>
</template>
