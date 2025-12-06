<script setup lang="ts">
import { Sparkles, Lightbulb, RefreshCw } from 'lucide-vue-next'

interface Props {
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

// 31 career tips - one for each day of the month
const careerTips = [
  'Practice the STAR method for behavioral interviews.',
  'Update your LinkedIn headline to reflect your career goals.',
  'Research the company culture before your interview.',
  'Prepare 3-5 thoughtful questions to ask your interviewer.',
  'Tailor your resume for each job application.',
  'Follow up within 24 hours after an interview.',
  'Build your personal brand on social media.',
  'Network with professionals in your target industry.',
  'Learn a new skill relevant to your field this week.',
  'Keep track of your achievements for future reference.',
  'Practice your elevator pitch until it feels natural.',
  'Set specific, measurable career goals for this month.',
  'Ask for feedback from mentors and colleagues.',
  'Research salary ranges before negotiating offers.',
  'Connect with alumni from your university on LinkedIn.',
  'Attend virtual or in-person industry events.',
  'Update your portfolio with recent projects.',
  'Practice common interview questions out loud.',
  'Send a thank-you note after networking conversations.',
  'Review and update your resume quarterly.',
  'Identify and work on your weaknesses proactively.',
  'Create a list of target companies you want to work for.',
  'Develop a morning routine that boosts productivity.',
  'Read industry news to stay current with trends.',
  'Practice active listening in all conversations.',
  'Document your wins and positive feedback regularly.',
  'Reach out to one new connection each week.',
  'Take on stretch assignments to grow your skills.',
  'Prepare stories that demonstrate your key strengths.',
  'Review job descriptions to identify skill gaps.',
  'Celebrate small wins on your career journey.',
]

// Quote state
const quote = ref('')
const quoteAuthor = ref('')
const quoteLoading = ref(false)

// Get tip based on day of month (1-31)
const tipOfTheDay = computed(() => {
  const dayOfMonth = new Date().getDate()
  return careerTips[(dayOfMonth - 1) % careerTips.length]
})

// Fetch random quote from API
async function fetchQuote() {
  quoteLoading.value = true
  try {
    const response = await fetch('https://dummyjson.com/quotes/random')
    const data = await response.json()
    quote.value = data.quote
    quoteAuthor.value = data.author
  } catch {
    // Fallback quote if API fails
    quote.value = 'Success is not final, failure is not fatal: it is the courage to continue that counts.'
    quoteAuthor.value = 'Winston Churchill'
  } finally {
    quoteLoading.value = false
  }
}

// Fetch quote on mount
onMounted(() => {
  fetchQuote()
})
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-6 h-full">
    <!-- Skeleton Loading -->
    <div v-if="loading" class="space-y-6">
      <div>
        <Skeleton class="h-5 w-32 mb-3" />
        <Skeleton class="h-6 w-full" />
      </div>
      <div>
        <Skeleton class="h-5 w-24 mb-3" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-3/4 mt-1" />
      </div>
    </div>

    <!-- Actual Content -->
    <div v-else class="space-y-6">
      <!-- Quote -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <Sparkles class="h-4 w-4 text-primary" />
            <span class="text-sm font-medium text-primary">Motivation</span>
          </div>
          <button
            class="h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            :class="{ 'animate-spin': quoteLoading }"
            :disabled="quoteLoading"
            @click="fetchQuote"
          >
            <RefreshCw class="h-3.5 w-3.5" />
          </button>
        </div>
        <div v-if="quoteLoading" class="rounded-xl bg-gradient-to-br from-primary/5 to-secondary/10 p-4 border border-primary/10">
          <Skeleton class="h-5 w-full" />
          <Skeleton class="h-5 w-3/4 mt-2" />
          <Skeleton class="h-3 w-24 mt-3" />
        </div>
        <div v-else class="rounded-xl bg-gradient-to-br from-primary/5 to-secondary/10 p-4 border border-primary/10">
          <p class="text-base font-heading italic text-foreground/90 leading-relaxed">
            "{{ quote }}"
          </p>
          <p v-if="quoteAuthor" class="text-xs text-muted-foreground mt-3 font-medium">
            — {{ quoteAuthor }}
          </p>
        </div>
      </div>

      <!-- Tip -->
      <div>
        <div class="flex items-center gap-2 mb-3">
          <Lightbulb class="h-4 w-4 text-yellow-500" />
          <span class="text-sm font-medium text-yellow-500">Tip of the Day</span>
        </div>
        <div class="rounded-xl bg-gradient-to-br from-yellow-500/5 to-amber-500/10 p-4 border border-yellow-500/10">
          <p class="text-sm text-foreground/80 leading-relaxed">
            {{ tipOfTheDay }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
