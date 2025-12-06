<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Search, MapPin, Frown, AlertCircle, ArrowRight, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const { target, isVisible } = useScrollAnimation()
const hoveredCard = ref<number | null>(null)
const currentSlide = ref(0)

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % painPoints.length
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + painPoints.length) % painPoints.length
}

const painPoints = [
  {
    icon: Search,
    title: 'Information Overload',
    description: 'Career advice scattered across TikTok, Instagram, LinkedIn, and countless websites — no clear starting point.',
    color: 'text-primary',
    accentColor: '#E3B23C',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/30',
    stat: '73%',
    statLabel: 'feel overwhelmed',
  },
  {
    icon: MapPin,
    title: 'No Clear Roadmap',
    description: 'Everyone says different things. Should you update your LinkedIn first? Write a resume? Learn to network?',
    color: 'text-secondary',
    accentColor: '#2B5F8A',
    bgColor: 'bg-secondary/10',
    borderColor: 'border-secondary/30',
    stat: '68%',
    statLabel: 'lack direction',
  },
  {
    icon: Frown,
    title: 'Feeling Lost & Anxious',
    description: 'The pressure to "figure it out" while watching peers land jobs makes the whole process feel overwhelming.',
    color: 'text-red-400',
    accentColor: '#ef4444',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    stat: '82%',
    statLabel: 'feel stressed',
  },
]
</script>

<template>
  <section id="challenges" ref="target" class="py-24 bg-gradient-to-b from-background to-card relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div class="absolute bottom-20 left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div
        :class="[
          'max-w-3xl mx-auto text-center mb-16 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        ]"
      >
        <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-6 border border-red-500/20">
          <AlertCircle class="h-4 w-4" />
          The Challenge
        </span>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-6">
          <span class="text-primary">We Know Job Hunting Feels</span>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-red-400">
            Overwhelming
          </span>
        </h2>
        <p class="text-lg text-muted-foreground">
          You're not alone. Most young adults face these exact challenges when starting their career journey.
        </p>
      </div>

      <!-- Desktop Grid -->
      <div class="hidden md:grid gap-6 md:grid-cols-3">
        <Card
          v-for="(point, index) in painPoints"
          :key="point.title"
          :class="[
            'border-2 shadow-lg transition-all duration-500 group cursor-pointer overflow-hidden',
            hoveredCard === index ? `${point.borderColor} shadow-xl -translate-y-2` : 'border-transparent hover:shadow-xl',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ]"
          :style="{ transitionDelay: `${(index + 1) * 150}ms` }"
          @mouseenter="hoveredCard = index"
          @mouseleave="hoveredCard = null"
        >
          <CardContent class="pt-6 relative">
            <!-- Hover Background -->
            <div
              :class="[
                'absolute inset-0 transition-opacity duration-300',
                point.bgColor,
                hoveredCard === index ? 'opacity-30' : 'opacity-0',
              ]"
            />

            <div class="relative z-10">
              <!-- Icon and Stat -->
              <div class="flex items-start justify-between mb-4">
                <div
                  :class="[
                    'flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300',
                    point.bgColor,
                    hoveredCard === index ? 'scale-110' : '',
                  ]"
                >
                  <component :is="point.icon" :class="['h-7 w-7', point.color]" />
                </div>
                <div
                  :class="[
                    'text-right transition-all duration-300',
                    hoveredCard === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4',
                  ]"
                >
                  <p :class="['text-2xl font-bold', point.color]">{{ point.stat }}</p>
                  <p class="text-xs text-muted-foreground">{{ point.statLabel }}</p>
                </div>
              </div>

              <h3 class="text-xl font-semibold font-heading text-foreground mb-3 group-hover:text-foreground transition-colors">
                {{ point.title }}
              </h3>
              <p class="text-muted-foreground mb-4">
                {{ point.description }}
              </p>

              <!-- Visual indicator -->
              <div class="flex items-center gap-2">
                <div class="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    :class="[
                      'h-full rounded-full transition-all duration-700',
                      point.bgColor,
                      isVisible ? 'w-full' : 'w-0',
                    ]"
                    :style="{ backgroundColor: point.accentColor, transitionDelay: `${(index + 1) * 200}ms` }"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Mobile Slider -->
      <div class="md:hidden relative">
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-300 ease-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <Card
              v-for="(point, index) in painPoints"
              :key="point.title"
              :class="[
                'flex-shrink-0 w-full border-2 shadow-lg overflow-hidden',
                point.borderColor,
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
              ]"
            >
              <CardContent class="pt-6 relative">
                <div :class="['absolute inset-0 opacity-20', point.bgColor]" />

                <div class="relative z-10">
                  <div class="flex items-start justify-between mb-4">
                    <div :class="['flex h-14 w-14 items-center justify-center rounded-xl', point.bgColor]">
                      <component :is="point.icon" :class="['h-7 w-7', point.color]" />
                    </div>
                    <div class="text-right">
                      <p :class="['text-2xl font-bold', point.color]">{{ point.stat }}</p>
                      <p class="text-xs text-muted-foreground">{{ point.statLabel }}</p>
                    </div>
                  </div>

                  <h3 class="text-xl font-semibold font-heading text-foreground mb-3">
                    {{ point.title }}
                  </h3>
                  <p class="text-muted-foreground mb-4">
                    {{ point.description }}
                  </p>

                  <div class="flex items-center gap-2">
                    <div class="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        :class="['h-full rounded-full w-full', point.bgColor]"
                        :style="{ backgroundColor: point.accentColor }"
                      />
                    </div>
                  </div>
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
              v-for="(_, index) in painPoints"
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

      <!-- Solution Transition -->
      <div
        :class="[
          'mt-16 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        ]"
        style="transition-delay: 600ms;"
      >
        <div class="flex flex-col items-center">
          <!-- Arrow Down Animation -->
          <div class="mb-6 animate-bounce">
            <div class="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>

          <div class="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <Lightbulb class="h-5 w-5 text-primary" />
            <p class="text-lg font-medium text-foreground">
              That's why we built
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-bold">Career Buddy</span>
            </p>
            <ArrowRight class="h-5 w-5 text-secondary" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
