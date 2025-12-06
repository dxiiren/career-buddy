<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Check } from 'lucide-vue-next'

interface Props {
  value: string
}

const props = defineProps<Props>()

const select = inject<{
  modelValue: ComputedRef<string>
  updateValue: (value: string) => void
  isOpen: Ref<boolean>
}>('select')

const isSelected = computed(() => select?.modelValue.value === props.value)

function handleClick() {
  select?.updateValue(props.value)
}
</script>

<template>
  <button
    type="button"
    :class="cn(
      'relative flex w-full cursor-pointer select-none items-center rounded-md py-2 px-3 text-sm outline-none transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      'focus:bg-accent focus:text-accent-foreground',
      isSelected && 'bg-accent text-accent-foreground',
      $attrs.class ?? ''
    )"
    @click="handleClick"
  >
    <span class="flex-1 text-left">
      <slot />
    </span>
    <Check v-if="isSelected" class="h-4 w-4 ml-2" />
  </button>
</template>
