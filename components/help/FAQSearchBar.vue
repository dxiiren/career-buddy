<script setup lang="ts">
import { Search, X } from 'lucide-vue-next'

interface Props {
  loading: boolean
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function handleClear() {
  emit('update:modelValue', '')
}
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
      <!-- Skeleton Loading -->
      <div v-if="loading" key="skeleton">
        <Skeleton class="h-12 w-full" />
      </div>

      <!-- Actual Content -->
      <div v-else key="content">
        <div class="relative">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            :value="modelValue"
            @input="handleInput"
            placeholder="Search frequently asked questions..."
            class="w-full h-12 pl-12 pr-12 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <button
            v-if="modelValue"
            data-testid="clear-button"
            @click="handleClear"
            class="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
          >
            <X class="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
