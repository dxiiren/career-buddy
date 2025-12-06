<script setup lang="ts">
import { ref } from 'vue'
import { MessageCircle, X, Send, Sparkles } from 'lucide-vue-next'

const isOpen = ref(false)
const message = ref('')

const quickPrompts = [
  'Help me improve my resume',
  'Prepare me for an interview',
  'Write a cover letter',
]

function toggleWidget() {
  isOpen.value = !isOpen.value
}

function sendMessage() {
  if (!message.value.trim()) return
  // For demo, just clear the message
  message.value = ''
}

function selectPrompt(prompt: string) {
  message.value = prompt
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Chat Widget -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-4"
    >
      <div
        v-if="isOpen"
        class="absolute bottom-16 right-0 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
      >
        <!-- Header -->
        <div class="bg-gradient-to-r from-primary to-secondary p-4 text-white">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Sparkles class="h-5 w-5" />
              <span class="font-heading font-semibold">Career Buddy</span>
            </div>
            <button
              class="h-6 w-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              @click="toggleWidget"
            >
              <X class="h-4 w-4" />
            </button>
          </div>
          <p class="text-white/80 text-sm mt-1">Stuck? Ask me anything.</p>
        </div>

        <!-- Quick Prompts -->
        <div class="p-4 border-b border-border">
          <p class="text-xs text-muted-foreground mb-2">Quick prompts:</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="(prompt, index) in quickPrompts"
              :key="index"
              class="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              @click="selectPrompt(prompt)"
            >
              {{ prompt }}
            </button>
          </div>
        </div>

        <!-- Message Input -->
        <div class="p-4">
          <div class="flex gap-2">
            <input
              v-model="message"
              type="text"
              placeholder="Type your message..."
              class="flex-1 h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              @keyup.enter="sendMessage"
            />
            <button
              class="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
              @click="sendMessage"
            >
              <Send class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Toggle Button -->
    <button
      class="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
      :class="{ 'rotate-0': !isOpen, 'rotate-180': isOpen }"
      @click="toggleWidget"
    >
      <MessageCircle v-if="!isOpen" class="h-6 w-6" />
      <X v-else class="h-6 w-6" />
    </button>
  </div>
</template>
