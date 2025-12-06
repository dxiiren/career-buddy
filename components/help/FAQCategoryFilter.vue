<script setup lang="ts">
import {
  Rocket,
  FileText,
  Mic,
  Users,
  Settings,
  CreditCard,
  LayoutGrid,
} from 'lucide-vue-next'
import type { FAQCategory, FAQCategoryInfo } from '@/composables/useHelp'

interface Props {
  categories: FAQCategoryInfo[]
  selectedCategory: FAQCategory | null
  loading: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  select: [category: FAQCategory | null]
}>()

const iconMap: Record<string, any> = {
  Rocket,
  FileText,
  Mic,
  Users,
  Settings,
  CreditCard,
}

function handleSelect(category: FAQCategory | null) {
  emit('select', category)
}
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-3 sm:p-4">
    <Transition
      mode="out-in"
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <!-- Skeleton Loading -->
      <div v-if="loading" key="skeleton" class="flex gap-2 overflow-x-auto">
        <Skeleton v-for="i in 5" :key="i" class="h-10 w-28 shrink-0 rounded-lg" />
      </div>

      <!-- Actual Content -->
      <div v-else key="content" class="flex gap-2 overflow-x-auto pb-1">
        <!-- All Button -->
        <button
          @click="handleSelect(null)"
          class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shrink-0 transition-colors"
          :class="selectedCategory === null
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'"
        >
          <LayoutGrid class="h-4 w-4" />
          All
        </button>

        <!-- Category Buttons -->
        <button
          v-for="category in categories"
          :key="category.id"
          @click="handleSelect(category.id)"
          class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shrink-0 transition-colors"
          :class="selectedCategory === category.id
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'"
        >
          <component :is="iconMap[category.icon]" class="h-4 w-4" />
          {{ category.name }}
        </button>
      </div>
    </Transition>
  </div>
</template>
