'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const testimonials = [
  {
    stars: '★★★★★',
    text: '"La Alpha Console es una obra de arte. Mi flujo de trabajo mejoró un 200% desde que la instalé."',
    author: 'Carlos R., Productor',
  },
  {
    stars: '★★★★★',
    text: '"Contratamos el set Premium para nuestra boda corporativa y los invitados no dejaron de bailar. Increíble producción."',
    author: 'Ana L., Event Planner',
  },
  {
    stars: '★★★★★',
    text: '"El envío a CDMX fue súper rápido y el armado de la mesa fue muy intuitivo. Recomendados al 100%."',
    author: 'DJ Sombra',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = gsap.utils.toArray<HTMLElement>('.testimonial-card')
    if (cards.length === 0) return

    gsap.set(cards, { y: 30, autoAlpha: 0, scale: 0.95 })

    gsap.to(cards, {
      y: 0,
      autoAlpha: 1,
      scale: 1,
      stagger: 0.12,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 25%",
        scrub: 1,
      },
    })
  }, { scope: sectionRef, dependencies: [] })

  return (
    <section ref={sectionRef} id="testimonios">
      <div className="section-header">
        <div>
          <h2>Lo que dicen de GDL</h2>
        </div>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial-card">
            <div className="testimonial-stars">{t.stars}</div>
            <p className="testimonial-quote">
              {t.text}
            </p>
            <span className="testimonial-author">
              {t.author}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
