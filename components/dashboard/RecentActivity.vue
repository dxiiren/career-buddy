<script setup lang="ts">
import { FileText, Mic, Mail, Bookmark, Clock } from 'lucide-vue-next'
import type { ActivityItem } from '@/composables/useDashboard'

interface Props {
  activities: ActivityItem[]
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const iconMap: Record<string, any> = {
  FileText,
  Mic,
  Mail,
  Bookmark,
}
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-6 h-full">
    <!-- Title -->
    <UiSkeleton v-if="loading" class="h-6 w-36 mb-4" />
    <h2 v-else class="text-lg font-heading font-semibold mb-4">Recent Activity</h2>

    <!-- Skeleton Loading -->
    <div v-if="loading" class="space-y-4">
      <div v-for="i in 4" :key="i" class="flex items-start gap-3">
        <UiSkeleton class="h-8 w-8 rounded-lg" />
        <div class="flex-1">
          <UiSkeleton class="h-4 w-full mb-1" />
          <UiSkeleton class="h-3 w-16" />
        </div>
      </div>
    </div>

    <!-- Activity List -->
    <ul v-else class="space-y-4">
      <li
        v-for="activity in activities"
        :key="activity.id"
        class="flex items-start gap-3"
      >
        <div class="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
          <component :is="iconMap[activity.icon]" class="h-4 w-4 text-muted-foreground" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm">{{ activity.text }}</p>
          <p class="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            <Clock class="h-3 w-3" />
            {{ activity.time }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
