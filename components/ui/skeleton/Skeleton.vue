<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>

<template>
  <div
    :class="cn(
      'animate-shimmer rounded-md bg-muted/50',
      'bg-gradient-to-r from-muted/50 via-muted/80 to-muted/50',
      'bg-[length:200%_100%]',
      $attrs.class ?? ''
    )"
  />
</template>

<style>
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.animate-shimmer {
  animation: shimmer 2s ease-in-out infinite;
}
</style>
