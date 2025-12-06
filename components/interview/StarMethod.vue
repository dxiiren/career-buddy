<script setup lang="ts">
import type { StarMethod as StarMethodType } from '@/composables/useInterview'

interface Props {
  star: StarMethodType | null
  loading: boolean
}

defineProps<Props>()

const starColors = {
  S: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  T: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  A: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  R: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
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
      <div v-if="loading" key="skeleton" class="space-y-4">
        <Skeleton class="h-6 w-40 skeleton-shimmer" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton v-for="i in 4" :key="i" class="h-32 w-full skeleton-shimmer" />
        </div>
      </div>

      <div v-else-if="star" key="content">
        <h2 class="text-lg font-heading font-semibold mb-4">The STAR Method</h2>
        <p class="text-sm text-muted-foreground mb-6">
          Use this framework to structure your answers to behavioral questions.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div :class="['p-4 rounded-xl border', starColors.S]">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">S</span>
              <span class="font-semibold">Situation</span>
            </div>
            <p class="text-sm text-muted-foreground">{{ star.situation }}</p>
          </div>
          <div :class="['p-4 rounded-xl border', starColors.T]">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">T</span>
              <span class="font-semibold">Task</span>
            </div>
            <p class="text-sm text-muted-foreground">{{ star.task }}</p>
          </div>
          <div :class="['p-4 rounded-xl border', starColors.A]">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold">A</span>
              <span class="font-semibold">Action</span>
            </div>
            <p class="text-sm text-muted-foreground">{{ star.action }}</p>
          </div>
          <div :class="['p-4 rounded-xl border', starColors.R]">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">R</span>
              <span class="font-semibold">Result</span>
            </div>
            <p class="text-sm text-muted-foreground">{{ star.result }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
