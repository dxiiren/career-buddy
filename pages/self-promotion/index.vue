<script setup lang="ts">
import { onMounted, ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

const { isAuthenticated, initAuth } = useAuth()
const {
  isLoading,
  strengthsCategories,
  storyTemplates,
  achievementTips,
  loadSelfPromotion,
} = useSelfPromotion()

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
      <SelfPromotionBrandingHero :loading="isLoading" />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(1) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <SelfPromotionStrengthsSection
        :categories="strengthsCategories"
        :loading="isLoading"
      />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(2) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <SelfPromotionStorySection
        :templates="storyTemplates"
        :loading="isLoading"
      />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(3) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <div class="rounded-2xl bg-card border border-border p-6">
        <h2 class="text-lg font-heading font-semibold mb-4">Talking About Achievements</h2>
        <ul class="space-y-2">
          <li
            v-for="tip in achievementTips"
            :key="tip"
            class="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <span class="text-primary">•</span>
            {{ tip }}
          </li>
        </ul>
      </div>
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(4) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NuxtLink to="/self-promotion/linkedin" class="block">
          <div class="rounded-2xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-border p-6 hover:border-primary/50 transition-all h-full">
            <h3 class="font-heading font-semibold mb-2">LinkedIn Optimization</h3>
            <p class="text-sm text-muted-foreground">Learn how to create an impressive LinkedIn profile</p>
          </div>
        </NuxtLink>
        <NuxtLink to="/self-promotion/workplace" class="block">
          <div class="rounded-2xl bg-gradient-to-r from-green-500/10 to-green-600/10 border border-border p-6 hover:border-primary/50 transition-all h-full">
            <h3 class="font-heading font-semibold mb-2">Workplace Expectations</h3>
            <p class="text-sm text-muted-foreground">Prepare for your first day and beyond</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
