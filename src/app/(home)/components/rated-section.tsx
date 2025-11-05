'use client'

import { Button } from '@/components/ui/button'
import { useMessages, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

type Testimonial = {
  text: string
  stars: number
}

export default function RatedSection() {
  const tCommon = useTranslations('common')
  const tRated = useTranslations('rated')
  const messages = useMessages()

  const testimonials = (messages.rated as { testimonials: Testimonial[] }).testimonials

  const StarIcon = ({ gradientId }: { gradientId: string }) => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.6007 2.16169L20.2414 7.48279C20.6015 8.20839 21.5617 8.93399 22.3619 9.05493L27.1432 9.86114C30.204 10.3852 30.9242 12.6023 28.7236 14.8194L25.0027 18.5684C24.3825 19.1932 24.0224 20.4227 24.2224 21.3096L25.2828 25.9655C26.123 29.6339 24.1825 31.0649 20.9616 29.1501L16.4804 26.4694C15.6602 25.9857 14.3398 25.9857 13.5196 26.4694L9.0384 29.1501C5.81755 31.0649 3.87702 29.6339 4.71725 25.9655L5.77759 21.3096C5.97764 20.4429 5.61751 19.2134 4.99735 18.5684L1.27639 14.8194C-0.92419 12.6023 -0.204043 10.365 2.85677 9.86114L7.63806 9.05493C8.43828 8.91384 9.39853 8.20839 9.75862 7.48279L12.3993 2.16169C13.8197 -0.720565 16.1803 -0.720565 17.6007 2.16169Z"
        fill={`url(#${gradientId})`}
        fillOpacity="0.3"
      />
      <defs>
        <linearGradient id={gradientId} x1="15" y1="0" x2="15" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )

  return (
    <section className="relative">
      <div
        className="relative pt-[120px] pb-20"
        style={{
          backgroundImage: `url('https://www.ceoscrm.com/assets/img/rate/rated-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <Image
            src="https://www.ceoscrm.com/assets/img/rate/rate-shape-1.png"
            alt=""
            width={400}
            height={400}
            className="h-auto w-auto object-contain"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 hidden sm:block">
          <div className="absolute right-0 bottom-0">
            <Image
              src="https://www.ceoscrm.com/assets/img/rate/rate-shape-2.png"
              alt=""
              width={300}
              height={300}
              className="h-auto w-auto object-contain"
            />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full max-w-5xl">
              <div className="mb-[60px] text-center">
                <div className="mb-10 flex justify-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      <StarIcon gradientId={`tp-${i + 1}`} />
                    </span>
                  ))}
                </div>

                <h5 className="mb-10 pb-10 text-3xl leading-tight font-bold text-white md:text-4xl lg:text-5xl">
                  {tRated('titlePart1')} <span className="text-blue-300">{tRated('titlePart2')}</span>
                  <br /> <span className="text-blue-300">{tRated('titlePart3')}</span> {tRated('titlePart4')}
                  <span className="text-yellow-400"> {tRated('titlePart5')}</span>
                </h5>

                <Button asChild size="lg">
                  <Link href="https://admin.ceoscrm.com/#/login">{tCommon('freeTrial')}</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center gap-1">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <span key={i}>
                      <svg className="h-5 w-5 fill-yellow-400" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </span>
                  ))}
                </div>
                <p className="text-white/90">&ldquo;{testimonial.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
