<script setup lang="ts">
import { MessageCircle, ArrowRight } from 'lucide-vue-next'
import type { FeedbackTip } from '@/composables/useSelfPromotion'

interface Props {
  tips: FeedbackTip[]
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
        <Skeleton class="h-6 w-48 mb-4" />
        <div class="space-y-3">
          <div v-for="i in 4" :key="i" class="p-4 rounded-xl border border-border space-y-3">
            <Skeleton class="h-4 w-40" />
            <Skeleton class="h-16 w-full rounded-lg" />
          </div>
        </div>
      </div>

      <div v-else key="content">
        <div class="flex items-center gap-2 mb-4">
          <MessageCircle class="h-5 w-5 text-primary" />
          <h2 class="text-lg font-heading font-semibold">Handling Feedback</h2>
        </div>
        <div class="space-y-3">
          <div
            v-for="tip in tips"
            :key="tip.scenario"
            class="p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
          >
            <p class="text-sm font-medium text-muted-foreground mb-2">{{ tip.scenario }}</p>
            <div class="flex items-start gap-2">
              <ArrowRight class="h-4 w-4 text-primary mt-1 shrink-0" />
              <p class="text-sm bg-muted/50 rounded-lg p-3 flex-1 italic">"{{ tip.response }}"</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
