<script setup lang="ts">
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

const { target, isVisible } = useScrollAnimation()

const faqs = [
  {
    question: 'Is Career Buddy completely free?',
    answer: 'Yes! Career Buddy is free for all Malaysian youth aged 18-30. We believe everyone deserves access to quality career preparation resources, regardless of their financial situation. Our mission is to help young Malaysians start their careers with confidence.',
  },
  {
    question: 'Who is Career Buddy for?',
    answer: 'Career Buddy is designed for young adults aged 18-30 who are preparing to enter the workforce or looking to advance their careers. Whether you\'re a university student, fresh graduate, or someone looking to switch careers, our platform has resources tailored for you.',
  },
  {
    question: 'Is this only for Malaysians?',
    answer: 'While our content is primarily tailored for the Malaysian job market (including local company expectations, salary benchmarks, and networking culture), anyone can benefit from our universal career preparation resources like resume writing, interview skills, and networking strategies.',
  },
  {
    question: 'How is Career Buddy different from job listing sites?',
    answer: 'Career Buddy is NOT a job listing site. We focus on career PREPARATION, not job listings. We help you build the skills, confidence, and materials you need to succeed in your job search. Think of us as your career coach that prepares you before you start applying.',
  },
  {
    question: 'How does the AI Interview Simulation work?',
    answer: 'Our AI Interview Simulation uses advanced AI to conduct realistic mock interviews. You\'ll receive common interview questions, practice answering them verbally or in text, and get instant feedback on your responses. It\'s like having a patient interview coach available 24/7.',
  },
  {
    question: 'Can I use Career Buddy on my phone?',
    answer: 'Absolutely! Career Buddy is fully responsive and works great on mobile devices. You can access all features, from resume templates to AI chat, right from your smartphone. Perfect for preparing on-the-go!',
  },
]
</script>

<template>
  <section id="faq" ref="target" class="py-20 bg-background">
    <div class="container mx-auto px-4">
      <div
        :class="[
          'max-w-3xl mx-auto text-center mb-16 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        ]"
      >
        <span class="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          Got Questions?
        </span>
        <h2 class="text-3xl md:text-4xl font-bold font-heading mb-4">
          <span class="text-primary">Frequently Asked</span>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
            Questions
          </span>
        </h2>
        <p class="text-lg text-muted-foreground">
          Everything you need to know about Career Buddy. Can't find the answer? Chat with our AI assistant!
        </p>
      </div>

      <div
        :class="[
          'max-w-3xl mx-auto transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        ]"
        style="transition-delay: 200ms;"
      >
        <Accordion type="single" collapsible class="w-full">
          <AccordionItem
            v-for="(faq, index) in faqs"
            :key="index"
            :value="`item-${index}`"
            class="border-b border-border"
          >
            <AccordionTrigger class="text-left font-semibold hover:text-primary transition-colors">
              {{ faq.question }}
            </AccordionTrigger>
            <AccordionContent class="text-muted-foreground">
              {{ faq.answer }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </section>
</template>
