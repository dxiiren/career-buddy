<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md', props.class)">
    <slot />
  </div>
</template>
