<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

const { user, isAuthenticated, initAuth } = useAuth()
const {
  isLoading,
  progressModules,
  dailyTasks,
  recentActivity,
  resumeInfo,
  overallProgress,
  currentQuote,
  currentTip,
  loadDashboard,
  toggleTask,
} = useDashboard()

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

  // Load dashboard data
  await loadDashboard()

  // Stagger card animations
  const cardCount = 6
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
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
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

        <!-- Progress Modules - Large Left -->
        <div
          class="lg:col-span-7 transition-all duration-500"
          :class="showCard(1) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
        >
          <DashboardProgressModules
            :modules="progressModules"
            :loading="isLoading"
          />
        </div>

        <!-- Right Column Stack -->
        <div class="lg:col-span-5 flex flex-col gap-6">
          <!-- Quick Actions -->
          <div
            class="transition-all duration-500"
            :class="showCard(2) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
          >
            <DashboardQuickActions :loading="isLoading" />
          </div>

          <!-- Daily Tasks -->
          <div
            class="flex-1 transition-all duration-500"
            :class="showCard(3) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
          >
            <DashboardDailyTasks
              :tasks="dailyTasks"
              :loading="isLoading"
              @toggle="toggleTask"
            />
          </div>
        </div>

        <!-- Recent Activity -->
        <div
          class="lg:col-span-6 transition-all duration-500"
          :class="showCard(4) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
        >
          <DashboardRecentActivity
            :activities="recentActivity"
            :loading="isLoading"
          />
        </div>

        <!-- Motivational Section -->
        <div
          class="lg:col-span-6 transition-all duration-500"
          :class="showCard(5) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
        >
          <DashboardMotivationalSection
            :quote="currentQuote"
            :tip="currentTip"
            :loading="isLoading"
          />
        </div>

        <!-- Resume Preview -->
        <div
          class="lg:col-span-12 transition-all duration-500"
          :class="showCard(5) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
        >
          <DashboardResumePreview
            :resume="resumeInfo"
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
