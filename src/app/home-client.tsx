'use client'

import { useRef, useState, lazy, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Header from '@/components/layout/header'
import Hero from '@/components/sections/hero'
import CatalogSection from '@/components/sections/horizontal-catalog'
import Services from '@/components/sections/services'
import Footer from '@/components/layout/footer'
import WhatsAppFloat from '@/components/layout/whats-app-float'
import Overlay from '@/components/ui/overlay'
import PageLoader from '@/components/ui/page-loader'
import { LoadingProvider } from '@/lib/store/loading-context'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const CartDrawer = lazy(() => import('@/components/modals/cart-drawer'))
const BookingModal = lazy(() => import('@/components/modals/booking-modal'))
const Blog = lazy(() => import('@/components/sections/blog'))
const Testimonials = lazy(() => import('@/components/sections/testimonials'))
const FAQ = lazy(() => import('@/components/sections/faq'))

function LazySection({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div style={{ minHeight: '200px' }} />}>{children}</Suspense>
}

export default function HomeClient() {
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
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1.2,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    const onScrollRefresh = () => lenis.resize()
    ScrollTrigger.addEventListener('refresh', onScrollRefresh)

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
    <LoadingProvider>
      <PageLoader />

      <Overlay open={cartOpen || bookingOpen} onClose={closeAll} />

      {cartOpen && (
        <Suspense fallback={null}>
          <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </Suspense>
      )}

      {bookingOpen && (
        <Suspense fallback={null}>
          <BookingModal
            open={bookingOpen}
            serviceBase={bookingBase}
            serviceName={bookingName}
            onClose={() => setBookingOpen(false)}
          />
        </Suspense>
      )}

      <div ref={pageRef}>
        <div className="header-wrap">
          <Header onCartToggle={() => setCartOpen(true)} />
        </div>

        <div className="wrapper">
          <Hero />
          <CatalogSection onCartOpen={() => setCartOpen(true)} />
          <Services onBookingOpen={openBooking} />
          <LazySection><Blog /></LazySection>
          <LazySection><Testimonials /></LazySection>
          <LazySection><FAQ /></LazySection>
          <Footer />
        </div>
      </div>

      <WhatsAppFloat />
    </LoadingProvider>
  )
}
