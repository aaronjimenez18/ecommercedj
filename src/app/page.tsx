'use client'

import { useState } from 'react'
import { CartProvider } from '@/lib/store/cart-context'
import Header from '@/components/layout/header'
import Hero from '@/components/sections/hero'
import ProductGrid from '@/components/sections/product-grid'
import Services from '@/components/sections/services'
import Blog from '@/components/sections/blog'
import Testimonials from '@/components/sections/testimonials'
import FAQ from '@/components/sections/faq'
import Footer from '@/components/layout/footer'
import CartDrawer from '@/components/modals/cart-drawer'
import BookingModal from '@/components/modals/booking-modal'
import WhatsAppFloat from '@/components/layout/whats-app-float'
import Overlay from '@/components/ui/overlay'

function HomePage() {
  const [cartOpen, setCartOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingBase, setBookingBase] = useState(5500)
  const [bookingName, setBookingName] = useState('')

  const openBooking = (base: number, name: string) => {
    setBookingBase(base)
    setBookingName(name.toUpperCase())
    setBookingOpen(true)
  }

  const closeAll = () => {
    setCartOpen(false)
    setBookingOpen(false)
  }

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

      <Header onCartToggle={() => setCartOpen(true)} />

      <div className="wrapper">
        <Hero />
        <ProductGrid onCartOpen={() => setCartOpen(true)} />
        <Services onBookingOpen={openBooking} />
        <Blog />
        <Testimonials />
        <FAQ />
        <Footer />
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
