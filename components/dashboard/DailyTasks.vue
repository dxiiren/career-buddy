<script setup lang="ts">
import { Check, Plus, Pencil, Trash2, X } from 'lucide-vue-next'

const MAX_TASKS = 5
const STORAGE_KEY = 'careerbuddy_daily_tasks'

interface DailyTask {
  id: string
  text: string
  completed: boolean
}

interface Props {
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const tasks = ref<DailyTask[]>([])
const newTaskText = ref('')
const editingTaskId = ref<string | null>(null)
const editingText = ref('')
const showAddInput = ref(false)
const addInputRef = ref<HTMLInputElement | null>(null)

// Load tasks from sessionStorage on mount
onMounted(() => {
  loadTasks()
})

function loadTasks() {
  if (import.meta.client) {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) {
      tasks.value = JSON.parse(stored)
    } else {
      // Default tasks
      tasks.value = [
        { id: '1', text: 'Complete 1 interview answer', completed: false },
        { id: '2', text: 'Update your LinkedIn headline', completed: false },
        { id: '3', text: 'Apply to 2 suitable jobs', completed: true },
      ]
      saveTasks()
    }
  }
}

function saveTasks() {
  if (import.meta.client) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value))
  }
}

function toggleTask(taskId: string) {
  const task = tasks.value.find((t) => t.id === taskId)
  if (task) {
    task.completed = !task.completed
    saveTasks()
  }
}

function addTask() {
  if (!newTaskText.value.trim() || tasks.value.length >= MAX_TASKS) return

  const newTask: DailyTask = {
    id: Date.now().toString(),
    text: newTaskText.value.trim(),
    completed: false,
  }
  tasks.value.push(newTask)
  newTaskText.value = ''
  showAddInput.value = false
  saveTasks()
}

function startEdit(task: DailyTask) {
  editingTaskId.value = task.id
  editingText.value = task.text
}

function saveEdit() {
  if (!editingText.value.trim() || !editingTaskId.value) return

  const task = tasks.value.find((t) => t.id === editingTaskId.value)
  if (task) {
    task.text = editingText.value.trim()
    saveTasks()
  }
  cancelEdit()
}

function cancelEdit() {
  editingTaskId.value = null
  editingText.value = ''
}

function deleteTask(taskId: string) {
  tasks.value = tasks.value.filter((t) => t.id !== taskId)
  saveTasks()
}

function cancelAdd() {
  showAddInput.value = false
  newTaskText.value = ''
}

function openAddInput() {
  showAddInput.value = true
  nextTick(() => {
    addInputRef.value?.focus()
  })
}

function clearAllTasks() {
  tasks.value = []
  saveTasks()
}

const canAddMore = computed(() => tasks.value.length < MAX_TASKS)
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-4 sm:p-5 lg:p-6 h-full">
    <!-- Title -->
    <Skeleton v-if="loading" class="h-5 sm:h-6 w-24 sm:w-28 mb-3 sm:mb-4" />
    <div v-else class="flex items-center justify-between mb-3 sm:mb-4">
      <h2 class="text-base sm:text-lg font-heading font-semibold">Daily Tasks</h2>
      <div class="flex items-center gap-2 sm:gap-3">
        <button
          v-if="tasks.length > 0"
          class="text-xs text-muted-foreground hover:text-destructive transition-colors"
          @click="clearAllTasks"
        >
          Clear all
        </button>
        <span class="text-xs text-muted-foreground">{{ tasks.length }}/{{ MAX_TASKS }}</span>
      </div>
    </div>

    <!-- Skeleton Loading -->
    <div v-if="loading" class="space-y-3">
      <div v-for="i in 3" :key="i" class="flex items-center gap-3">
        <Skeleton class="h-5 w-5 rounded-full" />
        <Skeleton class="h-4 flex-1" />
      </div>
    </div>

    <!-- Task List -->
    <ul v-else class="space-y-2">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="flex items-center gap-3 group py-1"
      >
        <!-- Editing mode -->
        <template v-if="editingTaskId === task.id">
          <input
            v-model="editingText"
            type="text"
            class="flex-1 text-sm bg-muted px-2 py-1 rounded border border-input focus:outline-none focus:ring-2 focus:ring-primary/20"
            @keyup.enter="saveEdit"
            @keyup.escape="cancelEdit"
          />
          <button
            class="h-6 w-6 rounded flex items-center justify-center text-green-500 hover:bg-green-500/10"
            @click="saveEdit"
          >
            <Check class="h-3.5 w-3.5" />
          </button>
          <button
            class="h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:bg-muted"
            @click="cancelEdit"
          >
            <X class="h-3.5 w-3.5" />
          </button>
        </template>

        <!-- Normal mode -->
        <template v-else>
          <button
            class="h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 shrink-0"
            :class="task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-muted-foreground hover:border-primary'"
            @click="toggleTask(task.id)"
          >
            <Check v-if="task.completed" class="h-3 w-3" />
          </button>
          <span
            class="flex-1 text-sm transition-all duration-200 cursor-pointer"
            :class="task.completed ? 'text-muted-foreground line-through' : ''"
            @click="toggleTask(task.id)"
          >
            {{ task.text }}
          </span>
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              class="h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted"
              @click="startEdit(task)"
            >
              <Pencil class="h-3 w-3" />
            </button>
            <button
              class="h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              @click="deleteTask(task.id)"
            >
              <Trash2 class="h-3 w-3" />
            </button>
          </div>
        </template>
      </li>
    </ul>

    <!-- Add Task Input -->
    <div v-if="showAddInput && !loading" class="mt-3 flex items-center gap-2">
      <input
        ref="addInputRef"
        v-model="newTaskText"
        type="text"
        placeholder="New task..."
        class="flex-1 text-sm bg-muted px-3 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary/20"
        @keyup.enter="addTask"
        @keyup.escape="cancelAdd"
      />
      <button
        class="h-8 w-8 rounded-lg flex items-center justify-center text-green-500 hover:bg-green-500/10"
        :disabled="!newTaskText.trim()"
        @click="addTask"
      >
        <Check class="h-4 w-4" />
      </button>
      <button
        class="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted"
        @click="cancelAdd"
      >
        <X class="h-4 w-4" />
      </button>
    </div>

    <!-- Add Task Button -->
    <button
      v-if="canAddMore && !showAddInput && !loading"
      class="mt-3 w-full flex items-center justify-center gap-2 py-2.5 sm:py-2 text-sm text-muted-foreground hover:text-primary border border-dashed border-border rounded-lg hover:border-primary transition-colors"
      @click="openAddInput"
    >
      <Plus class="h-4 w-4" />
      Add task
    </button>

    <!-- Max tasks message -->
    <p v-if="!canAddMore && !loading" class="mt-3 text-xs text-muted-foreground text-center">
      Maximum {{ MAX_TASKS }} tasks reached
    </p>
  </div>
</template>
