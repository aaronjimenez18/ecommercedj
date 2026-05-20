'use client'

import { useState } from 'react'
import { useCart } from '@/lib/store/cart-context'

export default function Header({ onCartToggle }: { onCartToggle: () => void }) {
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header>
      <div className="logo" onClick={() => window.scrollTo(0, 0)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') window.scrollTo(0, 0) }}>GDL.</div>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menú de navegación"
      >
        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
      </button>

      <nav className={`nav-menu ${menuOpen ? 'nav-menu--open' : ''}`}>
        <ul>
          <li><a href="#inicio" onClick={closeMenu}>inicio</a></li>
          <li><a href="#muebles" onClick={closeMenu}>catálogo</a></li>
          <li><a href="#servicios" onClick={closeMenu}>servicios</a></li>
          <li><a href="#blog" onClick={closeMenu}>blog</a></li>
          <li><a href="#faq" onClick={closeMenu}>preguntas</a></li>
          <li className="nav-menu__cart-item">
            <button onClick={() => { closeMenu(); onCartToggle() }} className="btn btn-sm">
              carrito <span>{count}</span>
            </button>
          </li>
        </ul>
      </nav>

      <div className="header-cart">
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
