<script setup lang="ts">
import { UserCheck, Briefcase, Heart, Linkedin, MessageSquare, RefreshCw, ChevronDown } from 'lucide-vue-next'
import { ref } from 'vue'
import type { Category } from '@/composables/useNetworking'

interface Props {
  category: Category
  loading: boolean
}

defineProps<Props>()

const isOpen = ref(true)

const iconMap: Record<string, any> = {
  UserCheck,
  Briefcase,
  Heart,
  Linkedin,
  MessageSquare,
  RefreshCw,
}
</script>

<template>
  <div class="rounded-2xl bg-card border border-border overflow-hidden">
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
      <div v-if="loading" key="skeleton" class="p-6 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Skeleton class="h-10 w-10 rounded-lg" />
            <div class="space-y-2">
              <Skeleton class="h-5 w-40" />
              <Skeleton class="h-4 w-56" />
            </div>
          </div>
          <Skeleton class="h-8 w-8 rounded" />
        </div>
      </div>

      <!-- Actual Content -->
      <div v-else key="content">
        <!-- Header -->
        <button
          @click="isOpen = !isOpen"
          class="w-full p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <component :is="iconMap[category.icon]" class="h-5 w-5 text-primary" />
            </div>
            <div class="text-left">
              <h3 class="font-medium">{{ category.name }}</h3>
              <p class="text-sm text-muted-foreground">{{ category.description }}</p>
            </div>
          </div>
          <ChevronDown
            class="h-5 w-5 text-muted-foreground transition-transform duration-200"
            :class="isOpen ? 'rotate-180' : ''"
          />
        </button>

        <!-- Content -->
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div v-if="isOpen" class="px-6 pb-6">
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>
