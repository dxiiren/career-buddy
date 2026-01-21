<script setup lang="ts">
import { onMounted, ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

// SEO - noindex for protected page
useSeo({
  title: 'Dashboard',
  description: 'Your personal career preparation dashboard.',
  noindex: true,
})

const { user, isAuthenticated, initAuth } = useAuth()
const {
  isLoading,
  progressModules,
  overallProgress,
  loadDashboard,
} = useDashboard()
const { trackPageVisit } = useRecentActivity()

// Track which cards have animated in
const animatedCards = ref<Set<number>>(new Set())

// Show cards with staggered animation after loading
const showCard = (index: number) => {
  return !isLoading.value && animatedCards.value.has(index)
}

onMounted(async () => {
  initAuth()

  // Redirect to login if not authenticated
  if (!isAuthenticated.value) {
    navigateTo('/login')
    return
  }

  // Track page visit
  trackPageVisit('/dashboard')

  // Load dashboard data
  await loadDashboard()

  // Stagger card animations
  const cardCount = 3
  for (let i = 0; i < cardCount; i++) {
    setTimeout(() => {
      animatedCards.value.add(i)
    }, i * 100)
  }
})
</script>

<template>
  <div>
    <!-- Bento Grid Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
        <!-- Welcome Header - Full Width -->
        <div
          class="lg:col-span-12 transition-all duration-500"
          :class="showCard(0) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
        >
          <DashboardWelcomeHeader
            :user-name="user?.name || 'User'"
            :overall-progress="overallProgress"
            :loading="isLoading"
          />
        </div>

        <!-- Progress Modules -->
        <div
          class="lg:col-span-7 transition-all duration-500"
          :class="showCard(1) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
        >
          <DashboardProgressModules
            :modules="progressModules"
            :loading="isLoading"
          />
        </div>

        <!-- Daily Tasks -->
        <div
          class="lg:col-span-5 transition-all duration-500"
          :class="showCard(2) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
        >
          <DashboardDailyTasks
            :loading="isLoading"
          />
        </div>
    </div>

    <!-- AI Buddy Widget -->
    <DashboardAiBuddyWidget />
  </div>
</template>

<style scoped>
/* Smooth fade transition for card animations */
.transition-all {
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
