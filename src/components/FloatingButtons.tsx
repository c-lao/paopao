import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { BASE_URL } from "../contexts/index";
import { useCrispSimple } from "../hooks/useCrispSimple";
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// 注册 ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const backToTopImage = `${BASE_URL}Frame_427319678.png`;

const FloatingButtons: React.FC = () => {
  const { t } = useTranslation();
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // 客服按钮配置 - 预留图片src和链接地址
  const customerServiceConfig = {
    imageSrc: `${BASE_URL}Frame_427319677.png`, // 预留：请替换为客服按钮图片
    linkUrl: 'https://your-customer-service-url.com', // 预留：请替换为客服链接地址
    altText: 'Customer Service'
  };
  
  // 从 URL 参数获取用户名
  const params = new URLSearchParams(window.location.search);
  const username = params.get('name');
  
  // 获取 Crisp Website ID
  const websiteId = import.meta.env.VITE_CRISP_WEBSITE_ID || 'b38d1c1c-3aef-4d57-be8e-753d7551a413';
  
  // 使用简化的 Crisp Hook
  const { } = useCrispSimple({
    username: username || undefined,
    websiteId,
  });

  useEffect(() => {
    let ticking = false;

    const updateButtonVisibility = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setShowBackToTop(scrollTop > 300);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateButtonVisibility);
        ticking = true;
      }
    };

    // 立即检查初始状态
    updateButtonVisibility();

    // 使用事件捕获模式监听滚动
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    document.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  const scrollToTop = () => {
    
    // 方法1: 使用 GSAP 滚动到顶部
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: 0, autoKill: true },
      ease: "power2.inOut",
    });
    
    // 方法2: 同时尝试直接设置 scrollTop（备用方案）
    gsap.to(document.documentElement, {
      duration: 1.5,
      scrollTop: 0,
      ease: "power2.inOut"
    });
    
    gsap.to(document.body, {
      duration: 1.5,
      scrollTop: 0,
      ease: "power2.inOut"
    });
  };

  const handleCustomerServiceClick = () => {
    // 预留：处理客服按钮点击事件
    // 可以在这里添加自定义逻辑，比如打开聊天窗口、跳转链接等
    if (customerServiceConfig.linkUrl) {
      window.open(customerServiceConfig.linkUrl, '_blank');
    }
  };


  return (
    <>
      {/* Back to Top Button - 右下角 */}
      <div className="fixed right-0 sm:right-4 bottom-20 z-30">
        {showBackToTop && (
          <img 
            src={backToTopImage} 
            alt={t('floatingButtons.backToTop')} 
            className="w-20 sm:w-20 md:w-24 h-auto cursor-pointer" 
            onClick={scrollToTop} 
          />
        )}
      </div>

      {/* Customer Service Button - 页面右侧中间悬浮 */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30">
        <img 
          src={customerServiceConfig.imageSrc} 
          alt={customerServiceConfig.altText} 
          className="w-20 sm:w-18 md:w-20 h-auto cursor-pointer hover:scale-105 transition-transform duration-200" 
          onClick={handleCustomerServiceClick} 
          title="联系客服"
        />
      </div>

      {/* Customer Service Button */}
      {/* <div className="relative">
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "translateY(-24px)" }}>
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {error && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">!</span>
          </div>
        )}
      </div> */}
    </>
  );
};

export default FloatingButtons;
