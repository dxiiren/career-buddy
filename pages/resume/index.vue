<script setup lang="ts">
import { onMounted, ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

const { isAuthenticated, initAuth } = useAuth()
const {
  isLoading,
  whatIsResume,
  employerLookFor,
  resumeMistakes,
  loadResume,
} = useResume()

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

  await loadResume()

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
      <ResumeResumeHero :loading="isLoading" />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(1) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <ResumeWhatIsResume
        :content="whatIsResume"
        :loading="isLoading"
      />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(2) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <ResumeWhatEmployersLookFor
        :items="employerLookFor"
        :loading="isLoading"
      />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(3) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <ResumeCommonMistakes
        :mistakes="resumeMistakes"
        :loading="isLoading"
      />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(4) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NuxtLink to="/resume/templates" class="block">
          <div class="rounded-2xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-border p-6 hover:border-primary/50 transition-all h-full">
            <h3 class="font-heading font-semibold mb-2">Resume Templates</h3>
            <p class="text-sm text-muted-foreground">Browse and download resume templates</p>
          </div>
        </NuxtLink>
        <NuxtLink to="/resume/cover-letter" class="block">
          <div class="rounded-2xl bg-gradient-to-r from-green-500/10 to-green-600/10 border border-border p-6 hover:border-primary/50 transition-all h-full">
            <h3 class="font-heading font-semibold mb-2">Cover Letters</h3>
            <p class="text-sm text-muted-foreground">Learn to write compelling cover letters</p>
          </div>
        </NuxtLink>
        <NuxtLink to="/resume/ats" class="block">
          <div class="rounded-2xl bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-border p-6 hover:border-primary/50 transition-all h-full">
            <h3 class="font-heading font-semibold mb-2">ATS Optimization</h3>
            <p class="text-sm text-muted-foreground">Make your resume ATS-friendly</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
