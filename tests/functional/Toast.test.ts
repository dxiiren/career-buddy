import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Toast from '../../components/ui/toast/Toast.vue'

describe('Toast Component', () => {
  beforeEach(() => {
    // Create a teleport target
    const teleportTarget = document.createElement('div')
    teleportTarget.id = 'teleport-target'
    document.body.appendChild(teleportTarget)
  })

  afterEach(() => {
    // Clean up teleport target
    const target = document.getElementById('teleport-target')
    if (target) {
      document.body.removeChild(target)
    }
    vi.restoreAllMocks()
  })

  describe('visibility', () => {
    it('is hidden when visible prop is false', () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Test message',
          visible: false,
        },
      })

      // Toast uses Teleport, so check document body
      const toast = document.body.querySelector('.fixed.top-4')
      expect(toast).toBeNull()
      wrapper.unmount()
    })

    it('is visible when visible prop is true', async () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Test message',
          visible: true,
        },
      })

      await wrapper.vm.$nextTick()
      const toast = document.body.querySelector('.fixed')
      expect(toast).toBeTruthy()
      wrapper.unmount()
    })
  })

  describe('message display', () => {
    it('displays the message text', async () => {
      const testMessage = 'Success! Your action was completed.'
      const wrapper = mount(Toast, {
        props: {
          message: testMessage,
          visible: true,
        },
      })

      await wrapper.vm.$nextTick()
      const toast = document.body.querySelector('.fixed')
      expect(toast?.textContent).toContain(testMessage)
      wrapper.unmount()
    })
  })

  describe('toast types', () => {
    it('renders success type with correct styling', async () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Success message',
          type: 'success',
          visible: true,
        },
      })

      await wrapper.vm.$nextTick()
      const toast = document.body.querySelector('.fixed')
      expect(toast?.classList.toString()).toContain('bg-green')
      wrapper.unmount()
    })

    it('renders error type with correct styling', async () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Error message',
          type: 'error',
          visible: true,
        },
      })

      await wrapper.vm.$nextTick()
      const toast = document.body.querySelector('.fixed')
      expect(toast?.classList.toString()).toContain('bg-destructive')
      wrapper.unmount()
    })

    it('renders info type with correct styling', async () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Info message',
          type: 'info',
          visible: true,
        },
      })

      await wrapper.vm.$nextTick()
      const toast = document.body.querySelector('.fixed')
      expect(toast?.classList.toString()).toContain('bg-primary')
      wrapper.unmount()
    })

    it('defaults to info type', async () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Default message',
          visible: true,
        },
      })

      await wrapper.vm.$nextTick()
      const toast = document.body.querySelector('.fixed')
      expect(toast?.classList.toString()).toContain('bg-primary')
      wrapper.unmount()
    })
  })

  describe('icons', () => {
    it('renders CheckCircle icon for success type', async () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Success',
          type: 'success',
          visible: true,
        },
      })

      await wrapper.vm.$nextTick()
      const toast = document.body.querySelector('.fixed')
      const svg = toast?.querySelector('svg')
      expect(svg).toBeTruthy()
      wrapper.unmount()
    })

    it('renders AlertCircle icon for error type', async () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Error',
          type: 'error',
          visible: true,
        },
      })

      await wrapper.vm.$nextTick()
      const toast = document.body.querySelector('.fixed')
      const svg = toast?.querySelector('svg')
      expect(svg).toBeTruthy()
      wrapper.unmount()
    })

    it('renders Info icon for info type', async () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Info',
          type: 'info',
          visible: true,
        },
      })

      await wrapper.vm.$nextTick()
      const toast = document.body.querySelector('.fixed')
      const svg = toast?.querySelector('svg')
      expect(svg).toBeTruthy()
      wrapper.unmount()
    })
  })

  describe('close button', () => {
    it('renders close button', async () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Test',
          visible: true,
        },
      })

      await wrapper.vm.$nextTick()
      const toast = document.body.querySelector('.fixed')
      const button = toast?.querySelector('button')
      expect(button).toBeTruthy()
      wrapper.unmount()
    })

    it('emits close event when close button is clicked', async () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Test',
          visible: true,
        },
      })

      await wrapper.vm.$nextTick()
      const toast = document.body.querySelector('.fixed')
      const button = toast?.querySelector('button') as HTMLButtonElement
      button?.click()
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted('close')).toBeTruthy()
      wrapper.unmount()
    })
  })

  describe('auto-close behavior', () => {
    it('uses default duration of 3000ms', () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Test',
          visible: false,
        },
      })

      // Access internal component state
      expect(wrapper.vm.$props.duration).toBe(3000)
      wrapper.unmount()
    })

    it('accepts custom duration prop', () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Test',
          visible: false,
          duration: 5000,
        },
      })

      expect(wrapper.vm.$props.duration).toBe(5000)
      wrapper.unmount()
    })
  })

  describe('styling', () => {
    it('has fixed positioning', async () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Test',
          visible: true,
        },
      })

      await wrapper.vm.$nextTick()
      const toast = document.body.querySelector('.fixed')
      expect(toast).toBeTruthy()
      wrapper.unmount()
    })

    it('is centered horizontally', async () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Test',
          visible: true,
        },
      })

      await wrapper.vm.$nextTick()
      const toast = document.body.querySelector('.fixed')
      expect(toast?.classList.toString()).toContain('left-1/2')
      expect(toast?.classList.toString()).toContain('-translate-x-1/2')
      wrapper.unmount()
    })

    it('has high z-index for overlay', async () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Test',
          visible: true,
        },
      })

      await wrapper.vm.$nextTick()
      const toast = document.body.querySelector('.fixed')
      expect(toast?.classList.toString()).toContain('z-[100]')
      wrapper.unmount()
    })

    it('has rounded corners', async () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Test',
          visible: true,
        },
      })

      await wrapper.vm.$nextTick()
      const toast = document.body.querySelector('.fixed')
      expect(toast?.classList.toString()).toContain('rounded-lg')
      wrapper.unmount()
    })

    it('has border styling', async () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Test',
          visible: true,
        },
      })

      await wrapper.vm.$nextTick()
      const toast = document.body.querySelector('.fixed')
      expect(toast?.classList.toString()).toContain('border')
      wrapper.unmount()
    })

    it('has shadow effect', async () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Test',
          visible: true,
        },
      })

      await wrapper.vm.$nextTick()
      const toast = document.body.querySelector('.fixed')
      expect(toast?.classList.toString()).toContain('shadow-lg')
      wrapper.unmount()
    })

    it('has backdrop blur effect', async () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Test',
          visible: true,
        },
      })

      await wrapper.vm.$nextTick()
      const toast = document.body.querySelector('.fixed')
      expect(toast?.classList.toString()).toContain('backdrop-blur-sm')
      wrapper.unmount()
    })
  })

  describe('layout', () => {
    it('has flex layout', async () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Test',
          visible: true,
        },
      })

      await wrapper.vm.$nextTick()
      const toast = document.body.querySelector('.fixed')
      expect(toast?.classList.toString()).toContain('flex')
      expect(toast?.classList.toString()).toContain('items-center')
      wrapper.unmount()
    })

    it('has gap between elements', async () => {
      const wrapper = mount(Toast, {
        props: {
          message: 'Test',
          visible: true,
        },
      })

      await wrapper.vm.$nextTick()
      const toast = document.body.querySelector('.fixed')
      expect(toast?.classList.toString()).toContain('gap-3')
      wrapper.unmount()
    })
  })
})
