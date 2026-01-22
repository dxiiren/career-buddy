<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isPageLoading = ref(true)

onMounted(() => {
  // Simulate initial page load
  setTimeout(() => {
    isPageLoading.value = false
  }, 1000)
})

// SEO
useSeo({
  title: 'Career Buddy - Your Career Journey Starts Here',
  description: 'Career Buddy is your all-in-one career preparation platform. Get resume templates, AI interview practice, networking guides, and job search strategies tailored for young adults aged 18-30.',
  keywords: 'career preparation, resume templates, interview practice, job search, networking, Malaysian youth, career buddy',
})

// FAQ data for structured data
const faqs = [
  {
    question: 'Is Career Buddy completely free?',
    answer: 'Yes! Career Buddy is free for all Malaysian youth aged 18-30. We believe everyone deserves access to quality career preparation resources, regardless of their financial situation.',
  },
  {
    question: 'Who is Career Buddy for?',
    answer: 'Career Buddy is designed for young adults aged 18-30 who are preparing to enter the workforce or looking to advance their careers. Whether you\'re a university student, fresh graduate, or someone looking to switch careers, our platform has resources tailored for you.',
  },
  {
    question: 'Is this only for Malaysians?',
    answer: 'While our content is primarily tailored for the Malaysian job market, anyone can benefit from our universal career preparation resources like resume writing, interview skills, and networking strategies.',
  },
  {
    question: 'How is Career Buddy different from job listing sites?',
    answer: 'Career Buddy is NOT a job listing site. We focus on career PREPARATION, not job listings. We help you build the skills, confidence, and materials you need to succeed in your job search.',
  },
  {
    question: 'How does the AI Interview Simulation work?',
    answer: 'Our AI Interview Simulation uses advanced AI to conduct realistic mock interviews. You\'ll receive common interview questions, practice answering them, and get instant feedback on your responses.',
  },
  {
    question: 'Can I use Career Buddy on my phone?',
    answer: 'Absolutely! Career Buddy is fully responsive and works great on mobile devices. You can access all features right from your smartphone.',
  },
]

// Structured data (SSR-compatible)
const organizationSchema = useOrganizationSchema()
const websiteSchema = useWebSiteSchema()
const faqSchema = useFAQPageSchema(faqs)
useJsonLd([organizationSchema, websiteSchema, faqSchema])
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
      <LandingTestimonialsCarousel />
      <LandingFaqSection />
      <LandingCtaFooter />
    </div>
  </div>
</template>
