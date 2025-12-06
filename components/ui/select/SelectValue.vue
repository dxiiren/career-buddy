<script setup lang="ts">
interface Props {
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
})

const select = inject<{
  modelValue: ComputedRef<string>
  updateValue: (value: string) => void
  isOpen: Ref<boolean>
}>('select')
</script>

<template>
  <span :class="{ 'text-muted-foreground': !select?.modelValue.value }">
    <slot v-if="select?.modelValue.value" />
    <template v-else>{{ placeholder }}</template>
  </span>
</template>
