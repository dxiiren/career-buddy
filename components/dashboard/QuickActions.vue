<script setup lang="ts">
import { FileText, Mic, Mail, Users, MessageCircle } from 'lucide-vue-next'

interface Props {
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const actions = [
  { id: '1', label: 'Write Resume', icon: FileText, color: 'hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/30' },
  { id: '2', label: 'Practise Interview', icon: Mic, color: 'hover:bg-green-500/10 hover:text-green-500 hover:border-green-500/30' },
  { id: '3', label: 'Generate Cover Letter', icon: Mail, color: 'hover:bg-purple-500/10 hover:text-purple-500 hover:border-purple-500/30' },
  { id: '4', label: 'Send Networking Message', icon: Users, color: 'hover:bg-orange-500/10 hover:text-orange-500 hover:border-orange-500/30' },
  { id: '5', label: 'Ask Buddy', icon: MessageCircle, color: 'hover:bg-primary/10 hover:text-primary hover:border-primary/30' },
]
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-6">
    <!-- Title -->
    <UiSkeleton v-if="loading" class="h-6 w-32 mb-4" />
    <h2 v-else class="text-lg font-heading font-semibold mb-4">Quick Actions</h2>

    <!-- Skeleton Loading -->
    <div v-if="loading" class="flex flex-wrap gap-2">
      <UiSkeleton v-for="i in 5" :key="i" class="h-10 w-32 rounded-lg" />
    </div>

    <!-- Action Buttons -->
    <div v-else class="flex flex-wrap gap-2">
      <button
        v-for="action in actions"
        :key="action.id"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium transition-all duration-200"
        :class="action.color"
      >
        <component :is="action.icon" class="h-4 w-4" />
        {{ action.label }}
      </button>
    </div>
  </div>
</template>
