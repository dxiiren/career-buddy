import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('useSelfPromotion', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('personal branding content', () => {
    it('should have strengths discovery data', async () => {
      const { useSelfPromotion } = await import('../../composables/useSelfPromotion')
      const { strengthsCategories } = useSelfPromotion()

      expect(strengthsCategories.value.length).toBeGreaterThan(0)
      strengthsCategories.value.forEach(category => {
        expect(category).toHaveProperty('title')
        expect(category).toHaveProperty('strengths')
        expect(category.strengths.length).toBeGreaterThan(0)
      })
    })

    it('should have story templates', async () => {
      const { useSelfPromotion } = await import('../../composables/useSelfPromotion')
      const { storyTemplates } = useSelfPromotion()

      expect(storyTemplates.value.length).toBeGreaterThan(0)
      storyTemplates.value.forEach(template => {
        expect(template).toHaveProperty('title')
        expect(template).toHaveProperty('prompt')
        expect(template).toHaveProperty('example')
      })
    })

    it('should have achievement tips', async () => {
      const { useSelfPromotion } = await import('../../composables/useSelfPromotion')
      const { achievementTips } = useSelfPromotion()

      expect(achievementTips.value.length).toBeGreaterThan(0)
    })
  })

  describe('linkedin optimization content', () => {
    it('should have headline examples', async () => {
      const { useSelfPromotion } = await import('../../composables/useSelfPromotion')
      const { headlineExamples } = useSelfPromotion()

      expect(headlineExamples.value.length).toBeGreaterThan(0)
      headlineExamples.value.forEach(example => {
        expect(example).toHaveProperty('type')
        expect(example).toHaveProperty('example')
        expect(example).toHaveProperty('tip')
      })
    })

    it('should have about me templates', async () => {
      const { useSelfPromotion } = await import('../../composables/useSelfPromotion')
      const { aboutMeTemplates } = useSelfPromotion()

      expect(aboutMeTemplates.value.length).toBeGreaterThan(0)
      aboutMeTemplates.value.forEach(template => {
        expect(template).toHaveProperty('title')
        expect(template).toHaveProperty('template')
      })
    })

    it('should have featured section suggestions', async () => {
      const { useSelfPromotion } = await import('../../composables/useSelfPromotion')
      const { featuredSuggestions } = useSelfPromotion()

      expect(featuredSuggestions.value.length).toBeGreaterThan(0)
    })

    it('should have post ideas for fresh grads', async () => {
      const { useSelfPromotion } = await import('../../composables/useSelfPromotion')
      const { postIdeas } = useSelfPromotion()

      expect(postIdeas.value.length).toBeGreaterThan(0)
      postIdeas.value.forEach(idea => {
        expect(idea).toHaveProperty('title')
        expect(idea).toHaveProperty('description')
        expect(idea).toHaveProperty('example')
      })
    })
  })

  describe('workplace expectations content', () => {
    it('should have first day guide', async () => {
      const { useSelfPromotion } = await import('../../composables/useSelfPromotion')
      const { firstDayGuide } = useSelfPromotion()

      expect(firstDayGuide.value.length).toBeGreaterThan(0)
      firstDayGuide.value.forEach(item => {
        expect(item).toHaveProperty('title')
        expect(item).toHaveProperty('tips')
      })
    })

    it('should have tips for talking to seniors', async () => {
      const { useSelfPromotion } = await import('../../composables/useSelfPromotion')
      const { talkingToSeniorsTips } = useSelfPromotion()

      expect(talkingToSeniorsTips.value.length).toBeGreaterThan(0)
    })

    it('should have feedback handling tips', async () => {
      const { useSelfPromotion } = await import('../../composables/useSelfPromotion')
      const { feedbackTips } = useSelfPromotion()

      expect(feedbackTips.value.length).toBeGreaterThan(0)
      feedbackTips.value.forEach(tip => {
        expect(tip).toHaveProperty('scenario')
        expect(tip).toHaveProperty('response')
      })
    })

    it('should have professional etiquette rules', async () => {
      const { useSelfPromotion } = await import('../../composables/useSelfPromotion')
      const { etiquetteRules } = useSelfPromotion()

      expect(etiquetteRules.value.length).toBeGreaterThan(0)
    })

    it('should have email templates', async () => {
      const { useSelfPromotion } = await import('../../composables/useSelfPromotion')
      const { emailTemplates } = useSelfPromotion()

      expect(emailTemplates.value.length).toBeGreaterThan(0)
      emailTemplates.value.forEach(template => {
        expect(template).toHaveProperty('title')
        expect(template).toHaveProperty('subject')
        expect(template).toHaveProperty('body')
      })
    })
  })

  describe('loading state', () => {
    it('should have isLoading state', async () => {
      const { useSelfPromotion } = await import('../../composables/useSelfPromotion')
      const { isLoading } = useSelfPromotion()

      expect(isLoading.value).toBe(false)
    })

    it('should set isLoading during loadSelfPromotion', async () => {
      const { useSelfPromotion } = await import('../../composables/useSelfPromotion')
      const { isLoading, loadSelfPromotion } = useSelfPromotion()

      const promise = loadSelfPromotion()
      expect(isLoading.value).toBe(true)

      await vi.advanceTimersByTimeAsync(1000)
      await promise

      expect(isLoading.value).toBe(false)
    })
  })
})
