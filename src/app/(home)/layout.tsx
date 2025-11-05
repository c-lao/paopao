import { interSans } from '@/lib/fonts'
import { useLocale } from 'next-intl'
import Link from 'next/link'
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

        <div className="fixed right-7 bottom-7 flex flex-col gap-4 hover:cursor-pointer">
          <Link href="https://t.me/popo_CS" target="_blank" className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="35" height="30">
              <defs>
                <filter id="c" width="131.4%" height="138.7%" x="-15.7%" y="-15.1%">
                  <feMorphology in="SourceAlpha" operator="dilate" radius="1" result="shadowSpreadOuter1" />
                  <feOffset dy="1" in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
                  <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="1" />
                  <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1" />
                  <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0" />
                </filter>
                <path id="a" d="m14.23 20.46-9.65 1.1L3 5.12 30.07 2l1.58 16.46-9.37 1.07-3.5 5.72-4.55-4.8z" />
              </defs>
              <g fill="none" fillRule="evenodd">
                <use xlinkHref="#a" fill="#000" filter="url(#c)" />
                <use xlinkHref="#a" fill="#fff" stroke="#fff" strokeWidth="2" />
              </g>
            </svg>
          </Link>
        </div>
      </body>
    </html>
  )
}
