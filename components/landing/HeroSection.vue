<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-vue-next'
</script>

<template>
  <section class="relative min-h-screen gradient-bg overflow-hidden pt-16">
    <!-- Decorative Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style="animation-delay: 1s;" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lavender-100/30 rounded-full blur-3xl" />
    </div>

    <div class="container mx-auto px-4 py-20 md:py-32 relative z-10">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-border shadow-sm mb-8 animate-fade-up">
          <span class="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span class="text-sm font-medium text-muted-foreground">Free for all Malaysian youth</span>
        </div>

        <!-- Headline -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-foreground mb-6 animate-fade-up" style="animation-delay: 0.1s;">
          Your Career Journey
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Starts Here
          </span>
        </h1>

        <!-- Subheadline -->
        <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style="animation-delay: 0.2s;">
          Stop scrolling through endless TikToks and confusing advice. Career Buddy brings everything you need — resume templates, interview prep, networking guides — into one supportive platform.
        </p>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style="animation-delay: 0.3s;">
          <Button size="lg" class="w-full sm:w-auto">
            Get Started Free
            <ArrowRight class="ml-2 h-4 w-4" />
          </Button>
          <Button variant="ghost" size="lg" class="w-full sm:w-auto group">
            <Play class="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            See How It Works
          </Button>
        </div>

        <!-- Trust Indicators -->
        <div class="mt-16 animate-fade-up" style="animation-delay: 0.4s;">
          <p class="text-sm text-muted-foreground mb-4">Trusted by students from</p>
          <div class="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <span class="text-lg font-semibold text-foreground">UM</span>
            <span class="text-lg font-semibold text-foreground">UTM</span>
            <span class="text-lg font-semibold text-foreground">UPM</span>
            <span class="text-lg font-semibold text-foreground">USM</span>
            <span class="text-lg font-semibold text-foreground">UKM</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Wave -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
      </svg>
    </div>
  </section>
</template>
