import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
  })

  test('should display the page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Career Buddy/)
  })

  test('should display the hero section', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Your Career Journey')
    await expect(page.getByText('Starts Here')).toBeVisible()
  })

  test('should display the navigation bar', async ({ page }) => {
    await expect(page.getByText('Career Buddy').first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Features' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'How It Works' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'FAQ' })).toBeVisible()
  })

  test('should display Get Started button in hero', async ({ page }) => {
    const ctaButton = page.getByRole('button', { name: /Get Started Free/i }).first()
    await expect(ctaButton).toBeVisible()
  })

  test('should display all landing page sections', async ({ page }) => {
    // Hero section
    await expect(page.getByText('Your Career Journey')).toBeVisible()

    // Problem section
    await expect(page.getByText('We Know Job Hunting Feels')).toBeVisible()

    // Features section
    await expect(page.getByText('One Platform,')).toBeVisible()

    // How it works section
    await expect(page.getByText('How Career Buddy')).toBeVisible()

    // Testimonials section
    await expect(page.getByText('Hear From Our')).toBeVisible()

    // FAQ section
    await expect(page.getByText('Frequently Asked')).toBeVisible()

    // CTA footer
    await expect(page.getByText('Ready to Take Control of Your Career?')).toBeVisible()
  })
})

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
  })

  test('should scroll to features section when clicking Features link', async ({ page }) => {
    await page.getByRole('link', { name: 'Features' }).click()

    // Wait for scroll animation
    await page.waitForTimeout(500)

    // Check if the features section is in viewport
    const featuresSection = page.locator('#features')
    await expect(featuresSection).toBeInViewport()
  })

  test('should scroll to how-it-works section when clicking How It Works link', async ({ page }) => {
    await page.getByRole('link', { name: 'How It Works' }).click()

    await page.waitForTimeout(500)

    const howItWorksSection = page.locator('#how-it-works')
    await expect(howItWorksSection).toBeInViewport()
  })

  test('should scroll to FAQ section when clicking FAQ link', async ({ page }) => {
    await page.getByRole('link', { name: 'FAQ' }).click()

    await page.waitForTimeout(500)

    const faqSection = page.locator('#faq')
    await expect(faqSection).toBeInViewport()
  })

  test('navbar should become sticky on scroll', async ({ page }) => {
    // Scroll down the page
    await page.evaluate(() => window.scrollTo(0, 500))

    await page.waitForTimeout(300)

    // Check navbar is still visible (sticky)
    const navbar = page.locator('nav').first()
    await expect(navbar).toBeVisible()
  })
})

test.describe('Features Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.locator('#features').scrollIntoViewIfNeeded()
  })

  test('should display all 6 feature cards', async ({ page }) => {
    await expect(page.getByText('Resume & Cover Letter')).toBeVisible()
    await expect(page.getByText('AI Interview Simulation')).toBeVisible()
    await expect(page.getByText('Networking Guides')).toBeVisible()
    await expect(page.getByText('Job Search Strategies')).toBeVisible()
    await expect(page.getByText('Self-Promotion Tools')).toBeVisible()
    await expect(page.getByText('Career Buddy AI Chat')).toBeVisible()
  })
})

test.describe('FAQ Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.locator('#faq').scrollIntoViewIfNeeded()
  })

  test('should display FAQ questions', async ({ page }) => {
    await expect(page.getByText('Is Career Buddy completely free?')).toBeVisible()
    await expect(page.getByText('Who is Career Buddy for?')).toBeVisible()
  })

  test('should expand FAQ answer when clicking question', async ({ page }) => {
    const firstQuestion = page.getByText('Is Career Buddy completely free?')
    await firstQuestion.click()

    await page.waitForTimeout(300)

    // Check if the answer is visible
    await expect(page.getByText('Yes! Career Buddy is free for all Malaysian youth')).toBeVisible()
  })

  test('should collapse FAQ answer when clicking again', async ({ page }) => {
    const firstQuestion = page.getByText('Is Career Buddy completely free?')

    // Open
    await firstQuestion.click()
    await page.waitForTimeout(300)

    // Close
    await firstQuestion.click()
    await page.waitForTimeout(300)

    // Answer should be hidden (collapsed)
    const answer = page.getByText('Yes! Career Buddy is free for all Malaysian youth')
    await expect(answer).not.toBeVisible()
  })
})

test.describe('Testimonials Carousel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.getByText('Hear From Our').scrollIntoViewIfNeeded()
  })

  test('should display testimonial cards', async ({ page }) => {
    // At least one testimonial should be visible
    await expect(page.getByText('Sarah Ahmad').or(page.getByText('Muhammad Haziq'))).toBeVisible()
  })

  test('should have navigation dots', async ({ page }) => {
    const dots = page.locator('.h-2.rounded-full')
    await expect(dots.first()).toBeVisible()
  })

  test('should change testimonial when clicking navigation dot', async ({ page }) => {
    const dots = page.locator('button.h-2.rounded-full')
    const secondDot = dots.nth(1)

    await secondDot.click()
    await page.waitForTimeout(500)

    // The second dot should now be active (wider)
    await expect(secondDot).toHaveClass(/w-8/)
  })
})

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)
  })

  test('should display footer with logo', async ({ page }) => {
    await expect(page.getByText('Career Buddy').last()).toBeVisible()
  })

  test('should display copyright notice', async ({ page }) => {
    const currentYear = new Date().getFullYear()
    await expect(page.getByText(`${currentYear} Career Buddy`)).toBeVisible()
  })

  test('should display social media links', async ({ page }) => {
    // Check for social media icons by aria-label
    await expect(page.locator('a[aria-label="Twitter"]')).toBeVisible()
    await expect(page.locator('a[aria-label="LinkedIn"]')).toBeVisible()
  })
})
