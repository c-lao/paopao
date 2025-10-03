import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BASE_URL } from "../contexts/index";

const communicationImage = `${BASE_URL}Frame_427319664.png`;

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger)

const Communication: React.FC = () => {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    
    if (isMobile) {
      // 移动端：轻量级快速动画
      gsap.set(contentRef.current, {
        opacity: 0,
        x: -20
      })
      
      gsap.set(imageRef.current, {
        opacity: 0,
        x: 20,
        scale: 0.95
      })

      // 创建快速动画
      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 100%",
          toggleActions: "play none none none"
        }
      })

      mobileTl.to([contentRef.current, imageRef.current], {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      })

      return
    }
    
    // 桌面端保持原有效果
    gsap.set(contentRef.current, {
      opacity: 0,
      x: -100
    })
    
    gsap.set(imageRef.current, {
      opacity: 0,
      x: 100,
      scale: 0.8
    })

    // 创建滚动触发动画（仅桌面端）
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // 内容和图片同时出现
    tl.to([contentRef.current, imageRef.current], {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.2,
      ease: "power2.out"
    })

    // 添加图片浮动效果
    gsap.to(imageRef.current, {
      y: -15,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])
  
  return (
    <section ref={sectionRef} className="py-20 w-full overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div ref={contentRef}>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-blue mb-6">
              {t('communication.title')}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('communication.description')}
            </p>
          </div>

          {/* Right Image */}
          <div className="relative w-full max-w-full">
            <img 
              ref={imageRef}
              src={communicationImage} 
              alt="Work and Life Assistant" 
              className="w-full h-auto max-w-full lg:max-w-lg mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Communication
