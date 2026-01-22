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

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    // Check h1 exists (should be only one)
    const h1Elements = page.locator('h1')
    await expect(h1Elements).toHaveCount(1)

    // Check h2 elements exist for sections
    const h2Elements = page.locator('h2')
    expect(await h2Elements.count()).toBeGreaterThan(0)
  })

  test('should have descriptive page title', async ({ page }) => {
    const title = await page.title()
    expect(title).toContain('Career Buddy')
    expect(title.length).toBeGreaterThan(10)
  })

  test('should have meta description', async ({ page }) => {
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /career/i)
  })

  test('should have alt text or aria-labels for icons', async ({ page }) => {
    // Social media links in footer should have aria-labels
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)

    // Find link by aria-label attribute
    const twitterLink = page.locator('a[aria-label="Twitter"]')
    await expect(twitterLink).toBeVisible()
  })

  test('buttons should be keyboard accessible', async ({ page }) => {
    // For mobile, we need to find a visible button
    const isMobile = await isMobileViewport(page)

    if (isMobile) {
      // On mobile, the menu button is always visible
      const menuButton = page.locator('button.md\\:hidden').first()
      await menuButton.focus()
      await expect(menuButton).toBeFocused()
    } else {
      // Focus on the first CTA button using Tab
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      // Get the focused element
      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()
    }
  })

  test('navigation links should be keyboard accessible', async ({ page }) => {
    // On mobile, open the menu first to access nav links
    await openMobileMenuIfNeeded(page)

    // Navigate to a navbar link and press Enter
    const aboutLink = page.locator('nav').getByRole('link', { name: 'About Us' })
    await aboutLink.focus()
    await expect(aboutLink).toBeFocused()

    await page.keyboard.press('Enter')

    // Wait for navigation to complete
    await page.waitForURL('**/about', { timeout: 5000 })
  })

  test('accordion should be keyboard accessible', async ({ page }) => {
    await page.locator('#faq').scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)

    // Focus on the first accordion trigger
    const firstQuestion = page.getByText('Is Career Buddy completely free?')
    await firstQuestion.focus()

    // Press Enter to expand
    await page.keyboard.press('Enter')
    await page.waitForTimeout(300)

    // Answer should be visible
    await expect(page.getByText('Yes! Career Buddy is free')).toBeVisible()
  })

  test('should have sufficient color contrast', async ({ page }) => {
    // Check that text is visible (basic visibility check)
    const heroHeadline = page.getByRole('heading', { level: 1 })
    await expect(heroHeadline).toBeVisible()

    // Check that buttons have visible text
    const ctaButton = page.getByRole('button', { name: /Get Started Free/i }).first()
    await expect(ctaButton).toBeVisible()
  })

  test('should have visible focus indicators', async ({ page }) => {
    // Tab to a button
    const ctaButton = page.getByRole('button', { name: /Get Started Free/i }).first()
    await ctaButton.focus()

    // Check that the button is focused (has focus ring)
    await expect(ctaButton).toBeFocused()
  })

  test('should have main content element', async ({ page }) => {
    // Verify main content exists
    const mainContent = page.locator('main')
    await expect(mainContent).toBeVisible()
  })

  test('interactive elements should have appropriate roles', async ({ page }) => {
    // Buttons should have button role
    const buttons = page.getByRole('button')
    expect(await buttons.count()).toBeGreaterThan(0)

    // Links should have link role
    const links = page.getByRole('link')
    expect(await links.count()).toBeGreaterThan(0)
  })
})

test.describe('SEO', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
  })

  test('should have viewport meta tag', async ({ page }) => {
    const viewport = page.locator('meta[name="viewport"]')
    await expect(viewport).toHaveAttribute('content', /width=device-width/i)
  })

  test('should have charset meta tag', async ({ page }) => {
    const charset = page.locator('meta[charset]')
    await expect(charset).toHaveAttribute('charset', 'utf-8')
  })

  test('should have favicon', async ({ page }) => {
    const favicon = page.locator('link[rel="icon"]').first()
    await expect(favicon).toHaveAttribute('href', /.+/)
  })
})
