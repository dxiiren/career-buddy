<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-vue-next'

const { target, isVisible } = useScrollAnimation()
</script>

<template>
  <section ref="target" class="py-20 relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary" />
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

    <!-- Decorative Elements -->
    <div class="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
    <div class="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

    <div class="container mx-auto px-4 relative z-10">
      <div
        :class="[
          'max-w-3xl mx-auto text-center transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        ]"
      >
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
          <Sparkles class="h-4 w-4 text-white" />
          <span class="text-sm font-medium text-white">Start Your Journey Today</span>
        </div>

        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-6">
          Ready to Take Control of Your Career?
        </h2>

        <p class="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Join thousands of young Malaysians who've already started their career preparation journey. It's free, it's supportive, and it's designed just for you.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" class="w-full sm:w-auto bg-white text-primary hover:bg-white/90 shadow-lg">
            Get Started Free
            <ArrowRight class="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" class="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
            Talk to Career Buddy AI
          </Button>
        </div>

        <p class="mt-8 text-sm text-white/60">
          No credit card required. Free forever for Malaysian youth.
        </p>
      </div>
    </div>
  </section>
</template>
