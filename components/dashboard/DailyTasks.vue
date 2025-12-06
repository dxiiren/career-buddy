<script setup lang="ts">
import { Check, Circle } from 'lucide-vue-next'
import type { DailyTask } from '@/composables/useDashboard'

interface Props {
  tasks: DailyTask[]
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const emit = defineEmits<{
  toggle: [taskId: string]
}>()
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-6 h-full">
    <!-- Title -->
    <UiSkeleton v-if="loading" class="h-6 w-28 mb-4" />
    <h2 v-else class="text-lg font-heading font-semibold mb-4">Daily Tasks</h2>

    <!-- Skeleton Loading -->
    <div v-if="loading" class="space-y-3">
      <div v-for="i in 3" :key="i" class="flex items-center gap-3">
        <UiSkeleton class="h-5 w-5 rounded-full" />
        <UiSkeleton class="h-4 flex-1" />
      </div>
    </div>

    <!-- Task List -->
    <ul v-else class="space-y-3">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="flex items-center gap-3 group cursor-pointer"
        @click="emit('toggle', task.id)"
      >
        <button
          class="h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
          :class="task.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-muted-foreground group-hover:border-primary'"
        >
          <Check v-if="task.completed" class="h-3 w-3" />
        </button>
        <span
          class="text-sm transition-all duration-200"
          :class="task.completed ? 'text-muted-foreground line-through' : ''"
        >
          {{ task.text }}
        </span>
      </li>
    </ul>
  </div>
</template>
