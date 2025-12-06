<script setup lang="ts">
import {
  BookOpen,
  PlayCircle,
  MessageCircle,
  Mail,
  ExternalLink,
} from 'lucide-vue-next'
import type { HelpResource } from '@/composables/useHelp'

interface Props {
  resources: HelpResource[]
  loading: boolean
}

defineProps<Props>()

const iconMap: Record<string, any> = {
  BookOpen,
  PlayCircle,
  MessageCircle,
  Mail,
}
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
      <div v-if="loading" key="skeleton" class="space-y-4">
        <Skeleton class="h-6 w-40 mb-4" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="i in 4" :key="i" class="p-4 rounded-lg border border-border">
            <div class="flex items-start gap-4">
              <Skeleton class="h-10 w-10 rounded-lg shrink-0" />
              <div class="space-y-2 flex-1">
                <Skeleton class="h-5 w-32" />
                <Skeleton class="h-4 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actual Content -->
      <div v-else key="content">
        <h2 class="text-lg font-heading font-semibold mb-4">More Resources</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NuxtLink
            v-for="resource in resources"
            :key="resource.title"
            :to="resource.href"
            class="group p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-all duration-300"
          >
            <div class="flex items-start gap-4">
              <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <component :is="iconMap[resource.icon]" class="h-5 w-5 text-primary" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <h3 class="font-medium group-hover:text-primary transition-colors">
                    {{ resource.title }}
                  </h3>
                  <ExternalLink class="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p class="text-sm text-muted-foreground">
                  {{ resource.description }}
                </p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>
