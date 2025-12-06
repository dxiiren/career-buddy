<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Video, Users, Briefcase, Star, MessageCircle } from 'lucide-vue-next'

const { target, isVisible } = useScrollAnimation()

const features = [
  {
    icon: FileText,
    title: 'Resume & Cover Letter',
    description: 'Professional templates with step-by-step guidance. Learn what employers actually want to see.',
    color: 'bg-warm-50 text-primary',
  },
  {
    icon: Video,
    title: 'AI Interview Simulation',
    description: 'Practice with AI-powered mock interviews. Build confidence and improve your speaking skills.',
    color: 'bg-lavender-50 text-secondary',
  },
  {
    icon: Users,
    title: 'Networking Guides',
    description: 'Ready-to-use message templates and strategies. Learn to connect with professionals authentically.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Briefcase,
    title: 'Job Search Strategies',
    description: 'Navigate job platforms, negotiate salary, and avoid scams. Real advice for the Malaysian job market.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Star,
    title: 'Self-Promotion Tools',
    description: 'Optimize your LinkedIn, build your personal brand, and learn workplace expectations.',
    color: 'bg-yellow-50 text-yellow-600',
  },
  {
    icon: MessageCircle,
    title: 'Career Buddy AI Chat',
    description: 'Get instant answers to your career questions. Preloaded with common queries for quick help.',
    color: 'bg-pink-50 text-pink-600',
  },
]
</script>

<template>
  <section id="features" ref="target" class="py-20 bg-muted/30">
    <div class="container mx-auto px-4">
      <div
        :class="[
          'max-w-3xl mx-auto text-center mb-16 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        ]"
      >
        <span class="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          Everything You Need
        </span>
        <h2 class="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
          One Platform,
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Complete Preparation
          </span>
        </h2>
        <p class="text-lg text-muted-foreground">
          From your first resume to your first job offer — we've got you covered every step of the way.
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="(feature, index) in features"
          :key="feature.title"
          :class="[
            'group border-none shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-2',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ]"
          :style="{ transitionDelay: `${(index + 1) * 100}ms` }"
        >
          <CardContent class="pt-6">
            <div
              :class="[
                'flex h-14 w-14 items-center justify-center rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110',
                feature.color,
              ]"
            >
              <component :is="feature.icon" class="h-7 w-7" />
            </div>
            <h3 class="text-xl font-semibold font-heading text-foreground mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-muted-foreground">
              {{ feature.description }}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
