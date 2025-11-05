'use client'

import { Button } from '@/components/ui/button'
import { DOWNLOAD_URL, REGISTER_URL } from '@/constants'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function HeroSection() {
  const t = useTranslations()

  return (
    <section className="relative overflow-hidden pt-[170px] pb-[70px]">
      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          {/* 标题区域 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-12 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-5 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="block">
                <span className="text-blue-600">{t('hero.title')}</span>
              </span>
              <span className="mt-2 block">
                <span className="text-foreground">{t('hero.subtitle')}</span>
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed md:text-xl">
              {t('hero.description')}
            </motion.p>
          </motion.div>

          {/* 按钮区域 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href={REGISTER_URL}>
                  <span>{t('common.freeTrial')}</span>
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href={DOWNLOAD_URL}>
                  <span>{t('common.downloadClient')}</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
