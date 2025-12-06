<script setup lang="ts">
import { onMounted, ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

const { isAuthenticated, initAuth } = useAuth()
const {
  isLoading,
  interviewPurpose,
  interviewTypes,
  interviewDos,
  interviewDonts,
  prepSteps,
  loadInterview,
} = useInterview()
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

  trackPageVisit('/interview')
  await loadInterview()

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
      <InterviewInterviewHero :loading="isLoading" />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(1) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <InterviewPurposeSection
        :purpose="interviewPurpose"
        :loading="isLoading"
      />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(2) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <InterviewTypesOfInterviews
        :types="interviewTypes"
        :loading="isLoading"
      />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(3) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <InterviewPrepSteps
        :steps="prepSteps"
        :loading="isLoading"
      />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(4) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <InterviewDosAndDonts
        :dos="interviewDos"
        :donts="interviewDonts"
        :loading="isLoading"
      />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(5) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NuxtLink to="/interview/questions" class="block">
          <div class="rounded-2xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-border p-6 hover:border-primary/50 transition-all h-full">
            <h3 class="font-heading font-semibold mb-2">Question Bank</h3>
            <p class="text-sm text-muted-foreground">Browse and practice common interview questions with example answers</p>
          </div>
        </NuxtLink>
        <NuxtLink to="/interview/simulation" class="block">
          <div class="rounded-2xl bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-border p-6 hover:border-primary/50 transition-all h-full">
            <h3 class="font-heading font-semibold mb-2">Interview Simulation</h3>
            <p class="text-sm text-muted-foreground">Practice answering questions with timed simulations</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
