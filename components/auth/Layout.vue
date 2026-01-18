<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next'
import ThemeToggle from '@/components/shared/ThemeToggle.vue'
</script>

<template>
  <div class="min-h-screen flex bg-background">
    <!-- Left Side - Form Area -->
    <div class="flex-1 flex items-center justify-center p-8 lg:p-12 relative">
      <!-- Theme Toggle - Top Right -->
      <div class="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div class="w-full max-w-md">
        <!-- Logo for mobile -->
        <div class="lg:hidden flex items-center gap-2 mb-8">
          <div class="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles class="h-5 w-5 text-primary-foreground" />
          </div>
          <span class="text-xl font-heading font-bold">Career Buddy</span>
        </div>

        <slot />
      </div>
    </div>

    <!-- Right Side - Brand Panel (hidden on mobile) -->
    <div class="hidden lg:flex lg:w-[45%] xl:w-[40%] relative overflow-hidden">
      <!-- Gradient Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-navy" />

      <!-- Floating Shapes -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/5 animate-float"
          style="animation-delay: 0s"
        />
        <div
          class="absolute top-40 right-20 w-24 h-24 rounded-full bg-white/10 animate-float"
          style="animation-delay: 1s"
        />
        <div
          class="absolute bottom-32 left-20 w-40 h-40 rounded-full bg-white/5 animate-float"
          style="animation-delay: 2s"
        />
        <div
          class="absolute bottom-20 right-10 w-20 h-20 rounded-full bg-white/10 animate-float"
          style="animation-delay: 0.5s"
        />
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/5 animate-pulse-glow"
        />
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
        <!-- Logo -->
        <div class="flex items-center gap-3 mb-8">
          <div class="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Sparkles class="h-7 w-7 text-white" />
          </div>
          <span class="text-3xl font-heading font-bold">Career Buddy</span>
        </div>

        <!-- Tagline -->
        <h2 class="text-2xl xl:text-3xl font-heading font-semibold text-center mb-4 max-w-sm">
          Your AI-Powered Career Companion
        </h2>
        <p class="text-white/80 text-center max-w-xs text-lg">
          Land your dream job with personalized guidance, resume building, and interview prep.
        </p>

        <!-- Stats -->
      </div>
    </div>
  </div>
</template>
