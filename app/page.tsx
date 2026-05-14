'use client'

import { useState } from 'react'
import { CartProvider } from '@/app/cart-context'
import Header from '@/app/components/header'
import Hero from '@/app/components/hero'
import ProductGrid from '@/app/components/product-grid'
import Services from '@/app/components/services'
import Blog from '@/app/components/blog'
import Testimonials from '@/app/components/testimonials'
import FAQ from '@/app/components/faq'
import Footer from '@/app/components/footer'
import CartDrawer from '@/app/components/cart-drawer'
import BookingModal from '@/app/components/booking-modal'
import WhatsAppFloat from '@/app/components/whatsapp-float'

function Overlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={`overlay ${open ? 'active' : ''}`}
      onClick={onClose}
    />
  )
}

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
