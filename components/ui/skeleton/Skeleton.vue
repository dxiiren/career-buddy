<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>

<template>
  <div
    :class="cn(
      'skeleton-shimmer rounded-md',
      $attrs.class ?? ''
    )"
  />
</template>

<style>
.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    hsl(var(--muted) / 0.4) 0%,
    hsl(var(--muted) / 0.7) 50%,
    hsl(var(--muted) / 0.4) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
