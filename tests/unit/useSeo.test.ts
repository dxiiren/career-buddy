import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import {
  useSeo,
  useOrganizationSchema,
  useWebSiteSchema,
  useBreadcrumbSchema,
  useFAQPageSchema,
  useJsonLd,
} from '../../composables/useSeo'

/**
 * useSeo produces nothing a component test can observe — it hands a payload to
 * useHead and returns void. So the payload IS the unit under test: capture what
 * it hands over and assert on that.
 *
 * tests/e2e/seo.spec.ts asserts the same output as rendered tags, but Playwright
 * is not part of `just verify`, which left this composable outside the default
 * gate entirely.
 */
const { headCalls, route } = vi.hoisted(() => ({
  headCalls: [] as Array<Record<string, any>>,
  route: { path: '/' },
}))

mockNuxtImport('useHead', () => {
  return (input: Record<string, any>) => {
    headCalls.push(input)
  }
})

mockNuxtImport('useRoute', () => {
  return () => route
})

const SITE_URL = 'https://careerbuddy.yanasharif.com'

const head = () => headCalls[headCalls.length - 1]
const named = (name: string) =>
  head().meta.find((tag: any) => tag.name === name)?.content
const property = (key: string) =>
  head().meta.find((tag: any) => tag.property === key)?.content
const canonical = () =>
  head().link.find((tag: any) => tag.rel === 'canonical')?.href

beforeEach(() => {
  headCalls.length = 0
  route.path = '/'
})

describe('useSeo', () => {
  describe('title', () => {
    it('suffixes the site name onto a page title', () => {
      useSeo({ title: 'Interview Prep', description: 'Practice questions.' })

      expect(head().title).toBe('Interview Prep | Career Buddy')
    })

    it('does not repeat the site name on the landing page', () => {
      useSeo({ title: 'Career Buddy', description: 'Landing.' })

      expect(head().title).toBe('Career Buddy')
    })
  })

  describe('locale', () => {
    it('declares Malaysian English on the document and the share card', () => {
      // The audience is Malaysian youth; the two tags spell the locale
      // differently on purpose — BCP-47 for html lang, underscore for OG.
      useSeo({ title: 'About', description: 'Who we are.' })

      expect(head().htmlAttrs.lang).toBe('en-MY')
      expect(property('og:locale')).toBe('en_MY')
    })
  })

  describe('indexing', () => {
    it('lets a page be indexed by default', () => {
      useSeo({ title: 'About', description: 'Who we are.' })

      expect(named('robots')).toBe('index, follow')
    })

    it('shuts a page out of the index when asked', () => {
      // Every signed-in app route passes this; getting it backwards would put
      // the mock dashboard into search results.
      useSeo({ title: 'Dashboard', description: 'Your progress.', noindex: true })

      expect(named('robots')).toBe('noindex, nofollow')
    })
  })

  describe('canonical url', () => {
    it('builds an absolute url from the live origin and the current path', () => {
      route.path = '/interview/questions'
      useSeo({ title: 'Questions', description: 'A question bank.' })

      expect(canonical()).toBe(`${SITE_URL}/interview/questions`)
    })

    it('keeps og:url and the canonical link in agreement', () => {
      // Two tags that disagree about which url is the real one is worse than
      // either being absent, so assert the invariant rather than a value.
      route.path = '/resume/templates'
      useSeo({ title: 'Templates', description: 'Resume templates.' })

      expect(property('og:url')).toBe(canonical())
    })
  })

  describe('description and keywords', () => {
    it('carries the description into the meta, Open Graph and Twitter tags', () => {
      const description = 'Career preparation for Malaysian youth.'
      useSeo({ title: 'About', description })

      expect(named('description')).toBe(description)
      expect(property('og:description')).toBe(description)
      expect(named('twitter:description')).toBe(description)
    })

    it('passes keywords through when a page supplies them', () => {
      useSeo({
        title: 'Job Search',
        description: 'Find a job.',
        keywords: 'jobs malaysia, fresh grad',
      })

      expect(named('keywords')).toBe('jobs malaysia, fresh grad')
    })
  })

  describe('share image', () => {
    it('falls back to the site-wide share card', () => {
      useSeo({ title: 'About', description: 'Who we are.' })

      expect(property('og:image')).toBe(`${SITE_URL}/og-image.png`)
      expect(named('twitter:image')).toBe(`${SITE_URL}/og-image.png`)
    })

    it('uses a page-specific image for both cards at once', () => {
      const ogImage = `${SITE_URL}/images/share/resume.png`
      useSeo({ title: 'Resume', description: 'Build a resume.', ogImage })

      expect(property('og:image')).toBe(ogImage)
      expect(named('twitter:image')).toBe(ogImage)
    })
  })

  describe('open graph and twitter', () => {
    it('titles both cards with the full title, not the bare one', () => {
      useSeo({ title: 'Networking', description: 'Build a network.' })

      expect(property('og:title')).toBe('Networking | Career Buddy')
      expect(named('twitter:title')).toBe('Networking | Career Buddy')
      expect(property('og:site_name')).toBe('Career Buddy')
    })

    it('defaults to a website card', () => {
      useSeo({ title: 'About', description: 'Who we are.' })

      expect(property('og:type')).toBe('website')
      expect(named('twitter:card')).toBe('summary_large_image')
    })

    it('marks an article as one', () => {
      useSeo({ title: 'Post', description: 'A post.', ogType: 'article' })

      expect(property('og:type')).toBe('article')
    })
  })
})

describe('schema.org helpers', () => {
  it('describes the organization with absolute urls', () => {
    const schema = useOrganizationSchema()

    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('Organization')
    expect(schema.url).toBe(SITE_URL)
    expect(schema.logo.startsWith(`${SITE_URL}/`)).toBe(true)
  })

  it('describes the website in the site locale', () => {
    const schema = useWebSiteSchema()

    expect(schema['@type']).toBe('WebSite')
    expect(schema.url).toBe(SITE_URL)
    expect(schema.inLanguage).toBe('en-MY')
  })

  it('numbers breadcrumb positions from one, with absolute items', () => {
    const schema = useBreadcrumbSchema([
      { name: 'Home', item: '/' },
      { name: 'Interview Prep', item: '/interview' },
    ])

    expect(schema['@type']).toBe('BreadcrumbList')
    expect(schema.itemListElement).toEqual([
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Interview Prep',
        item: `${SITE_URL}/interview`,
      },
    ])
  })

  it('turns every FAQ entry into a Question with an accepted answer', () => {
    // Google treats structured data that disagrees with the rendered FAQ as a
    // reason to distrust the page, so the mapping has to be total.
    const faqs = [
      { question: 'Is it free?', answer: 'Yes, every feature is free.' },
      { question: 'Who is it for?', answer: 'Malaysian youth aged 18-30.' },
    ]
    const schema = useFAQPageSchema(faqs)

    expect(schema['@type']).toBe('FAQPage')
    expect(schema.mainEntity).toHaveLength(2)
    expect(schema.mainEntity[1]).toEqual({
      '@type': 'Question',
      name: 'Who is it for?',
      acceptedAnswer: { '@type': 'Answer', text: 'Malaysian youth aged 18-30.' },
    })
  })
})

describe('useJsonLd', () => {
  const parsed = () => JSON.parse(head().script[0].innerHTML)

  it('injects a single schema verbatim as ld+json', () => {
    useJsonLd(useOrganizationSchema())

    expect(head().script[0].type).toBe('application/ld+json')
    expect(parsed()).toEqual(useOrganizationSchema())
  })

  it('merges several schemas into one @graph', () => {
    useJsonLd([useOrganizationSchema(), useWebSiteSchema()])

    const data = parsed()
    expect(data['@context']).toBe('https://schema.org')
    expect(data['@graph'].map((node: any) => node['@type'])).toEqual([
      'Organization',
      'WebSite',
    ])
  })

  it('hoists @context out of the graph nodes instead of repeating it', () => {
    // A per-node @context inside @graph is invalid; the block would be ignored
    // wholesale rather than partially.
    useJsonLd([useOrganizationSchema(), useWebSiteSchema()])

    for (const node of parsed()['@graph']) {
      expect(node['@context']).toBeUndefined()
    }
  })

  it('emits json a parser can actually read', () => {
    useJsonLd(useFAQPageSchema([{ question: 'Why?', answer: 'Because.' }]))

    expect(() => JSON.parse(head().script[0].innerHTML)).not.toThrow()
  })
})
