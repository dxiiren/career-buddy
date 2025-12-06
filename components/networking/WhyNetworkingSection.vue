<script setup lang="ts">
import { Key, Users, Lightbulb, GraduationCap } from 'lucide-vue-next'
import type { NetworkingBenefit } from '@/composables/useNetworking'

interface Props {
  benefits: NetworkingBenefit[]
  loading: boolean
}

defineProps<Props>()

const iconMap: Record<string, any> = {
  Key,
  Users,
  Lightbulb,
  GraduationCap,
}
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-4 sm:p-5 lg:p-6">
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
      <div v-if="loading" key="skeleton" class="space-y-4">
        <Skeleton class="h-6 w-48 mb-4" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="i in 4" :key="i" class="flex gap-4 p-4 rounded-xl border border-border">
            <Skeleton class="h-12 w-12 rounded-lg shrink-0" />
            <div class="space-y-2 flex-1">
              <Skeleton class="h-5 w-32" />
              <Skeleton class="h-4 w-full" />
              <Skeleton class="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>

      <!-- Actual Content -->
      <div v-else key="content">
        <h2 class="text-lg font-heading font-semibold mb-4">Why Networking Matters</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="flex gap-4 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-all duration-300"
          >
            <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <component :is="iconMap[benefit.icon]" class="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 class="font-medium mb-1">{{ benefit.title }}</h3>
              <p class="text-sm text-muted-foreground">{{ benefit.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
