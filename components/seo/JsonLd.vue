<script setup lang="ts">
const props = defineProps<{ schema: Record<string, unknown> | Record<string, unknown>[] }>()

// Format schema properly for Google Rich Results
// When multiple schemas are passed, use @graph format
const formattedSchema = computed(() => {
  if (Array.isArray(props.schema)) {
    // Remove @context from individual schemas when using @graph
    const schemasWithoutContext = props.schema.map(s => {
      const { '@context': _, ...rest } = s
      return rest
    })
    return {
      '@context': 'https://schema.org',
      '@graph': schemasWithoutContext
    }
  }
  return props.schema
})
</script>

<template>
  <component :is="'script'" type="application/ld+json" v-html="JSON.stringify(formattedSchema)" />
</template>
