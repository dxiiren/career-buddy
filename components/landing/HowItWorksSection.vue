<script setup lang="ts">
import { UserPlus, Target, Rocket } from 'lucide-vue-next'

const { target, isVisible } = useScrollAnimation()

const steps = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Sign Up Free',
    description: 'Create your account in seconds. No credit card required, free forever for Malaysian youth.',
  },
  {
    icon: Target,
    number: '02',
    title: 'Choose Your Focus',
    description: 'Tell us where you are in your journey. We\'ll personalise your dashboard with relevant resources.',
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Start Preparing',
    description: 'Access guides, templates, and AI tools. Track your progress and build confidence step by step.',
  },
]
</script>

<template>
  <section id="how-it-works" ref="target" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div
        :class="[
          'max-w-3xl mx-auto text-center mb-16 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        ]"
      >
        <span class="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
          Simple Process
        </span>
        <h2 class="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
          How Career Buddy
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Works
          </span>
        </h2>
        <p class="text-lg text-muted-foreground">
          Get started in minutes. No complicated setup, just straightforward career preparation.
        </p>
      </div>

      <!-- Steps Container -->
      <div class="relative">
        <!-- Connection Line (Desktop) -->
        <div class="hidden lg:block absolute top-24 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-20" />

        <div class="grid gap-8 lg:grid-cols-3">
          <div
            v-for="(step, index) in steps"
            :key="step.number"
            :class="[
              'relative text-center transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            ]"
            :style="{ transitionDelay: `${(index + 1) * 200}ms` }"
          >
            <!-- Step Number Badge -->
            <div class="relative inline-flex items-center justify-center mb-6">
              <div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 blur-xl scale-150" />
              <div class="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg border border-border">
                <component :is="step.icon" class="h-8 w-8 text-primary" />
              </div>
              <span class="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold">
                {{ step.number }}
              </span>
            </div>

            <h3 class="text-xl font-semibold font-heading text-foreground mb-3">
              {{ step.title }}
            </h3>
            <p class="text-muted-foreground max-w-xs mx-auto">
              {{ step.description }}
            </p>

            <!-- Arrow (Desktop) -->
            <div
              v-if="index < steps.length - 1"
              class="hidden lg:block absolute top-24 -right-4 transform translate-x-1/2"
            >
              <svg class="w-8 h-8 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
