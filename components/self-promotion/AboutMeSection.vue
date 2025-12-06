<script setup lang="ts">
import { Copy, Check } from 'lucide-vue-next'
import { ref } from 'vue'
import type { AboutMeTemplate } from '@/composables/useSelfPromotion'

interface Props {
  templates: AboutMeTemplate[]
  loading: boolean
}

defineProps<Props>()

const copiedIndex = ref<number | null>(null)

async function copyTemplate(index: number, template: string) {
  await navigator.clipboard.writeText(template)
  copiedIndex.value = index
  setTimeout(() => {
    copiedIndex.value = null
  }, 2000)
}
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
        <Skeleton class="h-6 w-48 mb-4" />
        <div class="space-y-4">
          <div v-for="i in 2" :key="i" class="p-4 rounded-xl border border-border space-y-3">
            <div class="flex justify-between">
              <Skeleton class="h-5 w-32" />
              <Skeleton class="h-8 w-20 rounded-lg" />
            </div>
            <Skeleton class="h-40 w-full rounded-lg" />
          </div>
        </div>
      </div>

      <div v-else key="content">
        <h2 class="text-lg font-heading font-semibold mb-4">About Me Templates</h2>
        <div class="space-y-4">
          <div
            v-for="(item, index) in templates"
            :key="item.title"
            class="p-4 rounded-xl border border-border"
          >
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-medium">{{ item.title }}</h3>
              <Button
                size="sm"
                :variant="copiedIndex === index ? 'default' : 'outline'"
                @click="copyTemplate(index, item.template)"
                class="gap-1.5"
              >
                <Check v-if="copiedIndex === index" class="h-3.5 w-3.5" />
                <Copy v-else class="h-3.5 w-3.5" />
                {{ copiedIndex === index ? 'Copied!' : 'Copy' }}
              </Button>
            </div>
            <div class="bg-muted/50 rounded-lg p-4 max-h-48 overflow-y-auto">
              <pre class="text-sm whitespace-pre-wrap font-sans text-muted-foreground">{{ item.template }}</pre>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
