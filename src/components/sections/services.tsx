'use client'

import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface ServiceItem {
  id: number
  name: string
  description: string
  price: number
  features: string
  highlighted: boolean
}

export default function Services({ onBookingOpen }: { onBookingOpen: (base: number, name: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [services, setServices] = useState<ServiceItem[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/services')
      .then(r => r.json())
      .then(data => {
        if (data.length > 0) {
          setServices(data)
          setLoaded(true)
        } else {
          setLoaded(true)
        }
      })
      .catch(() => setLoaded(true))
  }, [])

  useGSAP(() => {
    if (!loaded || services.length === 0) return
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const panels = gsap.utils.toArray<HTMLElement>('.service-panel')
    if (panels.length === 0) return

    gsap.set(panels, { y: 40, autoAlpha: 0 })

    gsap.to(panels, {
      y: 0,
      autoAlpha: 1,
      stagger: 0.15,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 40%",
        scrub: 1,
      },
    })
  }, { scope: sectionRef, dependencies: [loaded, services] })

  if (!loaded) return null

  if (services.length === 0) return null

  return (
    <section ref={sectionRef} id="servicios" style={{ padding: 0 }}>
      <div className="services-split">
        {services.map((s, idx) => {
          let featuresList: string[] = []
          try { featuresList = JSON.parse(s.features) } catch {}
          const isLast = idx === services.length - 1

          return (
            <div key={s.id} className="service-panel">
              {s.highlighted && <span className="tag">RECOMENDADO</span>}
              <span className="kicker">{s.name}</span>
              <h3>{s.description}</h3>
              <span className="price" style={{ fontSize: '3.5rem' }}>
                ${s.price.toLocaleString()} <small className="price-small">/ 5H</small>
              </span>
              <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
                {s.description}
              </p>
              {featuresList.length > 0 && (
                <ul className="service-list">
                  {featuresList.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              )}
              <button className="btn btn-accent" onClick={() => onBookingOpen(s.price, s.name)}>
                {isLast ? 'Mejorar Experiencia' : 'Reservar Ahora'}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
