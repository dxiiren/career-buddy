<script setup lang="ts">
import { cn } from '@/lib/utils'

const select = inject<{
  modelValue: ComputedRef<string>
  updateValue: (value: string) => void
  isOpen: Ref<boolean>
}>('select')
</script>

<template>
  <Transition
    enter-active-class="transition ease-out duration-100"
    enter-from-class="transform opacity-0 scale-95"
    enter-to-class="transform opacity-100 scale-100"
    leave-active-class="transition ease-in duration-75"
    leave-from-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-95"
  >
    <div
      v-if="select?.isOpen.value"
      :class="cn(
        'absolute z-50 mt-1 min-w-[8rem] w-full overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-md',
        $attrs.class ?? ''
      )"
    >
      <div class="p-1">
        <slot />
      </div>
    </div>
  </Transition>
</template>
