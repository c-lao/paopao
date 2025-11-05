import { interSans } from '@/lib/fonts'
import { useLocale } from 'next-intl'
import Footer from './components/footer'
import Header from './components/header'

interface HomeLayoutProps {
  children: React.ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  const locale = useLocale()
  return (
    <html lang={locale}>
      <body className={`${interSans.variable} font-sans antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
