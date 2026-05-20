'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useCart } from '@/lib/store/cart-context'
import type { Product } from '@/types'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function CatalogSection({ onCartOpen }: { onCartOpen: () => void }) {
  const router = useRouter()
  const sectionRef = useRef<HTMLElement>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState('all')
  const { addItem } = useCart()

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts)
  }, [])

  const categories = ['all', ...new Set(products.map(p => p.category))]
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter)
  const label = (f: string) => f === 'all' ? 'Todos' : f.charAt(0).toUpperCase() + f.slice(1)
  const filterKey = `${filter}-${filtered.length}`

  const loading = products.length === 0

  useGSAP(() => {
    const section = sectionRef.current
    if (!section || products.length === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.set(".section-header .kicker, .section-header h2, .section-header .filter-nav", {
      y: 20,
      autoAlpha: 0,
    })

    gsap.to(".section-header .kicker, .section-header h2, .section-header .filter-nav", {
      y: 0,
      autoAlpha: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none none",
      },
    })

    const cards = gsap.utils.toArray<HTMLElement>(".catalog-card")
    if (cards.length === 0) return

    const isMobile = window.innerWidth < 900

    if (isMobile) {
      gsap.set(cards, { opacity: 1, y: 0, scale: 1 })
    } else {
      gsap.set(cards, { scale: 0.5, opacity: 0, y: 60 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: `+=${cards.length * 350}`,
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      })

      cards.forEach((card, i) => {
        const pos = i / cards.length
        tl.to(card, {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.5 / cards.length,
          ease: "power2.out",
        }, pos)
      })
    }
  }, { scope: sectionRef, dependencies: [filterKey], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className="catalog-section" id="muebles">
      <div className="section-header">
        <div>
          <span className="kicker">Muebles & Equipos</span>
          <h2>Catálogo Profesional</h2>
        </div>
        <div className="filter-nav" role="group" aria-label="Filtrar por categoría">
          {categories.map(f => (
            <button
              key={f}
              className={filter === f ? 'active' : ''}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
            >
              {label(f)}
            </button>
          ))}
        </div>
      </div>
      {loading && (
        <p style={{ color: 'var(--muted)', textAlign: 'center', padding: 'var(--space-4xl) 0' }}>
          Cargando catálogo...
        </p>
      )}

      {!loading && filtered.length === 0 && (
        <p style={{ color: 'var(--muted)', textAlign: 'center', padding: 'var(--space-4xl) 0' }}>
          No hay productos en esta categoría
        </p>
      )}

      {!loading && filtered.length > 0 && (
      <div className="catalog-grid">
        {filtered.map(product => (
          <div
            className="product-card catalog-card"
            key={product.id}
            onClick={() => router.push(`/productos/${product.id}`)}
            style={{ cursor: 'pointer' }}
          >
            {product.tag && <span className="tag">{product.tag}</span>}
            <div className="product-img">
              <img src={product.img} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
            </div>
            <div className="catalog-card-footer">
              <span className="price">${product.price.toLocaleString()}</span>
              {product.amazon ? (
                <a
                  href="https://amazon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-amazon"
                  onClick={e => e.stopPropagation()}
                >
                  AMAZON
                </a>
              ) : (
                <button
                  className="btn btn-sm btn-accent"
                  onClick={e => {
                    e.stopPropagation()
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
      )}
    </section>
  )
}
