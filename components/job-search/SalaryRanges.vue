<script setup lang="ts">
import { DollarSign } from 'lucide-vue-next'
import type { SalaryRange } from '@/composables/useJobSearch'

interface Props {
  ranges: SalaryRange[]
  loading: boolean
}

defineProps<Props>()

function formatSalary(amount: number): string {
  return new Intl.NumberFormat('ms-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 0,
  }).format(amount)
}
</script>

<template>
  <div class="rounded-2xl bg-card border border-border p-4 sm:p-5 lg:p-6">
    <Transition
      mode="out-in"
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="loading" key="skeleton" class="space-y-4">
        <Skeleton class="h-6 w-48 skeleton-shimmer" />
        <div class="space-y-3">
          <Skeleton v-for="i in 6" :key="i" class="h-16 w-full skeleton-shimmer" />
        </div>
      </div>

      <div v-else key="content">
        <div class="flex items-center gap-2 mb-4">
          <DollarSign class="h-5 w-5 text-primary" />
          <h2 class="text-lg font-heading font-semibold">Entry-Level Salary Ranges</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-border">
                <th class="text-left py-2 font-medium">Role</th>
                <th class="text-left py-2 font-medium">Industry</th>
                <th class="text-right py-2 font-medium">Salary Range</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="range in ranges"
                :key="range.role"
                class="border-b border-border/50"
              >
                <td class="py-3">{{ range.role }}</td>
                <td class="py-3 text-muted-foreground">{{ range.industry }}</td>
                <td class="py-3 text-right text-primary font-medium">
                  {{ formatSalary(range.minSalary) }} - {{ formatSalary(range.maxSalary) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-xs text-muted-foreground mt-4">
          * These are approximate monthly salary ranges for fresh graduates in Malaysia. Actual salaries may vary based on location, company size, and individual qualifications.
        </p>
      </div>
    </Transition>
  </div>
</template>
