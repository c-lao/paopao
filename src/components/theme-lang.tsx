'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { setUserLocale } from '@/i18n/locale'
import { Globe } from 'lucide-react'
import { useLocale } from 'next-intl'

export function ThemeLang() {
  const locale = useLocale()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={locale}>
          <DropdownMenuRadioItem value="zh" onClick={() => setUserLocale('zh')}>
            中文
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en" onClick={() => setUserLocale('en')}>
            English
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
