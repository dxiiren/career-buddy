import { useIntersectionObserver } from '@vueuse/core'

export function useScrollAnimation() {
  const isVisible = ref(false)
  const target = ref<HTMLElement | null>(null)

  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        isVisible.value = true
        stop()
      }
    },
    { threshold: 0.1 }
  )

  return {
    target,
    isVisible,
  }
}
