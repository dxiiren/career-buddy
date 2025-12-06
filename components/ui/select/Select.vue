<script setup lang="ts">
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-vue-next'

interface Props {
  modelValue?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const selectRef = ref<HTMLDivElement | null>(null)

function toggleOpen() {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

function closeDropdown() {
  isOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

provide('select', {
  modelValue: computed(() => props.modelValue),
  updateValue: (value: string) => {
    emit('update:modelValue', value)
    closeDropdown()
  },
  isOpen,
})
</script>

<template>
  <div ref="selectRef" class="relative">
    <slot />
  </div>
</template>
