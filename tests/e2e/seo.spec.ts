import { test, expect } from '@playwright/test'

const SITE_URL = 'https://careerbuddy.yanasharif.com'
const SITE_NAME = 'Career Buddy'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

// Helper to extract JSON-LD scripts from page
// Handles both single schemas and @graph format
async function getJsonLdScripts(page: any): Promise<any[]> {
  return page.evaluate(() => {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]')
    const schemas: any[] = []

    Array.from(scripts).forEach(script => {
      try {
        const parsed = JSON.parse(script.textContent || '{}')
        // Handle @graph format (multiple schemas in one script)
        if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
          schemas.push(...parsed['@graph'])
        } else {
          schemas.push(parsed)
        }
      } catch {
        // Ignore parse errors
      }
    })

    return schemas.filter(Boolean)
  })
}

// Helper to verify common SEO tags
async function verifySeoTags(
  page: any,
  expectedTitle: string,
  expectedDescription: string,
  path: string,
  shouldIndex: boolean = true
) {
  const canonicalUrl = `${SITE_URL}${path}`
  const fullTitle = expectedTitle === SITE_NAME
    ? expectedTitle
    : `${expectedTitle} | ${SITE_NAME}`

  // Wait for page to be fully loaded
  await page.waitForLoadState('domcontentloaded')

  // Title - use regex pattern to match
  await expect(page).toHaveTitle(new RegExp(expectedTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))

  // Meta description - wait for it to be present
  const description = page.locator('meta[name="description"]')
  await expect(description).toHaveAttribute('content', new RegExp('.+'))

  // Robots meta
  const robots = page.locator('meta[name="robots"]')
  const expectedRobots = shouldIndex ? 'index, follow' : 'noindex, nofollow'
  await expect(robots).toHaveAttribute('content', expectedRobots)

  // Canonical URL
  const canonical = page.locator('link[rel="canonical"]')
  await expect(canonical).toHaveAttribute('href', canonicalUrl)

  // Open Graph tags
  const ogTitle = page.locator('meta[property="og:title"]')
  await expect(ogTitle).toHaveAttribute('content', new RegExp(expectedTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))

  const ogImage = page.locator('meta[property="og:image"]')
  await expect(ogImage).toHaveAttribute('content', DEFAULT_OG_IMAGE)

  const ogUrl = page.locator('meta[property="og:url"]')
  await expect(ogUrl).toHaveAttribute('content', canonicalUrl)

  const ogSiteName = page.locator('meta[property="og:site_name"]')
  await expect(ogSiteName).toHaveAttribute('content', SITE_NAME)

  // Twitter Card tags
  const twitterCard = page.locator('meta[name="twitter:card"]')
  await expect(twitterCard).toHaveAttribute('content', 'summary_large_image')

  // HTML lang attribute
  const html = page.locator('html')
  await expect(html).toHaveAttribute('lang', 'en-MY')
}

test.describe('SEO - Public Pages', () => {
  test('Homepage has correct SEO tags and structured data', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    await verifySeoTags(
      page,
      'Career Buddy',
      'Career Buddy is your all-in-one career preparation platform',
      '/',
      true
    )

    // Verify structured data (SSR-rendered via useHead)
    const jsonLd = await getJsonLdScripts(page)

    // Check for Organization schema
    const hasOrganization = jsonLd.some(schema => schema && schema['@type'] === 'Organization')

    // Check for WebSite schema
    const hasWebSite = jsonLd.some(schema => schema && schema['@type'] === 'WebSite')

    // JSON-LD should be present (SSR-rendered)
    expect(jsonLd.length).toBeGreaterThan(0)
    expect(hasOrganization || hasWebSite).toBe(true)
  })

  test('About page has correct SEO tags and breadcrumb schema', async ({ page }) => {
    await page.goto('/about')
    await page.waitForLoadState('domcontentloaded')

    await verifySeoTags(
      page,
      'About Us',
      'Learn about Career Buddy',
      '/about',
      true
    )

    // Verify breadcrumb structured data (SSR-rendered)
    const jsonLd = await getJsonLdScripts(page)
    const breadcrumb = jsonLd.find(schema => schema && schema['@type'] === 'BreadcrumbList')

    expect(breadcrumb).toBeDefined()
    expect(breadcrumb.itemListElement.length).toBeGreaterThanOrEqual(2)
  })

  test('Contact page has correct SEO tags and breadcrumb schema', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForLoadState('domcontentloaded')

    await verifySeoTags(
      page,
      'Contact',
      'Contact',
      '/contact',
      true
    )

    // Verify breadcrumb structured data (SSR-rendered)
    const jsonLd = await getJsonLdScripts(page)
    const breadcrumb = jsonLd.find(schema => schema && schema['@type'] === 'BreadcrumbList')

    expect(breadcrumb).toBeDefined()
  })

  test('Privacy page has correct SEO tags', async ({ page }) => {
    await page.goto('/privacy')
    await page.waitForLoadState('domcontentloaded')

    // Check title contains Privacy
    await expect(page).toHaveTitle(/Privacy/)

    // Check robots meta allows indexing
    const robots = page.locator('meta[name="robots"]')
    await expect(robots).toHaveAttribute('content', 'index, follow')

    // Check canonical URL
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', `${SITE_URL}/privacy`)
  })

  test('Login page has correct SEO tags', async ({ page }) => {
    await page.goto('/login')
    await page.waitForLoadState('domcontentloaded')

    // Check title contains Login
    await expect(page).toHaveTitle(/Login|Sign/)

    // Check robots meta allows indexing
    const robots = page.locator('meta[name="robots"]')
    await expect(robots).toHaveAttribute('content', 'index, follow')

    // Check canonical URL
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', `${SITE_URL}/login`)
  })

  test('Register page has correct SEO tags', async ({ page }) => {
    await page.goto('/register')
    await page.waitForLoadState('domcontentloaded')

    // Check title contains Register or Sign up or Create
    await expect(page).toHaveTitle(/Register|Sign|Create/)

    // Check robots meta allows indexing
    const robots = page.locator('meta[name="robots"]')
    await expect(robots).toHaveAttribute('content', 'index, follow')

    // Check canonical URL
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', `${SITE_URL}/register`)
  })
})

test.describe('SEO - Protected Pages (noindex)', () => {
  // Helper to authenticate before each test
  async function authenticateUser(page: any) {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.evaluate(() => {
      localStorage.setItem('auth_user', JSON.stringify({ username: 'admin', name: 'Yana' }))
    })
  }

  // Helper to wait for robots meta tag to be present
  async function waitForRobotsMeta(page: any) {
    await page.waitForLoadState('domcontentloaded')
    // Wait for Vue hydration and meta tag to be set
    await page.waitForTimeout(500)
    // Also wait for the meta tag to actually exist (state: 'attached' since meta tags are in head)
    await page.waitForSelector('meta[name="robots"]', { timeout: 10000, state: 'attached' })
  }

  test('Dashboard page has noindex meta', async ({ page }) => {
    await authenticateUser(page)
    await page.goto('/dashboard')
    await waitForRobotsMeta(page)

    // Check robots meta disallows indexing
    const robots = page.locator('meta[name="robots"]')
    await expect(robots).toHaveAttribute('content', 'noindex, nofollow')

    // Still should have canonical URL
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', `${SITE_URL}/dashboard`)
  })

  test('Chat page has noindex meta', async ({ page }) => {
    await authenticateUser(page)
    await page.goto('/chat')
    await waitForRobotsMeta(page)

    // Check robots meta disallows indexing
    const robots = page.locator('meta[name="robots"]')
    await expect(robots).toHaveAttribute('content', 'noindex, nofollow')
  })

  test('Help page has noindex meta', async ({ page }) => {
    await authenticateUser(page)
    await page.goto('/help')
    await waitForRobotsMeta(page)

    // Check robots meta disallows indexing
    const robots = page.locator('meta[name="robots"]')
    await expect(robots).toHaveAttribute('content', 'noindex, nofollow')
  })

  test('Settings page has noindex meta', async ({ page }) => {
    await authenticateUser(page)
    await page.goto('/settings')
    await waitForRobotsMeta(page)

    // Check robots meta disallows indexing
    const robots = page.locator('meta[name="robots"]')
    await expect(robots).toHaveAttribute('content', 'noindex, nofollow')
  })

  test('Resume pages have noindex meta', async ({ page }) => {
    await authenticateUser(page)
    await page.goto('/resume')
    await waitForRobotsMeta(page)

    const robots = page.locator('meta[name="robots"]')
    await expect(robots).toHaveAttribute('content', 'noindex, nofollow')
  })

  test('Interview pages have noindex meta', async ({ page }) => {
    await authenticateUser(page)
    await page.goto('/interview')
    await waitForRobotsMeta(page)

    const robots = page.locator('meta[name="robots"]')
    await expect(robots).toHaveAttribute('content', 'noindex, nofollow')
  })
})

test.describe('SEO - Sitemap', () => {
  test('Sitemap.xml exists and is valid XML', async ({ request }) => {
    const response = await request.get('/sitemap.xml')
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('xml')

    const body = await response.text()
    expect(body).toContain('<?xml')
    expect(body).toContain('<urlset')
  })

  test('Sitemap excludes protected pages', async ({ request }) => {
    const response = await request.get('/sitemap.xml')
    const body = await response.text()

    // Protected pages should NOT be in sitemap
    const protectedPaths = [
      '/dashboard',
      '/chat',
      '/help',
      '/settings',
      '/resume',
      '/interview',
      '/job-search',
      '/networking',
      '/self-promotion',
    ]

    for (const path of protectedPaths) {
      // Check that the path is not present (except as part of the domain)
      const pathInSitemap = body.includes(`<loc>${SITE_URL}${path}`)
      expect(pathInSitemap).toBe(false)
    }
  })
})

test.describe('SEO - robots.txt', () => {
  test('robots.txt exists and has correct content', async ({ request }) => {
    const response = await request.get('/robots.txt')
    expect(response.status()).toBe(200)

    const body = await response.text()

    // Check User-Agent
    expect(body).toContain('User-Agent: *')

    // Check Allow directives for public pages
    expect(body).toContain('Allow: /')
    expect(body).toContain('Allow: /about')
    expect(body).toContain('Allow: /contact')
    expect(body).toContain('Allow: /privacy')
    expect(body).toContain('Allow: /login')
    expect(body).toContain('Allow: /register')

    // Check Disallow directives for protected pages
    expect(body).toContain('Disallow: /dashboard')
    expect(body).toContain('Disallow: /chat')
    expect(body).toContain('Disallow: /help')
    expect(body).toContain('Disallow: /settings')
    expect(body).toContain('Disallow: /resume')
    expect(body).toContain('Disallow: /interview')
    expect(body).toContain('Disallow: /job-search')
    expect(body).toContain('Disallow: /networking')
    expect(body).toContain('Disallow: /self-promotion')
    expect(body).toContain('Disallow: /api/')

    // Check Sitemap URL
    expect(body).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`)
  })
})

