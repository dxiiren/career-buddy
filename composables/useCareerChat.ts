import { ref } from 'vue'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface CareerTopic {
  id: string
  title: string
  icon: string
}

const messages = ref<ChatMessage[]>([])
const isTyping = ref(false)

const suggestedPrompts = ref<string[]>([
  'How do I write a compelling resume?',
  'What should I wear to a job interview?',
  'How do I negotiate my salary?',
  'What questions should I ask the interviewer?',
  'How do I build my LinkedIn profile?',
  'What are red flags in a job posting?',
  'How do I transition to a new career?',
  'Tips for my first day at work?',
])

const careerTopics = ref<CareerTopic[]>([
  { id: 'resume', title: 'Resume Help', icon: 'file-text' },
  { id: 'interview', title: 'Interview Prep', icon: 'users' },
  { id: 'salary', title: 'Salary Negotiation', icon: 'dollar-sign' },
  { id: 'networking', title: 'Networking', icon: 'network' },
  { id: 'job-search', title: 'Job Search', icon: 'search' },
  { id: 'workplace', title: 'Workplace Tips', icon: 'briefcase' },
])

// Simulated responses based on keywords
const responses: Record<string, string> = {
  resume: `Here are some key tips for writing an effective resume:

1. **Keep it concise** - Aim for 1 page as a fresh graduate
2. **Use action verbs** - Start bullets with words like "Led," "Developed," "Achieved"
3. **Quantify achievements** - Include numbers and percentages whenever possible
4. **Tailor for each job** - Match keywords from the job description
5. **Focus on impact** - Show results, not just responsibilities

Would you like me to help you with a specific section of your resume?`,

  interview: `Great question about interviews! Here's what I recommend:

**Before the Interview:**
- Research the company thoroughly
- Prepare answers to common questions using the STAR method
- Practice with a friend or record yourself

**During the Interview:**
- Arrive 10-15 minutes early
- Make eye contact and smile
- Listen carefully and ask clarifying questions

**After the Interview:**
- Send a thank-you email within 24 hours
- Follow up if you haven't heard back in a week

What specific aspect of interviewing would you like to focus on?`,

  salary: `Salary negotiation can feel intimidating, but here's how to approach it:

1. **Do your research** - Know the market rate for your role and location
2. **Wait for the right moment** - Let them make the first offer if possible
3. **Consider the full package** - Benefits, remote work, and growth opportunities matter too
4. **Practice your script** - "Based on my research and experience, I'm looking for..."
5. **Be confident but flexible** - Know your walk-away number but stay open

Remember: negotiating is expected and shows professionalism!

Would you like some specific scripts for common negotiation scenarios?`,

  networking: `Networking is one of the most effective ways to find opportunities! Here's how:

**Online:**
- Optimize your LinkedIn profile
- Engage with industry content
- Reach out to alumni from your school

**In Person:**
- Attend industry events and meetups
- Join professional associations
- Don't be afraid to ask for coffee chats

**Key Tips:**
- Give before you ask - share helpful content and make introductions
- Follow up within 48 hours
- Maintain relationships, not just collect contacts

Would you like tips on starting conversations or following up?`,

  default: `Thanks for your question! As your career buddy, I'm here to help with:

- 📄 Resume and cover letter writing
- 💼 Interview preparation
- 💰 Salary negotiation
- 🤝 Networking strategies
- 🔍 Job search tips
- 🏢 Workplace expectations

Feel free to ask me anything related to your career journey! I'll do my best to provide helpful, actionable advice.

What would you like to explore?`,
}

function generateResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
    return responses.resume
  }
  if (lowerMessage.includes('interview') || lowerMessage.includes('question')) {
    return responses.interview
  }
  if (lowerMessage.includes('salary') || lowerMessage.includes('negotiate') || lowerMessage.includes('offer')) {
    return responses.salary
  }
  if (lowerMessage.includes('network') || lowerMessage.includes('connect') || lowerMessage.includes('linkedin')) {
    return responses.networking
  }

  return responses.default
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

export function useCareerChat() {
  function sendMessage(content: string) {
    // Add user message
    messages.value.push({
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
    })

    // Set typing indicator
    isTyping.value = true

    // Simulate AI response after delay
    setTimeout(() => {
      const response = generateResponse(content)
      messages.value.push({
        id: generateId(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      })
      isTyping.value = false
    }, 1500)
  }

  function clearMessages() {
    messages.value = []
  }

  return {
    // State
    messages,
    isTyping,
    suggestedPrompts,
    careerTopics,
    // Methods
    sendMessage,
    clearMessages,
  }
}
