'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/app/cart-context'
import type { Product } from '@/lib/data'

export default function ProductGrid({ onCartOpen }: { onCartOpen: () => void }) {
  const [products, setProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts)
  }, [])

  const categories = ['all', ...new Set(products.map(p => p.category))]

  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter)
  const { addItem } = useCart()

  const label = (f: string) => f === 'all' ? 'Todos' : f.charAt(0).toUpperCase() + f.slice(1)

  return (
    <section id="muebles">
      <div className="section-header">
        <div>
          <span className="kicker">Muebles & Equipos</span>
          <h2>Catálogo Profesional</h2>
        </div>
        <div className="filter-nav">
          {categories.map(f => (
            <span
              key={f}
              className={filter === f ? 'active' : ''}
              onClick={() => setFilter(f)}
            >
              {label(f)}
            </span>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {filtered.map(product => (
          <div className="product-card" key={product.id}>
            {product.tag && <span className="tag">{product.tag}</span>}
            <div className="product-img">
              <img src={product.img} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
              <span className="price">${product.price.toLocaleString()}</span>
              {product.amazon ? (
                <a
                  href="https://amazon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-amazon"
                >
                  AMAZON
                </a>
              ) : (
                <button
                  className="btn btn-sm btn-accent"
                  onClick={() => {
                    addItem({ id: product.id, name: product.name, price: product.price })
                    onCartOpen()
                  }}
                >
                  + CART
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
