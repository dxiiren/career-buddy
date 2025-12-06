<script setup lang="ts">
import { Layout } from 'lucide-vue-next'
import type { CoverLetterSection } from '@/composables/useResume'

interface Props {
  sections: CoverLetterSection[]
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
        <div class="space-y-4">
          <Skeleton v-for="i in 4" :key="i" class="h-24 w-full skeleton-shimmer" />
        </div>
      </div>

      <div v-else key="content">
        <div class="flex items-center gap-2 mb-4">
          <Layout class="h-5 w-5 text-primary" />
          <h2 class="text-lg font-heading font-semibold">Cover Letter Structure</h2>
        </div>
        <div class="space-y-4">
          <div
            v-for="(section, index) in sections"
            :key="section.title"
            class="flex gap-4"
          >
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span class="text-lg font-bold text-primary">{{ index + 1 }}</span>
            </div>
            <div class="flex-1">
              <h3 class="font-medium mb-1">{{ section.title }}</h3>
              <p class="text-sm text-muted-foreground">{{ section.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
