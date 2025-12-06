<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'FAQ', href: '#faq' },
]

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
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent',
    ]"
  >
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between">
        <AppLogo />

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

        <div class="hidden md:flex md:items-center md:gap-4">
          <Button variant="ghost" size="sm">Log In</Button>
          <Button size="sm">Get Started</Button>
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
        class="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden"
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
            <div class="flex flex-col gap-2 pt-4 border-t">
              <Button variant="ghost" class="w-full justify-center">Log In</Button>
              <Button class="w-full justify-center">Get Started</Button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>
