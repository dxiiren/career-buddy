<script setup lang="ts">
import { cn } from '@/lib/utils'
import { computed } from 'vue'

interface Props {
  modelValue?: number
  max?: number
  indicatorClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  max: 100,
})

const percentage = computed(() => {
  return Math.min(100, Math.max(0, (props.modelValue / props.max) * 100))
})
</script>

<template>
  <div
    role="progressbar"
    :aria-valuenow="props.modelValue"
    :aria-valuemax="props.max"
    :class="cn(
      'relative h-2 w-full overflow-hidden rounded-full bg-secondary/20',
      $attrs.class ?? ''
    )"
  >
    <div
      :class="cn(
        'h-full w-full flex-1 bg-primary transition-all duration-300',
        props.indicatorClass
      )"
      :style="{ transform: `translateX(-${100 - percentage}%)` }"
    />
  </div>
</template>
