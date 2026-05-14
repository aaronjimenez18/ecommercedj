'use client'

import { useCart } from '@/app/cart-context'

export default function Header({ onCartToggle }: { onCartToggle: () => void }) {
  const { count } = useCart()

  return (
    <header>
      <div className="logo" onClick={() => window.scrollTo(0, 0)}>GDL.</div>
      <nav>
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#muebles">Muebles</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#faq">Preguntas</a></li>
        </ul>
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button
          onClick={onCartToggle}
          className="btn btn-sm"
        >
          CART <span>{count}</span>
        </button>
      </div>
    </header>
  )
}
