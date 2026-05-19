'use client'

import { useState } from 'react'
import { useCart } from '@/lib/store/cart-context'

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, total, removeItem } = useCart()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setLoading(false)
    }
  }

  return (
    <div className={`drawer ${open ? 'active' : ''}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: 'var(--border-width) solid var(--border)', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '2.5rem' }}>CARRITO</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--fg)', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}>
          [CERRAR]
        </button>
      </div>
      <div style={{ flexGrow: 1, overflowY: 'auto' }}>
        {items.length === 0 ? (
          <p style={{ color: 'var(--muted)', textAlign: 'center', marginTop: '4rem' }}>Tu carrito está vacío.</p>
        ) : (
          items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 'var(--border-width) solid var(--border)', padding: '1.5rem 0' }}>
              <div>
                <div style={{ fontSize: '0.9rem', textTransform: 'uppercase' }}>{item.name}</div>
                <div style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>${item.price.toLocaleString()}</div>
              </div>
              <button onClick={() => removeItem(idx)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}>
                [QUITAR]
              </button>
            </div>
          ))
        )}
      </div>
      <div style={{ borderTop: 'var(--border-width) solid var(--border)', paddingTop: '2rem', marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
          <span>TOTAL:</span>
          <span className="price">${total.toLocaleString()}.00</span>
        </div>
        <button
          className="btn btn-accent"
          style={{ width: '100%' }}
          onClick={handleCheckout}
          disabled={items.length === 0 || loading}
        >
          {loading ? 'PROCESANDO...' : 'PROCEDER AL PAGO'}
        </button>
      </div>
    </div>
  )
}
