<script setup lang="ts">
import { ShieldAlert } from 'lucide-vue-next'
import type { ScamTactic } from '@/composables/useJobSearch'

interface Props {
  tactics: ScamTactic[]
  loading: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-6">
    <Transition
      mode="out-in"
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="loading" key="skeleton" class="space-y-4">
        <Skeleton class="h-6 w-48 skeleton-shimmer" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Skeleton v-for="i in 6" :key="i" class="h-24 w-full skeleton-shimmer" />
        </div>
      </div>

      <div v-else key="content">
        <div class="flex items-center gap-2 mb-4">
          <ShieldAlert class="h-5 w-5 text-destructive" />
          <h2 class="text-lg font-heading font-semibold">Warning Signs of Job Scams</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div
            v-for="tactic in tactics"
            :key="tactic.sign"
            class="p-4 rounded-xl bg-destructive/5 border border-destructive/20"
          >
            <h3 class="font-medium text-destructive mb-2">{{ tactic.sign }}</h3>
            <p class="text-sm text-muted-foreground">{{ tactic.explanation }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
