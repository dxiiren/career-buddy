<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Search, MapPin, Frown } from 'lucide-vue-next'

const { target, isVisible } = useScrollAnimation()

const painPoints = [
  {
    icon: Search,
    title: 'Information Overload',
    description: 'Career advice scattered across TikTok, Instagram, LinkedIn, and countless websites — no clear starting point.',
  },
  {
    icon: MapPin,
    title: 'No Clear Roadmap',
    description: 'Everyone says different things. Should you update your LinkedIn first? Write a resume? Learn to network?',
  },
  {
    icon: Frown,
    title: 'Feeling Lost & Anxious',
    description: 'The pressure to "figure it out" while watching peers land jobs makes the whole process feel overwhelming.',
  },
]
</script>

<template>
  <section ref="target" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div
        :class="[
          'max-w-3xl mx-auto text-center mb-16 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        ]"
      >
        <h2 class="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
          We Know Job Hunting Feels
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Overwhelming
          </span>
        </h2>
        <p class="text-lg text-muted-foreground">
          You're not alone. Most young adults face these exact challenges when starting their career journey.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <Card
          v-for="(point, index) in painPoints"
          :key="point.title"
          :class="[
            'border-none shadow-lg transition-all duration-700 hover:-translate-y-1',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ]"
          :style="{ transitionDelay: `${(index + 1) * 150}ms` }"
        >
          <CardContent class="pt-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-warm-50 mb-4">
              <component :is="point.icon" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="text-xl font-semibold font-heading text-foreground mb-2">
              {{ point.title }}
            </h3>
            <p class="text-muted-foreground">
              {{ point.description }}
            </p>
          </CardContent>
        </Card>
      </div>

      <div
        :class="[
          'mt-12 text-center transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        ]"
        style="transition-delay: 600ms;"
      >
        <p class="text-lg font-medium text-foreground">
          That's why we built
          <span class="text-primary">Career Buddy</span>
          — to bring everything together in one place.
        </p>
      </div>
    </div>
  </section>
</template>
