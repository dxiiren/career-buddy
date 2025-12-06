<script setup lang="ts">
import { FileText, Download } from 'lucide-vue-next'
import type { ResumeTemplate } from '@/composables/useResume'

interface Props {
  template: ResumeTemplate | null
  loading: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  select: [template: ResumeTemplate]
}>()
</script>

<template>
  <div class="rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-all">
    <Transition
      mode="out-in"
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="loading" key="skeleton" class="p-6 space-y-4">
        <Skeleton class="h-32 w-full skeleton-shimmer" />
        <Skeleton class="h-5 w-32 skeleton-shimmer" />
        <Skeleton class="h-4 w-full skeleton-shimmer" />
      </div>

      <div v-else-if="template" key="content">
        <div class="h-32 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          <FileText class="h-12 w-12 text-primary/50" />
        </div>
        <div class="p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-medium">{{ template.name }}</h3>
            <span class="px-2 py-0.5 text-xs rounded-full bg-muted capitalize">
              {{ template.category.replace('-', ' ') }}
            </span>
          </div>
          <p class="text-sm text-muted-foreground mb-4">{{ template.description }}</p>
          <Button
            variant="outline"
            size="sm"
            class="w-full gap-2"
            @click="emit('select', template)"
          >
            <Download class="h-4 w-4" />
            Use Template
          </Button>
        </div>
      </div>
    </Transition>
  </div>
</template>
