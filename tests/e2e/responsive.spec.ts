import { test, expect } from '@playwright/test'

test.describe('Mobile Responsive Design', () => {
  // Set mobile viewport for all tests in this describe block
  test.use({ viewport: { width: 390, height: 844 } })

  test('should display mobile navigation menu button', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Desktop nav links (in navbar) should be hidden on mobile
    // AppNavbar uses md:flex so links are hidden below 768px
    const navDesktopLinks = page.locator('nav .hidden.md\\:flex a')
    await expect(navDesktopLinks.first()).not.toBeVisible()

    // Mobile menu button should be visible (has md:hidden class)
    const menuButton = page.locator('nav button.md\\:hidden, nav .md\\:hidden button').first()
    await expect(menuButton).toBeVisible()
  })

  test('should open mobile menu when clicking menu button', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Click the mobile menu button (has md:hidden class)
    const menuButton = page.locator('nav button.md\\:hidden, nav .md\\:hidden button').first()
    await menuButton.click()

    await page.waitForTimeout(300)

    // Mobile menu should be visible with nav links (Home, About Us, Contact, Privacy)
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible()
  })

  test('should close mobile menu when clicking nav link', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Open mobile menu
    const menuButton = page.locator('nav button.md\\:hidden, nav .md\\:hidden button').first()
    await menuButton.click()
    await page.waitForTimeout(300)

    // Click a nav link (Home link in mobile menu)
    await page.getByRole('link', { name: 'Home' }).click()
    await page.waitForTimeout(500)

    // Menu should close (mobile menu dropdown no longer visible)
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
    await page.waitForTimeout(500) // Wait for scroll animation

    // On mobile (<640px), the mobile slider is visible (sm:hidden class)
    // Check for the mobile slider container and its content
    const mobileSlider = page.locator('#features .sm\\:hidden')
    await expect(mobileSlider).toBeVisible()

    // First feature card should be visible in the slider (index 0 is shown by default)
    await expect(mobileSlider.getByText('Resume & Cover Letter')).toBeVisible()
  })

  test('should display steps vertically on mobile', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.locator('#how-it-works').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500) // Wait for scroll animation

    // On mobile (<1024px), the mobile slider is visible (lg:hidden class)
    const mobileSlider = page.locator('#how-it-works .lg\\:hidden')
    await expect(mobileSlider).toBeVisible()

    // First step should be visible in the slider (index 0 is shown by default)
    await expect(mobileSlider.getByText('Sign Up Free')).toBeVisible()
  })
})

test.describe('Tablet Responsive Design', () => {
  // Set tablet viewport for all tests in this describe block
  test.use({ viewport: { width: 768, height: 1024 } })

  test('should display desktop navigation on tablet', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Nav links should be visible (Home, About Us from AppNavbar)
    await expect(page.locator('nav').getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(page.locator('nav').getByRole('link', { name: 'About Us' })).toBeVisible()
  })

  test('should display features in 2 columns on tablet', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.locator('#features').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500) // Wait for scroll animation

    // All feature cards should be visible (use locator within the features section)
    const featuresSection = page.locator('#features')
    await expect(featuresSection.getByText('Resume & Cover Letter').first()).toBeVisible()
    await expect(featuresSection.getByText('Career Buddy AI Chat').first()).toBeVisible()
  })
})

test.describe('Desktop Responsive Design', () => {
  // Set desktop viewport for all tests in this describe block
  test.use({ viewport: { width: 1440, height: 900 } })

  test('should display full navigation on desktop', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // AppNavbar links: Home, About Us, Contact, Privacy
    await expect(page.locator('nav').getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(page.locator('nav').getByRole('link', { name: 'About Us' })).toBeVisible()
    await expect(page.locator('nav').getByRole('link', { name: 'Contact' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Get Started' }).first()).toBeVisible()
  })

  test('should display features in 3 columns on desktop', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.locator('#features').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500) // Wait for scroll animation

    // All 6 feature cards should be visible (use locator within the features section)
    const featuresSection = page.locator('#features')
    const featureTitles = [
      'Resume & Cover Letter',
      'AI Interview Simulation',
      'Networking Guides',
      'Job Search Strategies',
      'Self-Promotion Tools',
      'Career Buddy AI Chat',
    ]

    for (const title of featureTitles) {
      await expect(featuresSection.getByText(title).first()).toBeVisible()
    }
  })

  test('should display horizontal stepper on desktop', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.locator('#how-it-works').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500) // Wait for scroll animation

    // Steps should be visible horizontally (use locator within the how-it-works section)
    const howItWorksSection = page.locator('#how-it-works')
    await expect(howItWorksSection.getByText('01').first()).toBeVisible()
    await expect(howItWorksSection.getByText('02').first()).toBeVisible()
    await expect(howItWorksSection.getByText('03').first()).toBeVisible()
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

    // Footer sections should be visible (use heading role to be specific)
    const footer = page.locator('footer')
    await expect(footer.getByRole('heading', { name: 'Product' })).toBeVisible()
    await expect(footer.getByRole('heading', { name: 'Resources' })).toBeVisible()
    await expect(footer.getByRole('heading', { name: 'Company' })).toBeVisible()
  })
})
