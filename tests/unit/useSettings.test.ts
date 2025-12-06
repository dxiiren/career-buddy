import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('useSettings', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('profile state', () => {
    it('should have initial profile state with default values', async () => {
      const { useSettings } = await import('../../composables/useSettings')
      const { profile } = useSettings()

      expect(profile.value).toEqual({
        name: '',
        email: '',
        avatar: null,
      })
    })

    it('should load profile from localStorage if exists', async () => {
      const savedProfile = {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://example.com/avatar.jpg',
      }
      localStorage.setItem('careerbuddy_profile', JSON.stringify(savedProfile))

      // Re-import to get fresh module
      vi.resetModules()
      const { useSettings } = await import('../../composables/useSettings')
      const { profile, initSettings } = useSettings()
      initSettings()

      expect(profile.value).toEqual(savedProfile)
    })

    it('should update profile and persist to localStorage', async () => {
      const { useSettings } = await import('../../composables/useSettings')
      const { profile, updateProfile } = useSettings()

      const newProfile = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: null,
      }

      const promise = updateProfile(newProfile)
      await vi.advanceTimersByTimeAsync(500)
      await promise

      expect(profile.value).toEqual(newProfile)
      expect(JSON.parse(localStorage.getItem('careerbuddy_profile') || '{}')).toEqual(newProfile)
    })

    it('should validate email format when updating profile', async () => {
      const { useSettings } = await import('../../composables/useSettings')
      const { updateProfile, errors } = useSettings()

      await updateProfile({
        name: 'Test',
        email: 'invalid-email',
        avatar: null,
      })

      expect(errors.value.email).toBe('Please enter a valid email address')
    })

    it('should validate name is not empty', async () => {
      const { useSettings } = await import('../../composables/useSettings')
      const { updateProfile, errors } = useSettings()

      await updateProfile({
        name: '',
        email: 'test@example.com',
        avatar: null,
      })

      expect(errors.value.name).toBe('Name is required')
    })

    it('should clear errors on valid update', async () => {
      const { useSettings } = await import('../../composables/useSettings')
      const { updateProfile, errors } = useSettings()

      // First invalid (no timer needed - returns immediately on validation failure)
      await updateProfile({ name: '', email: 'bad', avatar: null })
      expect(errors.value.name).toBeTruthy()
      expect(errors.value.email).toBeTruthy()

      // Then valid (needs timer for API simulation)
      const promise = updateProfile({ name: 'Valid', email: 'valid@test.com', avatar: null })
      await vi.advanceTimersByTimeAsync(500)
      await promise
      expect(errors.value.name).toBeFalsy()
      expect(errors.value.email).toBeFalsy()
    })
  })

  describe('password change', () => {
    it('should validate current password is required', async () => {
      const { useSettings } = await import('../../composables/useSettings')
      const { changePassword, errors } = useSettings()

      const result = await changePassword({
        currentPassword: '',
        newPassword: 'newpass123',
        confirmPassword: 'newpass123',
      })

      expect(result.success).toBe(false)
      expect(errors.value.currentPassword).toBe('Current password is required')
    })

    it('should validate new password minimum length', async () => {
      const { useSettings } = await import('../../composables/useSettings')
      const { changePassword, errors } = useSettings()

      const result = await changePassword({
        currentPassword: 'oldpass',
        newPassword: '123',
        confirmPassword: '123',
      })

      expect(result.success).toBe(false)
      expect(errors.value.newPassword).toBe('Password must be at least 6 characters')
    })

    it('should validate passwords match', async () => {
      const { useSettings } = await import('../../composables/useSettings')
      const { changePassword, errors } = useSettings()

      const result = await changePassword({
        currentPassword: 'oldpass',
        newPassword: 'newpass123',
        confirmPassword: 'different123',
      })

      expect(result.success).toBe(false)
      expect(errors.value.confirmPassword).toBe('Passwords do not match')
    })

    it('should succeed with valid password change', async () => {
      const { useSettings } = await import('../../composables/useSettings')
      const { changePassword, errors } = useSettings()

      const promise = changePassword({
        currentPassword: 'oldpass',
        newPassword: 'newpass123',
        confirmPassword: 'newpass123',
      })

      // Advance timer for API delay
      await vi.advanceTimersByTimeAsync(1000)
      const result = await promise

      expect(result.success).toBe(true)
      expect(errors.value.currentPassword).toBeFalsy()
      expect(errors.value.newPassword).toBeFalsy()
      expect(errors.value.confirmPassword).toBeFalsy()
    })
  })

  describe('preferences', () => {
    it('should have default preferences', async () => {
      const { useSettings } = await import('../../composables/useSettings')
      const { preferences } = useSettings()

      expect(preferences.value).toEqual({
        emailNotifications: true,
        pushNotifications: false,
        weeklyDigest: true,
      })
    })

    it('should update preferences and persist', async () => {
      const { useSettings } = await import('../../composables/useSettings')
      const { preferences, updatePreferences } = useSettings()

      const promise = updatePreferences({
        emailNotifications: false,
        pushNotifications: true,
        weeklyDigest: false,
      })

      await vi.advanceTimersByTimeAsync(300)
      await promise

      expect(preferences.value.emailNotifications).toBe(false)
      expect(preferences.value.pushNotifications).toBe(true)
      expect(preferences.value.weeklyDigest).toBe(false)

      const stored = JSON.parse(localStorage.getItem('careerbuddy_preferences') || '{}')
      expect(stored.emailNotifications).toBe(false)
    })

    it('should load preferences from localStorage', async () => {
      const savedPrefs = {
        emailNotifications: false,
        pushNotifications: true,
        weeklyDigest: false,
      }
      localStorage.setItem('careerbuddy_preferences', JSON.stringify(savedPrefs))

      vi.resetModules()
      const { useSettings } = await import('../../composables/useSettings')
      const { preferences, initSettings } = useSettings()
      initSettings()

      expect(preferences.value).toEqual(savedPrefs)
    })
  })

  describe('delete account', () => {
    it('should require confirmation text to match', async () => {
      const { useSettings } = await import('../../composables/useSettings')
      const { deleteAccount, errors } = useSettings()

      const result = await deleteAccount('wrong text')

      expect(result.success).toBe(false)
      expect(errors.value.deleteConfirmation).toBe('Please type "DELETE" to confirm')
    })

    it('should succeed when confirmation matches DELETE', async () => {
      const { useSettings } = await import('../../composables/useSettings')
      const { deleteAccount } = useSettings()

      const promise = deleteAccount('DELETE')

      // Advance timer for API delay
      await vi.advanceTimersByTimeAsync(1500)
      const result = await promise

      expect(result.success).toBe(true)
    })

    it('should clear all localStorage on successful delete', async () => {
      localStorage.setItem('careerbuddy_profile', '{"name":"test"}')
      localStorage.setItem('careerbuddy_preferences', '{}')
      localStorage.setItem('careerbuddy_user', '{}')

      const { useSettings } = await import('../../composables/useSettings')
      const { deleteAccount } = useSettings()

      const promise = deleteAccount('DELETE')
      await vi.advanceTimersByTimeAsync(1500)
      await promise

      expect(localStorage.getItem('careerbuddy_profile')).toBeNull()
      expect(localStorage.getItem('careerbuddy_preferences')).toBeNull()
      expect(localStorage.getItem('careerbuddy_user')).toBeNull()
    })
  })

  describe('loading state', () => {
    it('should have isLoading state', async () => {
      const { useSettings } = await import('../../composables/useSettings')
      const { isLoading } = useSettings()

      expect(isLoading.value).toBe(false)
    })

    it('should set isLoading during loadSettings', async () => {
      const { useSettings } = await import('../../composables/useSettings')
      const { isLoading, loadSettings } = useSettings()

      const promise = loadSettings()
      expect(isLoading.value).toBe(true)

      await vi.advanceTimersByTimeAsync(1000)
      await promise

      expect(isLoading.value).toBe(false)
    })

    it('should set isSaving during profile update', async () => {
      const { useSettings } = await import('../../composables/useSettings')
      const { isSaving, updateProfile } = useSettings()

      const promise = updateProfile({ name: 'Test', email: 'test@example.com', avatar: null })
      expect(isSaving.value).toBe(true)

      await vi.advanceTimersByTimeAsync(500)
      await promise

      expect(isSaving.value).toBe(false)
    })
  })
})
