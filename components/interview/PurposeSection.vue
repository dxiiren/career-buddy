<script setup lang="ts">
import { Target } from 'lucide-vue-next'

interface Props {
  purpose: string[]
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
        <Skeleton class="h-6 w-48 skeleton-shimmer" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Skeleton v-for="i in 6" :key="i" class="h-12 w-full skeleton-shimmer" />
        </div>
      </div>

      <div v-else key="content">
        <div class="flex items-center gap-2 mb-4">
          <Target class="h-5 w-5 text-primary" />
          <h2 class="text-lg font-heading font-semibold">What Interviews Are For</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div
            v-for="item in purpose"
            :key="item"
            class="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
          >
            <span class="text-primary">✓</span>
            <span class="text-sm">{{ item }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
