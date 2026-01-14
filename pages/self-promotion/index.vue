<script setup lang="ts">
import { onMounted, ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

const { isAuthenticated, initAuth } = useAuth()
const {
  isLoading,
  achievementTips,
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

  trackPageVisit('/self-promotion')
  await loadSelfPromotion()

  for (let i = 0; i < 1; i++) {
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
      <div class="rounded-2xl bg-card border border-border p-4 sm:p-5 lg:p-6">
        <h2 class="text-base sm:text-lg font-heading font-semibold mb-3 sm:mb-4">Talking About Achievements</h2>
        <ul class="space-y-2">
          <li
            v-for="tip in achievementTips"
            :key="tip"
            class="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
          >
            <span class="text-primary">•</span>
            {{ tip }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
