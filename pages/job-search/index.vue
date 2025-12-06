<script setup lang="ts">
import { onMounted, ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

const { isAuthenticated, initAuth } = useAuth()
const {
  isLoading,
  searchPlatforms,
  filteringTips,
  commonMistakes,
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

  trackPageVisit('/job-search')
  await loadJobSearch()

  for (let i = 0; i < 5; i++) {
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
      <JobSearchSearchHero :loading="isLoading" />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(1) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <JobSearchWhereToSearch
        :platforms="searchPlatforms"
        :loading="isLoading"
      />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(2) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <JobSearchFilteringTips
        :tips="filteringTips"
        :loading="isLoading"
      />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(3) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <JobSearchCommonMistakes
        :mistakes="commonMistakes"
        :loading="isLoading"
      />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(4) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NuxtLink to="/job-search/platforms" class="block">
          <div class="rounded-2xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-border p-6 hover:border-primary/50 transition-all h-full">
            <h3 class="font-heading font-semibold mb-2">Platform Guide</h3>
            <p class="text-sm text-muted-foreground">Compare job platforms and learn how to use each effectively</p>
          </div>
        </NuxtLink>
        <NuxtLink to="/job-search/salary" class="block">
          <div class="rounded-2xl bg-gradient-to-r from-green-500/10 to-green-600/10 border border-border p-6 hover:border-primary/50 transition-all h-full">
            <h3 class="font-heading font-semibold mb-2">Salary & Negotiation</h3>
            <p class="text-sm text-muted-foreground">Understand salary ranges and negotiation strategies</p>
          </div>
        </NuxtLink>
        <NuxtLink to="/job-search/scams" class="block">
          <div class="rounded-2xl bg-gradient-to-r from-red-500/10 to-red-600/10 border border-border p-6 hover:border-primary/50 transition-all h-full">
            <h3 class="font-heading font-semibold mb-2">Scam Awareness</h3>
            <p class="text-sm text-muted-foreground">Learn to identify and avoid job scams</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
