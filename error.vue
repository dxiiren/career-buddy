<script setup lang="ts">
import { Sparkles, Home, RefreshCw, Gamepad2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
  }
}>()

const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})

// Snake Game Logic
const GRID_SIZE = 20
const CELL_SIZE = 15

// Speed settings: lower = faster
const SPEED_SLOW = 150
const SPEED_NORMAL = 100
const SPEED_FAST = 60
const SPEED_INSANE = 30

const gameCanvas = ref<HTMLCanvasElement | null>(null)
const gameStarted = ref(false)
const gameOver = ref(false)
const score = ref(0)
const highScore = ref(0)
const gameSpeed = ref(SPEED_NORMAL)
const speedLabel = computed(() => {
  switch (gameSpeed.value) {
    case SPEED_SLOW: return 'Slow'
    case SPEED_NORMAL: return 'Normal'
    case SPEED_FAST: return 'Fast'
    case SPEED_INSANE: return 'Insane'
    default: return 'Normal'
  }
})

interface Position {
  x: number
  y: number
}

let snake: Position[] = []
let food: Position = { x: 0, y: 0 }
let direction: Position = { x: 1, y: 0 }
let nextDirection: Position = { x: 1, y: 0 }
let gameLoop: ReturnType<typeof setInterval> | null = null

function initGame() {
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]
  direction = { x: 1, y: 0 }
  nextDirection = { x: 1, y: 0 }
  score.value = 0
  gameOver.value = false
  placeFood()
}

function placeFood() {
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
  } while (snake.some((segment) => segment.x === food.x && segment.y === food.y))
}

function startGame() {
  if (gameLoop) clearInterval(gameLoop)
  initGame()
  gameStarted.value = true
  gameLoop = setInterval(gameStep, gameSpeed.value)
}

function setSpeed(speed: number) {
  gameSpeed.value = speed
  // If game is running, restart the loop with new speed
  if (gameStarted.value && !gameOver.value && gameLoop) {
    clearInterval(gameLoop)
    gameLoop = setInterval(gameStep, gameSpeed.value)
  }
}

function gameStep() {
  if (gameOver.value) return

  direction = nextDirection

  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y }

  // Check wall collision
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    endGame()
    return
  }

  // Check self collision
  if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
    endGame()
    return
  }

  snake.unshift(head)

  // Check food collision
  if (head.x === food.x && head.y === food.y) {
    score.value += 10
    placeFood()
  } else {
    snake.pop()
  }

  draw()
}

function endGame() {
  gameOver.value = true
  if (gameLoop) clearInterval(gameLoop)
  if (score.value > highScore.value) {
    highScore.value = score.value
  }
  draw()
}

// Helper to get computed CSS variable value
function getCssVar(varName: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
  return value || fallback
}

function draw() {
  const canvas = gameCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Get theme colors from CSS variables
  const mutedColor = getCssVar('--muted', '240 4.8% 95.9%')
  const borderColor = getCssVar('--border', '240 5.9% 90%')
  const primaryColor = getCssVar('--primary', '142 76% 36%')
  const bgColor = getCssVar('--background', '0 0% 100%')
  const fgColor = getCssVar('--foreground', '240 10% 3.9%')

  // Clear canvas
  ctx.fillStyle = `hsl(${mutedColor})`
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Draw grid lines
  ctx.strokeStyle = `hsl(${borderColor})`
  ctx.lineWidth = 0.5
  for (let i = 0; i <= GRID_SIZE; i++) {
    ctx.beginPath()
    ctx.moveTo(i * CELL_SIZE, 0)
    ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, i * CELL_SIZE)
    ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE)
    ctx.stroke()
  }

  // Draw snake
  snake.forEach((segment, index) => {
    if (index === 0) {
      // Head
      ctx.fillStyle = `hsl(${primaryColor})`
    } else {
      // Body - gradient effect
      const opacity = 1 - (index / snake.length) * 0.5
      ctx.fillStyle = `hsl(${primaryColor} / ${opacity})`
    }
    ctx.beginPath()
    ctx.roundRect(
      segment.x * CELL_SIZE + 1,
      segment.y * CELL_SIZE + 1,
      CELL_SIZE - 2,
      CELL_SIZE - 2,
      3
    )
    ctx.fill()
  })

  // Draw food
  ctx.fillStyle = 'hsl(142 76% 36%)' // green-500
  ctx.beginPath()
  ctx.arc(
    food.x * CELL_SIZE + CELL_SIZE / 2,
    food.y * CELL_SIZE + CELL_SIZE / 2,
    CELL_SIZE / 2 - 2,
    0,
    Math.PI * 2
  )
  ctx.fill()

  // Game over overlay
  if (gameOver.value) {
    ctx.fillStyle = `hsl(${bgColor} / 0.8)`
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = `hsl(${fgColor})`
    ctx.font = 'bold 16px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 10)
    ctx.font = '12px sans-serif'
    ctx.fillText('Press Space to restart', canvas.width / 2, canvas.height / 2 + 15)
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.code === 'Space') {
    e.preventDefault()
    if (!gameStarted.value || gameOver.value) {
      startGame()
    }
    return
  }

  if (!gameStarted.value || gameOver.value) return

  switch (e.code) {
    case 'ArrowUp':
    case 'KeyW':
      if (direction.y !== 1) nextDirection = { x: 0, y: -1 }
      break
    case 'ArrowDown':
    case 'KeyS':
      if (direction.y !== -1) nextDirection = { x: 0, y: 1 }
      break
    case 'ArrowLeft':
    case 'KeyA':
      if (direction.x !== 1) nextDirection = { x: -1, y: 0 }
      break
    case 'ArrowRight':
    case 'KeyD':
      if (direction.x !== -1) nextDirection = { x: 1, y: 0 }
      break
  }
}

// Mobile D-pad controls
function moveUp() {
  if (!gameStarted.value || gameOver.value) {
    startGame()
    return
  }
  if (direction.y !== 1) nextDirection = { x: 0, y: -1 }
}

function moveDown() {
  if (!gameStarted.value || gameOver.value) {
    startGame()
    return
  }
  if (direction.y !== -1) nextDirection = { x: 0, y: 1 }
}

function moveLeft() {
  if (!gameStarted.value || gameOver.value) {
    startGame()
    return
  }
  if (direction.x !== 1) nextDirection = { x: -1, y: 0 }
}

function moveRight() {
  if (!gameStarted.value || gameOver.value) {
    startGame()
    return
  }
  if (direction.x !== -1) nextDirection = { x: 1, y: 0 }
}

// Touch swipe controls
let touchStartX = 0
let touchStartY = 0

function handleTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}

function handleTouchEnd(e: TouchEvent) {
  if (!gameStarted.value || gameOver.value) {
    startGame()
    return
  }

  const touchEndX = e.changedTouches[0].clientX
  const touchEndY = e.changedTouches[0].clientY

  const deltaX = touchEndX - touchStartX
  const deltaY = touchEndY - touchStartY

  const minSwipeDistance = 30

  // Determine swipe direction based on which delta is larger
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0 && direction.x !== -1) {
        nextDirection = { x: 1, y: 0 } // Right
      } else if (deltaX < 0 && direction.x !== 1) {
        nextDirection = { x: -1, y: 0 } // Left
      }
    }
  } else {
    // Vertical swipe
    if (Math.abs(deltaY) > minSwipeDistance) {
      if (deltaY > 0 && direction.y !== -1) {
        nextDirection = { x: 0, y: 1 } // Down
      } else if (deltaY < 0 && direction.y !== 1) {
        nextDirection = { x: 0, y: -1 } // Up
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  // Initial draw
  nextTick(() => {
    initGame()
    draw()
  })
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (gameLoop) clearInterval(gameLoop)
})

function handleError() {
  clearError({ redirect: '/' })
}

function refreshPage() {
  window.location.reload()
}

const errorTitle = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return 'Page Not Found'
    case 500:
      return 'Server Error'
    case 403:
      return 'Access Denied'
    default:
      return 'Oops! Something went wrong'
  }
})

const errorMessage = computed(() => {
  switch (props.error.statusCode) {
    case 404:
      return "The page you're looking for doesn't exist or has been moved."
    case 500:
      return "We're experiencing some technical difficulties. Please try again later."
    case 403:
      return "You don't have permission to access this page."
    default:
      return props.error.message || 'An unexpected error occurred.'
  }
})
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col">
    <!-- Header -->
    <header class="h-16 border-b border-border bg-card">
      <div class="container mx-auto px-4 h-full flex items-center">
        <NuxtLink to="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div class="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles class="h-5 w-5 text-primary-foreground" />
          </div>
          <span class="text-lg font-heading font-bold">Career Buddy</span>
        </NuxtLink>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 flex items-center justify-center p-6">
      <div class="max-w-2xl w-full text-center">
        <!-- Error Code -->
        <div class="mb-6">
          <span class="text-8xl font-bold text-primary/20">{{ error.statusCode }}</span>
        </div>

        <!-- Error Message -->
        <h1 class="text-3xl font-heading font-bold mb-4">{{ errorTitle }}</h1>
        <p class="text-muted-foreground mb-8">{{ errorMessage }}</p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button size="lg" @click="handleError">
            <Home class="h-4 w-4 mr-2" />
            Go Home
          </Button>
          <Button variant="outline" size="lg" @click="refreshPage">
            <RefreshCw class="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>

        <!-- Game Section -->
        <div class="rounded-2xl bg-card border border-border p-6">
          <div class="flex items-center justify-center gap-2 mb-4">
            <Gamepad2 class="h-5 w-5 text-primary" />
            <h2 class="text-lg font-heading font-semibold">While you're here, play a game!</h2>
          </div>

          <p class="text-sm text-muted-foreground mb-4 hidden sm:block">
            Use arrow keys or WASD to move. Press Space to start.
          </p>
          <p class="text-sm text-muted-foreground mb-4 sm:hidden">
            Swipe on canvas or use D-pad to move. Tap to start.
          </p>

          <!-- Score Display -->
          <div class="flex items-center justify-center gap-6 mb-4">
            <div class="text-sm">
              <span class="text-muted-foreground">Score:</span>
              <span class="ml-2 font-bold text-primary">{{ score }}</span>
            </div>
            <div class="text-sm">
              <span class="text-muted-foreground">High Score:</span>
              <span class="ml-2 font-bold text-green-500">{{ highScore }}</span>
            </div>
          </div>

          <!-- Speed Control -->
          <div class="flex items-center justify-center gap-2 mb-4">
            <span class="text-sm text-muted-foreground">Speed:</span>
            <div class="flex gap-1">
              <button
                :class="[
                  'px-3 py-1 text-xs rounded-md transition-colors',
                  gameSpeed === 150 ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                ]"
                @click="setSpeed(150)"
              >
                Slow
              </button>
              <button
                :class="[
                  'px-3 py-1 text-xs rounded-md transition-colors',
                  gameSpeed === 100 ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                ]"
                @click="setSpeed(100)"
              >
                Normal
              </button>
              <button
                :class="[
                  'px-3 py-1 text-xs rounded-md transition-colors',
                  gameSpeed === 60 ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                ]"
                @click="setSpeed(60)"
              >
                Fast
              </button>
              <button
                :class="[
                  'px-3 py-1 text-xs rounded-md transition-colors',
                  gameSpeed === 30 ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                ]"
                @click="setSpeed(30)"
              >
                Insane
              </button>
            </div>
          </div>

          <!-- Game Canvas -->
          <div class="flex justify-center">
            <canvas
              ref="gameCanvas"
              :width="GRID_SIZE * CELL_SIZE"
              :height="GRID_SIZE * CELL_SIZE"
              class="rounded-lg border border-border cursor-pointer touch-none"
              @click="!gameStarted || gameOver ? startGame() : null"
              @touchstart="handleTouchStart"
              @touchend="handleTouchEnd"
            />
          </div>

          <!-- Mobile D-Pad Controls -->
          <div class="mt-4 sm:hidden">
            <div class="flex flex-col items-center gap-1">
              <!-- Up Button -->
              <button
                class="w-14 h-14 rounded-lg bg-muted hover:bg-muted/80 active:bg-primary active:text-primary-foreground flex items-center justify-center transition-colors"
                @click="moveUp"
              >
                <ChevronUp class="h-8 w-8" />
              </button>
              <!-- Left, Center, Right Row -->
              <div class="flex gap-1">
                <button
                  class="w-14 h-14 rounded-lg bg-muted hover:bg-muted/80 active:bg-primary active:text-primary-foreground flex items-center justify-center transition-colors"
                  @click="moveLeft"
                >
                  <ChevronLeft class="h-8 w-8" />
                </button>
                <div class="w-14 h-14 rounded-lg bg-muted/50 flex items-center justify-center">
                  <Gamepad2 class="h-6 w-6 text-muted-foreground" />
                </div>
                <button
                  class="w-14 h-14 rounded-lg bg-muted hover:bg-muted/80 active:bg-primary active:text-primary-foreground flex items-center justify-center transition-colors"
                  @click="moveRight"
                >
                  <ChevronRight class="h-8 w-8" />
                </button>
              </div>
              <!-- Down Button -->
              <button
                class="w-14 h-14 rounded-lg bg-muted hover:bg-muted/80 active:bg-primary active:text-primary-foreground flex items-center justify-center transition-colors"
                @click="moveDown"
              >
                <ChevronDown class="h-8 w-8" />
              </button>
            </div>
          </div>

          <!-- Game Instructions -->
          <div v-if="!gameStarted" class="mt-4 hidden sm:block">
            <Button variant="outline" size="sm" @click="startGame">
              <Gamepad2 class="h-4 w-4 mr-2" />
              Start Game
            </Button>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="py-4 border-t border-border">
      <p class="text-center text-sm text-muted-foreground">
        &copy; {{ new Date().getFullYear() }} Career Buddy. All rights reserved.
      </p>
    </footer>
  </div>
</template>
