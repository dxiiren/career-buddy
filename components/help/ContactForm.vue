<script setup lang="ts">
import { ref } from 'vue'
import { Send } from 'lucide-vue-next'
import type { ContactErrors } from '@/composables/useHelp'

interface Props {
  loading: boolean
  submitting: boolean
  errors: ContactErrors
}

defineProps<Props>()
const emit = defineEmits<{
  submit: [form: { name: string; email: string; subject: string; message: string }]
}>()

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')

const subjectOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'technical', label: 'Technical Issue' },
  { value: 'feature', label: 'Feature Request' },
  { value: 'billing', label: 'Billing Question' },
  { value: 'other', label: 'Other' },
]

function handleSubmit() {
  emit('submit', {
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
  })
}
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-4 sm:p-5 lg:p-6">
    <Transition
      mode="out-in"
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <!-- Skeleton Loading -->
      <div v-if="loading" key="skeleton" class="space-y-4">
        <Skeleton class="h-6 w-40 mb-4" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Skeleton class="h-4 w-16 mb-2" />
            <Skeleton class="h-10 w-full" />
          </div>
          <div>
            <Skeleton class="h-4 w-16 mb-2" />
            <Skeleton class="h-10 w-full" />
          </div>
        </div>
        <div>
          <Skeleton class="h-4 w-20 mb-2" />
          <Skeleton class="h-10 w-full" />
        </div>
        <div>
          <Skeleton class="h-4 w-20 mb-2" />
          <Skeleton class="h-32 w-full" />
        </div>
        <Skeleton class="h-10 w-40" />
      </div>

      <!-- Actual Content -->
      <div v-else key="content">
        <h2 class="text-lg font-heading font-semibold mb-4">Contact Us</h2>
        <p class="text-sm text-muted-foreground mb-6">
          Can't find what you're looking for? Send us a message and we'll get back to you as soon as possible.
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Name Field -->
            <div>
              <Label for="name" class="text-sm font-medium">Name</Label>
              <Input
                id="name"
                name="name"
                v-model="name"
                type="text"
                placeholder="Your name"
                class="mt-1"
                :class="{ 'border-destructive': errors.name }"
              />
              <p v-if="errors.name" class="text-sm text-destructive mt-1">
                {{ errors.name }}
              </p>
            </div>

            <!-- Email Field -->
            <div>
              <Label for="email" class="text-sm font-medium">Email</Label>
              <Input
                id="email"
                name="email"
                v-model="email"
                type="email"
                placeholder="your@email.com"
                class="mt-1"
                :class="{ 'border-destructive': errors.email }"
              />
              <p v-if="errors.email" class="text-sm text-destructive mt-1">
                {{ errors.email }}
              </p>
            </div>
          </div>

          <!-- Subject Field -->
          <div>
            <Label for="subject" class="text-sm font-medium">Subject</Label>
            <select
              id="subject"
              v-model="subject"
              class="w-full mt-1 h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              :class="{ 'border-destructive': errors.subject }"
            >
              <option value="" disabled>Select a subject</option>
              <option v-for="option in subjectOptions" :key="option.value" :value="option.label">
                {{ option.label }}
              </option>
            </select>
            <p v-if="errors.subject" class="text-sm text-destructive mt-1">
              {{ errors.subject }}
            </p>
          </div>

          <!-- Message Field -->
          <div>
            <Label for="message" class="text-sm font-medium">Message</Label>
            <textarea
              id="message"
              name="message"
              v-model="message"
              placeholder="How can we help you?"
              rows="5"
              class="w-full mt-1 px-3 py-2 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              :class="{ 'border-destructive': errors.message }"
            ></textarea>
            <p v-if="errors.message" class="text-sm text-destructive mt-1">
              {{ errors.message }}
            </p>
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            :disabled="submitting"
            class="gap-2"
          >
            <Send v-if="!submitting" class="h-4 w-4" />
            <span v-if="submitting">Sending...</span>
            <span v-else>Send Message</span>
          </Button>
        </form>
      </div>
    </Transition>
  </div>
</template>
