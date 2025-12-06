<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next'
import type { PostIdea } from '@/composables/useSelfPromotion'

interface Props {
  ideas: PostIdea[]
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="i in 4" :key="i" class="p-4 rounded-xl border border-border space-y-3">
            <Skeleton class="h-5 w-32" />
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-16 w-full rounded-lg" />
          </div>
        </div>
      </div>

      <div v-else key="content">
        <div class="flex items-center gap-2 mb-4">
          <Sparkles class="h-5 w-5 text-primary" />
          <h2 class="text-lg font-heading font-semibold">Post Ideas for Fresh Grads</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="idea in ideas"
            :key="idea.title"
            class="p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
          >
            <h3 class="font-medium mb-2">{{ idea.title }}</h3>
            <p class="text-sm text-muted-foreground mb-3">{{ idea.description }}</p>
            <div class="bg-muted/50 rounded-lg p-3">
              <p class="text-xs italic">"{{ idea.example }}"</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
