'use client'

import { useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const faqs = [
  { q: '¿Cuál es el tiempo de entrega de muebles?', a: 'Fabricamos sobre pedido para asegurar la máxima calidad. El tiempo estimado es de 10 a 15 días hábiles dentro de México.' },
  { q: '¿Los servicios de DJ incluyen viáticos?', a: 'Dentro de CDMX y Área Metropolitana los viáticos están incluidos. Para eventos foráneos se cotiza por separado.' },
  { q: '¿Qué garantía tienen los productos?', a: 'Todos nuestros muebles cuentan con 1 año de garantía contra defectos de fabricación y herrajes.' },
  { q: '¿Aceptan pagos internacionales?', a: 'Sí, aceptamos tarjetas internacionales a través de PayPal y Stripe, además de Mercado Pago y transferencias locales.' },
]

export default function FAQ() {
  const [active, setActive] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = gsap.utils.toArray<HTMLElement>('.faq-item')
    if (items.length === 0) return

    gsap.set(items, { y: 20, autoAlpha: 0 })

    gsap.to(items, {
      y: 0,
      autoAlpha: 1,
      stagger: 0.08,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
      },
    })
  }, { scope: sectionRef, dependencies: [] })

  return (
    <section ref={sectionRef} id="faq">
      <div className="section-header">
        <div>
          <h2>Preguntas Frecuentes</h2>
        </div>
      </div>

      <div className="faq-list">
        {faqs.map((faq, i) => (
          <div key={i} className={`faq-item ${active === i ? 'active' : ''}`}>
            <div className="faq-q" onClick={() => setActive(active === i ? null : i)}>
              <span>{faq.q}</span>
              <span className="icon">+</span>
            </div>
            <div className="faq-a"><div className="faq-a-inner">{faq.a}</div></div>
          </div>
        ))}
      </div>
    </section>
  )
}
