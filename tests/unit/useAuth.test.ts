import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
})

describe('useAuth composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.clear()
    vi.resetModules()
  })

  it('should initialize with no user and not authenticated', async () => {
    const { useAuth } = await import('../../composables/useAuth')
    const { user, isAuthenticated } = useAuth()

    expect(user.value).toBeNull()
    expect(isAuthenticated.value).toBe(false)
  })

  it('should login successfully with correct credentials (admin/admin)', async () => {
    const { useAuth } = await import('../../composables/useAuth')
    const { login, user, isAuthenticated, error } = useAuth()

    const result = await login('admin', 'admin')

    expect(result).toBe(true)
    expect(user.value).not.toBeNull()
    expect(user.value?.username).toBe('admin')
    expect(user.value?.name).toBe('Akmal')
    expect(isAuthenticated.value).toBe(true)
    expect(error.value).toBeNull()
  })

  it('should fail login with incorrect credentials', async () => {
    const { useAuth } = await import('../../composables/useAuth')
    const { login, user, isAuthenticated, error } = useAuth()

    const result = await login('wrong', 'wrong')

    expect(result).toBe(false)
    expect(user.value).toBeNull()
    expect(isAuthenticated.value).toBe(false)
    expect(error.value).toBe('Invalid username or password')
  })

  it('should fail login with correct username but wrong password', async () => {
    const { useAuth } = await import('../../composables/useAuth')
    const { login, error } = useAuth()

    const result = await login('admin', 'wrongpassword')

    expect(result).toBe(false)
    expect(error.value).toBe('Invalid username or password')
  })

  it('should fail login with wrong username but correct password', async () => {
    const { useAuth } = await import('../../composables/useAuth')
    const { login, error } = useAuth()

    const result = await login('wronguser', 'admin')

    expect(result).toBe(false)
    expect(error.value).toBe('Invalid username or password')
  })

  it('should set isLoading during login', async () => {
    const { useAuth } = await import('../../composables/useAuth')
    const { login, isLoading } = useAuth()

    expect(isLoading.value).toBe(false)

    const loginPromise = login('admin', 'admin')
    expect(isLoading.value).toBe(true)

    await loginPromise
    expect(isLoading.value).toBe(false)
  })

  it('should register successfully with any credentials', async () => {
    const { useAuth } = await import('../../composables/useAuth')
    const { register, user, isAuthenticated } = useAuth()

    const result = await register('John Doe', 'john@example.com', 'password123')

    expect(result).toBe(true)
    expect(user.value).not.toBeNull()
    expect(user.value?.name).toBe('John Doe')
    expect(user.value?.username).toBe('john')
    expect(isAuthenticated.value).toBe(true)
  })

  it('should logout and clear user state', async () => {
    const { useAuth } = await import('../../composables/useAuth')
    const { login, logout, user, isAuthenticated } = useAuth()

    await login('admin', 'admin')
    expect(isAuthenticated.value).toBe(true)

    logout()

    expect(user.value).toBeNull()
    expect(isAuthenticated.value).toBe(false)
  })

  it('should clear error when clearError is called', async () => {
    const { useAuth } = await import('../../composables/useAuth')
    const { login, error, clearError } = useAuth()

    await login('wrong', 'wrong')
    expect(error.value).toBe('Invalid username or password')

    clearError()
    expect(error.value).toBeNull()
  })

  it('should clear previous error on new login attempt', async () => {
    const { useAuth } = await import('../../composables/useAuth')
    const { login, error, clearError } = useAuth()

    await login('wrong', 'wrong')
    expect(error.value).toBe('Invalid username or password')

    clearError()
    await login('admin', 'admin')
    expect(error.value).toBeNull()
  })
})
