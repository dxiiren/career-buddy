<script setup lang="ts">
import { UserPlus, Target, Rocket, CheckCircle2, Clock, Zap, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const { target, isVisible } = useScrollAnimation()
const hoveredStep = ref<number | null>(null)
const currentSlide = ref(0)

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % steps.length
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + steps.length) % steps.length
}

const steps = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Sign Up Free',
    description: 'Create your account in seconds. No credit card required, free forever for Malaysian youth.',
    color: 'from-primary to-primary/80',
    bgColor: 'bg-primary/10',
    time: '30 seconds',
    features: ['Email or Google sign-up', 'No verification needed', 'Instant access'],
  },
  {
    icon: Target,
    number: '02',
    title: 'Choose Your Focus',
    description: 'Tell us where you are in your journey. We\'ll personalise your dashboard with relevant resources.',
    color: 'from-secondary to-secondary/80',
    bgColor: 'bg-secondary/10',
    time: '2 minutes',
    features: ['Personalized dashboard', 'Smart recommendations', 'Goal tracking'],
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Start Preparing',
    description: 'Access guides, templates, and AI tools. Track your progress and build confidence step by step.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    time: 'Your pace',
    features: ['AI-powered tools', '50+ templates', '24/7 support'],
  },
]
</script>

<template>
  <section id="how-it-works" ref="target" class="py-24 bg-white relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-0 w-full h-full opacity-[0.02]" style="background-image: radial-gradient(circle, currentColor 1px, transparent 1px); background-size: 40px 40px;" />
      <div class="absolute -top-20 -right-20 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
      <div class="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div
        :class="[
          'max-w-3xl mx-auto text-center mb-16 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        ]"
      >
        <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
          <Zap class="h-4 w-4" />
          Quick & Easy
        </span>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6">
          How Career Buddy
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Works
          </span>
        </h2>
        <p class="text-lg text-muted-foreground">
          Get started in minutes. No complicated setup, just straightforward career preparation.
        </p>
      </div>

      <!-- Desktop Steps Container -->
      <div class="hidden lg:block relative">
        <!-- Connection Line (Desktop) -->
        <div class="absolute top-28 left-1/2 -translate-x-1/2 w-2/3 h-1 overflow-hidden">
          <div class="w-full h-full bg-gradient-to-r from-primary/30 via-secondary/30 to-green-500/30 rounded-full" />
          <div
            :class="[
              'absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-secondary to-green-500 rounded-full transition-all duration-1000',
              isVisible ? 'w-full' : 'w-0',
            ]"
            style="transition-delay: 500ms;"
          />
        </div>

        <div class="grid gap-8 lg:grid-cols-3">
          <div
            v-for="(step, index) in steps"
            :key="step.number"
            :class="[
              'relative text-center transition-all duration-700 group cursor-pointer',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            ]"
            :style="{ transitionDelay: `${(index + 1) * 200}ms` }"
            @mouseenter="hoveredStep = index"
            @mouseleave="hoveredStep = null"
          >
            <!-- Card Background on Hover -->
            <div
              :class="[
                'absolute inset-0 rounded-2xl transition-all duration-300',
                hoveredStep === index ? 'bg-white shadow-xl scale-105' : 'bg-transparent',
              ]"
            />

            <div class="relative p-6">
              <!-- Step Number Badge -->
              <div class="relative inline-flex items-center justify-center mb-6">
                <div
                  :class="[
                    'absolute inset-0 bg-gradient-to-r rounded-full blur-xl scale-150 transition-all duration-300',
                    step.color,
                    hoveredStep === index ? 'opacity-40' : 'opacity-20',
                  ]"
                />
                <div
                  :class="[
                    'relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg border-2 transition-all duration-300',
                    hoveredStep === index ? 'border-primary scale-110' : 'border-border',
                  ]"
                >
                  <component :is="step.icon" :class="['h-8 w-8 transition-colors', hoveredStep === index ? 'text-primary' : 'text-muted-foreground']" />
                </div>
                <span
                  :class="[
                    'absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r text-white text-sm font-bold shadow-md transition-transform duration-300',
                    step.color,
                    hoveredStep === index ? 'scale-110' : '',
                  ]"
                >
                  {{ step.number }}
                </span>
              </div>

              <!-- Time Badge -->
              <div
                :class="[
                  'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-4 transition-all duration-300',
                  step.bgColor,
                  hoveredStep === index ? 'opacity-100 scale-100' : 'opacity-70 scale-95',
                ]"
              >
                <Clock class="h-3 w-3" />
                {{ step.time }}
              </div>

              <h3 class="text-xl font-semibold font-heading text-foreground mb-3 group-hover:text-primary transition-colors">
                {{ step.title }}
              </h3>
              <p class="text-muted-foreground max-w-xs mx-auto mb-4">
                {{ step.description }}
              </p>

              <!-- Features List (shown on hover) -->
              <div
                :class="[
                  'space-y-2 transition-all duration-300 overflow-hidden',
                  hoveredStep === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0',
                ]"
              >
                <div
                  v-for="feature in step.features"
                  :key="feature"
                  class="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 class="h-4 w-4 text-green-500" />
                  {{ feature }}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Mobile Steps Slider -->
      <div class="lg:hidden relative">
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-300 ease-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div
              v-for="(step, index) in steps"
              :key="step.number"
              :class="[
                'flex-shrink-0 w-full text-center px-4',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
              ]"
            >
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <!-- Step Number Badge -->
                <div class="relative inline-flex items-center justify-center mb-6">
                  <div :class="['absolute inset-0 bg-gradient-to-r rounded-full blur-xl scale-150 opacity-30', step.color]" />
                  <div class="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg border-2 border-primary">
                    <component :is="step.icon" class="h-8 w-8 text-primary" />
                  </div>
                  <span :class="['absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r text-white text-sm font-bold shadow-md', step.color]">
                    {{ step.number }}
                  </span>
                </div>

                <!-- Time Badge -->
                <div :class="['inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-4', step.bgColor]">
                  <Clock class="h-3 w-3" />
                  {{ step.time }}
                </div>

                <h3 class="text-xl font-semibold font-heading text-foreground mb-3">
                  {{ step.title }}
                </h3>
                <p class="text-muted-foreground mb-4">
                  {{ step.description }}
                </p>

                <!-- Features List -->
                <div class="space-y-2">
                  <div
                    v-for="feature in step.features"
                    :key="feature"
                    class="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 class="h-4 w-4 text-green-500" />
                    {{ feature }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="flex items-center justify-center gap-4 mt-6">
          <button
            class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-border"
            @click="prevSlide"
          >
            <ChevronLeft class="h-5 w-5 text-muted-foreground" />
          </button>
          <div class="flex items-center gap-2">
            <button
              v-for="(_, index) in steps"
              :key="index"
              :class="[
                'h-2 rounded-full transition-all duration-300',
                currentSlide === index ? 'w-6 bg-primary' : 'w-2 bg-primary/30',
              ]"
              @click="currentSlide = index"
            />
          </div>
          <button
            class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-border"
            @click="nextSlide"
          >
            <ChevronRight class="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div
        :class="[
          'mt-16 text-center transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        ]"
        style="transition-delay: 800ms;"
      >
        <p class="text-muted-foreground mb-2">
          Ready to get started? It only takes
          <span class="text-primary font-semibold">30 seconds</span>
        </p>
      </div>
    </div>
  </section>
</template>
