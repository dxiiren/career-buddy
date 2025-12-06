<script setup lang="ts">
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-vue-next'

const select = inject<{
  modelValue: ComputedRef<string>
  updateValue: (value: string) => void
  isOpen: Ref<boolean>
}>('select')

function toggleOpen() {
  if (select) {
    select.isOpen.value = !select.isOpen.value
  }
}
</script>

<template>
  <button
    type="button"
    :class="cn(
      'flex h-10 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all duration-200',
      'placeholder:text-muted-foreground',
      'hover:border-primary/50',
      'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
      'disabled:cursor-not-allowed disabled:opacity-50',
      $attrs.class ?? ''
    )"
    @click="toggleOpen"
  >
    <slot />
    <ChevronDown class="h-4 w-4 opacity-50 transition-transform duration-200" :class="{ 'rotate-180': select?.isOpen.value }" />
  </button>
</template>
