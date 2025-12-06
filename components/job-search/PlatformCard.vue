<script setup lang="ts">
import { ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, Users } from 'lucide-vue-next'
import { ref } from 'vue'
import type { JobPlatform } from '@/composables/useJobSearch'

interface Props {
  platform: JobPlatform | null
  loading: boolean
}

defineProps<Props>()

const isExpanded = ref(false)
</script>

<template>
  <div class="rounded-2xl bg-card border border-border overflow-hidden">
    <Transition
      mode="out-in"
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="loading" key="skeleton" class="p-6 space-y-4">
        <div class="flex justify-between items-center">
          <Skeleton class="h-6 w-32 skeleton-shimmer" />
          <Skeleton class="h-8 w-8 rounded skeleton-shimmer" />
        </div>
        <Skeleton class="h-4 w-48 skeleton-shimmer" />
      </div>

      <div v-else-if="platform" key="content">
        <button
          class="w-full p-6 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
          @click="isExpanded = !isExpanded"
        >
          <div>
            <h3 class="font-heading font-semibold text-lg">{{ platform.name }}</h3>
            <p class="text-sm text-muted-foreground mt-1">{{ platform.whoShouldUse }}</p>
          </div>
          <ChevronUp v-if="isExpanded" class="h-5 w-5 text-muted-foreground" />
          <ChevronDown v-else class="h-5 w-5 text-muted-foreground" />
        </button>

        <div v-if="isExpanded" class="px-6 pb-6 space-y-4 border-t border-border pt-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <ThumbsUp class="h-4 w-4 text-green-500" />
                <span class="text-sm font-medium">Pros</span>
              </div>
              <ul class="space-y-1">
                <li
                  v-for="pro in platform.pros"
                  :key="pro"
                  class="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span class="text-green-500">+</span>
                  {{ pro }}
                </li>
              </ul>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-2">
                <ThumbsDown class="h-4 w-4 text-red-500" />
                <span class="text-sm font-medium">Cons</span>
              </div>
              <ul class="space-y-1">
                <li
                  v-for="con in platform.cons"
                  :key="con"
                  class="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span class="text-red-500">-</span>
                  {{ con }}
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div class="flex items-center gap-2 mb-2">
              <Users class="h-4 w-4 text-primary" />
              <span class="text-sm font-medium">How to Use</span>
            </div>
            <ul class="space-y-1">
              <li
                v-for="(step, index) in platform.howToUse"
                :key="step"
                class="text-sm text-muted-foreground flex items-start gap-2"
              >
                <span class="text-primary">{{ index + 1 }}.</span>
                {{ step }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
