import React, { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTextLoop, useTextHover } from '../hooks/useTextAnimations';
import { BASE_URL } from "../contexts/index";

const socialIcon = `${BASE_URL}Frame_427319671.png`;

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

const SocialApps: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // 文字动画hooks
  const titleLoopRef = useTextLoop(['glow', 'pulse'], 4000);
  const descriptionHoverRef = useTextHover();

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // 移动端：轻量级快速动画
      gsap.set(contentRef.current, {
        opacity: 0,
        x: -20
      });
      
      gsap.set(imageRef.current, {
        opacity: 0,
        x: 20,
        scale: 0.95
      });

      // 创建快速动画
      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 100%",
          toggleActions: "play none none none"
        }
      });

      mobileTl.to([contentRef.current, imageRef.current], {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });

      return;
    }
    
    // 桌面端保持原有效果
    gsap.set(contentRef.current, {
      opacity: 0,
      x: -100
    });
    
    gsap.set(imageRef.current, {
      opacity: 0,
      x: 100,
      scale: 0.8
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

    // 内容和图片同时出现
    tl.to([contentRef.current, imageRef.current], {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.2,
      ease: "power2.out"
    });

    // 添加图片浮动效果
    gsap.to(imageRef.current, {
      y: -15,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);
  
  return (
    <section id="social-apps" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center justify-between">
          {/* Left Content */}
          <div ref={contentRef}>
            <h2 className="text-4xl lg:text-4xl font-bold text-dark-blue mb-6 cursor-pointer">
              <span ref={titleLoopRef}>{t('socialApps.title')}</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed cursor-pointer">
              <span ref={descriptionHoverRef}>{t('socialApps.description')}</span>
            </p>
          </div>

          <img 
            ref={imageRef}
            src={socialIcon} 
            alt="Social Apps" 
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default SocialApps;
