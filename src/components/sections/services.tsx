'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Services({ onBookingOpen }: { onBookingOpen: (base: number, name: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
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
  }, { scope: sectionRef, dependencies: [] })

  return (
    <section ref={sectionRef} id="servicios" style={{ padding: 0 }}>
      <div className="services-split">
        <div className="service-panel">
          <span className="kicker">Standard Set</span>
          <h3>Servicio DJ Profesional</h3>
          <span className="price" style={{ fontSize: '3.5rem' }}>
            $5,500 <small className="price-small">/ 5H</small>
          </span>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
            Curaduría musical experta para eventos privados, lanzamientos y corporativos.
          </p>
          <ul className="service-list">
            <li>DJ con 10+ años de experiencia</li>
            <li>Sistema de audio (hasta 100 personas)</li>
            <li>Cabina de DJ estética (Brutal Series)</li>
            <li>Micrófono inalámbrico profesional</li>
          </ul>
          <button className="btn btn-accent" onClick={() => onBookingOpen(5500, 'DJ Estándar')}>
            Reservar Ahora
          </button>
        </div>

        <div className="service-panel">
          <span className="tag">RECOMENDADO</span>
          <span className="kicker">Full Experience</span>
          <h3>Servicio Premium Gear</h3>
          <span className="price" style={{ fontSize: '3.5rem' }}>
            $7,500 <small className="price-small">/ 5H</small>
          </span>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
            Producción audiovisual completa. Transformamos cualquier espacio en un club de primer nivel.
          </p>
          <ul className="service-list">
            <li>DJ + Staff de Soporte Técnico</li>
            <li>Audio Reforzado (hasta 250 personas)</li>
            <li>Diseño de Iluminación Robótica & Láser</li>
            <li>Máquina de Humo y Efectos Especiales</li>
            <li>Pirotecnia Fría Controlada</li>
          </ul>
          <button className="btn btn-accent" onClick={() => onBookingOpen(7500, 'Servicio Premium')}>
            Mejorar Experiencia
          </button>
        </div>
      </div>
    </section>
  )
}
