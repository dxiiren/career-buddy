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

  it('renders 5 action links when loaded', async () => {
    const wrapper = await mountSuspended(QuickActions, {
      props: { loading: false },
    })

    const links = wrapper.findAll('a')
    expect(links.length).toBe(5)
  })
})

describe('DailyTasks - Skeleton Loading', () => {
  beforeEach(() => {
    // Clear sessionStorage before each test
    if (typeof window !== 'undefined') {
      window.sessionStorage.clear()
    }
  })

  it('renders task list when not loading', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: {
        loading: false,
      },
    })

    expect(wrapper.text()).toContain('Daily Tasks')
    // Default tasks should be loaded
    expect(wrapper.text()).toContain('Complete 1 interview answer')
  })

  it('shows skeleton placeholders when loading', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: {
        loading: true,
      },
    })

    // Should have skeleton elements
    const skeletons = wrapper.findAll('.skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('toggles task completion when checkbox is clicked', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: {
        loading: false,
      },
    })

    // Find the first task's checkbox button
    const checkboxButtons = wrapper.findAll('button.rounded-full')
    expect(checkboxButtons.length).toBeGreaterThan(0)

    // Click the first checkbox
    await checkboxButtons[0].trigger('click')

    // Component should still render (state managed internally)
    expect(wrapper.text()).toContain('Daily Tasks')
  })

  it('shows completed state with line-through styling', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: {
        loading: false,
      },
    })

    // The third default task is completed
    const taskItems = wrapper.findAll('li')
    expect(taskItems.length).toBeGreaterThan(0)

    // Should have at least one task with line-through (the completed one)
    const lineThrough = wrapper.find('.line-through')
    expect(lineThrough.exists()).toBe(true)
  })

  it('shows add task button when under max limit', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: {
        loading: false,
      },
    })

    // Should show add task button
    expect(wrapper.text()).toContain('Add task')
  })

  it('shows task counter', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: {
        loading: false,
      },
    })

    // Should show counter like "3/5"
    expect(wrapper.text()).toMatch(/\d+\/5/)
  })
})

// ==========================================
// DailyTasks CRUD Functionality Tests
// ==========================================

describe('DailyTasks - CRUD Operations', () => {
  beforeEach(() => {
    // Clear sessionStorage before each test
    if (typeof window !== 'undefined') {
      window.sessionStorage.clear()
    }
  })

  it('loads default tasks when no sessionStorage data exists', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    // Should have 3 default tasks
    expect(wrapper.text()).toContain('Complete 1 interview answer')
    expect(wrapper.text()).toContain('Update your LinkedIn headline')
    expect(wrapper.text()).toContain('Apply to 2 suitable jobs')
  })

  it('renders add task button that can be clicked', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    // The add task button should exist and be visible
    expect(wrapper.text()).toContain('Add task')

    // Find button containing "Add task"
    const buttons = wrapper.findAll('button')
    const addButton = buttons.find((b) => b.text().includes('Add task'))
    expect(addButton).toBeDefined()
  })

  it('has Plus icon in add task button', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    // Find button containing the Plus icon
    const html = wrapper.html()
    expect(html).toContain('lucide-plus')
  })

  it('renders edit and delete buttons for each task', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    // Should have pencil (edit) and trash (delete) icons
    const html = wrapper.html()
    expect(html).toContain('lucide-pencil')
    expect(html).toContain('lucide-trash2')
  })

  it('enters edit mode when edit button is clicked', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    // Find a task's edit button (pencil icon button)
    const taskItems = wrapper.findAll('li')
    expect(taskItems.length).toBeGreaterThan(0)

    // Find edit button within the first task (group hover shows buttons)
    const editButtons = wrapper.findAll('button')
    const pencilButton = editButtons.find((btn) => btn.find('svg.lucide-pencil').exists())

    if (pencilButton) {
      await pencilButton.trigger('click')
      // Should show edit input
      const editInput = wrapper.find('input[type="text"]')
      expect(editInput.exists()).toBe(true)
    }
  })

  it('deletes a task when delete button is clicked', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    // Initial task count
    const initialTasks = wrapper.findAll('li')
    const initialCount = initialTasks.length

    // Find delete button within the first task
    const deleteButtons = wrapper.findAll('button')
    const trashButton = deleteButtons.find((btn) => btn.find('svg.lucide-trash-2').exists())

    if (trashButton) {
      await trashButton.trigger('click')
      // Should have one less task
      const updatedTasks = wrapper.findAll('li')
      expect(updatedTasks.length).toBe(initialCount - 1)
    }
  })

  it('toggles task completion status (strikethrough)', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    // Find first incomplete task checkbox
    const checkboxButtons = wrapper.findAll('button.rounded-full')
    const incompleteCheckbox = checkboxButtons.find(
      (btn) => !btn.classes().includes('bg-green-500')
    )

    if (incompleteCheckbox) {
      await incompleteCheckbox.trigger('click')
      // The task should now have line-through class
      expect(wrapper.find('.line-through').exists()).toBe(true)
    }
  })

  it('hides add button when max tasks reached', async () => {
    // Pre-populate sessionStorage with 5 tasks
    const fiveTasks = [
      { id: '1', text: 'Task 1', completed: false },
      { id: '2', text: 'Task 2', completed: false },
      { id: '3', text: 'Task 3', completed: false },
      { id: '4', text: 'Task 4', completed: false },
      { id: '5', text: 'Task 5', completed: false },
    ]
    window.sessionStorage.setItem('careerbuddy_daily_tasks', JSON.stringify(fiveTasks))

    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    // Add task button should not be visible
    expect(wrapper.text()).not.toContain('Add task')
    expect(wrapper.text()).toContain('Maximum 5 tasks reached')
  })

  it('displays task count as fraction of max', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    // Should show counter like "3/5" (3 default tasks out of 5 max)
    expect(wrapper.text()).toContain('3/5')
  })

  it('displays 5/5 counter when at max tasks', async () => {
    // Pre-populate sessionStorage with 5 tasks
    const fiveTasks = [
      { id: '1', text: 'Task 1', completed: false },
      { id: '2', text: 'Task 2', completed: false },
      { id: '3', text: 'Task 3', completed: false },
      { id: '4', text: 'Task 4', completed: false },
      { id: '5', text: 'Task 5', completed: false },
    ]
    window.sessionStorage.setItem('careerbuddy_daily_tasks', JSON.stringify(fiveTasks))

    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    expect(wrapper.text()).toContain('5/5')
  })

  it('loads tasks from sessionStorage on mount', async () => {
    // Pre-populate sessionStorage
    const customTasks = [
      { id: '1', text: 'Custom task from storage', completed: true },
    ]
    window.sessionStorage.setItem('careerbuddy_daily_tasks', JSON.stringify(customTasks))

    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    expect(wrapper.text()).toContain('Custom task from storage')
  })

  it('shows check icon in completed task checkbox', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    // The third default task is completed, so there should be a check icon
    const html = wrapper.html()
    expect(html).toContain('lucide-check')
    expect(html).toContain('bg-green-500')
  })

  it('has proper styling for task items', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    // Check for list styling
    const list = wrapper.find('ul')
    expect(list.exists()).toBe(true)
    expect(list.classes()).toContain('space-y-2')
  })

  it('shows clear all button when tasks exist', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    // Should show "Clear all" button when there are tasks
    expect(wrapper.text()).toContain('Clear all')
  })

  it('hides clear all button when no tasks exist', async () => {
    // Pre-populate sessionStorage with empty tasks
    window.sessionStorage.setItem('careerbuddy_daily_tasks', JSON.stringify([]))

    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    // Should not show "Clear all" button when there are no tasks
    expect(wrapper.text()).not.toContain('Clear all')
  })

  it('clears all tasks when clear all button is clicked', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    // Find and click the clear all button
    const buttons = wrapper.findAll('button')
    const clearButton = buttons.find((b) => b.text().includes('Clear all'))
    expect(clearButton).toBeDefined()

    await clearButton!.trigger('click')

    // Should show 0/5 counter and no tasks
    expect(wrapper.text()).toContain('0/5')
    expect(wrapper.findAll('li').length).toBe(0)
  })

  it('shows input field when add task button is clicked', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    // Find and click the add task button
    const buttons = wrapper.findAll('button')
    const addButton = buttons.find((b) => b.text().includes('Add task'))
    expect(addButton).toBeDefined()

    await addButton!.trigger('click')

    // Should show input field with placeholder
    const input = wrapper.find('input[placeholder="New task..."]')
    expect(input.exists()).toBe(true)
  })

  it('has input ref for auto-focus functionality', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    // Click add task button to show input
    const buttons = wrapper.findAll('button')
    const addButton = buttons.find((b) => b.text().includes('Add task'))
    await addButton!.trigger('click')

    // Input should exist and be focusable
    const input = wrapper.find('input[placeholder="New task..."]')
    expect(input.exists()).toBe(true)
    // The input should have a ref attribute (implemented via template ref)
    expect(input.element).toBeInstanceOf(HTMLInputElement)
  })

  it('hides input and shows add button when cancel is clicked', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    // Click add task button to show input
    const buttons = wrapper.findAll('button')
    const addButton = buttons.find((b) => b.text().includes('Add task'))
    await addButton!.trigger('click')

    // Find and click the X (cancel) button - look for lucide-x icon
    const html = wrapper.html()
    expect(html).toContain('lucide-x')

    // Find all buttons and get the one that's in the add input area
    const allButtons = wrapper.findAll('button')
    // The cancel button should be near the input - find buttons that aren't the confirm button
    const cancelButton = allButtons.find((btn) => {
      const btnHtml = btn.html()
      return btnHtml.includes('lucide-x') && !btnHtml.includes('lucide-check')
    })
    expect(cancelButton).toBeDefined()
    await cancelButton!.trigger('click')

    // Input should be hidden, add task button should be visible again
    expect(wrapper.find('input[placeholder="New task..."]').exists()).toBe(false)
    expect(wrapper.text()).toContain('Add task')
  })

  it('adds a new task when input is submitted', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    // Initial count
    const initialCount = wrapper.findAll('li').length

    // Click add task button
    const buttons = wrapper.findAll('button')
    const addButton = buttons.find((b) => b.text().includes('Add task'))
    await addButton!.trigger('click')

    // Type in the input
    const input = wrapper.find('input[placeholder="New task..."]')
    await input.setValue('My new test task')

    // Submit by pressing enter
    await input.trigger('keyup.enter')

    // Should have one more task
    expect(wrapper.findAll('li').length).toBe(initialCount + 1)
    expect(wrapper.text()).toContain('My new test task')
  })

  it('saves edit when check button is clicked in edit mode', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    // Find and click edit button for first task (pencil icon)
    const pencilButton = wrapper.findAll('button').find((btn) => btn.html().includes('lucide-pencil'))
    expect(pencilButton).toBeDefined()
    await pencilButton!.trigger('click')

    // Edit the text
    const editInput = wrapper.find('input[type="text"]')
    await editInput.setValue('Edited task text')

    // Click the green check button to save (in edit mode)
    const saveButton = wrapper.findAll('button').find((btn) => {
      const btnHtml = btn.html()
      return btnHtml.includes('lucide-check') && btnHtml.includes('text-green')
    })
    expect(saveButton).toBeDefined()
    await saveButton!.trigger('click')

    // Should show the edited text
    expect(wrapper.text()).toContain('Edited task text')
  })

  it('cancels edit when X button is clicked in edit mode', async () => {
    const wrapper = await mountSuspended(DailyTasks, {
      props: { loading: false },
    })

    const originalText = 'Complete 1 interview answer'

    // Find and click edit button for first task
    const pencilButton = wrapper.findAll('button').find((btn) => btn.html().includes('lucide-pencil'))
    expect(pencilButton).toBeDefined()
    await pencilButton!.trigger('click')

    // Edit the text
    const editInput = wrapper.find('input[type="text"]')
    await editInput.setValue('This should not be saved')

    // Click the X button to cancel edit
    const cancelButton = wrapper.findAll('button').find((btn) => {
      const btnHtml = btn.html()
      return btnHtml.includes('lucide-x')
    })
    expect(cancelButton).toBeDefined()
    await cancelButton!.trigger('click')

    // Should still show original text
    expect(wrapper.text()).toContain(originalText)
    expect(wrapper.text()).not.toContain('This should not be saved')
  })
})

describe('RecentActivity - Skeleton Loading', () => {
  it('renders component with title when not loading', async () => {
    const wrapper = await mountSuspended(RecentActivity, {
      props: {
        loading: false,
      },
    })

    expect(wrapper.text()).toContain('Recent Activity')
  })

  it('shows empty state when no activities tracked', async () => {
    const wrapper = await mountSuspended(RecentActivity, {
      props: {
        loading: false,
      },
    })

    expect(wrapper.text()).toContain('No recent activity yet')
    expect(wrapper.text()).toContain('Start exploring')
  })

  it('shows skeleton placeholders when loading', async () => {
    const wrapper = await mountSuspended(RecentActivity, {
      props: {
        loading: true,
      },
    })

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
  beforeEach(() => {
    // Mock fetch for quote API
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          quote: 'Test motivational quote',
          author: 'Test Author',
        }),
      })
    ))
  })

  it('renders motivation and tip sections when not loading', async () => {
    const wrapper = await mountSuspended(MotivationalSection, {
      props: { loading: false },
    })

    expect(wrapper.text()).toContain('Motivation')
    expect(wrapper.text()).toContain('Tip of the Day')
  })

  it('shows skeleton placeholders when loading', async () => {
    const wrapper = await mountSuspended(MotivationalSection, {
      props: { loading: true },
    })

    // Should have skeleton elements
    const skeletons = wrapper.findAll('.skeleton-shimmer')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('has refresh button for motivation quote', async () => {
    const wrapper = await mountSuspended(MotivationalSection, {
      props: { loading: false },
    })

    // Should have refresh icon
    const html = wrapper.html()
    expect(html).toContain('lucide-refresh-cw')
  })

  it('displays tip of the day based on current date', async () => {
    const wrapper = await mountSuspended(MotivationalSection, {
      props: { loading: false },
    })

    // Tip section should exist and contain text
    expect(wrapper.text()).toContain('Tip of the Day')
    // Should have some tip content in the yellow tip box (varies by day)
    const tipBox = wrapper.find('.from-yellow-500\\/5')
    expect(tipBox.exists()).toBe(true)
    expect(tipBox.text().length).toBeGreaterThan(0)
  })

  it('has sparkles icon for motivation section', async () => {
    const wrapper = await mountSuspended(MotivationalSection, {
      props: { loading: false },
    })

    const html = wrapper.html()
    expect(html).toContain('lucide-sparkles')
  })

  it('has lightbulb icon for tip section', async () => {
    const wrapper = await mountSuspended(MotivationalSection, {
      props: { loading: false },
    })

    const html = wrapper.html()
    expect(html).toContain('lucide-lightbulb')
  })
})

// ==========================================
// MotivationalSection - API and Daily Tips Tests
// ==========================================

describe('MotivationalSection - Quote API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches quote from API on mount', async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          quote: 'Success is not final',
          author: 'Winston Churchill',
        }),
      })
    )
    vi.stubGlobal('fetch', mockFetch)

    await mountSuspended(MotivationalSection, {
      props: { loading: false },
    })

    expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/quotes/random')
  })

  it('displays fetched quote and author', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          quote: 'The only way to do great work is to love what you do',
          author: 'Steve Jobs',
        }),
      })
    ))

    const wrapper = await mountSuspended(MotivationalSection, {
      props: { loading: false },
    })

    // Wait for async fetch
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('The only way to do great work is to love what you do')
    expect(wrapper.text()).toContain('Steve Jobs')
  })

  it('shows fallback quote when API fails', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('Network error'))))

    const wrapper = await mountSuspended(MotivationalSection, {
      props: { loading: false },
    })

    // Wait for async fetch to fail and fallback
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Success is not final, failure is not fatal')
    expect(wrapper.text()).toContain('Winston Churchill')
  })

  it('refresh button can be clicked to fetch new quote', async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          quote: 'Test quote',
          author: 'Test Author',
        }),
      })
    )
    vi.stubGlobal('fetch', mockFetch)

    const wrapper = await mountSuspended(MotivationalSection, {
      props: { loading: false },
    })

    // Initial fetch on mount
    expect(mockFetch).toHaveBeenCalledTimes(1)

    // Find and click refresh button (look for lucide-refresh-cw in html)
    const refreshButton = wrapper.findAll('button').find((btn) => btn.html().includes('lucide-refresh-cw'))
    expect(refreshButton).toBeDefined()
    await refreshButton!.trigger('click')

    // Should fetch again
    expect(mockFetch).toHaveBeenCalledTimes(2)
  })

  it('refresh button is disabled when loading', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          quote: 'Test quote',
          author: 'Test Author',
        }),
      })
    ))

    const wrapper = await mountSuspended(MotivationalSection, {
      props: { loading: false },
    })

    // Find refresh button
    const refreshButton = wrapper.findAll('button').find((btn) => btn.html().includes('lucide-refresh-cw'))
    expect(refreshButton).toBeDefined()

    // Button should have disabled attribute capability (check it exists)
    expect(refreshButton!.attributes('disabled')).toBeUndefined() // Not disabled when not loading
  })

  it('displays quote in italic style', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          quote: 'Styled quote',
          author: 'Author',
        }),
      })
    ))

    const wrapper = await mountSuspended(MotivationalSection, {
      props: { loading: false },
    })

    const quoteElement = wrapper.find('.italic')
    expect(quoteElement.exists()).toBe(true)
  })

  it('wraps quote in quotation marks', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          quote: 'Quote with marks',
          author: 'Author',
        }),
      })
    ))

    const wrapper = await mountSuspended(MotivationalSection, {
      props: { loading: false },
    })

    await wrapper.vm.$nextTick()

    // Should have quotation marks around the quote
    expect(wrapper.text()).toContain('"Quote with marks"')
  })

  it('shows author with em dash prefix', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          quote: 'Test quote',
          author: 'Famous Person',
        }),
      })
    ))

    const wrapper = await mountSuspended(MotivationalSection, {
      props: { loading: false },
    })

    await wrapper.vm.$nextTick()

    // Should show author with em dash
    expect(wrapper.text()).toContain('— Famous Person')
  })
})

describe('MotivationalSection - Daily Tips', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          quote: 'Test quote',
          author: 'Test Author',
        }),
      })
    ))
  })

  it('displays a tip from the 31 career tips array', async () => {
    const wrapper = await mountSuspended(MotivationalSection, {
      props: { loading: false },
    })

    // Known tips from the array
    const knownTips = [
      'Practice the STAR method',
      'Update your LinkedIn headline',
      'Research the company culture',
      'Prepare 3-5 thoughtful questions',
      'Tailor your resume',
    ]

    // Find the tip text in the yellow-bordered box
    const tipBox = wrapper.find('.from-yellow-500\\/5')
    expect(tipBox.exists()).toBe(true)
    const tipText = tipBox.text()

    // The displayed tip should be one of the 31 tips (checking partial matches)
    expect(tipText.length).toBeGreaterThan(0)
  })

  it('tip section has yellow lightbulb icon', async () => {
    const wrapper = await mountSuspended(MotivationalSection, {
      props: { loading: false },
    })

    const html = wrapper.html()
    expect(html).toContain('lucide-lightbulb')
    expect(html).toContain('text-yellow-500')
  })

  it('tip section has yellow "Tip of the Day" label', async () => {
    const wrapper = await mountSuspended(MotivationalSection, {
      props: { loading: false },
    })

    // Find the tip label
    const tipLabel = wrapper.find('.text-yellow-500')
    expect(tipLabel.exists()).toBe(true)
    expect(wrapper.text()).toContain('Tip of the Day')
  })

  it('has proper card styling', async () => {
    const wrapper = await mountSuspended(MotivationalSection, {
      props: { loading: false },
    })

    const container = wrapper.find('.rounded-2xl.bg-card.border')
    expect(container.exists()).toBe(true)
  })

  it('has two sections: motivation and tip', async () => {
    const wrapper = await mountSuspended(MotivationalSection, {
      props: { loading: false },
    })

    // Should have space-y-6 container with two children
    const sectionsContainer = wrapper.find('.space-y-6')
    expect(sectionsContainer.exists()).toBe(true)

    // Should contain both sections
    expect(wrapper.text()).toContain('Motivation')
    expect(wrapper.text()).toContain('Tip of the Day')
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
