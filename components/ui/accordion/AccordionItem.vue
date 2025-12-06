<script setup lang="ts">
import { AccordionItem, type AccordionItemProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionItemProps & { class?: string }>()

const delegatedProps = computed(() => {
  const { class: _, ...rest } = props
  return rest
})
</script>

<template>
  <AccordionItem v-bind="delegatedProps" :class="cn('border-b', props.class)">
    <slot />
  </AccordionItem>
</template>
