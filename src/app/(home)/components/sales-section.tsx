'use client'

import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

export default function SalesSection() {
  const t = useTranslations('sales')

  const features = [{ text: t('features.feature1') }, { text: t('features.feature2') }, { text: t('features.feature3') }]

  return (
    <section className="bg-muted relative overflow-hidden py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              {t('title')} <span className="text-blue-600">{t('subtitle')}</span> {t('description')}
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">{t('content')}</p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="bg-card flex items-start gap-3 rounded-lg border-2 p-4 transition-all hover:shadow-md">
                  <span className="text-foreground flex-1">{feature.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative">
            <div className="absolute -top-4 -right-4 hidden h-32 w-32 rounded-lg border-2 border-blue-200 opacity-50 md:block" />
            <div className="absolute -bottom-4 -left-4 hidden h-24 w-24 rounded-lg border-2 border-blue-200 opacity-50 md:block" />
            <div className="bg-background relative aspect-video overflow-hidden rounded-lg shadow-xl">
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">销售分析界面</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
