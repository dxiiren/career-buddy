export function useTheme() {
  const colorMode = useState<'light' | 'dark'>('color-mode', () => 'dark')

  const isDark = computed(() => colorMode.value === 'dark')

  function toggleTheme() {
    colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
    updateDOM()
    savePreference()
  }

  function setTheme(theme: 'light' | 'dark') {
    colorMode.value = theme
    updateDOM()
    savePreference()
  }

  function updateDOM() {
    if (import.meta.client) {
      const html = document.documentElement
      if (colorMode.value === 'light') {
        html.classList.add('light')
      } else {
        html.classList.remove('light')
      }
    }
  }

  function savePreference() {
    if (import.meta.client) {
      localStorage.setItem('color-mode', colorMode.value)
    }
  }

  function initTheme() {
    if (import.meta.client) {
      const saved = localStorage.getItem('color-mode') as 'light' | 'dark' | null
      if (saved) {
        colorMode.value = saved
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        colorMode.value = prefersDark ? 'dark' : 'light'
      }
      updateDOM()
    }
  }

  return {
    colorMode,
    isDark,
    toggleTheme,
    setTheme,
    initTheme,
  }
}
