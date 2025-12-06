<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Preferences } from '@/composables/useSettings'

interface Props {
  preferences: Preferences
  loading: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  update: [preferences: Preferences]
}>()

// Local state for preferences
const localPrefs = ref<Preferences>({ ...props.preferences })

// Sync with props when preferences change externally
watch(() => props.preferences, (newPrefs) => {
  localPrefs.value = { ...newPrefs }
}, { deep: true })

function handleToggle(key: keyof Preferences) {
  localPrefs.value[key] = !localPrefs.value[key]
  emit('update', { ...localPrefs.value })
}
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-6">
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
        <Skeleton class="h-6 w-32 mb-4" />
        <div class="space-y-4">
          <div v-for="i in 3" :key="i" class="flex items-center justify-between">
            <div>
              <Skeleton class="h-5 w-40 mb-1" />
              <Skeleton class="h-4 w-56" />
            </div>
            <Skeleton class="h-6 w-10 rounded-full" />
          </div>
        </div>
      </div>

      <!-- Actual Content -->
      <div v-else key="content">
        <h2 class="text-lg font-heading font-semibold mb-4">Preferences</h2>

        <div class="space-y-4">
          <!-- Email Notifications -->
          <div class="flex items-center justify-between">
            <div>
              <Label for="emailNotifications" class="text-sm font-medium">Email Notifications</Label>
              <p class="text-sm text-muted-foreground">Receive email updates about your progress</p>
            </div>
            <Checkbox
              id="emailNotifications"
              :model-value="localPrefs.emailNotifications"
              @update:model-value="handleToggle('emailNotifications')"
            />
          </div>

          <!-- Push Notifications -->
          <div class="flex items-center justify-between">
            <div>
              <Label for="pushNotifications" class="text-sm font-medium">Push Notifications</Label>
              <p class="text-sm text-muted-foreground">Receive push notifications for reminders</p>
            </div>
            <Checkbox
              id="pushNotifications"
              :model-value="localPrefs.pushNotifications"
              @update:model-value="handleToggle('pushNotifications')"
            />
          </div>

          <!-- Weekly Digest -->
          <div class="flex items-center justify-between">
            <div>
              <Label for="weeklyDigest" class="text-sm font-medium">Weekly Digest</Label>
              <p class="text-sm text-muted-foreground">Get a weekly summary of your activity</p>
            </div>
            <Checkbox
              id="weeklyDigest"
              :model-value="localPrefs.weeklyDigest"
              @update:model-value="handleToggle('weeklyDigest')"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
