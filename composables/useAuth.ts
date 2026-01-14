import { ref, computed } from 'vue'

interface User {
  username: string
  name: string
}

const user = ref<User | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

// Hardcoded credentials
const VALID_USERNAME = 'admin'
const VALID_PASSWORD = 'admin'

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value)

  async function login(username: string, password: string): Promise<boolean> {
    isLoading.value = true
    error.value = null

    // Simulate API delay for loading state demo
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      user.value = {
        username: 'admin',
        name: 'Yana',
      }
      isLoading.value = false

      // Store auth state
      if (import.meta.client) {
        localStorage.setItem('auth_user', JSON.stringify(user.value))
      }

      return true
    }

    error.value = 'Invalid username or password'
    isLoading.value = false
    return false
  }

  async function register(name: string, email: string, password: string): Promise<boolean> {
    isLoading.value = true
    error.value = null

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo, any registration succeeds and logs them in
    user.value = {
      username: email.split('@')[0],
      name: name,
    }
    isLoading.value = false

    if (import.meta.client) {
      localStorage.setItem('auth_user', JSON.stringify(user.value))
    }

    return true
  }

  function logout() {
    user.value = null
    if (import.meta.client) {
      localStorage.removeItem('auth_user')
    }
  }

  function initAuth() {
    if (import.meta.client) {
      const stored = localStorage.getItem('auth_user')
      if (stored) {
        try {
          user.value = JSON.parse(stored)
        } catch {
          localStorage.removeItem('auth_user')
        }
      }
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    initAuth,
    clearError,
  }
}
