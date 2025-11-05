import { useTranslations } from 'next-intl'

const Footer = () => {
  const t = useTranslations()
  return (
    <footer className="py-8">
      <p className="text-center text-sm">
        © {new Date().getFullYear()} {t('common.appName')}. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
