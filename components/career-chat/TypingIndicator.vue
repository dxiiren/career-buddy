<script setup lang="ts">
import { Bot } from 'lucide-vue-next'
</script>

<template>
  <div class="flex gap-3">
    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
      <Bot class="h-4 w-4 text-muted-foreground" />
    </div>
    <div class="bg-muted rounded-2xl rounded-tl-sm p-4">
      <div class="flex gap-1">
        <span class="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style="animation-delay: 0ms" />
        <span class="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style="animation-delay: 150ms" />
        <span class="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style="animation-delay: 300ms" />
      </div>
    </div>
  </div>
</template>
