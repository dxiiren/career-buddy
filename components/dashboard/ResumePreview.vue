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
  <div class="rounded-2xl bg-card border border-border p-6">
    <div class="flex items-center justify-between mb-4">
      <!-- Title -->
      <UiSkeleton v-if="loading" class="h-6 w-36" />
      <h2 v-else class="text-lg font-heading font-semibold">Resume Preview</h2>
      <button
        v-if="!loading"
        class="text-sm text-primary hover:underline flex items-center gap-1"
      >
        Edit <ExternalLink class="h-3 w-3" />
      </button>
    </div>

    <!-- Skeleton Loading -->
    <div v-if="loading" class="space-y-3">
      <div class="flex items-center gap-3">
        <UiSkeleton class="h-12 w-12 rounded-lg" />
        <div class="flex-1">
          <UiSkeleton class="h-5 w-32 mb-1" />
          <UiSkeleton class="h-4 w-24" />
        </div>
      </div>
      <UiSkeleton class="h-4 w-40" />
      <UiSkeleton class="h-3 w-32" />
    </div>

    <!-- Resume Card -->
    <div v-else>
      <div class="flex items-center gap-3 mb-3">
        <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <FileText class="h-6 w-6 text-primary" />
        </div>
        <div>
          <p class="font-medium">{{ resume.name }}</p>
          <p class="text-sm text-muted-foreground">{{ resume.title }}</p>
        </div>
      </div>
      <p class="text-sm text-muted-foreground">{{ resume.email }}</p>
      <p class="text-xs text-muted-foreground mt-2">
        Last updated: {{ resume.lastUpdated }}
      </p>
    </div>
  </div>
</template>
