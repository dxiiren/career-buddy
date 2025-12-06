<script setup lang="ts">
import { onMounted, ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

const { isAuthenticated, initAuth } = useAuth()
const {
  isLoading,
  networkingBenefits,
  networkingTypes,
  commonFears,
  introductionTips,
  loadNetworking,
} = useNetworking()
const { trackPageVisit } = useRecentActivity()

// Track which cards have animated in
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

  trackPageVisit('/networking')
  await loadNetworking()

  // Stagger card animations
  const cardCount = 5
  for (let i = 0; i < cardCount; i++) {
    setTimeout(() => {
      animatedCards.value.add(i)
    }, i * 100)
  }
})
</script>

<template>
  <div class="space-y-6">
    <!-- Hero -->
    <div
      class="transition-all duration-500"
      :class="showCard(0) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <NetworkingNetworkingHero :loading="isLoading" />
    </div>

    <!-- Why Networking -->
    <div
      class="transition-all duration-500"
      :class="showCard(1) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <NetworkingWhyNetworkingSection
        :benefits="networkingBenefits"
        :loading="isLoading"
      />
    </div>

    <!-- Types of Networking -->
    <div
      class="transition-all duration-500"
      :class="showCard(2) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <NetworkingNetworkingTypesSection
        :types="networkingTypes"
        :loading="isLoading"
      />
    </div>

    <!-- How to Introduce Yourself -->
    <div
      class="transition-all duration-500"
      :class="showCard(3) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <NetworkingIntroductionGuide
        :tips="introductionTips"
        :loading="isLoading"
      />
    </div>

    <!-- Overcoming Fears -->
    <div
      class="transition-all duration-500"
      :class="showCard(4) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <NetworkingOvercomingFearsSection
        :fears="commonFears"
        :loading="isLoading"
      />
    </div>

    <!-- CTA to Templates -->
    <div
      class="transition-all duration-500"
      :class="showCard(4) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <div class="rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-border p-4 sm:p-5 lg:p-6 text-center">
        <h3 class="text-base sm:text-lg font-heading font-semibold mb-1 sm:mb-2">Ready to Start Networking?</h3>
        <p class="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
          Use our professionally crafted message templates to make your first connection.
        </p>
        <NuxtLink to="/networking/templates">
          <Button size="lg" class="gap-2">
            View Message Templates
            <span>→</span>
          </Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transition-all {
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
