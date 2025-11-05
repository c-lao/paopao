'use client'

import { ASSETS, PLATFORMS } from '@/constants'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'

export default function PlatformSection() {
  const t = useTranslations('platform')

  return (
    <section style={{ backgroundImage: `url(${ASSETS.integrationBg})` }} className="bg-cover bg-center py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 flex flex-col gap-2 text-3xl font-bold md:text-4xl lg:text-5xl">
            <p>{t('title')}</p>
            <p>{t('subtitle')}</p>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">{t('description')}</p>
        </div>

        <Marquee speed={150}>
          <div className="flex space-x-4">
            {PLATFORMS.map((platform) => (
              <div key={platform}>
                <Image src={platform} alt={platform} width={250} height={150} />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  )
}
