import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "react-fast-marquee";
import { BASE_URL } from "../contexts/index";

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

const reviewImage = `${BASE_URL}quotation_mark.png`;
const avatar1 = `${BASE_URL}profile_photo_01.png`;
const avatar2 = `${BASE_URL}profile_photo_02.png`;
const avatar3 = `${BASE_URL}profile_photo_03.png`;
const avatar4 = `${BASE_URL}profile_photo_04.png`;
const avatar5 = `${BASE_URL}profile_photo_03.png`;
const avatar6 = `${BASE_URL}profile_photo_06.png`;
const avatar7 = `${BASE_URL}profile_photo_07.png`;
const avatar8 = `${BASE_URL}profile_photo_08.png`;
const avatar9 = `${BASE_URL}profile_photo_09.png`;
const avatar10 = `${BASE_URL}profile_photo_10.png`;
const avatar11 = `${BASE_URL}profile_photo_11.png`;
const avatar12 = `${BASE_URL}profile_photo_12.png`;

const UserReviews: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [marqueeKey, setMarqueeKey] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const reviewTexts = t("userReviews.reviews", {
    returnObjects: true,
  }) as string[] || [];

  // 头像数组
  const avatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10,
    avatar11,
    avatar12,
  ];

  // 创建评价数据，每个评价随机分配一个头像
  const reviews = reviewTexts.map((text, index) => ({
    id: index + 1,
    text: text,
    avatar: avatars[index % avatars.length], // 循环使用头像
  }));

  useEffect(() => {
    const updateIsMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 770);
      }
    };
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  // 监听并记录容器宽度，用于计算需要渲染的卡片数量
  useLayoutEffect(() => {
    const measure = () => {
      if (marqueeRef.current) {
        setContainerWidth(marqueeRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    
    if (isMobile) {
      // 移动端：轻量级快速动画
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 15,
        scale: 0.98,
      });

      gsap.set(marqueeRef.current, {
        opacity: 0,
        y: 20,
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
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(marqueeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.2")
      .add(() => setMarqueeKey((k) => k + 1));

      return;
    }
    
    // 桌面端保持原有效果
    gsap.set([titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: 30,
      scale: 0.95,
    });

    gsap.set(marqueeRef.current, {
      opacity: 0,
      y: 50,
    });

    // 创建滚动触发动画（仅桌面端）
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
    });

    // 标题和副标题同时出现 - 更柔和的动画
    tl.to([titleRef.current, subtitleRef.current], {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
    })

      // 为标题添加微妙的文字动画效果
      .to(
        titleRef.current,
        {
          textShadow: "0 0 20px rgba(255,255,255,0.5)",
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      )
      // 轮播区域延迟出现 - 添加弹性效果
      .to(
        marqueeRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "back.out(1.2)",
        },
        "-=0.5"
      )

      // 为轮播区域添加微妙的阴影效果
      .to(
        marqueeRef.current,
        {
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .add(() => setMarqueeKey((k) => k + 1));

    // 添加更柔和的视差滚动效果
    gsap.to(sectionRef.current, {
      backgroundPosition: "50% 100%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    // 添加背景渐变动画
    gsap.to(sectionRef.current, {
      background:
        "linear-gradient(180deg, #68AEFF 0%, #8872FF 50%, #9B59B6 100%)",
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });

    // 为轮播卡片添加微妙的进入动画
    const reviewCards = marqueeRef.current?.querySelectorAll(".review-card");
    if (reviewCards) {
      gsap.fromTo(
        reviewCards,
        {
          opacity: 0,
          y: 20,
          scale: 0.9,
          rotation: 2,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.5,
        }
      );

      // 添加卡片悬停效果
      reviewCards.forEach((card) => {
        const avatar = card.querySelector("img");
        const text = card.querySelector("p");

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(avatar, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(text, {
            color: "#3B82F6",
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(avatar, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(text, {
            color: "",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-20 flex flex-col items-center w-full"
      style={{
        background: "linear-gradient(180deg, #68AEFF 0%, #8872FF 100%)",
        minHeight: "420px",
        overflow: "hidden",
      }}
    >
      <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-4">
        <h2
          ref={titleRef}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4"
        >
          {t("userReviews.title")}
        </h2>
        <p ref={subtitleRef} className="text-xs sm:text-sm text-gray-300 font-normal">
          {t("userReviews.subtitle")}
        </p>
      </div>

      <div ref={marqueeRef} className="w-full" style={{ overflow: "hidden" }}>
        <Marquee 
          key={`reviews-${marqueeKey}-${isMobile ? 'm' : 'd'}`}
          speed={isMobile ? 18 : 30}
          gradient={false}
          pauseOnHover={!isMobile}
          play={true}
          direction="left"
          autoFill={false}
          delay={0}
        >
          {!isMobile && (() => {
            const cardWidthNum = isMobile ? 220 : 240;
            const cardHeight = isMobile ? "160px" : "170px";
            const cardPadding = isMobile ? "12px" : "14px";
            const horizontalPaddingNum = isMobile ? 12 : 16;
            const unitWidth = cardWidthNum + horizontalPaddingNum * 2;
            const minNeeded = unitWidth > 0 && containerWidth > 0
              ? Math.ceil(containerWidth / unitWidth) + 2
              : reviews.length * 2;
            const renderList = Array.from({ length: Math.max(minNeeded, reviews.length * 2) }, (_, i) => reviews[i % reviews.length]);
            return renderList.map((review, index) => {
              const horizontalPadding = `${horizontalPaddingNum}px`;
              const cardWidth = `${cardWidthNum}px`;
            
              return (
                <div
                  key={`${review.id}-${index}`}
                  className="inline-block"
                  style={{
                    paddingLeft: horizontalPadding,
                    paddingRight: horizontalPadding,
                  }}
                >
                  <div
                    className="review-card bg-white rounded-xl sm:rounded-2xl shadow-lg relative overflow-hidden"
                    style={{
                      width: cardWidth,
                      height: cardHeight,
                      padding: cardPadding,
                    }}
                  >
                    {/* 用户头像 */}
                    <div className="flex items-start mb-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={review.avatar}
                          alt={`User ${review.id}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    
                      {/* 评价文本 */}
                      <div className="flex-1 relative ml-2">
                        <div className="relative">
                          <p
                            className="text-sm text-gray-800 leading-relaxed"
                            style={{
                              fontSize: isMobile ? "10px" : "11px",
                              lineHeight: "1.45",
                              height: isMobile ? "100px" : "110px",
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 7,
                              WebkitBoxOrient: "vertical",
                              position: "relative",
                            }}
                          >
                            {review.text}
                          </p>
                    
                          {/* 第7行遮罩层 - 在最后4个字符位置放置引号 */}
                          <div
                            className="absolute"
                            style={{
                              bottom: "0px",
                              right: "0px",
                              height: "16px",
                              width: "45px",
                              background:
                                "linear-gradient(to right, transparent 0%, white 20%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              zIndex: 2,
                            }}
                          >
                            <img src={reviewImage} alt="" width={18} height={18} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </Marquee>
      </div>
      {isMobile && (
        <div className="w-full" style={{ overflow: "hidden" }}>
          <style>{`
            @keyframes ur-scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          `}</style>
          <div
            className="ur-mobile-track"
            style={{
              display: "flex",
              width: "200%",
              animation: "ur-scroll-left 28s linear infinite",
            }}
          >
            {[...reviews, ...reviews].map((review, index) => {
              const cardWidth = "220px";
              const cardHeight = "160px";
              const cardPadding = "12px";
              const horizontalPadding = "12px";
              return (
                <div
                  key={`m-${review.id}-${index}`}
                  className="inline-block"
                  style={{ paddingLeft: horizontalPadding, paddingRight: horizontalPadding }}
                >
                  <div
                    className="review-card bg-white rounded-xl sm:rounded-2xl shadow-lg relative overflow-hidden"
                    style={{ width: cardWidth, height: cardHeight, padding: cardPadding }}
                  >
                    <div className="flex items-start mb-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                        <img src={review.avatar} alt={`User ${review.id}`} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 relative ml-2">
                        <div className="relative">
                          <p
                            className="text-sm text-gray-800 leading-relaxed"
                            style={{
                              fontSize: "10px",
                              lineHeight: "1.45",
                              height: "100px",
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 7,
                              WebkitBoxOrient: "vertical",
                              position: "relative",
                            }}
                          >
                            {review.text}
                          </p>
                          <div
                            className="absolute"
                            style={{
                              bottom: "0px",
                              right: "0px",
                              height: "16px",
                              width: "45px",
                              background: "linear-gradient(to right, transparent 0%, white 20%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              zIndex: 2,
                            }}
                          >
                            <img src={reviewImage} alt="" width={18} height={18} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default UserReviews;
