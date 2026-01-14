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
  Menu,
  X,
  ChevronDown,
} from 'lucide-vue-next'
import ThemeToggle from '@/components/shared/ThemeToggle.vue'
import Breadcrumbs from '@/components/shared/Breadcrumbs.vue'

const { user, logout } = useAuth()
const route = useRoute()

const isCollapsed = ref(false)
const isMobileMenuOpen = ref(false)
const isSearchOpen = ref(false)
const expandedMenus = ref<Set<string>>(new Set())

const navigationItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  {
    name: 'Resume Builder',
    icon: FileText,
    href: '/resume',
    children: [
      { name: 'Tips', href: '/resume' },
      { name: 'Templates', href: '/resume/templates' },
      { name: 'Cover Letters', href: '/resume/cover-letter' },
    ]
  },
  {
    name: 'Interview Prep',
    icon: Mic,
    href: '/interview',
    children: [
      { name: 'Tips', href: '/interview' },
      { name: 'Questions', href: '/interview/questions' },
      { name: 'Simulation', href: '/interview/simulation' },
    ]
  },
  {
    name: 'Networking',
    icon: Users,
    href: '/networking',
    children: [
      { name: 'Tips', href: '/networking' },
      { name: 'Templates', href: '/networking/templates' },
    ]
  },
  {
    name: 'Job Search',
    icon: Target,
    href: '/job-search',
    children: [
      { name: 'Tips', href: '/job-search' },
      { name: 'Salary Guide', href: '/job-search/salary' },
      { name: 'Scam Awareness', href: '/job-search/scams' },
    ]
  },
  {
    name: 'Self-Promotion',
    icon: TrendingUp,
    href: '/self-promotion',
    children: [
      { name: 'AR Resume', href: '/self-promotion' },
      { name: 'LinkedIn Optimization', href: '/self-promotion/linkedin' },
      { name: 'Job Expectations', href: '/self-promotion/workplace' },
    ]
  },
]

const bottomItems = [
  { name: 'Settings', icon: Settings, href: '/settings' },
  { name: 'Help & Support', icon: HelpCircle, href: '/help' },
]

function toggleMenu(href: string) {
  if (expandedMenus.value.has(href)) {
    expandedMenus.value.delete(href)
  } else {
    expandedMenus.value.add(href)
  }
}

function isMenuExpanded(href: string) {
  return expandedMenus.value.has(href)
}

function handleLogout() {
  logout()
  navigateTo('/')
}

function isActive(href: string) {
  // Exact match for dashboard, startsWith for other pages
  if (href === '/dashboard') {
    return route.path === '/dashboard'
  }
  return route.path === href || route.path.startsWith(href + '/')
}

// Close mobile menu when route changes
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})

// Auto-expand menu if on a subpage
watch(() => route.path, (path) => {
  navigationItems.forEach(item => {
    if (item.children && path.startsWith(item.href + '/')) {
      expandedMenus.value.add(item.href)
    }
  })
}, { immediate: true })
</script>

<template>
  <div class="min-h-screen bg-background flex">
    <!-- Desktop Sidebar - Hidden on mobile -->
    <aside
      class="hidden lg:flex fixed left-0 top-0 h-screen bg-card border-r border-border flex-col transition-all duration-300 z-40"
      :class="isCollapsed ? 'w-16' : 'w-64'"
    >
      <!-- Logo - Clickable to go to landing page -->
      <NuxtLink to="/" class="h-16 flex items-center px-4 border-b border-border hover:bg-muted/50 transition-colors">
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
      </NuxtLink>

      <!-- Navigation -->
      <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
        <template v-for="item in navigationItems" :key="item.name">
          <!-- Item without children -->
          <NuxtLink
            v-if="!item.children"
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

          <!-- Item with children (dropdown) -->
          <div v-else>
            <button
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200"
              :class="[
                isActive(item.href)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              ]"
              @click="toggleMenu(item.href)"
            >
              <component :is="item.icon" class="h-5 w-5 shrink-0" />
              <span v-if="!isCollapsed" class="text-sm font-medium flex-1 text-left">{{ item.name }}</span>
              <ChevronDown
                v-if="!isCollapsed"
                class="h-4 w-4 shrink-0 transition-transform duration-200"
                :class="isMenuExpanded(item.href) ? 'rotate-180' : ''"
              />
            </button>

            <!-- Submenu -->
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-48"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 max-h-48"
              leave-to-class="opacity-0 max-h-0"
            >
              <div
                v-if="isMenuExpanded(item.href) && !isCollapsed"
                class="ml-4 mt-1 space-y-1 overflow-hidden"
              >
                <NuxtLink
                  v-for="child in item.children"
                  :key="child.href"
                  :to="child.href"
                  class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200"
                  :class="[
                    route.path === child.href
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  ]"
                >
                  <span class="w-1.5 h-1.5 rounded-full" :class="route.path === child.href ? 'bg-primary' : 'bg-muted-foreground/50'" />
                  {{ child.name }}
                </NuxtLink>
              </div>
            </Transition>
          </div>
        </template>
      </nav>

      <!-- Bottom Section -->
      <div class="p-3 border-t border-border space-y-1">
        <NuxtLink
          v-for="item in bottomItems"
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

        <button
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
          @click="handleLogout"
        >
          <LogOut class="h-5 w-5 shrink-0" />
          <span v-if="!isCollapsed" class="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </aside>

    <!-- Mobile Drawer Overlay -->
    <Transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 bg-black/50 z-40 lg:hidden"
        @click="isMobileMenuOpen = false"
      />
    </Transition>

    <!-- Mobile Drawer -->
    <Transition name="slide">
      <aside
        v-if="isMobileMenuOpen"
        class="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-50 lg:hidden"
      >
        <!-- Header with close button -->
        <div class="h-16 flex items-center justify-between px-4 border-b border-border">
          <div class="flex items-center gap-3">
            <div class="h-9 w-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <Sparkles class="h-5 w-5 text-primary-foreground" />
            </div>
            <span class="text-lg font-heading font-bold whitespace-nowrap">
              Career Buddy
            </span>
          </div>
          <button
            class="h-10 w-10 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
            @click="isMobileMenuOpen = false"
          >
            <X class="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
          <template v-for="item in navigationItems" :key="item.name">
            <!-- Item without children -->
            <NuxtLink
              v-if="!item.children"
              :to="item.href"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200"
              :class="[
                isActive(item.href)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              ]"
            >
              <component :is="item.icon" class="h-5 w-5 shrink-0" />
              <span class="text-sm font-medium">{{ item.name }}</span>
            </NuxtLink>

            <!-- Item with children (dropdown) -->
            <div v-else>
              <button
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200"
                :class="[
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                ]"
                @click="toggleMenu(item.href)"
              >
                <component :is="item.icon" class="h-5 w-5 shrink-0" />
                <span class="text-sm font-medium flex-1 text-left">{{ item.name }}</span>
                <ChevronDown
                  class="h-4 w-4 shrink-0 transition-transform duration-200"
                  :class="isMenuExpanded(item.href) ? 'rotate-180' : ''"
                />
              </button>

              <!-- Submenu -->
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-48"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100 max-h-48"
                leave-to-class="opacity-0 max-h-0"
              >
                <div
                  v-if="isMenuExpanded(item.href)"
                  class="ml-4 mt-1 space-y-1 overflow-hidden"
                >
                  <NuxtLink
                    v-for="child in item.children"
                    :key="child.href"
                    :to="child.href"
                    class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200"
                    :class="[
                      route.path === child.href
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    ]"
                  >
                    <span class="w-1.5 h-1.5 rounded-full" :class="route.path === child.href ? 'bg-primary' : 'bg-muted-foreground/50'" />
                    {{ child.name }}
                  </NuxtLink>
                </div>
              </Transition>
            </div>
          </template>
        </nav>

        <!-- Bottom Section -->
        <div class="p-3 border-t border-border space-y-1">
          <NuxtLink
            v-for="item in bottomItems"
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
            <span class="text-sm font-medium">{{ item.name }}</span>
          </NuxtLink>

          <button
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
            @click="handleLogout"
          >
            <LogOut class="h-5 w-5 shrink-0" />
            <span class="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>
    </Transition>

    <!-- Main Content Area -->
    <div
      class="flex-1 flex flex-col transition-all duration-300 ml-0 min-w-0 overflow-x-hidden"
      :class="isCollapsed ? 'lg:ml-16' : 'lg:ml-64'"
    >
      <!-- Top Bar -->
      <header class="h-16 bg-card border-b border-border flex items-center justify-between px-4 sm:px-5 lg:px-6 sticky top-0 z-30">
        <!-- Left side -->
        <div class="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl">
          <!-- Mobile Hamburger Menu -->
          <button
            class="lg:hidden h-10 w-10 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
            @click="isMobileMenuOpen = true"
          >
            <Menu class="h-5 w-5 text-muted-foreground" />
          </button>

          <!-- Mobile Logo -->
          <NuxtLink to="/" class="lg:hidden flex items-center gap-2">
            <div class="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles class="h-4 w-4 text-primary-foreground" />
            </div>
            <span class="text-base font-heading font-bold hidden sm:block">Career Buddy</span>
          </NuxtLink>

          <!-- Desktop Sidebar Toggle Button -->
          <button
            class="hidden lg:flex h-10 w-10 rounded-lg hover:bg-muted items-center justify-center transition-colors"
            @click="isCollapsed = !isCollapsed"
            :title="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
          >
            <Menu class="h-5 w-5 text-muted-foreground" />
          </button>

          <!-- Desktop Search Bar -->
          <div class="relative flex-1 hidden lg:block">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              class="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <!-- Right Side -->
        <div class="flex items-center gap-2 sm:gap-4">
          <!-- Mobile Search Button -->
          <button
            class="lg:hidden h-10 w-10 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
            @click="isSearchOpen = !isSearchOpen"
          >
            <Search class="h-5 w-5 text-muted-foreground" />
          </button>

          <!-- Theme Toggle -->
          <ThemeToggle />

          <!-- Notifications -->
          <button class="relative h-10 w-10 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
            <Bell class="h-5 w-5 text-muted-foreground" />
            <span class="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
          </button>

          <!-- User Menu -->
          <div class="flex items-center gap-3 pl-2 sm:pl-4 border-l border-border">
            <div class="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              <span class="text-sm font-medium text-primary">
                {{ user?.name?.charAt(0).toUpperCase() || 'U' }}
              </span>
            </div>
            <div class="hidden lg:block">
              <p class="text-sm font-medium">{{ user?.name || 'User' }}</p>
              <p class="text-xs text-muted-foreground">{{ user?.email || '' }}</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Mobile Search Overlay -->
      <Transition name="fade">
        <div
          v-if="isSearchOpen"
          class="lg:hidden fixed inset-0 bg-background z-50 p-4"
        >
          <div class="flex items-center gap-3">
            <div class="relative flex-1">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                class="w-full h-12 pl-10 pr-4 rounded-lg border border-input bg-background text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                autofocus
              />
            </div>
            <button
              class="h-12 w-12 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
              @click="isSearchOpen = false"
            >
              <X class="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </Transition>

      <!-- Page Content -->
      <main class="flex-1 p-4 sm:p-5 lg:p-6">
        <Breadcrumbs />
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
