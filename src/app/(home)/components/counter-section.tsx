'use client'

import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef } from 'react'

export default function CounterSection() {
  const t = useTranslations('counter')
  const countersRef = useRef<{ element: HTMLSpanElement; target: number }[]>([])

  const animateCounter = useCallback((element: HTMLSpanElement, target: number) => {
    const duration = 2000
    const start = 0
    const increment = target / (duration / 16)
    let current = start

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      element.textContent = Math.floor(current).toLocaleString()
    }, 16)
  }, [])

  useEffect(() => {
    const counters = countersRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = counters.find((c) => c.element === entry.target)
            if (counter && !counter.element.dataset.animated) {
              counter.element.dataset.animated = 'true'
              animateCounter(counter.element, counter.target)
            }
          }
        })
      },
      { threshold: 0.5 },
    )

    counters.forEach((counter) => {
      observer.observe(counter.element)
    })

    return () => {
      counters.forEach((counter) => {
        observer.unobserve(counter.element)
      })
    }
  }, [animateCounter])

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex justify-center">
          <div className="text-center">
            <h3 className="mb-2 text-4xl font-bold md:text-5xl">
              <span
                ref={(el) => {
                  if (el && !countersRef.current.find((c) => c.element === el)) {
                    countersRef.current.push({ element: el, target: 100000 })
                  }
                }}>
                0
              </span>
              <span>+</span>
            </h3>
            <p className="text-muted-foreground text-base md:text-lg">{t('users')}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-center">
            <h3 className="mb-2 text-4xl font-bold md:text-5xl">
              <span
                ref={(el) => {
                  if (el && !countersRef.current.find((c) => c.element === el)) {
                    countersRef.current.push({ element: el, target: 10000 })
                  }
                }}>
                0
              </span>
              <em className="text-2xl font-normal not-italic md:text-3xl">w</em>
              <span>+</span>
            </h3>
            <p className="text-muted-foreground text-base md:text-lg">{t('fans')}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-center">
            <h3 className="mb-2 text-4xl font-bold md:text-5xl">
              <span
                ref={(el) => {
                  if (el && !countersRef.current.find((c) => c.element === el)) {
                    countersRef.current.push({ element: el, target: 500 })
                  }
                }}>
                0
              </span>
              <em className="text-2xl font-normal not-italic md:text-3xl">{t('marketUnit')}</em>
            </h3>
            <p className="text-muted-foreground text-base md:text-lg">{t('market')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
