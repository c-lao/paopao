'use client'
import { ThemeLang } from '@/components/theme-lang'
import { Button } from '@/components/ui/button'
import { ASSETS, LOGIN_URL, REGISTER_URL } from '@/constants'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function Header() {
  const t = useTranslations()

  const [y, setY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 right-0 left-0 z-50 bg-transparent transition-all duration-300 ${y > 100 ? 'bg-white/80 backdrop-blur' : ''}`}>
      <div className="relative container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-1.5">
          <Image src={ASSETS.logo} alt="logo" width={48} height={48} />
        </Link>

        <div className="flex items-center gap-4">
          <ThemeLang />
          <Button asChild variant="outline" className="hidden md:inline-flex">
            <Link target="_blank" href={LOGIN_URL}>
              {t('common.login')}
            </Link>
          </Button>
          <Button asChild className="hidden md:inline-flex">
            <Link target="_blank" href={REGISTER_URL}>
              {t('common.freeTrial')}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
