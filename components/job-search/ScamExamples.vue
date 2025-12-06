<script setup lang="ts">
import { FileWarning } from 'lucide-vue-next'
import type { ScamExample } from '@/composables/useJobSearch'

interface Props {
  examples: ScamExample[]
  loading: boolean
}

defineProps<Props>()
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
      <div v-if="loading" key="skeleton" class="space-y-4">
        <Skeleton class="h-6 w-40 skeleton-shimmer" />
        <div class="space-y-4">
          <Skeleton v-for="i in 3" :key="i" class="h-32 w-full skeleton-shimmer" />
        </div>
      </div>

      <div v-else key="content">
        <div class="flex items-center gap-2 mb-4">
          <FileWarning class="h-5 w-5 text-destructive" />
          <h2 class="text-lg font-heading font-semibold">Real Scam Examples</h2>
        </div>
        <div class="space-y-4">
          <div
            v-for="example in examples"
            :key="example.title"
            class="p-4 rounded-xl border border-border"
          >
            <h3 class="font-medium mb-2">{{ example.title }}</h3>
            <p class="text-sm text-muted-foreground mb-3">{{ example.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="flag in example.redFlags"
                :key="flag"
                class="px-2 py-1 text-xs rounded-full bg-destructive/10 text-destructive"
              >
                {{ flag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
