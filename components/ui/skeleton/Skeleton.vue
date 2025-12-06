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
/* Dark mode skeleton */
.skeleton-shimmer {
  position: relative;
  overflow: hidden;
  background-color: hsl(var(--muted) / 0.6);
}

.skeleton-shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    hsl(var(--muted) / 0.3) 50%,
    transparent 100%
  );
  animation: shimmer-wave 1.5s ease-in-out infinite;
}

/* Light mode - gray skeleton bars on white cards */
:root:not(.dark) .skeleton-shimmer {
  background-color: #d1d5db;
}

:root:not(.dark) .skeleton-shimmer::after {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.6) 50%,
    transparent 100%
  );
}

@keyframes shimmer-wave {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
