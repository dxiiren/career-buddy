<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <h3 :class="cn('text-xl font-semibold leading-none tracking-tight font-heading', props.class)">
    <slot />
  </h3>
</template>
