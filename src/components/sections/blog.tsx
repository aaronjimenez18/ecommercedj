'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useLoading } from '@/lib/store/loading-context'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  image: string
  author: string
  published: boolean
  createdAt: string
}

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loaded, setLoaded] = useState(false)
  const { registerLoading, unregisterLoading } = useLoading()

  useEffect(() => {
    registerLoading('blog')
    fetch('/api/blog')
      .then(r => r.json())
      .then(data => {
        const published = data.filter((p: BlogPost) => p.published)
        setPosts(published)
        setLoaded(true)
        unregisterLoading('blog')
      })
      .catch(() => {
        setLoaded(true)
        unregisterLoading('blog')
      })
  }, [])

  useGSAP(() => {
    if (!loaded || posts.length === 0) return
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const blogCards = gsap.utils.toArray<HTMLElement>(".blog-card")
    if (blogCards.length === 0) return

    blogCards.forEach((card) => {
      const img = card.querySelector<HTMLElement>(".blog-img img")
      const content = card.querySelector<HTMLElement>(".blog-content")
      if (!img || !content) return

      gsap.set(img, { scale: 1.15 })
      gsap.set(content, { y: 30, autoAlpha: 0 })

      gsap.to(img, {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "top 30%",
          scrub: 1,
        },
      })

      gsap.to(content, {
        y: 0,
        autoAlpha: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 60%",
          end: "top 25%",
          scrub: 1,
        },
      })
    })

    const newsletter = section.querySelector<HTMLElement>(".newsletter-box")
    if (newsletter) {
      gsap.set(newsletter, { y: 30, autoAlpha: 0 })
      gsap.to(newsletter, {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: newsletter,
          start: "top 85%",
          end: "top 45%",
          scrub: 1,
        },
      })
    }
  }, { scope: sectionRef, dependencies: [loaded, posts] })

  if (!loaded) return null

  return (
    <section ref={sectionRef} id="blog">
      <div className="section-header">
        <div>
          <h2>Blog Editorial</h2>
        </div>
      </div>

      {posts.length === 0 ? (
        <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '2rem', fontSize: '0.8rem' }}>
          Próximamente...
        </p>
      ) : (
        <div className="blog-grid">
          {posts.map(p => (
            <article key={p.id} className="blog-card">
              {p.image && (
                <div className="blog-img">
                  <Image loading="lazy" decoding="async" src={p.image} alt={p.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                </div>
              )}
              <div className="blog-content">
                <span className="kicker blog-kicker">{p.author}</span>
                <h3>{p.title}</h3>
                <p className="blog-card-text">{p.excerpt}</p>
                <Link href={`/blog/${p.slug}`} className="btn btn-sm blog-btn">Leer Más</Link>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="newsletter-box">
        <span className="kicker newsletter-kicker">Exclusivo</span>
        <h3 className="newsletter-title">Únete al Collective</h3>
        <p className="newsletter-desc">
          Recibe descuentos exclusivos en muebles y guías de producción semanalmente.
        </p>
        <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="TU EMAIL" />
          <button className="btn btn-accent">Suscribirme</button>
        </form>
      </div>
    </section>
  )
}
