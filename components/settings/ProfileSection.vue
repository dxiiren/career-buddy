<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Profile, SettingsErrors } from '@/composables/useSettings'

interface Props {
  profile: Profile
  loading: boolean
  saving: boolean
  errors: SettingsErrors
}

const props = defineProps<Props>()
const emit = defineEmits<{
  update: [profile: Profile]
}>()

// Local form state
const formData = ref<Profile>({ ...props.profile })

// Sync with props when profile changes externally
watch(() => props.profile, (newProfile) => {
  formData.value = { ...newProfile }
}, { deep: true })

function handleSubmit() {
  emit('update', { ...formData.value })
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
          <div>
            <Skeleton class="h-4 w-16 mb-2" />
            <Skeleton class="h-10 w-full" />
          </div>
          <div>
            <Skeleton class="h-4 w-16 mb-2" />
            <Skeleton class="h-10 w-full" />
          </div>
          <Skeleton class="h-10 w-32" />
        </div>
      </div>

      <!-- Actual Content -->
      <div v-else key="content">
        <h2 class="text-lg font-heading font-semibold mb-4">Profile Information</h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Name Field -->
          <div>
            <Label for="name" class="text-sm font-medium">Name</Label>
            <Input
              id="name"
              name="name"
              v-model="formData.name"
              type="text"
              placeholder="Your name"
              class="mt-1"
              :class="{ 'border-destructive': errors.name }"
            />
            <p v-if="errors.name" class="text-sm text-destructive mt-1">
              {{ errors.name }}
            </p>
          </div>

          <!-- Email Field -->
          <div>
            <Label for="email" class="text-sm font-medium">Email</Label>
            <Input
              id="email"
              name="email"
              v-model="formData.email"
              type="email"
              placeholder="your@email.com"
              class="mt-1"
              :class="{ 'border-destructive': errors.email }"
            />
            <p v-if="errors.email" class="text-sm text-destructive mt-1">
              {{ errors.email }}
            </p>
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            :disabled="saving"
            class="mt-2"
          >
            <span v-if="saving">Saving...</span>
            <span v-else>Save Changes</span>
          </Button>
        </form>
      </div>
    </Transition>
  </div>
</template>
