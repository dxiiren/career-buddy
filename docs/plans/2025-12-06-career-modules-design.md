# Career Buddy Modules - Implementation Plan

## Overview

This plan covers implementation of all 7 career modules (~20 pages) using TDD. Each module follows existing patterns: skeleton loading, dark/light mode, staggered animations, and the established component architecture.

## Implementation Order (by complexity)

1. **Settings** (1 page) - Establish patterns for form-based pages
2. **Networking & Communication** (2 pages) - Simple content + templates
3. **Self-Promotion** (3 pages) - Content pages with tips
4. **Job Search Strategy** (4 pages) - Content + data tables
5. **Interview Preparation** (3 pages) - Question bank + basic simulation
6. **Resume & Cover Letter** (4 pages) - Complex builder with live preview
7. **Career Buddy AI Chat** (1 page) - Dedicated chat interface

---

## Phase 1: Settings Module

### Page: `/settings`

**Components:**
- `components/settings/ProfileSection.vue` - Name, email, avatar upload
- `components/settings/PasswordSection.vue` - Change password form
- `components/settings/PreferencesSection.vue` - Theme toggle, notifications
- `components/settings/DangerZone.vue` - Delete account

**Composable:**
- `composables/useSettings.ts` - Profile state, update functions

**Tests (TDD):**
```
tests/unit/useSettings.test.ts
tests/functional/SettingsComponents.test.ts
```

---

## Phase 2: Networking & Communication Module

### Page 1: `/networking` (Overview)

**Components:**
- `components/networking/NetworkingHero.vue` - Module intro
- `components/networking/WhyNetworkingSection.vue` - Benefits with icons
- `components/networking/NetworkingTypesSection.vue` - Online vs offline
- `components/networking/IntroductionGuide.vue` - How to introduce yourself
- `components/networking/OvercomingFearsSection.vue` - Common fears + solutions

### Page 2: `/networking/templates` (Message Templates)

**Components:**
- `components/networking/TemplateCategory.vue` - Category card (collapsible)
- `components/networking/MessageTemplate.vue` - Template with copy, edit, tone
- `components/networking/ToneSelector.vue` - Formal/friendly/confident toggle

**Composable:**
- `composables/useNetworking.ts` - Templates data, copy function, tone state

**Data structure:**
```typescript
interface MessageTemplate {
  id: string
  category: 'senior' | 'hr' | 'thank-you' | 'linkedin' | 'cold' | 'follow-up'
  title: string
  template: string
  placeholders: string[] // e.g., ['{name}', '{company}']
  tones: {
    formal: string
    friendly: string
    confident: string
  }
}
```

**Tests:**
```
tests/unit/useNetworking.test.ts
tests/functional/NetworkingComponents.test.ts
```

---

## Phase 3: Self-Promotion Module

### Page 1: `/self-promotion` (Personal Branding)

**Components:**
- `components/self-promotion/BrandingHero.vue`
- `components/self-promotion/StrengthsDiscovery.vue` - Interactive quiz/checklist
- `components/self-promotion/StoryCreator.vue` - Your story template
- `components/self-promotion/AchievementTips.vue` - How to talk about achievements

### Page 2: `/self-promotion/linkedin` (LinkedIn Optimization)

**Components:**
- `components/self-promotion/LinkedInHeadline.vue` - Examples + generator
- `components/self-promotion/AboutMeSection.vue` - Template + tips
- `components/self-promotion/FeaturedSection.vue` - What to showcase
- `components/self-promotion/PostIdeas.vue` - Content ideas for fresh grads

### Page 3: `/self-promotion/workplace` (Workplace Expectations)

**Components:**
- `components/self-promotion/FirstDayGuide.vue`
- `components/self-promotion/TalkingToSeniors.vue`
- `components/self-promotion/HandlingFeedback.vue`
- `components/self-promotion/ProfessionalEtiquette.vue`
- `components/self-promotion/EmailTemplates.vue`

**Composable:**
- `composables/useSelfPromotion.ts`

**Tests:**
```
tests/unit/useSelfPromotion.test.ts
tests/functional/SelfPromotionComponents.test.ts
```

---

## Phase 4: Job Search Strategy Module

### Page 1: `/job-search` (Overview)

**Components:**
- `components/job-search/SearchHero.vue`
- `components/job-search/WhereToSearch.vue` - Platform list
- `components/job-search/FilteringTips.vue`
- `components/job-search/CommonMistakes.vue`

### Page 2: `/job-search/platforms` (Platform Guide)

**Components:**
- `components/job-search/PlatformCard.vue` - Expandable card per platform
- `components/job-search/PlatformComparison.vue` - Comparison table

**Data structure:**
```typescript
interface JobPlatform {
  id: string
  name: string
  logo: string
  pros: string[]
  cons: string[]
  howToUse: string[]
  whoShouldUse: string
  filters: string[]
  url: string
}
```

### Page 3: `/job-search/salary` (Salary & Negotiation)

**Components:**
- `components/job-search/SalaryRanges.vue` - By industry/role
- `components/job-search/CostOfLiving.vue` - City comparison
- `components/job-search/ExpectedSalaryAnswer.vue` - Script templates
- `components/job-search/NegotiationScripts.vue`

### Page 4: `/job-search/scams` (Job Scam Awareness)

**Components:**
- `components/job-search/ScamTactics.vue` - Warning signs
- `components/job-search/RealExamples.vue` - Case studies
- `components/job-search/VerificationChecklist.vue`
- `components/job-search/WhatToDo.vue` - If suspicious

**Composable:**
- `composables/useJobSearch.ts`

**Tests:**
```
tests/unit/useJobSearch.test.ts
tests/functional/JobSearchComponents.test.ts
```

---

## Phase 5: Interview Preparation Module

### Page 1: `/interview` (Overview)

**Components:**
- `components/interview/InterviewHero.vue`
- `components/interview/PurposeSection.vue` - What interviews are for
- `components/interview/TypesOfInterviews.vue` - Phone, video, panel, etc.
- `components/interview/DosAndDonts.vue`
- `components/interview/PrepSteps.vue` - 3-step preparation guide

### Page 2: `/interview/questions` (Question Bank)

**Components:**
- `components/interview/QuestionCategory.vue` - Collapsible category
- `components/interview/QuestionCard.vue` - Question with answer, structure, tips
- `components/interview/StarMethod.vue` - STAR method explainer

**Data structure:**
```typescript
interface InterviewQuestion {
  id: string
  category: 'hr' | 'behavioral' | 'internship' | 'fresh-grad' | 'salary'
  question: string
  exampleAnswer: string
  answerStructure: string[]
  tips: string[]
}
```

### Page 3: `/interview/simulation` (AI Interview Simulation)

**Components:**
- `components/interview/SimulationSetup.vue` - Mode selection (webcam/text)
- `components/interview/QuestionDisplay.vue` - Current question + timer
- `components/interview/AnswerInput.vue` - Text area or voice recording
- `components/interview/ScoreBreakdown.vue` - Confidence, clarity, fluency, structure
- `components/interview/ImprovementTips.vue`

**Composable:**
- `composables/useInterview.ts` - Questions data, simulation state, scoring

**Tests:**
```
tests/unit/useInterview.test.ts
tests/functional/InterviewComponents.test.ts
```

---

## Phase 6: Resume & Cover Letter Module

### Page 1: `/resume` (Overview)

**Components:**
- `components/resume/ResumeHero.vue`
- `components/resume/WhatIsResume.vue`
- `components/resume/WhatEmployersLookFor.vue`
- `components/resume/CommonMistakes.vue`
- `components/resume/ChooseTemplateButton.vue` - CTA to templates page

### Page 2: `/resume/templates` (Templates Gallery)

**Components:**
- `components/resume/TemplateGallery.vue` - Grid of templates
- `components/resume/TemplateCard.vue` - Preview + select
- `components/resume/TemplateFilter.vue` - Fresh grad/internship/career switch

**Data structure:**
```typescript
interface ResumeTemplate {
  id: string
  name: string
  category: 'fresh-grad' | 'internship' | 'no-experience' | 'career-switch'
  preview: string // image path
  description: string
}
```

### Page 3: `/resume/builder` (Resume Builder)

**Components:**
- `components/resume/BuilderLayout.vue` - Two-column layout
- `components/resume/PersonalInfoForm.vue`
- `components/resume/SummaryForm.vue`
- `components/resume/EducationForm.vue` - Add/remove entries
- `components/resume/ExperienceForm.vue` - Add/remove entries
- `components/resume/SkillsForm.vue` - Tag input
- `components/resume/AchievementsForm.vue`
- `components/resume/LivePreview.vue` - Real-time preview
- `components/resume/ExportButtons.vue` - PDF/Save
- `components/resume/AiSuggestions.vue` - "Add achievement", "Quantify result"

**Composable:**
- `composables/useResumeBuilder.ts` - Form state, validation, PDF generation

**Data structure:**
```typescript
interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    linkedin?: string
    website?: string
  }
  summary: string
  education: EducationEntry[]
  experience: ExperienceEntry[]
  skills: string[]
  achievements: string[]
  templateId: string
}
```

### Page 4: `/cover-letters` (Cover Letter Builder)

**Components:**
- `components/cover-letter/TemplateGallery.vue`
- `components/cover-letter/IntroExamples.vue`
- `components/cover-letter/BodyExamples.vue`
- `components/cover-letter/ClosingExamples.vue`
- `components/cover-letter/AutoFillButton.vue` - From resume
- `components/cover-letter/CoverLetterEditor.vue`
- `components/cover-letter/ExportButtons.vue`

**Composable:**
- `composables/useCoverLetter.ts`

**Tests:**
```
tests/unit/useResumeBuilder.test.ts
tests/unit/useCoverLetter.test.ts
tests/functional/ResumeComponents.test.ts
tests/functional/CoverLetterComponents.test.ts
```

---

## Phase 7: Career Buddy AI Chat

### Page: `/ai-chat` (Dedicated Chat Page)

**Components:**
- `components/ai-chat/ChatHero.vue` - Search bar "Ask me anything..."
- `components/ai-chat/QuickQuestions.vue` - Pre-built question buttons
- `components/ai-chat/ChatWindow.vue` - Full chat interface
- `components/ai-chat/RecentChats.vue` - Chat history
- `components/ai-chat/SavedTips.vue` - Bookmarked responses

**Composable:**
- `composables/useAiChat.ts` - Chat history, send message, save tips

**Tests:**
```
tests/unit/useAiChat.test.ts
tests/functional/AiChatComponents.test.ts
```

---

## Shared Patterns (Apply to All)

### 1. Page Structure
```vue
<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const { isLoading, data, loadData } = useModuleComposable()

onMounted(async () => {
  await loadData()
})
</script>

<template>
  <div class="space-y-6">
    <ModuleHero :loading="isLoading" />
    <ModuleContent :loading="isLoading" :data="data" />
  </div>
</template>
```

### 2. Skeleton Loading Pattern
- Every component accepts `loading` prop
- Shows `<Skeleton>` components when loading
- Uses `<Transition>` for smooth switch

### 3. Dark/Light Mode
- Use Tailwind's `dark:` prefix
- Use CSS variables from `main.css`
- Test both themes

### 4. Staggered Animations
- Cards fade in with 100ms delay each
- Use `transition-all duration-500`

### 5. TDD Approach
For each component:
1. Write failing test first
2. Implement minimal code to pass
3. Refactor
4. Repeat

---

## New UI Components Needed

1. **Tabs** - For category switching
2. **Dialog/Modal** - For confirmations
3. **Tooltip** - For hints
4. **Badge** - For categories/tags
5. **Textarea** - For long-form input
6. **Select** - For dropdowns
7. **Switch** - For toggles
8. **Slider** - For ranges (salary)

---

## File Structure After Implementation

```
pages/
├── settings.vue
├── networking/
│   ├── index.vue
│   └── templates.vue
├── self-promotion/
│   ├── index.vue
│   ├── linkedin.vue
│   └── workplace.vue
├── job-search/
│   ├── index.vue
│   ├── platforms.vue
│   ├── salary.vue
│   └── scams.vue
├── interview/
│   ├── index.vue
│   ├── questions.vue
│   └── simulation.vue
├── resume/
│   ├── index.vue
│   ├── templates.vue
│   └── builder.vue
├── cover-letters.vue
└── ai-chat.vue

components/
├── settings/
├── networking/
├── self-promotion/
├── job-search/
├── interview/
├── resume/
├── cover-letter/
└── ai-chat/

composables/
├── useSettings.ts
├── useNetworking.ts
├── useSelfPromotion.ts
├── useJobSearch.ts
├── useInterview.ts
├── useResumeBuilder.ts
├── useCoverLetter.ts
└── useAiChat.ts

tests/
├── unit/
│   ├── useSettings.test.ts
│   ├── useNetworking.test.ts
│   ├── useSelfPromotion.test.ts
│   ├── useJobSearch.test.ts
│   ├── useInterview.test.ts
│   ├── useResumeBuilder.test.ts
│   ├── useCoverLetter.test.ts
│   └── useAiChat.test.ts
└── functional/
    ├── SettingsComponents.test.ts
    ├── NetworkingComponents.test.ts
    ├── SelfPromotionComponents.test.ts
    ├── JobSearchComponents.test.ts
    ├── InterviewComponents.test.ts
    ├── ResumeComponents.test.ts
    ├── CoverLetterComponents.test.ts
    └── AiChatComponents.test.ts
```

---

## Estimated Scope

- **Pages:** 18 new pages
- **Components:** ~60 new components
- **Composables:** 8 new composables
- **Test files:** 16 new test files
- **UI Components:** 8 new shadcn components

---

## TDD Workflow Per Phase

1. Create composable test file with failing tests
2. Implement composable to pass tests
3. Create functional test file for components with failing tests
4. Implement components to pass tests
5. Create page and wire up components
6. Manual testing (dark/light mode, skeleton loading, responsive)
7. Commit phase

---

## Ready to Execute

This plan will be executed phase by phase using TDD. Each phase builds on the previous, establishing patterns that subsequent phases will reuse.

Start with Phase 1 (Settings) to establish form patterns, then proceed sequentially through each module.
