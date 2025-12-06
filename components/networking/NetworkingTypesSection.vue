<script setup lang="ts">
import { Globe, MapPin } from 'lucide-vue-next'
import type { NetworkingType } from '@/composables/useNetworking'

interface Props {
  types: NetworkingType[]
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
      <!-- Skeleton Loading -->
      <div v-if="loading" key="skeleton" class="space-y-4">
        <Skeleton class="h-6 w-48 mb-4" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="i in 2" :key="i" class="p-4 rounded-xl border border-border space-y-3">
            <div class="flex items-center gap-3">
              <Skeleton class="h-10 w-10 rounded-lg" />
              <Skeleton class="h-5 w-32" />
            </div>
            <Skeleton class="h-4 w-full" />
            <div class="space-y-2">
              <Skeleton class="h-3 w-24" />
              <Skeleton class="h-3 w-20" />
              <Skeleton class="h-3 w-28" />
            </div>
          </div>
        </div>
      </div>

      <!-- Actual Content -->
      <div v-else key="content">
        <h2 class="text-lg font-heading font-semibold mb-4">Types of Networking</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(type, index) in types"
            :key="type.title"
            class="p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-all duration-300"
          >
            <div class="flex items-center gap-3 mb-3">
              <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Globe v-if="index === 0" class="h-5 w-5 text-primary" />
                <MapPin v-else class="h-5 w-5 text-primary" />
              </div>
              <h3 class="font-medium">{{ type.title }}</h3>
            </div>
            <p class="text-sm text-muted-foreground mb-3">{{ type.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="example in type.examples"
                :key="example"
                class="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
              >
                {{ example }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
