<script setup lang="ts">
import { ref } from 'vue'
import type { PasswordChange, SettingsErrors } from '@/composables/useSettings'

interface Props {
  loading: boolean
  saving: boolean
  errors: SettingsErrors
}

defineProps<Props>()
const emit = defineEmits<{
  change: [data: PasswordChange]
}>()

const formData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

function handleSubmit() {
  emit('change', { ...formData.value })
}
</script>

<template>
  <div class="h-full rounded-2xl bg-card border border-border p-6">
    <Transition
      mode="out-in"
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <!-- Skeleton Loading -->
      <div v-if="loading" key="skeleton" class="space-y-4">
        <Skeleton class="h-6 w-40 mb-4" />
        <div class="space-y-4">
          <div>
            <Skeleton class="h-4 w-32 mb-2" />
            <Skeleton class="h-10 w-full" />
          </div>
          <div>
            <Skeleton class="h-4 w-28 mb-2" />
            <Skeleton class="h-10 w-full" />
          </div>
          <div>
            <Skeleton class="h-4 w-36 mb-2" />
            <Skeleton class="h-10 w-full" />
          </div>
          <Skeleton class="h-10 w-40" />
        </div>
      </div>

      <!-- Actual Content -->
      <div v-else key="content">
        <h2 class="text-lg font-heading font-semibold mb-4">Change Password</h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Current Password -->
          <div>
            <Label for="currentPassword" class="text-sm font-medium">Current Password</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              v-model="formData.currentPassword"
              type="password"
              placeholder="Enter current password"
              class="mt-1"
              :class="{ 'border-destructive': errors.currentPassword }"
            />
            <p v-if="errors.currentPassword" class="text-sm text-destructive mt-1">
              {{ errors.currentPassword }}
            </p>
          </div>

          <!-- New Password -->
          <div>
            <Label for="newPassword" class="text-sm font-medium">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              v-model="formData.newPassword"
              type="password"
              placeholder="Enter new password"
              class="mt-1"
              :class="{ 'border-destructive': errors.newPassword }"
            />
            <p v-if="errors.newPassword" class="text-sm text-destructive mt-1">
              {{ errors.newPassword }}
            </p>
          </div>

          <!-- Confirm Password -->
          <div>
            <Label for="confirmPassword" class="text-sm font-medium">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              placeholder="Confirm new password"
              class="mt-1"
              :class="{ 'border-destructive': errors.confirmPassword }"
            />
            <p v-if="errors.confirmPassword" class="text-sm text-destructive mt-1">
              {{ errors.confirmPassword }}
            </p>
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            :disabled="saving"
            class="mt-2"
          >
            <span v-if="saving">Updating...</span>
            <span v-else>Update Password</span>
          </Button>
        </form>
      </div>
    </Transition>
  </div>
</template>
