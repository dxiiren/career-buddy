<script setup lang="ts">
import { Users, Sparkles } from 'lucide-vue-next'

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
      <!-- Skeleton Loading -->
      <div v-if="loading" key="skeleton" class="space-y-4">
        <div class="flex items-center gap-4">
          <Skeleton class="h-14 w-14 rounded-xl" />
          <div class="space-y-2">
            <Skeleton class="h-8 w-64" />
            <Skeleton class="h-4 w-96" />
          </div>
        </div>
        <Skeleton class="h-20 w-full" />
      </div>

      <!-- Actual Content -->
      <div v-else key="content">
        <div class="flex items-center gap-4 mb-6">
          <div class="h-14 w-14 rounded-xl bg-primary flex items-center justify-center">
            <Users class="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h1 class="text-2xl md:text-3xl font-heading font-bold">
              Networking & Communication
            </h1>
            <p class="text-muted-foreground">
              Build meaningful professional connections
            </p>
          </div>
        </div>

        <div class="bg-card/50 rounded-xl p-4 border border-border">
          <div class="flex items-start gap-3">
            <Sparkles class="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p class="font-medium mb-1">Why networking matters</p>
              <p class="text-sm text-muted-foreground">
                80% of jobs are filled through networking. Learning to connect authentically
                with others is one of the most valuable career skills you can develop.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
