<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

const { isAuthenticated, initAuth } = useAuth()
const {
  isLoading,
  questions,
  starMethod,
  loadInterview,
} = useInterview()

const animatedCards = ref<Set<number>>(new Set())
const selectedCategory = ref('all')

const filteredQuestions = computed(() => {
  if (selectedCategory.value === 'all') return questions.value
  return questions.value.filter(q => q.category === selectedCategory.value)
})

const categories = [
  { value: 'all', label: 'All Questions' },
  { value: 'hr', label: 'HR Questions' },
  { value: 'behavioral', label: 'Behavioral' },
  { value: 'fresh-grad', label: 'Fresh Graduate' },
  { value: 'salary', label: 'Salary' },
]

const showCard = (index: number) => {
  return !isLoading.value && animatedCards.value.has(index)
}

onMounted(async () => {
  initAuth()
  if (!isAuthenticated.value) {
    navigateTo('/login')
    return
  }

  await loadInterview()

  for (let i = 0; i < questions.value.length + 3; i++) {
    setTimeout(() => animatedCards.value.add(i), i * 50)
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
            <Skeleton class="h-8 w-48 skeleton-shimmer" />
            <Skeleton class="h-5 w-96 skeleton-shimmer" />
          </div>
          <div v-else key="content">
            <h1 class="text-2xl font-heading font-bold mb-2">Interview Question Bank</h1>
            <p class="text-muted-foreground">Practice common interview questions with example answers and tips</p>
          </div>
        </Transition>
      </div>
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(1) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <InterviewStarMethod
        :star="starMethod"
        :loading="isLoading"
      />
    </div>

    <div
      class="transition-all duration-500"
      :class="showCard(2) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="cat in categories"
          :key="cat.value"
          :class="[
            'px-4 py-2 rounded-full text-sm transition-colors',
            selectedCategory === cat.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted hover:bg-muted/80'
          ]"
          @click="selectedCategory = cat.value"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <div
      v-for="(question, index) in filteredQuestions"
      :key="question.id"
      class="transition-all duration-500"
      :class="showCard(index + 3) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <InterviewQuestionCard
        :question="question"
        :loading="isLoading"
      />
    </div>

    <div class="flex justify-center">
      <NuxtLink to="/interview" class="text-sm text-muted-foreground hover:text-primary transition-colors">
        ← Back to Interview Preparation
      </NuxtLink>
    </div>
  </div>
</template>
