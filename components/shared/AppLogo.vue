<script setup lang="ts">
defineProps<{
  class?: string
}>()
</script>

<template>
  <NuxtLink to="/" class="flex items-center gap-2" :class="$props.class">
    <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
      <svg
        class="h-5 w-5 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    </div>
    <span class="text-xl font-bold font-heading text-foreground">Career Buddy</span>
  </NuxtLink>
</template>
