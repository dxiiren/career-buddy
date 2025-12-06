# Plan: Company Pages (About Us, Contact, Privacy Policy)

## Overview
Create three static pages linked from the footer's "Company" section. Each page will use the default layout (with AppNavbar and AppFooter), follow existing styling patterns, and include navigation back to the landing page.

---

## Pages to Create

### 1. About Us Page (`/about`)

**File:** `pages/about.vue`

**Content Structure:**
- **Hero Section:** "About Career Buddy" with tagline about the mission
- **Mission Statement:** Why we exist - helping Malaysian youth aged 18-30 navigate their career journey
- **Our Story:** Brief narrative about how Career Buddy was created to address the overwhelming nature of job hunting
- **Values:** 3-4 core values with icons:
  - Accessibility (free for all Malaysian youth)
  - Empowerment (giving tools, not just advice)
  - Community (supportive environment)
  - Innovation (AI-powered guidance)
- **Stats Section:** Reuse metrics (5,000+ users, 94% success rate, 4.9/5 rating)
- **CTA:** Link to register/login

**Key Elements:**
- Uses existing design patterns (gradient backgrounds, cards, icons from lucide-vue-next)
- Consistent typography (font-heading for titles)
- Scroll animations using `useScrollAnimation` composable

---

### 2. Contact Page (`/contact`)

**File:** `pages/contact.vue`

**Content Structure:**
- **Hero Section:** "Get in Touch"
- **Contact Methods:**
  - Email: support@careerbuddy.my (mock)
  - Social Media links (same as footer)
- **Contact Form:**
  - Name field
  - Email field
  - Subject dropdown (General Inquiry, Technical Support, Feedback, Partnership)
  - Message textarea
  - Submit button (shows success toast, no actual submission needed)
- **FAQ Link:** "Have questions? Check our FAQ" linking to landing page #faq
- **Response Time:** "We typically respond within 24-48 hours"

**Key Elements:**
- Form uses shadcn-vue Input, Textarea, Select, Button components
- Form validation for required fields
- Success message after "submission"

---

### 3. Privacy Policy Page (`/privacy`)

**File:** `pages/privacy.vue`

**Content Structure:**
- **Hero Section:** "Privacy Policy" with last updated date
- **Table of Contents:** Jump links to sections
- **Sections:**
  1. **Introduction** - Commitment to privacy
  2. **Information We Collect**
     - Personal info (name, email)
     - Usage data (how you use the platform)
     - Career info (resume data, interview responses)
  3. **How We Use Your Information**
     - Provide and improve services
     - Personalize your experience
     - Send relevant updates
  4. **Data Security**
     - Encryption
     - Secure storage
     - Access controls
  5. **Your Rights**
     - Access your data
     - Request deletion
     - Opt out of communications
  6. **Third-Party Services**
     - Analytics
     - AI services
  7. **Changes to This Policy**
  8. **Contact Us**

**Key Elements:**
- Clean, readable layout
- Proper heading hierarchy (h1, h2, h3)
- Styled lists and paragraphs
- Anchor links for table of contents

---

## Footer Updates

**File:** `components/shared/AppFooter.vue`

Update company links from `href: '#'` to actual routes:
```javascript
company: [
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy Policy', href: '/privacy' },
],
```

Use `NuxtLink` instead of `<a>` for internal navigation.

---

## Tests to Create

**File:** `tests/functional/CompanyPages.test.ts`

### About Us Tests:
- Renders page title and mission statement
- Displays core values section
- Has proper heading hierarchy
- Contains CTA to get started
- Shows stats section

### Contact Page Tests:
- Renders contact form with all fields
- Form validation works (required fields)
- Shows success message on submit
- Displays contact information
- Links to FAQ section

### Privacy Policy Tests:
- Renders all policy sections
- Has table of contents
- Contains last updated date
- Has proper heading structure
- Contact section is present

---

## Shared Patterns to Follow

1. **Layout:** Each page uses default layout (has navbar + footer automatically)
2. **Styling:**
   - Container: `container mx-auto px-4`
   - Section padding: `py-16` or `py-20`
   - Headings: `font-heading font-bold`
   - Cards: `bg-card rounded-2xl border border-border p-6`
3. **Animations:** Use `useScrollAnimation` for fade-in effects
4. **Icons:** Import from `lucide-vue-next`
5. **Components:** Use shadcn-vue (Button, Input, Card, etc.)

---

## Implementation Order

1. Create `pages/about.vue` with tests
2. Create `pages/contact.vue` with tests
3. Create `pages/privacy.vue` with tests
4. Update `AppFooter.vue` to use NuxtLink with correct routes
5. Run all tests to verify

---

## File Summary

| Action | File |
|--------|------|
| Create | `pages/about.vue` |
| Create | `pages/contact.vue` |
| Create | `pages/privacy.vue` |
| Create | `tests/functional/CompanyPages.test.ts` |
| Update | `components/shared/AppFooter.vue` |
