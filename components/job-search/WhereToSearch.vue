<script setup lang="ts">
import { Globe } from 'lucide-vue-next'
import type { SearchPlatform } from '@/composables/useJobSearch'

interface Props {
  platforms: SearchPlatform[]
  loading: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-4 sm:p-5 lg:p-6">
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
        <Skeleton class="h-6 w-40 skeleton-shimmer" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Skeleton v-for="i in 6" :key="i" class="h-20 w-full skeleton-shimmer" />
        </div>
      </div>

      <div v-else key="content">
        <div class="flex items-center gap-2 mb-4">
          <Globe class="h-5 w-5 text-primary" />
          <h2 class="text-lg font-heading font-semibold">Where to Search</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div
            v-for="platform in platforms"
            :key="platform.name"
            class="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
          >
            <h3 class="font-medium mb-1">
              <a
                v-if="platform.url"
                :href="platform.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary hover:underline"
              >
                {{ platform.name }}
              </a>
              <span v-else>{{ platform.name }}</span>
            </h3>
            <p class="text-sm text-muted-foreground">{{ platform.description }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
