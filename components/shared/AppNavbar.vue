<script setup lang="ts">
import { Menu, X, LogOut, User } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const { user, isAuthenticated, logout, initAuth } = useAuth()

const isMenuOpen = ref(false)
const isScrolled = ref(false)

// Initialize auth state from localStorage
onMounted(() => {
  initAuth()
})

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy', href: '/privacy' },
]

function handleLogout() {
  logout()
  navigateTo('/login')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  isScrolled.value = window.scrollY > 10
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-card/90 backdrop-blur-md shadow-sm border-b border-border/50' : 'bg-transparent',
    ]"
  >
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between">
        <SharedAppLogo />

        <!-- Desktop Navigation -->
        <div class="hidden md:flex md:items-center md:gap-6">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.href"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {{ link.name }}
          </NuxtLink>
        </div>

        <div class="hidden md:flex md:items-center md:gap-3">
          <SharedThemeToggle />
          <!-- Authenticated User - Show Dashboard Button -->
          <template v-if="isAuthenticated">
            <NuxtLink to="/dashboard">
              <Button size="sm" class="shadow-md">Go to Dashboard</Button>
            </NuxtLink>
          </template>
          <!-- Guest Buttons -->
          <template v-else>
            <NuxtLink to="/login">
              <Button variant="ghost" size="sm" class="text-foreground hover:bg-muted">Log In</Button>
            </NuxtLink>
            <NuxtLink to="/register">
              <Button size="sm" class="shadow-md">Get Started</Button>
            </NuxtLink>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="flex h-10 w-10 items-center justify-center rounded-lg md:hidden hover:bg-muted"
          @click="toggleMenu"
        >
          <Menu v-if="!isMenuOpen" class="h-5 w-5" />
          <X v-else class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMenuOpen"
        class="absolute top-16 left-0 right-0 bg-card shadow-lg border-b border-border md:hidden"
      >
        <div class="container mx-auto px-4 py-4">
          <div class="flex flex-col gap-4">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.name"
              :to="link.href"
              class="py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              @click="closeMenu"
            >
              {{ link.name }}
            </NuxtLink>
            <div class="flex flex-col gap-2 pt-4 border-t border-border">
              <div class="flex items-center justify-between py-2">
                <span class="text-sm text-muted-foreground">Theme</span>
                <SharedThemeToggle />
              </div>
              <!-- Authenticated User - Show Dashboard Button (Mobile) -->
              <template v-if="isAuthenticated">
                <NuxtLink to="/dashboard" @click="closeMenu">
                  <Button class="w-full justify-center">Go to Dashboard</Button>
                </NuxtLink>
              </template>
              <!-- Guest Buttons (Mobile) -->
              <template v-else>
                <NuxtLink to="/login" @click="closeMenu">
                  <Button variant="ghost" class="w-full justify-center">Log In</Button>
                </NuxtLink>
                <NuxtLink to="/register" @click="closeMenu">
                  <Button class="w-full justify-center">Get Started</Button>
                </NuxtLink>
              </template>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>
