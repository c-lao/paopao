'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'

export default function PlatformSection() {
  const t = useTranslations('platform')

  const platforms = [
    'https://cdn.paoscrm.com/assets/integration-1.png',
    'https://cdn.paoscrm.com/assets/integration-2.png',
    'https://cdn.paoscrm.com/assets/integration-3.png',
    'https://cdn.paoscrm.com/assets/integration-4.png',
    'https://cdn.paoscrm.com/assets/integration-5.png',
    'https://cdn.paoscrm.com/assets/integration-6.png',
    'https://cdn.paoscrm.com/assets/integration-7.png',
    'https://cdn.paoscrm.com/assets/integration-8.png',
    'https://cdn.paoscrm.com/assets/integration-9.png',
    'https://cdn.paoscrm.com/assets/integration-10.png',
    'https://cdn.paoscrm.com/assets/integration-11.png',
    'https://cdn.paoscrm.com/assets/integration-12.png',
    'https://cdn.paoscrm.com/assets/integration-13.png',
    'https://cdn.paoscrm.com/assets/integration-14.png',
    'https://cdn.paoscrm.com/assets/integration-15.png',
    'https://cdn.paoscrm.com/assets/integration-16.png',
  ]

  return (
    <section style={{ backgroundImage: `url('https://cdn.paoscrm.com/assets/integration-bg.jpg')` }} className="bg-cover bg-center py-20">
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
            {platforms.map((platform) => (
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
