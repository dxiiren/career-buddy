import { ref } from 'vue'

export interface InterviewType {
  name: string
  description: string
  tips: string[]
}

export interface PrepStep {
  title: string
  description: string
}

export interface InterviewQuestion {
  id: string
  category: 'hr' | 'behavioral' | 'internship' | 'fresh-grad' | 'salary'
  question: string
  exampleAnswer: string
  answerStructure: string[]
  tips: string[]
}

export interface StarMethod {
  situation: string
  task: string
  action: string
  result: string
}

export interface SimulationSettings {
  mode: 'text' | 'voice'
  category: string
  timeLimit: number
}

export interface SimulationState {
  isActive: boolean
  currentQuestionIndex: number
  answers: string[]
}

const isLoading = ref(false)

const interviewPurpose = ref<string[]>([
  'Assess your skills and experience',
  'Evaluate cultural fit with the team',
  'Understand your communication abilities',
  'Gauge your problem-solving approach',
  'Verify information from your resume',
  'Determine your enthusiasm for the role',
])

const interviewTypes = ref<InterviewType[]>([
  {
    name: 'Phone Screen',
    description: 'Initial conversation with HR to assess basic qualifications and interest.',
    tips: [
      'Find a quiet place with good reception',
      'Have your resume in front of you',
      'Smile while talking - it affects your voice',
      'Prepare 2-3 questions to ask',
    ],
  },
  {
    name: 'Video Interview',
    description: 'Remote interview via Zoom, Teams, or similar platforms.',
    tips: [
      'Test your technology beforehand',
      'Choose a clean, professional background',
      'Look at the camera, not the screen',
      'Dress professionally from head to toe',
    ],
  },
  {
    name: 'Panel Interview',
    description: 'Interview with multiple interviewers at once.',
    tips: [
      'Address all panel members, not just one',
      'Make eye contact with whoever asks the question',
      'Note down names and roles of each interviewer',
      'Send individual thank-you notes afterward',
    ],
  },
  {
    name: 'Technical Interview',
    description: 'Assessment of technical skills through problems or coding challenges.',
    tips: [
      'Think out loud as you solve problems',
      'Ask clarifying questions before diving in',
      'It\'s okay to not know everything',
      'Practice common problems in your field',
    ],
  },
  {
    name: 'Behavioral Interview',
    description: 'Questions about past experiences to predict future behavior.',
    tips: [
      'Use the STAR method for answers',
      'Prepare 5-6 stories that cover different competencies',
      'Be specific with examples and outcomes',
      'Quantify results whenever possible',
    ],
  },
])

const interviewDos = ref<string[]>([
  'Research the company thoroughly',
  'Arrive 10-15 minutes early',
  'Bring extra copies of your resume',
  'Prepare thoughtful questions to ask',
  'Send a thank-you email within 24 hours',
  'Follow up if you haven\'t heard back in a week',
  'Be honest about your experience',
  'Show enthusiasm for the role',
])

const interviewDonts = ref<string[]>([
  'Don\'t speak negatively about past employers',
  'Don\'t lie or exaggerate your experience',
  'Don\'t arrive unprepared',
  'Don\'t check your phone during the interview',
  'Don\'t interrupt the interviewer',
  'Don\'t give one-word answers',
  'Don\'t ask about salary too early',
  'Don\'t forget to ask questions at the end',
])

const prepSteps = ref<PrepStep[]>([
  {
    title: 'Research the Company',
    description: 'Study the company\'s mission, values, recent news, products, and culture. Check their social media and Glassdoor reviews.',
  },
  {
    title: 'Prepare Your Stories',
    description: 'Prepare 5-6 stories from your experience that demonstrate key competencies. Use the STAR method to structure them.',
  },
  {
    title: 'Practice Common Questions',
    description: 'Rehearse answers to common questions but don\'t memorize scripts. Practice with a friend or record yourself.',
  },
])

const questions = ref<InterviewQuestion[]>([
  {
    id: 'hr-1',
    category: 'hr',
    question: 'Tell me about yourself.',
    exampleAnswer: 'I\'m a recent graduate with a degree in Computer Science from NUS. During my studies, I developed a passion for web development through various projects and internships. Most recently, I completed an internship at a startup where I built a customer dashboard that improved user engagement by 30%.',
    answerStructure: [
      'Start with your current situation (student/recent grad)',
      'Highlight relevant education or experience',
      'Mention a key achievement',
      'Connect to why you\'re interested in this role',
    ],
    tips: [
      'Keep it under 2 minutes',
      'Focus on professional life, not personal',
      'Tailor it to the job you\'re applying for',
    ],
  },
  {
    id: 'hr-2',
    category: 'hr',
    question: 'Why do you want to work here?',
    exampleAnswer: 'I\'ve been following your company\'s innovative approach to sustainable technology. Your recent launch of the eco-friendly product line aligns perfectly with my values. I\'m excited about the opportunity to contribute to a company that\'s making a real difference.',
    answerStructure: [
      'Show you\'ve researched the company',
      'Mention specific aspects that attract you',
      'Connect company values to your own',
      'Explain how you can contribute',
    ],
    tips: [
      'Be specific - generic answers are obvious',
      'Show genuine enthusiasm',
      'Avoid mentioning salary or perks as the main reason',
    ],
  },
  {
    id: 'behavioral-1',
    category: 'behavioral',
    question: 'Tell me about a time you faced a challenge and how you overcame it.',
    exampleAnswer: 'During my final year project, our team faced a critical bug two days before the deadline. I took the lead in organizing a debugging session, delegated tasks based on team strengths, and we worked together to identify and fix the issue. We delivered on time and received an A for the project.',
    answerStructure: [
      'Situation: Set the context',
      'Task: Explain your responsibility',
      'Action: Describe what you did specifically',
      'Result: Share the outcome with metrics if possible',
    ],
    tips: [
      'Choose a genuine challenge, not a trivial one',
      'Focus on YOUR actions, not the team\'s',
      'Always end with a positive result or learning',
    ],
  },
  {
    id: 'behavioral-2',
    category: 'behavioral',
    question: 'Describe a time you worked in a team.',
    exampleAnswer: 'In my marketing class, I worked with four classmates on a campaign project. I noticed early on that we had different working styles, so I suggested we establish clear roles. I took on the research and analytics role. By playing to each person\'s strengths, we created a campaign that won the class competition.',
    answerStructure: [
      'Describe the team context',
      'Explain your specific role',
      'Highlight how you collaborated',
      'Share the team\'s achievement',
    ],
    tips: [
      'Don\'t take all the credit',
      'Show you can work with different personalities',
      'Demonstrate leadership even if you weren\'t the leader',
    ],
  },
  {
    id: 'fresh-grad-1',
    category: 'fresh-grad',
    question: 'What are your strengths?',
    exampleAnswer: 'I\'d say my biggest strength is my ability to learn quickly. During my internship, I had to pick up a new programming language in two weeks. I used online resources, asked questions, and practiced daily. By the end, I was able to contribute meaningfully to the project.',
    answerStructure: [
      'State the strength clearly',
      'Provide a specific example',
      'Show the impact of that strength',
    ],
    tips: [
      'Choose strengths relevant to the job',
      'Back up with concrete examples',
      'Be confident but not arrogant',
    ],
  },
  {
    id: 'fresh-grad-2',
    category: 'fresh-grad',
    question: 'What is your greatest weakness?',
    exampleAnswer: 'I sometimes get too focused on details and can spend too much time perfecting something. I\'ve learned to set time limits for tasks and ask for feedback earlier in the process to ensure I\'m meeting expectations without over-engineering.',
    answerStructure: [
      'Acknowledge a genuine weakness',
      'Explain how it has affected you',
      'Describe steps you\'re taking to improve',
    ],
    tips: [
      'Don\'t say "I\'m a perfectionist" or "I work too hard"',
      'Choose a real weakness that isn\'t critical to the job',
      'Always show you\'re working on it',
    ],
  },
  {
    id: 'salary-1',
    category: 'salary',
    question: 'What are your salary expectations?',
    exampleAnswer: 'Based on my research of the market rate for this role and my qualifications, I\'m looking for something in the range of $3,500 to $4,500. However, I\'m flexible and more focused on finding the right fit and growth opportunities.',
    answerStructure: [
      'Show you\'ve done research',
      'Give a range, not a single number',
      'Express flexibility',
      'Redirect to the overall opportunity',
    ],
    tips: [
      'Research market rates beforehand',
      'Don\'t undersell yourself',
      'It\'s okay to ask about their budget first',
    ],
  },
])

const starMethod = ref<StarMethod>({
  situation: 'Set the scene. Describe the context and background of your example. When and where did this happen? What was the situation?',
  task: 'Explain the challenge. What was your responsibility? What were you trying to achieve? What was the goal or problem?',
  action: 'Describe YOUR actions. What did you specifically do? What steps did you take? Focus on your contribution, not the team\'s.',
  result: 'Share the outcome. What happened as a result of your actions? Quantify if possible. What did you learn?',
})

const simulationSettings = ref<SimulationSettings>({
  mode: 'text',
  category: 'all',
  timeLimit: 120,
})

const simulationState = ref<SimulationState>({
  isActive: false,
  currentQuestionIndex: 0,
  answers: [],
})

export function useInterview() {
  async function loadInterview() {
    isLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 1000))
    isLoading.value = false
  }

  function startSimulation() {
    simulationState.value = {
      isActive: true,
      currentQuestionIndex: 0,
      answers: [],
    }
  }

  function endSimulation() {
    simulationState.value.isActive = false
  }

  function submitAnswer(answer: string) {
    simulationState.value.answers.push(answer)
    simulationState.value.currentQuestionIndex++
  }

  function updateSettings(settings: Partial<SimulationSettings>) {
    simulationSettings.value = { ...simulationSettings.value, ...settings }
  }

  return {
    // State
    isLoading,
    // Overview
    interviewPurpose,
    interviewTypes,
    interviewDos,
    interviewDonts,
    prepSteps,
    // Questions
    questions,
    starMethod,
    // Simulation
    simulationSettings,
    simulationState,
    // Methods
    loadInterview,
    startSimulation,
    endSimulation,
    submitAnswer,
    updateSettings,
  }
}
