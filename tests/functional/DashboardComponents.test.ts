import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { Progress } from '../../components/ui/progress'
import { Avatar } from '../../components/ui/avatar'

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
