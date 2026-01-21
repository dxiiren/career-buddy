<script setup lang="ts">
import { Shield, ChevronRight } from 'lucide-vue-next'

// SEO
useSeo({
  title: 'Privacy Policy',
  description: 'Career Buddy Privacy Policy - Learn how we collect, use, and protect your personal information.',
  keywords: 'privacy policy, data protection, personal information',
})

const lastUpdated = 'December 1, 2024'

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'information-collect', title: 'Information We Collect' },
  { id: 'how-we-use', title: 'How We Use Your Information' },
  { id: 'data-security', title: 'Data Security' },
  { id: 'your-rights', title: 'Your Rights' },
  { id: 'third-party', title: 'Third-Party Services' },
  { id: 'changes', title: 'Changes to This Policy' },
  { id: 'contact', title: 'Contact Us' },
]

function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative gradient-bg overflow-hidden pt-24 pb-16">
      <!-- Background Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style="animation-delay: 1s;" />
        <div class="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <!-- Breadcrumbs -->
        <SharedBreadcrumbs />

        <div class="max-w-3xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border mb-8">
            <Shield class="h-4 w-4 text-primary" />
            <span class="text-sm font-medium">Your Privacy Matters</span>
          </div>

          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
            Privacy <span class="text-primary">Policy</span>
          </h1>

          <p class="text-lg text-muted-foreground">
            Last updated: {{ lastUpdated }}
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <div class="grid lg:grid-cols-4 gap-12">
            <!-- Table of Contents Sidebar -->
            <div class="lg:col-span-1">
              <div class="sticky top-24 bg-card rounded-xl border border-border p-4">
                <h3 class="font-semibold mb-4">Table of Contents</h3>
                <nav class="space-y-2">
                  <button
                    v-for="section in sections"
                    :key="section.id"
                    class="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-full text-left"
                    @click="scrollToSection(section.id)"
                  >
                    <ChevronRight class="w-4 h-4" />
                    {{ section.title }}
                  </button>
                </nav>
              </div>
            </div>

            <!-- Policy Content -->
            <div class="lg:col-span-3 prose prose-slate dark:prose-invert max-w-none">
              <!-- Introduction -->
              <section id="introduction" class="scroll-mt-24 mb-12">
                <h2 class="text-2xl font-bold font-heading mb-4">Introduction</h2>
                <p class="text-muted-foreground mb-4">
                  Welcome to Career Buddy. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                </p>
                <p class="text-muted-foreground">
                  By using Career Buddy, you agree to the collection and use of information in accordance with this policy. If you have any questions or concerns about our practices, please contact us at support@careerbuddy.my.
                </p>
              </section>

              <!-- Information We Collect -->
              <section id="information-collect" class="scroll-mt-24 mb-12">
                <h2 class="text-2xl font-bold font-heading mb-4">Information We Collect</h2>
                <p class="text-muted-foreground mb-4">
                  We collect information that you provide directly to us, as well as information collected automatically when you use our platform.
                </p>

                <h3 class="text-lg font-semibold mt-6 mb-3">Personal Information</h3>
                <ul class="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Name and contact information (email address)</li>
                  <li>Account credentials (username, password)</li>
                  <li>Profile information you choose to provide</li>
                </ul>

                <h3 class="text-lg font-semibold mt-6 mb-3">Career Information</h3>
                <ul class="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Resume and cover letter content</li>
                  <li>Interview practice responses</li>
                  <li>Career goals and preferences</li>
                  <li>Skills and experience information</li>
                </ul>

                <h3 class="text-lg font-semibold mt-6 mb-3">Usage Data</h3>
                <ul class="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Pages and features you access</li>
                  <li>Time spent on different sections</li>
                  <li>Device and browser information</li>
                  <li>IP address and general location</li>
                </ul>
              </section>

              <!-- How We Use Your Information -->
              <section id="how-we-use" class="scroll-mt-24 mb-12">
                <h2 class="text-2xl font-bold font-heading mb-4">How We Use Your Information</h2>
                <p class="text-muted-foreground mb-4">
                  We use the information we collect to:
                </p>
                <ul class="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Provide our services:</strong> Create and manage your account, provide personalized career guidance, and deliver the features you request.</li>
                  <li><strong>Improve our platform:</strong> Analyze usage patterns to enhance user experience and develop new features.</li>
                  <li><strong>Personalize your experience:</strong> Tailor content and recommendations based on your career goals and preferences.</li>
                  <li><strong>Communicate with you:</strong> Send service updates, respond to inquiries, and provide support.</li>
                  <li><strong>Ensure security:</strong> Protect against unauthorized access and maintain the integrity of our platform.</li>
                </ul>
              </section>

              <!-- Data Security -->
              <section id="data-security" class="scroll-mt-24 mb-12">
                <h2 class="text-2xl font-bold font-heading mb-4">Data Security</h2>
                <p class="text-muted-foreground mb-4">
                  We take the security of your personal information seriously and implement appropriate technical and organizational measures to protect it.
                </p>
                <ul class="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Encryption:</strong> All data transmitted between your device and our servers is encrypted using industry-standard SSL/TLS protocols.</li>
                  <li><strong>Secure Storage:</strong> Your data is stored on secure servers with restricted access controls.</li>
                  <li><strong>Access Controls:</strong> Only authorized personnel have access to personal information, and access is limited to what is necessary for their job functions.</li>
                  <li><strong>Regular Audits:</strong> We regularly review our security practices and update them as needed.</li>
                </ul>
              </section>

              <!-- Your Rights -->
              <section id="your-rights" class="scroll-mt-24 mb-12">
                <h2 class="text-2xl font-bold font-heading mb-4">Your Rights</h2>
                <p class="text-muted-foreground mb-4">
                  You have certain rights regarding your personal information:
                </p>
                <ul class="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li>
                  <li><strong>Correction:</strong> You can request that we correct any inaccurate or incomplete information.</li>
                  <li><strong>Deletion:</strong> You can request that we delete your personal information, subject to certain legal exceptions.</li>
                  <li><strong>Opt-out:</strong> You can opt out of receiving promotional communications from us at any time.</li>
                  <li><strong>Data Portability:</strong> You can request your data in a structured, commonly used format.</li>
                </ul>
                <p class="text-muted-foreground mt-4">
                  To exercise any of these rights, please contact us at support@careerbuddy.my.
                </p>
              </section>

              <!-- Third-Party Services -->
              <section id="third-party" class="scroll-mt-24 mb-12">
                <h2 class="text-2xl font-bold font-heading mb-4">Third-Party Services</h2>
                <p class="text-muted-foreground mb-4">
                  We may use third-party services to help us operate our platform and provide our services:
                </p>
                <ul class="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Analytics:</strong> We use analytics services to understand how users interact with our platform.</li>
                  <li><strong>AI Services:</strong> We use AI technologies to power features like our Career Buddy AI chat assistant.</li>
                  <li><strong>Hosting:</strong> Our platform is hosted on secure cloud infrastructure.</li>
                </ul>
                <p class="text-muted-foreground mt-4">
                  These third-party services have their own privacy policies governing the use of your information.
                </p>
              </section>

              <!-- Changes to This Policy -->
              <section id="changes" class="scroll-mt-24 mb-12">
                <h2 class="text-2xl font-bold font-heading mb-4">Changes to This Policy</h2>
                <p class="text-muted-foreground mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
                </p>
                <p class="text-muted-foreground">
                  We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top. We encourage you to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              <!-- Contact Us -->
              <section id="contact" class="scroll-mt-24 mb-12">
                <h2 class="text-2xl font-bold font-heading mb-4">Contact Us</h2>
                <p class="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div class="bg-card rounded-xl border border-border p-6">
                  <p class="mb-2"><strong>Email:</strong> support@careerbuddy.my</p>
                  <p class="mb-4"><strong>Response Time:</strong> Within 24-48 hours</p>
                  <NuxtLink to="/contact" class="text-primary hover:underline font-medium">
                    Visit our Contact Page &rarr;
                  </NuxtLink>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
