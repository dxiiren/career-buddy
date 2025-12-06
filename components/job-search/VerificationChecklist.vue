<script setup lang="ts">
import { CheckCircle } from 'lucide-vue-next'

interface Props {
  checklist: string[]
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
        <Skeleton class="h-6 w-44 skeleton-shimmer" />
        <div class="space-y-2">
          <Skeleton v-for="i in 8" :key="i" class="h-8 w-full skeleton-shimmer" />
        </div>
      </div>

      <div v-else key="content">
        <div class="flex items-center gap-2 mb-4">
          <CheckCircle class="h-5 w-5 text-green-500" />
          <h2 class="text-lg font-heading font-semibold">Verification Checklist</h2>
        </div>
        <p class="text-sm text-muted-foreground mb-4">Before accepting any job offer, verify:</p>
        <ul class="space-y-2">
          <li
            v-for="item in checklist"
            :key="item"
            class="flex items-start gap-3 text-sm"
          >
            <span class="flex-shrink-0 w-5 h-5 rounded border border-border flex items-center justify-center mt-0.5">
              <span class="text-xs text-muted-foreground">☐</span>
            </span>
            <span class="text-muted-foreground">{{ item }}</span>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
