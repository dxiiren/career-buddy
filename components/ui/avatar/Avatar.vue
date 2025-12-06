<script setup lang="ts">
import { cn } from '@/lib/utils'
import { ref } from 'vue'

interface Props {
  src?: string
  alt?: string
  fallback?: string
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  fallback: 'U',
})

const imageError = ref(false)

function handleError() {
  imageError.value = true
}
</script>

<template>
  <span
    :class="cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      $attrs.class ?? ''
    )"
  >
    <img
      v-if="props.src && !imageError"
      :src="props.src"
      :alt="props.alt"
      class="aspect-square h-full w-full object-cover"
      @error="handleError"
    />
    <span
      v-else
      :class="cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium'
      )"
    >
      {{ props.fallback }}
    </span>
  </span>
</template>
