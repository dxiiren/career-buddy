import { ref, computed } from 'vue'

export interface ProgressModule {
  id: string
  name: string
  progress: number
  cta: string
  icon: string
  color: string
  href: string
}

export interface DailyTask {
  id: string
  text: string
  completed: boolean
}

export interface ActivityItem {
  id: string
  text: string
  time: string
  icon: string
}

export interface ResumeInfo {
  name: string
  title: string
  email: string
  lastUpdated: string
}

const isLoading = ref(true)

// Mock data
const progressModules = ref<ProgressModule[]>([
  { id: '1', name: 'Resume', progress: 60, cta: 'Continue Editing', icon: 'FileText', color: 'from-blue-500 to-blue-600', href: '/resume' },
  { id: '2', name: 'Cover Letter', progress: 30, cta: 'Finish Cover Letter', icon: 'Mail', color: 'from-purple-500 to-purple-600', href: '/resume/cover-letter' },
  { id: '3', name: 'Interview Prep', progress: 20, cta: 'Practise Now', icon: 'Mic', color: 'from-green-500 to-green-600', href: '/interview' },
  { id: '4', name: 'Networking', progress: 10, cta: 'Try a Template', icon: 'Users', color: 'from-orange-500 to-orange-600', href: '/networking' },
  { id: '5', name: 'Job Search Strategy', progress: 50, cta: 'Continue Guide', icon: 'Target', color: 'from-pink-500 to-pink-600', href: '/job-search' },
  { id: '6', name: 'Self-Promotion', progress: 15, cta: 'Improve LinkedIn', icon: 'TrendingUp', color: 'from-cyan-500 to-cyan-600', href: '/self-promotion' },
])

const dailyTasks = ref<DailyTask[]>([
  { id: '1', text: 'Complete 1 interview answer', completed: false },
  { id: '2', text: 'Update your LinkedIn headline', completed: false },
  { id: '3', text: 'Apply to 2 suitable jobs', completed: true },
])

const recentActivity = ref<ActivityItem[]>([
  { id: '1', text: 'Edited resume', time: 'Yesterday', icon: 'FileText' },
  { id: '2', text: 'Practised 3 interview questions', time: '2 days ago', icon: 'Mic' },
  { id: '3', text: 'Generated 1 message template', time: '3 days ago', icon: 'Mail' },
  { id: '4', text: 'Saved 2 jobs', time: 'Last week', icon: 'Bookmark' },
])

const resumeInfo = ref<ResumeInfo>({
  name: 'Akmal',
  title: 'Software Engineer',
  email: 'akmal@example.com',
  lastUpdated: '2 days ago',
})

const motivationalQuotes = [
  'Small progress is still progress.',
  'You are learning something valuable today.',
  'Every expert was once a beginner.',
  'Your dream job is closer than you think.',
  'Consistency beats perfection.',
]

const tips = [
  'Update your LinkedIn profile photo - profiles with photos get 21x more views.',
  'Practice the STAR method for behavioral interviews.',
  'Research the company culture before your interview.',
  'Tailor your resume for each job application.',
  'Follow up within 24 hours after an interview.',
]

export function useDashboard() {
  const overallProgress = computed(() => {
    const total = progressModules.value.reduce((sum, m) => sum + m.progress, 0)
    return Math.round(total / progressModules.value.length)
  })

  const currentQuote = computed(() => {
    const index = new Date().getDate() % motivationalQuotes.length
    return motivationalQuotes[index]
  })

  const currentTip = computed(() => {
    const index = new Date().getDate() % tips.length
    return tips[index]
  })

  async function loadDashboard() {
    isLoading.value = true
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    isLoading.value = false
  }

  function toggleTask(taskId: string) {
    const task = dailyTasks.value.find((t) => t.id === taskId)
    if (task) {
      task.completed = !task.completed
    }
  }

  return {
    isLoading,
    progressModules,
    dailyTasks,
    recentActivity,
    resumeInfo,
    overallProgress,
    currentQuote,
    currentTip,
    loadDashboard,
    toggleTask,
  }
}
