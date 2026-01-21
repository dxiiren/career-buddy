import { test, expect } from '@playwright/test'

const SITE_URL = 'https://careerbuddy.yanasharif.com'
const SITE_NAME = 'Career Buddy'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

// Helper to extract JSON-LD scripts from page
async function getJsonLdScripts(page: any): Promise<any[]> {
  return page.evaluate(() => {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]')
    return Array.from(scripts).map(script => {
      try {
        return JSON.parse(script.textContent || '{}')
      } catch {
        return null
      }
    }).filter(Boolean)
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

  // Title
  await expect(page).toHaveTitle(new RegExp(expectedTitle))

  // Meta description
  const description = page.locator('meta[name="description"]')
  await expect(description).toHaveAttribute('content', expectedDescription)

  // Robots meta
  const robots = page.locator('meta[name="robots"]')
  const expectedRobots = shouldIndex ? 'index, follow' : 'noindex, nofollow'
  await expect(robots).toHaveAttribute('content', expectedRobots)

  // Canonical URL
  const canonical = page.locator('link[rel="canonical"]')
  await expect(canonical).toHaveAttribute('href', canonicalUrl)

  // Open Graph tags
  const ogTitle = page.locator('meta[property="og:title"]')
  await expect(ogTitle).toHaveAttribute('content', fullTitle)

  const ogDescription = page.locator('meta[property="og:description"]')
  await expect(ogDescription).toHaveAttribute('content', expectedDescription)

  const ogImage = page.locator('meta[property="og:image"]')
  await expect(ogImage).toHaveAttribute('content', DEFAULT_OG_IMAGE)

  const ogUrl = page.locator('meta[property="og:url"]')
  await expect(ogUrl).toHaveAttribute('content', canonicalUrl)

  const ogType = page.locator('meta[property="og:type"]')
  await expect(ogType).toHaveAttribute('content', 'website')

  const ogSiteName = page.locator('meta[property="og:site_name"]')
  await expect(ogSiteName).toHaveAttribute('content', SITE_NAME)

  // Twitter Card tags
  const twitterCard = page.locator('meta[name="twitter:card"]')
  await expect(twitterCard).toHaveAttribute('content', 'summary_large_image')

  const twitterTitle = page.locator('meta[name="twitter:title"]')
  await expect(twitterTitle).toHaveAttribute('content', fullTitle)

  const twitterDescription = page.locator('meta[name="twitter:description"]')
  await expect(twitterDescription).toHaveAttribute('content', expectedDescription)

  // HTML lang attribute
  const html = page.locator('html')
  await expect(html).toHaveAttribute('lang', 'en-MY')
}

test.describe('SEO - Public Pages', () => {
  test('Homepage has correct SEO tags and structured data', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await verifySeoTags(
      page,
      'Career Buddy - Your Career Journey Starts Here',
      'Career Buddy is your all-in-one career preparation platform. Get resume templates, AI interview practice, networking guides, and job search strategies tailored for young adults aged 18-30.',
      '/',
      true
    )

    // Verify structured data
    const jsonLd = await getJsonLdScripts(page)
    expect(jsonLd.length).toBeGreaterThanOrEqual(1)

    // Check for Organization schema
    const hasOrganization = jsonLd.some(
      schema => Array.isArray(schema)
        ? schema.some(s => s['@type'] === 'Organization')
        : schema['@type'] === 'Organization'
    )
    expect(hasOrganization).toBe(true)

    // Check for WebSite schema
    const hasWebSite = jsonLd.some(
      schema => Array.isArray(schema)
        ? schema.some(s => s['@type'] === 'WebSite')
        : schema['@type'] === 'WebSite'
    )
    expect(hasWebSite).toBe(true)
  })

  test('About page has correct SEO tags and breadcrumb schema', async ({ page }) => {
    await page.goto('/about')
    await page.waitForLoadState('networkidle')

    await verifySeoTags(
      page,
      'About Us',
      'Learn about Career Buddy - the all-in-one career preparation platform helping Malaysian youth navigate their career journey.',
      '/about',
      true
    )

    // Verify breadcrumb structured data
    const jsonLd = await getJsonLdScripts(page)
    const hasBreadcrumb = jsonLd.some(schema => schema['@type'] === 'BreadcrumbList')
    expect(hasBreadcrumb).toBe(true)

    // Verify breadcrumb items
    const breadcrumb = jsonLd.find(schema => schema['@type'] === 'BreadcrumbList')
    if (breadcrumb) {
      expect(breadcrumb.itemListElement).toBeDefined()
      expect(breadcrumb.itemListElement.length).toBe(2)
      expect(breadcrumb.itemListElement[0].name).toBe('Home')
      expect(breadcrumb.itemListElement[1].name).toBe('About Us')
    }
  })

  test('Contact page has correct SEO tags and breadcrumb schema', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForLoadState('networkidle')

    await verifySeoTags(
      page,
      'Contact Us',
      expect.stringContaining('Contact'),
      '/contact',
      true
    )

    // Verify breadcrumb structured data
    const jsonLd = await getJsonLdScripts(page)
    const hasBreadcrumb = jsonLd.some(schema => schema['@type'] === 'BreadcrumbList')
    expect(hasBreadcrumb).toBe(true)
  })

  test('Privacy page has correct SEO tags', async ({ page }) => {
    await page.goto('/privacy')
    await page.waitForLoadState('networkidle')

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
    await page.waitForLoadState('networkidle')

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
    await page.waitForLoadState('networkidle')

    // Check title contains Register or Sign up
    await expect(page).toHaveTitle(/Register|Sign/)

    // Check robots meta allows indexing
    const robots = page.locator('meta[name="robots"]')
    await expect(robots).toHaveAttribute('content', 'index, follow')

    // Check canonical URL
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', `${SITE_URL}/register`)
  })
})

test.describe('SEO - Protected Pages (noindex)', () => {
  test('Dashboard page has noindex meta', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')

    // Check robots meta disallows indexing
    const robots = page.locator('meta[name="robots"]')
    await expect(robots).toHaveAttribute('content', 'noindex, nofollow')

    // Still should have canonical URL
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', `${SITE_URL}/dashboard`)
  })

  test('Chat page has noindex meta', async ({ page }) => {
    await page.goto('/chat')
    await page.waitForLoadState('networkidle')

    // Check robots meta disallows indexing
    const robots = page.locator('meta[name="robots"]')
    await expect(robots).toHaveAttribute('content', 'noindex, nofollow')
  })

  test('Help page has noindex meta', async ({ page }) => {
    await page.goto('/help')
    await page.waitForLoadState('networkidle')

    // Check robots meta disallows indexing
    const robots = page.locator('meta[name="robots"]')
    await expect(robots).toHaveAttribute('content', 'noindex, nofollow')
  })

  test('Settings page has noindex meta', async ({ page }) => {
    await page.goto('/settings')
    await page.waitForLoadState('networkidle')

    // Check robots meta disallows indexing
    const robots = page.locator('meta[name="robots"]')
    await expect(robots).toHaveAttribute('content', 'noindex, nofollow')
  })

  test('Resume pages have noindex meta', async ({ page }) => {
    await page.goto('/resume')
    await page.waitForLoadState('networkidle')

    const robots = page.locator('meta[name="robots"]')
    await expect(robots).toHaveAttribute('content', 'noindex, nofollow')
  })

  test('Interview pages have noindex meta', async ({ page }) => {
    await page.goto('/interview')
    await page.waitForLoadState('networkidle')

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

  test('Sitemap includes public pages', async ({ request }) => {
    const response = await request.get('/sitemap.xml')
    const body = await response.text()

    // Public pages should be in sitemap
    const publicPages = ['/', '/about', '/contact', '/privacy', '/login', '/register']
    for (const path of publicPages) {
      expect(body).toContain(`${SITE_URL}${path}`)
    }
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

test.describe('SEO - Structured Data Validation', () => {
  test('Organization schema is valid', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const jsonLd = await getJsonLdScripts(page)
    const orgSchema = jsonLd.find(
      schema => Array.isArray(schema)
        ? schema.some(s => s['@type'] === 'Organization')
        : schema['@type'] === 'Organization'
    )

    // If it's an array, extract the Organization schema
    const organization = Array.isArray(orgSchema)
      ? orgSchema.find(s => s['@type'] === 'Organization')
      : orgSchema

    expect(organization).toBeDefined()
    if (organization) {
      expect(organization['@context']).toBe('https://schema.org')
      expect(organization['@type']).toBe('Organization')
      expect(organization.name).toBe('Career Buddy')
      expect(organization.url).toBe(SITE_URL)
    }
  })

  test('WebSite schema is valid', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const jsonLd = await getJsonLdScripts(page)
    const webSiteSchema = jsonLd.find(
      schema => Array.isArray(schema)
        ? schema.some(s => s['@type'] === 'WebSite')
        : schema['@type'] === 'WebSite'
    )

    // If it's an array, extract the WebSite schema
    const webSite = Array.isArray(webSiteSchema)
      ? webSiteSchema.find(s => s['@type'] === 'WebSite')
      : webSiteSchema

    expect(webSite).toBeDefined()
    if (webSite) {
      expect(webSite['@context']).toBe('https://schema.org')
      expect(webSite['@type']).toBe('WebSite')
      expect(webSite.name).toBe('Career Buddy')
      expect(webSite.url).toBe(SITE_URL)
    }
  })

  test('BreadcrumbList schema is valid on About page', async ({ page }) => {
    await page.goto('/about')
    await page.waitForLoadState('networkidle')

    const jsonLd = await getJsonLdScripts(page)
    const breadcrumb = jsonLd.find(schema => schema['@type'] === 'BreadcrumbList')

    expect(breadcrumb).toBeDefined()
    if (breadcrumb) {
      expect(breadcrumb['@context']).toBe('https://schema.org')
      expect(breadcrumb['@type']).toBe('BreadcrumbList')
      expect(breadcrumb.itemListElement).toBeDefined()
      expect(Array.isArray(breadcrumb.itemListElement)).toBe(true)

      // Verify each item has required properties
      for (const item of breadcrumb.itemListElement) {
        expect(item['@type']).toBe('ListItem')
        expect(item.position).toBeDefined()
        expect(item.name).toBeDefined()
        expect(item.item).toBeDefined()
      }
    }
  })
})
