<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { Timer, ChevronRight, ChevronLeft, RotateCcw, Sparkles, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
})

// SEO - noindex for protected page
useSeo({
  title: 'Interview Simulation',
  description: 'Practice answering interview questions under timed conditions.',
  noindex: true,
})

const { isAuthenticated, initAuth } = useAuth()
const { trackPageVisit } = useRecentActivity()

const animatedCards = ref<Set<number>>(new Set())
const isLoading = ref(true)
const currentQuestionIndex = ref(0)

// Questions data with placeholder answers and AI feedback
const questions = [
  {
    category: 'Hr',
    question: 'Tell me about yourself.',
    placeholder: `Hi, my name is Yana and I recently graduated. I studied graphic design and I'm really interested in working in this industry because I like design and creative work. During my studies, I did some assignments and group projects, and I also learned some basic design tools like Adobe Illustrator and Photoshop.

I'm still trying to figure out what role suits me best, but I'm willing to learn and improve myself. I may not have a lot of real working experience yet, but I'm hardworking and eager to grow in this field.`,
    feedback: {
      score: 6,
      strengths: [
        'Good introduction with your name and educational background',
        'Shows enthusiasm and willingness to learn',
        'Mentions relevant tools (Adobe Illustrator, Photoshop)'
      ],
      improvements: [
        'Answer lacks specific examples or achievements',
        'Phrases like "still trying to figure out" may signal uncertainty',
        'Could be more concise and structured (consider using the STAR method)',
        'Missing connection between your skills and the role you\'re applying for'
      ],
      suggestion: 'Try structuring your answer with: (1) A brief professional introduction, (2) Your key skills and a specific accomplishment, (3) Why you\'re interested in this role/company. For example: "I\'m a recent graphic design graduate with hands-on experience in branding projects. During my final year, I led a team project that redesigned a local café\'s visual identity, increasing their social media engagement by 40%..."'
    }
  },
  {
    category: 'Hr',
    question: 'Why do you want to work here?',
    placeholder: `I want to work here because I need a job and your company seems nice. I saw the job posting online and thought I could apply. I heard your company is quite famous and it would look good on my resume.

Also, the office location is near my house so it would be convenient for me to commute. I think working here would be a good opportunity for me.`,
    feedback: {
      score: 3,
      strengths: [
        'Shows awareness that the company has a good reputation',
        'Honest about practical considerations'
      ],
      improvements: [
        'Answer focuses entirely on personal benefits rather than mutual value',
        'Shows no research about the company\'s mission, values, or products',
        'Mentioning "I need a job" suggests desperation rather than genuine interest',
        'Commute convenience is not a compelling reason for employers'
      ],
      suggestion: 'Research the company thoroughly before the interview. Mention specific things: their recent projects, company culture, mission statement, or products you admire. Show how your skills align with their needs. For example: "I\'ve been following your company\'s innovative approach to sustainable design. Your recent rebrand for [Client X] really impressed me, and I\'d love to contribute my skills in visual storytelling to similar impactful projects..."'
    }
  },
  {
    category: 'Hr',
    question: 'What are your strengths and weaknesses?',
    placeholder: `My strength is that I'm a hardworking person and I always try my best. I'm also friendly and easy to work with. I think I'm quite creative too.

For weaknesses, I don't really have any major weaknesses. Maybe sometimes I work too hard and forget to take breaks. I'm also a perfectionist which can be a problem sometimes.`,
    feedback: {
      score: 4,
      strengths: [
        'Mentions relevant soft skills (hardworking, friendly, creative)',
        'Attempts to address both parts of the question'
      ],
      improvements: [
        'Strengths are generic and lack specific examples or evidence',
        '"No major weaknesses" sounds evasive and unrealistic',
        '"Work too hard" and "perfectionist" are cliché non-answers',
        'No explanation of how you\'re addressing your weaknesses'
      ],
      suggestion: 'For strengths, provide specific examples: "My strength is visual communication—in my last project, I simplified a complex data report into an infographic that increased reader engagement by 50%." For weaknesses, be genuine and show growth: "I used to struggle with time estimation for projects. I\'ve started using project management tools and breaking tasks into smaller milestones, which has improved my delivery accuracy significantly."'
    }
  },
  {
    category: 'Hr',
    question: 'Where do you see yourself in 5 years?',
    placeholder: `In 5 years, I hope to have a stable job and earn a good salary. Maybe I'll get promoted to a higher position. I'm not really sure about the details, but I just want to have a comfortable life and maybe travel sometimes.

I haven't really thought about it much to be honest. I'm just focused on getting a job first.`,
    feedback: {
      score: 3,
      strengths: [
        'Shows desire for stability and growth',
        'Honest about current focus on immediate goals'
      ],
      improvements: [
        'Answer lacks ambition and professional direction',
        'Focus on salary and comfort rather than career development',
        'Admitting you "haven\'t thought about it" shows lack of planning',
        'No connection to the company or industry growth'
      ],
      suggestion: 'Show ambition aligned with the role and company. For example: "In 5 years, I see myself as a senior designer who can lead projects and mentor junior team members. I want to develop expertise in UX design and contribute to projects that make a real impact on users. I\'m excited about growing with a company that values innovation, and I hope to take on more strategic responsibilities as I develop my skills."'
    }
  },
  {
    category: 'Behavioral',
    question: 'Tell me about a time you faced a challenge and how you overcame it.',
    placeholder: `Once during university, I had a group project and one of my teammates didn't do their part. It was really stressful and frustrating. I ended up doing most of the work myself to make sure we could submit on time.

In the end, we passed the assignment so it worked out okay. It taught me that sometimes you can't rely on others.`,
    feedback: {
      score: 4,
      strengths: [
        'Identifies a relatable challenge situation',
        'Shows dedication to completing tasks',
        'Demonstrates accountability'
      ],
      improvements: [
        'Doesn\'t follow the STAR method (Situation, Task, Action, Result)',
        'Solution was to do everything alone rather than address the team issue',
        'Negative conclusion about teamwork is a red flag',
        'Lacks specific details about what actions were taken'
      ],
      suggestion: 'Use the STAR method and focus on constructive problem-solving. For example: "In a group project, one teammate stopped contributing (Situation). As team lead, I needed to ensure delivery (Task). I scheduled a one-on-one to understand their challenges—they were overwhelmed with another deadline. We redistributed tasks and I helped them catch up (Action). We delivered on time and received an A. I learned that addressing issues directly and with empathy leads to better outcomes than working around people (Result)."'
    }
  },
  {
    category: 'Behavioral',
    question: 'How do you handle criticism or feedback?',
    placeholder: `I think I handle criticism okay. Sometimes it's hard to hear negative things about your work, but I try not to take it personally. If someone gives me feedback, I'll listen to them and try to improve.

I prefer when people give constructive feedback rather than just criticizing. I think feedback is important for growth.`,
    feedback: {
      score: 5,
      strengths: [
        'Shows openness to receiving feedback',
        'Understands the difference between constructive and destructive criticism',
        'Recognizes feedback as important for growth'
      ],
      improvements: [
        'Answer is too general and lacks specific examples',
        'Saying it\'s "hard to hear negative things" might concern employers',
        'No concrete process for implementing feedback',
        'Doesn\'t demonstrate resilience or proactive improvement'
      ],
      suggestion: 'Provide a specific example showing your feedback process. For example: "I actively seek feedback to improve my work. In my last project, my supervisor suggested my designs were too complex for the target audience. Instead of feeling defensive, I asked clarifying questions to understand their perspective. I simplified the design, tested it with users, and the final version had much better engagement. Now I regularly request mid-project feedback to catch issues early."'
    }
  },
  {
    category: 'Hr',
    question: 'Do you have any questions for us?',
    placeholder: `Not really, I think you've covered everything. Maybe just when will I hear back about the results? And what's the salary for this position?

Actually, what time does the office open and close? And is there parking available?`,
    feedback: {
      score: 2,
      strengths: [
        'Asks about next steps in the process'
      ],
      improvements: [
        'Saying "no questions" suggests lack of interest or preparation',
        'Asking about salary too early can seem presumptuous',
        'Logistical questions (parking, hours) are not appropriate for first interviews',
        'Missed opportunity to learn about the role and show enthusiasm'
      ],
      suggestion: 'Prepare 2-3 thoughtful questions that show genuine interest. For example: "What does success look like in this role during the first 6 months?", "Can you tell me about the team I\'d be working with?", "What are the biggest challenges the design team is currently facing?", or "How does the company support professional development?" Save logistical questions for after you receive an offer.'
    }
  }
]

// Store user answers for each question
const userAnswers = ref<string[]>(new Array(questions.length).fill(''))

const currentQuestion = computed(() => questions[currentQuestionIndex.value])
const totalQuestions = computed(() => questions.length)
const isFirstQuestion = computed(() => currentQuestionIndex.value === 0)
const isLastQuestion = computed(() => currentQuestionIndex.value === questions.length - 1)

const showCard = (index: number) => {
  return !isLoading.value && animatedCards.value.has(index)
}

function handleNextQuestion() {
  if (!isLastQuestion.value) {
    currentQuestionIndex.value++
  }
}

function handlePreviousQuestion() {
  if (!isFirstQuestion.value) {
    currentQuestionIndex.value--
  }
}

function handleReset() {
  currentQuestionIndex.value = 0
}

onMounted(async () => {
  initAuth()
  if (!isAuthenticated.value) {
    navigateTo('/login')
    return
  }

  trackPageVisit('/interview/simulation')

  // Simulate loading
  setTimeout(() => {
    isLoading.value = false
    for (let i = 0; i < 4; i++) {
      setTimeout(() => animatedCards.value.add(i), i * 100)
    }
  }, 300)
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header Card -->
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

    <!-- Main Question Card -->
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
            <div class="flex items-center justify-between">
              <Skeleton class="h-5 w-32 skeleton-shimmer" />
              <Skeleton class="h-6 w-16 skeleton-shimmer" />
            </div>
            <Skeleton class="h-6 w-16 rounded-full skeleton-shimmer" />
            <Skeleton class="h-8 w-72 skeleton-shimmer" />
            <Skeleton class="h-40 w-full skeleton-shimmer" />
            <div class="flex gap-3">
              <Skeleton class="h-12 flex-1 skeleton-shimmer" />
              <Skeleton class="h-12 w-12 skeleton-shimmer" />
            </div>
          </div>
          <div v-else :key="currentQuestionIndex">
            <!-- Question Header -->
            <div class="flex items-center justify-between mb-6">
              <span class="text-sm text-muted-foreground">
                Question {{ currentQuestionIndex + 1 }} of {{ totalQuestions }}
              </span>
              <div class="flex items-center gap-2">
                <Timer class="h-5 w-5 text-destructive" />
                <span class="font-mono text-lg font-bold text-destructive">
                  0:00
                </span>
              </div>
            </div>

            <!-- Category Pill and Question -->
            <div class="mb-6">
              <span class="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary mb-3">
                {{ currentQuestion.category }}
              </span>
              <h2 class="text-xl font-heading font-semibold">{{ currentQuestion.question }}</h2>
            </div>

            <!-- Answer Textarea -->
            <div class="space-y-4">
              <textarea
                v-model="userAnswers[currentQuestionIndex]"
                :placeholder="currentQuestion.placeholder"
                class="w-full h-48 p-4 rounded-xl border border-border bg-background/50 text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground/70"
              />

              <!-- Action Buttons -->
              <div class="flex gap-3">
                <Button
                  variant="outline"
                  class="gap-2"
                  :disabled="isFirstQuestion"
                  @click="handlePreviousQuestion"
                >
                  <ChevronLeft class="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  class="flex-1 gap-2"
                  @click="handleNextQuestion"
                  :disabled="isLastQuestion"
                >
                  {{ isLastQuestion ? 'Last Question' : 'Next Question' }}
                  <ChevronRight v-if="!isLastQuestion" class="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" class="h-11 w-11" @click="handleReset">
                  <RotateCcw class="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- AI Feedback Card -->
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
            <Skeleton class="h-7 w-40 skeleton-shimmer" />
            <Skeleton class="h-20 w-full skeleton-shimmer" />
            <Skeleton class="h-20 w-full skeleton-shimmer" />
          </div>
          <div v-else :key="`feedback-${currentQuestionIndex}`">
            <!-- Feedback Header -->
            <div class="flex items-center gap-2 mb-6">
              <Sparkles class="h-5 w-5 text-primary" />
              <h3 class="text-lg font-heading font-semibold">AI Feedback</h3>
            </div>

            <!-- Overall Score -->
            <div class="mb-6 p-4 rounded-xl bg-muted/30 border border-border">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-muted-foreground">Overall Score</span>
                <span class="text-2xl font-bold text-primary">{{ currentQuestion.feedback.score }}/10</span>
              </div>
              <div class="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  class="h-full bg-primary rounded-full transition-all duration-500"
                  :style="{ width: `${currentQuestion.feedback.score * 10}%` }"
                ></div>
              </div>
            </div>

            <!-- Strengths -->
            <div class="mb-4">
              <div class="flex items-center gap-2 mb-3">
                <CheckCircle class="h-4 w-4 text-green-500" />
                <span class="font-medium text-green-500">Strengths</span>
              </div>
              <ul class="space-y-2 text-sm text-muted-foreground pl-6">
                <li v-for="(strength, index) in currentQuestion.feedback.strengths" :key="index" class="list-disc">
                  {{ strength }}
                </li>
              </ul>
            </div>

            <!-- Areas for Improvement -->
            <div class="mb-4">
              <div class="flex items-center gap-2 mb-3">
                <AlertTriangle class="h-4 w-4 text-yellow-500" />
                <span class="font-medium text-yellow-500">Areas for Improvement</span>
              </div>
              <ul class="space-y-2 text-sm text-muted-foreground pl-6">
                <li v-for="(improvement, index) in currentQuestion.feedback.improvements" :key="index" class="list-disc">
                  {{ improvement }}
                </li>
              </ul>
            </div>

            <!-- Suggested Improvement -->
            <div class="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div class="flex items-center gap-2 mb-3">
                <Lightbulb class="h-4 w-4 text-primary" />
                <span class="font-medium text-primary">Suggested Improvement</span>
              </div>
              <p class="text-sm text-muted-foreground">
                {{ currentQuestion.feedback.suggestion }}
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
