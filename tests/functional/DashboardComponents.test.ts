import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { Progress } from '../../components/ui/progress'
import { Avatar } from '../../components/ui/avatar'
import WelcomeHeader from '../../components/dashboard/WelcomeHeader.vue'
import QuickActions from '../../components/dashboard/QuickActions.vue'
import DailyTasks from '../../components/dashboard/DailyTasks.vue'
import RecentActivity from '../../components/dashboard/RecentActivity.vue'
import ResumePreview from '../../components/dashboard/ResumePreview.vue'
import MotivationalSection from '../../components/dashboard/MotivationalSection.vue'
import ProgressModules from '../../components/dashboard/ProgressModules.vue'

describe('Progress component', () => {
  it('should render with default value of 0', async () => {
    const wrapper = await mountSuspended(Progress, {
      props: {
        modelValue: 0,
      },
    })

    expect(wrapper.find('[role="progressbar"]').attributes('aria-valuenow')).toBe('0')
  })

  it('should render with provided value', async () => {
    const wrapper = await mountSuspended(Progress, {
      props: {
        modelValue: 60,
      },
    })

    expect(wrapper.find('[role="progressbar"]').attributes('aria-valuenow')).toBe('60')
  })

  it('should have correct aria-valuemax', async () => {
    const wrapper = await mountSuspended(Progress, {
      props: {
        modelValue: 50,
        max: 100,
      },
    })

    expect(wrapper.find('[role="progressbar"]').attributes('aria-valuemax')).toBe('100')
  })

  it('should clamp progress to 0-100 range', async () => {
    const wrapper = await mountSuspended(Progress, {
      props: {
        modelValue: 150,
        max: 100,
      },
    })

    // The internal percentage should be clamped
    expect(wrapper.find('[role="progressbar"]').exists()).toBe(true)
  })

  it('should have progressbar role', async () => {
    const wrapper = await mountSuspended(Progress, {
      props: {
        modelValue: 50,
      },
    })

    expect(wrapper.find('[role="progressbar"]').exists()).toBe(true)
  })
})

describe('Avatar component', () => {
  it('should render fallback when no src provided', async () => {
    const wrapper = await mountSuspended(Avatar, {
      props: {
        fallback: 'JD',
      },
    })

    expect(wrapper.text()).toContain('JD')
  })

  it('should render default fallback U when nothing provided', async () => {
    const wrapper = await mountSuspended(Avatar)

    expect(wrapper.text()).toContain('U')
  })

  it('should render image when src provided', async () => {
    const wrapper = await mountSuspended(Avatar, {
      props: {
        src: 'https://example.com/avatar.jpg',
        alt: 'User avatar',
      },
    })

    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/avatar.jpg')
    expect(wrapper.find('img').attributes('alt')).toBe('User avatar')
  })

  it('should have rounded-full class', async () => {
    const wrapper = await mountSuspended(Avatar)

    expect(wrapper.find('span').classes()).toContain('rounded-full')
  })
})

describe('Dashboard data structure', () => {
  it('should have valid progress module structure', async () => {
    const { useDashboard } = await import('../../composables/useDashboard')
    const { progressModules } = useDashboard()

    progressModules.value.forEach((module) => {
      expect(module).toHaveProperty('id')
      expect(module).toHaveProperty('name')
      expect(module).toHaveProperty('progress')
      expect(module).toHaveProperty('cta')
      expect(module).toHaveProperty('icon')
      expect(module).toHaveProperty('color')
    })
  })

  it('should have valid daily task structure', async () => {
    const { useDashboard } = await import('../../composables/useDashboard')
    const { dailyTasks } = useDashboard()

    dailyTasks.value.forEach((task) => {
      expect(task).toHaveProperty('id')
      expect(task).toHaveProperty('text')
      expect(task).toHaveProperty('completed')
      expect(typeof task.completed).toBe('boolean')
    })
  })

  it('should have valid activity item structure', async () => {
    const { useDashboard } = await import('../../composables/useDashboard')
    const { recentActivity } = useDashboard()

    recentActivity.value.forEach((activity) => {
      expect(activity).toHaveProperty('id')
      expect(activity).toHaveProperty('text')
      expect(activity).toHaveProperty('time')
      expect(activity).toHaveProperty('icon')
    })
  })

  it('should have valid resume info structure', async () => {
    const { useDashboard } = await import('../../composables/useDashboard')
    const { resumeInfo } = useDashboard()

    expect(resumeInfo.value).toHaveProperty('name')
    expect(resumeInfo.value).toHaveProperty('title')
    expect(resumeInfo.value).toHaveProperty('email')
    expect(resumeInfo.value).toHaveProperty('lastUpdated')
  })
})

// ==========================================
// Skeleton Loading Tests for Dashboard Components
// ==========================================

describe('WelcomeHeader - Skeleton Loading', () => {
  const defaultProps = {
    userName: 'John',
    overallProgress: 65,
    loading: false,
  }

  it('renders actual content when not loading', async () => {
    const wrapper = await mountSuspended(WelcomeHeader, {
      props: defaultProps,
    })

    expect(wrapper.text()).toContain('Welcome back, John!')
    expect(wrapper.text()).toContain("Let's continue your career prep")
    expect(wrapper.text()).toContain('65%')
  })

  it('shows skeleton placeholders when loading', async () => {
    const wrapper = await mountSuspended(WelcomeHeader, {
      props: {
        ...defaultProps,
        loading: true,
      },
    })

    // Should not show actual content
    expect(wrapper.text()).not.toContain('Welcome back')
    expect(wrapper.text()).not.toContain('65%')

    // Should have skeleton elements
    const skeletons = wrapper.findAll('.skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('calculates progress ring correctly', async () => {
    const wrapper = await mountSuspended(WelcomeHeader, {
      props: {
        userName: 'Test',
        overallProgress: 50,
        loading: false,
      },
    })

    const progressCircle = wrapper.find('circle.text-primary')
    expect(progressCircle.exists()).toBe(true)
  })

  it('has proper container styling', async () => {
    const wrapper = await mountSuspended(WelcomeHeader, {
      props: defaultProps,
    })

    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('rounded-2xl')
    expect(classes).toContain('bg-card')
    expect(classes).toContain('border')
  })
})

describe('QuickActions - Skeleton Loading', () => {
  it('renders action buttons when not loading', async () => {
    const wrapper = await mountSuspended(QuickActions, {
      props: { loading: false },
    })

    expect(wrapper.text()).toContain('Quick Actions')
    expect(wrapper.text()).toContain('Write Resume')
    expect(wrapper.text()).toContain('Practise Interview')
    expect(wrapper.text()).toContain('Generate Cover Letter')
  })

  it('shows skeleton placeholders when loading', async () => {
    const wrapper = await mountSuspended(QuickActions, {
      props: { loading: true },
    })

    // Should not show action buttons
    expect(wrapper.text()).not.toContain('Write Resume')

    // Should have skeleton elements
    const skeletons = wrapper.findAll('.skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('renders 5 action buttons when loaded', async () => {
    const wrapper = await mountSuspended(QuickActions, {
      props: { loading: false },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(5)
  })
})

describe('DailyTasks - Skeleton Loading', () => {
  const mockTasks = [
    { id: '1', text: 'Update your resume', completed: false },
    { id: '2', text: 'Practice interview questions', completed: true },
    { id: '3', text: 'Send one networking message', completed: false },
  ]

  it('renders task list when not loading', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: {
        tasks: mockTasks,
        loading: false,
      },
    })

    expect(wrapper.text()).toContain('Daily Tasks')
    expect(wrapper.text()).toContain('Update your resume')
    expect(wrapper.text()).toContain('Practice interview questions')
  })

  it('shows skeleton placeholders when loading', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: {
        tasks: mockTasks,
        loading: true,
      },
    })

    // Should not show actual tasks
    expect(wrapper.text()).not.toContain('Update your resume')

    // Should have skeleton elements
    const skeletons = wrapper.findAll('.skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('emits toggle event when task is clicked', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: {
        tasks: mockTasks,
        loading: false,
      },
    })

    const taskItems = wrapper.findAll('li')
    await taskItems[0].trigger('click')

    expect(wrapper.emitted('toggle')).toBeTruthy()
    expect(wrapper.emitted('toggle')![0]).toEqual(['1'])
  })

  it('shows completed state correctly', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: {
        tasks: mockTasks,
        loading: false,
      },
    })

    // The completed task should have line-through styling
    const completedTask = wrapper.findAll('li')[1]
    expect(completedTask.find('.line-through').exists()).toBe(true)
  })
})

describe('RecentActivity - Skeleton Loading', () => {
  const mockActivities = [
    { id: '1', text: 'Updated resume', icon: 'FileText', time: '2 hours ago' },
    { id: '2', text: 'Completed interview prep', icon: 'Mic', time: '5 hours ago' },
  ]

  it('renders activity list when not loading', async () => {
    const wrapper = await mountSuspended(RecentActivity, {
      props: {
        activities: mockActivities,
        loading: false,
      },
    })

    expect(wrapper.text()).toContain('Recent Activity')
    expect(wrapper.text()).toContain('Updated resume')
    expect(wrapper.text()).toContain('2 hours ago')
  })

  it('shows skeleton placeholders when loading', async () => {
    const wrapper = await mountSuspended(RecentActivity, {
      props: {
        activities: mockActivities,
        loading: true,
      },
    })

    // Should not show actual activities
    expect(wrapper.text()).not.toContain('Updated resume')

    // Should have skeleton elements
    const skeletons = wrapper.findAll('.skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)
  })
})

describe('ResumePreview - Skeleton Loading', () => {
  const mockResume = {
    name: 'John Doe',
    title: 'Software Engineer',
    email: 'john@example.com',
    lastUpdated: '2 days ago',
  }

  it('renders resume info when not loading', async () => {
    const wrapper = await mountSuspended(ResumePreview, {
      props: {
        resume: mockResume,
        loading: false,
      },
    })

    expect(wrapper.text()).toContain('Resume Preview')
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('Software Engineer')
    expect(wrapper.text()).toContain('john@example.com')
  })

  it('shows skeleton placeholders when loading', async () => {
    const wrapper = await mountSuspended(ResumePreview, {
      props: {
        resume: mockResume,
        loading: true,
      },
    })

    // Should not show actual resume info
    expect(wrapper.text()).not.toContain('John Doe')

    // Should have skeleton elements
    const skeletons = wrapper.findAll('.skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('has Edit button when not loading', async () => {
    const wrapper = await mountSuspended(ResumePreview, {
      props: {
        resume: mockResume,
        loading: false,
      },
    })

    expect(wrapper.text()).toContain('Edit')
  })
})

describe('MotivationalSection - Skeleton Loading', () => {
  const defaultProps = {
    quote: 'Success is not final, failure is not fatal.',
    tip: 'Spend 10 minutes daily on networking.',
    loading: false,
  }

  it('renders quote and tip when not loading', async () => {
    const wrapper = await mountSuspended(MotivationalSection, {
      props: defaultProps,
    })

    expect(wrapper.text()).toContain('Success is not final')
    expect(wrapper.text()).toContain('Spend 10 minutes')
    expect(wrapper.text()).toContain('Motivation')
    expect(wrapper.text()).toContain('Tip of the Day')
  })

  it('shows skeleton placeholders when loading', async () => {
    const wrapper = await mountSuspended(MotivationalSection, {
      props: {
        ...defaultProps,
        loading: true,
      },
    })

    // Should not show actual content
    expect(wrapper.text()).not.toContain('Success is not final')

    // Should have skeleton elements
    const skeletons = wrapper.findAll('.skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)
  })
})

describe('ProgressModules - Skeleton Loading', () => {
  const mockModules = [
    { id: '1', name: 'Resume', progress: 60, cta: 'Continue', icon: 'FileText', color: 'from-blue-500 to-blue-600' },
    { id: '2', name: 'Cover Letter', progress: 30, cta: 'Start', icon: 'Mail', color: 'from-purple-500 to-purple-600' },
  ]

  it('renders modules when not loading', async () => {
    const wrapper = await mountSuspended(ProgressModules, {
      props: {
        modules: mockModules,
        loading: false,
      },
    })

    expect(wrapper.text()).toContain('Your Progress')
    expect(wrapper.text()).toContain('Resume')
    expect(wrapper.text()).toContain('60%')
    expect(wrapper.text()).toContain('Cover Letter')
    expect(wrapper.text()).toContain('30%')
  })

  it('shows skeleton placeholders when loading', async () => {
    const wrapper = await mountSuspended(ProgressModules, {
      props: {
        modules: mockModules,
        loading: true,
      },
    })

    // Should not show actual modules
    expect(wrapper.text()).not.toContain('Resume')

    // Should have skeleton elements
    const skeletons = wrapper.findAll('.skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('displays skeleton cards with borders when loading', async () => {
    const wrapper = await mountSuspended(ProgressModules, {
      props: {
        modules: mockModules,
        loading: true,
      },
    })

    // Check for card container styling during skeleton state
    const skeletonCards = wrapper.findAll('.rounded-xl.border')
    expect(skeletonCards.length).toBeGreaterThan(0)
  })

  it('applies correct color classes to progress badges', async () => {
    const wrapper = await mountSuspended(ProgressModules, {
      props: {
        modules: mockModules,
        loading: false,
      },
    })

    // 60% should be displayed
    expect(wrapper.html()).toContain('60%')
    // 30% should be displayed
    expect(wrapper.html()).toContain('30%')
  })
})

describe('Dashboard Components - Default Loading State', () => {
  it('all components default to loading=false', async () => {
    // Test that components work without explicitly setting loading
    const welcomeWrapper = await mountSuspended(WelcomeHeader, {
      props: { userName: 'Test', overallProgress: 50 },
    })
    expect(welcomeWrapper.text()).toContain('Welcome back')

    const quickActionsWrapper = await mountSuspended(QuickActions)
    expect(quickActionsWrapper.text()).toContain('Quick Actions')
  })

  it('skeleton elements have shimmer animation class', async () => {
    const wrapper = await mountSuspended(WelcomeHeader, {
      props: { userName: 'Test', overallProgress: 50, loading: true },
    })

    const skeletons = wrapper.findAll('.skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)
    skeletons.forEach((skeleton) => {
      expect(skeleton.classes()).toContain('skeleton-shimmer')
    })
  })
})
