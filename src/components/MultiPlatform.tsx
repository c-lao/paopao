import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BASE_URL } from "../contexts/index";

const multiPlatformImage = `${BASE_URL}Frame_427319664_new.png`;

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger)

const MultiPlatform: React.FC = () => {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    
    if (isMobile) {
      // 移动端：轻量级快速动画
      gsap.set(imageRef.current, {
        opacity: 0,
        x: -20,
        scale: 0.95
      })
      
      gsap.set(contentRef.current, {
        opacity: 0,
        x: 20
      })

      // 创建快速动画
      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 100%",
          toggleActions: "play none none none"
        }
      })

      mobileTl.to([imageRef.current, contentRef.current], {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      })

      return
    }
    
    // 桌面端保持原有效果
    gsap.set(imageRef.current, {
      opacity: 0,
      x: -100,
      scale: 0.8
    })
    
    gsap.set(contentRef.current, {
      opacity: 0,
      x: 100
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

    // 图片和内容同时出现
    tl.to([imageRef.current, contentRef.current], {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.2,
      ease: "power2.out"
    })

    // 添加图片浮动效果
    gsap.to(imageRef.current, {
      y: -20,
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
    <section ref={sectionRef} className="py-20 bg-white w-full overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative w-full max-w-full">
            <img 
              ref={imageRef}
              src={multiPlatformImage} 
              alt="Multi-platform device display" 
              className="w-full h-auto max-w-full lg:max-w-lg mx-auto"
            />
          </div>
          <div ref={contentRef}>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-blue mb-6">
              {t('features.title')}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {t('features.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MultiPlatform
