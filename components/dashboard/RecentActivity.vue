<script setup lang="ts">
import { FileText, Mic, Mail, Bookmark, Clock, Users, Target, TrendingUp, MessageCircle, HelpCircle, LayoutDashboard, Settings } from 'lucide-vue-next'
import { useRecentActivity } from '@/composables/useRecentActivity'

interface Props {
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const { activities, loadActivities, getActivities } = useRecentActivity()

// Trigger for refreshing time display
const refreshTrigger = ref(0)

// Load activities on mount and set up refresh interval
let refreshInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  loadActivities()
  // Refresh every minute to update relative times
  refreshInterval = setInterval(() => {
    refreshTrigger.value++
  }, 60000)
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
})

// Icon map for all possible activity types
const iconMap: Record<string, any> = {
  FileText,
  Mic,
  Mail,
  Bookmark,
  Users,
  Target,
  TrendingUp,
  MessageCircle,
  HelpCircle,
  LayoutDashboard,
  Settings,
}

// Computed to get activities with updated times (refreshTrigger forces recompute)
const displayActivities = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = refreshTrigger.value // Force recompute when trigger changes
  return getActivities()
})

// Empty state message
const hasActivities = computed(() => displayActivities.value.length > 0)
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-6 h-full">
    <!-- Title -->
    <Skeleton v-if="loading" class="h-6 w-36 mb-4" />
    <h2 v-else class="text-lg font-heading font-semibold mb-4">Recent Activity</h2>

    <!-- Skeleton Loading -->
    <div v-if="loading" class="space-y-4">
      <div v-for="i in 4" :key="i" class="flex items-start gap-3">
        <Skeleton class="h-8 w-8 rounded-lg" />
        <div class="flex-1">
          <Skeleton class="h-4 w-full mb-1" />
          <Skeleton class="h-3 w-16" />
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!hasActivities" class="text-center py-8">
      <div class="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
        <Clock class="h-6 w-6 text-muted-foreground" />
      </div>
      <p class="text-sm text-muted-foreground">No recent activity yet</p>
      <p class="text-xs text-muted-foreground mt-1">Start exploring to see your activity here</p>
    </div>

    <!-- Activity List -->
    <ul v-else class="space-y-4">
      <li
        v-for="activity in displayActivities"
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
