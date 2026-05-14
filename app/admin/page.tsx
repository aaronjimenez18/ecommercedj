'use client'

import { useState } from 'react'
import type { Product } from '@/lib/data'

const categories = ['mesas', 'cabinas', 'accesorios']

const emptyForm = {
  name: '',
  desc: '',
  price: '',
  category: 'mesas',
  tag: '',
  amazon: false,
  img: '',
}

type FormData = typeof emptyForm

function loadProducts(setter: (p: Product[]) => void) {
  fetch('/api/products').then(res => res.json()).then(setter)
}

export default function AdminPage() {
  const [auth, setAuth] = useState(() => typeof window !== 'undefined' && !!localStorage.getItem('gdl_admin'))
  const [password, setPassword] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState<FormData>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  if (auth && products.length === 0) {
    loadProducts(setProducts)
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      setAuth(true)
      localStorage.setItem('gdl_admin', '1')
      loadProducts(setProducts)
    } else {
      setError('Contraseña incorrecta')
    }
  }

  function handleLogout() {
    localStorage.removeItem('gdl_admin')
    setAuth(false)
    setPassword('')
  }

  function handleEdit(p: Product) {
    setEditingId(p.id)
    setForm({
      name: p.name,
      desc: p.desc,
      price: String(p.price),
      category: p.category,
      tag: p.tag || '',
      amazon: p.amazon,
      img: p.img,
    })
  }

  function resetForm() {
    setEditingId(null)
    setForm(emptyForm)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload = {
      name: form.name,
      desc: form.desc,
      price: parseInt(form.price),
      category: form.category,
      tag: form.tag || null,
      amazon: form.amazon,
      img: form.img,
    }

    const url = editingId
      ? `/api/products/${editingId}`
      : '/api/products'
    const method = editingId ? 'PUT' : 'POST'

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    resetForm()
    loadProducts(setProducts)
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar este producto?')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    loadProducts(setProducts)
  }

  if (!auth) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: 'var(--fg)', fontFamily: 'var(--font-mono)' }}>
        <form onSubmit={handleLogin} style={{ border: 'var(--border-width) solid var(--border)', padding: '4rem', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center', textTransform: 'uppercase' }}>
            Admin GDL
          </h2>
          <input
            type="password"
            placeholder="CONTRASEÑA"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
          />
          {error && <p style={{ color: 'var(--accent)', fontSize: '0.8rem', marginBottom: '1rem' }}>{error}</p>}
          <button type="submit" className="btn btn-accent" style={{ width: '100%' }}>ENTRAR</button>
        </form>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)', fontFamily: 'var(--font-mono)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: 'var(--border-width) solid var(--border)' }}>
        <div className="logo">GDL Admin</div>
        <button onClick={handleLogout} className="btn btn-sm">CERRAR SESIÓN</button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '2rem' }}>
        <div style={{ border: 'var(--border-width) solid var(--border)', padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem' }}>{editingId ? 'EDITAR PRODUCTO' : 'NUEVO PRODUCTO'}</h3>
          <form onSubmit={handleSubmit}>
            <input placeholder="NOMBRE" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <textarea placeholder="DESCRIPCIÓN" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} required style={{ width: '100%', background: 'transparent', border: 'var(--border-width) solid var(--border)', padding: '1.2rem', color: 'var(--fg)', fontFamily: 'var(--font-mono)', outline: 'none', marginBottom: '1rem', resize: 'vertical' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input type="number" placeholder="PRECIO" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ width: '100%', background: 'transparent', border: 'var(--border-width) solid var(--border)', padding: '1.2rem', color: 'var(--fg)', fontFamily: 'var(--font-mono)', outline: 'none', marginBottom: '1rem' }}>
                {categories.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
              </select>
            </div>
            <input placeholder="TAG (opcional, ej: TOP SELLER)" value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} />
            <input type="url" placeholder="URL DE IMAGEN" value={form.img} onChange={e => setForm({ ...form, img: e.target.value })} required />
            <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', marginBottom: '1rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.amazon} onChange={e => setForm({ ...form, amazon: e.target.checked })} style={{ width: 'auto', marginBottom: 0 }} />
              Link a Amazon (no añadir al carrito)
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-accent" style={{ flex: 1 }}>
                {editingId ? 'GUARDAR' : 'AGREGAR'}
              </button>
              {editingId && (
                <button type="button" className="btn" onClick={resetForm}>CANCELAR</button>
              )}
            </div>
          </form>
        </div>

        <div style={{ border: 'var(--border-width) solid var(--border)', padding: '2rem', maxHeight: '80vh', overflowY: 'auto' }}>
          <h3 style={{ marginBottom: '2rem' }}>PRODUCTOS ({products.length})</h3>
          {products.length === 0 ? (
            <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '2rem' }}>No hay productos todavía</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {products.map(p => (
                <div key={p.id} style={{ display: 'flex', gap: '1rem', border: 'var(--border-width) solid var(--border)', padding: '1rem', alignItems: 'center' }}>
                  <img src={p.img} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', filter: 'grayscale(1)' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.9rem' }}>{p.name}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>{p.category} · ${p.price.toLocaleString()}</div>
                  </div>
                  <button className="btn btn-sm" onClick={() => handleEdit(p)}>EDITAR</button>
                  <button className="btn btn-sm" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }} onClick={() => handleDelete(p.id)}>ELIMINAR</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
