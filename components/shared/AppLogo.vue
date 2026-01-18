<script setup lang="ts">
defineProps<{
  class?: string
}>()
</script>

<template>
  <NuxtLink to="/" class="flex items-center" :class="$props.class">
    <img
      src="/images/brand/logo-full.png"
      alt="Career Buddy"
      class="h-16 w-auto object-contain mt-2"
    />
  </NuxtLink>
</template>
