<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

definePageMeta({
  layout: 'dashboard',
})

const { isAuthenticated, initAuth } = useAuth()
const { trackPageVisit } = useRecentActivity()

const animatedCards = ref<Set<number>>(new Set())

const showCard = (index: number) => {
  return animatedCards.value.has(index)
}

const arReasons = [
  'Helps employers quickly understand personality and communication',
  'Reduces reliance on text-only resumes',
  'Matches Gen Z preference for video-based self-presentation',
]

const exportActions = ['Download PNG', 'Download PDF']

onMounted(() => {
  initAuth()
  if (!isAuthenticated.value) {
    navigateTo('/login')
    return
  }

  trackPageVisit('/self-promotion')

  for (let i = 0; i < 2; i++) {
    setTimeout(() => animatedCards.value.add(i), i * 100)
  }
})
</script>

<template>
  <div class="space-y-6">
    <div
      class="transition-all duration-500"
      :class="showCard(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    >
      <div class="rounded-2xl bg-card border border-border p-4 sm:p-5 lg:p-6">
        <h1 class="text-xl sm:text-2xl lg:text-3xl font-heading font-bold mb-1 sm:mb-2">
          AR Video Resume
        </h1>
        <p class="text-sm sm:text-base text-muted-foreground">
          Create a scannable video resume to share with employers.
        </p>
      </div>
    </div>

    <div
      class="space-y-6 transition-all duration-500"
      :class="showCard(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    >
      <div class="rounded-2xl bg-card border border-border p-4 sm:p-5 lg:p-6">
        <h2 class="text-base sm:text-lg font-heading font-semibold">Why AR Video Resume?</h2>
        <ul class="mt-3 space-y-2 text-xs sm:text-sm text-muted-foreground list-disc list-inside">
          <li v-for="reason in arReasons" :key="reason">
            {{ reason }}
          </li>
        </ul>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="rounded-2xl bg-card border border-border p-4 sm:p-5 lg:p-6 space-y-6 flex flex-col">
          <div class="space-y-3">
            <h2 class="text-base sm:text-lg font-heading font-semibold">Step 1: Add your video</h2>
            <div class="rounded-xl border border-dashed border-border bg-muted/40 p-4">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p class="text-sm font-medium text-foreground">Upload Video Resume</p>
                  <p class="text-xs text-muted-foreground">MP4, MOV, or WebM up to 2 minutes</p>
                </div>
                <div class="w-full sm:w-56">
                  <Input type="file" accept="video/*" class="cursor-pointer text-center" />
                </div>
              </div>
            </div>
          </div>

          <div class="pt-2 space-y-3">
            <h2 class="text-base sm:text-lg font-heading font-semibold">Step 2: Preview</h2>
            <div class="rounded-xl border border-border bg-muted/30 p-4">
              <div class="aspect-video rounded-lg border border-border/60 bg-muted/40 overflow-hidden">
                <img
                  src="/images/examples/avatar-placeholder.png"
                  alt="AR video resume preview"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
            <p class="text-xs text-muted-foreground italic">
              This AR QR can be placed on your resume or portfolio. Employers scan it to view your video introduction.
            </p>
          </div>
        </div>

        <div class="rounded-2xl bg-card border border-border p-4 sm:p-5 lg:p-6 space-y-4 flex flex-col">
          <h2 class="text-base sm:text-lg font-heading font-semibold">Step 3: Export</h2>
          <div class="flex-1 flex flex-col justify-center">
            <div class="rounded-xl border border-border bg-muted/30 p-5">
              <div class="mx-auto w-40 h-40 rounded-lg border border-border/60 bg-white overflow-hidden">
                <img
                  src="/images/examples/qr-code-sample.png"
                  alt="AR video resume QR"
                  class="h-full w-full object-contain"
                />
              </div>
              <p class="mt-3 text-xs text-center text-muted-foreground">Scan to view video resume</p>
            </div>
          </div>
          <div class="space-y-3 mt-auto">
            <Button
              v-for="action in exportActions"
              :key="action"
              variant="outline"
              class="w-full"
            >
              {{ action }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
