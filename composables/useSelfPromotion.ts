import { ref } from 'vue'

export interface StrengthCategory {
  title: string
  strengths: string[]
}

export interface StoryTemplate {
  title: string
  prompt: string
  example: string
}

export interface HeadlineExample {
  type: string
  example: string
  tip: string
}

export interface AboutMeTemplate {
  title: string
  template: string
}

export interface PostIdea {
  title: string
  description: string
  example: string
}

export interface FirstDayItem {
  title: string
  tips: string[]
}

export interface FeedbackTip {
  scenario: string
  response: string
}

export interface EmailTemplate {
  title: string
  subject: string
  body: string
}

const isLoading = ref(false)

const strengthsCategories = ref<StrengthCategory[]>([
  {
    title: 'Communication Skills',
    strengths: ['Public speaking', 'Written communication', 'Active listening', 'Storytelling', 'Persuasion'],
  },
  {
    title: 'Technical Skills',
    strengths: ['Programming', 'Data analysis', 'Design', 'Project management', 'Research'],
  },
  {
    title: 'Interpersonal Skills',
    strengths: ['Teamwork', 'Leadership', 'Conflict resolution', 'Empathy', 'Networking'],
  },
  {
    title: 'Personal Qualities',
    strengths: ['Adaptability', 'Problem-solving', 'Creativity', 'Time management', 'Attention to detail'],
  },
])

const storyTemplates = ref<StoryTemplate[]>([
  {
    title: 'Your Origin Story',
    prompt: 'What sparked your interest in your field? What moment made you realize this was your path?',
    example: 'I discovered my passion for UX design when I was frustrated by a poorly designed app. That moment made me realize I wanted to create better experiences for users.',
  },
  {
    title: 'Your Challenge Story',
    prompt: 'What obstacle did you overcome? How did it shape who you are today?',
    example: 'Coming from a non-tech background, I taught myself coding through online courses while working full-time. This experience taught me persistence and self-discipline.',
  },
  {
    title: 'Your Impact Story',
    prompt: 'What difference have you made? How have you helped others or contributed to a cause?',
    example: 'I volunteered to redesign our student organization website, which increased event sign-ups by 150%. Seeing that impact confirmed my career direction.',
  },
])

const achievementTips = ref<string[]>([
  'Use numbers and metrics whenever possible (increased sales by 25%, reduced errors by 40%)',
  'Focus on the result, not just the task (Led project to completion vs. Worked on project)',
  'Use action verbs: Led, Created, Developed, Implemented, Achieved, Improved',
  'Explain the context briefly if needed (During peak season, I...)',
  'Connect achievements to the value you provided (saving the company $10K)',
  "Don't be modest - if you did it, own it",
])

const headlineExamples = ref<HeadlineExample[]>([
  {
    type: 'Current Role + Aspiration',
    example: 'Marketing Intern | Aspiring Brand Strategist | Passionate About Consumer Psychology',
    tip: 'Shows where you are and where you want to go',
  },
  {
    type: 'Skills + Value',
    example: 'Graphic Designer | Turning Ideas Into Visual Stories | Adobe Creative Suite Expert',
    tip: 'Highlights what you can do for others',
  },
  {
    type: 'Student + Focus',
    example: 'Computer Science Student @ NUS | Full-Stack Developer | Building Solutions That Matter',
    tip: 'Establishes credibility through education',
  },
  {
    type: 'Job Seeker (Direct)',
    example: 'Recent Graduate Seeking Entry-Level Software Engineering Role | Python, JavaScript, React',
    tip: 'Clear about what you want and what you offer',
  },
])

const aboutMeTemplates = ref<AboutMeTemplate[]>([
  {
    title: 'Fresh Graduate Template',
    template: `Hi, I'm [Name]! 👋

I recently graduated from [University] with a degree in [Field], and I'm excited to start my career in [Industry].

During my studies, I discovered my passion for [Specific Interest] through [Experience/Project]. This led me to [Achievement/Learning].

What drives me:
• [Value 1] - [Brief explanation]
• [Value 2] - [Brief explanation]
• [Value 3] - [Brief explanation]

I'm currently looking for opportunities in [Role Type] where I can [What you want to contribute].

Let's connect! I'm always happy to chat about [Topics of Interest].`,
  },
  {
    title: 'Career Changer Template',
    template: `Former [Previous Role] turned [New Field] enthusiast! 🚀

After [X] years in [Previous Industry], I made the bold decision to pursue my passion for [New Field]. Here's why:

[Brief story about what sparked the change]

My unique background gives me:
• [Transferable skill 1]
• [Transferable skill 2]
• [Fresh perspective on...]

Currently: [What you're doing now - studying, freelancing, building projects]

Seeking: [Type of opportunity]

Happy to connect with others in [Field] or fellow career changers!`,
  },
])

const featuredSuggestions = ref<string[]>([
  'Your best project with a link to a live demo or GitHub',
  'A blog post or article you wrote',
  'A certificate from a relevant course',
  'A presentation or deck you created',
  'A video introducing yourself or explaining a concept',
  'Testimonials or recommendations',
  'Your portfolio website',
  'An infographic or visual work sample',
])

const postIdeas = ref<PostIdea[]>([
  {
    title: 'Share Your Learning Journey',
    description: 'Document what you learned from a course, book, or project',
    example: 'Just completed Google\'s UX Design Certificate! Here are 3 key takeaways that changed how I think about design... 🎓',
  },
  {
    title: 'Celebrate Small Wins',
    description: 'Share achievements, no matter how small they seem',
    example: 'Pushed my first code to GitHub today! 🚀 It\'s a simple to-do app, but it represents weeks of learning. Here\'s what I struggled with and how I overcame it...',
  },
  {
    title: 'Ask Thoughtful Questions',
    description: 'Engage your network with genuine curiosity',
    example: 'To all the product managers in my network: What\'s the one skill you wish you had developed earlier in your career? I\'m building my skillset and would love your insights! 💡',
  },
  {
    title: 'Share Industry Insights',
    description: 'Comment on trends or news in your field',
    example: 'Interesting trend I\'ve noticed in [Industry]: [Observation]. As someone new to the field, here\'s my perspective... What do experienced professionals think?',
  },
])

const firstDayGuide = ref<FirstDayItem[]>([
  {
    title: 'Before You Arrive',
    tips: [
      'Confirm start time, location, and who to ask for',
      'Prepare your outfit the night before',
      'Review any materials sent by HR',
      'Get a good night\'s sleep',
    ],
  },
  {
    title: 'First Impressions',
    tips: [
      'Arrive 10-15 minutes early',
      'Smile and make eye contact when greeting people',
      'Remember names - write them down if needed',
      'Be friendly to everyone, including support staff',
    ],
  },
  {
    title: 'During the Day',
    tips: [
      'Listen more than you talk',
      'Take notes - you\'ll forget more than you think',
      'Ask questions when unclear (it\'s expected!)',
      'Observe the office culture and norms',
    ],
  },
  {
    title: 'End of Day',
    tips: [
      'Thank your manager and anyone who helped you',
      'Confirm your schedule for the next day',
      'Reflect on what you learned',
      'Rest - the first week is mentally exhausting',
    ],
  },
])

const talkingToSeniorsTips = ref<string[]>([
  'Be respectful but not overly formal - match their energy',
  'Come prepared with specific questions, not vague requests',
  'Listen actively and take notes',
  'Don\'t interrupt, but do engage with follow-up questions',
  'Thank them for their time and insights',
  'Follow up on any advice they give',
  'Remember: they were once in your position too',
  'Be yourself - authenticity builds better relationships',
])

const feedbackTips = ref<FeedbackTip[]>([
  {
    scenario: 'You receive critical feedback',
    response: 'Thank you for the feedback. Can you give me a specific example so I can understand better? I want to make sure I improve on this.',
  },
  {
    scenario: 'You disagree with the feedback',
    response: 'I appreciate your perspective. I had approached it differently because [reason]. Could we discuss the best approach together?',
  },
  {
    scenario: 'The feedback is vague',
    response: 'I want to make sure I understand correctly. When you say [feedback], do you mean [interpretation]? What would success look like?',
  },
  {
    scenario: 'You feel overwhelmed by feedback',
    response: 'Thank you for all this input. If I had to prioritize, which one or two areas would have the biggest impact to focus on first?',
  },
])

const etiquetteRules = ref<string[]>([
  'Reply to emails within 24 hours, even if just to acknowledge receipt',
  'Be on time for meetings - early is on time, on time is late',
  'Mute yourself when not speaking in virtual meetings',
  'Don\'t gossip about colleagues',
  'Keep personal phone use to breaks',
  'Clean up after yourself in shared spaces',
  'Dress appropriately for your workplace culture',
  'Speak up in meetings, but don\'t dominate',
  'Give credit to others when presenting team work',
  'Apologize sincerely when you make mistakes',
])

const emailTemplates = ref<EmailTemplate[]>([
  {
    title: 'Asking for Clarification',
    subject: 'Quick Question About [Task/Project]',
    body: `Hi [Name],

I hope this email finds you well.

I'm working on [task/project] and wanted to clarify [specific question]. I understood that [your understanding], but I want to make sure I'm on the right track.

Could you please confirm or let me know if I should approach this differently?

Thank you for your help!

Best regards,
[Your Name]`,
  },
  {
    title: 'Following Up on a Request',
    subject: 'Follow-up: [Original Subject]',
    body: `Hi [Name],

I hope you're doing well. I wanted to follow up on my previous email regarding [topic].

I understand you're busy, but I wanted to check if you had a chance to review my request. Please let me know if you need any additional information from my end.

Thank you for your time!

Best regards,
[Your Name]`,
  },
  {
    title: 'Thanking Someone for Help',
    subject: 'Thank You for Your Help!',
    body: `Hi [Name],

I just wanted to take a moment to thank you for helping me with [specific thing]. Your guidance on [specific aspect] made a real difference, and I was able to [outcome].

I really appreciate you taking the time to support me. It means a lot, especially as I'm still learning the ropes.

Thanks again!

Best regards,
[Your Name]`,
  },
])

export function useSelfPromotion() {
  async function loadSelfPromotion() {
    isLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 1000))
    isLoading.value = false
  }

  return {
    // State
    isLoading,
    // Personal Branding
    strengthsCategories,
    storyTemplates,
    achievementTips,
    // LinkedIn
    headlineExamples,
    aboutMeTemplates,
    featuredSuggestions,
    postIdeas,
    // Workplace
    firstDayGuide,
    talkingToSeniorsTips,
    feedbackTips,
    etiquetteRules,
    emailTemplates,
    // Methods
    loadSelfPromotion,
  }
}
