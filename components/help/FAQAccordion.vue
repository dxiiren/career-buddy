<script setup lang="ts">
import { HelpCircle } from 'lucide-vue-next'
import type { FAQItem } from '@/composables/useHelp'

interface Props {
  items: FAQItem[]
  loading: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-6">
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
      <div v-if="loading" key="skeleton" class="space-y-3">
        <div v-for="i in 5" :key="i" class="p-4 rounded-lg border border-border">
          <Skeleton class="h-5 w-3/4 mb-2" />
          <Skeleton class="h-4 w-full" />
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="items.length === 0"
        key="empty"
        class="text-center py-12"
      >
        <HelpCircle class="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 class="text-lg font-medium mb-2">No questions found</h3>
        <p class="text-sm text-muted-foreground">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>

      <!-- Actual Content -->
      <div v-else key="content">
        <h2 class="text-lg font-heading font-semibold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible class="space-y-2">
          <AccordionItem
            v-for="item in items"
            :key="item.id"
            :value="item.id"
            class="border border-border rounded-lg px-4"
          >
            <AccordionTrigger class="text-left font-medium hover:no-underline">
              {{ item.question }}
            </AccordionTrigger>
            <AccordionContent class="text-muted-foreground pb-4">
              {{ item.answer }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Transition>
  </div>
</template>
