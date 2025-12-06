<script setup lang="ts">
import { FileText, Mic, Mail, Users, MessageCircle } from 'lucide-vue-next'

interface Props {
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const actions = [
  { id: '1', label: 'Write Resume', icon: FileText, href: '/resume', color: 'hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/30' },
  { id: '2', label: 'Practise Interview', icon: Mic, href: '/interview', color: 'hover:bg-green-500/10 hover:text-green-500 hover:border-green-500/30' },
  { id: '3', label: 'Generate Cover Letter', icon: Mail, href: '/resume/cover-letter', color: 'hover:bg-purple-500/10 hover:text-purple-500 hover:border-purple-500/30' },
  { id: '4', label: 'Send Networking Message', icon: Users, href: '/networking', color: 'hover:bg-orange-500/10 hover:text-orange-500 hover:border-orange-500/30' },
  { id: '5', label: 'Ask Buddy', icon: MessageCircle, href: '/chat', color: 'hover:bg-primary/10 hover:text-primary hover:border-primary/30' },
]
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-4 sm:p-5 lg:p-6">
    <!-- Title -->
    <Skeleton v-if="loading" class="h-5 sm:h-6 w-28 sm:w-32 mb-3 sm:mb-4" />
    <h2 v-else class="text-base sm:text-lg font-heading font-semibold mb-3 sm:mb-4">Quick Actions</h2>

    <!-- Skeleton Loading -->
    <div v-if="loading" class="flex flex-wrap gap-2">
      <Skeleton v-for="i in 5" :key="i" class="h-8 sm:h-10 w-24 sm:w-32 rounded-lg" />
    </div>

    <!-- Action Buttons -->
    <div v-else class="flex flex-wrap gap-1.5 sm:gap-2">
      <NuxtLink
        v-for="action in actions"
        :key="action.id"
        :to="action.href"
        class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-border text-xs sm:text-sm font-medium transition-all duration-200"
        :class="action.color"
      >
        <component :is="action.icon" class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        {{ action.label }}
      </NuxtLink>
    </div>
  </div>
</template>
