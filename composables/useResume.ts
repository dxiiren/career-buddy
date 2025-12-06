import { ref } from 'vue'

export interface EmployerLookFor {
  title: string
  description: string
}

export interface ResumeMistake {
  mistake: string
  fix: string
}

export interface ResumeTemplate {
  id: string
  name: string
  category: string
  description: string
}

export interface CoverLetterSection {
  title: string
  content: string
}

export interface CoverLetterExample {
  title: string
  content: string
}

const isLoading = ref(false)

const whatIsResume = ref<string[]>([
  'A resume is a summary of your professional experience, skills, and education.',
  'It\'s your first impression to potential employers - make it count.',
  'A good resume is tailored to the job you\'re applying for.',
  'Keep it concise: 1 page for fresh graduates, 2 pages for experienced professionals.',
  'Use action verbs and quantify achievements whenever possible.',
])

const employerLookFor = ref<EmployerLookFor[]>([
  {
    title: 'Relevant Experience',
    description: 'Internships, projects, or work that relates to the role. Fresh grads can highlight academic projects and extracurriculars.',
  },
  {
    title: 'Skills Match',
    description: 'Technical skills, soft skills, and tools mentioned in the job description that you possess.',
  },
  {
    title: 'Achievements',
    description: 'Concrete accomplishments with measurable outcomes (increased sales by 20%, reduced errors by 30%).',
  },
  {
    title: 'Clear Communication',
    description: 'Well-organized, error-free content that\'s easy to scan quickly.',
  },
  {
    title: 'Cultural Fit',
    description: 'Values, interests, and activities that align with the company culture.',
  },
])

const resumeMistakes = ref<ResumeMistake[]>([
  {
    mistake: 'Using a generic resume for all applications',
    fix: 'Customize your resume for each job by matching keywords from the job description.',
  },
  {
    mistake: 'Including irrelevant information',
    fix: 'Focus on experiences and skills relevant to the target role.',
  },
  {
    mistake: 'Typos and grammatical errors',
    fix: 'Proofread multiple times and have someone else review it.',
  },
  {
    mistake: 'Using fancy fonts or colors',
    fix: 'Stick to professional fonts (Arial, Calibri, Garamond) and minimal colors.',
  },
  {
    mistake: 'Listing job duties instead of achievements',
    fix: 'Use "Achieved X by doing Y, resulting in Z" format.',
  },
  {
    mistake: 'Including personal information (photo, age, marital status)',
    fix: 'Only include name, contact info, LinkedIn URL, and optionally portfolio/GitHub.',
  },
])

const templates = ref<ResumeTemplate[]>([
  {
    id: 'fresh-grad-modern',
    name: 'Fresh Graduate Modern',
    category: 'fresh-grad',
    description: 'Clean, modern design perfect for entry-level positions. Emphasizes education and projects.',
  },
  {
    id: 'fresh-grad-classic',
    name: 'Fresh Graduate Classic',
    category: 'fresh-grad',
    description: 'Traditional format that works well with ATS systems. Highlights academic achievements.',
  },
  {
    id: 'internship-focused',
    name: 'Internship Focused',
    category: 'internship',
    description: 'Designed to showcase internship experiences and transferable skills.',
  },
  {
    id: 'career-changer',
    name: 'Career Changer',
    category: 'career-switch',
    description: 'Functional format that emphasizes skills over chronological experience.',
  },
  {
    id: 'tech-developer',
    name: 'Tech Developer',
    category: 'technical',
    description: 'Includes space for technical skills, GitHub projects, and coding languages.',
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    category: 'creative',
    description: 'Visual design for creative roles with space for portfolio links.',
  },
])

const templateCategories = ref<string[]>([
  'all',
  'fresh-grad',
  'internship',
  'career-switch',
  'technical',
  'creative',
])

const coverLetterStructure = ref<CoverLetterSection[]>([
  {
    title: 'Opening Paragraph',
    content: 'State the position you\'re applying for, where you found it, and a brief hook about why you\'re a great fit.',
  },
  {
    title: 'Body Paragraph 1: Why You',
    content: 'Highlight your most relevant experience or skills. Use specific examples and achievements.',
  },
  {
    title: 'Body Paragraph 2: Why This Company',
    content: 'Show you\'ve researched the company. Explain what attracts you and how you align with their values.',
  },
  {
    title: 'Closing Paragraph',
    content: 'Reiterate your interest, thank them for their consideration, and include a call to action.',
  },
])

const coverLetterTips = ref<string[]>([
  'Keep it to one page (250-400 words)',
  'Address it to a specific person if possible',
  'Mirror keywords from the job description',
  'Don\'t repeat your resume - expand on it',
  'Show personality while remaining professional',
  'Proofread for the company name and job title',
  'Use the same header/font as your resume for consistency',
  'End with a specific next step or call to action',
])

const coverLetterExamples = ref<CoverLetterExample[]>([
  {
    title: 'Fresh Graduate - Marketing',
    content: `Dear [Hiring Manager],

I am writing to express my interest in the Marketing Executive position at [Company Name], as advertised on LinkedIn. As a recent graduate with a Bachelor's in Marketing from [University], I am eager to apply my academic knowledge and internship experience to contribute to your dynamic team.

During my internship at [Previous Company], I assisted in managing social media campaigns that increased engagement by 40%. I also conducted market research that informed the launch of a new product line. These experiences taught me the importance of data-driven decision-making and creative problem-solving.

[Company Name]'s commitment to innovative marketing strategies and sustainability initiatives deeply resonates with me. I am particularly inspired by your recent campaign on [specific campaign], which demonstrated the kind of impactful work I aspire to be part of.

I would welcome the opportunity to discuss how my enthusiasm, fresh perspective, and marketing skills can contribute to [Company Name]'s continued success. Thank you for considering my application.

Sincerely,
[Your Name]`,
  },
  {
    title: 'Career Changer - Tech',
    content: `Dear [Hiring Manager],

I am excited to apply for the Junior Software Developer position at [Company Name]. While my background is in [Previous Field], I have spent the past year intensively studying programming and am eager to transition into a technology career.

Through self-study and bootcamp training, I have developed proficiency in JavaScript, React, and Node.js. I recently completed a full-stack project—a task management application—which showcased my ability to build user-friendly interfaces and RESTful APIs. My [previous field] experience has equipped me with strong problem-solving skills and the ability to work under pressure.

[Company Name]'s focus on [specific aspect] and commitment to nurturing junior talent make it the ideal place for me to grow as a developer. I am particularly drawn to your [specific project or value] and am excited about the opportunity to contribute.

I am confident that my unique background, combined with my technical skills and passion for coding, would make me a valuable addition to your team. I look forward to the opportunity to discuss my application further.

Best regards,
[Your Name]`,
  },
])

const atsTips = ref<string[]>([
  'Use standard section headings (Experience, Education, Skills)',
  'Avoid tables, columns, headers/footers, and text boxes',
  'Don\'t use images or graphics',
  'Use standard fonts and bullet points',
  'Include keywords from the job description naturally',
  'Save as .docx or .pdf (check job posting for preference)',
  'Use a simple, single-column layout',
  'Spell out acronyms at least once',
])

const atsKeywords = ref<string[]>([
  'Match exact job titles from the posting',
  'Include technical skills mentioned in requirements',
  'Use industry-specific terminology',
  'Include soft skills like "collaboration" or "communication"',
  'Add certifications and qualifications by name',
  'Include tools and software mentioned in the job ad',
])

export function useResume() {
  async function loadResume() {
    isLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 1000))
    isLoading.value = false
  }

  return {
    // State
    isLoading,
    // Overview
    whatIsResume,
    employerLookFor,
    resumeMistakes,
    // Templates
    templates,
    templateCategories,
    // Cover Letter
    coverLetterStructure,
    coverLetterTips,
    coverLetterExamples,
    // ATS
    atsTips,
    atsKeywords,
    // Methods
    loadResume,
  }
}
