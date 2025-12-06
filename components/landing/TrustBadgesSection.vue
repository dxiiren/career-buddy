<script setup lang="ts">
import { Shield, Award, Users, Star } from 'lucide-vue-next'

const { target, isVisible } = useScrollAnimation()

const stats = [
  { value: '5,000+', label: 'Active Users', icon: Users },
  { value: '94%', label: 'Success Rate', icon: Award },
  { value: '4.9/5', label: 'User Rating', icon: Star },
  { value: '100%', label: 'Free Forever', icon: Shield },
]

const universities = [
  { abbr: 'UM', name: 'Universiti Malaya', url: 'https://www.um.edu.my/', logo: '/images/universities/um.png' },
  { abbr: 'UTM', name: 'Universiti Teknologi Malaysia', url: 'https://www.utm.my/', logo: '/images/universities/utm.png' },
  { abbr: 'UPM', name: 'Universiti Putra Malaysia', url: 'https://www.upm.edu.my/', logo: '/images/universities/upm.png' },
  { abbr: 'USM', name: 'Universiti Sains Malaysia', url: 'https://www.usm.my/', logo: '/images/universities/usm.png' },
  { abbr: 'UKM', name: 'Universiti Kebangsaan Malaysia', url: 'https://www.ukm.my/', logo: '/images/universities/ukm.png' },
  { abbr: 'UiTM', name: 'Universiti Teknologi MARA', url: 'https://www.uitm.edu.my/', logo: '/images/universities/uitm.png' },
]
</script>

<template>
  <section ref="target" class="py-8 bg-card border-y border-border/30">
    <div class="container mx-auto px-4">
      <!-- Compact single row layout -->
      <div
        :class="[
          'flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        ]"
      >
        <!-- Stats -->
        <div class="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="flex items-center gap-2 text-center"
            :style="{ transitionDelay: `${index * 50}ms` }"
          >
            <component :is="stat.icon" class="h-4 w-4 text-primary hidden sm:block" />
            <div>
              <span class="text-lg font-bold text-foreground">{{ stat.value }}</span>
              <span class="text-xs text-muted-foreground ml-1">{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="hidden md:block w-px h-8 bg-border" />

        <!-- Universities -->
        <div class="flex items-center gap-4">
          <span class="text-xs text-muted-foreground whitespace-nowrap">Trusted by students from</span>
          <div class="flex items-center gap-3">
            <a
              v-for="uni in universities"
              :key="uni.abbr"
              :href="uni.url"
              target="_blank"
              rel="noopener noreferrer"
              :title="uni.name"
              class="group transition-all duration-200 hover:scale-105 grayscale hover:grayscale-0 opacity-70 hover:opacity-100"
            >
              <div class="h-10 w-10 rounded-xl bg-background border border-border/50 flex items-center justify-center p-1.5 group-hover:border-primary/30 group-hover:shadow-sm transition-all">
                <img
                  :src="uni.logo"
                  :alt="uni.name"
                  class="h-full w-full object-contain"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
