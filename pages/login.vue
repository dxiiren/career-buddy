<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import AuthLayout from '@/components/auth/Layout.vue'

definePageMeta({
  layout: false,
})

const { login, isLoading, error, clearError, isAuthenticated, initAuth } = useAuth()

// Redirect to dashboard if already authenticated
onMounted(() => {
  initAuth()
  if (isAuthenticated.value) {
    navigateTo('/dashboard')
  }
})

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const shake = ref(false)
const showSuccessToast = ref(false)

async function handleSubmit() {
  clearError()

  const success = await login(username.value, password.value)

  if (success) {
    showSuccessToast.value = true
    // Delay navigation slightly so user sees the success toast
    setTimeout(() => {
      navigateTo('/dashboard')
    }, 800)
  } else {
    // Trigger shake animation
    shake.value = true
    setTimeout(() => {
      shake.value = false
    }, 500)
  }
}

function togglePassword() {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <AuthLayout>
    <!-- Success Message (inline) -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="showSuccessToast"
        class="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-500 text-sm flex items-center gap-3"
      >
        <svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="font-medium text-foreground">Welcome back! Redirecting to dashboard...</span>
      </div>
    </Transition>

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
        <h1 class="text-3xl font-heading font-bold mb-2">Welcome back</h1>
        <p class="text-muted-foreground">Sign in to continue your journey</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" :class="{ 'animate-shake': shake }">
        <!-- Error Message -->
        <div
          v-if="error"
          class="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
        >
          {{ error }}
        </div>

        <!-- Username Field -->
        <div class="mb-4">
          <Label for="username" class="mb-2 block">Username</Label>
          <Input
            id="username"
            v-model="username"
            type="text"
            placeholder="Enter your username"
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
              placeholder="Enter your password"
              :disabled="isLoading"
              class="w-full pr-10"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              @click="togglePassword"
            >
              <EyeOff v-if="showPassword" class="h-4 w-4" />
              <Eye v-else class="h-4 w-4" />
            </button>
          </div>
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-2">
            <Checkbox id="remember" v-model="rememberMe" />
            <Label for="remember" class="text-sm cursor-pointer">Remember me</Label>
          </div>
          <a href="#" class="text-sm text-primary hover:underline">Forgot password?</a>
        </div>

        <!-- Submit Button -->
        <Button
          type="submit"
          size="lg"
          class="w-full"
          :disabled="isLoading || !username || !password"
        >
          <template v-if="isLoading">
            <Loader2 class="h-4 w-4 animate-spin mr-2" />
            Signing in...
          </template>
          <template v-else>
            Sign In
          </template>
        </Button>
      </form>

      <!-- Register Link -->
      <p class="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?
        <NuxtLink to="/register" class="text-primary hover:underline font-medium">
          Register
        </NuxtLink>
      </p>

      <!-- Demo Credentials Hint -->
      <div class="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
        <p class="text-xs text-muted-foreground text-center">
          <span class="font-medium">Demo credentials:</span> admin / admin
        </p>
      </div>
  </AuthLayout>
</template>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>
