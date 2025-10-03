import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTextLoop, useTextHover } from '../hooks/useTextAnimations'
import { BASE_URL } from "../contexts/index";

const AdvantageIcon1 = `${BASE_URL}Frame_427319663_01.png`;
const AdvantageIcon2 = `${BASE_URL}Frame_427319663_02.png`;
const AdvantageIcon3 = `${BASE_URL}Frame_427319663_03.png`;
const AdvantageIcon4 = `${BASE_URL}Frame_427319663_04.png`;

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger)

const Advantages: React.FC = () => {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  // 文字动画hooks
  const titleLoopRef = useTextLoop(['glow', 'pulse'], 5000)
  const subtitleHoverRef = useTextHover()
  
  const advantages = [
    {
      icon: <img src={AdvantageIcon1} alt={t('advantages.items.accurateTranslation.title')} className='w-16 h-16' />,
      title: t('advantages.items.accurateTranslation.title'),
      description: t('advantages.items.accurateTranslation.description'),
      titleRef: useTextHover()
    },
    {
      icon: <img src={AdvantageIcon2} alt={t('advantages.items.fastResponse.title')} className='w-16 h-16' />,
      title: t('advantages.items.fastResponse.title'),
      description: t('advantages.items.fastResponse.description'),
      titleRef: useTextHover()
    },
    {
      icon: <img src={AdvantageIcon3} alt={t('advantages.items.easyOperation.title')} className='w-16 h-16' />,
      title: t('advantages.items.easyOperation.title'),
      description: t('advantages.items.easyOperation.description'),
      titleRef: useTextHover()
    },
    {
      icon: <img src={AdvantageIcon4} alt={t('advantages.items.secureReliable.title')} className='w-16 h-16' />,
      title: t('advantages.items.secureReliable.title'),
      description: t('advantages.items.secureReliable.description'),
      titleRef: useTextHover()
    }
  ]

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean)
    const isMobile = window.innerWidth < 768
    
    if (isMobile) {
      // 移动端：轻量级快速动画
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 15
      })
      
      gsap.set(cards, {
        opacity: 0,
        y: 20,
        scale: 0.95
      })

      // 创建快速动画 - 一进入视口就立即触发
      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 100%", // 刚进入视口就触发
          toggleActions: "play none none none"
        }
      })

      // 快速淡入动画
      mobileTl.to([titleRef.current, subtitleRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.2")

      return
    }
    
    // 桌面端保持原有效果
    gsap.set([titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: 50
    })
    
    gsap.set(cards, {
      opacity: 0,
      y: 80,
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

    // 标题和副标题同时出现
    tl.to([titleRef.current, subtitleRef.current], {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })

    // 卡片分组同时出现 - 前两个卡片一组，后两个卡片一组
    const firstGroup = cards.slice(0, 2);
    const secondGroup = cards.slice(2, 4);
    
    // 第一组卡片同时出现
    tl.to(firstGroup, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.3")
    
    // 第二组卡片同时出现
    .to(secondGroup, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.1")

    // 添加卡片悬停效果
    cards.forEach(card => {
      const icon = card.querySelector('img')
      const title = card.querySelector('h3')
      const description = card.querySelector('p')

      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          duration: 0.3,
          ease: "power2.out"
        })
        gsap.to(icon, {
          scale: 1.2,
          rotation: 5,
          duration: 0.3,
          ease: "power2.out"
        })
        gsap.to([title, description], {
          color: "#3B82F6",
          duration: 0.3,
          ease: "power2.out"
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        })
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        })
        gsap.to([title, description], {
          color: "",
          duration: 0.3,
          ease: "power2.out"
        })
      })
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
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl lg:text-5xl font-semibold text-black text-b mb-6 cursor-pointer"
          >
            <span ref={titleLoopRef}>{t('advantages.title')}</span>
          </h2>
          <p 
            ref={subtitleRef}
            className="text-l font-light text-black max-w-5xl mx-auto cursor-pointer"
          >
            <span ref={subtitleHoverRef}>{t('advantages.subtitle')}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              ref={el => {
                if (el) cardsRef.current[index] = el
              }}
              className="w-full bg-[#F8FBFF] rounded-xl p-6 lg:p-8 shadow-sm flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow duration-300"
            >
              <div className='mb-2'>
                {advantage.icon}
              </div>
              <h3 className="text-lg font-bold mb-4 cursor-pointer">
                <span ref={advantage.titleRef}>{advantage.title}</span>
              </h3>
              <p className="text-[12px] text-gray-700 leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Advantages
