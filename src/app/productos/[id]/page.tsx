'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { CartProvider, useCart } from '@/lib/store/cart-context'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import CartDrawer from '@/components/modals/cart-drawer'
import Overlay from '@/components/ui/overlay'
import WhatsAppFloat from '@/components/layout/whats-app-float'
import type { Product } from '@/types'

function ProductContent() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    if (!id) return
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <>
        <Header onCartToggle={() => {}} />
        <div className="wrapper" style={{ padding: '6rem 3rem', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--muted)' }}>Cargando...</p>
        </div>
        <Footer />
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Header onCartToggle={() => {}} />
        <div className="wrapper" style={{ padding: '6rem 3rem', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
          <h2>Producto no encontrado</h2>
          <Link href="/" className="btn">Volver al catálogo</Link>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Overlay open={cartOpen} onClose={() => setCartOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <Header onCartToggle={() => setCartOpen(true)} />

      <div className="wrapper">
        <div style={{ padding: '6rem 3rem 0' }}>
          <Link
            href="/"
            style={{ color: 'var(--muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            ← Volver al catálogo
          </Link>
        </div>

        <div className="product-detail">
          <div className="product-detail-img">
            {product.tag && <span className="tag">{product.tag}</span>}
            <img src={product.img} alt={product.name} />
          </div>
          <div className="product-detail-info">
            <div>
              <span className="kicker">{product.category}</span>
              <h2 style={{ marginTop: '0.5rem' }}>{product.name}</h2>
            </div>
            <p className="product-detail-desc">{product.desc}</p>
            <span className="product-detail-price">${product.price.toLocaleString()}</span>
            {product.amazon ? (
              <a
                href="https://amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ textAlign: 'center', borderColor: '#fa8b0c', color: '#fa8b0c' }}
              >
                COMPRAR EN AMAZON
              </a>
            ) : (
              <button
                className="btn btn-accent"
                style={{ textAlign: 'center' }}
                onClick={() => {
                  addItem({ id: product.id, name: product.name, price: product.price })
                  setCartOpen(true)
                }}
              >
                AGREGAR AL CARRITO
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  )
}

export default function ProductPage() {
  return (
    <CartProvider>
      <ProductContent />
    </CartProvider>
  )
}
