'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { motion } from 'motion/react'
import { useMessages, useTranslations } from 'next-intl'
import Marquee from 'react-fast-marquee'

const STAR_PATH = 'M12 2.25l2.63 5.34 5.9.86-4.26 4.15 1 5.84L12 15.98l-5.27 2.77 1-5.84-4.26-4.15 5.9-.86L12 2.25z'

export default function TestimonialSection() {
  const t = useTranslations()
  const messages = useMessages()

  const testimonials = (messages.testimonial as { testimonials: Testimonial[] }).testimonials

  const marqueeContent = [...testimonials, ...testimonials]

  return (
    <section className="py-28">
      <div className="container mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-6 py-2 text-[11px] font-semibold tracking-[0.3em] text-slate-600 uppercase shadow-[0_25px_60px_-40px_rgba(15,23,42,0.65)]">
            {t('testimonial.title')}
          </span>
          <h2 className="mt-8 text-3xl font-semibold text-balance text-slate-900 md:text-4xl lg:text-5xl">{t('testimonial.subtitle')}</h2>
          <p className="mt-6 text-base leading-relaxed">{t('testimonial.description')}</p>
        </motion.div>

        <div className="mt-16 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              maskImage: 'linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)',
            }}>
            <Marquee pauseOnHover speed={120} gradient={false}>
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
              ))}
            </Marquee>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              maskImage: 'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
            }}>
            <Marquee pauseOnHover speed={120} gradient={false} direction="right">
              {marqueeContent.map((testimonial, index) => (
                <TestimonialCard key={`${testimonial.name}-${index}-reverse`} testimonial={testimonial} />
              ))}
            </Marquee>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

type Testimonial = {
  name: string
  role: string
  text: string
  rating: number
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="mr-6 w-96">
      <CardHeader>
        <div className="flex gap-1 text-amber-400">
          {[...Array(testimonial.rating)].map((_, index) => (
            <svg key={index} className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d={STAR_PATH} />
            </svg>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-[15px] leading-relaxed">{testimonial.text}</p>
      </CardContent>
      <CardFooter className="flex items-start justify-between">
        <div>
          <h4 className="text-base font-semibold text-slate-900">{testimonial.name}</h4>
          <p className="text-sm">{testimonial.role}</p>
        </div>
        <span className="text-sm font-medium">{testimonial.rating.toFixed(1)}</span>
      </CardFooter>
    </Card>
  )
}
