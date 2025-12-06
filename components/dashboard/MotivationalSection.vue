<script setup lang="ts">
import { Sparkles, Lightbulb } from 'lucide-vue-next'

interface Props {
  quote: string
  tip: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-6 h-full">
    <!-- Skeleton Loading -->
    <div v-if="loading" class="space-y-6">
      <div>
        <UiSkeleton class="h-5 w-32 mb-3" />
        <UiSkeleton class="h-6 w-full" />
      </div>
      <div>
        <UiSkeleton class="h-5 w-24 mb-3" />
        <UiSkeleton class="h-4 w-full" />
        <UiSkeleton class="h-4 w-3/4 mt-1" />
      </div>
    </div>

    <!-- Actual Content -->
    <div v-else class="space-y-6">
      <!-- Quote -->
      <div>
        <div class="flex items-center gap-2 mb-3">
          <Sparkles class="h-4 w-4 text-primary" />
          <span class="text-sm font-medium text-primary">Motivation</span>
        </div>
        <p class="text-lg font-heading italic text-foreground/90">
          "{{ quote }}"
        </p>
      </div>

      <!-- Tip -->
      <div>
        <div class="flex items-center gap-2 mb-3">
          <Lightbulb class="h-4 w-4 text-yellow-500" />
          <span class="text-sm font-medium text-yellow-500">Tip of the Day</span>
        </div>
        <p class="text-sm text-muted-foreground">
          {{ tip }}
        </p>
      </div>
    </div>
  </div>
</template>
