<script setup lang="ts">
import { Bot } from 'lucide-vue-next'

interface Props {
  loading: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-border p-6">
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
        <Skeleton class="h-10 w-10 rounded-full skeleton-shimmer" />
        <Skeleton class="h-8 w-48 skeleton-shimmer" />
        <Skeleton class="h-5 w-96 skeleton-shimmer" />
      </div>

      <div v-else key="content" class="space-y-4">
        <div class="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Bot class="h-6 w-6 text-primary" />
        </div>
        <h1 class="text-2xl font-heading font-bold">Career Buddy AI</h1>
        <p class="text-muted-foreground max-w-2xl">
          Your personal career advisor. Ask me anything about resumes, interviews, job search, networking, or workplace tips!
        </p>
      </div>
    </Transition>
  </div>
</template>
