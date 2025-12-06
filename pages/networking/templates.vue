<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ArrowLeft, MessageSquare } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
})

const { isAuthenticated, initAuth } = useAuth()
const {
  isLoading,
  templates,
  categories,
  currentTone,
  copiedId,
  setTone,
  getTemplatesByCategory,
  copyToClipboard,
  loadNetworking,
} = useNetworking()
const { trackPageVisit } = useRecentActivity()

// Track which cards have animated in
const animatedCards = ref<Set<number>>(new Set())

const showCard = (index: number) => {
  return !isLoading.value && animatedCards.value.has(index)
}

// Toast state
const showToast = ref(false)
const toastMessage = ref('')

function displayToast(message: string) {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 2000)
}

async function handleCopy(templateId: string, content: string) {
  await copyToClipboard(templateId, content)
  displayToast('Template copied to clipboard!')
}

onMounted(async () => {
  initAuth()

  if (!isAuthenticated.value) {
    navigateTo('/login')
    return
  }

  trackPageVisit('/networking/templates')
  await loadNetworking()

  // Stagger card animations
  const cardCount = categories.value.length + 2
  for (let i = 0; i < cardCount; i++) {
    setTimeout(() => {
      animatedCards.value.add(i)
    }, i * 100)
  }
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      class="transition-all duration-500"
      :class="showCard(0) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <div class="flex items-center gap-4 mb-2">
        <NuxtLink to="/networking" class="h-10 w-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors">
          <ArrowLeft class="h-5 w-5" />
        </NuxtLink>
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare class="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 class="text-2xl font-heading font-bold">Message Templates</h1>
            <p class="text-muted-foreground">Copy, customize, and send professional messages</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tone Selector -->
    <div
      class="transition-all duration-500"
      :class="showCard(1) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <NetworkingToneSelector
        :current-tone="currentTone"
        :loading="isLoading"
        @change="setTone"
      />
    </div>

    <!-- Template Categories -->
    <div
      v-for="(category, index) in categories"
      :key="category.id"
      class="transition-all duration-500"
      :class="showCard(index + 2) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <NetworkingTemplateCategory
        :category="category"
        :loading="isLoading"
      >
        <div class="space-y-4">
          <NetworkingMessageTemplate
            v-for="template in getTemplatesByCategory(category.id)"
            :key="template.id"
            :template="template"
            :current-tone="currentTone"
            :copied-id="copiedId"
            :loading="isLoading"
            @copy="handleCopy"
          />
        </div>
      </NetworkingTemplateCategory>
    </div>

    <!-- Toast Notification -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div
        v-if="showToast"
        class="fixed bottom-6 right-6 z-50"
      >
        <div class="px-4 py-3 rounded-lg shadow-lg bg-green-500 text-white">
          {{ toastMessage }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.transition-all {
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
