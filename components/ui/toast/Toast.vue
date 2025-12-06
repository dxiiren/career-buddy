<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Props {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
  visible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  duration: 3000,
  visible: false,
})

const emit = defineEmits<{
  close: []
}>()

const isVisible = ref(props.visible)

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
}

const colors = {
  success: 'bg-green-500/10 border-green-500/30 text-green-500',
  error: 'bg-destructive/10 border-destructive/30 text-destructive',
  info: 'bg-primary/10 border-primary/30 text-primary',
}

watch(
  () => props.visible,
  (newVal) => {
    isVisible.value = newVal
    if (newVal && props.duration > 0) {
      setTimeout(() => {
        isVisible.value = false
        emit('close')
      }, props.duration)
    }
  }
)

function close() {
  isVisible.value = false
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div
        v-if="isVisible"
        :class="cn(
          'fixed top-4 right-4 z-[100] flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg backdrop-blur-sm',
          colors[type]
        )"
      >
        <component :is="icons[type]" class="h-5 w-5 shrink-0" />
        <span class="text-sm font-medium text-foreground">{{ message }}</span>
        <button
          class="ml-2 h-5 w-5 rounded-full hover:bg-foreground/10 flex items-center justify-center transition-colors"
          @click="close"
        >
          <X class="h-3 w-3" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>
