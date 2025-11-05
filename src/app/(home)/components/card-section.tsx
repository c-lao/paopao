'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function CardSection() {
  const t = useTranslations()
  const tCommon = useTranslations('common')
  const tCard = useTranslations('card')

  return (
    <section className="bg-background relative overflow-hidden py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 md:order-1">
            {/* 装饰形状 */}
            <div className="absolute -top-4 -left-4 hidden h-24 w-24 rounded-lg border-2 border-blue-200 opacity-50 md:block" />
            <div className="absolute -right-4 -bottom-4 hidden h-32 w-32 rounded-lg border-2 border-blue-200 opacity-50 md:block" />
            <div className="bg-muted relative aspect-video overflow-hidden rounded-lg shadow-2xl">
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">产品界面展示</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              {tCard('title')} <span className="text-blue-600">{tCard('subtitle')}</span>
              <br />
              {tCard('description')}
            </h2>
            <p className="text-muted-foreground mb-6 text-lg">{tCard('content')}</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg">
                <Link href="#register">{tCommon('startFreeTrial')}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
