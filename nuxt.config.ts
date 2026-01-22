// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'shadcn-nuxt',
    '@nuxtjs/sitemap',
  ],

  site: {
    url: 'https://careerbuddy.yanasharif.com',
    name: 'Career Buddy',
  },

  sitemap: {
    zeroRuntime: true, // Enable for production, disable for dev testing
    exclude: [
      '/dashboard/**',
      '/chat/**',
      '/help',
      '/settings',
      '/resume/**',
      '/interview/**',
      '/job-search/**',
      '/networking/**',
      '/self-promotion/**',
    ],
  },

  routeRules: {
    '/dashboard/**': { robots: 'noindex, nofollow' },
    '/chat/**': { robots: 'noindex, nofollow' },
    '/help': { robots: 'noindex, nofollow' },
    '/settings': { robots: 'noindex, nofollow' },
    '/resume/**': { robots: 'noindex, nofollow' },
    '/interview/**': { robots: 'noindex, nofollow' },
    '/job-search/**': { robots: 'noindex, nofollow' },
    '/networking/**': { robots: 'noindex, nofollow' },
    '/self-promotion/**': { robots: 'noindex, nofollow' },
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },

  tailwindcss: {
    configPath: 'tailwind.config.ts',
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en-MY' },
      title: 'Career Buddy - Your Career Journey Starts Here',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Career Buddy is your all-in-one career preparation platform. Get resume templates, AI interview practice, networking guides, and job search strategies tailored for young adults.' },
        { name: 'author', content: 'Career Buddy' },
        { name: 'theme-color', content: '#6366f1' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Career Buddy' },
        { property: 'article:published_time', content: '2025-01-01T00:00:00+08:00' },
        { property: 'article:modified_time', content: '2025-01-22T00:00:00+08:00' },
        { property: 'og:locale', content: 'en_MY' },
        { property: 'og:image', content: 'https://careerbuddy.yanasharif.com/og-image.png' },
        { property: 'og:image:secure_url', content: 'https://careerbuddy.yanasharif.com/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:alt', content: 'Career Buddy - Your all-in-one career preparation platform' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://careerbuddy.yanasharif.com/og-image.png' },
        { name: 'geo.region', content: 'MY' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap' },
      ],
    },
  },
})
