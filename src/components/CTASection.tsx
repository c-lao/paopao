import React, { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTextLoop, useTextHover } from '../hooks/useTextAnimations';
import { BASE_URL } from "../contexts/index";

const btnAndroid = `${BASE_URL}btn_andriod_b.png`;

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

const CTASection: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLImageElement>(null);

  // 文字动画hooks
  const titleLoopRef = useTextLoop(['glow', 'pulse', 'shake'], 3000);
  const subtitleHoverRef = useTextHover();

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // 移动端：轻量级快速动画
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 15
      });
      
      gsap.set(buttonRef.current, {
        opacity: 0,
        scale: 0.9
      });

      // 创建快速动画
      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 100%",
          toggleActions: "play none none none"
        }
      });

      mobileTl.to([titleRef.current, subtitleRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(buttonRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.5)"
      }, "-=0.2");

      return;
    }
    
    // 桌面端保持原有效果
    gsap.set([titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: 50
    });
    
    gsap.set(buttonRef.current, {
      opacity: 0,
      scale: 0.5
    });

    // 创建滚动触发动画（仅桌面端）
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // 标题和副标题同时出现
    tl.to([titleRef.current, subtitleRef.current], {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    // 按钮稍微延迟出现
    .to(buttonRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "back.out(1.7)"
    }, "-=0.3");

    // 添加按钮脉冲动画
    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // 添加按钮悬停效果
    const button = buttonRef.current;
    if (button) {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.15,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="py-20 w-full overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          ref={titleRef}
          className="text-2xl sm:text-3xl font-[600] lg:text-4xl font-bold mb-4 cursor-pointer"
        >
          <span ref={titleLoopRef}>{t('cta.title')}</span>
        </h2>
        <p 
          ref={subtitleRef}
          className="text-base sm:text-lg lg:text-xl font-[320] mb-8 cursor-pointer"
        >
          <span ref={subtitleHoverRef}>{t('cta.subtitle')}</span>
        </p>

        <img 
          ref={buttonRef}
          src={btnAndroid} 
          alt={t('hero.downloadWin')} 
          className="h-10 sm:h-11 lg:h-12 m-auto cursor-pointer max-w-full"
        />
      </div>
    </section>
  );
};

export default CTASection;
