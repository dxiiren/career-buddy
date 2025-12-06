import { ref } from 'vue'

export interface SearchPlatform {
  name: string
  description: string
}

export interface CommonMistake {
  mistake: string
  solution: string
}

export interface JobPlatform {
  id: string
  name: string
  pros: string[]
  cons: string[]
  howToUse: string[]
  whoShouldUse: string
}

export interface SalaryRange {
  role: string
  industry: string
  minSalary: number
  maxSalary: number
}

export interface CityLiving {
  city: string
  averageRent: number
  averageFood: number
}

export interface SalaryScript {
  scenario: string
  script: string
}

export interface NegotiationScript {
  situation: string
  whatToSay: string
}

export interface ScamTactic {
  sign: string
  explanation: string
}

export interface ScamExample {
  title: string
  description: string
  redFlags: string[]
}

const isLoading = ref(false)

const searchPlatforms = ref<SearchPlatform[]>([
  { name: 'LinkedIn', description: 'Professional networking and job postings' },
  { name: 'JobStreet', description: 'Popular job portal in Southeast Asia' },
  { name: 'Indeed', description: 'Global job search engine with extensive listings' },
  { name: 'Glassdoor', description: 'Company reviews and salary insights' },
  { name: 'Company Websites', description: 'Direct applications to companies you admire' },
  { name: 'Career Fairs', description: 'Face-to-face networking opportunities' },
])

const filteringTips = ref<string[]>([
  'Use specific job titles rather than generic terms',
  'Set location filters to your preferred work area',
  'Filter by experience level (entry-level, fresh graduate)',
  'Use salary range filters when available',
  'Save searches and set up job alerts',
  'Check the posting date - focus on recent listings',
  'Use Boolean operators: AND, OR, NOT for precise results',
])

const commonMistakes = ref<CommonMistake[]>([
  {
    mistake: 'Applying to every job without reading requirements',
    solution: 'Read the full job description and only apply if you meet at least 70% of requirements',
  },
  {
    mistake: 'Using the same resume for all applications',
    solution: 'Tailor your resume to match keywords in each job posting',
  },
  {
    mistake: 'Not following up after applying',
    solution: 'Send a brief follow-up email 1-2 weeks after applying',
  },
  {
    mistake: 'Ignoring company culture and values',
    solution: 'Research the company thoroughly before applying',
  },
  {
    mistake: 'Applying only online',
    solution: 'Network and reach out to employees for referrals',
  },
])

const platforms = ref<JobPlatform[]>([
  {
    id: 'linkedin',
    name: 'LinkedIn',
    pros: ['Largest professional network', 'Easy Apply feature', 'Company insights', 'Salary estimates'],
    cons: ['High competition', 'Can be overwhelming', 'Premium features cost money'],
    howToUse: [
      'Optimize your profile with keywords',
      'Set job alerts for your target roles',
      'Enable "Open to Work" badge',
      'Connect with recruiters in your industry',
    ],
    whoShouldUse: 'Everyone - essential for professional networking',
  },
  {
    id: 'jobstreet',
    name: 'JobStreet',
    pros: ['Strong in SEA region', 'Many local companies', 'Good for fresh grads'],
    cons: ['Interface can be outdated', 'Less global opportunities'],
    howToUse: [
      'Create a complete profile',
      'Upload resume in PDF format',
      'Apply filters for entry-level positions',
      'Check daily for new postings',
    ],
    whoShouldUse: 'Job seekers in Southeast Asia',
  },
  {
    id: 'indeed',
    name: 'Indeed',
    pros: ['Aggregates from multiple sources', 'Company reviews', 'Salary information'],
    cons: ['Some listings may be duplicates', 'Quality varies'],
    howToUse: [
      'Upload your resume for quick apply',
      'Use advanced search filters',
      'Set up job alerts',
      'Research company reviews before applying',
    ],
    whoShouldUse: 'Anyone looking for comprehensive job listings',
  },
])

const salaryRanges = ref<SalaryRange[]>([
  { role: 'Software Engineer', industry: 'Technology', minSalary: 4000, maxSalary: 7000 },
  { role: 'Data Analyst', industry: 'Technology', minSalary: 3500, maxSalary: 5500 },
  { role: 'Marketing Executive', industry: 'Marketing', minSalary: 3000, maxSalary: 4500 },
  { role: 'Accountant', industry: 'Finance', minSalary: 3200, maxSalary: 5000 },
  { role: 'HR Executive', industry: 'Human Resources', minSalary: 2800, maxSalary: 4200 },
  { role: 'Graphic Designer', industry: 'Creative', minSalary: 2500, maxSalary: 4000 },
])

const costOfLiving = ref<CityLiving[]>([
  { city: 'Singapore', averageRent: 2500, averageFood: 600 },
  { city: 'Kuala Lumpur', averageRent: 800, averageFood: 400 },
  { city: 'Bangkok', averageRent: 600, averageFood: 350 },
  { city: 'Jakarta', averageRent: 500, averageFood: 300 },
  { city: 'Hong Kong', averageRent: 3000, averageFood: 800 },
])

const salaryAnswerScripts = ref<SalaryScript[]>([
  {
    scenario: 'When asked about expected salary early in the process',
    script: "I'm flexible on salary and more focused on finding the right fit. Could you share the budget range for this role so we can see if we're aligned?",
  },
  {
    scenario: 'When you need to give a number',
    script: "Based on my research and the market rate for this role, I'm looking for something in the range of $X to $Y, but I'm open to discussion based on the total compensation package.",
  },
  {
    scenario: 'When asked about current salary',
    script: "I'd prefer to focus on the value I can bring to this role and what's fair market compensation. What range do you have budgeted for this position?",
  },
])

const negotiationScripts = ref<NegotiationScript[]>([
  {
    situation: 'The offer is lower than expected',
    whatToSay: "Thank you for the offer. I'm very excited about this opportunity. Based on my research and experience, I was hoping for a salary closer to $X. Is there flexibility in the budget?",
  },
  {
    situation: 'Negotiating benefits instead of salary',
    whatToSay: "If the salary is fixed, I'd like to discuss other aspects of compensation such as additional leave days, flexible working arrangements, or professional development budget.",
  },
  {
    situation: 'After receiving a counter-offer',
    whatToSay: "I appreciate you working with me on this. Could you meet me at $X? I believe this reflects the value I'll bring and aligns with market rates for this role.",
  },
])

const scamTactics = ref<ScamTactic[]>([
  {
    sign: 'Upfront payment required',
    explanation: 'Legitimate employers never ask candidates to pay for job applications, training materials, or equipment.',
  },
  {
    sign: 'Too good to be true salary',
    explanation: 'If the pay is significantly above market rate for minimal work, it\'s likely a scam.',
  },
  {
    sign: 'Vague job description',
    explanation: 'Scam postings often lack specific details about the role, company, or responsibilities.',
  },
  {
    sign: 'Unprofessional communication',
    explanation: 'Poor grammar, personal email addresses, and pressure tactics are red flags.',
  },
  {
    sign: 'No interview process',
    explanation: 'Being hired instantly without any interview is suspicious.',
  },
  {
    sign: 'Requests for personal information early',
    explanation: 'Asking for bank details, IC/passport copies before hiring is complete is suspicious.',
  },
])

const scamExamples = ref<ScamExample[]>([
  {
    title: 'The "Training Fee" Scam',
    description: 'A company offers you a job but requires you to pay for "mandatory training" before starting.',
    redFlags: ['Requires upfront payment', 'Training is with a third-party', 'Vague refund policy'],
  },
  {
    title: 'The "Package Reshipping" Scam',
    description: 'Asked to receive packages at home and reship them. Often involves stolen goods or money laundering.',
    redFlags: ['Work from home immediately', 'No interview', 'Handling physical packages'],
  },
  {
    title: 'The "Data Entry" Scam',
    description: 'Promises high pay for simple data entry work but requires purchasing software or membership.',
    redFlags: ['Unrealistic pay rates', 'Must buy equipment first', 'No clear company information'],
  },
])

const verificationChecklist = ref<string[]>([
  'Verify the company exists - search for their official website',
  'Check if the email domain matches the company website',
  'Look up the company on LinkedIn and verify employees',
  'Search for reviews on Glassdoor or other platforms',
  'Call the company main line to verify the job posting',
  'Check if the recruiter has a legitimate LinkedIn profile',
  'Research the company registration with government databases',
  'Ask to meet in person at the company office',
])

const suspiciousActions = ref<string[]>([
  'Stop all communication immediately',
  'Do not share any personal or financial information',
  'Report the scam to the job platform',
  'Report to local authorities (police, consumer protection)',
  'Warn others by leaving reviews on scam warning websites',
  'If you sent money, contact your bank immediately',
  'Save all evidence (emails, messages, job postings)',
  'Check if your identity has been compromised',
])

export function useJobSearch() {
  async function loadJobSearch() {
    isLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 1000))
    isLoading.value = false
  }

  return {
    // State
    isLoading,
    // Overview
    searchPlatforms,
    filteringTips,
    commonMistakes,
    // Platforms
    platforms,
    // Salary
    salaryRanges,
    costOfLiving,
    salaryAnswerScripts,
    negotiationScripts,
    // Scams
    scamTactics,
    scamExamples,
    verificationChecklist,
    suspiciousActions,
    // Methods
    loadJobSearch,
  }
}
