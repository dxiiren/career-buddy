import { describe, it, expect } from 'vitest'
import { cn } from '../../lib/utils'

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    const result = cn('px-4', 'py-2')
    expect(result).toBe('px-4 py-2')
  })

  it('should handle conflicting Tailwind classes', () => {
    const result = cn('px-4', 'px-6')
    expect(result).toBe('px-6')
  })

  it('should handle conditional classes', () => {
    const isActive = true
    const result = cn('base-class', isActive && 'active-class')
    expect(result).toBe('base-class active-class')
  })

  it('should filter out falsy values', () => {
    const result = cn('base', false, null, undefined, 'valid')
    expect(result).toBe('base valid')
  })

  it('should handle array of classes', () => {
    const result = cn(['class1', 'class2'], 'class3')
    expect(result).toBe('class1 class2 class3')
  })

  it('should handle object syntax', () => {
    const result = cn({ 'active': true, 'disabled': false })
    expect(result).toBe('active')
  })

  it('should merge conflicting Tailwind color classes', () => {
    const result = cn('text-red-500', 'text-blue-500')
    expect(result).toBe('text-blue-500')
  })

  it('should handle empty input', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('should handle complex Tailwind merge scenarios', () => {
    const result = cn(
      'rounded-lg bg-primary p-4',
      'p-6 bg-secondary'
    )
    expect(result).toBe('rounded-lg p-6 bg-secondary')
  })
})
