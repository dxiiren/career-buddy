<script setup lang="ts">
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import { ref } from 'vue'
import type { InterviewType } from '@/composables/useInterview'

interface Props {
  types: InterviewType[]
  loading: boolean
}

defineProps<Props>()

const expandedIndex = ref<number | null>(null)

function toggleExpand(index: number) {
  expandedIndex.value = expandedIndex.value === index ? null : index
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
        <Skeleton class="h-6 w-44 skeleton-shimmer" />
        <div class="space-y-3">
          <Skeleton v-for="i in 5" :key="i" class="h-20 w-full skeleton-shimmer" />
        </div>
      </div>

      <div v-else key="content">
        <h2 class="text-lg font-heading font-semibold mb-4">Types of Interviews</h2>
        <div class="space-y-3">
          <div
            v-for="(type, index) in types"
            :key="type.name"
            class="border border-border rounded-xl overflow-hidden"
          >
            <button
              class="w-full p-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
              @click="toggleExpand(index)"
            >
              <div>
                <h3 class="font-medium">{{ type.name }}</h3>
                <p class="text-sm text-muted-foreground mt-1">{{ type.description }}</p>
              </div>
              <ChevronUp v-if="expandedIndex === index" class="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <ChevronDown v-else class="h-5 w-5 text-muted-foreground flex-shrink-0" />
            </button>
            <div v-if="expandedIndex === index" class="px-4 pb-4 border-t border-border pt-4">
              <p class="text-sm font-medium mb-2">Tips:</p>
              <ul class="space-y-1">
                <li
                  v-for="tip in type.tips"
                  :key="tip"
                  class="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span class="text-primary">•</span>
                  {{ tip }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
