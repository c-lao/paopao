'use client'

import { Button } from '@/components/ui/button'
import { LOGIN_URL } from '@/constants'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function ServiceSection() {
  const tCommon = useTranslations('common')
  const tService = useTranslations('service')

  const smallServices = [
    {
      key: 'translation',
      icon: (
        <svg width="66" height="53" viewBox="0 0 66 53" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.5323 8.40774C4.17742 10.9497 1 12.2206 1 13.8C1 15.3794 4.17742 16.6503 10.5323 19.1923L19.5194 22.7871C25.8742 25.329 29.0516 26.6 33 26.6C36.9484 26.6 40.1258 25.329 46.4806 22.7871L55.4677 19.1923C61.8226 16.6503 65 15.3794 65 13.8C65 12.2206 61.8226 10.9497 55.4677 8.40774L46.4806 4.8129C40.1258 2.27097 36.9484 1 33 1C29.9474 1 27.3556 1.7597 23.4 3.27909"
            stroke="CurrentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M13.0516 20.2002L10.5323 21.2079C4.17742 23.7499 1 25.0208 1 26.6002C1 28.1795 4.17742 29.4505 10.5323 31.9925L19.5194 35.5873C25.8742 38.1292 29.0516 39.4002 33 39.4002C36.9484 39.4002 40.1258 38.1292 46.4806 35.5873L55.4677 31.9925C61.8226 29.4505 65 28.1795 65 26.6002C65 25.0208 61.8226 23.7499 55.4677 21.2079L52.9484 20.2002"
            stroke="CurrentColor"
            strokeWidth="1.5"
          />
          <path
            d="M55.4677 44.7923C61.8226 42.2503 65 40.9794 65 39.4C65 37.8206 61.8226 36.5497 55.4677 34.0077L52.9484 33M13.0516 33L10.5323 34.0077C4.17742 36.5497 1 37.8206 1 39.4C1 40.9794 4.17742 42.2503 10.5323 44.7923L19.5194 48.3871C25.8742 50.929 29.0516 52.2 33 52.2C36.0526 52.2 38.6444 51.4403 42.6 49.9209"
            stroke="CurrentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      label: tService('items.translation.title'),
      title: tService('items.translation.subtitle'),
    },
  ]

  return (
    <div className="container mx-auto px-4 py-40">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 大的服务卡片 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative overflow-hidden rounded-lg p-8 text-white lg:col-span-2"
          style={{
            backgroundImage: `url('https://cdn.paoscrm.com/assets/service-3-bg.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}>
          {/* 内容区域 */}
          <div className="relative z-10 flex h-full flex-col justify-between">
            {/* 图标和标签 */}
            <div className="mb-6 flex items-start gap-4">
              <div className="shrink-0">
                <Image
                  src="https://cdn.paoscrm.com/assets/sv-icon-3-1.png"
                  alt={`${tCommon('appName')} SCRM`}
                  width={64}
                  height={64}
                  className="h-16 w-16 object-contain"
                />
              </div>
              <span className="pt-2 text-sm font-medium opacity-90">{tCommon('appName')} SCRM</span>
            </div>

            {/* 主标题 */}
            <div className="mb-8 flex-1">
              <h4 className="text-xl leading-relaxed font-semibold md:text-2xl">
                <Link target="_blank" href={LOGIN_URL} className="hover:opacity-90">
                  {tService('mainTitle')
                    .split('|||')
                    .map((part, index, array) => (
                      <span key={index}>
                        {part}
                        {index < array.length - 1 && <br className="hidden md:block" />}
                      </span>
                    ))}
                </Link>
              </h4>
            </div>

            {/* 按钮 */}
            <div>
              <Button asChild size="lg" variant="secondary">
                <Link target="_blank" href={LOGIN_URL}>
                  {tCommon('learnMore')}
                </Link>
              </Button>
            </div>
          </div>

          {/* 右侧装饰形状 */}
          <div className="pointer-events-none absolute right-0 bottom-0 z-10 hidden lg:block">
            <Image src="https://cdn.paoscrm.com/assets/service-shape-3-1.png" alt="" width={200} height={200} className="h-auto w-auto opacity-70" />
          </div>
        </motion.div>

        {/* 小的服务卡片 */}
        {smallServices.map((service, index) => (
          <motion.div
            key={service.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            className="bg-card flex flex-col rounded-lg border p-6 shadow-sm transition-all hover:shadow-lg">
            <div className="mb-4 flex justify-center">{service.icon}</div>
            <div className="flex flex-1 flex-col text-center">
              <span className="text-muted-foreground mb-3 text-sm font-medium">{service.label}</span>
              <h3 className="mb-4 flex-1 text-base leading-relaxed font-semibold">
                <div className="text-foreground">
                  {service.title.split('|||').map((line, i, array) => (
                    <span key={i}>
                      {line}
                      {i < array.length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </h3>
              <div className="mt-auto">
                <Button asChild variant="ghost" size="sm" className="text-sm">
                  <Link target="_blank" href={LOGIN_URL}>
                    {tCommon('learnMore')} <span className="ml-1">→</span>
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
