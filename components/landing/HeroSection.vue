<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Sparkles, CheckCircle2, Users, Award, TrendingUp } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'

// Animated counter for stats
const usersCount = ref(0)
const successRate = ref(0)

onMounted(() => {
  // Animate counters
  const animateCounter = (target: number, setter: (val: number) => void, duration: number) => {
    const start = 0
    const increment = target / (duration / 16)
    let current = start
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setter(target)
        clearInterval(timer)
      } else {
        setter(Math.floor(current))
      }
    }, 16)
  }

  setTimeout(() => {
    animateCounter(5000, (v) => usersCount.value = v, 2000)
    animateCounter(94, (v) => successRate.value = v, 1500)
  }, 500)
})
</script>

<template>
  <section class="relative gradient-bg overflow-hidden pt-16 pb-20">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Gradient Orbs -->
      <div class="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style="animation-delay: 1s;" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <!-- Floating Icons -->
      <div class="absolute top-32 left-[15%] animate-bounce-slow opacity-20">
        <div class="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <Award class="w-6 h-6 text-primary" />
        </div>
      </div>
      <div class="absolute top-48 right-[20%] animate-bounce-slow opacity-20" style="animation-delay: 0.5s;">
        <div class="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <TrendingUp class="w-5 h-5 text-secondary" />
        </div>
      </div>
      <div class="absolute bottom-40 left-[25%] animate-bounce-slow opacity-20" style="animation-delay: 1s;">
        <div class="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <CheckCircle2 class="w-7 h-7 text-green-500" />
        </div>
      </div>

      <!-- Grid Pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    </div>

    <div class="container mx-auto px-4 py-20 md:py-28 relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left Content -->
        <div class="text-center lg:text-left">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border mb-8 animate-fade-up hover:bg-muted transition-colors cursor-default">
            <Sparkles class="h-4 w-4 text-primary animate-pulse" />
            <span class="text-sm font-medium text-foreground/80">Free for all Malaysian youth</span>
            <span class="px-2 py-0.5 text-xs font-semibold bg-primary/20 text-primary rounded-full">New</span>
          </div>

          <!-- Headline -->
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 animate-fade-up" style="animation-delay: 0.1s;">
            <span class="text-primary">Your Career Journey</span>
            <span class="relative">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                Starts Here
              </span>
              <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 10C50 2 150 2 198 10" stroke="url(#gradient)" stroke-width="3" stroke-linecap="round" class="animate-draw" />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="hsl(var(--primary))" />
                    <stop offset="100%" stop-color="hsl(var(--secondary))" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <!-- Subheadline -->
          <p class="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-up" style="animation-delay: 0.2s;">
            Stop scrolling through endless TikToks and confusing advice. Career Buddy brings everything you need into one supportive platform.
          </p>

          <!-- Feature Pills -->
          <div class="flex flex-wrap justify-center lg:justify-start gap-3 mb-8 animate-fade-up" style="animation-delay: 0.25s;">
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 backdrop-blur-sm text-sm text-muted-foreground border border-border hover:bg-muted transition-colors cursor-default">
              <CheckCircle2 class="h-4 w-4 text-primary" />
              Resume Templates
            </span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 backdrop-blur-sm text-sm text-muted-foreground border border-border hover:bg-muted transition-colors cursor-default">
              <CheckCircle2 class="h-4 w-4 text-primary" />
              AI Interview Prep
            </span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 backdrop-blur-sm text-sm text-muted-foreground border border-border hover:bg-muted transition-colors cursor-default">
              <CheckCircle2 class="h-4 w-4 text-primary" />
              Networking Guides
            </span>
          </div>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-up" style="animation-delay: 0.3s;">
            <Button size="lg" class="w-full sm:w-auto group relative overflow-hidden">
              <span class="relative z-10 flex items-center">
                Get Started Free
                <ArrowRight class="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] group-hover:animate-shimmer" />
            </Button>
            <Button variant="outline" size="lg" class="w-full sm:w-auto group bg-muted/50 backdrop-blur-sm border-border hover:bg-muted text-foreground">
              <Play class="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          <!-- Mini Stats -->
          <div class="flex items-center justify-center lg:justify-start gap-8 mt-10 animate-fade-up" style="animation-delay: 0.4s;">
            <div class="text-center lg:text-left">
              <div class="text-2xl font-bold text-foreground">{{ usersCount.toLocaleString() }}+</div>
              <div class="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div class="w-px h-10 bg-border" />
            <div class="text-center lg:text-left">
              <div class="text-2xl font-bold text-foreground">{{ successRate }}%</div>
              <div class="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div class="w-px h-10 bg-border hidden sm:block" />
            <div class="text-center lg:text-left hidden sm:block">
              <div class="text-2xl font-bold text-foreground">4.9/5</div>
              <div class="text-sm text-muted-foreground">User Rating</div>
            </div>
          </div>
        </div>

        <!-- Right Content - Hero Illustration -->
        <div class="relative animate-fade-up hidden lg:block" style="animation-delay: 0.2s;">
          <!-- Main Illustration Card -->
          <div class="relative">
            <!-- Floating Cards Around Main Image -->
            <div class="absolute -top-4 -left-4 bg-card/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 animate-float z-10 border border-border">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <CheckCircle2 class="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div class="text-sm font-semibold text-foreground">Resume Ready!</div>
                  <div class="text-xs text-muted-foreground">ATS-Optimized</div>
                </div>
              </div>
            </div>

            <div class="absolute -bottom-4 -right-4 bg-card/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 animate-float z-10 border border-border" style="animation-delay: 0.5s;">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <TrendingUp class="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div class="text-sm font-semibold text-foreground">Interview Score</div>
                  <div class="text-xs text-green-500 font-medium">92% Confidence</div>
                </div>
              </div>
            </div>

            <div class="absolute top-1/2 -right-8 bg-card/90 backdrop-blur-sm rounded-2xl shadow-xl p-3 animate-float z-10 border border-border" style="animation-delay: 1s;">
              <div class="flex items-center gap-2">
                <div class="flex -space-x-2">
                  <div class="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-semibold text-primary">S</div>
                  <div class="w-8 h-8 rounded-full bg-secondary/20 border-2 border-background flex items-center justify-center text-xs font-semibold text-secondary">M</div>
                  <div class="w-8 h-8 rounded-full bg-green-500/20 border-2 border-background flex items-center justify-center text-xs font-semibold text-green-400">+5k</div>
                </div>
              </div>
            </div>

            <!-- Main Illustration -->
            <div class="relative bg-gradient-to-br from-card to-card/80 rounded-3xl shadow-2xl p-8 border border-border">
              <!-- Mock Dashboard UI -->
              <div class="space-y-4">
                <!-- Header -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-red-400" />
                    <div class="w-3 h-3 rounded-full bg-yellow-400" />
                    <div class="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div class="text-xs text-muted-foreground">Career Buddy Dashboard</div>
                </div>

                <!-- Progress Section -->
                <div class="bg-muted/50 rounded-xl p-4 border border-border">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-sm font-medium text-foreground">Your Progress</span>
                    <span class="text-xs text-primary font-semibold">75% Complete</span>
                  </div>
                  <div class="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-progress" style="width: 75%;" />
                  </div>
                </div>

                <!-- Quick Actions -->
                <div class="grid grid-cols-2 gap-3">
                  <div class="bg-primary/10 rounded-xl p-3 hover:bg-primary/20 transition-colors cursor-pointer group border border-primary/20">
                    <div class="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <svg class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div class="text-xs font-medium text-foreground">Resume</div>
                  </div>
                  <div class="bg-secondary/10 rounded-xl p-3 hover:bg-secondary/20 transition-colors cursor-pointer group border border-secondary/20">
                    <div class="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <svg class="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div class="text-xs font-medium text-foreground">Interview</div>
                  </div>
                </div>

                <!-- Recent Activity -->
                <div class="bg-muted/50 rounded-xl p-3 border border-border">
                  <div class="text-xs text-muted-foreground mb-2">Recent Activity</div>
                  <div class="space-y-2">
                    <div class="flex items-center gap-2 text-xs">
                      <div class="w-2 h-2 rounded-full bg-green-500" />
                      <span class="text-foreground">Completed Resume Review</span>
                    </div>
                    <div class="flex items-center gap-2 text-xs">
                      <div class="w-2 h-2 rounded-full bg-primary" />
                      <span class="text-foreground">Started Interview Practice</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Bottom Wave -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" class="fill-card"/>
      </svg>
    </div>
  </section>
</template>

<style scoped>
@keyframes draw {
  from {
    stroke-dasharray: 200;
    stroke-dashoffset: 200;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.animate-draw {
  animation: draw 1s ease-out forwards;
  animation-delay: 0.5s;
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
}

@keyframes progress {
  from {
    width: 0%;
  }
  to {
    width: 75%;
  }
}

.animate-progress {
  animation: progress 1.5s ease-out forwards;
  animation-delay: 0.8s;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.group-hover\:animate-shimmer {
  animation: shimmer 2s linear infinite;
}
</style>
