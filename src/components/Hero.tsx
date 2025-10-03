import React, { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTextLoop, useTextHover, useTextWave } from '../hooks/useTextAnimations';
import { BASE_URL, DOWNLOAD_URL } from "../contexts/index";

const btnAndroid = `${BASE_URL}btn_andriod_b_01.png`;
const heroImage = `${BASE_URL}Frame_427319301_new.png`;
const backgroundImage = `${BASE_URL}image_bg.png`;

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // 文字动画hooks
  const titleLoopRef = useTextLoop(['glow', 'pulse', 'float'], 4000);
  const subtitleHoverRef = useTextHover();
  const descriptionWaveRef = useTextWave(0.5);

  // 按钮动画refs
  const iosButtonRef = useRef<HTMLButtonElement>(null);
  const androidButtonRef = useRef<HTMLButtonElement>(null);
  
  // 右侧电脑区域背景动效refs
  const computerBackgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // 设置初始状态
    gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current, buttonsRef.current, imageRef.current], {
      opacity: 0,
      y: 50
    });

    // 创建动画序列 - 优化为分组同时出现
    // 第一组：标题和副标题同时出现
    tl.to([titleRef.current, subtitleRef.current], {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    // 第二组：描述文字和按钮同时出现
    .to([descriptionRef.current, buttonsRef.current], {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.3")
    // 第三组：图片单独出现（稍微延迟）
    .to(imageRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "back.out(1.7)"
    }, "-=0.2");

    // 添加浮动动画到图片
    gsap.to(imageRef.current, {
      y: -5,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // 为按钮添加新的动画效果
    const addButtonAnimations = (button: HTMLButtonElement, isIos: boolean = false) => {
      // 设置初始状态
      gsap.set(button, {
        scale: 1,
        y: 0,
        rotation: 0,
        opacity: 1,
        filter: "brightness(1) saturate(1)"
      });

      // 创建主时间轴动画
      const mainTl = gsap.timeline({ repeat: -1 });
      
      // 添加呼吸效果
      mainTl.to(button, {
        scale: 1.03,
        duration: 2,
        ease: "power2.inOut"
      })
      .to(button, {
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      });

      // 添加轻微的上下浮动
      gsap.to(button, {
        y: -6,
        duration: 2.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // 添加轻微的旋转摆动
      gsap.to(button, {
        rotation: 1,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // 添加悬停效果
      button.addEventListener('mouseenter', () => {
        gsap.killTweensOf(button);
        
        // 悬停时的弹性效果
        gsap.to(button, {
          scale: 1.1,
          y: -15,
          rotation: 3,
          filter: "brightness(1.15) saturate(1.2)",
          duration: 0.5,
          ease: "back.out(1.7)"
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          y: 0,
          rotation: 0,
          filter: "brightness(1) saturate(1)",
          duration: 0.4,
          ease: "power2.out"
        });
        // 重新开始动画
        setTimeout(() => {
          addButtonAnimations(button, isIos);
        }, 400);
      });
    };

    // 为两个按钮添加动画效果
    if (iosButtonRef.current) {
      addButtonAnimations(iosButtonRef.current, true);
    }
    if (androidButtonRef.current) {
      addButtonAnimations(androidButtonRef.current, false);
    }

    // 添加右侧电脑区域光晕背景动效
    const addComputerGlowAnimation = () => {
      if (!computerBackgroundRef.current) return;

      const glowElement = computerBackgroundRef.current;
      
      // 设置初始状态
      gsap.set(glowElement, {
        opacity: 0.6,
        scale: 1,
      });

      // 创建呼吸光晕效果
      gsap.to(glowElement, {
        opacity: 0.3,
        scale: 1.1,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // 添加轻微的旋转效果
      gsap.to(glowElement, {
        rotation: 5,
        duration: 8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    };

    // 延迟启动电脑区域光晕动画
    setTimeout(() => {
      addComputerGlowAnimation();
    }, 100);

    return () => {
      // 清理事件监听器和动画
      const buttons = [iosButtonRef.current, androidButtonRef.current].filter(Boolean);
      buttons.forEach(button => {
        if (button) {
          gsap.killTweensOf(button);
          button.removeEventListener('mouseenter', () => {});
          button.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, []);
  
  return (
    <section
      ref={heroRef}
      className="relative min-h-[500px] sm:min-h-[600px] lg:h-[600px] flex items-center overflow-hidden bg-cover bg-center bg-no-repeat pt-16 w-full"
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 font-alimama w-full">
        <div
          className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center"
          style={{ fontFamily: "Alimama ShuHeiTi" }}
        >
          {/* Left Content */}
          <div className="text-white text-center lg:text-left order-2 lg:order-1">
            <h1 
              ref={titleRef}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-white leading-tight sm:leading-none cursor-pointer"
            >
              <span ref={titleLoopRef}>{t('hero.title')}</span>
            </h1>
            <h2 
              ref={subtitleRef}
              className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-6 sm:mb-8 text-white leading-tight cursor-pointer"
            >
              <span ref={subtitleHoverRef}>{t('hero.subtitle')}</span>
            </h2>
            <p 
              ref={descriptionRef}
              className="text-sm sm:text-base lg:text-lg mb-8 sm:mb-12 leading-relaxed text-white font-medium max-w-lg mx-auto lg:mx-0 cursor-pointer"
            >
              <span ref={descriptionWaveRef}>{t('hero.description')}</span>
            </p>

            {/* Download Buttons */}
            <div 
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start items-center"
            >
              <button 
                ref={androidButtonRef}
                className="transition-transform duration-200 rounded-lg overflow-hidden w-full sm:w-auto max-w-[200px]"
                style={{ 
                  transform: "translateZ(0)" // 启用硬件加速
                }}
              >
                <img 
                  src={btnAndroid} 
                  alt={t('hero.downloadWin')} 
                  className="h-10 sm:h-11 lg:h-12 w-full object-contain" 
                  onClick={() => window.open(DOWNLOAD_URL, '_blank')}
                />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end relative order-1 lg:order-2 w-full max-w-full pb-6 pt-2">
            {/* 电脑区域光晕背景动效 - 在移动端减弱效果 */}
            <div 
              ref={computerBackgroundRef} 
              className="absolute inset-0 pointer-events-none hidden sm:block"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 70%)',
                filter: 'blur(20px)',
                transform: 'scale(1.2)',
              }}
            />
            <div 
              className="absolute inset-0 pointer-events-none hidden sm:block"
              style={{
                background: 'radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 60%)',
                filter: 'blur(15px)',
                transform: 'scale(1.1)',
              }}
            />
            <div 
              className="absolute inset-0 pointer-events-none hidden sm:block"
              style={{
                background: 'radial-gradient(ellipse at 70% 80%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)',
                filter: 'blur(25px)',
                transform: 'scale(1.3)',
              }}
            />

            <img
              ref={imageRef}
              src={heroImage}
              alt="泡泡应用界面"
              className="max-w-full h-auto w-[280px] sm:w-[350px] md:w-[400px] lg:w-full lg:max-w-[500px] relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
