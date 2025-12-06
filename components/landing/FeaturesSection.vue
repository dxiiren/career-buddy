<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Video, Users, Briefcase, Star, MessageCircle, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { ref } from 'vue'

const { target, isVisible } = useScrollAnimation()
const hoveredFeature = ref<number | null>(null)
const currentSlide = ref(0)

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % features.length
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + features.length) % features.length
}

const features = [
  {
    icon: FileText,
    title: 'Resume & Cover Letter',
    description: 'Professional templates with step-by-step guidance. Learn what employers actually want to see.',
    color: 'bg-primary/20 text-primary',
    gradient: 'from-primary/20 to-primary/5',
    stats: '50+ Templates',
  },
  {
    icon: Video,
    title: 'AI Interview Simulation',
    description: 'Practice with AI-powered mock interviews. Build confidence and improve your speaking skills.',
    color: 'bg-secondary/20 text-secondary',
    gradient: 'from-secondary/20 to-secondary/5',
    stats: 'AI-Powered',
  },
  {
    icon: Users,
    title: 'Networking Guides',
    description: 'Ready-to-use message templates and strategies. Learn to connect with professionals authentically.',
    color: 'bg-green-500/20 text-green-400',
    gradient: 'from-green-500/20 to-green-500/5',
    stats: '100+ Scripts',
  },
  {
    icon: Briefcase,
    title: 'Job Search Strategies',
    description: 'Navigate job platforms, negotiate salary, and avoid scams. Real advice for the Malaysian job market.',
    color: 'bg-blue-500/20 text-blue-400',
    gradient: 'from-blue-500/20 to-blue-500/5',
    stats: 'Malaysia-Focused',
  },
  {
    icon: Star,
    title: 'Self-Promotion Tools',
    description: 'Optimize your LinkedIn, build your personal brand, and learn workplace expectations.',
    color: 'bg-yellow-500/20 text-yellow-400',
    gradient: 'from-yellow-500/20 to-yellow-500/5',
    stats: 'LinkedIn Tips',
  },
  {
    icon: MessageCircle,
    title: 'Career Buddy AI Chat',
    description: 'Get instant answers to your career questions. Preloaded with common queries for quick help.',
    color: 'bg-pink-500/20 text-pink-400',
    gradient: 'from-pink-500/20 to-pink-500/5',
    stats: '24/7 Support',
  },
]
</script>

<template>
  <section id="features" ref="target" class="py-24 bg-background relative overflow-hidden">
    <!-- Background Decorations -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div class="absolute bottom-10 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Section Header -->
      <div
        :class="[
          'max-w-3xl mx-auto text-center mb-16 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        ]"
      >
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Sparkles class="h-4 w-4" />
          Everything You Need
        </div>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-6">
          <span class="text-primary">One Platform,</span>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
            Complete Preparation
          </span>
        </h2>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          From your first resume to your first job offer — we've got you covered every step of the way.
        </p>
      </div>

      <!-- Desktop Features Grid -->
      <div class="hidden sm:grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="(feature, index) in features"
          :key="feature.title"
          :class="[
            'group border-none shadow-md transition-all duration-500 cursor-pointer relative overflow-hidden',
            hoveredFeature === index ? 'shadow-2xl -translate-y-3 scale-[1.02]' : 'hover:shadow-xl hover:-translate-y-2',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ]"
          :style="{ transitionDelay: `${(index + 1) * 100}ms` }"
          @mouseenter="hoveredFeature = index"
          @mouseleave="hoveredFeature = null"
        >
          <!-- Gradient overlay on hover -->
          <div
            :class="[
              'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500',
              feature.gradient,
              hoveredFeature === index ? 'opacity-100' : 'group-hover:opacity-50',
            ]"
          />

          <CardContent class="pt-6 relative z-10">
            <!-- Icon with animation -->
            <div class="flex items-start justify-between mb-4">
              <div
                :class="[
                  'flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-500',
                  feature.color,
                  hoveredFeature === index ? 'scale-110 rotate-3' : 'group-hover:scale-110',
                ]"
              >
                <component :is="feature.icon" class="h-7 w-7" />
              </div>

              <!-- Stats Badge -->
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-medium bg-muted/80 text-muted-foreground border border-border/50 transition-all duration-300',
                  hoveredFeature === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4',
                ]"
              >
                {{ feature.stats }}
              </span>
            </div>

            <h3 class="text-xl font-semibold font-heading text-foreground mb-2 group-hover:text-primary transition-colors">
              {{ feature.title }}
            </h3>
            <p class="text-muted-foreground mb-4">
              {{ feature.description }}
            </p>

            <!-- Learn More Link -->
            <div
              :class="[
                'flex items-center text-sm font-medium text-primary transition-all duration-300',
                hoveredFeature === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4',
              ]"
            >
              Learn more
              <ArrowRight class="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Mobile Features Slider -->
      <div class="sm:hidden relative">
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-300 ease-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <Card
              v-for="(feature, index) in features"
              :key="feature.title"
              :class="[
                'flex-shrink-0 w-full border-none shadow-lg overflow-hidden',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
              ]"
            >
              <div :class="['absolute inset-0 bg-gradient-to-br opacity-30', feature.gradient]" />

              <CardContent class="pt-6 relative z-10">
                <div class="flex items-start justify-between mb-4">
                  <div :class="['flex h-14 w-14 items-center justify-center rounded-xl', feature.color]">
                    <component :is="feature.icon" class="h-7 w-7" />
                  </div>
                  <span class="px-3 py-1 rounded-full text-xs font-medium bg-muted/80 text-muted-foreground border border-border/50">
                    {{ feature.stats }}
                  </span>
                </div>

                <h3 class="text-xl font-semibold font-heading text-foreground mb-2">
                  {{ feature.title }}
                </h3>
                <p class="text-muted-foreground mb-4">
                  {{ feature.description }}
                </p>

                <div class="flex items-center text-sm font-medium text-primary">
                  Learn more
                  <ArrowRight class="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="flex items-center justify-center gap-4 mt-6">
          <button
            class="flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-md border border-border"
            @click="prevSlide"
          >
            <ChevronLeft class="h-5 w-5 text-muted-foreground" />
          </button>
          <div class="flex items-center gap-2">
            <button
              v-for="(_, index) in features"
              :key="index"
              :class="[
                'h-2 rounded-full transition-all duration-300',
                currentSlide === index ? 'w-6 bg-primary' : 'w-2 bg-primary/30',
              ]"
              @click="currentSlide = index"
            />
          </div>
          <button
            class="flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-md border border-border"
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
        <p class="text-muted-foreground mb-4">
          All features are <span class="text-primary font-semibold">completely free</span> for Malaysian youth
        </p>
        <div class="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            No credit card
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            Free forever
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            Instant access
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
