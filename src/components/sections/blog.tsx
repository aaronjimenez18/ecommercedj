'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const blogCards = gsap.utils.toArray<HTMLElement>(".blog-card")
    if (blogCards.length === 0) return

    blogCards.forEach((card) => {
      const img = card.querySelector<HTMLElement>(".blog-img img")
      const content = card.querySelector<HTMLElement>(".blog-content")
      if (!img || !content) return

      gsap.set(img, { scale: 1.15 })
      gsap.set(content, { y: 30, autoAlpha: 0 })

      gsap.to(img, {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "top 30%",
          scrub: 1,
        },
      })

      gsap.to(content, {
        y: 0,
        autoAlpha: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 60%",
          end: "top 25%",
          scrub: 1,
        },
      })
    })

    const newsletter = section.querySelector<HTMLElement>(".newsletter-box")
    if (newsletter) {
      gsap.set(newsletter, { y: 30, autoAlpha: 0 })
      gsap.to(newsletter, {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: newsletter,
          start: "top 85%",
          end: "top 45%",
          scrub: 1,
        },
      })
    }
  }, { scope: sectionRef, dependencies: [] })

  return (
    <section ref={sectionRef} id="blog">
      <div className="section-header">
        <div>
          <h2>Blog Editorial</h2>
        </div>
      </div>

      <div className="blog-grid">
        <article className="blog-card">
          <div className="blog-img">
            <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=800" alt="Disco de vinilo sobre una mesa de mezclas" />
          </div>
          <div className="blog-content">
            <span className="kicker blog-kicker">Tendencias</span>
            <h3>El Renacimiento del Vinilo en el 2026</h3>
            <p className="blog-card-text">
              Por qué los sets puristas están cobrando más fuerza que nunca en la escena underground.
            </p>
            <button className="btn btn-sm blog-btn">Leer Más</button>
          </div>
        </article>

        <article className="blog-card">
          <div className="blog-img">
            <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1514525253361-bee8718a34d1?q=80&w=800" alt="Audiencia bailando en un club nocturno con iluminación robótica" />
          </div>
          <div className="blog-content">
            <span className="kicker blog-kicker">Producción</span>
            <h3>Guía: Acústica para tu Home Studio</h3>
            <p className="blog-card-text">
              No gastes miles en equipo si tu cuarto no está tratado. Aquí te decimos cómo empezar.
            </p>
            <button className="btn btn-sm blog-btn">Leer Más</button>
          </div>
        </article>
      </div>

      <div className="newsletter-box">
        <span className="kicker newsletter-kicker">Exclusivo</span>
        <h3 className="newsletter-title">Únete al Collective</h3>
        <p className="newsletter-desc">
          Recibe descuentos exclusivos en muebles y guías de producción semanalmente.
        </p>
        <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="TU EMAIL" />
          <button className="btn btn-accent">Suscribirme</button>
        </form>
      </div>
    </section>
  )
}
