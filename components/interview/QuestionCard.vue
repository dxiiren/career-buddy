<script setup lang="ts">
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-vue-next'
import { ref } from 'vue'
import type { InterviewQuestion } from '@/composables/useInterview'

interface Props {
  question: InterviewQuestion | null
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
        <Skeleton class="h-6 w-3/4 skeleton-shimmer" />
        <Skeleton class="h-4 w-20 skeleton-shimmer" />
      </div>

      <div v-else-if="question" key="content">
        <button
          class="w-full p-6 flex items-start justify-between text-left hover:bg-muted/50 transition-colors"
          @click="isExpanded = !isExpanded"
        >
          <div class="flex-1">
            <span class="inline-block px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary mb-2 capitalize">
              {{ question.category.replace('-', ' ') }}
            </span>
            <h3 class="font-medium">{{ question.question }}</h3>
          </div>
          <ChevronUp v-if="isExpanded" class="h-5 w-5 text-muted-foreground flex-shrink-0 ml-4" />
          <ChevronDown v-else class="h-5 w-5 text-muted-foreground flex-shrink-0 ml-4" />
        </button>

        <div v-if="isExpanded" class="px-6 pb-6 space-y-4 border-t border-border pt-4">
          <div>
            <h4 class="text-sm font-medium mb-2">Example Answer:</h4>
            <div class="bg-muted/50 rounded-lg p-4">
              <p class="text-sm text-muted-foreground italic">"{{ question.exampleAnswer }}"</p>
            </div>
          </div>

          <div>
            <h4 class="text-sm font-medium mb-2">Answer Structure:</h4>
            <ul class="space-y-1">
              <li
                v-for="(point, index) in question.answerStructure"
                :key="point"
                class="text-sm text-muted-foreground flex items-start gap-2"
              >
                <span class="text-primary">{{ index + 1 }}.</span>
                {{ point }}
              </li>
            </ul>
          </div>

          <div class="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <Lightbulb class="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p class="text-sm font-medium text-amber-600 dark:text-amber-400 mb-1">Tips:</p>
              <ul class="space-y-1">
                <li
                  v-for="tip in question.tips"
                  :key="tip"
                  class="text-sm text-muted-foreground"
                >
                  • {{ tip }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
