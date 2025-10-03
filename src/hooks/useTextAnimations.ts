import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// 文字移入动画hook
export const useTextSlideIn = (direction: 'left' | 'right' | 'up' | 'down' = 'up', delay: number = 0) => {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // 设置初始状态
    const initialProps = {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
      scale: 0.95
    };

    gsap.set(element, initialProps);

    // 创建动画
    gsap.to(element, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: 1,
      delay,
      ease: "power3.out"
    });
  }, [direction, delay]);

  return textRef;
};

// 文字打字机效果hook
export const useTypewriter = (text: string, speed: number = 0.05, delay: number = 0) => {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    element.textContent = '';
    
    gsap.to(element, {
      duration: text.length * speed,
      delay,
      ease: "none",
      onUpdate: function() {
        const progress = this.progress();
        const currentLength = Math.floor(progress * text.length);
        element.textContent = text.substring(0, currentLength);
      }
    });
  }, [text, speed, delay]);

  return textRef;
};

// 文字循环动画hook
export const useTextLoop = (effects: string[] = ['glow', 'pulse', 'float'], interval: number = 3000) => {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    let currentEffectIndex = 0;

    const applyEffect = () => {
      const effect = effects[currentEffectIndex % effects.length];
      
      // 重置所有效果
      gsap.set(element, {
        textShadow: '',
        scale: 1,
        y: 0,
        color: ''
      });

      switch (effect) {
        case 'glow':
          gsap.to(element, {
            textShadow: '0 0 20px rgba(59, 130, 246, 0.8)',
            duration: 1,
            ease: "power2.inOut",
            yoyo: true,
            repeat: 1
          });
          break;
        case 'pulse':
          gsap.to(element, {
            scale: 1.05,
            duration: 0.8,
            ease: "power2.inOut",
            yoyo: true,
            repeat: 1
          });
          break;
        case 'float':
          gsap.to(element, {
            y: -5,
            duration: 1,
            ease: "power2.inOut",
            yoyo: true,
            repeat: 1
          });
          break;
        case 'color':
          gsap.to(element, {
            color: '#3B82F6',
            duration: 1,
            ease: "power2.inOut",
            yoyo: true,
            repeat: 1
          });
          break;
        case 'shake':
          gsap.to(element, {
            x: 5,
            duration: 0.1,
            ease: "power2.inOut",
            yoyo: true,
            repeat: 5
          });
          break;
      }

      currentEffectIndex++;
    };

    // 立即应用第一个效果
    applyEffect();

    // 设置循环
    const intervalId = setInterval(applyEffect, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [effects, interval]);

  return textRef;
};

// 文字悬停动画hook
export const useTextHover = () => {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.05,
        color: '#3B82F6',
        textShadow: '0 0 15px rgba(59, 130, 246, 0.6)',
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        color: '',
        textShadow: '',
        duration: 0.3,
        ease: "power2.out"
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return textRef;
};

// 文字波浪效果hook
export const useTextWave = (delay: number = 0) => {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // 将文字拆分成单个字符
    const text = element.textContent || '';
    const chars = text.split('');
    element.innerHTML = chars.map(char => 
      char === ' ' ? ' ' : `<span class="wave-char">${char}</span>`
    ).join('');

    const charElements = element.querySelectorAll('.wave-char');
    
    gsap.fromTo(charElements, 
      {
        y: 20,
        opacity: 0,
        rotation: 10
      },
      {
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        delay: delay,
        ease: "back.out(1.7)",
        stagger: 0.05
      }
    );

    // 添加持续的波浪效果
    gsap.to(charElements, {
      y: -3,
      duration: 1.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.1
    });
  }, [delay]);

  return textRef;
};

// 文字发光效果hook
export const useTextGlow = (color: string = '#3B82F6', intensity: number = 0.8) => {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    gsap.to(element, {
      textShadow: `0 0 20px ${color}${Math.floor(intensity * 255).toString(16).padStart(2, '0')}`,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  }, [color, intensity]);

  return textRef;
};
