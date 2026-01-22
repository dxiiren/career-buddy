<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Mail,
  MessageSquare,
  Clock,
  Twitter,
  Linkedin,
  Instagram,
  Send,
  CheckCircle2,
  HelpCircle,
  Sparkles,
} from 'lucide-vue-next'

// SEO
useSeo({
  title: 'Contact Us',
  description: 'Get in touch with the Career Buddy team. We\'re here to help with any questions about your career journey.',
  keywords: 'contact career buddy, support, help, feedback',
})

// Structured data (SSR-compatible)
const breadcrumbSchema = useBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: 'Contact Us', item: '/contact' },
])
useJsonLd(breadcrumbSchema)

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const errors = ref<Record<string, string>>({})

const subjects = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'support', label: 'Technical Support' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'partnership', label: 'Partnership' },
]

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'support@careerbuddy.my',
    href: 'mailto:support@careerbuddy.my',
  },
  {
    icon: Clock,
    title: 'Response Time',
    description: 'Within 24-48 hours',
    href: null,
  },
]

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
]

function validateForm() {
  errors.value = {}

  if (!form.value.name.trim()) {
    errors.value.name = 'Name is required'
  }

  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email'
  }

  if (!form.value.subject) {
    errors.value.subject = 'Please select a subject'
  }

  if (!form.value.message.trim()) {
    errors.value.message = 'Message is required'
  } else if (form.value.message.trim().length < 10) {
    errors.value.message = 'Message must be at least 10 characters'
  }

  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validateForm()) return

  isSubmitting.value = true

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500))

  isSubmitting.value = false
  isSubmitted.value = true

  // Reset form
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: '',
  }
}

function resetForm() {
  isSubmitted.value = false
}
</script>

<template>
  <div>
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
            <MessageSquare class="h-4 w-4 text-primary" />
            <span class="text-sm font-medium">We're Here to Help</span>
          </div>

          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
            Get in <span class="text-primary">Touch</span>
          </h1>

          <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you. Our team is always ready to help.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <div class="grid lg:grid-cols-5 gap-12">
            <!-- Contact Info Sidebar -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Contact Methods -->
              <div class="space-y-4">
                <h2 class="text-xl font-semibold font-heading">Contact Information</h2>
                <div class="space-y-4">
                  <div
                    v-for="method in contactMethods"
                    :key="method.title"
                    class="flex items-start gap-4 p-4 bg-card rounded-xl border border-border"
                  >
                    <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <component :is="method.icon" class="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div class="font-medium">{{ method.title }}</div>
                      <a
                        v-if="method.href"
                        :href="method.href"
                        class="text-sm text-primary hover:underline"
                      >
                        {{ method.description }}
                      </a>
                      <div v-else class="text-sm text-muted-foreground">
                        {{ method.description }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Social Links -->
              <div class="space-y-4">
                <h3 class="font-semibold">Follow Us</h3>
                <div class="flex gap-3">
                  <a
                    v-for="social in socialLinks"
                    :key="social.label"
                    :href="social.href"
                    :aria-label="social.label"
                    class="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <component :is="social.icon" class="w-5 h-5" />
                  </a>
                </div>
              </div>

              <!-- FAQ Link -->
              <div class="p-4 bg-primary/5 rounded-xl border border-primary/20">
                <div class="flex items-start gap-3">
                  <HelpCircle class="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div class="font-medium mb-1">Have questions?</div>
                    <p class="text-sm text-muted-foreground mb-3">
                      Check our FAQ section for quick answers to common questions.
                    </p>
                    <NuxtLink to="/#faq" class="text-sm text-primary hover:underline font-medium">
                      Visit FAQ Section &rarr;
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contact Form -->
            <div class="lg:col-span-3">
              <div class="bg-card rounded-2xl border border-border p-6 md:p-8">
                <!-- Success State -->
                <div v-if="isSubmitted" class="text-center py-8">
                  <div class="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 class="w-8 h-8 text-green-500" />
                  </div>
                  <h3 class="text-xl font-semibold font-heading mb-2">Message Sent!</h3>
                  <p class="text-muted-foreground mb-6">
                    Thank you for reaching out. We'll get back to you within 24-48 hours.
                  </p>
                  <Button variant="outline" @click="resetForm">
                    Send Another Message
                  </Button>
                </div>

                <!-- Form -->
                <form v-else @submit.prevent="handleSubmit" class="space-y-6">
                  <div class="flex items-center gap-2 mb-6">
                    <Sparkles class="h-5 w-5 text-primary" />
                    <h2 class="text-xl font-semibold font-heading">Send us a Message</h2>
                  </div>

                  <!-- Name Field -->
                  <div class="space-y-2">
                    <Label for="name">Name</Label>
                    <Input
                      id="name"
                      v-model="form.name"
                      placeholder="Your name"
                      :class="{ 'border-red-500': errors.name }"
                    />
                    <p v-if="errors.name" class="text-sm text-red-500">{{ errors.name }}</p>
                  </div>

                  <!-- Email Field -->
                  <div class="space-y-2">
                    <Label for="email">Email</Label>
                    <Input
                      id="email"
                      v-model="form.email"
                      type="email"
                      placeholder="your.email@example.com"
                      :class="{ 'border-red-500': errors.email }"
                    />
                    <p v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</p>
                  </div>

                  <!-- Subject Field -->
                  <div class="space-y-2">
                    <Label for="subject">Subject</Label>
                    <Select v-model="form.subject">
                      <SelectTrigger :class="{ 'border-red-500': errors.subject }">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          v-for="subject in subjects"
                          :key="subject.value"
                          :value="subject.value"
                        >
                          {{ subject.label }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p v-if="errors.subject" class="text-sm text-red-500">{{ errors.subject }}</p>
                  </div>

                  <!-- Message Field -->
                  <div class="space-y-2">
                    <Label for="message">Message</Label>
                    <Textarea
                      id="message"
                      v-model="form.message"
                      placeholder="How can we help you?"
                      :rows="5"
                      :class="{ 'border-red-500': errors.message }"
                    />
                    <p v-if="errors.message" class="text-sm text-red-500">{{ errors.message }}</p>
                  </div>

                  <!-- Submit Button -->
                  <Button type="submit" class="w-full" size="lg" :disabled="isSubmitting">
                    <Send v-if="!isSubmitting" class="w-4 h-4 mr-2" />
                    <span v-if="isSubmitting">Sending...</span>
                    <span v-else>Send Message</span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
