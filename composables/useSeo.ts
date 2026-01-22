export interface SeoMeta {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  noindex?: boolean
}

const SITE_NAME = 'Career Buddy'
const SITE_URL = 'https://careerbuddy.yanasharif.com'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

export function useSeo(meta: SeoMeta) {
  const route = useRoute()
  const canonicalUrl = `${SITE_URL}${route.path}`
  const fullTitle = meta.title === SITE_NAME
    ? meta.title
    : `${meta.title} | ${SITE_NAME}`

  useHead({
    title: fullTitle,
    htmlAttrs: { lang: 'en-MY' },
    meta: [
      { name: 'description', content: meta.description },
      { name: 'keywords', content: meta.keywords },
      { name: 'robots', content: meta.noindex ? 'noindex, nofollow' : 'index, follow' },
      // Open Graph
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: meta.description },
      { property: 'og:image', content: meta.ogImage || DEFAULT_OG_IMAGE },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:type', content: meta.ogType || 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:locale', content: 'en_MY' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: meta.description },
      { name: 'twitter:image', content: meta.ogImage || DEFAULT_OG_IMAGE },
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl },
    ],
  })
}

// Schema.org helpers
export function useOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Career Buddy',
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand/logo-full.png`,
    description: 'Career preparation platform for Malaysian youth aged 18-30.',
  }
}

export function useWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Career Buddy',
    url: SITE_URL,
    description: 'Your all-in-one career preparation platform.',
    inLanguage: 'en-MY',
  }
}

export function useBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.item}`,
    })),
  }
}

// FAQPage schema for rich results
export function useFAQPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// SSR-compatible JSON-LD injection using useHead()
export function useJsonLd(schemas: Record<string, unknown> | Record<string, unknown>[]) {
  const formattedSchema = Array.isArray(schemas)
    ? {
        '@context': 'https://schema.org',
        '@graph': schemas.map(s => {
          const { '@context': _, ...rest } = s
          return rest
        })
      }
    : schemas

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(formattedSchema),
      },
    ],
  })
}
