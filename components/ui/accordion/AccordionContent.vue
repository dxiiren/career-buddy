<script setup lang="ts">
import { AccordionContent, type AccordionContentProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionContentProps & { class?: string }>()

const delegatedProps = computed(() => {
  const { class: _, ...rest } = props
  return rest
})
</script>

<template>
  <AccordionContent
    v-bind="delegatedProps"
    :class="cn('overflow-hidden text-sm', props.class)"
  >
    <div class="pb-4 pt-0">
      <slot />
    </div>
  </AccordionContent>
</template>
