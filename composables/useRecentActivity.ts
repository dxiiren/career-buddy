import { ref } from 'vue'

export interface TrackedActivity {
  id: string
  text: string
  time: string
  icon: string
  timestamp: number
  path: string
}

const STORAGE_KEY = 'careerbuddy_recent_activity'
const MAX_ACTIVITIES = 4

// Page configuration for tracking
const pageConfig: Record<string, { text: string; icon: string }> = {
  // Dashboard
  '/dashboard': { text: 'Viewed Dashboard', icon: 'LayoutDashboard' },

  // Resume section
  '/resume': { text: 'Visited Resume Builder', icon: 'FileText' },
  '/resume/templates': { text: 'Browsed Resume Templates', icon: 'FileText' },
  '/resume/cover-letter': { text: 'Visited Cover Letter', icon: 'Mail' },
  '/resume/ats': { text: 'Visited ATS Optimization', icon: 'FileText' },

  // Interview section
  '/interview': { text: 'Visited Interview Prep', icon: 'Mic' },
  '/interview/questions': { text: 'Practiced Interview Questions', icon: 'Mic' },
  '/interview/simulation': { text: 'Ran Interview Simulation', icon: 'Mic' },

  // Networking section
  '/networking': { text: 'Visited Networking', icon: 'Users' },
  '/networking/templates': { text: 'Viewed Message Templates', icon: 'Mail' },

  // Job Search section
  '/job-search': { text: 'Visited Job Search Strategy', icon: 'Target' },
  '/job-search/platforms': { text: 'Explored Job Platforms', icon: 'Target' },
  '/job-search/salary': { text: 'Viewed Salary Guide', icon: 'Target' },
  '/job-search/scams': { text: 'Learned About Job Scams', icon: 'Target' },

  // Self-Promotion section
  '/self-promotion': { text: 'Visited Self-Promotion', icon: 'TrendingUp' },
  '/self-promotion/linkedin': { text: 'Optimized LinkedIn Profile', icon: 'TrendingUp' },
  '/self-promotion/workplace': { text: 'Learned Workplace Tips', icon: 'TrendingUp' },

  // Chat & Help
  '/chat': { text: 'Chatted with Career Buddy', icon: 'MessageCircle' },
  '/help': { text: 'Visited Help & Support', icon: 'HelpCircle' },

  // Settings
  '/settings': { text: 'Visited Settings', icon: 'Settings' },
}

// Shared state
const activities = ref<TrackedActivity[]>([])

export function useRecentActivity() {
  // Load activities from sessionStorage
  function loadActivities() {
    if (import.meta.client) {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as TrackedActivity[]
          // Update relative times
          activities.value = parsed.map((a) => ({
            ...a,
            time: getRelativeTime(a.timestamp),
          }))
        } catch {
          activities.value = []
        }
      }
    }
  }

  // Save activities to sessionStorage
  function saveActivities() {
    if (import.meta.client) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(activities.value))
    }
  }

  // Track a page visit
  function trackPageVisit(path: string) {
    const config = pageConfig[path]
    if (!config) return // Don't track unknown pages

    const now = Date.now()

    // Check if we already have a recent visit to the same page (within 1 minute)
    const recentSamePage = activities.value.find(
      (a) => a.path === path && now - a.timestamp < 60000
    )
    if (recentSamePage) return // Don't duplicate recent visits

    const newActivity: TrackedActivity = {
      id: now.toString(),
      text: config.text,
      time: getRelativeTime(now),
      icon: config.icon,
      timestamp: now,
      path,
    }

    // Add to beginning and keep only top MAX_ACTIVITIES
    activities.value = [newActivity, ...activities.value.filter((a) => a.path !== path)].slice(0, MAX_ACTIVITIES)
    saveActivities()
  }

  // Get relative time string from timestamp
  function getRelativeTime(timestamp: number): string {
    const now = Date.now()
    const diff = now - timestamp
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`
    return 'Last week'
  }

  // Clear all activities
  function clearActivities() {
    activities.value = []
    if (import.meta.client) {
      sessionStorage.removeItem(STORAGE_KEY)
    }
  }

  // Get activities for display (with updated relative times)
  function getActivities(): TrackedActivity[] {
    return activities.value.map((a) => ({
      ...a,
      time: getRelativeTime(a.timestamp),
    }))
  }

  return {
    activities,
    loadActivities,
    trackPageVisit,
    clearActivities,
    getActivities,
  }
}
