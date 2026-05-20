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
      <div className="drawer-header">
        <h3>CARRITO</h3>
        <button onClick={onClose} className="drawer-close">
          [CERRAR]
        </button>
      </div>
      <div className="drawer-body">
        {items.length === 0 ? (
          <p className="drawer-empty">Tu carrito está vacío.</p>
        ) : (
          items.map((item, idx) => (
            <div key={idx} className="drawer-item">
              <div>
                <div className="drawer-item-name">{item.name}</div>
                <div className="drawer-item-price">${item.price.toLocaleString()}</div>
              </div>
              <button onClick={() => removeItem(idx)} className="drawer-item-remove">
                [QUITAR]
              </button>
            </div>
          ))
        )}
      </div>
      <div className="drawer-footer">
        <div className="drawer-total">
          <span>TOTAL:</span>
          <span className="price">${total.toLocaleString()}.00</span>
        </div>
        <button
          className="btn btn-accent"
          onClick={handleCheckout}
          disabled={items.length === 0 || loading}
        >
          {loading ? 'PROCESANDO...' : 'PROCEDER AL PAGO'}
        </button>
      </div>
    </div>
  )
}
