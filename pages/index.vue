<script setup lang="ts">
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
    <LandingHeroSection />
    <LandingTrustBadgesSection />
    <LandingProblemSection />
    <LandingFeaturesSection />
    <LandingHowItWorksSection />
    <LandingTestimonialsCarousel />
    <LandingFaqSection />
    <LandingCtaFooter />
  </div>
</template>
