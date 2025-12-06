<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  type?: string
  modelValue?: string | number
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: '',
  placeholder: '',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <input
    :type="props.type"
    :value="props.modelValue"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :class="cn(
      'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all duration-200',
      'file:border-0 file:bg-transparent file:text-sm file:font-medium',
      'placeholder:text-muted-foreground',
      'hover:border-primary/50',
      'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary',
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-input',
      $attrs.class ?? ''
    )"
    @input="handleInput"
  />
</template>
