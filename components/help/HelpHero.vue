<script setup lang="ts">
import { HelpCircle, Sparkles } from 'lucide-vue-next'

interface Props {
  loading: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/5 to-background border border-border p-4 sm:p-6 lg:p-8">
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
        <div class="flex items-center gap-3 sm:gap-4">
          <Skeleton class="h-10 w-10 sm:h-14 sm:w-14 rounded-xl shrink-0" />
          <div class="space-y-2 min-w-0">
            <Skeleton class="h-6 sm:h-8 w-32 sm:w-48" />
            <Skeleton class="h-3 sm:h-4 w-48 sm:w-72" />
          </div>
        </div>
        <Skeleton class="h-16 w-full" />
      </div>

      <!-- Actual Content -->
      <div v-else key="content">
        <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div class="h-10 w-10 sm:h-14 sm:w-14 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <HelpCircle class="h-5 w-5 sm:h-7 sm:w-7 text-primary-foreground" />
          </div>
          <div class="min-w-0">
            <h1 class="text-xl sm:text-2xl md:text-3xl font-heading font-bold">
              Help & Support
            </h1>
            <p class="text-sm sm:text-base text-muted-foreground">
              Find answers to your questions or get in touch with us
            </p>
          </div>
        </div>

        <div class="bg-card/50 rounded-xl p-3 sm:p-4 border border-border">
          <div class="flex items-start gap-2 sm:gap-3">
            <Sparkles class="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
            <div class="min-w-0">
              <p class="text-sm sm:text-base font-medium mb-1">We're here to help</p>
              <p class="text-xs sm:text-sm text-muted-foreground">
                Browse our FAQ section below or contact us directly if you can't find what you're looking for.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
