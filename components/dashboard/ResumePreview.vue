<script setup lang="ts">
import { FileText, ExternalLink } from 'lucide-vue-next'
import type { ResumeInfo } from '@/composables/useDashboard'

interface Props {
  resume: ResumeInfo
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-4 sm:p-5 lg:p-6">
    <div class="flex items-center justify-between mb-3 sm:mb-4">
      <!-- Title -->
      <Skeleton v-if="loading" class="h-5 sm:h-6 w-32 sm:w-36" />
      <h2 v-else class="text-base sm:text-lg font-heading font-semibold">Resume Preview</h2>
      <button
        v-if="!loading"
        class="text-xs sm:text-sm text-primary hover:underline flex items-center gap-1 py-1"
      >
        Edit <ExternalLink class="h-3 w-3" />
      </button>
    </div>

    <!-- Skeleton Loading -->
    <div v-if="loading" class="space-y-2 sm:space-y-3">
      <div class="flex items-center gap-2 sm:gap-3">
        <Skeleton class="h-10 w-10 sm:h-12 sm:w-12 rounded-lg" />
        <div class="flex-1">
          <Skeleton class="h-4 sm:h-5 w-28 sm:w-32 mb-1" />
          <Skeleton class="h-3 sm:h-4 w-20 sm:w-24" />
        </div>
      </div>
      <Skeleton class="h-3 sm:h-4 w-36 sm:w-40" />
      <Skeleton class="h-2.5 sm:h-3 w-28 sm:w-32" />
    </div>

    <!-- Resume Card -->
    <div v-else>
      <div class="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        <div class="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <FileText class="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </div>
        <div class="min-w-0">
          <p class="text-sm sm:text-base font-medium truncate">{{ resume.name }}</p>
          <p class="text-xs sm:text-sm text-muted-foreground truncate">{{ resume.title }}</p>
        </div>
      </div>
      <p class="text-xs sm:text-sm text-muted-foreground truncate">{{ resume.email }}</p>
      <p class="text-xs text-muted-foreground mt-1.5 sm:mt-2">
        Last updated: {{ resume.lastUpdated }}
      </p>
    </div>
  </div>
</template>
