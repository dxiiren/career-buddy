<script setup lang="ts">
defineProps<{ schema: Record<string, unknown> | Record<string, unknown>[] }>()
</script>

<template>
  <component :is="'script'" type="application/ld+json" v-html="JSON.stringify(schema)" />
</template>
