<script setup lang="ts">
import { onMounted, ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

const { isAuthenticated, initAuth } = useAuth()
const {
  isLoading,
  atsTips,
  atsKeywords,
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
      <div class="rounded-2xl bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-border p-6">
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
            <h1 class="text-2xl font-heading font-bold mb-2">ATS Optimization</h1>
            <p class="text-muted-foreground">Make your resume pass Applicant Tracking Systems</p>
          </div>
        </Transition>
      </div>
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(1) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
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
            <Skeleton class="h-6 w-40 skeleton-shimmer" />
            <Skeleton class="h-24 w-full skeleton-shimmer" />
          </div>
          <div v-else key="content">
            <h2 class="text-lg font-heading font-semibold mb-4">What is ATS?</h2>
            <p class="text-muted-foreground">
              An Applicant Tracking System (ATS) is software used by employers to filter job applications.
              Over 90% of large companies use ATS to scan resumes for keywords and qualifications before
              a human ever sees them. If your resume isn't ATS-friendly, it might never reach a recruiter.
            </p>
          </div>
        </Transition>
      </div>
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(2) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <ResumeATSTips
        :tips="atsTips"
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
            <div class="space-y-2">
              <Skeleton v-for="i in 6" :key="i" class="h-8 w-full skeleton-shimmer" />
            </div>
          </div>
          <div v-else key="content">
            <h2 class="text-lg font-heading font-semibold mb-4">Keyword Strategy</h2>
            <p class="text-sm text-muted-foreground mb-4">
              Keywords are crucial for getting past ATS filters. Here's how to use them effectively:
            </p>
            <ul class="space-y-2">
              <li
                v-for="tip in atsKeywords"
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

    <div class="flex justify-center">
      <NuxtLink to="/resume" class="text-sm text-muted-foreground hover:text-primary transition-colors">
        ← Back to Resume Overview
      </NuxtLink>
    </div>
  </div>
</template>
