import { ref, computed } from 'vue'

export type ToneType = 'formal' | 'friendly' | 'confident'
export type CategoryType = 'senior' | 'hr' | 'thank-you' | 'linkedin' | 'cold' | 'follow-up'

export interface MessageTemplate {
  id: string
  category: CategoryType
  title: string
  template: string
  placeholders: string[]
  tones: {
    formal: string
    friendly: string
    confident: string
  }
}

export interface Category {
  id: CategoryType
  name: string
  description: string
  icon: string
}

export interface NetworkingBenefit {
  title: string
  description: string
  icon: string
}

export interface NetworkingType {
  title: string
  description: string
  examples: string[]
}

export interface CommonFear {
  fear: string
  solution: string
}

const isLoading = ref(false)
const currentTone = ref<ToneType>('formal')
const copiedId = ref<string | null>(null)

const categories = ref<Category[]>([
  { id: 'senior', name: 'Message to a Senior', description: 'Reach out to experienced professionals', icon: 'UserCheck' },
  { id: 'hr', name: 'Message to HR', description: 'Connect with recruiters and HR personnel', icon: 'Briefcase' },
  { id: 'thank-you', name: 'Thank-you Message', description: 'Express gratitude after interviews', icon: 'Heart' },
  { id: 'linkedin', name: 'LinkedIn Connection', description: 'Grow your professional network', icon: 'Linkedin' },
  { id: 'cold', name: 'Cold Message', description: 'Reach out to new contacts for advice', icon: 'MessageSquare' },
  { id: 'follow-up', name: 'Follow-up Message', description: 'Continue conversations professionally', icon: 'RefreshCw' },
])

const templates = ref<MessageTemplate[]>([
  {
    id: '1',
    category: 'senior',
    title: 'Asking for Career Advice',
    template: 'Dear {name}, I hope this message finds you well...',
    placeholders: ['{name}', '{company}', '{role}'],
    tones: {
      formal: 'Dear {name},\n\nI hope this message finds you well. My name is {your_name}, and I am currently a {your_role} aspiring to grow in the {industry} field.\n\nI came across your profile and was impressed by your experience at {company}. I would be grateful if you could spare 15-20 minutes for a brief conversation about your career journey.\n\nThank you for considering my request.\n\nBest regards,\n{your_name}',
      friendly: 'Hi {name}!\n\nI hope you\'re doing great! I\'m {your_name}, and I\'m really interested in building a career in {industry}.\n\nI saw your amazing work at {company} and thought you\'d be the perfect person to learn from. Would you be open to a quick chat sometime? I\'d love to hear about your journey!\n\nThanks so much!\n{your_name}',
      confident: 'Hello {name},\n\nI\'m {your_name}, a driven {your_role} with a clear goal of excelling in {industry}.\n\nYour track record at {company} is exactly the kind of success I\'m working toward. I believe a brief conversation with you would provide valuable insights for my career path.\n\nI\'m flexible with timing and would appreciate the opportunity to connect.\n\nRegards,\n{your_name}',
    },
  },
  {
    id: '2',
    category: 'hr',
    title: 'Inquiring About Open Positions',
    template: 'Dear HR Team, I am writing to express my interest...',
    placeholders: ['{company}', '{position}', '{your_name}'],
    tones: {
      formal: 'Dear Hiring Manager,\n\nI am writing to express my interest in opportunities at {company}. With my background in {your_field}, I believe I could contribute meaningfully to your team.\n\nI have attached my resume for your review and would welcome the opportunity to discuss how my skills align with your current needs.\n\nThank you for your time and consideration.\n\nSincerely,\n{your_name}',
      friendly: 'Hi there!\n\nI\'ve been following {company} for a while now and I\'m really excited about what you\'re building! I\'d love to be part of the team.\n\nI\'ve got experience in {your_field} and I think I could bring some great energy to {company}. Would love to chat if there are any openings that might be a good fit!\n\nThanks!\n{your_name}',
      confident: 'Hello,\n\nI\'m {your_name}, a {your_field} professional actively seeking my next challenge. {company}\'s reputation for innovation makes it a top choice for me.\n\nI bring proven skills and a track record of delivering results. I\'m confident I can add immediate value to your team.\n\nLet\'s connect to discuss opportunities.\n\nBest,\n{your_name}',
    },
  },
  {
    id: '3',
    category: 'thank-you',
    title: 'Post-Interview Thank You',
    template: 'Dear {name}, Thank you for taking the time...',
    placeholders: ['{name}', '{position}', '{company}'],
    tones: {
      formal: 'Dear {name},\n\nThank you for taking the time to meet with me today regarding the {position} role at {company}.\n\nI enjoyed learning more about the team and the exciting projects ahead. Our conversation reinforced my enthusiasm for this opportunity.\n\nPlease don\'t hesitate to reach out if you need any additional information.\n\nBest regards,\n{your_name}',
      friendly: 'Hi {name}!\n\nJust wanted to say a big thank you for chatting with me today! I had such a great time learning about the {position} role and the awesome things happening at {company}.\n\nI\'m even more excited about the possibility of joining the team now!\n\nThanks again!\n{your_name}',
      confident: 'Hello {name},\n\nThank you for the interview today. Our discussion confirmed that the {position} role at {company} is exactly where I want to be.\n\nI\'m ready to bring my skills and energy to your team and make an immediate impact.\n\nLooking forward to the next steps.\n\nRegards,\n{your_name}',
    },
  },
  {
    id: '4',
    category: 'linkedin',
    title: 'Connection Request',
    template: 'Hi {name}, I came across your profile...',
    placeholders: ['{name}', '{company}', '{shared_interest}'],
    tones: {
      formal: 'Dear {name},\n\nI came across your profile while researching professionals in {industry}. Your experience at {company} is truly impressive.\n\nI would be honored to connect and learn from your insights. I believe we share a common interest in {shared_interest}.\n\nThank you for considering my request.\n\nBest regards,\n{your_name}',
      friendly: 'Hey {name}!\n\nI found your profile and thought we might have some things in common - especially around {shared_interest}! Your work at {company} looks really cool.\n\nWould love to connect and maybe swap ideas sometime!\n\nCheers,\n{your_name}',
      confident: 'Hi {name},\n\nYour work at {company} caught my attention. I\'m building my network with accomplished professionals in {industry}, and you\'re exactly the kind of person I want to learn from.\n\nLet\'s connect.\n\n{your_name}',
    },
  },
  {
    id: '5',
    category: 'cold',
    title: 'Asking for Industry Advice',
    template: 'Hello {name}, I hope this message finds you well...',
    placeholders: ['{name}', '{company}', '{topic}'],
    tones: {
      formal: 'Dear {name},\n\nI hope this message finds you well. I am reaching out because I am deeply interested in {topic} and noticed your expertise in this area.\n\nWould you be open to a brief 15-minute call to share your perspective? I would greatly value your insights.\n\nThank you for your time.\n\nSincerely,\n{your_name}',
      friendly: 'Hi {name}!\n\nHope you\'re having a great day! I\'m really curious about {topic} and saw that you know a ton about it.\n\nWould you be up for a quick chat? I\'d love to pick your brain a little!\n\nThanks so much!\n{your_name}',
      confident: 'Hello {name},\n\nI\'m researching {topic} and your name keeps coming up as a leading voice in this space.\n\nI\'d like to schedule a brief call to discuss your insights. I believe your perspective would be invaluable for my career direction.\n\nWhen works for you?\n\n{your_name}',
    },
  },
  {
    id: '6',
    category: 'follow-up',
    title: 'Following Up After No Response',
    template: 'Hi {name}, I wanted to follow up on my previous message...',
    placeholders: ['{name}', '{topic}', '{timeframe}'],
    tones: {
      formal: 'Dear {name},\n\nI hope this message finds you well. I wanted to follow up on my previous message regarding {topic}.\n\nI understand you may be busy, but I remain very interested in connecting. If now is not a good time, please let me know when might work better.\n\nThank you for your consideration.\n\nBest regards,\n{your_name}',
      friendly: 'Hey {name}!\n\nJust wanted to bump my last message in case it got lost in your inbox! I know things can get crazy busy.\n\nStill really hoping we can chat about {topic} when you have a moment!\n\nNo pressure at all - just let me know!\n{your_name}',
      confident: 'Hi {name},\n\nI\'m circling back on my previous message about {topic}. I remain committed to connecting with you and believe our conversation would be mutually beneficial.\n\nPlease let me know your availability this week.\n\nBest,\n{your_name}',
    },
  },
])

const networkingBenefits = ref<NetworkingBenefit[]>([
  {
    title: 'Hidden Job Market',
    description: '70-80% of jobs are never publicly posted. Networking gives you access to opportunities others miss.',
    icon: 'Key',
  },
  {
    title: 'Referrals & Recommendations',
    description: 'Referred candidates are 4x more likely to be hired. Your network can vouch for your abilities.',
    icon: 'Users',
  },
  {
    title: 'Industry Insights',
    description: 'Learn about trends, company cultures, and career paths directly from people in the field.',
    icon: 'Lightbulb',
  },
  {
    title: 'Mentorship Opportunities',
    description: 'Connect with experienced professionals who can guide your career decisions.',
    icon: 'GraduationCap',
  },
])

const networkingTypes = ref<NetworkingType[]>([
  {
    title: 'Online Networking',
    description: 'Build connections through digital platforms and virtual events.',
    examples: ['LinkedIn connections', 'Industry webinars', 'Online communities', 'Virtual coffee chats'],
  },
  {
    title: 'Offline Networking',
    description: 'Face-to-face interactions at events and gatherings.',
    examples: ['Career fairs', 'Industry conferences', 'Alumni meetups', 'Professional associations'],
  },
])

const commonFears = ref<CommonFear[]>([
  {
    fear: "I don't know what to say",
    solution: 'Prepare 2-3 questions beforehand. People love talking about their experiences. Just ask and listen!',
  },
  {
    fear: "I'll seem desperate or annoying",
    solution: "You're not asking for a job - you're seeking advice. Most professionals enjoy helping others grow.",
  },
  {
    fear: "I'm not interesting enough",
    solution: 'Everyone has unique experiences. Your fresh perspective as a newcomer is actually valuable!',
  },
  {
    fear: "They're too busy/important",
    solution: 'A short, respectful message takes 2 minutes to read. The worst they can say is no.',
  },
])

const introductionTips = ref<string[]>([
  'Start with a genuine compliment about their work or achievement',
  'Briefly introduce yourself and your current situation',
  'Be specific about why you\'re reaching out to them',
  'Ask a focused question rather than a vague "pick your brain"',
  'Keep it concise - respect their time',
  'Always thank them, regardless of whether they respond',
])

export function useNetworking() {
  function setTone(tone: ToneType) {
    currentTone.value = tone
  }

  function getTemplateContent(template: MessageTemplate): string {
    return template.tones[currentTone.value]
  }

  function getTemplatesByCategory(category: CategoryType): MessageTemplate[] {
    return templates.value.filter(t => t.category === category)
  }

  async function copyToClipboard(templateId: string, content: string) {
    await navigator.clipboard.writeText(content)
    copiedId.value = templateId

    setTimeout(() => {
      copiedId.value = null
    }, 2000)
  }

  function replacePlaceholders(template: string, values: Record<string, string>): string {
    let result = template
    Object.entries(values).forEach(([key, value]) => {
      result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value)
    })
    return result
  }

  async function loadNetworking() {
    isLoading.value = true
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    isLoading.value = false
  }

  return {
    // State
    isLoading,
    currentTone,
    copiedId,
    templates,
    categories,
    networkingBenefits,
    networkingTypes,
    commonFears,
    introductionTips,
    // Methods
    setTone,
    getTemplateContent,
    getTemplatesByCategory,
    copyToClipboard,
    replacePlaceholders,
    loadNetworking,
  }
}
