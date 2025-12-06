<script setup lang="ts">
import { Linkedin, Lightbulb } from 'lucide-vue-next'
import type { HeadlineExample } from '@/composables/useSelfPromotion'

interface Props {
  examples: HeadlineExample[]
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
          <div v-for="i in 4" :key="i" class="p-4 rounded-xl border border-border space-y-2">
            <Skeleton class="h-4 w-24" />
            <Skeleton class="h-5 w-full" />
            <Skeleton class="h-4 w-3/4" />
          </div>
        </div>
      </div>

      <div v-else key="content">
        <div class="flex items-center gap-2 mb-4">
          <Linkedin class="h-5 w-5 text-primary" />
          <h2 class="text-lg font-heading font-semibold">Headline Examples</h2>
        </div>
        <p class="text-sm text-muted-foreground mb-4">Your headline is the first thing people see. Make it count!</p>
        <div class="space-y-3">
          <div
            v-for="item in examples"
            :key="item.type"
            class="p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
          >
            <span class="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
              {{ item.type }}
            </span>
            <p class="font-medium mt-2">{{ item.example }}</p>
            <div class="flex items-start gap-2 mt-2 text-sm text-muted-foreground">
              <Lightbulb class="h-4 w-4 mt-0.5 shrink-0" />
              <span>{{ item.tip }}</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
