import { useEffect, useState } from 'react'
import { ScrollReveal } from '../../../components/ScrollReveal/ScrollReveal.jsx'
import AboutHistory from '../AboutHistory/AboutHistory.jsx'
import HeroSlider from '../HeroSlider/HeroSlider.jsx'
import OurHistory from '../OurHistory/OurHistory.jsx'
import PricingPlans from '../PricingPlans/PricingPlans.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const DEFAULT_HOME_DATA = {
  heroCtaPrimaryText: 'Discover More',
  heroCtaPrimaryLink: '/about',
  heroCtaSecondaryText: 'Get A Quote',
  heroCtaSecondaryLink: '/services',
  aboutEyebrow: 'About Us',
  aboutTitle: 'Making the world advanced design work for you',
  aboutDescription:
    'We are an experienced digital team delivering thoughtful design, practical engineering, and reliable support for brands that want to grow with confidence.',
  aboutImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  ourHistoryEyebrow: 'Our history',
  ourHistoryTitle: 'How We Started',
  pricingEyebrow: 'Pricing table',
  pricingTitle: 'Our Pricing Plans',
  pricingButtonText: 'Start Now',
  pricingButtonLink: '/',
  slides: [],
  aboutHighlights: [],
  aboutStats: [],
  timeline: [],
  pricingPlans: [],
  pricingFeatures: [],
}

export default function Home() {
  const [homeData, setHomeData] = useState(DEFAULT_HOME_DATA)

  useEffect(() => {
    let isMounted = true
    async function loadHomePageData() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/home-page`)
        if (!response.ok) throw new Error('Request failed')
        const data = await response.json()
        if (!isMounted) return
        setHomeData({ ...DEFAULT_HOME_DATA, ...data })
      } catch (error) {
        if (isMounted) setHomeData(DEFAULT_HOME_DATA)
      }
    }
    loadHomePageData()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="flex min-h-full flex-1 flex-col bg-transparent">
      <div className="flex flex-col gap-10 md:gap-14 lg:gap-16">
        <HeroSlider
          slides={homeData.slides}
          ctaPrimaryText={homeData.heroCtaPrimaryText}
          ctaPrimaryLink={homeData.heroCtaPrimaryLink}
          ctaSecondaryText={homeData.heroCtaSecondaryText}
          ctaSecondaryLink={homeData.heroCtaSecondaryLink}
        />
        <ScrollReveal variant="fade-up" delay={0.04} duration={0.58}>
          <AboutHistory
            eyebrow={homeData.aboutEyebrow}
            title={homeData.aboutTitle}
            description={homeData.aboutDescription}
            image={homeData.aboutImage}
            highlights={homeData.aboutHighlights}
            stats={homeData.aboutStats}
          />
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={0.08} duration={0.62}>
          <OurHistory
            eyebrow={homeData.ourHistoryEyebrow}
            title={homeData.ourHistoryTitle}
            timeline={homeData.timeline}
          />
        </ScrollReveal>
      </div>
      <div className="mt-6 md:mt-8 lg:mt-10">
        <PricingPlans
          eyebrow={homeData.pricingEyebrow}
          title={homeData.pricingTitle}
          plans={homeData.pricingPlans}
          features={(homeData.pricingFeatures || []).map((item) => item.text)}
          buttonText={homeData.pricingButtonText}
          buttonLink={homeData.pricingButtonLink}
        />
      </div>
    </div>
  )
}
