'use client'

import { useCart } from '@/app/cart-context'

export default function Header({ onCartToggle }: { onCartToggle: () => void }) {
  const { count } = useCart()

  return (
    <header>
      <div className="logo" onClick={() => window.scrollTo(0, 0)}>GDL.</div>
      <nav>
        <ul>
          <li><a href="#inicio">inicio</a></li>
          <li><a href="#muebles">catálogo</a></li>
          <li><a href="#servicios">servicios</a></li>
          <li><a href="#blog">blog</a></li>
          <li><a href="#faq">preguntas</a></li>
        </ul>
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button
          onClick={onCartToggle}
          className="btn btn-sm"
        >
          carrito <span>{count}</span>
        </button>
      </div>
    </header>
  )
}
