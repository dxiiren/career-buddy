import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

describe('Settings Components', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('ProfileSection', () => {
    it('renders profile form fields', async () => {
      const ProfileSection = await import('../../components/settings/ProfileSection.vue')
      const wrapper = await mountSuspended(ProfileSection.default, {
        props: {
          profile: { name: 'John', email: 'john@example.com', avatar: null },
          loading: false,
          saving: false,
          errors: {},
        },
      })

      expect(wrapper.find('input[name="name"]').exists()).toBe(true)
      expect(wrapper.find('input[name="email"]').exists()).toBe(true)
    })

    it('shows skeleton when loading', async () => {
      const ProfileSection = await import('../../components/settings/ProfileSection.vue')
      const wrapper = await mountSuspended(ProfileSection.default, {
        props: {
          profile: { name: '', email: '', avatar: null },
          loading: true,
          saving: false,
          errors: {},
        },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
      expect(wrapper.find('input[name="name"]').exists()).toBe(false)
    })

    it('displays current profile values', async () => {
      const ProfileSection = await import('../../components/settings/ProfileSection.vue')
      const wrapper = await mountSuspended(ProfileSection.default, {
        props: {
          profile: { name: 'Jane Doe', email: 'jane@test.com', avatar: null },
          loading: false,
          saving: false,
          errors: {},
        },
      })

      const nameInput = wrapper.find('input[name="name"]')
      const emailInput = wrapper.find('input[name="email"]')

      expect((nameInput.element as HTMLInputElement).value).toBe('Jane Doe')
      expect((emailInput.element as HTMLInputElement).value).toBe('jane@test.com')
    })

    it('shows validation errors', async () => {
      const ProfileSection = await import('../../components/settings/ProfileSection.vue')
      const wrapper = await mountSuspended(ProfileSection.default, {
        props: {
          profile: { name: '', email: 'bad', avatar: null },
          loading: false,
          saving: false,
          errors: { name: 'Name is required', email: 'Invalid email' },
        },
      })

      expect(wrapper.text()).toContain('Name is required')
      expect(wrapper.text()).toContain('Invalid email')
    })

    it('emits update event on form submit', async () => {
      const ProfileSection = await import('../../components/settings/ProfileSection.vue')
      const wrapper = await mountSuspended(ProfileSection.default, {
        props: {
          profile: { name: 'Test', email: 'test@test.com', avatar: null },
          loading: false,
          saving: false,
          errors: {},
        },
      })

      await wrapper.find('form').trigger('submit')

      expect(wrapper.emitted('update')).toBeTruthy()
    })

    it('disables button while saving', async () => {
      const ProfileSection = await import('../../components/settings/ProfileSection.vue')
      const wrapper = await mountSuspended(ProfileSection.default, {
        props: {
          profile: { name: 'Test', email: 'test@test.com', avatar: null },
          loading: false,
          saving: true,
          errors: {},
        },
      })

      const button = wrapper.find('button[type="submit"]')
      expect(button.attributes('disabled')).toBeDefined()
    })
  })

  describe('PasswordSection', () => {
    it('renders password change form', async () => {
      const PasswordSection = await import('../../components/settings/PasswordSection.vue')
      const wrapper = await mountSuspended(PasswordSection.default, {
        props: {
          loading: false,
          saving: false,
          errors: {},
        },
      })

      expect(wrapper.find('input[name="currentPassword"]').exists()).toBe(true)
      expect(wrapper.find('input[name="newPassword"]').exists()).toBe(true)
      expect(wrapper.find('input[name="confirmPassword"]').exists()).toBe(true)
    })

    it('shows skeleton when loading', async () => {
      const PasswordSection = await import('../../components/settings/PasswordSection.vue')
      const wrapper = await mountSuspended(PasswordSection.default, {
        props: {
          loading: true,
          saving: false,
          errors: {},
        },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })

    it('shows password errors', async () => {
      const PasswordSection = await import('../../components/settings/PasswordSection.vue')
      const wrapper = await mountSuspended(PasswordSection.default, {
        props: {
          loading: false,
          saving: false,
          errors: {
            currentPassword: 'Current password is required',
            newPassword: 'Password too short',
          },
        },
      })

      expect(wrapper.text()).toContain('Current password is required')
      expect(wrapper.text()).toContain('Password too short')
    })

    it('emits change event on form submit', async () => {
      const PasswordSection = await import('../../components/settings/PasswordSection.vue')
      const wrapper = await mountSuspended(PasswordSection.default, {
        props: {
          loading: false,
          saving: false,
          errors: {},
        },
      })

      // Fill in the form
      await wrapper.find('input[name="currentPassword"]').setValue('oldpass')
      await wrapper.find('input[name="newPassword"]').setValue('newpass123')
      await wrapper.find('input[name="confirmPassword"]').setValue('newpass123')

      await wrapper.find('form').trigger('submit')

      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')![0]).toEqual([{
        currentPassword: 'oldpass',
        newPassword: 'newpass123',
        confirmPassword: 'newpass123',
      }])
    })
  })

  describe('PreferencesSection', () => {
    it('renders preference toggles', async () => {
      const PreferencesSection = await import('../../components/settings/PreferencesSection.vue')
      const wrapper = await mountSuspended(PreferencesSection.default, {
        props: {
          preferences: {
            emailNotifications: true,
            pushNotifications: false,
            weeklyDigest: true,
          },
          loading: false,
        },
      })

      expect(wrapper.text()).toContain('Email Notifications')
      expect(wrapper.text()).toContain('Push Notifications')
      expect(wrapper.text()).toContain('Weekly Digest')
    })

    it('shows skeleton when loading', async () => {
      const PreferencesSection = await import('../../components/settings/PreferencesSection.vue')
      const wrapper = await mountSuspended(PreferencesSection.default, {
        props: {
          preferences: {
            emailNotifications: true,
            pushNotifications: false,
            weeklyDigest: true,
          },
          loading: true,
        },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })

    it('emits update on toggle change', async () => {
      const PreferencesSection = await import('../../components/settings/PreferencesSection.vue')
      const wrapper = await mountSuspended(PreferencesSection.default, {
        props: {
          preferences: {
            emailNotifications: true,
            pushNotifications: false,
            weeklyDigest: true,
          },
          loading: false,
        },
      })

      // Find and click a checkbox button (Radix Vue renders as button with role checkbox)
      const checkboxButtons = wrapper.findAll('button[role="checkbox"]')
      await checkboxButtons[0].trigger('click')

      expect(wrapper.emitted('update')).toBeTruthy()
    })
  })

  describe('DangerZone', () => {
    it('renders delete account section', async () => {
      const DangerZone = await import('../../components/settings/DangerZone.vue')
      const wrapper = await mountSuspended(DangerZone.default, {
        props: {
          loading: false,
          errors: {},
        },
      })

      expect(wrapper.text()).toContain('Delete Account')
      expect(wrapper.text()).toContain('DELETE')
    })

    it('shows skeleton when loading', async () => {
      const DangerZone = await import('../../components/settings/DangerZone.vue')
      const wrapper = await mountSuspended(DangerZone.default, {
        props: {
          loading: true,
          errors: {},
        },
      })

      expect(wrapper.findAll('.skeleton-shimmer').length).toBeGreaterThan(0)
    })

    it('shows confirmation error', async () => {
      const DangerZone = await import('../../components/settings/DangerZone.vue')
      const wrapper = await mountSuspended(DangerZone.default, {
        props: {
          loading: false,
          errors: { deleteConfirmation: 'Please type "DELETE" to confirm' },
        },
      })

      expect(wrapper.text()).toContain('Please type "DELETE" to confirm')
    })

    it('emits delete event with confirmation text', async () => {
      const DangerZone = await import('../../components/settings/DangerZone.vue')
      const wrapper = await mountSuspended(DangerZone.default, {
        props: {
          loading: false,
          errors: {},
        },
      })

      // Find input and type DELETE
      const input = wrapper.find('input[name="deleteConfirmation"]')
      await input.setValue('DELETE')

      // Submit form (trigger form submit event, not button click)
      await wrapper.find('form').trigger('submit')

      expect(wrapper.emitted('delete')).toBeTruthy()
      expect(wrapper.emitted('delete')![0]).toEqual(['DELETE'])
    })

    it('has destructive styling for delete button', async () => {
      const DangerZone = await import('../../components/settings/DangerZone.vue')
      const wrapper = await mountSuspended(DangerZone.default, {
        props: {
          loading: false,
          errors: {},
        },
      })

      const deleteButton = wrapper.find('button[type="submit"]')
      expect(deleteButton.classes().join(' ')).toContain('destructive')
    })
  })
})
