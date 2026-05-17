"use client"
import { useRef, useState, useEffect, useCallback } from "react"
import dynamic from "next/dynamic"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const DJPult3D = dynamic(() => import("@/components/dj-pult"), {
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

export default function Hero({ onIntroTextReady }: { onIntroTextReady?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const modelAnimRef = useRef<HTMLDivElement>(null)
  const modelParallaxRef = useRef<HTMLDivElement>(null)
  const spinRef = useRef(0)
  const [modelReady, setModelReady] = useState(false)
  const [introDone, setIntroDone] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const handleModelReady = useCallback(() => setModelReady(true), [])

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (modelParallaxRef.current) {
      modelParallaxRef.current.style.transform = `translateY(${scrollY * -0.15}px)`
    }
  }, [scrollY])

  useGSAP(() => {
    if (!modelReady) return

    gsap.set(modelAnimRef.current, { scale: 0.6, opacity: 1, rotation: 20 })
    gsap.set(".hero-kicker, .hero-line, .hero-desc", { y: 24, autoAlpha: 0 })

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.to(modelAnimRef.current, { scale: 1, rotation: 0, duration: 0.8 })
    tl.to(".hero-kicker", { y: 0, autoAlpha: 1, duration: 0.5 }, "-=0.3")
    tl.to(".hero-line", { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1 }, "-=0.2")
    tl.to(".hero-desc", { y: 0, autoAlpha: 1, duration: 0.5 }, "-=0.2")
    tl.call(() => {
      setIntroDone(true)
      onIntroTextReady?.()
      ScrollTrigger.refresh()
    })
  }, { scope: sectionRef, dependencies: [modelReady], revertOnUpdate: true })

  useGSAP(() => {
    if (!introDone) return

    gsap.to(spinRef, {
      current: Math.PI * 2,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        refreshPriority: 0,
      },
    })

    gsap.to(modelAnimRef.current, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        refreshPriority: 0,
      },
    })

    gsap.to(".hero-kicker, .hero-line, .hero-desc", {
      autoAlpha: 0,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        refreshPriority: 0,
      },
    })

    ScrollTrigger.refresh()
  }, { scope: sectionRef, dependencies: [introDone], revertOnUpdate: true })

  return (
    <section className="hero" id="inicio"
      ref={sectionRef}
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
      <span className="hero-kicker kicker" style={{ marginBottom: '1rem', fontSize: '0.65rem', opacity: 0 }}>
        Nightlife &bull; Production &bull; Gear
      </span>

      <h1 style={{ marginBottom: '2rem', maxWidth: '900px' }}>
        <span className="hero-line" style={{ opacity: 0 }}>Música que</span><br />
        <span className="hero-line" style={{ opacity: 0 }}>Se Siente.</span>
      </h1>

      <div
        ref={modelAnimRef}
        style={{
          margin: '0.5rem 0 2.5rem',
          perspective: '800px',
          opacity: 0,
        }}
      >
        <div
          ref={modelParallaxRef}
          style={{
            willChange: 'transform',
          }}
        >
          <DJPult3D spinRef={spinRef} onReady={handleModelReady} />
        </div>
      </div>

      <p className="hero-desc" style={{ margin: '0 auto 2.5rem', color: 'var(--muted)', maxWidth: '440px', fontSize: 'clamp(0.8rem, 1.1vw, 0.9rem)', opacity: 0 }}>
        Plataforma integral para DJs. Fabricamos muebles especializados y curamos experiencias sonoras inolvidables.
      </p>
    </section>
  )
}
