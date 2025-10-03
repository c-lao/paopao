import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    return () => {
      // 清理ScrollTrigger实例
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return elementRef;
};

// 淡入动画hook
export const useFadeIn = (delay: number = 0, duration: number = 1) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.fromTo(element, 
      { 
        opacity: 0, 
        y: 50 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration, 
        delay,
        ease: "power2.out"
      }
    );
  }, []);

  return elementRef;
};

// 从左侧滑入动画hook
export const useSlideInLeft = (delay: number = 0, duration: number = 1) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.fromTo(element, 
      { 
        opacity: 0, 
        x: -100 
      },
      { 
        opacity: 1, 
        x: 0, 
        duration, 
        delay,
        ease: "power2.out"
      }
    );
  }, []);

  return elementRef;
};

// 从右侧滑入动画hook
export const useSlideInRight = (delay: number = 0, duration: number = 1) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.fromTo(element, 
      { 
        opacity: 0, 
        x: 100 
      },
      { 
        opacity: 1, 
        x: 0, 
        duration, 
        delay,
        ease: "power2.out"
      }
    );
  }, []);

  return elementRef;
};

// 缩放进入动画hook
export const useScaleIn = (delay: number = 0, duration: number = 1) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.fromTo(element, 
      { 
        opacity: 0, 
        scale: 0.8 
      },
      { 
        opacity: 1, 
        scale: 1, 
        duration, 
        delay,
        ease: "back.out(1.7)"
      }
    );
  }, []);

  return elementRef;
};

// 打字机效果hook
export const useTypewriter = (text: string, speed: number = 0.05) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.textContent = '';
    
    gsap.to(element, {
      duration: text.length * speed,
      ease: "none",
      onUpdate: function() {
        const progress = this.progress();
        const currentLength = Math.floor(progress * text.length);
        element.textContent = text.substring(0, currentLength);
      }
    });
  }, [text, speed]);

  return elementRef;
};

// 滚动触发动画hook
export const useScrollTrigger = (
  trigger: string,
  animation: gsap.core.Timeline,
  start: string = "top 80%",
  end: string = "bottom 20%"
) => {
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger,
      start,
      end,
      animation,
      toggleActions: "play none none reverse"
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [trigger, animation, start, end]);
};

// 脉冲动画hook
export const usePulse = (delay: number = 0) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      scale: 1.05,
      duration: 1,
      delay,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  }, [delay]);

  return elementRef;
};

// 浮动动画hook
export const useFloat = (delay: number = 0) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      y: -20,
      duration: 2,
      delay,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  }, [delay]);

  return elementRef;
};
