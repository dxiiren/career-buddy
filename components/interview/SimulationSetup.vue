<script setup lang="ts">
import { Play, MessageSquare, Mic } from 'lucide-vue-next'
import type { SimulationSettings } from '@/composables/useInterview'

interface Props {
  settings: SimulationSettings
  loading: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  start: []
  updateSettings: [settings: Partial<SimulationSettings>]
}>()

const categories = [
  { value: 'all', label: 'All Questions' },
  { value: 'hr', label: 'HR Questions' },
  { value: 'behavioral', label: 'Behavioral' },
  { value: 'fresh-grad', label: 'Fresh Graduate' },
  { value: 'salary', label: 'Salary' },
]

const timeLimits = [
  { value: 60, label: '1 minute' },
  { value: 120, label: '2 minutes' },
  { value: 180, label: '3 minutes' },
  { value: 300, label: '5 minutes' },
]
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-4 sm:p-5 lg:p-6">
    <Transition
      mode="out-in"
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="loading" key="skeleton" class="space-y-6">
        <Skeleton class="h-6 w-48 skeleton-shimmer" />
        <div class="space-y-4">
          <Skeleton class="h-12 w-full skeleton-shimmer" />
          <Skeleton class="h-12 w-full skeleton-shimmer" />
          <Skeleton class="h-12 w-full skeleton-shimmer" />
        </div>
      </div>

      <div v-else key="content">
        <h2 class="text-lg font-heading font-semibold mb-6">Interview Simulation Setup</h2>

        <div class="space-y-6">
          <div>
            <label class="text-sm font-medium mb-2 block">Mode</label>
            <div class="grid grid-cols-2 gap-3">
              <button
                :class="[
                  'p-4 rounded-xl border flex items-center gap-3 transition-all',
                  settings.mode === 'text'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                ]"
                @click="emit('updateSettings', { mode: 'text' })"
              >
                <MessageSquare class="h-5 w-5" />
                <span class="font-medium">Text Mode</span>
              </button>
              <button
                :class="[
                  'p-4 rounded-xl border flex items-center gap-3 transition-all',
                  settings.mode === 'voice'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                ]"
                @click="emit('updateSettings', { mode: 'voice' })"
              >
                <Mic class="h-5 w-5" />
                <span class="font-medium">Voice Mode</span>
              </button>
            </div>
          </div>

          <div>
            <label class="text-sm font-medium mb-2 block">Question Category</label>
            <select
              :value="settings.category"
              class="w-full p-3 rounded-xl border border-border bg-background"
              @change="emit('updateSettings', { category: ($event.target as HTMLSelectElement).value })"
            >
              <option v-for="cat in categories" :key="cat.value" :value="cat.value">
                {{ cat.label }}
              </option>
            </select>
          </div>

          <div>
            <label class="text-sm font-medium mb-2 block">Time Limit per Question</label>
            <select
              :value="settings.timeLimit"
              class="w-full p-3 rounded-xl border border-border bg-background"
              @change="emit('updateSettings', { timeLimit: Number(($event.target as HTMLSelectElement).value) })"
            >
              <option v-for="time in timeLimits" :key="time.value" :value="time.value">
                {{ time.label }}
              </option>
            </select>
          </div>

          <Button class="w-full gap-2" size="lg" @click="emit('start')">
            <Play class="h-5 w-5" />
            Start Simulation
          </Button>
        </div>
      </div>
    </Transition>
  </div>
</template>
