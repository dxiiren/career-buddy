<script setup lang="ts">
import { onMounted, ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

const { isAuthenticated, initAuth } = useAuth()
const {
  isLoading,
  firstDayGuide,
  talkingToSeniorsTips,
  feedbackTips,
  etiquetteRules,
  emailTemplates,
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

  trackPageVisit('/self-promotion/workplace')
  await loadSelfPromotion()

  for (let i = 0; i < 6; i++) {
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
            <h1 class="text-2xl font-heading font-bold mb-2">Workplace Expectations</h1>
            <p class="text-muted-foreground">Navigate your first job with confidence and professionalism</p>
          </div>
        </Transition>
      </div>
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(1) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <SelfPromotionFirstDaySection
        :guide="firstDayGuide"
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
            <Skeleton class="h-6 w-48 skeleton-shimmer" />
            <div class="space-y-2">
              <Skeleton v-for="i in 8" :key="i" class="h-10 w-full skeleton-shimmer" />
            </div>
          </div>
          <div v-else key="content">
            <h2 class="text-lg font-heading font-semibold mb-4">Talking to Senior Colleagues</h2>
            <ul class="space-y-2">
              <li
                v-for="tip in talkingToSeniorsTips"
                :key="tip"
                class="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span class="text-primary mt-0.5">•</span>
                {{ tip }}
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(3) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <SelfPromotionFeedbackSection
        :tips="feedbackTips"
        :loading="isLoading"
      />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(4) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
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
            <div class="space-y-2">
              <Skeleton v-for="i in 10" :key="i" class="h-10 w-full skeleton-shimmer" />
            </div>
          </div>
          <div v-else key="content">
            <h2 class="text-lg font-heading font-semibold mb-4">Professional Etiquette</h2>
            <ul class="space-y-2">
              <li
                v-for="rule in etiquetteRules"
                :key="rule"
                class="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span class="text-primary mt-0.5">✓</span>
                {{ rule }}
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(5) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <SelfPromotionEmailTemplatesSection
        :templates="emailTemplates"
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
