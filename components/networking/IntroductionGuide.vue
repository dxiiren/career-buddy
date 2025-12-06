<script setup lang="ts">
import { CheckCircle2 } from 'lucide-vue-next'

interface Props {
  tips: string[]
  loading: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-6">
    <Transition
      mode="out-in"
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <!-- Skeleton Loading -->
      <div v-if="loading" key="skeleton" class="space-y-4">
        <Skeleton class="h-6 w-56 mb-4" />
        <div class="space-y-3">
          <div v-for="i in 6" :key="i" class="flex items-start gap-3">
            <Skeleton class="h-5 w-5 rounded-full shrink-0" />
            <Skeleton class="h-4 w-full" />
          </div>
        </div>
      </div>

      <!-- Actual Content -->
      <div v-else key="content">
        <h2 class="text-lg font-heading font-semibold mb-4">How to Introduce Yourself</h2>

        <div class="space-y-3">
          <div
            v-for="(tip, index) in tips"
            :key="index"
            class="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div class="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 class="h-3.5 w-3.5 text-primary" />
            </div>
            <p class="text-sm">{{ tip }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
