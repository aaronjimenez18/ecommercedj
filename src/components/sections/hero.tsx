"use client"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const DJPult3D = dynamic(() => import("@/components/DJPult3D"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "clamp(260px, 45vw, 550px)",
        height: "clamp(260px, 45vw, 550px)",
        display: "block",
      }}
    />
  ),
})

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
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
        <DJPult3D />
      </div>

      <p style={{ margin: '0 auto 2.5rem', color: 'var(--muted)', maxWidth: '440px', fontSize: 'clamp(0.8rem, 1.1vw, 0.9rem)' }}>
        Plataforma integral para DJs. Fabricamos muebles especializados y curamos experiencias sonoras inolvidables.
      </p>
    </section>
  )
}
