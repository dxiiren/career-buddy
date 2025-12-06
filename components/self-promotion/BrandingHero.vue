<script setup lang="ts">
import { TrendingUp, Star } from 'lucide-vue-next'

interface Props {
  loading: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/5 to-background border border-border p-8">
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
        <div class="flex items-center gap-4">
          <Skeleton class="h-14 w-14 rounded-xl" />
          <div class="space-y-2">
            <Skeleton class="h-8 w-48" />
            <Skeleton class="h-4 w-72" />
          </div>
        </div>
      </div>

      <div v-else key="content">
        <div class="flex items-center gap-4 mb-4">
          <div class="h-14 w-14 rounded-xl bg-primary flex items-center justify-center">
            <TrendingUp class="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h1 class="text-2xl md:text-3xl font-heading font-bold">Personal Branding</h1>
            <p class="text-muted-foreground">Build a strong professional identity</p>
          </div>
        </div>
        <div class="bg-card/50 rounded-xl p-4 border border-border">
          <div class="flex items-start gap-3">
            <Star class="h-5 w-5 text-primary mt-0.5" />
            <p class="text-sm text-muted-foreground">
              Your personal brand is how others perceive you professionally. It's the unique combination of skills, experience, and personality that you want others to see.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
