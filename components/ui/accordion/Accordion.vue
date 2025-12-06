<script setup lang="ts">
import { AccordionRoot, type AccordionRootEmits, type AccordionRootProps, useForwardPropsEmits } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionRootProps & { class?: string }>()
const emits = defineEmits<AccordionRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...rest } = props
  return rest
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <AccordionRoot v-bind="forwarded" :class="cn('w-full', props.class)">
    <slot />
  </AccordionRoot>
</template>
