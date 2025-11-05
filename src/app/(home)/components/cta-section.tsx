'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function CTASection() {
  const tCommon = useTranslations('common')
  const tCta = useTranslations('cta')

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 h-96 w-96 -translate-y-1/2 rounded-full bg-white blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-96 w-96 translate-y-1/2 rounded-full bg-white blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            <h2 className="mb-2 text-3xl font-bold md:text-4xl lg:text-5xl">
              {tCta('title')} <br />
              <span>{tCta('subtitle')}</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" variant="secondary">
              <Link href="#register">{tCommon('startFreeTrial')}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
