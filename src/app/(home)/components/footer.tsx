import { ASSETS } from '@/constants'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="relative">
      <Image
        src={ASSETS.footerBg}
        alt="footer-bg"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        className="absolute top-0 left-0 -z-10"
      />
    </footer>
  )
}

export default Footer
