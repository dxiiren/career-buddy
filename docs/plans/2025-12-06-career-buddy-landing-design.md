# Career Buddy Landing Page Design

## Overview

Career Buddy is a user-centred, web-based career preparation platform for young adults aged 18-30 who feel overwhelmed and underprepared in their job-search journey. This document outlines the landing page design.

## Tech Stack

- **Nuxt 3** - Vue framework with SSR, file-based routing
- **shadcn-nuxt** - Official Nuxt module for shadcn-vue
- **Tailwind CSS 3.4** - Utility-first styling (via @nuxtjs/tailwindcss)
- **VueUse** - Composables for animations, SSR width handling

## Project Structure

```
/luxembourg
├── nuxt.config.ts
├── app.vue
├── app/
│   ├── plugins/
│   │   └── ssr-width.ts
│   └── assets/
│       └── css/
│           └── main.css
├── pages/
│   ├── index.vue
│   ├── auth/
│   │   ├── login.vue
│   │   ├── register.vue
│   │   └── forgot-password.vue
│   └── dashboard/
│       └── index.vue
├── components/
│   ├── landing/
│   │   ├── HeroSection.vue
│   │   ├── ProblemSection.vue
│   │   ├── FeaturesSection.vue
│   │   ├── HowItWorksSection.vue
│   │   ├── TestimonialsCarousel.vue
│   │   ├── FaqSection.vue
│   │   └── CtaFooter.vue
│   ├── ui/
│   └── shared/
│       ├── AppNavbar.vue
│       ├── AppFooter.vue
│       └── AppLogo.vue
├── layouts/
│   ├── default.vue
│   ├── auth.vue
│   └── dashboard.vue
├── composables/
│   ├── useScrollAnimation.ts
│   └── useAuth.ts
├── middleware/
│   └── auth.ts
├── server/
│   └── api/
└── public/
    └── images/
```

## Landing Page Sections

### Section 1: Hero
- Full-width gradient background (peach → lavender)
- Headline with supportive messaging
- Subheadline addressing user pain points
- Dual CTAs: Primary "Get Started Free" + secondary "Explore Features"
- Floating decorative shapes
- Stacks vertically on mobile

### Section 2: Problem Statement
- Headline: "We Know Job Hunting Feels Overwhelming"
- 3 pain point cards with icons:
  - Information scattered across platforms
  - No clear starting point
  - Feeling lost and underprepared
- Transition to solution
- Fade-in animation on scroll

### Section 3: Features Breakdown
- 6 feature cards in responsive grid (3x2 desktop, 2x3 tablet, 1x6 mobile)
- Features:
  1. Resume & Cover Letter Templates
  2. AI Interview Simulation
  3. Networking Guides & Templates
  4. Job Search Strategies
  5. Self-Promotion Tools
  6. Career Buddy AI Chat
- Hover effect: lift + shadow

### Section 4: How It Works
- 3-step horizontal stepper (vertical on mobile)
- Steps: Sign Up → Choose Focus → Start Preparing
- Animated step indicators
- Connecting lines between steps

### Section 5: Testimonials Carousel
- Auto-rotating carousel with manual navigation
- Cards: photo, name, role/age, quote
- Touch swipeable on mobile
- Pause on hover

### Section 6: FAQ Accordion
- 5-6 expandable questions
- Smooth animations
- Single open at a time

### Section 7: CTA Footer
- Gradient background
- Final conversion headline
- Prominent CTA button
- Global footer with logo, links, social icons

## Visual Design

### Color Palette (Professional & Trustworthy)
- Primary: `#E3B23C` (mustard yellow) - CTAs, highlights
- Secondary: `#2B5F8A` (medium blue) - accents
- Navy: `#243950` (dark navy) - text, emphasis
- Background: Light blue → Mustard gradient
- Text: `#243950` (navy)
- Muted: `#6B7280` (secondary text)
- Cards: `#FFFFFF` with subtle shadow

### Typography
- Headings: Inter or Plus Jakarta Sans
- Body: Inter
- Responsive font sizes via Tailwind

### Interactivity
- Fade-in on scroll animations
- Hover effects on cards (lift + shadow)
- FAQ accordion expand/collapse
- Testimonials carousel with swipe
- Smooth transitions throughout

## Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions on mobile
- Optimized images for all screen sizes
