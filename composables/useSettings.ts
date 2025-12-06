import { ref } from 'vue'

export interface Profile {
  name: string
  email: string
  avatar: string | null
}

export interface Preferences {
  emailNotifications: boolean
  pushNotifications: boolean
  weeklyDigest: boolean
}

export interface PasswordChange {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface SettingsErrors {
  name?: string
  email?: string
  currentPassword?: string
  newPassword?: string
  confirmPassword?: string
  deleteConfirmation?: string
}

const isLoading = ref(false)
const isSaving = ref(false)

const profile = ref<Profile>({
  name: '',
  email: '',
  avatar: null,
})

const preferences = ref<Preferences>({
  emailNotifications: true,
  pushNotifications: false,
  weeklyDigest: true,
})

const errors = ref<SettingsErrors>({})

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function useSettings() {
  function initSettings() {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem('careerbuddy_profile')
    if (savedProfile) {
      try {
        profile.value = JSON.parse(savedProfile)
      } catch {
        // Invalid JSON, keep defaults
      }
    }

    // Load preferences from localStorage
    const savedPrefs = localStorage.getItem('careerbuddy_preferences')
    if (savedPrefs) {
      try {
        preferences.value = JSON.parse(savedPrefs)
      } catch {
        // Invalid JSON, keep defaults
      }
    }
  }

  async function loadSettings() {
    isLoading.value = true
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    initSettings()
    isLoading.value = false
  }

  async function updateProfile(newProfile: Profile): Promise<{ success: boolean }> {
    // Clear previous errors
    errors.value = {}

    // Validate name
    if (!newProfile.name || !newProfile.name.trim()) {
      errors.value.name = 'Name is required'
    }

    // Validate email
    if (!validateEmail(newProfile.email)) {
      errors.value.email = 'Please enter a valid email address'
    }

    // If there are errors, don't save
    if (errors.value.name || errors.value.email) {
      return { success: false }
    }

    isSaving.value = true
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    profile.value = { ...newProfile }
    localStorage.setItem('careerbuddy_profile', JSON.stringify(profile.value))

    isSaving.value = false
    return { success: true }
  }

  async function changePassword(data: PasswordChange): Promise<{ success: boolean }> {
    // Clear previous password errors
    errors.value.currentPassword = undefined
    errors.value.newPassword = undefined
    errors.value.confirmPassword = undefined

    // Validate current password
    if (!data.currentPassword) {
      errors.value.currentPassword = 'Current password is required'
    }

    // Validate new password length
    if (data.newPassword.length < 6) {
      errors.value.newPassword = 'Password must be at least 6 characters'
    }

    // Validate passwords match
    if (data.newPassword !== data.confirmPassword) {
      errors.value.confirmPassword = 'Passwords do not match'
    }

    // If there are errors, don't proceed
    if (errors.value.currentPassword || errors.value.newPassword || errors.value.confirmPassword) {
      return { success: false }
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true }
  }

  async function updatePreferences(newPrefs: Preferences): Promise<{ success: boolean }> {
    isSaving.value = true
    await new Promise((resolve) => setTimeout(resolve, 300))

    preferences.value = { ...newPrefs }
    localStorage.setItem('careerbuddy_preferences', JSON.stringify(preferences.value))

    isSaving.value = false
    return { success: true }
  }

  async function deleteAccount(confirmationText: string): Promise<{ success: boolean }> {
    errors.value.deleteConfirmation = undefined

    if (confirmationText !== 'DELETE') {
      errors.value.deleteConfirmation = 'Please type "DELETE" to confirm'
      return { success: false }
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Clear all localStorage data
    localStorage.removeItem('careerbuddy_profile')
    localStorage.removeItem('careerbuddy_preferences')
    localStorage.removeItem('careerbuddy_user')

    return { success: true }
  }

  return {
    // State
    isLoading,
    isSaving,
    profile,
    preferences,
    errors,
    // Methods
    initSettings,
    loadSettings,
    updateProfile,
    changePassword,
    updatePreferences,
    deleteAccount,
  }
}
