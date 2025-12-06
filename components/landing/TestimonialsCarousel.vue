<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Quote, Star, Verified, TrendingUp } from 'lucide-vue-next'

const { target, isVisible } = useScrollAnimation()

const testimonials = [
  {
    name: 'Sarah Ahmad',
    role: 'Fresh Graduate, UM',
    avatar: 'SA',
    avatarColor: 'from-pink-500 to-rose-500',
    quote: 'I was so lost before Career Buddy. Now I have a professional resume and actually feel confident going into interviews!',
    rating: 5,
    verified: true,
    outcome: 'Landed dream job at Grab',
  },
  {
    name: 'Muhammad Haziq',
    role: 'Final Year Student, UTM',
    avatar: 'MH',
    avatarColor: 'from-blue-500 to-cyan-500',
    quote: 'The AI interview practice was a game-changer. I used to freeze during interviews, but now I know exactly what to say.',
    rating: 5,
    verified: true,
    outcome: '3 job offers received',
  },
  {
    name: 'Nur Aisyah',
    role: 'Job Seeker, KL',
    avatar: 'NA',
    avatarColor: 'from-purple-500 to-violet-500',
    quote: 'Finally, career advice that makes sense for Malaysians! The networking templates helped me land 3 coffee chats.',
    rating: 5,
    verified: true,
    outcome: 'Built 50+ connections',
  },
  {
    name: 'Kevin Lee',
    role: 'Intern at Tech Company',
    avatar: 'KL',
    avatarColor: 'from-green-500 to-emerald-500',
    quote: 'Career Buddy helped me negotiate my first salary. I got RM500 more per month than the initial offer!',
    rating: 5,
    verified: true,
    outcome: '+RM500/month salary',
  },
  {
    name: 'Priya Devi',
    role: 'Career Changer',
    avatar: 'PD',
    avatarColor: 'from-orange-500 to-amber-500',
    quote: 'Switching careers felt impossible until I found Career Buddy. The step-by-step guides made everything clear.',
    rating: 5,
    verified: true,
    outcome: 'Successful career switch',
  },
]

const currentIndex = ref(0)
const isAutoPlaying = ref(true)
let autoPlayInterval: NodeJS.Timeout | null = null

const visibleTestimonials = computed(() => {
  const result = []
  for (let i = 0; i < 3; i++) {
    const index = (currentIndex.value + i) % testimonials.length
    result.push({ ...testimonials[index], originalIndex: index })
  }
  return result
})

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % testimonials.length
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + testimonials.length) % testimonials.length
}

function goToSlide(index: number) {
  currentIndex.value = index
}

function startAutoPlay() {
  if (autoPlayInterval) clearInterval(autoPlayInterval)
  autoPlayInterval = setInterval(() => {
    if (isAutoPlaying.value) {
      nextSlide()
    }
  }, 5000)
}

function pauseAutoPlay() {
  isAutoPlaying.value = false
}

function resumeAutoPlay() {
  isAutoPlaying.value = true
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  if (autoPlayInterval) clearInterval(autoPlayInterval)
})
</script>

<template>
  <section ref="target" class="py-24 gradient-bg overflow-hidden relative">
    <!-- Background Decorations -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl animate-pulse" />
      <div class="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-pulse" style="animation-delay: 1s" />
      <div class="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-500/10 rounded-full blur-xl animate-float" />
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div
        :class="[
          'max-w-3xl mx-auto text-center mb-16 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        ]"
      >
        <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 shadow-sm text-primary text-sm font-medium mb-6">
          <Star class="h-4 w-4 fill-yellow-400 text-yellow-400" />
          4.9/5 from 2,000+ reviews
        </span>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6">
          Hear From Our
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Community
          </span>
        </h2>
        <p class="text-lg text-muted-foreground">
          Join thousands of young Malaysians who've transformed their career journey with Career Buddy.
        </p>
      </div>

      <!-- Desktop Carousel Container -->
      <div
        class="hidden md:block relative"
        @mouseenter="pauseAutoPlay"
        @mouseleave="resumeAutoPlay"
      >
        <!-- Navigation Buttons -->
        <button
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border border-border transition-all hover:scale-110 hover:shadow-xl hover:bg-primary hover:text-white"
          @click="prevSlide"
        >
          <ChevronLeft class="h-6 w-6" />
        </button>
        <button
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border border-border transition-all hover:scale-110 hover:shadow-xl hover:bg-primary hover:text-white"
          @click="nextSlide"
        >
          <ChevronRight class="h-6 w-6" />
        </button>

        <!-- Cards -->
        <div
          :class="[
            'grid gap-6 md:grid-cols-3 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ]"
        >
          <Card
            v-for="(testimonial, index) in visibleTestimonials"
            :key="testimonial.originalIndex"
            :class="[
              'border-none shadow-lg transition-all duration-500 hover:shadow-2xl group relative overflow-hidden',
              index === 1 ? 'md:scale-105 md:shadow-xl bg-white' : 'md:opacity-90 hover:opacity-100 bg-white',
            ]"
          >
            <!-- Hover Gradient -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <CardContent class="pt-6 relative z-10">
              <!-- Star Rating -->
              <div class="flex items-center gap-1 mb-4">
                <Star v-for="i in 5" :key="i" class="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>

              <Quote class="h-8 w-8 text-primary/20 mb-3" />
              <p class="text-foreground mb-4 leading-relaxed">
                "{{ testimonial.quote }}"
              </p>

              <!-- Outcome Badge -->
              <div class="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-green-50 w-fit">
                <TrendingUp class="h-3.5 w-3.5 text-green-600" />
                <span class="text-xs font-medium text-green-700">{{ testimonial.outcome }}</span>
              </div>

              <div class="flex items-center gap-3 pt-4 border-t border-border/50">
                <!-- Colorful Avatar -->
                <div :class="['flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r text-white font-semibold shadow-md', testimonial.avatarColor]">
                  {{ testimonial.avatar }}
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-1.5">
                    <p class="font-semibold text-foreground">{{ testimonial.name }}</p>
                    <Verified v-if="testimonial.verified" class="h-4 w-4 text-blue-500" />
                  </div>
                  <p class="text-sm text-muted-foreground">{{ testimonial.role }}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Dots Navigation -->
        <div class="flex justify-center gap-2 mt-8">
          <button
            v-for="(_, index) in testimonials"
            :key="index"
            :class="[
              'h-2 rounded-full transition-all duration-300',
              currentIndex === index ? 'w-8 bg-primary' : 'w-2 bg-primary/30 hover:bg-primary/50',
            ]"
            @click="goToSlide(index)"
          />
        </div>
      </div>

      <!-- Mobile Slider -->
      <div class="md:hidden relative">
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-300 ease-out"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <Card
              v-for="testimonial in testimonials"
              :key="testimonial.name"
              :class="[
                'flex-shrink-0 w-full border-none shadow-lg overflow-hidden bg-white',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
              ]"
            >
              <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />

              <CardContent class="pt-6 relative z-10">
                <!-- Star Rating -->
                <div class="flex items-center gap-1 mb-4">
                  <Star v-for="i in 5" :key="i" class="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>

                <Quote class="h-8 w-8 text-primary/20 mb-3" />
                <p class="text-foreground mb-4 leading-relaxed">
                  "{{ testimonial.quote }}"
                </p>

                <!-- Outcome Badge -->
                <div class="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-green-50 w-fit">
                  <TrendingUp class="h-3.5 w-3.5 text-green-600" />
                  <span class="text-xs font-medium text-green-700">{{ testimonial.outcome }}</span>
                </div>

                <div class="flex items-center gap-3 pt-4 border-t border-border/50">
                  <div :class="['flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r text-white font-semibold shadow-md', testimonial.avatarColor]">
                    {{ testimonial.avatar }}
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-1.5">
                      <p class="font-semibold text-foreground">{{ testimonial.name }}</p>
                      <Verified v-if="testimonial.verified" class="h-4 w-4 text-blue-500" />
                    </div>
                    <p class="text-sm text-muted-foreground">{{ testimonial.role }}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
              v-for="(_, index) in testimonials"
              :key="index"
              :class="[
                'h-2 rounded-full transition-all duration-300',
                currentIndex === index ? 'w-6 bg-primary' : 'w-2 bg-primary/30',
              ]"
              @click="goToSlide(index)"
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

      <!-- Trust Stats -->
      <div
        :class="[
          'mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        ]"
        style="transition-delay: 400ms;"
      >
        <div class="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm">
          <p class="text-3xl font-bold text-primary mb-1">5,000+</p>
          <p class="text-sm text-muted-foreground">Active Users</p>
        </div>
        <div class="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm">
          <p class="text-3xl font-bold text-secondary mb-1">94%</p>
          <p class="text-sm text-muted-foreground">Success Rate</p>
        </div>
        <div class="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm">
          <p class="text-3xl font-bold text-green-600 mb-1">2,000+</p>
          <p class="text-sm text-muted-foreground">Jobs Landed</p>
        </div>
        <div class="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm">
          <p class="text-3xl font-bold text-orange-500 mb-1">4.9/5</p>
          <p class="text-sm text-muted-foreground">User Rating</p>
        </div>
      </div>
    </div>
  </section>
</template>
