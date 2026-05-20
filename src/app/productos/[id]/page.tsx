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
        <div className="wrapper">
          <div className="product-loading">
            <p>Cargando...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Header onCartToggle={() => {}} />
        <div className="wrapper">
          <div className="product-not-found">
            <h2>Producto no encontrado</h2>
            <Link href="/" className="btn">Volver al catálogo</Link>
          </div>
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
        <div className="product-back-link">
          <Link href="/">
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
              <h2>{product.name}</h2>
            </div>
            <p className="product-detail-desc">{product.desc}</p>
            <span className="product-detail-price">${product.price.toLocaleString()}</span>
            {product.stock !== undefined && (
              <div style={{
                fontSize: '0.7rem', color: product.stock > 0 ? '#3bce7f' : '#ff3b7f',
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                {product.stock > 0 ? `${product.stock} en stock` : 'Producto agotado'}
              </div>
            )}
            {product.amazon ? (
              <a
                href="https://amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-amazon"
                style={{ textAlign: 'center' }}
              >
                COMPRAR EN AMAZON
              </a>
            ) : (
              <button
                className={`btn ${product.stock > 0 ? 'btn-accent' : ''}`}
                style={{ textAlign: 'center', ...(product.stock === 0 ? { borderColor: '#6b6b7b', color: '#6b6b7b', cursor: 'not-allowed' } : {}) }}
                disabled={product.stock === 0}
                onClick={() => {
                  if (product.stock === 0) return
                  addItem({ id: product.id, name: product.name, price: product.price })
                  setCartOpen(true)
                }}
              >
                {product.stock > 0 ? 'AGREGAR AL CARRITO' : 'AGOTADO'}
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
