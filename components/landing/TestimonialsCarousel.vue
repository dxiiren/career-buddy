<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-vue-next'

const { target, isVisible } = useScrollAnimation()

const testimonials = [
  {
    name: 'Sarah Ahmad',
    role: 'Fresh Graduate, UM',
    image: '/images/avatar-1.jpg',
    quote: 'I was so lost before Career Buddy. Now I have a professional resume and actually feel confident going into interviews!',
  },
  {
    name: 'Muhammad Haziq',
    role: 'Final Year Student, UTM',
    image: '/images/avatar-2.jpg',
    quote: 'The AI interview practice was a game-changer. I used to freeze during interviews, but now I know exactly what to say.',
  },
  {
    name: 'Nur Aisyah',
    role: 'Job Seeker, KL',
    image: '/images/avatar-3.jpg',
    quote: 'Finally, career advice that makes sense for Malaysians! The networking templates helped me land 3 coffee chats.',
  },
  {
    name: 'Kevin Lee',
    role: 'Intern at Tech Company',
    image: '/images/avatar-4.jpg',
    quote: 'Career Buddy helped me negotiate my first salary. I got RM500 more per month than the initial offer!',
  },
  {
    name: 'Priya Devi',
    role: 'Career Changer',
    image: '/images/avatar-5.jpg',
    quote: 'Switching careers felt impossible until I found Career Buddy. The step-by-step guides made everything clear.',
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
  <section ref="target" class="py-20 gradient-bg overflow-hidden">
    <div class="container mx-auto px-4">
      <div
        :class="[
          'max-w-3xl mx-auto text-center mb-16 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        ]"
      >
        <span class="inline-block px-4 py-1.5 rounded-full bg-white/80 text-primary text-sm font-medium mb-4">
          Success Stories
        </span>
        <h2 class="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
          Hear From Our
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Community
          </span>
        </h2>
        <p class="text-lg text-muted-foreground">
          Join thousands of young Malaysians who've transformed their career journey with Career Buddy.
        </p>
      </div>

      <!-- Carousel Container -->
      <div
        class="relative"
        @mouseenter="pauseAutoPlay"
        @mouseleave="resumeAutoPlay"
      >
        <!-- Navigation Buttons -->
        <button
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border border-border transition-all hover:scale-110 hover:shadow-xl hidden md:flex"
          @click="prevSlide"
        >
          <ChevronLeft class="h-6 w-6 text-foreground" />
        </button>
        <button
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border border-border transition-all hover:scale-110 hover:shadow-xl hidden md:flex"
          @click="nextSlide"
        >
          <ChevronRight class="h-6 w-6 text-foreground" />
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
              'border-none shadow-lg transition-all duration-500',
              index === 1 ? 'md:scale-105 md:shadow-xl' : 'md:opacity-80',
            ]"
          >
            <CardContent class="pt-6">
              <Quote class="h-8 w-8 text-primary/20 mb-4" />
              <p class="text-foreground mb-6 leading-relaxed">
                "{{ testimonial.quote }}"
              </p>
              <div class="flex items-center gap-3">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold">
                  {{ testimonial.name.charAt(0) }}
                </div>
                <div>
                  <p class="font-semibold text-foreground">{{ testimonial.name }}</p>
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
    </div>
  </section>
</template>
