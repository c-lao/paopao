import { ASSETS } from '@/constants'
import Image from 'next/image'
import CounterSection from './components/counter-section'
import HeroSection from './components/hero-section'
import PlatformSection from './components/platform-section'
import RatedSection from './components/rated-section'
import ServiceSection from './components/service-section'
import TestimonialSection from './components/testimonial-section'

export default function HomePage() {
  return (
    <>
      <div className="absolute top-0 right-0 left-0 -z-10">
        <Image src={ASSETS.headerBg} alt="banner" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
      </div>
      <div className="absolute top-0 left-0">
        <Image src={ASSETS.bg002} alt="bg002" width={1058} height={768} />
      </div>
      <HeroSection />
      <CounterSection />
      <ServiceSection />
      <PlatformSection />
      <RatedSection />
      <TestimonialSection />
    </>
  )
}
