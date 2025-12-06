<script setup lang="ts">
import { ref } from 'vue'
import { AlertTriangle } from 'lucide-vue-next'
import type { SettingsErrors } from '@/composables/useSettings'

interface Props {
  loading: boolean
  errors: SettingsErrors
}

defineProps<Props>()
const emit = defineEmits<{
  delete: [confirmationText: string]
}>()

const confirmationText = ref('')

function handleDelete() {
  emit('delete', confirmationText.value)
}
</script>

<template>
  <div class="h-full rounded-2xl bg-card border border-destructive/30 p-4 sm:p-5 lg:p-6">
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
        <Skeleton class="h-16 w-full" />
        <Skeleton class="h-10 w-full" />
        <Skeleton class="h-10 w-32" />
      </div>

      <!-- Actual Content -->
      <div v-else key="content">
        <div class="flex items-center gap-2 mb-4">
          <AlertTriangle class="h-5 w-5 text-destructive" />
          <h2 class="text-lg font-heading font-semibold text-destructive">Delete Account</h2>
        </div>

        <div class="bg-destructive/10 rounded-lg p-4 mb-4">
          <p class="text-sm text-muted-foreground">
            Once you delete your account, there is no going back. All your data including resumes,
            cover letters, interview progress, and saved messages will be permanently deleted.
          </p>
        </div>

        <form @submit.prevent="handleDelete" class="space-y-4">
          <div>
            <Label for="deleteConfirmation" class="text-sm font-medium">
              Type <span class="font-bold text-destructive">DELETE</span> to confirm
            </Label>
            <Input
              id="deleteConfirmation"
              name="deleteConfirmation"
              v-model="confirmationText"
              type="text"
              placeholder="Type DELETE here"
              class="mt-1"
              :class="{ 'border-destructive': errors.deleteConfirmation }"
            />
            <p v-if="errors.deleteConfirmation" class="text-sm text-destructive mt-1">
              {{ errors.deleteConfirmation }}
            </p>
          </div>

          <Button
            type="submit"
            variant="destructive"
            class="mt-2"
          >
            Delete My Account
          </Button>
        </form>
      </div>
    </Transition>
  </div>
</template>
