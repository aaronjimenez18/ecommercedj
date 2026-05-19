'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { CartProvider } from '@/lib/store/cart-context'
import { useAudioAmbient } from '@/hooks/use-audio-ambient'
import Header from '@/components/layout/header'
import Hero from '@/components/sections/hero'
import CatalogSection from '@/components/sections/horizontal-catalog'
import Services from '@/components/sections/services'
import Blog from '@/components/sections/blog'
import Testimonials from '@/components/sections/testimonials'
import FAQ from '@/components/sections/faq'
import Footer from '@/components/layout/footer'
import CartDrawer from '@/components/modals/cart-drawer'
import BookingModal from '@/components/modals/booking-modal'
import WhatsAppFloat from '@/components/layout/whats-app-float'
import Overlay from '@/components/ui/overlay'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function HomePage() {
  useAudioAmbient()
  const [cartOpen, setCartOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingBase, setBookingBase] = useState(5500)
  const [bookingName, setBookingName] = useState('')
  const pageRef = useRef<HTMLDivElement>(null)

  const openBooking = (base: number, name: string) => {
    setBookingBase(base)
    setBookingName(name.toUpperCase())
    setBookingOpen(true)
  }

  const closeAll = () => {
    setCartOpen(false)
    setBookingOpen(false)
  }

  useGSAP(() => {
    gsap.set(".header-wrap", { y: -20 })

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.075,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Sync Lenis limit whenever ScrollTrigger refreshes (e.g. pin-spacers)
    const onScrollRefresh = () => lenis.resize()
    ScrollTrigger.addEventListener('refresh', onScrollRefresh)

    // Initial refresh after all triggers settle
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      lenis.resize()
    })

    gsap.to(".header-wrap", {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.5,
    })

    return () => {
      ScrollTrigger.removeEventListener('refresh', onScrollRefresh)
      lenis.destroy()
      gsap.ticker.lagSmoothing(1)
    }
  }, { scope: pageRef })

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const sections = gsap.utils.toArray<HTMLElement>(
      "section:not(#inicio):not(#muebles):not(#servicios):not(#testimonios):not(#faq)"
    )

    sections.forEach((section) => {
      gsap.from(section.children, {
        y: 24,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          end: "top 45%",
          scrub: 1,
        },
      })
    })
  }, { scope: pageRef, dependencies: [] })

  return (
    <>
      <Overlay open={cartOpen || bookingOpen} onClose={closeAll} />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <BookingModal
        open={bookingOpen}
        serviceBase={bookingBase}
        serviceName={bookingName}
        onClose={() => setBookingOpen(false)}
      />

      <div ref={pageRef}>
        <div className="header-wrap">
          <Header onCartToggle={() => setCartOpen(true)} />
        </div>

        <div className="wrapper">
          <Hero />
          <CatalogSection onCartOpen={() => setCartOpen(true)} />
          <Services onBookingOpen={openBooking} />
          <Blog />
          <Testimonials />
          <FAQ />
          <Footer />
        </div>
      </div>

      <WhatsAppFloat />
    </>
  )
}

export default function Page() {
  return (
    <CartProvider>
      <HomePage />
    </CartProvider>
  )
}
