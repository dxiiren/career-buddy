<script setup lang="ts">
import { onMounted, ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

// SEO - noindex for protected page
useSeo({
  title: 'Salary & Negotiation',
  description: 'Understand your market value and learn to negotiate with confidence.',
  noindex: true,
})

const { isAuthenticated, initAuth } = useAuth()
const {
  isLoading,
  salaryRanges,
  salaryAnswerScripts,
  negotiationScripts,
  loadJobSearch,
} = useJobSearch()
const { trackPageVisit } = useRecentActivity()

const animatedCards = ref<Set<number>>(new Set())

const showCard = (index: number) => {
  return !isLoading.value && animatedCards.value.has(index)
}

onMounted(async () => {
  initAuth()
  if (!isAuthenticated.value) {
    navigateTo('/login')
    return
  }

  trackPageVisit('/job-search/salary')
  await loadJobSearch()

  for (let i = 0; i < 4; i++) {
    setTimeout(() => animatedCards.value.add(i), i * 100)
  }
})
</script>

<template>
  <div class="space-y-6">
    <div
      class="transition-all duration-500"
      :class="showCard(0) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <div class="rounded-2xl bg-gradient-to-r from-green-500/10 to-green-600/10 border border-border p-6">
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
            <Skeleton class="h-8 w-64 skeleton-shimmer" />
            <Skeleton class="h-5 w-96 skeleton-shimmer" />
          </div>
          <div v-else key="content">
            <h1 class="text-2xl font-heading font-bold mb-2">Salary & Negotiation</h1>
            <p class="text-muted-foreground">Understand your market value and learn to negotiate with confidence</p>
          </div>
        </Transition>
      </div>
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(1) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <JobSearchSalaryRanges
        :ranges="salaryRanges"
        :loading="isLoading"
      />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(2) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
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
          <div v-if="isLoading" key="skeleton" class="space-y-4">
            <Skeleton class="h-6 w-56 skeleton-shimmer" />
            <div class="space-y-4">
              <Skeleton v-for="i in 3" :key="i" class="h-32 w-full skeleton-shimmer" />
            </div>
          </div>
          <div v-else key="content">
            <h2 class="text-lg font-heading font-semibold mb-4">Answering "What's Your Expected Salary?"</h2>
            <div class="space-y-4">
              <div
                v-for="script in salaryAnswerScripts"
                :key="script.scenario"
                class="p-4 rounded-xl border border-border"
              >
                <h3 class="font-medium text-sm mb-2">{{ script.scenario }}</h3>
                <div class="bg-muted/50 rounded-lg p-4">
                  <p class="text-sm text-muted-foreground italic">"{{ script.script }}"</p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(3) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <JobSearchNegotiationScripts
        :scripts="negotiationScripts"
        :loading="isLoading"
      />
    </div>

    <div class="flex justify-center">
      <NuxtLink to="/job-search" class="text-sm text-muted-foreground hover:text-primary transition-colors">
        ← Back to Job Search Overview
      </NuxtLink>
    </div>
  </div>
</template>
