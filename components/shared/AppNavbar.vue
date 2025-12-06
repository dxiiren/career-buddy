<script setup lang="ts">
import { Menu, X, LogOut, User } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const route = useRoute()
const { user, isAuthenticated, logout } = useAuth()

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const isDashboard = computed(() => route.path === '/dashboard')

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'FAQ', href: '#faq' },
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
        <div class="hidden md:flex md:items-center md:gap-8">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href"
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {{ link.name }}
          </a>
        </div>

        <div class="hidden md:flex md:items-center md:gap-3">
          <SharedThemeToggle />
          <!-- Authenticated User Menu -->
          <template v-if="isAuthenticated">
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
              <User class="h-4 w-4 text-muted-foreground" />
              <span class="text-sm font-medium">{{ user?.name }}</span>
            </div>
            <Button variant="ghost" size="sm" @click="handleLogout">
              <LogOut class="h-4 w-4 mr-2" />
              Sign Out
            </Button>
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
            <a
              v-for="link in navLinks"
              :key="link.name"
              :href="link.href"
              class="py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              @click="closeMenu"
            >
              {{ link.name }}
            </a>
            <div class="flex flex-col gap-2 pt-4 border-t border-border">
              <div class="flex items-center justify-between py-2">
                <span class="text-sm text-muted-foreground">Theme</span>
                <SharedThemeToggle />
              </div>
              <!-- Authenticated User Menu (Mobile) -->
              <template v-if="isAuthenticated">
                <div class="flex items-center gap-2 py-2">
                  <User class="h-4 w-4 text-muted-foreground" />
                  <span class="text-sm font-medium">{{ user?.name }}</span>
                </div>
                <Button variant="ghost" class="w-full justify-center" @click="handleLogout">
                  <LogOut class="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
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
