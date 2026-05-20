"use client"
import { useRef, useState, useCallback } from "react"
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

  const handleModelReady = useCallback(() => setModelReady(true), [])

  useGSAP(() => {
    if (!modelReady) return

    gsap.set(modelAnimRef.current, { scale: 0.8, opacity: 1, rotation: 10 })
    gsap.set(".hero-kicker, .hero-line, .hero-desc", { y: 16, autoAlpha: 0 })
    gsap.set(".hero-scroll-hint", { autoAlpha: 0, y: 8 })

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.to(modelAnimRef.current, { scale: 1, rotation: 0, duration: 0.6 })
    tl.to(".hero-kicker", { y: 0, autoAlpha: 1, duration: 0.4 }, "-=0.2")
    tl.to(".hero-line", { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.08 }, "-=0.15")
    tl.to(".hero-desc", { y: 0, autoAlpha: 1, duration: 0.4 }, "-=0.15")
    tl.to(".hero-scroll-hint", { autoAlpha: 1, y: 0, duration: 0.6 }, "+=0.3")
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
      opacity: 0.15,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        refreshPriority: 0,
      },
    })

    gsap.to(".hero-kicker, .hero-line, .hero-desc, .hero-scroll-hint", {
      opacity: 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        refreshPriority: 0,
      },
    })

    if (modelParallaxRef.current) {
      gsap.to(modelParallaxRef.current, {
        y: -(window.innerHeight * 0.15),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          refreshPriority: 0,
        },
      })
    }

    ScrollTrigger.refresh()
  }, { scope: sectionRef, dependencies: [introDone], revertOnUpdate: true })

  return (
    <section className="hero" id="inicio"
      ref={sectionRef}
    >
      <span className="hero-kicker kicker" style={{ opacity: 0 }}>
        Nightlife &bull; Production &bull; Gear
      </span>

      <h1>
        <span className="hero-line" style={{ opacity: 0 }}>Música que</span><br />
        <span className="hero-line" style={{ opacity: 0 }}>Se Siente.</span>
      </h1>

      <div
        ref={modelAnimRef}
        className="hero-model"
        style={{ opacity: 0 }}
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
      <div className="hero-scroll-hint" style={{ opacity: 0 }}>
        <span style={{ fontSize: 'var(--text-kicker)', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          DESCUBRE EL CATÁLOGO
        </span>
        <div style={{ marginTop: 'var(--space-sm)', animation: 'pulse-hint 2s ease-in-out infinite' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" style={{ display: 'block', margin: '0 auto' }}>
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
