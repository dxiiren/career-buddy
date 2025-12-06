<script setup lang="ts">
import { ThumbsUp, ThumbsDown } from 'lucide-vue-next'

interface Props {
  dos: string[]
  donts: string[]
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
        <Skeleton class="h-6 w-36 skeleton-shimmer" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <Skeleton v-for="i in 8" :key="i" class="h-8 w-full skeleton-shimmer" />
          </div>
          <div class="space-y-2">
            <Skeleton v-for="i in 8" :key="i" class="h-8 w-full skeleton-shimmer" />
          </div>
        </div>
      </div>

      <div v-else key="content">
        <h2 class="text-lg font-heading font-semibold mb-4">Interview Do's and Don'ts</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <ThumbsUp class="h-5 w-5 text-green-500" />
              <span class="font-medium text-green-600 dark:text-green-400">Do</span>
            </div>
            <ul class="space-y-2">
              <li
                v-for="item in dos"
                :key="item"
                class="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span class="text-green-500 mt-0.5">✓</span>
                {{ item }}
              </li>
            </ul>
          </div>
          <div>
            <div class="flex items-center gap-2 mb-3">
              <ThumbsDown class="h-5 w-5 text-red-500" />
              <span class="font-medium text-red-600 dark:text-red-400">Don't</span>
            </div>
            <ul class="space-y-2">
              <li
                v-for="item in donts"
                :key="item"
                class="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span class="text-red-500 mt-0.5">✗</span>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
