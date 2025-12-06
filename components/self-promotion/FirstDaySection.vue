<script setup lang="ts">
import { Calendar, CheckCircle2 } from 'lucide-vue-next'
import type { FirstDayItem } from '@/composables/useSelfPromotion'

interface Props {
  guide: FirstDayItem[]
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
        <Skeleton class="h-6 w-40 mb-4" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="i in 4" :key="i" class="p-4 rounded-xl border border-border space-y-3">
            <Skeleton class="h-5 w-32" />
            <div class="space-y-2">
              <Skeleton v-for="j in 4" :key="j" class="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>

      <div v-else key="content">
        <div class="flex items-center gap-2 mb-4">
          <Calendar class="h-5 w-5 text-primary" />
          <h2 class="text-lg font-heading font-semibold">First Day Guide</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="item in guide"
            :key="item.title"
            class="p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
          >
            <h3 class="font-medium mb-3">{{ item.title }}</h3>
            <ul class="space-y-2">
              <li
                v-for="tip in item.tips"
                :key="tip"
                class="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 class="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                {{ tip }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
