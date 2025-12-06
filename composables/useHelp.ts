import { ref, computed } from 'vue'

export type FAQCategory = 'getting-started' | 'resume' | 'interview' | 'networking' | 'account' | 'billing'

export interface FAQItem {
  id: string
  question: string
  answer: string
  category: FAQCategory
}

export interface FAQCategoryInfo {
  id: FAQCategory
  name: string
  icon: string
  description: string
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface HelpResource {
  title: string
  description: string
  icon: string
  href: string
}

export interface ContactErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const isLoading = ref(false)
const isSubmitting = ref(false)
const searchQuery = ref('')
const selectedCategory = ref<FAQCategory | null>(null)
const contactErrors = ref<ContactErrors>({})

const faqCategories = ref<FAQCategoryInfo[]>([
  { id: 'getting-started', name: 'Getting Started', icon: 'Rocket', description: 'New to Career Buddy? Start here' },
  { id: 'resume', name: 'Resume', icon: 'FileText', description: 'Resume building and optimization' },
  { id: 'interview', name: 'Interview', icon: 'Mic', description: 'Interview preparation and practice' },
  { id: 'networking', name: 'Networking', icon: 'Users', description: 'Professional connections and outreach' },
  { id: 'account', name: 'Account', icon: 'Settings', description: 'Account settings and profile' },
  { id: 'billing', name: 'Billing', icon: 'CreditCard', description: 'Payments and subscriptions' },
])

const faqItems = ref<FAQItem[]>([
  // Getting Started
  {
    id: '1',
    question: 'How do I get started with Career Buddy?',
    answer: 'Getting started is easy! Simply create an account, complete your profile, and explore our dashboard. We recommend starting with the Resume Builder to create your professional resume, then moving on to Interview Prep to practice for your upcoming interviews.',
    category: 'getting-started',
  },
  {
    id: '2',
    question: 'Is Career Buddy free to use?',
    answer: 'Career Buddy offers a free tier with essential features including basic resume templates, limited interview practice questions, and networking message templates. Premium features like AI-powered resume optimization, unlimited interview simulations, and priority support are available with our paid plans.',
    category: 'getting-started',
  },
  {
    id: '3',
    question: 'How do I reset my password?',
    answer: 'To reset your password, go to the login page and click "Forgot Password". Enter your email address and we\'ll send you a link to reset your password. The link expires in 24 hours for security reasons.',
    category: 'getting-started',
  },
  // Resume
  {
    id: '4',
    question: 'How do I create a resume?',
    answer: 'Navigate to the Resume Builder section from your dashboard. You can either start from scratch or choose from our professionally designed templates. Fill in your information section by section, and use our AI suggestions to enhance your content.',
    category: 'resume',
  },
  {
    id: '5',
    question: 'What resume formats are supported?',
    answer: 'You can download your resume in PDF, DOCX, and TXT formats. PDF is recommended for most job applications as it preserves formatting across all devices. DOCX is useful if you need to make additional edits, and TXT is ideal for copy-pasting into application forms.',
    category: 'resume',
  },
  {
    id: '6',
    question: 'How does ATS optimization work?',
    answer: 'Our ATS (Applicant Tracking System) optimization analyzes your resume against common ATS algorithms. It checks for proper formatting, keyword usage, and content structure. We provide specific recommendations to improve your resume\'s chances of passing ATS screenings.',
    category: 'resume',
  },
  // Interview
  {
    id: '7',
    question: 'How do interview simulations work?',
    answer: 'Our interview simulations present you with common interview questions and give you time to practice your responses. You can choose from behavioral, technical, or situational questions. After each session, you\'ll receive feedback on your answers and suggestions for improvement.',
    category: 'interview',
  },
  {
    id: '8',
    question: 'Can I practice with real interview questions?',
    answer: 'Yes! Our question bank includes thousands of real interview questions collected from candidates who\'ve interviewed at various companies. You can filter by industry, role, and company to find the most relevant questions for your target positions.',
    category: 'interview',
  },
  // Networking
  {
    id: '9',
    question: 'How do I use message templates?',
    answer: 'Go to the Networking section and select "Message Templates". Choose a template category (e.g., LinkedIn connection, informational interview request), customize it with your details, and copy it to your clipboard. You can adjust the tone to match your style.',
    category: 'networking',
  },
  {
    id: '10',
    question: 'What is the best way to reach out to recruiters?',
    answer: 'The best approach is to be professional, concise, and specific. Use our recruiter outreach templates as a starting point. Always personalize your message, mention why you\'re interested in their company, and clearly state what you\'re looking for. Follow up politely if you don\'t hear back within a week.',
    category: 'networking',
  },
  // Account
  {
    id: '11',
    question: 'How do I update my profile?',
    answer: 'Go to Settings from the dashboard sidebar. In the Profile Information section, you can update your name, email, and profile picture. Don\'t forget to click "Save Changes" after making updates.',
    category: 'account',
  },
  {
    id: '12',
    question: 'How do I delete my account?',
    answer: 'To delete your account, go to Settings and scroll to the "Danger Zone" section. You\'ll need to type "DELETE" to confirm. Please note that this action is irreversible and all your data including resumes, cover letters, and progress will be permanently deleted.',
    category: 'account',
  },
  // Billing
  {
    id: '13',
    question: 'What payment methods are accepted?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and in some regions, local payment methods. All transactions are securely processed through our payment provider.',
    category: 'billing',
  },
  {
    id: '14',
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel your subscription at any time from Settings > Subscription. Your premium features will remain active until the end of your current billing period. You won\'t be charged again after cancellation.',
    category: 'billing',
  },
])

const helpResources = ref<HelpResource[]>([
  {
    title: 'User Guide',
    description: 'Comprehensive documentation on all features',
    icon: 'BookOpen',
    href: '/docs',
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step video guides for beginners',
    icon: 'PlayCircle',
    href: '/tutorials',
  },
  {
    title: 'Community Forum',
    description: 'Connect with other job seekers',
    icon: 'MessageCircle',
    href: '/community',
  },
  {
    title: 'Email Support',
    description: 'Get help from our support team',
    icon: 'Mail',
    href: 'mailto:support@careerbuddy.com',
  },
])

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function useHelp() {
  const filteredFAQs = computed(() => {
    let result = faqItems.value

    // Filter by category
    if (selectedCategory.value) {
      result = result.filter(item => item.category === selectedCategory.value)
    }

    // Filter by search query
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(
        item =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
      )
    }

    return result
  })

  async function loadHelp() {
    isLoading.value = true
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    isLoading.value = false
  }

  function searchFAQ(query: string) {
    searchQuery.value = query
  }

  function filterByCategory(category: FAQCategory | null) {
    selectedCategory.value = category
  }

  function clearFilters() {
    searchQuery.value = ''
    selectedCategory.value = null
  }

  async function submitContactForm(form: ContactForm): Promise<{ success: boolean }> {
    // Clear previous errors
    contactErrors.value = {}

    // Validate name
    if (!form.name || !form.name.trim()) {
      contactErrors.value.name = 'Name is required'
    }

    // Validate email
    if (!validateEmail(form.email)) {
      contactErrors.value.email = 'Please enter a valid email address'
    }

    // Validate subject
    if (!form.subject || !form.subject.trim()) {
      contactErrors.value.subject = 'Subject is required'
    }

    // Validate message
    if (!form.message || !form.message.trim()) {
      contactErrors.value.message = 'Message is required'
    }

    // If there are errors, don't submit
    if (
      contactErrors.value.name ||
      contactErrors.value.email ||
      contactErrors.value.subject ||
      contactErrors.value.message
    ) {
      return { success: false }
    }

    isSubmitting.value = true

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    isSubmitting.value = false
    return { success: true }
  }

  return {
    // State
    isLoading,
    isSubmitting,
    faqItems,
    faqCategories,
    helpResources,
    searchQuery,
    selectedCategory,
    contactErrors,
    filteredFAQs,
    // Methods
    loadHelp,
    searchFAQ,
    filterByCategory,
    clearFilters,
    submitContactForm,
  }
}
