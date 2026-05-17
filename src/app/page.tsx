'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { CartProvider } from '@/lib/store/cart-context'
import Header from '@/components/layout/header'
import Hero from '@/components/sections/hero'
import HorizontalCatalog from '@/components/sections/horizontal-catalog'
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
    const sections = gsap.utils.toArray<HTMLElement>(
      "section:not(#inicio):not(#muebles)"
    )

    sections.forEach((section) => {
      gsap.from(section.children, {
        y: 50,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          end: "top 45%",
          scrub: 1.2,
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
        <div className="header-wrap" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, opacity: 0, visibility: 'hidden' }}>
          <Header onCartToggle={() => setCartOpen(true)} />
        </div>

        <div className="wrapper" style={{ paddingTop: '5rem' }}>
          <Hero />
          <HorizontalCatalog onCartOpen={() => setCartOpen(true)} />
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
