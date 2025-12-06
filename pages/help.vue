<script setup lang="ts">
import { onMounted, ref } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

const { isAuthenticated, initAuth } = useAuth()
const {
  isLoading,
  isSubmitting,
  faqCategories,
  helpResources,
  filteredFAQs,
  searchQuery,
  selectedCategory,
  contactErrors,
  loadHelp,
  searchFAQ,
  filterByCategory,
  submitContactForm,
} = useHelp()
const { trackPageVisit } = useRecentActivity()

// Track which cards have animated in
const animatedCards = ref<Set<number>>(new Set())

const showCard = (index: number) => {
  return !isLoading.value && animatedCards.value.has(index)
}

// Toast state
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')

function displayToast(message: string, type: 'success' | 'error') {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

async function handleContactSubmit(form: Parameters<typeof submitContactForm>[0]) {
  const result = await submitContactForm(form)
  if (result.success) {
    displayToast('Message sent successfully! We\'ll get back to you soon.', 'success')
  } else {
    displayToast('Please fix the errors above.', 'error')
  }
}

onMounted(async () => {
  initAuth()

  if (!isAuthenticated.value) {
    navigateTo('/login')
    return
  }

  trackPageVisit('/help')
  await loadHelp()

  // Stagger card animations
  const cardCount = 6
  for (let i = 0; i < cardCount; i++) {
    setTimeout(() => {
      animatedCards.value.add(i)
    }, i * 100)
  }
})
</script>

<template>
  <div class="space-y-6">
    <!-- Hero -->
    <div
      class="transition-all duration-500"
      :class="showCard(0) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <HelpHelpHero :loading="isLoading" />
    </div>

    <!-- Search Bar -->
    <div
      class="transition-all duration-500"
      :class="showCard(1) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <HelpFAQSearchBar
        :loading="isLoading"
        :model-value="searchQuery"
        @update:model-value="searchFAQ"
      />
    </div>

    <!-- Category Filter -->
    <div
      class="transition-all duration-500"
      :class="showCard(2) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <HelpFAQCategoryFilter
        :categories="faqCategories"
        :selected-category="selectedCategory"
        :loading="isLoading"
        @select="filterByCategory"
      />
    </div>

    <!-- FAQ Accordion -->
    <div
      class="transition-all duration-500"
      :class="showCard(3) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <HelpFAQAccordion
        :items="filteredFAQs"
        :loading="isLoading"
      />
    </div>

    <!-- Help Resources -->
    <div
      class="transition-all duration-500"
      :class="showCard(4) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <HelpHelpResources
        :resources="helpResources"
        :loading="isLoading"
      />
    </div>

    <!-- Contact Form -->
    <div
      class="transition-all duration-500"
      :class="showCard(5) ? 'opacity-100 translate-y-0' : (isLoading ? 'opacity-100' : 'opacity-0 translate-y-4')"
    >
      <HelpContactForm
        :loading="isLoading"
        :submitting="isSubmitting"
        :errors="contactErrors"
        @submit="handleContactSubmit"
      />
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
        <div
          class="px-4 py-3 rounded-lg shadow-lg"
          :class="toastType === 'success' ? 'bg-green-500 text-white' : 'bg-destructive text-destructive-foreground'"
        >
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
