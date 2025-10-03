import React, { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTextLoop, useTextHover } from '../hooks/useTextAnimations';
import { BASE_URL } from "../contexts/index";

const Img1 = `${BASE_URL}Slice.png`;
const Img2 = `${BASE_URL}Slice_1.png`;
const Img3 = `${BASE_URL}Slice_2.png`;
const Img4 = `${BASE_URL}Slice_3.png`;
const Img5 = `${BASE_URL}Slice_4.png`;
const Img6 = `${BASE_URL}Slice_5.png`;

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

const TranslationChannels: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const channelsRef = useRef<HTMLDivElement[]>([]);

  // 文字动画hooks
  const titleLoopRef = useTextLoop(['glow', 'pulse'], 4000);
  const subtitleHoverRef = useTextHover();
  
  const channels = [
    { name: t('translationChannels.channels.google'), img: Img1, color: "bg-blue-500", nameRef: useTextHover() },
    { name: t('translationChannels.channels.deepl'), img: Img2, color: "bg-orange-500", nameRef: useTextHover() },
    { name: t('translationChannels.channels.baidu'), img: Img3, color: "bg-blue-600", nameRef: useTextHover() },
    { name: t('translationChannels.channels.tencent'), img: Img4, color: "bg-green-500", nameRef: useTextHover() },
    { name: t('translationChannels.channels.youdao'), img: Img5, color: "bg-red-500", nameRef: useTextHover() },
    { name: t('translationChannels.channels.bytedance'), img: Img6, color: "bg-purple-500", nameRef: useTextHover() },
  ];

  useEffect(() => {
    const channelElements = channelsRef.current.filter(Boolean);
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // 移动端：轻量级快速动画
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 15
      });
      
      gsap.set(channelElements, {
        opacity: 0,
        y: 20,
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

      mobileTl.to([titleRef.current, subtitleRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(channelElements, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out"
      }, "-=0.2");

      return;
    }
    
    // 桌面端保持原有效果
    gsap.set([titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: 50
    });
    
    gsap.set(channelElements, {
      opacity: 0,
      y: 80,
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
    });

    // 所有渠道图标同时出现
    tl.to(channelElements, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.3");

    // 添加悬停效果
    channelElements.forEach(channel => {
      const img = channel.querySelector('img');
      const text = channel.querySelector('span');

      channel.addEventListener('mouseenter', () => {
        gsap.to(channel, {
          scale: 1.1,
          y: -10,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(img, {
          scale: 1.2,
          rotation: 5,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(text, {
          color: "#3B82F6",
          duration: 0.3,
          ease: "power2.out"
        });
      });

      channel.addEventListener('mouseleave', () => {
        gsap.to(channel, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(img, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(text, {
          color: "",
          duration: 0.3,
          ease: "power2.out"
        });
      });
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
    <section ref={sectionRef} className="py-20 bg-white w-full overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl lg:text-4xl font-bold text-dark-blue mb-4 cursor-pointer"
          >
            <span ref={titleLoopRef}>{t('translationChannels.title')}</span>
          </h2>
          <p 
            ref={subtitleRef}
            className="text-lg text-gray-600 max-w-4xl mx-auto cursor-pointer"
          >
            <span ref={subtitleHoverRef}>{t('translationChannels.description')}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {channels.map((channel, index) => (
            <div
              key={index}
              ref={el => {
                if (el) channelsRef.current[index] = el;
              }}
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <img src={channel.img} alt={channel.name} className="w-16 mb-4" />
              <span ref={channel.nameRef} className="text-xs font-medium text-center text-gray-700 cursor-pointer">
                {channel.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TranslationChannels;
