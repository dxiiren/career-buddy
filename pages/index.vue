<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isPageLoading = ref(true)

onMounted(() => {
  // Simulate initial page load
  setTimeout(() => {
    isPageLoading.value = false
  }, 1000)
})

useHead({
  title: 'Career Buddy - Your Career Journey Starts Here',
  meta: [
    {
      name: 'description',
      content: 'Career Buddy is your all-in-one career preparation platform. Get resume templates, AI interview practice, networking guides, and job search strategies tailored for young adults aged 18-30.',
    },
    {
      name: 'keywords',
      content: 'career preparation, resume templates, interview practice, job search, networking, Malaysian youth, career buddy',
    },
    {
      property: 'og:title',
      content: 'Career Buddy - Your Career Journey Starts Here',
    },
    {
      property: 'og:description',
      content: 'Stop scrolling through endless career advice. Career Buddy brings everything you need into one supportive platform.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
})
</script>

<template>
  <div>
    <!-- Skeleton Loading -->
    <div v-if="isPageLoading" class="min-h-screen">
      <!-- Hero Skeleton -->
      <div class="gradient-bg pt-16 pb-20">
        <div class="container mx-auto px-4 py-20">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="space-y-6">
              <Skeleton class="h-8 w-48 rounded-full" />
              <Skeleton class="h-16 w-full max-w-lg" />
              <Skeleton class="h-6 w-full max-w-md" />
              <div class="flex gap-4">
                <Skeleton class="h-12 w-40 rounded-lg" />
                <Skeleton class="h-12 w-36 rounded-lg" />
              </div>
              <div class="flex gap-8 pt-4">
                <Skeleton class="h-12 w-24" />
                <Skeleton class="h-12 w-24" />
                <Skeleton class="h-12 w-24" />
              </div>
            </div>
            <div class="hidden lg:block">
              <Skeleton class="h-96 w-full rounded-3xl" />
            </div>
          </div>
        </div>
      </div>

      <!-- Trust Badges Skeleton -->
      <div class="py-12 bg-card">
        <div class="container mx-auto px-4">
          <div class="flex justify-center gap-8">
            <Skeleton class="h-8 w-32" />
            <Skeleton class="h-8 w-32" />
            <Skeleton class="h-8 w-32" />
            <Skeleton class="h-8 w-32" />
          </div>
        </div>
      </div>

      <!-- Features Skeleton -->
      <div class="py-20">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <Skeleton class="h-10 w-64 mx-auto mb-4" />
            <Skeleton class="h-6 w-96 mx-auto" />
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            <Skeleton class="h-64 rounded-2xl" />
            <Skeleton class="h-64 rounded-2xl" />
            <Skeleton class="h-64 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>

    <!-- Actual Content -->
    <div v-else>
      <LandingHeroSection />
      <LandingTrustBadgesSection />
      <LandingProblemSection />
      <LandingFeaturesSection />
      <LandingHowItWorksSection />
      <!-- <LandingFaqSection /> -->
      <LandingCtaFooter />
    </div>
  </div>
</template>
