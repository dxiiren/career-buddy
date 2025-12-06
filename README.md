# Career Buddy

A comprehensive career preparation platform designed for Malaysian youth aged 18-30. Career Buddy provides AI-powered guidance, resume building tools, interview preparation, networking strategies, and job search resources—all in one place.

## Features

- **Dashboard** — Personalized progress tracking with daily tasks and motivational content
- **AI Career Chat** — Interactive chat assistant for career guidance and advice
- **Resume Builder** — Templates, ATS optimization tips, and cover letter guides
- **Interview Prep** — STAR method training, common questions, and AI-powered simulation
- **Job Search** — Platform recommendations, salary ranges, and scam detection
- **Networking** — Message templates, introduction guides, and LinkedIn strategies
- **Self-Promotion** — Personal branding, workplace visibility, and LinkedIn headline ideas

## Tech Stack

- **Framework:** [Nuxt 3](https://nuxt.com) with Vue 3
- **Styling:** [Tailwind CSS](https://tailwindcss.com) with [shadcn-vue](https://www.shadcn-vue.com/)
- **Icons:** [Lucide Vue](https://lucide.dev)
- **Utilities:** [VueUse](https://vueuse.org)
- **Testing:** [Vitest](https://vitest.dev) (unit/functional) + [Playwright](https://playwright.dev) (E2E)

## Project Structure

```
├── app/                 # App entry point
├── assets/css/          # Global styles
├── components/
│   ├── auth/            # Authentication components
│   ├── career-chat/     # AI chat interface
│   ├── dashboard/       # Dashboard widgets
│   ├── help/            # FAQ and support
│   ├── interview/       # Interview preparation
│   ├── job-search/      # Job search resources
│   ├── landing/         # Landing page sections
│   ├── networking/      # Networking guides
│   ├── resume/          # Resume building
│   ├── self-promotion/  # Personal branding
│   ├── settings/        # User settings
│   ├── shared/          # Navbar, footer, etc.
│   └── ui/              # shadcn-vue components
├── composables/         # Shared Vue composables
├── layouts/             # Page layouts
├── pages/               # File-based routing
└── tests/
    ├── e2e/             # Playwright E2E tests
    ├── functional/      # Component tests
    └── unit/            # Composable tests
```

## Getting Started

### Prerequisites

- Node.js 18+ or Bun

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## Testing

```bash
# Run all tests
npm test

# Unit tests only
npm run test:unit

# Functional (component) tests
npm run test:functional

# E2E tests
npm run test:e2e

# E2E tests with UI
npm run test:e2e:ui

# Coverage report
npm run test:coverage
```

## License

Private
