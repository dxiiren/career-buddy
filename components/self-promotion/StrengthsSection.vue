<script setup lang="ts">
import type { StrengthCategory } from '@/composables/useSelfPromotion'

interface Props {
  categories: StrengthCategory[]
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
      <div v-if="loading" key="skeleton" class="space-y-4">
        <Skeleton class="h-6 w-48 mb-4" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="i in 4" :key="i" class="p-4 rounded-xl border border-border space-y-3">
            <Skeleton class="h-5 w-32" />
            <div class="flex flex-wrap gap-2">
              <Skeleton v-for="j in 4" :key="j" class="h-6 w-20 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div v-else key="content">
        <h2 class="text-lg font-heading font-semibold mb-4">Discover Your Strengths</h2>
        <p class="text-sm text-muted-foreground mb-4">Identify which of these strengths resonate with you.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="category in categories"
            :key="category.title"
            class="p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
          >
            <h3 class="font-medium mb-3">{{ category.title }}</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="strength in category.strengths"
                :key="strength"
                class="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
              >
                {{ strength }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
