<script setup lang="ts">
import { Eye } from 'lucide-vue-next'
import type { EmployerLookFor } from '@/composables/useResume'

interface Props {
  items: EmployerLookFor[]
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
        <Skeleton class="h-6 w-52 skeleton-shimmer" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton v-for="i in 5" :key="i" class="h-24 w-full skeleton-shimmer" />
        </div>
      </div>

      <div v-else key="content">
        <div class="flex items-center gap-2 mb-4">
          <Eye class="h-5 w-5 text-primary" />
          <h2 class="text-lg font-heading font-semibold">What Employers Look For</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="item in items"
            :key="item.title"
            class="p-4 rounded-xl bg-muted/50"
          >
            <h3 class="font-medium mb-2">{{ item.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
