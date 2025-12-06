<script setup lang="ts">
import { Twitter, Linkedin, Instagram, Mail } from 'lucide-vue-next'

const route = useRoute()
const isLandingPage = computed(() => route.path === '/')

// Generate full href for anchor links based on current page
function getAnchorHref(anchor: string) {
  return isLandingPage.value ? anchor : `/${anchor}`
}

const footerLinks = {
  product: [
    { name: 'Challenges', anchor: '#challenges' },
    { name: 'Features', anchor: '#features' },
    { name: 'How It Works', anchor: '#how-it-works' },
    { name: 'Feedback', anchor: '#feedback' },
    { name: 'FAQ', anchor: '#faq' },
  ],
  resources: [
    { name: 'Resume Templates', href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1' },
    { name: 'Interview Guide', href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1' },
    { name: 'Career Blog', href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
}

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Mail, href: '#', label: 'Email' },
]
</script>

<template>
  <footer class="bg-muted text-foreground">
    <div class="container mx-auto px-4 py-12">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <svg
                class="h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span class="text-xl font-bold font-heading">Career Buddy</span>
          </div>
          <p class="text-sm text-muted-foreground max-w-xs mb-6">
            Your all-in-one career preparation platform. Helping young adults navigate their career journey with confidence.
          </p>
          <div class="flex gap-4">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.href"
              :aria-label="social.label"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary"
            >
              <component :is="social.icon" class="h-5 w-5" />
            </a>
          </div>
        </div>

        <!-- Product Links -->
        <div>
          <h4 class="font-semibold mb-4">Product</h4>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.product" :key="link.name">
              <a :href="getAnchorHref(link.anchor)" class="text-sm text-muted-foreground transition-colors hover:text-primary">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Resources Links -->
        <div>
          <h4 class="font-semibold mb-4">Resources</h4>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.resources" :key="link.name">
              <a :href="link.href" target="_blank" rel="noopener noreferrer" class="text-sm text-muted-foreground transition-colors hover:text-primary">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Company Links -->
        <div>
          <h4 class="font-semibold mb-4">Company</h4>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.company" :key="link.name">
              <NuxtLink :to="link.href" class="text-sm text-muted-foreground transition-colors hover:text-primary">
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-border">
        <p class="text-center text-sm text-muted-foreground">
          &copy; {{ new Date().getFullYear() }} Career Buddy. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
