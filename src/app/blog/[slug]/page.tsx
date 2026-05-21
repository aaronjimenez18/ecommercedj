'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { CartProvider } from '@/lib/store/cart-context'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import WhatsAppFloat from '@/components/layout/whats-app-float'

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

function BlogContent() {
  const { slug } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    fetch(`/api/blog?slug=${slug}`)
      .then(async res => {
        if (!res.ok) { setNotFound(true); setLoading(false); return null }
        const data = await res.json()
        return data
      })
      .then(data => {
        if (data) {
          setPost(data)
          setLoading(false)
        }
      })
      .catch(() => { setLoading(false); setNotFound(true) })
  }, [slug])

  useEffect(() => {
    if (!post) return
    const imgs = document.querySelectorAll<HTMLImageElement>('article img')
    if (imgs.length === 0) {
      window.scrollTo(0, 0)
      return
    }
    let loaded = 0
    const onLoad = () => { loaded++; if (loaded === imgs.length) window.scrollTo(0, 0) }
    imgs.forEach(img => {
      if (img.complete) onLoad()
      else img.addEventListener('load', onLoad, { once: true })
    })
  }, [post])

  if (loading) {
    return (
      <>
        <Header onCartToggle={() => {}} />
        <div className="wrapper">
          <div className="product-loading" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p>Cargando...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (notFound || !post || !post.published) {
    return (
      <>
        <Header onCartToggle={() => {}} />
        <div className="wrapper">
          <div className="product-not-found" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <h2>Post no encontrado</h2>
            <Link href="/#blog" className="btn">Volver al Blog</Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header onCartToggle={() => {}} />
      <div className="wrapper">
        <div className="product-back-link" style={{ marginTop: '2rem' }}>
          <Link href="/#blog">
            ← Volver al Blog
          </Link>
        </div>

        <article style={{
          maxWidth: '720px', margin: '2rem auto 4rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: '1.8',
        }}>
          <span className="kicker">{post.author}</span>
          <h1 style={{ fontSize: '2.5rem', margin: '1rem 0 0.5rem' }}>{post.title}</h1>
          <div style={{ color: 'var(--muted)', fontSize: '0.75rem', marginBottom: '2rem' }}>
            {new Date(post.createdAt).toLocaleDateString('es-ES', {
              year: 'numeric', month: 'long', day: 'numeric',
            })}
          </div>

          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              style={{
                width: '100%', borderRadius: 'var(--radius-lg)',
                marginBottom: '2rem', objectFit: 'cover',
              }}
            />
          )}

          <div
            style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  )
}

export default function BlogPostPage() {
  return (
    <CartProvider>
      <BlogContent />
    </CartProvider>
  )
}
