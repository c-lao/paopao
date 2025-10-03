import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BASE_URL } from "../contexts/index";

const logo = `${BASE_URL}logo.png`;

const Header: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    let ticking = false

    const updateHeaderState = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      setIsScrolled(scrollTop > 5)
      
      // 检测当前区域
      const socialAppsElement = document.getElementById('social-apps')
      if (socialAppsElement) {
        const rect = socialAppsElement.getBoundingClientRect()
        if (rect.top <= 100) {
          setActiveSection('features')
        } else {
          setActiveSection('home')
        }
      }
      
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderState)
        ticking = true
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.language-selector')) {
        setIsDropdownOpen(false)
      }
      if (!target.closest('.mobile-menu') && !target.closest('.hamburger-button')) {
        setIsMobileMenuOpen(false)
      }
    }

    // 立即检查初始状态
    updateHeaderState()

    // 多种方式监听滚动 - 包括捕获阶段
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true })
    document.addEventListener('scroll', handleScroll, { passive: true, capture: true })
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      window.removeEventListener('scroll', handleScroll, true)
      document.removeEventListener('scroll', handleScroll, true)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setIsDropdownOpen(false)
  }

  const scrollToTop = () => {
    setActiveSection('home')
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const scrollToSocialApps = () => {
    setActiveSection('features')
    const socialAppsElement = document.getElementById('social-apps')
    if (socialAppsElement) {
      socialAppsElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
      isScrolled 
        ? 'bg-[#9BDCF7] border-b border-[#9BDCF7]/30 shadow-xl backdrop-blur-lg' 
        : 'bg-transparent border-none shadow-none'
    }`}>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <img src={logo} alt="泡泡" className="h-10 sm:h-12 md:h-14" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10 flex-1 font-alibaba text-base font-medium ml-16">
            <button onClick={scrollToTop} className={`px-3 py-2 text-base font-medium transition-all duration-300 relative ${
              isScrolled
                ? 'text-white hover:text-blue-100'
                : 'text-white hover:text-white/80'
            }`}>
              {t('header.home')}
              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 transition-all duration-300 ${
                activeSection === 'home' 
                  ? 'bg-white' 
                  : 'bg-transparent'
              }`}></div>
            </button>
            <button onClick={scrollToSocialApps} className={`px-3 py-2 text-base font-medium transition-all duration-300 relative ${
              isScrolled
                ? 'text-white hover:text-blue-100'
                : 'text-white hover:text-white/80'
            }`}>
              {t('header.features')}
              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 transition-all duration-300 ${
                activeSection === 'features' 
                  ? 'bg-white' 
                  : 'bg-transparent'
              }`}></div>
            </button>
          </nav>

          {/* Desktop Auth Buttons and Language Selector */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Login Button */}
            <a 
              href="https://main.scrm-admin.pages.dev/#/auth/login"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isScrolled
                  ? 'text-white hover:text-blue-100 hover:bg-white/10'
                  : 'text-white hover:text-white/80 hover:bg-white/10'
              }`}
            >
              {t('header.login')}
            </a>

            {/* Register Button */}
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                isScrolled
                  ? 'text-white border-white hover:bg-white hover:text-blue-600'
                  : 'text-white border-white hover:bg-white hover:text-blue-600'
              }`}
            >
              {t('header.register')}
            </button>

            {/* Language Selector */}
            <div className="relative language-selector">
              <div 
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span className="text-white text-sm font-medium">{t('header.language')}</span>
                <svg className={`w-4 h-4 text-white transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="py-1">
                    <div 
                      className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 cursor-pointer transition-colors"
                      onClick={() => changeLanguage('en')}
                    >
                      English/USD
                    </div>
                    <div 
                      className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 cursor-pointer transition-colors"
                      onClick={() => changeLanguage('zh')}
                    >
                      中文/CNY
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden hamburger-button p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mobile-menu py-4 border-t border-white/20 mt-2">
            <nav className="flex flex-col space-y-3">
              <button onClick={scrollToTop} className={`px-4 py-2 text-base font-medium text-white hover:bg-white/10 rounded-lg transition-all duration-300 text-left relative ${
                activeSection === 'home' ? 'bg-white/10' : ''
              }`}>
                {t('header.home')}
                <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 transition-all duration-300 ${
                  activeSection === 'home' 
                    ? 'bg-white' 
                    : 'bg-transparent'
                }`}></div>
              </button>
              <button onClick={scrollToSocialApps} className={`px-4 py-2 text-base font-medium text-white hover:bg-white/10 rounded-lg transition-all duration-300 text-left relative ${
                activeSection === 'features' ? 'bg-white/10' : ''
              }`}>
                {t('header.features')}
                <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 transition-all duration-300 ${
                  activeSection === 'features' 
                    ? 'bg-white' 
                    : 'bg-transparent'
                }`}></div>
              </button>
              
              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-2 pt-2">
                <a 
                  href="https://main.scrm-admin.pages.dev/#/auth/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium text-center text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  {t('header.login')}
                </a>
                <button className="px-4 py-2 text-sm font-medium text-center text-white border border-white hover:bg-white hover:text-blue-600 rounded-lg transition-colors">
                  {t('header.register')}
                </button>
              </div>

              {/* Mobile Language Selector */}
              <div className="pt-2 border-t border-white/20 language-selector">
                <div 
                  className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <span className="text-white text-sm font-medium">{t('header.language')}</span>
                  </div>
                  <svg className={`w-4 h-4 text-white transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {isDropdownOpen && (
                  <div className="mt-2 bg-white/10 rounded-lg overflow-hidden">
                    <div 
                      className="px-4 py-2 text-sm text-white hover:bg-white/10 cursor-pointer transition-colors"
                      onClick={() => changeLanguage('en')}
                    >
                      English/USD
                    </div>
                    <div 
                      className="px-4 py-2 text-sm text-white hover:bg-white/10 cursor-pointer transition-colors"
                      onClick={() => changeLanguage('zh')}
                    >
                      中文/CNY
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
