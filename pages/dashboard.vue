<script setup lang="ts">
import { onMounted } from 'vue'

definePageMeta({
  layout: 'default',
})

const { user, isAuthenticated, initAuth, logout } = useAuth()
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

onMounted(async () => {
  initAuth()

  // Redirect to login if not authenticated
  if (!isAuthenticated.value) {
    navigateTo('/login')
    return
  }

  // Load dashboard data
  await loadDashboard()
})

function handleLogout() {
  logout()
  navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Dashboard Content -->
    <div class="container mx-auto px-4 py-8">
      <!-- Bento Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Welcome Header - Full Width -->
        <div class="lg:col-span-12">
          <DashboardWelcomeHeader
            :user-name="user?.name || 'User'"
            :overall-progress="overallProgress"
            :loading="isLoading"
          />
        </div>

        <!-- Progress Modules - Large Left -->
        <div class="lg:col-span-7">
          <DashboardProgressModules
            :modules="progressModules"
            :loading="isLoading"
          />
        </div>

        <!-- Right Column Stack -->
        <div class="lg:col-span-5 space-y-6">
          <!-- Quick Actions -->
          <DashboardQuickActions :loading="isLoading" />

          <!-- Daily Tasks -->
          <DashboardDailyTasks
            :tasks="dailyTasks"
            :loading="isLoading"
            @toggle="toggleTask"
          />
        </div>

        <!-- Recent Activity -->
        <div class="lg:col-span-6">
          <DashboardRecentActivity
            :activities="recentActivity"
            :loading="isLoading"
          />
        </div>

        <!-- Motivational Section -->
        <div class="lg:col-span-6">
          <DashboardMotivationalSection
            :quote="currentQuote"
            :tip="currentTip"
            :loading="isLoading"
          />
        </div>

        <!-- Resume Preview -->
        <div class="lg:col-span-6">
          <DashboardResumePreview
            :resume="resumeInfo"
            :loading="isLoading"
          />
        </div>

        <!-- Logout Button (temporary for demo) -->
        <div class="lg:col-span-6 flex items-end">
          <UiButton
            variant="outline"
            class="w-full lg:w-auto"
            @click="handleLogout"
          >
            Sign Out
          </UiButton>
        </div>
      </div>
    </div>

    <!-- AI Buddy Widget -->
    <DashboardAiBuddyWidget />
  </div>
</template>
