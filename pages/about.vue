<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Sparkles,
  Heart,
  Users,
  Lightbulb,
  Rocket,
  ArrowRight,
  Target,
  Shield,
  Award,
  TrendingUp,
} from 'lucide-vue-next'

// SEO
useSeo({
  title: 'About Us',
  description: 'Learn about Career Buddy - the all-in-one career preparation platform helping Malaysian youth navigate their career journey.',
  keywords: 'about career buddy, career platform Malaysia, youth career support',
})

// Structured data
const breadcrumbSchema = useBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: 'About Us', item: '/about' },
])

const values = [
  {
    icon: Heart,
    title: 'Accessibility',
    description: 'Free for all Malaysian youth aged 18-30. We believe career preparation should be accessible to everyone.',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
  {
    icon: Lightbulb,
    title: 'Empowerment',
    description: 'We give you the tools and knowledge, not just advice. Take control of your career journey.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Join thousands of young Malaysians supporting each other on their career paths.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'AI-powered guidance and modern tools designed for the future of work.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
]

const stats = []
</script>

<template>
  <div>
    <!-- Structured Data -->
    <SeoJsonLd :schema="breadcrumbSchema" />

    <!-- Hero Section -->
    <section class="relative gradient-bg overflow-hidden pt-24 pb-16">
      <!-- Background Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style="animation-delay: 1s;" />
        <div class="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <!-- Breadcrumbs -->
        <SharedBreadcrumbs />

        <div class="max-w-3xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border mb-8">
            <Sparkles class="h-4 w-4 text-primary" />
            <span class="text-sm font-medium">Our Story</span>
          </div>

          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
            About <span class="text-primary">Career Buddy</span>
          </h1>

          <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering Malaysian youth to navigate their career journey with confidence, clarity, and the right tools.
          </p>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-20 bg-card">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Target class="h-4 w-4" />
                Our Mission
              </div>
              <h2 class="text-3xl md:text-4xl font-bold font-heading mb-6">
                Making Career Preparation <span class="text-primary">Simple</span>
              </h2>
              <p class="text-muted-foreground mb-4">
                We started Career Buddy because we understood the struggle. As young Malaysians ourselves, we experienced firsthand how overwhelming job hunting can be - endless TikTok advice, confusing resume templates, and no clear roadmap.
              </p>
              <p class="text-muted-foreground">
                That's why we built a platform that brings everything together in one supportive space. From resume building to interview preparation, from job search strategies to networking guides - Career Buddy is your all-in-one career companion.
              </p>
            </div>
            <div class="relative">
              <div class="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8">
                <div class="bg-card rounded-2xl p-6 shadow-xl border border-border">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Shield class="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div class="font-semibold">Our Promise</div>
                      <div class="text-sm text-muted-foreground">To every young Malaysian</div>
                    </div>
                  </div>
                  <ul class="space-y-3">
                    <li class="flex items-center gap-2 text-sm">
                      <div class="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg class="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Always free to use</span>
                    </li>
                    <li class="flex items-center gap-2 text-sm">
                      <div class="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg class="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Designed for Malaysian context</span>
                    </li>
                    <li class="flex items-center gap-2 text-sm">
                      <div class="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg class="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Continuously improving</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold font-heading mb-4">
            Our <span class="text-primary">Values</span>
          </h2>
          <p class="text-muted-foreground max-w-2xl mx-auto">
            These core principles guide everything we do at Career Buddy
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div
            v-for="value in values"
            :key="value.title"
            class="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
          >
            <div :class="[value.bgColor, 'w-12 h-12 rounded-xl flex items-center justify-center mb-4']">
              <component :is="value.icon" :class="[value.color, 'w-6 h-6']" />
            </div>
            <h3 class="font-semibold font-heading text-lg mb-2">{{ value.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-card">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold font-heading mb-4">
              Trusted by <span class="text-primary">Thousands</span>
            </h2>
            <p class="text-muted-foreground">
              Join the growing community of young Malaysians preparing for their dream careers
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="text-center p-6 rounded-2xl bg-background border border-border"
            >
              <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <component :is="stat.icon" class="w-6 h-6 text-primary" />
              </div>
              <div class="text-3xl md:text-4xl font-bold text-primary mb-2">{{ stat.value }}</div>
              <div class="text-muted-foreground">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold font-heading mb-6">
            Ready to Start Your <span class="text-primary">Career Journey</span>?
          </h2>
          <p class="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of young Malaysians who are already preparing for their dream careers with Career Buddy.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NuxtLink to="/register">
              <Button size="lg" class="w-full sm:w-auto group">
                Get Started Free
                <ArrowRight class="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </NuxtLink>
            <NuxtLink to="/">
              <Button variant="outline" size="lg" class="w-full sm:w-auto">
                Learn More
              </Button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
