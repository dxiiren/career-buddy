<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const { isDark, toggleTheme, initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    class="h-9 w-9 rounded-lg"
    @click="toggleTheme"
  >
    <Sun
      v-if="isDark"
      class="h-4 w-4 text-muted-foreground transition-all hover:text-foreground"
    />
    <Moon
      v-else
      class="h-4 w-4 text-muted-foreground transition-all hover:text-foreground"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
