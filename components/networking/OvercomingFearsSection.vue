<script setup lang="ts">
import { AlertCircle, CheckCircle } from 'lucide-vue-next'
import type { CommonFear } from '@/composables/useNetworking'

interface Props {
  fears: CommonFear[]
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
          <div v-for="i in 4" :key="i" class="p-4 rounded-xl border border-border">
            <div class="flex items-start gap-3 mb-2">
              <Skeleton class="h-5 w-5 rounded-full" />
              <Skeleton class="h-5 w-48" />
            </div>
            <div class="flex items-start gap-3 ml-8">
              <Skeleton class="h-5 w-5 rounded-full" />
              <Skeleton class="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>

      <!-- Actual Content -->
      <div v-else key="content">
        <h2 class="text-lg font-heading font-semibold mb-4">Overcoming Common Fears</h2>

        <div class="space-y-3">
          <div
            v-for="item in fears"
            :key="item.fear"
            class="p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-all duration-300"
          >
            <div class="flex items-start gap-3 mb-2">
              <AlertCircle class="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <p class="font-medium text-destructive/90">"{{ item.fear }}"</p>
            </div>
            <div class="flex items-start gap-3 ml-8">
              <CheckCircle class="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <p class="text-sm text-muted-foreground">{{ item.solution }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
