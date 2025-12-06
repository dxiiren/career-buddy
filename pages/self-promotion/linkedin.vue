<script setup lang="ts">
import { onMounted, ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

const { isAuthenticated, initAuth } = useAuth()
const {
  isLoading,
  headlineExamples,
  aboutMeTemplates,
  featuredSuggestions,
  postIdeas,
  loadSelfPromotion,
} = useSelfPromotion()
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

  trackPageVisit('/self-promotion/linkedin')
  await loadSelfPromotion()

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
            <Skeleton class="h-8 w-64 skeleton-shimmer" />
            <Skeleton class="h-5 w-96 skeleton-shimmer" />
          </div>
          <div v-else key="content">
            <h1 class="text-2xl font-heading font-bold mb-2">LinkedIn Optimization</h1>
            <p class="text-muted-foreground">Create a standout LinkedIn profile that attracts opportunities</p>
          </div>
        </Transition>
      </div>
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(1) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <SelfPromotionLinkedInHeadlines
        :examples="headlineExamples"
        :loading="isLoading"
      />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(2) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <SelfPromotionAboutMeSection
        :templates="aboutMeTemplates"
        :loading="isLoading"
      />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(3) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
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
            <Skeleton class="h-6 w-48 skeleton-shimmer" />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Skeleton v-for="i in 8" :key="i" class="h-12 w-full skeleton-shimmer" />
            </div>
          </div>
          <div v-else key="content">
            <h2 class="text-lg font-heading font-semibold mb-4">Featured Section Ideas</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                v-for="suggestion in featuredSuggestions"
                :key="suggestion"
                class="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
              >
                <span class="text-primary">✦</span>
                <span class="text-sm">{{ suggestion }}</span>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(4) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <SelfPromotionPostIdeasSection
        :ideas="postIdeas"
        :loading="isLoading"
      />
    </div>

    <div class="flex justify-center">
      <NuxtLink to="/self-promotion" class="text-sm text-muted-foreground hover:text-primary transition-colors">
        ← Back to Personal Branding
      </NuxtLink>
    </div>
  </div>
</template>
