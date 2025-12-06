<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Eye, EyeOff, Loader2, Check, X, ArrowLeft } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AuthLayout from '@/components/auth/Layout.vue'

definePageMeta({
  layout: false,
})

const { register, isLoading, error, clearError, isAuthenticated, initAuth } = useAuth()

// Redirect to dashboard if already authenticated
onMounted(() => {
  initAuth()
  if (isAuthenticated.value) {
    navigateTo('/dashboard')
  }
})

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Password strength
const passwordStrength = computed(() => {
  const p = password.value
  if (!p) return { score: 0, label: '', color: '' }

  let score = 0
  if (p.length >= 8) score++
  if (/[A-Z]/.test(p)) score++
  if (/[a-z]/.test(p)) score++
  if (/[0-9]/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++

  if (score <= 2) return { score, label: 'Weak', color: 'bg-destructive' }
  if (score <= 3) return { score, label: 'Medium', color: 'bg-yellow-500' }
  return { score, label: 'Strong', color: 'bg-green-500' }
})

const passwordsMatch = computed(() => {
  return password.value && confirmPassword.value && password.value === confirmPassword.value
})

const canSubmit = computed(() => {
  return name.value && email.value && password.value && passwordsMatch.value && !isLoading.value
})

async function handleSubmit() {
  if (!canSubmit.value) return

  clearError()

  const success = await register(name.value, email.value, password.value)

  if (success) {
    navigateTo('/dashboard')
  }
}
</script>

<template>
  <AuthLayout>
      <!-- Back to Home -->
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft class="h-4 w-4" />
        Back to Home
      </NuxtLink>

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-heading font-bold mb-2">Create your account</h1>
        <p class="text-muted-foreground">Start your career journey today</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit">
        <!-- Error Message -->
        <div
          v-if="error"
          class="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
        >
          {{ error }}
        </div>

        <!-- Full Name Field -->
        <div class="mb-4">
          <Label for="name" class="mb-2 block">Full Name</Label>
          <Input
            id="name"
            v-model="name"
            type="text"
            placeholder="Enter your full name"
            :disabled="isLoading"
            class="w-full"
          />
        </div>

        <!-- Email Field -->
        <div class="mb-4">
          <Label for="email" class="mb-2 block">Email</Label>
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            :disabled="isLoading"
            class="w-full"
          />
        </div>

        <!-- Password Field -->
        <div class="mb-4">
          <Label for="password" class="mb-2 block">Password</Label>
          <div class="relative">
            <Input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Create a password"
              :disabled="isLoading"
              class="w-full pr-10"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              @click="showPassword = !showPassword"
            >
              <EyeOff v-if="showPassword" class="h-4 w-4" />
              <Eye v-else class="h-4 w-4" />
            </button>
          </div>

          <!-- Password Strength Indicator -->
          <div v-if="password" class="mt-2">
            <div class="flex gap-1 mb-1">
              <div
                v-for="i in 5"
                :key="i"
                class="h-1 flex-1 rounded-full transition-colors"
                :class="i <= passwordStrength.score ? passwordStrength.color : 'bg-muted'"
              />
            </div>
            <p class="text-xs" :class="passwordStrength.score <= 2 ? 'text-destructive' : passwordStrength.score <= 3 ? 'text-yellow-500' : 'text-green-500'">
              {{ passwordStrength.label }}
            </p>
          </div>
        </div>

        <!-- Confirm Password Field -->
        <div class="mb-6">
          <Label for="confirm-password" class="mb-2 block">Confirm Password</Label>
          <div class="relative">
            <Input
              id="confirm-password"
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm your password"
              :disabled="isLoading"
              class="w-full pr-10"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <EyeOff v-if="showConfirmPassword" class="h-4 w-4" />
              <Eye v-else class="h-4 w-4" />
            </button>
          </div>

          <!-- Password Match Indicator -->
          <div v-if="confirmPassword" class="mt-2 flex items-center gap-1">
            <Check v-if="passwordsMatch" class="h-3 w-3 text-green-500" />
            <X v-else class="h-3 w-3 text-destructive" />
            <span class="text-xs" :class="passwordsMatch ? 'text-green-500' : 'text-destructive'">
              {{ passwordsMatch ? 'Passwords match' : 'Passwords do not match' }}
            </span>
          </div>
        </div>

        <!-- Submit Button -->
        <Button
          type="submit"
          size="lg"
          class="w-full"
          :disabled="!canSubmit"
        >
          <template v-if="isLoading">
            <Loader2 class="h-4 w-4 animate-spin mr-2" />
            Creating account...
          </template>
          <template v-else>
            Create Account
          </template>
        </Button>
      </form>

      <!-- Login Link -->
      <p class="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?
        <NuxtLink to="/login" class="text-primary hover:underline font-medium">
          Sign in
        </NuxtLink>
      </p>
  </AuthLayout>
</template>
