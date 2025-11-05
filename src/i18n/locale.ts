'use client'

import { Locale, defaultLocale } from '@/i18n/config'

const STORAGE_KEY = 'NEXT_LOCALE'

export function getUserLocale(): Locale {
  if (typeof window === 'undefined') {
    return defaultLocale
  }
  const stored = localStorage.getItem(STORAGE_KEY)
  return (stored as Locale) || defaultLocale
}

export function setUserLocale(locale: Locale) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, locale)
    // 刷新页面以应用新语言
    window.location.reload()
  }
}
