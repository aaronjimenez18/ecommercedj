"use client"
import { useEffect, useRef, useState } from "react"

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null!)
  const rafRef = useRef<number>(0)
  const curRef = useRef({ x: 0, y: 0, rotX: 0, rotY: 0, time: 0 })

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)

    const onMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      mouseRef.current = { x, y }
    }

    const animate = () => {
      const t = mouseRef.current
      const c = curRef.current
      c.time += 0.02

      c.x += (t.x * 20 - c.x) * 0.06
      c.y += (t.y * 15 - c.y) * 0.06
      c.rotY += (t.x * 5 - c.rotY) * 0.06
      c.rotX += (t.y * -5 - c.rotX) * 0.06

      const floatY = Math.sin(c.time) * 8

      if (imageRef.current) {
        imageRef.current.style.transform =
          `translate3d(${c.x}px, ${c.y + floatY}px, 0) rotateX(${c.rotX}deg) rotateY(${c.rotY}deg)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("mousemove", onMouse, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("mousemove", onMouse)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section className="hero" id="inicio"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8rem 2rem 4rem',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <span className="kicker" style={{ marginBottom: '1rem', fontSize: '0.65rem' }}>
        Nightlife &bull; Production &bull; Gear
      </span>

      <h1 style={{ marginBottom: '2rem', maxWidth: '900px' }}>
        Música que<br />Se Siente.
      </h1>

      <div
        style={{
          transform: `translateY(${scrollY * -0.15}px)`,
          willChange: 'transform',
          margin: '0.5rem 0 2.5rem',
          perspective: '800px',
        }}
      >
        <div
          ref={imageRef}
          style={{
            willChange: 'transform',
            transformStyle: 'preserve-3d',
          }}
        >
          <img
            src="/mesadj.png"
            alt="DJ Mesa"
            style={{
              width: 'clamp(260px, 45vw, 550px)',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 30px 80px rgba(0,0,0,0.5))',
              display: 'block',
            }}
          />
        </div>
      </div>

      <p style={{ margin: '0 auto 2.5rem', color: 'var(--muted)', maxWidth: '440px', fontSize: 'clamp(0.8rem, 1.1vw, 0.9rem)' }}>
        Plataforma integral para DJ's. Fabricamos muebles especializados y curamos experiencias sonoras inolvidables.
      </p>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="#muebles" className="btn btn-accent">Ver Catálogo</a>
        <a href="#servicios" className="btn">Contratar DJ</a>
        <a href="https://www.amazon.com/" target="_blank" rel="noopener noreferrer" className="btn btn-amazon">
          Amazon Store
        </a>
      </div>
    </section>
  )
}
