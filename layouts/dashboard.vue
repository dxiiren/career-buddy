<script setup lang="ts">
import {
  LayoutDashboard,
  FileText,
  Mic,
  Users,
  Target,
  TrendingUp,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Search,
  Sparkles,
  Home,
  Menu,
} from 'lucide-vue-next'
import ThemeToggle from '@/components/shared/ThemeToggle.vue'
import Breadcrumbs from '@/components/shared/Breadcrumbs.vue'

const { user, logout } = useAuth()
const route = useRoute()

const isCollapsed = ref(false)

const navigationItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Resume Builder', icon: FileText, href: '/resume' },
  { name: 'Interview Prep', icon: Mic, href: '/interview' },
  { name: 'Networking', icon: Users, href: '/networking' },
  { name: 'Job Search', icon: Target, href: '/job-search' },
  { name: 'Self-Promotion', icon: TrendingUp, href: '/self-promotion' },
]

const bottomItems = [
  { name: 'Settings', icon: Settings, href: '/settings' },
  { name: 'Help & Support', icon: HelpCircle, href: '/help' },
]

function handleLogout() {
  logout()
  navigateTo('/')
}

function isActive(href: string) {
  return route.path === href
}
</script>

<template>
  <div class="min-h-screen bg-background flex">
    <!-- Sidebar -->
    <aside
      class="fixed left-0 top-0 h-screen bg-card border-r border-border flex flex-col transition-all duration-300 z-40"
      :class="isCollapsed ? 'w-16' : 'w-64'"
    >
      <!-- Logo -->
      <div class="h-16 flex items-center px-4 border-b border-border">
        <div class="flex items-center gap-3">
          <div class="h-9 w-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Sparkles class="h-5 w-5 text-primary-foreground" />
          </div>
          <span
            v-if="!isCollapsed"
            class="text-lg font-heading font-bold whitespace-nowrap"
          >
            Career Buddy
          </span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.href"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200"
          :class="[
            isActive(item.href)
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          ]"
        >
          <component :is="item.icon" class="h-5 w-5 shrink-0" />
          <span v-if="!isCollapsed" class="text-sm font-medium">{{ item.name }}</span>
        </NuxtLink>
      </nav>

      <!-- Bottom Section -->
      <div class="p-3 border-t border-border space-y-1">
        <!-- Back to Home -->
        <NuxtLink
          to="/"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
        >
          <Home class="h-5 w-5 shrink-0" />
          <span v-if="!isCollapsed" class="text-sm font-medium">Back to Home</span>
        </NuxtLink>

        <NuxtLink
          v-for="item in bottomItems"
          :key="item.name"
          :to="item.href"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
        >
          <component :is="item.icon" class="h-5 w-5 shrink-0" />
          <span v-if="!isCollapsed" class="text-sm font-medium">{{ item.name }}</span>
        </NuxtLink>

        <button
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
          @click="handleLogout"
        >
          <LogOut class="h-5 w-5 shrink-0" />
          <span v-if="!isCollapsed" class="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div
      class="flex-1 flex flex-col transition-all duration-300"
      :class="isCollapsed ? 'ml-16' : 'ml-64'"
    >
      <!-- Top Bar -->
      <header class="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
        <!-- Left side: Toggle + Search -->
        <div class="flex items-center gap-4 flex-1 max-w-xl">
          <!-- Sidebar Toggle Button -->
          <button
            class="h-10 w-10 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
            @click="isCollapsed = !isCollapsed"
            :title="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
          >
            <Menu class="h-5 w-5 text-muted-foreground" />
          </button>
          <div class="relative flex-1">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              class="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <!-- Right Side -->
        <div class="flex items-center gap-4">
          <!-- Theme Toggle -->
          <ThemeToggle />

          <!-- Notifications -->
          <button class="relative h-10 w-10 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
            <Bell class="h-5 w-5 text-muted-foreground" />
            <span class="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
          </button>

          <!-- User Menu -->
          <div class="flex items-center gap-3 pl-4 border-l border-border">
            <div class="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              <span class="text-sm font-medium text-primary">
                {{ user?.name?.charAt(0).toUpperCase() || 'U' }}
              </span>
            </div>
            <div class="hidden sm:block">
              <p class="text-sm font-medium">{{ user?.name || 'User' }}</p>
              <p class="text-xs text-muted-foreground">{{ user?.email || '' }}</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6">
        <Breadcrumbs />
        <slot />
      </main>
    </div>
  </div>
</template>
