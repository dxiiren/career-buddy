<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Check } from 'lucide-vue-next'

interface Props {
  id?: string
  modelValue?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function toggle() {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>

<template>
  <button
    type="button"
    role="checkbox"
    :id="props.id"
    :aria-checked="props.modelValue"
    :disabled="props.disabled"
    :class="cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      props.modelValue ? 'bg-primary text-primary-foreground' : 'bg-background',
      $attrs.class ?? ''
    )"
    @click="toggle"
  >
    <span :class="cn('flex items-center justify-center', props.modelValue ? 'opacity-100' : 'opacity-0')">
      <Check class="h-3 w-3" />
    </span>
  </button>
</template>
