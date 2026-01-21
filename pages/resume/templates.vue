<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

// SEO - noindex for protected page
useSeo({
  title: 'Resume Templates',
  description: 'Choose a professional resume template that matches your career stage.',
  noindex: true,
})

const { isAuthenticated, initAuth } = useAuth()
const {
  isLoading,
  templates,
  templateCategories,
  loadResume,
} = useResume()
const { trackPageVisit } = useRecentActivity()

const animatedCards = ref<Set<number>>(new Set())
const selectedCategory = ref('all')

const filteredTemplates = computed(() => {
  if (selectedCategory.value === 'all') return templates.value
  return templates.value.filter(t => t.category === selectedCategory.value)
})

const showCard = (index: number) => {
  return !isLoading.value && animatedCards.value.has(index)
}

function handleSelectTemplate(template: { id: string, name: string }) {
  // In a real app, this would open a download or builder
  console.log('Selected template:', template)
}

onMounted(async () => {
  initAuth()
  if (!isAuthenticated.value) {
    navigateTo('/login')
    return
  }

  trackPageVisit('/resume/templates')
  await loadResume()

  for (let i = 0; i < templates.value.length + 2; i++) {
    setTimeout(() => animatedCards.value.add(i), i * 50)
  }
})
</script>

<template>
  <div class="space-y-6">
    <div
      class="transition-all duration-500"
      :class="showCard(0) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <div class="rounded-2xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-border p-6">
        <Transition
          mode="out-in"
          enter-active-class="transition-opacity duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="isLoading" key="skeleton" class="space-y-3">
            <Skeleton class="h-8 w-48 skeleton-shimmer" />
            <Skeleton class="h-5 w-96 skeleton-shimmer" />
          </div>
          <div v-else key="content">
            <h1 class="text-2xl font-heading font-bold mb-2">Resume Templates</h1>
            <p class="text-muted-foreground">Choose a template that matches your career stage and style</p>
          </div>
        </Transition>
      </div>
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(1) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="cat in templateCategories"
          :key="cat"
          :class="[
            'px-4 py-2 rounded-full text-sm transition-colors capitalize',
            selectedCategory === cat
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted hover:bg-muted/80'
          ]"
          @click="selectedCategory = cat"
        >
          {{ cat.replace('-', ' ') }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(template, index) in filteredTemplates"
        :key="template.id"
        class="transition-all duration-500"
        :class="showCard(index + 2) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
      >
        <ResumeTemplateCard
          :template="template"
          :loading="isLoading"
          @select="handleSelectTemplate"
        />
      </div>
    </div>

    <div class="flex justify-center">
      <NuxtLink to="/resume" class="text-sm text-muted-foreground hover:text-primary transition-colors">
        ← Back to Resume Overview
      </NuxtLink>
    </div>
  </div>
</template>
