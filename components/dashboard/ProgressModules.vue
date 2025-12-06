<script setup lang="ts">
import { FileText, Mail, Mic, Users, Target, TrendingUp } from 'lucide-vue-next'
import type { ProgressModule } from '@/composables/useDashboard'

interface Props {
  modules: ProgressModule[]
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const iconMap: Record<string, any> = {
  FileText,
  Mail,
  Mic,
  Users,
  Target,
  TrendingUp,
}

// Get color class based on progress percentage
function getProgressColor(progress: number): string {
  if (progress >= 75) return 'bg-green-500/15 text-green-600 dark:text-green-400'
  if (progress >= 50) return 'bg-primary/15 text-primary'
  if (progress >= 25) return 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400'
  return 'bg-muted text-muted-foreground'
}
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-4 sm:p-5 lg:p-6 h-full">
    <Transition
      mode="out-in"
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <!-- Skeleton Loading -->
      <div v-if="loading" key="skeleton">
        <Skeleton class="h-5 sm:h-6 w-28 sm:w-32 mb-3 sm:mb-4" />
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div v-for="i in 6" :key="i" class="rounded-xl border border-border bg-card p-3 sm:p-4 space-y-2 sm:space-y-3">
            <div class="flex items-center gap-2 sm:gap-3">
              <Skeleton class="h-8 w-8 sm:h-10 sm:w-10 rounded-lg" />
              <Skeleton class="h-4 sm:h-5 w-20 sm:w-24" />
            </div>
            <Skeleton class="h-2 w-full" />
            <div class="flex justify-between">
              <Skeleton class="h-4 sm:h-5 w-10 sm:w-12 rounded-md" />
              <Skeleton class="h-3 sm:h-4 w-16 sm:w-20" />
            </div>
          </div>
        </div>
      </div>

      <!-- Actual Content -->
      <div v-else key="content">
        <h2 class="text-base sm:text-lg font-heading font-semibold mb-3 sm:mb-4">Your Progress</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <NuxtLink
            v-for="module in modules"
            :key="module.id"
            :to="module.href"
            class="group rounded-xl border border-border p-3 sm:p-4 hover:border-primary/50 hover:shadow-lg hover:scale-[1.02] hover:bg-muted/30 transition-all duration-300"
          >
            <div class="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div
                class="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300"
                :class="module.color"
              >
                <component :is="iconMap[module.icon]" class="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span class="text-sm sm:text-base font-medium group-hover:text-primary transition-colors">{{ module.name }}</span>
            </div>

            <Progress :model-value="module.progress" class="mb-2" />

            <div class="flex items-center justify-between text-xs sm:text-sm">
              <span
                class="px-1.5 sm:px-2 py-0.5 rounded-md text-xs font-semibold"
                :class="getProgressColor(module.progress)"
              >
                {{ module.progress }}%
              </span>
              <span class="text-primary group-hover:underline font-medium">{{ module.cta }} →</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>
