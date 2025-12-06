<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { Timer, ChevronRight, RotateCcw } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
})

const { isAuthenticated, initAuth } = useAuth()
const {
  isLoading,
  questions,
  simulationSettings,
  simulationState,
  loadInterview,
  startSimulation,
  endSimulation,
  submitAnswer,
  updateSettings,
} = useInterview()

const animatedCards = ref<Set<number>>(new Set())
const currentAnswer = ref('')
const timeRemaining = ref(0)
let timerInterval: ReturnType<typeof setInterval> | null = null

const filteredQuestions = computed(() => {
  if (simulationSettings.value.category === 'all') return questions.value
  return questions.value.filter(q => q.category === simulationSettings.value.category)
})

const currentQuestion = computed(() => {
  if (!simulationState.value.isActive) return null
  return filteredQuestions.value[simulationState.value.currentQuestionIndex] || null
})

const isComplete = computed(() => {
  return simulationState.value.currentQuestionIndex >= filteredQuestions.value.length
})

const showCard = (index: number) => {
  return !isLoading.value && animatedCards.value.has(index)
}

function handleStart() {
  startSimulation()
  timeRemaining.value = simulationSettings.value.timeLimit
  startTimer()
}

function handleSubmit() {
  submitAnswer(currentAnswer.value)
  currentAnswer.value = ''

  if (!isComplete.value) {
    timeRemaining.value = simulationSettings.value.timeLimit
  } else {
    stopTimer()
  }
}

function handleReset() {
  endSimulation()
  currentAnswer.value = ''
  stopTimer()
}

function startTimer() {
  stopTimer()
  timerInterval = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--
    }
  }, 1000)
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

onMounted(async () => {
  initAuth()
  if (!isAuthenticated.value) {
    navigateTo('/login')
    return
  }

  await loadInterview()

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
            <Skeleton class="h-8 w-56 skeleton-shimmer" />
            <Skeleton class="h-5 w-96 skeleton-shimmer" />
          </div>
          <div v-else key="content">
            <h1 class="text-2xl font-heading font-bold mb-2">Interview Simulation</h1>
            <p class="text-muted-foreground">Practice answering interview questions under timed conditions</p>
          </div>
        </Transition>
      </div>
    </div>

    <template v-if="!simulationState.isActive">
      <div
        class="transition-all duration-500"
        :class="showCard(1) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
      >
        <InterviewSimulationSetup
          :settings="simulationSettings"
          :loading="isLoading"
          @start="handleStart"
          @update-settings="updateSettings"
        />
      </div>
    </template>

    <template v-else-if="!isComplete">
      <div
        class="transition-all duration-500"
        :class="showCard(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        <div class="rounded-2xl bg-card border border-border p-6">
          <div class="flex items-center justify-between mb-6">
            <span class="text-sm text-muted-foreground">
              Question {{ simulationState.currentQuestionIndex + 1 }} of {{ filteredQuestions.length }}
            </span>
            <div class="flex items-center gap-2">
              <Timer class="h-5 w-5 text-primary" />
              <span
                :class="[
                  'font-mono text-lg font-bold',
                  timeRemaining <= 30 ? 'text-destructive' : 'text-primary'
                ]"
              >
                {{ formatTime(timeRemaining) }}
              </span>
            </div>
          </div>

          <div class="mb-6">
            <span class="inline-block px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary mb-3 capitalize">
              {{ currentQuestion?.category.replace('-', ' ') }}
            </span>
            <h2 class="text-xl font-heading font-semibold">{{ currentQuestion?.question }}</h2>
          </div>

          <div class="space-y-4">
            <textarea
              v-model="currentAnswer"
              class="w-full h-40 p-4 rounded-xl border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Type your answer here..."
            />
            <div class="flex gap-3">
              <Button class="flex-1 gap-2" @click="handleSubmit">
                Next Question
                <ChevronRight class="h-4 w-4" />
              </Button>
              <Button variant="outline" @click="handleReset">
                <RotateCcw class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div
        class="transition-all duration-500"
        :class="showCard(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        <div class="rounded-2xl bg-card border border-border p-6 text-center">
          <div class="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">🎉</span>
          </div>
          <h2 class="text-xl font-heading font-semibold mb-2">Simulation Complete!</h2>
          <p class="text-muted-foreground mb-6">
            You've answered {{ simulationState.answers.length }} questions.
          </p>
          <div class="space-y-4">
            <div class="text-left">
              <h3 class="font-medium mb-3">Your Answers:</h3>
              <div class="space-y-3">
                <div
                  v-for="(answer, index) in simulationState.answers"
                  :key="index"
                  class="p-4 rounded-xl bg-muted/50"
                >
                  <p class="text-sm font-medium mb-2">Q{{ index + 1 }}: {{ filteredQuestions[index]?.question }}</p>
                  <p class="text-sm text-muted-foreground">{{ answer || '(No answer provided)' }}</p>
                </div>
              </div>
            </div>
            <Button class="w-full" @click="handleReset">
              Start New Simulation
            </Button>
          </div>
        </div>
      </div>
    </template>

    <div class="flex justify-center">
      <NuxtLink to="/interview" class="text-sm text-muted-foreground hover:text-primary transition-colors">
        ← Back to Interview Preparation
      </NuxtLink>
    </div>
  </div>
</template>
