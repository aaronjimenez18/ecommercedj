'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useCart } from '@/lib/store/cart-context'
import type { Product } from '@/types'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function HorizontalCatalog({ onCartOpen }: { onCartOpen: () => void }) {
  const router = useRouter()
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
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

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.set(".section-header .kicker, .section-header h2, .section-header .filter-nav", {
      y: 40,
      autoAlpha: 0,
    })

    gsap.to(".section-header .kicker, .section-header h2, .section-header .filter-nav", {
      y: 0,
      autoAlpha: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none none",
      },
    })
  }, { scope: sectionRef, dependencies: [] })

  useGSAP(() => {
    const track = trackRef.current
    const section = sectionRef.current
    if (!track || !section || filtered.length === 0) return

    gsap.set(track, { x: 0 })

    const style = getComputedStyle(section)
    const padLeft = parseFloat(style.paddingLeft)
    const padRight = parseFloat(style.paddingRight)
    const contentWidth = section.clientWidth - padLeft - padRight
    const overflowX = track.scrollWidth - contentWidth

    if (overflowX <= 0) return

    gsap.to(track, {
      x: -overflowX,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        pinSpacing: true,
        start: 'top top',
        end: () => `+=${overflowX}`,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    })
  }, { scope: sectionRef, dependencies: [filterKey], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className="horizontal-section" id="muebles">
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
      <div className="horizontal-track" ref={trackRef}>
        {filtered.map(product => (
          <div
            className="product-card horizontal-card"
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
            <div className="horizontal-card-footer">
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
    </section>
  )
}
