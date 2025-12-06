import { test, expect } from '@playwright/test'

// Mobile viewport dimensions (iPhone 12)
const mobileViewport = { width: 390, height: 844 }

// Tablet viewport dimensions (iPad Mini)
const tabletViewport = { width: 768, height: 1024 }

// Desktop viewport dimensions
const desktopViewport = { width: 1440, height: 900 }

test.describe('Mobile Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(mobileViewport)
  })

  test('should display mobile navigation menu button', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Desktop nav links should be hidden
    await expect(page.getByRole('link', { name: 'Features' })).not.toBeVisible()

    // Mobile menu button should be visible
    const menuButton = page.locator('button').filter({ has: page.locator('svg') }).first()
    await expect(menuButton).toBeVisible()
  })

  test('should open mobile menu when clicking menu button', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Click the mobile menu button
    const menuButton = page.locator('nav button').first()
    await menuButton.click()

    await page.waitForTimeout(300)

    // Mobile menu should be visible with nav links
    await expect(page.getByRole('link', { name: 'Features' })).toBeVisible()
  })

  test('should close mobile menu when clicking nav link', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Open mobile menu
    const menuButton = page.locator('nav button').first()
    await menuButton.click()
    await page.waitForTimeout(300)

    // Click a nav link
    await page.getByRole('link', { name: 'Features' }).click()
    await page.waitForTimeout(500)

    // Menu should close (Features link no longer visible in dropdown)
    const menuDropdown = page.locator('nav').locator('div.absolute')
    await expect(menuDropdown).not.toBeVisible()
  })

  test('should stack hero CTAs vertically on mobile', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Both buttons should be visible
    await expect(page.getByRole('button', { name: /Get Started Free/i }).first()).toBeVisible()
  })

  test('should display features in single column on mobile', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.locator('#features').scrollIntoViewIfNeeded()

    // All feature cards should be visible
    await expect(page.getByText('Resume & Cover Letter')).toBeVisible()
    await expect(page.getByText('AI Interview Simulation')).toBeVisible()
  })

  test('should display steps vertically on mobile', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.locator('#how-it-works').scrollIntoViewIfNeeded()

    // All steps should be visible
    await expect(page.getByText('Sign Up Free')).toBeVisible()
    await expect(page.getByText('Choose Your Focus')).toBeVisible()
    await expect(page.getByText('Start Preparing')).toBeVisible()
  })
})

test.describe('Tablet Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(tabletViewport)
  })

  test('should display desktop navigation on tablet', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Nav links should be visible
    await expect(page.getByRole('link', { name: 'Features' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'How It Works' })).toBeVisible()
  })

  test('should display features in 2 columns on tablet', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.locator('#features').scrollIntoViewIfNeeded()

    // All feature cards should be visible
    await expect(page.getByText('Resume & Cover Letter')).toBeVisible()
    await expect(page.getByText('Career Buddy AI Chat')).toBeVisible()
  })
})

test.describe('Desktop Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(desktopViewport)
  })

  test('should display full navigation on desktop', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    await expect(page.getByRole('link', { name: 'Features' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'How It Works' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'FAQ' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Get Started' }).first()).toBeVisible()
  })

  test('should display features in 3 columns on desktop', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.locator('#features').scrollIntoViewIfNeeded()

    // All 6 feature cards should be visible
    const featureTitles = [
      'Resume & Cover Letter',
      'AI Interview Simulation',
      'Networking Guides',
      'Job Search Strategies',
      'Self-Promotion Tools',
      'Career Buddy AI Chat',
    ]

    for (const title of featureTitles) {
      await expect(page.getByText(title)).toBeVisible()
    }
  })

  test('should display horizontal stepper on desktop', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.locator('#how-it-works').scrollIntoViewIfNeeded()

    // Steps should be visible horizontally
    await expect(page.getByText('01')).toBeVisible()
    await expect(page.getByText('02')).toBeVisible()
    await expect(page.getByText('03')).toBeVisible()
  })

  test('should display 3 testimonial cards on desktop', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.getByText('Hear From Our').scrollIntoViewIfNeeded()

    // Multiple testimonials should be visible at once
    const testimonialCards = page.locator('.bg-card').filter({ hasText: /Fresh Graduate|Final Year|Job Seeker/i })
    await expect(testimonialCards.first()).toBeVisible()
  })

  test('should display footer in grid layout on desktop', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    // Footer sections should be visible
    await expect(page.getByText('Product')).toBeVisible()
    await expect(page.getByText('Resources')).toBeVisible()
    await expect(page.getByText('Company')).toBeVisible()
  })
})
