import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import './globals.css'

export const metadata: Metadata = {
  title: '泡泡SCRM | 全球出海社交聚合智能平台|多聚合聊天|谷歌DeepL实时翻译软件-系统官网',
  description: '即使不懂客户的语言，也能与他们沟通',
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const messages = await getMessages()
  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
}
