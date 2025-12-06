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
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-6">
    <h2 class="text-lg font-heading font-semibold mb-4">Your Progress</h2>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div v-for="i in 6" :key="i" class="rounded-xl border border-border p-4">
        <div class="flex items-center gap-3 mb-3">
          <UiSkeleton class="h-10 w-10 rounded-lg" />
          <UiSkeleton class="h-5 w-24" />
        </div>
        <UiSkeleton class="h-2 w-full mb-2" />
        <div class="flex justify-between">
          <UiSkeleton class="h-4 w-8" />
          <UiSkeleton class="h-4 w-24" />
        </div>
      </div>
    </div>

    <!-- Module Cards -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="module in modules"
        :key="module.id"
        class="group rounded-xl border border-border p-4 hover:border-primary/50 hover:shadow-lg hover:scale-[1.02] hover:bg-muted/30 transition-all duration-300 cursor-pointer"
      >
        <div class="flex items-center gap-3 mb-3">
          <div
            class="h-10 w-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300"
            :class="module.color"
          >
            <component :is="iconMap[module.icon]" class="h-5 w-5" />
          </div>
          <span class="font-medium group-hover:text-primary transition-colors">{{ module.name }}</span>
        </div>

        <UiProgress :model-value="module.progress" class="mb-2" />

        <div class="flex items-center justify-between text-sm">
          <span class="text-muted-foreground">{{ module.progress }}%</span>
          <span class="text-primary group-hover:underline font-medium">{{ module.cta }} →</span>
        </div>
      </div>
    </div>
  </div>
</template>
