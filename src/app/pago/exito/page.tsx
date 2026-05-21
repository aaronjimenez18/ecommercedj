'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { CartProvider, useCart } from '@/lib/store/cart-context'

declare function gtag(command: string, action: string, params?: Record<string, unknown>): void

function ExitoContent() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
    gtag('event', 'purchase', {
      transaction_id: new URLSearchParams(window.location.search).get('session_id'),
      currency: 'MXN',
      value: 0,
    })
  }, [clearCart])

  return (
    <main className="payment-page">
      <h1>¡PAGO EXITOSO!</h1>
      <p>
        Gracias por tu compra. Te enviaremos un correo con los detalles de tu pedido.
      </p>
      <Link href="/" className="btn btn-accent">
        VOLVER AL INICIO
      </Link>
    </main>
  )
}

export default function ExitoPage() {
  return (
    <CartProvider>
      <ExitoContent />
    </CartProvider>
  )
}
