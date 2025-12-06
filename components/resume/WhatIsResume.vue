<script setup lang="ts">
import { Info } from 'lucide-vue-next'

interface Props {
  content: string[]
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
        <div class="space-y-2">
          <Skeleton v-for="i in 5" :key="i" class="h-8 w-full skeleton-shimmer" />
        </div>
      </div>

      <div v-else key="content">
        <div class="flex items-center gap-2 mb-4">
          <Info class="h-5 w-5 text-primary" />
          <h2 class="text-lg font-heading font-semibold">What Is a Resume?</h2>
        </div>
        <ul class="space-y-2">
          <li
            v-for="item in content"
            :key="item"
            class="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <span class="text-primary mt-0.5">•</span>
            {{ item }}
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
