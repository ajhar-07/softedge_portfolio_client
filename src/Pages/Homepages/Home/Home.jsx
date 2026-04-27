import { ScrollReveal } from '../../../components/ScrollReveal/ScrollReveal.jsx'
import HeroSlider from '../HeroSlider/HeroSlider.jsx'
import OurHistory from '../OurHistory/OurHistory.jsx'
import PricingPlans from '../PricingPlans/PricingPlans.jsx'

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-transparent">
      <div className="flex flex-col gap-10 md:gap-14 lg:gap-16">
        <HeroSlider />
        <ScrollReveal variant="fade-up" delay={0.08} duration={0.62}>
          <OurHistory />
        </ScrollReveal>
      </div>
      <div className="mt-6 md:mt-8 lg:mt-10">
        <PricingPlans />
      </div>
    </div>
  )
}
