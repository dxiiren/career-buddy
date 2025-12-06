# Authentication & Dashboard Design

## Overview

Implement login, register, and dashboard pages for Career Buddy application with:
- Split-screen authentication pages
- Bento box dashboard layout ("Career Command Center")
- Shimmer skeleton loading states
- Hardcoded credentials (admin/admin)

---

## Authentication Pages

### Layout Structure
- **Split-screen design**: Form (60%) | Brand panel (40%)
- **Brand panel**: Gradient background (mustard → navy), logo, tagline, floating shapes

### Login Page (`/login`)
- Header: "Welcome back" + subtitle
- Fields: Username, Password (with toggle)
- Checkbox: "Remember me"
- Button: "Sign In" (mustard primary)
- Link: "Don't have an account? Register"
- Error: Inline error with shake animation

### Register Page (`/register`)
- Header: "Create your account" + subtitle
- Fields: Full name, Email, Password, Confirm password
- Button: "Create Account"
- Link: "Already have an account? Sign in"

### Auth Logic
- Credentials: `admin` / `admin`
- Success: Redirect to `/dashboard`
- Failure: Show error message
- State: `useAuth` composable

---

## Dashboard Design

### Concept
"Career Command Center" - All-in-one career management hub

### Layout
Bento box grid (CSS Grid) with responsive breakpoints

### Grid Structure (Desktop)
```
┌─────────────────────────────────────────────────────┐
│            Welcome Header (full width)              │
├───────────────────────────┬─────────────────────────┤
│                           │     Quick Actions       │
│    Progress Modules       │─────────────────────────│
│    (6 module cards)       │     Daily Tasks         │
│                           │                         │
├───────────────────────────┼─────────────────────────┤
│   Recent Activity         │  Motivational Section   │
├───────────────────────────┼─────────────────────────┤
│   Resume Preview          │      (reserved)         │
└───────────────────────────┴─────────────────────────┘
                                    💬 AI Buddy (floating)
```

### Sections

#### 1. Welcome Header
- Greeting: "Welcome back, Akmal!"
- Subtitle: "Let's continue your career prep."
- Progress ring: "45% completed"

#### 2. Progress Modules (6 tiles)
| Module | Progress | CTA |
|--------|----------|-----|
| Resume | 60% | Continue Editing |
| Cover Letter | 30% | Finish Cover Letter |
| Interview Prep | 20% | Practise Now |
| Networking | 10% | Try a Template |
| Job Search Strategy | 50% | Continue Guide |
| Self-Promotion | 15% | Improve LinkedIn |

#### 3. Quick Actions (5 buttons)
- Write Resume
- Practise Interview
- Generate Cover Letter
- Send Networking Message
- Ask Buddy (AI Chat)

#### 4. Daily Tasks
- "Complete 1 interview answer"
- "Update your LinkedIn headline"
- "Apply to 2 suitable jobs"
- Mark as done functionality

#### 5. Recent Activity
- Edited resume: Yesterday
- Practised 3 interview questions
- Generated 1 message template
- Saved 2 jobs

#### 6. Motivational Section
- Quote: "Small progress is still progress."
- Tip of the day

#### 7. Resume Preview
- Small card showing current resume info

#### 8. AI Buddy Widget
- Floating chat bubble (bottom-right)
- Quick prompts
- "Stuck? Ask me anything."

### Responsive Breakpoints
- Desktop (1024px+): Full bento grid
- Tablet (768-1023px): 2-column stacked
- Mobile (<768px): Single column

### Skeleton Loading
- Shimmer animation style
- 1-1.5s simulated delay
- Cards fade in with scale animation

---

## Components to Create

### New shadcn Components Needed
- `Input` - Form inputs
- `Label` - Form labels
- `Skeleton` - Loading states
- `Checkbox` - Remember me
- `Progress` - Progress bars/rings
- `Avatar` - User avatar

### Custom Components
- `AuthLayout.vue` - Split-screen layout
- `LoginForm.vue` - Login form
- `RegisterForm.vue` - Register form
- `DashboardLayout.vue` - Dashboard wrapper
- `WelcomeHeader.vue` - Dashboard header
- `ProgressModules.vue` - Module progress grid
- `QuickActions.vue` - Action buttons
- `DailyTasks.vue` - Task checklist
- `RecentActivity.vue` - Activity feed
- `MotivationalSection.vue` - Quotes/tips
- `ResumePreview.vue` - Resume card
- `AiBuddyWidget.vue` - Floating chat

### Composables
- `useAuth.ts` - Authentication state
- `useDashboard.ts` - Dashboard data (mock)

---

## File Structure

```
pages/
├── login.vue
├── register.vue
└── dashboard.vue

components/
├── auth/
│   ├── AuthLayout.vue
│   ├── LoginForm.vue
│   └── RegisterForm.vue
├── dashboard/
│   ├── WelcomeHeader.vue
│   ├── ProgressModules.vue
│   ├── QuickActions.vue
│   ├── DailyTasks.vue
│   ├── RecentActivity.vue
│   ├── MotivationalSection.vue
│   ├── ResumePreview.vue
│   └── AiBuddyWidget.vue
└── ui/
    ├── input/
    ├── label/
    ├── skeleton/
    ├── checkbox/
    ├── progress/
    └── avatar/

composables/
├── useAuth.ts
└── useDashboard.ts
```

---

## Color Palette Reference

- Primary (mustard): `hsl(43 76% 56%)`
- Secondary (blue): `hsl(207 52% 45%)`
- Navy: `#243950`
- Success: Green tones for progress
- Muted: For skeleton/secondary text
