<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Settings as SettingsIcon } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
})

const { user, isAuthenticated, initAuth } = useAuth()
const {
  isLoading,
  isSaving,
  profile,
  preferences,
  errors,
  loadSettings,
  updateProfile,
  changePassword,
  updatePreferences,
  deleteAccount,
} = useSettings()
const { trackPageVisit } = useRecentActivity()

// Track which cards have animated in
const animatedCards = ref<Set<number>>(new Set())

// Show cards with staggered animation after loading
const showCard = (index: number) => {
  return !isLoading.value && animatedCards.value.has(index)
}

// Toast state
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')

function displayToast(message: string, type: 'success' | 'error') {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

async function handleProfileUpdate(newProfile: typeof profile.value) {
  const result = await updateProfile(newProfile)
  if (result.success) {
    displayToast('Profile updated successfully!', 'success')
  } else {
    displayToast('Failed to update profile. Please check errors.', 'error')
  }
}

async function handlePasswordChange(data: Parameters<typeof changePassword>[0]) {
  const result = await changePassword(data)
  if (result.success) {
    displayToast('Password changed successfully!', 'success')
  } else {
    displayToast('Failed to change password. Please check errors.', 'error')
  }
}

async function handlePreferencesUpdate(newPrefs: typeof preferences.value) {
  const result = await updatePreferences(newPrefs)
  if (result.success) {
    displayToast('Preferences saved!', 'success')
  }
}

async function handleDeleteAccount(confirmationText: string) {
  const result = await deleteAccount(confirmationText)
  if (result.success) {
    // Log user out and redirect
    const { logout } = useAuth()
    logout()
    navigateTo('/')
  }
}

onMounted(async () => {
  initAuth()

  // Redirect to login if not authenticated
  if (!isAuthenticated.value) {
    navigateTo('/login')
    return
  }

  // Initialize profile with user data if available
  if (user.value) {
    profile.value.name = user.value.name || ''
    profile.value.email = user.value.email || ''
  }

  // Track page visit
  trackPageVisit('/settings')

  // Load settings
  await loadSettings()

  // Stagger card animations
  const cardCount = 4
  for (let i = 0; i < cardCount; i++) {
    setTimeout(() => {
      animatedCards.value.add(i)
    }, i * 100)
  }
})
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-2">
        <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <SettingsIcon class="h-5 w-5 text-primary" />
        </div>
        <h1 class="text-2xl font-heading font-bold">Settings</h1>
      </div>
      <p class="text-muted-foreground">Manage your account settings and preferences</p>
    </div>

    <!-- Settings Sections -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Profile Section -->
      <div
        class="transition-all duration-500"
        :class="showCard(0) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
      >
        <SettingsProfileSection
          :profile="profile"
          :loading="isLoading"
          :saving="isSaving"
          :errors="errors"
          @update="handleProfileUpdate"
        />
      </div>

      <!-- Password Section -->
      <div
        class="transition-all duration-500"
        :class="showCard(1) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
      >
        <SettingsPasswordSection
          :loading="isLoading"
          :saving="isSaving"
          :errors="errors"
          @change="handlePasswordChange"
        />
      </div>

      <!-- Preferences Section -->
      <div
        class="transition-all duration-500"
        :class="showCard(2) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
      >
        <SettingsPreferencesSection
          :preferences="preferences"
          :loading="isLoading"
          @update="handlePreferencesUpdate"
        />
      </div>

      <!-- Danger Zone -->
      <div
        class="transition-all duration-500"
        :class="showCard(3) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
      >
        <SettingsDangerZone
          :loading="isLoading"
          :errors="errors"
          @delete="handleDeleteAccount"
        />
      </div>
    </div>

    <!-- Toast Notification -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div
        v-if="showToast"
        class="fixed bottom-6 right-6 z-50"
      >
        <div
          class="px-4 py-3 rounded-lg shadow-lg"
          :class="toastType === 'success' ? 'bg-green-500 text-white' : 'bg-destructive text-destructive-foreground'"
        >
          {{ toastMessage }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.transition-all {
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
