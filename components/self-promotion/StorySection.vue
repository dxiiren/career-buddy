<script setup lang="ts">
import { BookOpen } from 'lucide-vue-next'
import type { StoryTemplate } from '@/composables/useSelfPromotion'

interface Props {
  templates: StoryTemplate[]
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
      <div v-if="loading" key="skeleton" class="space-y-4">
        <Skeleton class="h-6 w-40 mb-4" />
        <div class="space-y-4">
          <div v-for="i in 3" :key="i" class="p-4 rounded-xl border border-border space-y-3">
            <Skeleton class="h-5 w-32" />
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-16 w-full rounded-lg" />
          </div>
        </div>
      </div>

      <div v-else key="content">
        <div class="flex items-center gap-2 mb-4">
          <BookOpen class="h-5 w-5 text-primary" />
          <h2 class="text-lg font-heading font-semibold">Create Your Story</h2>
        </div>
        <div class="space-y-4">
          <div
            v-for="template in templates"
            :key="template.title"
            class="p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
          >
            <h3 class="font-medium mb-2">{{ template.title }}</h3>
            <p class="text-sm text-muted-foreground mb-3">{{ template.prompt }}</p>
            <div class="bg-muted/50 rounded-lg p-3">
              <p class="text-sm italic">"{{ template.example }}"</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
