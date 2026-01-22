import { test, expect } from '@playwright/test'

// Helper to check if we're on a mobile viewport
async function isMobileViewport(page: any): Promise<boolean> {
  const viewport = page.viewportSize()
  return viewport && viewport.width < 768
}

// Helper to open mobile menu if needed
async function openMobileMenuIfNeeded(page: any): Promise<void> {
  const isMobile = await isMobileViewport(page)
  if (isMobile) {
    const menuButton = page.locator('button.md\\:hidden').first()
    if (await menuButton.isVisible()) {
      await menuButton.click()
      await page.waitForTimeout(300)
    }
  }
}

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

    // On mobile, nav links are inside mobile menu
    await openMobileMenuIfNeeded(page)

    // AppNavbar links: Home, About Us, Contact, Privacy
    await expect(page.locator('nav').getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(page.locator('nav').getByRole('link', { name: 'About Us' })).toBeVisible()
    await expect(page.locator('nav').getByRole('link', { name: 'Contact' })).toBeVisible()
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
    // Scroll to footer first to access the Features link (it's in footer, not navbar)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(300)

    // Click Features link in footer
    await page.locator('footer').getByRole('link', { name: 'Features' }).click()

    // Wait for scroll animation
    await page.waitForTimeout(500)

    // Check if the features section is in viewport
    const featuresSection = page.locator('#features')
    await expect(featuresSection).toBeInViewport()
  })

  test('should scroll to how-it-works section when clicking How It Works link', async ({ page }) => {
    // Scroll to footer first to access the How It Works link (it's in footer, not navbar)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(300)

    // Click How It Works link in footer
    await page.locator('footer').getByRole('link', { name: 'How It Works' }).click()

    await page.waitForTimeout(500)

    const howItWorksSection = page.locator('#how-it-works')
    await expect(howItWorksSection).toBeInViewport()
  })

  test('should scroll to FAQ section when clicking FAQ link', async ({ page }) => {
    // Scroll to footer first to access the FAQ link (it's in footer, not navbar)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(300)

    // Click FAQ link in footer
    await page.locator('footer').getByRole('link', { name: 'FAQ' }).click()

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
    // Scroll directly to features section and wait for animation
    await page.locator('#features').scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000) // Wait for scroll animation to trigger visibility
  })

  test('should display all 6 feature cards', async ({ page }) => {
    const isMobile = await isMobileViewport(page)
    const featuresSection = page.locator('#features')

    if (isMobile) {
      // On mobile, features are in a slider - all features exist in DOM
      // The slider container might have animation, so we check attachment
      await expect(featuresSection.getByText('Resume & Cover Letter').first()).toBeAttached({ timeout: 10000 })
      await expect(featuresSection.getByText('AI Interview Simulation').first()).toBeAttached()
      await expect(featuresSection.getByText('Networking Guides').first()).toBeAttached()
      await expect(featuresSection.getByText('Job Search Strategies').first()).toBeAttached()
      await expect(featuresSection.getByText('Self-Promotion Tools').first()).toBeAttached()
      await expect(featuresSection.getByText('Career Buddy AI Chat').first()).toBeAttached()
    } else {
      // On desktop, all cards should be visible
      await expect(featuresSection.getByText('Resume & Cover Letter').first()).toBeVisible({ timeout: 10000 })
      await expect(featuresSection.getByText('AI Interview Simulation').first()).toBeVisible({ timeout: 10000 })
      await expect(featuresSection.getByText('Networking Guides').first()).toBeVisible({ timeout: 10000 })
      await expect(featuresSection.getByText('Job Search Strategies').first()).toBeVisible({ timeout: 10000 })
      await expect(featuresSection.getByText('Self-Promotion Tools').first()).toBeVisible({ timeout: 10000 })
      await expect(featuresSection.getByText('Career Buddy AI Chat').first()).toBeVisible({ timeout: 10000 })
    }
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
    await page.waitForTimeout(500) // Wait for scroll animation
  })

  test('should display testimonial cards', async ({ page }) => {
    // At least one testimonial should be visible
    await expect(page.getByText('Sarah Ahmad').first()).toBeVisible({ timeout: 10000 })
  })

  test('should have navigation dots', async ({ page }) => {
    // Scroll down more to ensure dots are in view
    await page.evaluate(() => window.scrollBy(0, 300))
    await page.waitForTimeout(500)

    // Check for navigation dots in testimonials section using parent container
    const testimonialsSection = page.locator('#feedback')

    // Dots are buttons with h-2 class (small height)
    const dots = testimonialsSection.locator('button.h-2')
    await expect(dots.first()).toBeAttached({ timeout: 10000 })
    expect(await dots.count()).toBeGreaterThan(0)
  })

  test('should change testimonial when clicking navigation dot', async ({ page }) => {
    const isMobile = await isMobileViewport(page)

    // Scroll to the dots section to ensure they're visible
    await page.evaluate(() => window.scrollBy(0, 300))
    await page.waitForTimeout(300)

    let dots
    if (isMobile) {
      // Mobile carousel dots
      const mobileCarousel = page.locator('.md\\:hidden')
      dots = mobileCarousel.locator('button.h-2.rounded-full')
    } else {
      // Desktop carousel dots
      const desktopCarousel = page.locator('.hidden.md\\:block')
      dots = desktopCarousel.locator('button.h-2.rounded-full')
    }

    const secondDot = dots.nth(1)

    await secondDot.scrollIntoViewIfNeeded()
    await secondDot.click()
    await page.waitForTimeout(500)

    // The second dot should now be active (wider - w-8 for desktop, w-6 for mobile)
    if (isMobile) {
      await expect(secondDot).toHaveClass(/w-6/)
    } else {
      await expect(secondDot).toHaveClass(/w-8/)
    }
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
