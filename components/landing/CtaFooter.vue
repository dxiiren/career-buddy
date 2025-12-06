<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, CheckCircle2, Users, Star, Zap, Rocket } from 'lucide-vue-next'

const { target, isVisible } = useScrollAnimation()

const benefits = [
  { icon: CheckCircle2, text: 'No credit card required' },
  { icon: Users, text: 'Join 5,000+ users' },
  { icon: Star, text: '4.9/5 rating' },
  { icon: Zap, text: 'Instant access' },
]
</script>

<template>
  <section ref="target" class="py-24 relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary" />
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

    <!-- Animated Decorative Elements -->
    <div class="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse" />
    <div class="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse" style="animation-delay: 0.5s" />
    <div class="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-xl animate-float" />
    <div class="absolute top-1/3 right-1/4 w-20 h-20 bg-white/5 rounded-full blur-xl animate-float" style="animation-delay: 1s" />

    <!-- Floating Icons -->
    <div class="absolute top-20 left-[15%] opacity-20 animate-bounce-slow hidden md:block">
      <Rocket class="h-12 w-12 text-white" />
    </div>
    <div class="absolute bottom-20 right-[15%] opacity-20 animate-bounce-slow hidden md:block" style="animation-delay: 1.5s">
      <Star class="h-10 w-10 text-white" />
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div
        :class="[
          'max-w-4xl mx-auto text-center transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        ]"
      >
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-8 animate-pulse-glow">
          <Sparkles class="h-4 w-4 text-white" />
          <span class="text-sm font-medium text-white">Start Your Journey Today</span>
        </div>

        <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-heading text-white mb-6 leading-tight">
          Ready to Take Control of
          <span class="block mt-2">Your Career?</span>
        </h2>

        <p class="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Join thousands of young Malaysians who've already started their career preparation journey. It's free, it's supportive, and it's designed just for you.
        </p>

        <!-- CTA Buttons -->
        <div
          :class="[
            'flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ]"
          style="transition-delay: 200ms;"
        >
          <Button size="lg" class="w-full sm:w-auto bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg px-8 py-6 group">
            Get Started Free
            <ArrowRight class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" class="w-full sm:w-auto bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 text-lg px-8 py-6">
            Talk to Career Buddy AI
          </Button>
        </div>

        <!-- Benefits Strip -->
        <div
          :class="[
            'flex flex-wrap items-center justify-center gap-6 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ]"
          style="transition-delay: 400ms;"
        >
          <div
            v-for="(benefit, index) in benefits"
            :key="benefit.text"
            class="flex items-center gap-2 text-white/80"
            :style="{ transitionDelay: `${(index + 2) * 100}ms` }"
          >
            <component :is="benefit.icon" class="h-4 w-4 text-white" />
            <span class="text-sm font-medium">{{ benefit.text }}</span>
          </div>
        </div>

        <!-- User Avatars -->
        <div
          :class="[
            'mt-12 flex items-center justify-center gap-4 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ]"
          style="transition-delay: 600ms;"
        >
          <div class="flex -space-x-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">SA</div>
            <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">MH</div>
            <div class="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">NA</div>
            <div class="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">KL</div>
            <div class="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-white text-xs font-bold">+5K</div>
          </div>
          <p class="text-white/70 text-sm">
            Joined this month
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
