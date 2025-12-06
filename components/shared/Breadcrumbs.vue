<script setup lang="ts">
import { ChevronRight, Home } from 'lucide-vue-next'

const route = useRoute()

interface BreadcrumbItem {
  label: string
  href: string
  isCurrent: boolean
}

const routeLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  settings: 'Settings',
  networking: 'Networking',
  templates: 'Templates',
  'self-promotion': 'Self-Promotion',
  linkedin: 'LinkedIn',
  workplace: 'Workplace',
  'job-search': 'Job Search',
  platforms: 'Platforms',
  salary: 'Salary',
  scams: 'Scams',
  interview: 'Interview Prep',
  questions: 'Questions',
  simulation: 'Simulation',
  resume: 'Resume Builder',
  'cover-letter': 'Cover Letter',
  ats: 'ATS Optimization',
  chat: 'Career Chat',
  help: 'Help & Support',
  about: 'About Us',
  contact: 'Contact',
  privacy: 'Privacy Policy',
}

// Company pages should link to landing page, dashboard pages should link to dashboard
const companyPages = ['about', 'contact', 'privacy']
const isCompanyPage = computed(() => {
  const firstSegment = route.path.split('/').filter(Boolean)[0]
  return companyPages.includes(firstSegment)
})

const homeLink = computed(() => isCompanyPage.value ? '/' : '/dashboard')
const homeLabel = computed(() => isCompanyPage.value ? 'Home' : 'Dashboard')

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const pathSegments = route.path.split('/').filter(Boolean)

  if (pathSegments.length === 0) {
    return []
  }

  const items: BreadcrumbItem[] = []
  let currentPath = ''

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === pathSegments.length - 1

    items.push({
      label: routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
      href: currentPath,
      isCurrent: isLast,
    })
  })

  return items
})

const showBreadcrumbs = computed(() => {
  // Show breadcrumbs on all pages
  return breadcrumbs.value.length >= 1
})
</script>

<template>
  <nav v-if="showBreadcrumbs" aria-label="Breadcrumb" class="mb-4">
    <ol class="flex items-center gap-2 text-sm">
      <li>
        <NuxtLink
          :to="homeLink"
          class="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Home class="h-4 w-4" />
          <span class="sr-only sm:not-sr-only sm:ml-1">{{ homeLabel }}</span>
        </NuxtLink>
      </li>
      <li v-for="(item, index) in breadcrumbs" :key="item.href" class="flex items-center gap-2">
        <ChevronRight class="h-4 w-4 text-muted-foreground" />
        <NuxtLink
          v-if="!item.isCurrent"
          :to="item.href"
          class="text-muted-foreground hover:text-foreground transition-colors"
        >
          {{ item.label }}
        </NuxtLink>
        <span v-else class="text-foreground font-medium">
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
