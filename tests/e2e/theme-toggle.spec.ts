import { test, expect } from '@playwright/test'

test.describe('Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.evaluate(() => localStorage.clear())
    await page.reload({ waitUntil: 'networkidle' })
  })

  test('should display theme toggle button in navbar', async ({ page }) => {
    // Find the theme toggle button by its sr-only text
    const themeToggle = page.getByRole('button', { name: 'Toggle theme' })
    await expect(themeToggle.first()).toBeVisible()
  })

  test('should start in dark mode by default', async ({ page }) => {
    // Check that html element does NOT have 'light' class (meaning dark mode)
    const html = page.locator('html')
    await expect(html).not.toHaveClass(/light/)
  })

  test('should toggle to light mode when clicked', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: 'Toggle theme' }).first()

    await themeToggle.click()
    await page.waitForTimeout(100)

    // Check that html element has 'light' class
    const html = page.locator('html')
    await expect(html).toHaveClass(/light/)
  })

  test('should toggle back to dark mode on second click', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: 'Toggle theme' }).first()

    // Toggle to light
    await themeToggle.click()
    await page.waitForTimeout(100)

    // Toggle back to dark
    await themeToggle.click()
    await page.waitForTimeout(100)

    // Check that html element does NOT have 'light' class
    const html = page.locator('html')
    await expect(html).not.toHaveClass(/light/)
  })

  test('should display Sun icon in dark mode', async ({ page }) => {
    // In dark mode, Sun icon should be visible (to switch to light)
    const themeToggle = page.getByRole('button', { name: 'Toggle theme' }).first()

    // The button should contain an SVG (the Sun icon)
    const svg = themeToggle.locator('svg')
    await expect(svg).toBeVisible()
  })

  test('should display Moon icon in light mode', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: 'Toggle theme' }).first()

    // Toggle to light mode
    await themeToggle.click()
    await page.waitForTimeout(100)

    // The button should contain an SVG (the Moon icon)
    const svg = themeToggle.locator('svg')
    await expect(svg).toBeVisible()
  })
})

test.describe('Theme Persistence', () => {
  test('should persist light mode preference after page reload', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const themeToggle = page.getByRole('button', { name: 'Toggle theme' }).first()

    // Toggle to light mode
    await themeToggle.click()
    await page.waitForTimeout(100)

    // Verify light mode is active
    const htmlBefore = page.locator('html')
    await expect(htmlBefore).toHaveClass(/light/)

    // Reload the page
    await page.reload({ waitUntil: 'networkidle' })

    // Wait for theme initialization
    await page.waitForTimeout(200)

    // Check that light mode is still active after reload
    const htmlAfter = page.locator('html')
    await expect(htmlAfter).toHaveClass(/light/)
  })

  test('should persist dark mode preference after page reload', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const themeToggle = page.getByRole('button', { name: 'Toggle theme' }).first()

    // Toggle to light mode first
    await themeToggle.click()
    await page.waitForTimeout(100)

    // Then toggle back to dark mode
    await themeToggle.click()
    await page.waitForTimeout(100)

    // Verify dark mode is active
    const htmlBefore = page.locator('html')
    await expect(htmlBefore).not.toHaveClass(/light/)

    // Reload the page
    await page.reload({ waitUntil: 'networkidle' })
    await page.waitForTimeout(200)

    // Check that dark mode is still active
    const htmlAfter = page.locator('html')
    await expect(htmlAfter).not.toHaveClass(/light/)
  })

  test('should save preference to localStorage', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const themeToggle = page.getByRole('button', { name: 'Toggle theme' }).first()

    // Toggle to light mode
    await themeToggle.click()
    await page.waitForTimeout(100)

    // Check localStorage
    const colorMode = await page.evaluate(() => localStorage.getItem('color-mode'))
    expect(colorMode).toBe('light')
  })

  test('should read preference from localStorage on page load', async ({ page }) => {
    // Set localStorage before navigating
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.evaluate(() => localStorage.setItem('color-mode', 'light'))

    // Reload to trigger initTheme
    await page.reload({ waitUntil: 'networkidle' })
    await page.waitForTimeout(200)

    // Check that light mode is active
    const html = page.locator('html')
    await expect(html).toHaveClass(/light/)
  })
})

test.describe('Theme Visual Changes', () => {
  test('should change background color when toggling theme', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Get initial background color (dark mode)
    const darkBgColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor
    })

    // Toggle to light mode
    const themeToggle = page.getByRole('button', { name: 'Toggle theme' }).first()
    await themeToggle.click()
    await page.waitForTimeout(200)

    // Get new background color (light mode)
    const lightBgColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor
    })

    // Colors should be different
    expect(darkBgColor).not.toBe(lightBgColor)
  })

  test('should change text color when toggling theme', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Get initial text color (dark mode)
    const darkTextColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).color
    })

    // Toggle to light mode
    const themeToggle = page.getByRole('button', { name: 'Toggle theme' }).first()
    await themeToggle.click()
    await page.waitForTimeout(200)

    // Get new text color (light mode)
    const lightTextColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).color
    })

    // Colors should be different
    expect(darkTextColor).not.toBe(lightTextColor)
  })
})

test.describe('Theme Toggle in Mobile Menu', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('should display theme toggle in mobile menu', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Open mobile menu
    const menuButton = page.locator('button.md\\:hidden').first()
    await menuButton.click()
    await page.waitForTimeout(300)

    // Check for theme toggle in mobile menu
    await expect(page.getByText('Theme')).toBeVisible()
  })

  test('should toggle theme from mobile menu', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Open mobile menu
    const menuButton = page.locator('button.md\\:hidden').first()
    await menuButton.click()
    await page.waitForTimeout(300)

    // Find and click theme toggle in mobile menu
    const mobileThemeToggle = page.getByRole('button', { name: 'Toggle theme' }).last()
    await mobileThemeToggle.click()
    await page.waitForTimeout(100)

    // Check that light mode is active
    const html = page.locator('html')
    await expect(html).toHaveClass(/light/)
  })
})

test.describe('Theme System Preference', () => {
  test('should respect system preference when no saved preference exists', async ({
    page,
    context,
  }) => {
    // Clear any saved preference
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.evaluate(() => localStorage.clear())

    // Emulate light color scheme preference
    await page.emulateMedia({ colorScheme: 'light' })

    // Reload to trigger initTheme with system preference
    await page.reload({ waitUntil: 'networkidle' })
    await page.waitForTimeout(200)

    // Should be in light mode based on system preference
    const html = page.locator('html')
    await expect(html).toHaveClass(/light/)
  })

  test('should use saved preference over system preference', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Set dark mode in localStorage
    await page.evaluate(() => localStorage.setItem('color-mode', 'dark'))

    // Emulate light color scheme preference
    await page.emulateMedia({ colorScheme: 'light' })

    // Reload to trigger initTheme
    await page.reload({ waitUntil: 'networkidle' })
    await page.waitForTimeout(200)

    // Should be in dark mode based on saved preference (not system)
    const html = page.locator('html')
    await expect(html).not.toHaveClass(/light/)
  })
})

test.describe('Theme Accessibility', () => {
  test('theme toggle should be keyboard accessible', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Tab to the theme toggle button
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab') // Navigate to theme toggle area

    // Find and focus the theme toggle
    const themeToggle = page.getByRole('button', { name: 'Toggle theme' }).first()
    await themeToggle.focus()

    // Press Enter to toggle
    await page.keyboard.press('Enter')
    await page.waitForTimeout(100)

    // Check that theme was toggled
    const html = page.locator('html')
    await expect(html).toHaveClass(/light/)
  })

  test('theme toggle should have accessible name', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const themeToggle = page.getByRole('button', { name: 'Toggle theme' }).first()
    await expect(themeToggle).toBeVisible()

    // The button should have an accessible name
    const accessibleName = await themeToggle.getAttribute('aria-label')
    const srOnlyText = await themeToggle.locator('.sr-only').textContent()

    // Either aria-label or sr-only text should provide the accessible name
    expect(accessibleName || srOnlyText).toBeTruthy()
  })
})
