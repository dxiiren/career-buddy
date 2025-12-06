# Dashboard Mobile Responsive Design

## Overview

Full mobile-responsive overhaul of the dashboard to provide optimal UX across phone, tablet, and desktop devices.

## Breakpoints

| Device | Width | Tailwind Prefix |
|--------|-------|-----------------|
| Phone | < 640px | (default) |
| Tablet | 640px - 1024px | `sm:` and `md:` |
| Desktop | > 1024px | `lg:` |

---

## 1. Sidebar & Navigation

### Desktop (> 1024px)
- Fixed sidebar, collapsible via toggle button (current behavior)
- Width: `w-64` expanded, `w-16` collapsed

### Tablet & Phone (< 1024px)
- Sidebar hidden by default (`hidden lg:flex`)
- Hamburger button in header opens slide-out drawer
- Drawer slides in from left as overlay
- Dark backdrop behind drawer (`bg-black/50`)
- Close via X button or tapping backdrop
- Main content has no left margin on mobile

### Implementation
- Add `isMobileMenuOpen` ref state
- Add `hidden lg:flex` to sidebar
- Create mobile drawer component with transitions
- Remove `ml-64` / `ml-16` on mobile (`ml-0 lg:ml-64`)

---

## 2. Top Header

### Desktop (> 1024px)
- Current layout preserved
- Toggle + Search bar + Theme + Bell + Avatar with name/email

### Tablet (640px - 1024px)
- `[Hamburger] [Logo] ---spacer--- [Search icon] [Theme] [Bell] [Avatar]`
- Search icon expands to search bar overlay when tapped
- Hide user name/email text, show avatar only
- Padding: `px-5`

### Phone (< 640px)
- Same as tablet but tighter padding: `px-4`
- Search expands as larger overlay for easier mobile typing

### Implementation
- Add `isSearchOpen` ref state
- Hamburger: `lg:hidden` (only show on mobile/tablet)
- Sidebar toggle: `hidden lg:flex` (only show on desktop)
- Search bar: `hidden lg:flex` on desktop, icon-only on mobile
- User info text: `hidden lg:block`
- Logo in header: `lg:hidden` (only on mobile since sidebar has logo)

---

## 3. Dashboard Grid Layout

### Phone (< 640px)
```
[Welcome Header     ] - full width
[Progress Modules   ] - full width
[Quick Actions      ] - full width
[Daily Tasks        ] - full width
[Recent Activity    ] - full width
[Motivational       ] - full width
[Resume Preview     ] - full width
```
- Single column: `grid-cols-1`
- Gap: `gap-4`
- Main padding: `p-4`

### Tablet (640px - 1024px)
```
[Welcome Header - full width        ]
[Progress Modules - full width      ]
[Quick Actions    ] [Daily Tasks    ]
[Recent Activity  ] [Motivational   ]
[Resume Preview - full width        ]
```
- Two-column grid: `sm:grid-cols-2`
- Gap: `gap-5`
- Main padding: `p-5`

### Desktop (> 1024px)
- Current bento 12-column layout preserved
- `lg:grid-cols-12` with col-span classes
- Gap: `gap-6`
- Main padding: `p-6`

### Implementation
Change `pages/dashboard.vue` grid:
```vue
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
```

Update col-spans:
- Welcome Header: `sm:col-span-2 lg:col-span-12`
- Progress Modules: `sm:col-span-2 lg:col-span-7`
- Quick Actions: `lg:col-span-5` (uses sm:grid-cols-2 cell on tablet)
- Daily Tasks: stays in right column flow
- Recent Activity: `lg:col-span-6`
- Motivational: `lg:col-span-6`
- Resume Preview: `sm:col-span-2 lg:col-span-12`

---

## 4. Card Internals

### WelcomeHeader.vue
- Phone: Stack greeting text + progress bar vertically
- Tablet/Desktop: Side by side layout
- Responsive padding: `p-4 sm:p-5 lg:p-6`
- Responsive text: `text-xl sm:text-2xl lg:text-3xl` for heading

### ProgressModules.vue
- Phone: 1-column module list (`grid-cols-1`)
- Tablet: 2-column module grid (`sm:grid-cols-2`)
- Desktop: 2-column (current)
- Responsive padding: `p-4 sm:p-5 lg:p-6`

### QuickActions.vue
- Phone: 2x2 grid with smaller icons
- Tablet/Desktop: current layout
- Responsive icon size: `h-5 w-5 sm:h-6 sm:w-6`
- Responsive padding: `p-4 sm:p-5 lg:p-6`

### DailyTasks.vue
- Responsive padding: `p-4 sm:p-5 lg:p-6`
- Responsive text: `text-sm sm:text-base`
- Checkbox items stack nicely (already works)

### RecentActivity.vue
- Responsive padding: `p-4 sm:p-5 lg:p-6`
- Responsive text sizes
- Activity items flow naturally

### MotivationalSection.vue
- Responsive padding: `p-4 sm:p-5 lg:p-6`
- Responsive quote text size

### ResumePreview.vue
- Phone: Simplify - show core info only, hide secondary details
- Use `hidden sm:block` for less critical info
- Responsive padding and text sizes

---

## 5. Implementation Tasks

### Task 1: layouts/dashboard.vue - Sidebar & Header Responsive

**Changes:**
1. Add state for mobile menu:
   ```ts
   const isMobileMenuOpen = ref(false)
   const isSearchOpen = ref(false)
   ```

2. Desktop sidebar (line 52-109): Add `hidden lg:flex` to aside element
   ```vue
   <aside class="hidden lg:flex fixed left-0 top-0 h-screen ...">
   ```

3. Add mobile slide-out drawer after the desktop sidebar:
   ```vue
   <!-- Mobile Drawer Overlay -->
   <Transition name="fade">
     <div
       v-if="isMobileMenuOpen"
       class="fixed inset-0 bg-black/50 z-40 lg:hidden"
       @click="isMobileMenuOpen = false"
     />
   </Transition>

   <!-- Mobile Drawer -->
   <Transition name="slide">
     <aside
       v-if="isMobileMenuOpen"
       class="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-50 lg:hidden"
     >
       <!-- Same content as desktop sidebar with close button -->
     </aside>
   </Transition>
   ```

4. Main content margin (line 112-115): Change from fixed margin to responsive
   ```vue
   <div class="flex-1 flex flex-col transition-all duration-300 ml-0 lg:ml-64"
     :class="{ 'lg:ml-16': isCollapsed }"
   >
   ```

5. Header (line 117-162): Make responsive
   - Change padding: `px-4 sm:px-5 lg:px-6`
   - Add hamburger for mobile (lg:hidden):
     ```vue
     <button class="lg:hidden h-10 w-10 ..." @click="isMobileMenuOpen = true">
       <Menu class="h-5 w-5" />
     </button>
     ```
   - Add mobile logo after hamburger: `<div class="lg:hidden flex items-center gap-2">...</div>`
   - Desktop sidebar toggle: Add `hidden lg:flex`
   - Search bar: Wrap in `hidden lg:flex`, add search icon button for mobile
   - Add expandable search overlay for mobile
   - User name/email: Add `hidden lg:block`

6. Main content padding (line 165): Change `p-6` to `p-4 sm:p-5 lg:p-6`

7. Add transition styles:
   ```css
   .fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
   .fade-enter-from, .fade-leave-to { opacity: 0; }
   .slide-enter-active, .slide-leave-active { transition: transform 0.3s; }
   .slide-enter-from, .slide-leave-to { transform: translateX(-100%); }
   ```

---

### Task 2: pages/dashboard.vue - Grid Layout

**Changes:**
1. Main grid (line 54): Change from `grid-cols-1 lg:grid-cols-12` to:
   ```vue
   <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
   ```

2. Welcome Header wrapper (line 56-65): Add tablet span
   ```vue
   <div class="sm:col-span-2 lg:col-span-12 transition-all duration-500" ...>
   ```

3. Progress Modules wrapper (line 68-76): Add tablet span
   ```vue
   <div class="sm:col-span-2 lg:col-span-7 transition-all duration-500" ...>
   ```

4. Right Column wrapper (line 79): Remove the wrapper div, make Quick Actions and Daily Tasks separate grid items
   - Quick Actions: standalone (takes 1 cell on tablet)
   - Daily Tasks: standalone (takes 1 cell on tablet)
   - Both get `lg:col-span-5` removed, rely on `lg:grid-cols-12` for desktop positioning

   OR restructure to:
   ```vue
   <!-- Quick Actions -->
   <div class="lg:col-span-5 lg:row-span-1 transition-all duration-500" ...>

   <!-- Daily Tasks -->
   <div class="lg:col-span-5 lg:row-start-2 lg:col-start-8 transition-all duration-500" ...>
   ```

   Simpler approach - keep right column but make it span:
   ```vue
   <div class="sm:col-span-1 lg:col-span-5 flex flex-col gap-4 sm:gap-5 lg:gap-6">
   ```

5. Recent Activity (line 100-107): Add spans
   ```vue
   <div class="lg:col-span-6 transition-all duration-500" ...>
   ```

6. Motivational (line 110-117): Add spans
   ```vue
   <div class="lg:col-span-6 transition-all duration-500" ...>
   ```

7. Resume Preview (line 120-128): Add tablet span
   ```vue
   <div class="sm:col-span-2 lg:col-span-12 transition-all duration-500" ...>
   ```

---

### Task 3: components/dashboard/WelcomeHeader.vue

**Changes:**
1. Outer padding (line 22): Change `p-6 lg:p-8` to `p-4 sm:p-5 lg:p-6 xl:p-8`

2. Heading text (line 42-44): Make responsive
   ```vue
   <h1 class="text-xl sm:text-2xl lg:text-3xl font-heading font-bold mb-1 sm:mb-2">
   ```

3. Subtitle (line 45-47): Make responsive
   ```vue
   <p class="text-muted-foreground text-sm sm:text-base lg:text-lg">
   ```

4. Progress ring container (line 51-85): Make slightly smaller on mobile
   - Ring size: `w-20 h-20 sm:w-24 sm:h-24`
   - SVG viewBox stays same, just container shrinks
   - Percentage text: `text-lg sm:text-xl`

---

### Task 4: components/dashboard/ProgressModules.vue

**Changes:**
1. Outer padding (line 33): Change `p-6` to `p-4 sm:p-5 lg:p-6`

2. Title (line 63): Make responsive
   ```vue
   <h2 class="text-base sm:text-lg font-heading font-semibold mb-3 sm:mb-4">
   ```

3. Module grid (line 64): Already has `grid-cols-1 sm:grid-cols-2` - keep as is

4. Module cards (line 65-92): Make padding responsive
   ```vue
   class="group rounded-xl border border-border p-3 sm:p-4 hover:border-primary/50 ..."
   ```

5. Module icon container (line 72-76): Responsive sizing
   ```vue
   class="h-8 w-8 sm:h-10 sm:w-10 rounded-lg ..."
   ```

6. Icon inside: `class="h-4 w-4 sm:h-5 sm:w-5"`

---

### Task 5: components/dashboard/QuickActions.vue

**Changes:**
1. Outer padding (line 22): Change `p-6` to `p-4 sm:p-5 lg:p-6`

2. Title (line 25): Make responsive
   ```vue
   <h2 class="text-base sm:text-lg font-heading font-semibold mb-3 sm:mb-4">
   ```

3. Action buttons container (line 33): Already uses `flex flex-wrap gap-2` - good

4. Action buttons (line 34-43): Make responsive
   ```vue
   class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg ..."
   ```

5. Icon size: `class="h-3.5 w-3.5 sm:h-4 sm:w-4"`

6. Button text: Add `text-xs sm:text-sm`

---

### Task 6: components/dashboard/DailyTasks.vue

**Changes:**
1. Outer padding (line 125): Change `p-6` to `p-4 sm:p-5 lg:p-6`

2. Title (line 129): Make responsive
   ```vue
   <h2 class="text-base sm:text-lg font-heading font-semibold">
   ```

3. Task text (line 191-196): Already `text-sm` - good

4. Add button (line 243-250): Make touch-friendly
   ```vue
   class="mt-3 w-full flex items-center justify-center gap-2 py-2.5 sm:py-2 text-sm ..."
   ```

---

### Task 7: components/dashboard/RecentActivity.vue

**Changes:**
1. Outer padding (line 62): Change `p-6` to `p-4 sm:p-5 lg:p-6`

2. Title (line 65): Make responsive
   ```vue
   <h2 class="text-base sm:text-lg font-heading font-semibold mb-3 sm:mb-4">
   ```

3. Activity icon container (line 94): Responsive
   ```vue
   class="h-7 w-7 sm:h-8 sm:w-8 rounded-lg ..."
   ```

4. Icon: `class="h-3.5 w-3.5 sm:h-4 sm:w-4"`

---

### Task 8: components/dashboard/MotivationalSection.vue

**Changes:**
1. Outer padding (line 82): Change `p-6` to `p-4 sm:p-5 lg:p-6`

2. Quote text (line 120-122): Make responsive
   ```vue
   <p class="text-sm sm:text-base font-heading italic ...">
   ```

3. Tip text (line 136-138): Already `text-sm` - good

4. Inner card padding (lines 114, 119, 135): Change `p-4` to `p-3 sm:p-4`

---

### Task 9: components/dashboard/ResumePreview.vue

**Changes:**
1. Outer padding (line 16): Change `p-6` to `p-4 sm:p-5 lg:p-6`

2. Title (line 20): Make responsive
   ```vue
   <h2 class="text-base sm:text-lg font-heading font-semibold">
   ```

3. Edit button (line 21-26): Make touch-friendly, responsive text
   ```vue
   class="text-xs sm:text-sm text-primary hover:underline flex items-center gap-1 py-1"
   ```

4. Resume icon container (line 45): Responsive
   ```vue
   class="h-10 w-10 sm:h-12 sm:w-12 rounded-lg ..."
   ```

5. Icon: `class="h-5 w-5 sm:h-6 sm:w-6"`

6. Email (line 53): Hide on very small phones
   ```vue
   <p class="text-xs sm:text-sm text-muted-foreground truncate">{{ resume.email }}</p>
   ```

---

## 6. Testing Checklist

- [ ] Phone (390px width): All cards stack, drawer works, header compact
- [ ] Tablet (768px width): Two-column grid, drawer works, search icon
- [ ] Desktop (1440px width): Current bento layout preserved, sidebar fixed
- [ ] Drawer opens/closes smoothly with backdrop
- [ ] Search expands/collapses properly on mobile
- [ ] No horizontal scroll on any device
- [ ] Touch targets are at least 44px on mobile
