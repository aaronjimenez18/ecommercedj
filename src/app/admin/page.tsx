'use client'

import { useState, useEffect } from 'react'
import type { Product } from '@/types'
import ImageUpload from '@/components/ui/image-upload'

type Section = 'dashboard' | 'products' | 'orders' | 'blog' | 'services' | 'bookings' | 'customers'

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface Order {
  id: number
  stripeId: string | null
  email: string | null
  customerName: string | null
  customerPhone: string | null
  shippingAddress: string | null
  total: number
  status: string
  tracking: string | null
  items: OrderItem[]
  createdAt: string
}

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

interface ServiceItem {
  id: number
  name: string
  description: string
  price: number
  features: string
  highlighted: boolean
  createdAt: string
}

interface Booking {
  id: number
  name: string
  email: string
  phone: string
  eventDate: string
  eventType: string
  hours: number
  total: number
  message: string
  status: string
  createdAt: string
}

interface Customer {
  email: string
  name: string
  phone: string
  totalSpent: number
  orderCount: number
  bookingCount: number
  lastOrder: string | null
  lastBooking: string | null
}

interface DashboardStats {
  totalOrders: number
  revenue: number
  productsSold: number
  recentOrders: Order[]
}

const categories = ['mesas', 'cabinas', 'accesorios']

const emptyProductForm = {
  name: '', desc: '', price: '', category: 'mesas' as const,
  tag: '', amazon: false, img: '', stock: '',
}
type ProductForm = typeof emptyProductForm

const emptyBlogForm = {
  title: '', slug: '', content: '', excerpt: '', image: '', author: 'Admin', published: true,
}
type BlogForm = typeof emptyBlogForm

const emptyServiceForm = {
  name: '', description: '', price: '', features: '', highlighted: false,
}
type ServiceForm = typeof emptyServiceForm

function slugify(text: string) {
  return text.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-+|-+$/g, '')
}

const sections: { id: Section; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '◈' },
  { id: 'products', label: 'Productos', icon: '◉' },
  { id: 'orders', label: 'Pedidos', icon: '◎' },
  { id: 'customers', label: 'Clientes', icon: '♛' },
  { id: 'services', label: 'Servicios', icon: '◇' },
  { id: 'blog', label: 'Blog', icon: '○' },
  { id: 'bookings', label: 'Reservas', icon: '□' },
]

export default function AdminPage() {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [section, setSection] = useState<Section>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [services, setServices] = useState<ServiceItem[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])

  const [productForm, setProductForm] = useState<ProductForm>(emptyProductForm)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)

  const [blogForm, setBlogForm] = useState<BlogForm>(emptyBlogForm)
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null)

  const [serviceForm, setServiceForm] = useState<ServiceForm>(emptyServiceForm)
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(data => {
      if (data.user) {
        setUser(data.user)
        loadAll()
      }
      setLoading(false)
    })
  }, [])

  function loadAll() {
    loadStats()
    loadProducts()
    loadOrders()
    loadPosts()
    loadServices()
    loadBookings()
    loadCustomers()
  }

  async function loadStats() {
    const res = await fetch('/api/orders/stats')
    if (res.ok) setStats(await res.json())
  }
  async function loadOrders() {
    const res = await fetch('/api/orders')
    if (res.ok) setOrders(await res.json())
  }
  function loadProducts() {
    fetch('/api/products').then(r => r.json()).then(setProducts)
  }
  async function loadPosts() {
    const res = await fetch('/api/blog')
    if (res.ok) setPosts(await res.json())
  }
  async function loadServices() {
    const res = await fetch('/api/services')
    if (res.ok) setServices(await res.json())
  }
  async function loadBookings() {
    const res = await fetch('/api/bookings')
    if (res.ok) setBookings(await res.json())
  }
  async function loadCustomers() {
    const res = await fetch('/api/customers')
    if (res.ok) setCustomers(await res.json())
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (res.ok) { setUser(data.user); loadAll() }
    else setError(data.error || 'Error al iniciar sesión')
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null); setPassword(''); setEmail('')
  }

  // Product handlers
  function handleEditProduct(p: Product) {
    setEditingProductId(p.id)
    setProductForm({
      name: p.name, desc: p.desc, price: String(p.price),
      category: p.category as ProductForm['category'],
      tag: p.tag || '', amazon: p.amazon, img: p.img, stock: String(p.stock ?? 0),
    })
    setSection('products')
  }
  function resetProductForm() { setEditingProductId(null); setProductForm(emptyProductForm) }
  async function handleProductSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload = {
      name: productForm.name, desc: productForm.desc, price: parseInt(productForm.price),
      category: productForm.category, tag: productForm.tag || null,
      amazon: productForm.amazon, img: productForm.img,
      stock: parseInt(productForm.stock) || 0,
    }
    const url = editingProductId ? `/api/products/${editingProductId}` : '/api/products'
    const method = editingProductId ? 'PUT' : 'POST'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    resetProductForm(); loadProducts(); loadStats()
  }
  async function handleDeleteProduct(id: string) {
    if (!confirm('¿Eliminar este producto?')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    loadProducts()
  }

  // Blog handlers
  function handleEditBlog(p: BlogPost) {
    setEditingBlogId(p.id)
    setBlogForm({ title: p.title, slug: p.slug, content: p.content, excerpt: p.excerpt, image: p.image, author: p.author, published: p.published })
    setSection('blog')
  }
  function resetBlogForm() { setEditingBlogId(null); setBlogForm(emptyBlogForm) }
  async function handleBlogSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload = { ...blogForm, slug: blogForm.slug || slugify(blogForm.title) }
    const url = editingBlogId ? `/api/blog/${editingBlogId}` : '/api/blog'
    const method = editingBlogId ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (res.ok) { resetBlogForm(); loadPosts() }
    else { const d = await res.json(); alert(d.error || 'Error') }
  }
  async function handleDeleteBlog(id: number) {
    if (!confirm('¿Eliminar este post?')) return
    await fetch(`/api/blog/${id}`, { method: 'DELETE' })
    loadPosts()
  }

  // Service handlers
  function handleEditService(s: ServiceItem) {
    let featuresText = s.features
    try { featuresText = JSON.parse(s.features).join('\n') } catch {}
    setEditingServiceId(s.id)
    setServiceForm({ name: s.name, description: s.description, price: String(s.price), features: featuresText, highlighted: s.highlighted })
    setSection('services')
  }
  function resetServiceForm() { setEditingServiceId(null); setServiceForm(emptyServiceForm) }
  async function handleServiceSubmit(e: React.FormEvent) {
    e.preventDefault()
    const features = JSON.stringify(serviceForm.features.split('\n').filter(f => f.trim()))
    const payload = { name: serviceForm.name, description: serviceForm.description, price: parseFloat(serviceForm.price), features, highlighted: serviceForm.highlighted }
    const url = editingServiceId ? `/api/services/${editingServiceId}` : '/api/services'
    const method = editingServiceId ? 'PUT' : 'POST'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    resetServiceForm(); loadServices()
  }
  async function handleDeleteService(id: number) {
    if (!confirm('¿Eliminar este servicio?')) return
    await fetch(`/api/services/${id}`, { method: 'DELETE' })
    loadServices()
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: 'var(--fg)' }}>
        <p>Cargando...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: 'var(--fg)', fontFamily: 'var(--font-mono)' }}>
        <form onSubmit={handleLogin} style={{ border: 'var(--border-width) solid var(--border)', borderRadius: 'var(--radius-md)', padding: '4rem', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center', textTransform: 'uppercase' }}>Admin GDL</h2>
          <input type="email" placeholder="CORREO" value={email} onChange={e => setEmail(e.target.value)} required autoFocus
            style={{ width: '100%', background: 'transparent', border: 'var(--border-width) solid var(--border)', padding: '1.2rem', color: 'var(--fg)', fontFamily: 'var(--font-mono)', outline: 'none', marginBottom: '1rem' }} />
          <input type="password" placeholder="CONTRASEÑA" value={password} onChange={e => setPassword(e.target.value)} required
            style={{ width: '100%', background: 'transparent', border: 'var(--border-width) solid var(--border)', padding: '1.2rem', color: 'var(--fg)', fontFamily: 'var(--font-mono)', outline: 'none', marginBottom: '1rem' }} />
          {error && <p style={{ color: 'var(--accent)', fontSize: '0.8rem', marginBottom: '1rem' }}>{error}</p>}
          <button type="submit" style={{ width: '100%', padding: '1.2rem', border: 'var(--border-width) solid var(--accent)', background: 'transparent', color: 'var(--accent)', cursor: 'pointer', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>ENTRAR</button>
        </form>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0c', color: '#e8e8ed', fontFamily: 'system-ui, -apple-system, sans-serif', display: 'flex' }}>
      {/* Sidebar */}
      <aside className={sidebarOpen ? 'admin-sidebar open' : 'admin-sidebar'} style={{
        width: '260px', minHeight: '100vh', background: '#111113', borderRight: '1px solid #1e1e20',
        display: 'flex', flexDirection: 'column', position: 'fixed', left: 0, top: 0, zIndex: 100,
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #1e1e20' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#e8e8ed', letterSpacing: '-1px' }}>GDL<span style={{ color: '#ff3b7f' }}>.</span></div>
          <div style={{ fontSize: '0.65rem', color: '#6b6b7b', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.25rem' }}>Admin Panel</div>
        </div>
        <nav style={{ flex: 1, padding: '1rem 0' }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => { setSection(s.id); setSidebarOpen(false) }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.85rem 1.5rem', border: 'none', background: section === s.id ? '#1a1a1d' : 'transparent',
                color: section === s.id ? '#ff3b7f' : '#6b6b7b', cursor: 'pointer',
                fontSize: '0.8rem', fontFamily: 'inherit', letterSpacing: '0.05em',
                textTransform: 'uppercase', borderLeft: section === s.id ? '2px solid #ff3b7f' : '2px solid transparent',
                transition: 'all 0.15s ease',
              }}>
              <span style={{ fontSize: '0.9rem' }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '1.5rem', borderTop: '1px solid #1e1e20', fontSize: '0.7rem', color: '#6b6b7b' }}>
          <div style={{ marginBottom: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
          <button onClick={handleLogout} style={{ background: 'none', border: '1px solid #2a2a2d', color: '#6b6b7b', padding: '0.4rem 0.8rem', cursor: 'pointer', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'inherit', borderRadius: '4px' }}>Cerrar Sesión</button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 99 }} />
      )}

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: '260px', minHeight: '100vh', position: 'relative' }}>
        {/* Top bar */}
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem 2rem', borderBottom: '1px solid #1e1e20', background: '#0a0a0c',
          position: 'sticky', top: 0, zIndex: 50,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: 'none', border: 'none', color: '#6b6b7b', cursor: 'pointer', fontSize: '1.2rem', display: 'none', padding: '0.25rem' }}>
              ☰
            </button>
            <h1 style={{ fontSize: '1rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#e8e8ed' }}>
              {sections.find(s => s.id === section)?.label || 'Dashboard'}
            </h1>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#6b6b7b' }}>{user.email}</div>
        </header>

        <div style={{ padding: '2rem' }}>
          {section === 'dashboard' && <DashboardView stats={stats} orders={orders} productsCount={products.length} />}
          {section === 'products' && <ProductsView
            products={products} form={productForm} setForm={setProductForm}
            editingId={editingProductId} onSubmit={handleProductSubmit}
            onEdit={handleEditProduct} onDelete={handleDeleteProduct}
            onReset={resetProductForm} />}
          {section === 'orders' && <OrdersView orders={orders} />}
          {section === 'services' && <ServicesView
            services={services} form={serviceForm} setForm={setServiceForm}
            editingId={editingServiceId} onSubmit={handleServiceSubmit}
            onEdit={handleEditService} onDelete={handleDeleteService}
            onReset={resetServiceForm} />}
          {section === 'blog' && <BlogView
            posts={posts} form={blogForm} setForm={setBlogForm}
            editingId={editingBlogId} onSubmit={handleBlogSubmit}
            onEdit={handleEditBlog} onDelete={handleDeleteBlog}
            onReset={resetBlogForm} />}
          {section === 'customers' && <CustomersView customers={customers} />}
          {section === 'bookings' && <BookingsView bookings={bookings} />}
        </div>
      </main>

      {/* Responsive sidebar button */}
      <style>{`
        @media (max-width: 768px) {
          aside { transform: translateX(-100%); }
          aside.open { transform: translateX(0); }
          main { margin-left: 0 !important; }
          header button { display: block !important; }
        }
      `}</style>
    </div>
  )
}

/* ── Dashboard ── */
function DashboardView({ stats, orders, productsCount }: { stats: DashboardStats | null; orders: Order[]; productsCount: number }) {
  const cards = [
    { label: 'Ingresos Totales', value: stats ? `$${stats.revenue.toLocaleString()}` : '—', color: '#ff3b7f' },
    { label: 'Pedidos', value: stats ? String(stats.totalOrders) : '—', color: '#5b7fff' },
    { label: 'Productos Vendidos', value: stats ? String(stats.productsSold) : '—', color: '#3bce7f' },
    { label: 'Productos en Tienda', value: String(productsCount), color: '#ffab3b' },
  ]

  const recent = stats?.recentOrders || orders.slice(0, 5)

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {cards.map(c => (
          <div key={c.label} style={{ background: '#111113', border: '1px solid #1e1e20', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ fontSize: '0.65rem', color: '#6b6b7b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{c.label}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 600, color: c.color, fontFamily: 'var(--font-display)' }}>{c.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#111113', border: '1px solid #1e1e20', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', color: '#e8e8ed' }}>Pedidos Recientes</h2>
        {recent.length === 0 ? (
          <p style={{ color: '#6b6b7b', fontSize: '0.8rem', textAlign: 'center', padding: '2rem' }}>No hay pedidos aún</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e1e20', color: '#6b6b7b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>ID</th>
                  <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Total</th>
                  <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Estado</th>
                  <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {recent.map(o => (
                  <tr key={o.id} style={{ borderBottom: '1px solid #161618' }}>
                    <td style={{ padding: '0.75rem 0.5rem' }}>#{o.id}</td>
                    <td style={{ padding: '0.75rem 0.5rem', color: '#6b6b7b' }}>{o.email || '—'}</td>
                    <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontFamily: 'var(--font-display)' }}>${o.total.toLocaleString()}</td>
                    <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                      <span style={{
                        padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.6rem',
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                        background: o.status === 'completed' ? '#1a3a2a' : o.status === 'pending' ? '#3a2a1a' : '#1e1e20',
                        color: o.status === 'completed' ? '#3bce7f' : o.status === 'pending' ? '#ffab3b' : '#6b6b7b',
                      }}>{o.status}</span>
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', color: '#6b6b7b' }}>{new Date(o.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Products ── */
function ProductsView({ products, form, setForm, editingId, onSubmit, onEdit, onDelete, onReset }: {
  products: Product[]; form: ProductForm; setForm: (f: ProductForm) => void
  editingId: string | null; onSubmit: (e: React.FormEvent) => void
  onEdit: (p: Product) => void; onDelete: (id: string) => void; onReset: () => void
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '1.5rem', alignItems: 'start' }}>
      <div style={{ background: '#111113', border: '1px solid #1e1e20', borderRadius: '12px', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#e8e8ed' }}>
          {editingId ? 'EDITAR PRODUCTO' : 'NUEVO PRODUCTO'}
        </h3>
        <form onSubmit={onSubmit}>
          <input placeholder="NOMBRE" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={inputStyle} />
          <textarea placeholder="DESCRIPCIÓN" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} required style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <input type="number" placeholder="PRECIO" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required style={inputStyle} />
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as ProductForm['category'] })} style={inputStyle}>
              {categories.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
            </select>
          </div>
          <input placeholder="TAG (opcional)" value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} style={inputStyle} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <ImageUpload currentUrl={form.img} onUpload={url => setForm({ ...form, img: url })} folder="products" />
            <input type="number" placeholder="STOCK" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} style={inputStyle} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.7rem', color: '#6b6b7b', marginBottom: '1rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.amazon} onChange={e => setForm({ ...form, amazon: e.target.checked })} style={{ width: 'auto' }} />
            Link a Amazon
          </label>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="submit" style={{ ...btnStyle, flex: 1, borderColor: '#ff3b7f', color: '#ff3b7f' }}>{editingId ? 'GUARDAR' : 'AGREGAR'}</button>
            {editingId && <button type="button" onClick={onReset} style={btnStyle}>CANCELAR</button>}
          </div>
        </form>
      </div>

      <div style={{ background: '#111113', border: '1px solid #1e1e20', borderRadius: '12px', padding: '1.5rem', maxHeight: '80vh', overflowY: 'auto' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#e8e8ed' }}>PRODUCTOS ({products.length})</h3>
        {products.length === 0 ? (
          <p style={{ color: '#6b6b7b', textAlign: 'center', padding: '2rem', fontSize: '0.8rem' }}>No hay productos</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {products.map(p => (
              <div key={p.id} style={{ display: 'flex', gap: '0.75rem', border: '1px solid #1e1e20', borderRadius: '8px', padding: '0.75rem', alignItems: 'center' }}>
                <img src={p.img} alt="" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px', filter: 'grayscale(0.5)' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 500, fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                  <div style={{ color: '#6b6b7b', fontSize: '0.65rem' }}>{p.category} · ${p.price.toLocaleString()} · Stock: {p.stock ?? 0}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                  <button onClick={() => onEdit(p)} style={{ ...btnStyle, padding: '0.3rem 0.6rem', fontSize: '0.6rem' }}>EDITAR</button>
                  <button onClick={() => onDelete(p.id)} style={{ ...btnStyle, padding: '0.3rem 0.6rem', fontSize: '0.6rem', borderColor: '#ff3b7f', color: '#ff3b7f' }}>ELIM</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Orders ── */
function OrdersView({ orders }: { orders: Order[] }) {
  const [selected, setSelected] = useState<Order | null>(null)
  const [status, setStatus] = useState('')
  const [tracking, setTracking] = useState('')
  const [saving, setSaving] = useState(false)

  function openDetail(o: Order) {
    setSelected(o)
    setStatus(o.status)
    setTracking(o.tracking || '')
  }

  async function handleSave() {
    if (!selected) return
    setSaving(true)
    const res = await fetch(`/api/orders/${selected.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, tracking }),
    })
    if (res.ok) {
      const updated = await res.json()
      setSelected(updated)
      setSaving(false)
    } else {
      setSaving(false)
    }
  }

  const statusColors: Record<string, string> = {
    pending: '#ffab3b', paid: '#3bce7f', shipped: '#5b7fff',
    delivered: '#3bce7f', cancelled: '#ff3b7f',
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 340px' : '1fr', gap: '1.5rem', alignItems: 'start' }}>
      <div style={{ background: '#111113', border: '1px solid #1e1e20', borderRadius: '12px', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#e8e8ed' }}>
          Todos los Pedidos ({orders.length})
        </h3>
        {orders.length === 0 ? (
          <p style={{ color: '#6b6b7b', textAlign: 'center', padding: '3rem', fontSize: '0.8rem' }}>No hay pedidos</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e1e20', color: '#6b6b7b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>ID</th>
                  <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Cliente</th>
                  <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Total</th>
                  <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Estado</th>
                  <th style={{ padding: '0.75rem 0.5rem', textAlign: 'left' }}>Items</th>
                  <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} onClick={() => openDetail(o)}
                    style={{ borderBottom: '1px solid #161618', cursor: 'pointer', background: selected?.id === o.id ? '#1a1a1d' : 'transparent' }}>
                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: 500 }}>#{o.id}</td>
                    <td style={{ padding: '0.75rem 0.5rem', color: '#6b6b7b' }}>{o.email || '—'}</td>
                    <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontFamily: 'var(--font-display)' }}>${o.total.toLocaleString()}</td>
                    <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                      <span style={{
                        padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.6rem',
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                        background: `#1a1a1d`, color: statusColors[o.status] || '#6b6b7b',
                      }}>{o.status}</span>
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      {o.items.map(item => (
                        <span key={item.id} style={{ fontSize: '0.65rem', color: '#6b6b7b', display: 'block' }}>
                          {item.name} × {item.quantity}
                        </span>
                      ))}
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', color: '#6b6b7b', whiteSpace: 'nowrap' }}>
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <div style={{ background: '#111113', border: '1px solid #1e1e20', borderRadius: '12px', padding: '1.5rem', position: 'sticky', top: '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#e8e8ed' }}>Pedido #{selected.id}</h3>
            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#6b6b7b', cursor: 'pointer', fontSize: '0.7rem' }}>✕</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.7rem', marginBottom: '1rem' }}>
            <div><span style={{ color: '#6b6b7b' }}>Email: </span>{selected.email || '—'}</div>
            <div><span style={{ color: '#6b6b7b' }}>Cliente: </span>{selected.customerName || '—'}</div>
            <div><span style={{ color: '#6b6b7b' }}>Tel: </span>{selected.customerPhone || '—'}</div>
            <div><span style={{ color: '#6b6b7b' }}>Total: </span>${selected.total.toLocaleString()}</div>
            <div><span style={{ color: '#6b6b7b' }}>Stripe: </span>{selected.stripeId || '—'}</div>
            {selected.shippingAddress && <div><span style={{ color: '#6b6b7b' }}>Envío: </span>{selected.shippingAddress}</div>}
          </div>

          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ fontSize: '0.6rem', color: '#6b6b7b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.3rem' }}>Estado</label>
            <select value={status} onChange={e => setStatus(e.target.value)} style={{
              width: '100%', background: '#0a0a0c', border: '1px solid #1e1e20', borderRadius: '6px',
              padding: '0.6rem', color: '#e8e8ed', fontFamily: 'inherit', fontSize: '0.75rem', outline: 'none',
            }}>
              <option value="pending">Pendiente</option>
              <option value="paid">Pagado</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.6rem', color: '#6b6b7b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.3rem' }}>Tracking</label>
            <input type="text" placeholder="Número de guía" value={tracking} onChange={e => setTracking(e.target.value)}
              style={{ width: '100%', background: '#0a0a0c', border: '1px solid #1e1e20', borderRadius: '6px', padding: '0.6rem', color: '#e8e8ed', fontFamily: 'inherit', fontSize: '0.75rem', outline: 'none' }} />
          </div>

          <button onClick={handleSave} disabled={saving}
            style={{ width: '100%', padding: '0.6rem', border: '1px solid #ff3b7f', background: 'transparent', color: '#ff3b7f', cursor: 'pointer', borderRadius: '6px', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'inherit' }}>
            {saving ? 'GUARDANDO...' : 'GUARDAR CAMBIOS'}
          </button>
        </div>
      )}
    </div>
  )
}

/* ── Customers ── */
function CustomersView({ customers }: { customers: Customer[] }) {
  const [selected, setSelected] = useState<Customer | null>(null)
  const [customerDetail, setCustomerDetail] = useState<{ orders: Order[]; bookings: Booking[] } | null>(null)
  const [loading, setLoading] = useState(false)

  async function openDetail(c: Customer) {
    setSelected(c)
    setLoading(true)
    setCustomerDetail(null)
    const res = await fetch(`/api/customers/${encodeURIComponent(c.email)}`)
    if (res.ok) setCustomerDetail(await res.json())
    setLoading(false)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: '1.5rem', alignItems: 'start' }}>
      <div style={{ background: '#111113', border: '1px solid #1e1e20', borderRadius: '12px', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#e8e8ed' }}>
          Clientes ({customers.length})
        </h3>
        {customers.length === 0 ? (
          <p style={{ color: '#6b6b7b', textAlign: 'center', padding: '2rem', fontSize: '0.75rem' }}>No hay clientes</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {customers.map(c => (
              <div key={c.email} onClick={() => openDetail(c)}
                style={{
                  border: '1px solid #161618', borderRadius: '8px', padding: '0.75rem', cursor: 'pointer',
                  borderColor: selected?.email === c.email ? '#ff3b7f' : '#161618',
                  transition: 'border-color 0.15s',
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 500, fontSize: '0.75rem' }}>{c.name || c.email}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: '#ff3b7f' }}>${c.totalSpent.toLocaleString()}</div>
                </div>
                <div style={{ color: '#6b6b7b', fontSize: '0.6rem', marginTop: '0.2rem' }}>
                  {c.email} · {c.orderCount} pedidos · {c.bookingCount} reservas
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div style={{ background: '#111113', border: '1px solid #1e1e20', borderRadius: '12px', padding: '1.5rem', maxHeight: '80vh', overflowY: 'auto', position: 'sticky', top: '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#e8e8ed' }}>{selected.name || selected.email}</h3>
            <button onClick={() => { setSelected(null); setCustomerDetail(null) }} style={{ background: 'none', border: 'none', color: '#6b6b7b', cursor: 'pointer', fontSize: '0.7rem' }}>✕</button>
          </div>

          {loading ? (
            <p style={{ color: '#6b6b7b', fontSize: '0.7rem' }}>Cargando...</p>
          ) : customerDetail ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.65rem', color: '#6b6b7b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Pedidos ({customerDetail.orders.length})</div>
                {customerDetail.orders.length === 0 ? (
                  <p style={{ color: '#6b6b7b', fontSize: '0.65rem' }}>Sin pedidos</p>
                ) : (
                  customerDetail.orders.map(o => (
                    <div key={o.id} style={{ border: '1px solid #161618', borderRadius: '6px', padding: '0.5rem', marginBottom: '0.4rem', fontSize: '0.65rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>#{o.id} · ${o.total.toLocaleString()}</span>
                        <span style={{ color: '#ffab3b' }}>{o.status}</span>
                      </div>
                      <div style={{ color: '#6b6b7b', fontSize: '0.6rem', marginTop: '0.15rem' }}>
                        {o.items.map(i => `${i.name} × ${i.quantity}`).join(', ')}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div>
                <div style={{ fontSize: '0.65rem', color: '#6b6b7b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Reservas ({customerDetail.bookings.length})</div>
                {customerDetail.bookings.length === 0 ? (
                  <p style={{ color: '#6b6b7b', fontSize: '0.65rem' }}>Sin reservas</p>
                ) : (
                  customerDetail.bookings.map(b => (
                    <div key={b.id} style={{ border: '1px solid #161618', borderRadius: '6px', padding: '0.5rem', marginBottom: '0.4rem', fontSize: '0.65rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{b.eventDate} · {b.eventType}</span>
                        <span style={{ color: b.status === 'confirmed' ? '#3bce7f' : '#ffab3b' }}>{b.status}</span>
                      </div>
                      <div style={{ color: '#6b6b7b', fontSize: '0.6rem' }}>${b.total.toLocaleString()} · {b.hours}h</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

/* ── Services ── */
function ServicesView({ services, form, setForm, editingId, onSubmit, onEdit, onDelete, onReset }: {
  services: ServiceItem[]; form: ServiceForm; setForm: (f: ServiceForm) => void
  editingId: number | null; onSubmit: (e: React.FormEvent) => void
  onEdit: (s: ServiceItem) => void; onDelete: (id: number) => void; onReset: () => void
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '1.5rem', alignItems: 'start' }}>
      <div style={{ background: '#111113', border: '1px solid #1e1e20', borderRadius: '12px', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#e8e8ed' }}>
          {editingId ? 'EDITAR SERVICIO' : 'NUEVO SERVICIO'}
        </h3>
        <form onSubmit={onSubmit}>
          <input placeholder="NOMBRE DEL SERVICIO" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={inputStyle} />
          <textarea placeholder="DESCRIPCIÓN" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
          <input type="number" step="0.01" placeholder="PRECIO" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required style={inputStyle} />
          <textarea placeholder="CARACTERÍSTICAS (una por línea)" value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} />
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.7rem', color: '#6b6b7b', marginBottom: '1rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.highlighted} onChange={e => setForm({ ...form, highlighted: e.target.checked })} style={{ width: 'auto' }} />
            Destacado (Premium)
          </label>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="submit" style={{ ...btnStyle, flex: 1, borderColor: '#ff3b7f', color: '#ff3b7f' }}>{editingId ? 'GUARDAR' : 'AGREGAR'}</button>
            {editingId && <button type="button" onClick={onReset} style={btnStyle}>CANCELAR</button>}
          </div>
        </form>
      </div>

      <div style={{ background: '#111113', border: '1px solid #1e1e20', borderRadius: '12px', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#e8e8ed' }}>SERVICIOS ({services.length})</h3>
        {services.length === 0 ? (
          <p style={{ color: '#6b6b7b', textAlign: 'center', padding: '2rem', fontSize: '0.8rem' }}>No hay servicios</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {services.map(s => (
              <div key={s.id} style={{ border: '1px solid #1e1e20', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '0.85rem' }}>{s.name}</div>
                    <div style={{ color: '#6b6b7b', fontSize: '0.65rem', marginTop: '0.2rem' }}>{s.description}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ff3b7f' }}>${s.price.toLocaleString()}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
                  <button onClick={() => onEdit(s)} style={{ ...btnStyle, padding: '0.3rem 0.6rem', fontSize: '0.6rem' }}>EDITAR</button>
                  <button onClick={() => onDelete(s.id)} style={{ ...btnStyle, padding: '0.3rem 0.6rem', fontSize: '0.6rem', borderColor: '#ff3b7f', color: '#ff3b7f' }}>ELIM</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Blog ── */
function BlogView({ posts, form, setForm, editingId, onSubmit, onEdit, onDelete, onReset }: {
  posts: BlogPost[]; form: BlogForm; setForm: (f: BlogForm) => void
  editingId: number | null; onSubmit: (e: React.FormEvent) => void
  onEdit: (p: BlogPost) => void; onDelete: (id: number) => void; onReset: () => void
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '450px 1fr', gap: '1.5rem', alignItems: 'start' }}>
      <div style={{ background: '#111113', border: '1px solid #1e1e20', borderRadius: '12px', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#e8e8ed' }}>
          {editingId ? 'EDITAR POST' : 'NUEVO POST'}
        </h3>
        <form onSubmit={onSubmit}>
          <input placeholder="TÍTULO" value={form.title} onChange={e => {
            const title = e.target.value
            setForm(editingId ? { ...form, title } : { ...form, title, slug: slugify(title) })
          }} required style={inputStyle} />
          <input placeholder="SLUG (URL)" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required style={inputStyle} />
          <ImageUpload currentUrl={form.image} onUpload={url => setForm({ ...form, image: url })} folder="blog" />
          <textarea placeholder="EXTRACTO (resumen corto)" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} required style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }} />
          <textarea placeholder="CONTENIDO (puedes usar HTML básico)" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required style={{ ...inputStyle, minHeight: '200px', resize: 'vertical', fontFamily: 'var(--font-mono)' }} />
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.7rem', color: '#6b6b7b', marginBottom: '1rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} style={{ width: 'auto' }} />
            Publicado
          </label>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="submit" style={{ ...btnStyle, flex: 1, borderColor: '#ff3b7f', color: '#ff3b7f' }}>{editingId ? 'GUARDAR' : 'PUBLICAR'}</button>
            {editingId && <button type="button" onClick={onReset} style={btnStyle}>CANCELAR</button>}
          </div>
        </form>
      </div>

      <div style={{ background: '#111113', border: '1px solid #1e1e20', borderRadius: '12px', padding: '1.5rem', maxHeight: '80vh', overflowY: 'auto' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#e8e8ed' }}>POSTS ({posts.length})</h3>
        {posts.length === 0 ? (
          <p style={{ color: '#6b6b7b', textAlign: 'center', padding: '2rem', fontSize: '0.8rem' }}>No hay posts</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {posts.map(p => (
              <div key={p.id} style={{ border: '1px solid #1e1e20', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  {p.image && <img src={p.image} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, fontSize: '0.8rem' }}>{p.title}</div>
                    <div style={{ color: '#6b6b7b', fontSize: '0.6rem', marginTop: '0.2rem' }}>
                      /{p.slug} · {p.author} · {new Date(p.createdAt).toLocaleDateString()}
                    </div>
                    <div style={{ color: '#6b6b7b', fontSize: '0.7rem', marginTop: '0.3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.excerpt}</div>
                    <div style={{ marginTop: '0.4rem' }}>
                      <span style={{
                        padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.55rem',
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                        background: p.published ? '#1a3a2a' : '#2a2a1a', color: p.published ? '#3bce7f' : '#ffab3b',
                      }}>{p.published ? 'Publicado' : 'Borrador'}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                    <button onClick={() => onEdit(p)} style={{ ...btnStyle, padding: '0.3rem 0.6rem', fontSize: '0.6rem' }}>EDITAR</button>
                    <button onClick={() => onDelete(p.id)} style={{ ...btnStyle, padding: '0.3rem 0.6rem', fontSize: '0.6rem', borderColor: '#ff3b7f', color: '#ff3b7f' }}>ELIM</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Bookings ── */
function BookingsView({ bookings }: { bookings: Booking[] }) {
  const [currentMonth, setCurrentMonth] = useState(() => new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear())
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay()

  function prevMonth() {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1) }
    else setCurrentMonth(currentMonth - 1)
  }
  function nextMonth() {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1) }
    else setCurrentMonth(currentMonth + 1)
  }

  const bookingsByDate: Record<string, Booking[]> = {}
  bookings.forEach(b => {
    const d = b.eventDate
    if (!bookingsByDate[d]) bookingsByDate[d] = []
    bookingsByDate[d].push(b)
  })

  const today = new Date()
  const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear

  const dayNames = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem', alignItems: 'start' }}>
      {/* Calendar */}
      <div style={{ background: '#111113', border: '1px solid #1e1e20', borderRadius: '12px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <button onClick={prevMonth} style={{ background: 'none', border: '1px solid #2a2a2d', color: '#6b6b7b', padding: '0.4rem 0.8rem', cursor: 'pointer', borderRadius: '6px', fontSize: '0.75rem' }}>←</button>
          <h3 style={{ fontSize: '1rem', fontWeight: 500, color: '#e8e8ed' }}>{months[currentMonth]} {currentYear}</h3>
          <button onClick={nextMonth} style={{ background: 'none', border: '1px solid #2a2a2d', color: '#6b6b7b', padding: '0.4rem 0.8rem', cursor: 'pointer', borderRadius: '6px', fontSize: '0.75rem' }}>→</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '2px' }}>
          {dayNames.map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: '0.6rem', color: '#6b6b7b', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.5rem 0' }}>{d}</div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const dayBookings = bookingsByDate[dateStr] || []
            const isToday = isCurrentMonth && day === today.getDate()

            return (
              <div key={day} style={{
                minHeight: '80px', border: '1px solid #161618', borderRadius: '6px', padding: '4px',
                background: isToday ? '#1a1a2a' : 'transparent',
                borderColor: isToday ? '#ff3b7f' : '#161618',
              }}>
                <div style={{ fontSize: '0.65rem', color: isToday ? '#ff3b7f' : '#6b6b7b', marginBottom: '2px', fontWeight: isToday ? 600 : 400 }}>{day}</div>
                {dayBookings.slice(0, 2).map(b => (
                  <div key={b.id} onClick={() => setSelectedBooking(b)}
                    style={{
                      fontSize: '0.55rem', padding: '2px 4px', borderRadius: '3px', marginBottom: '1px', cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      background: b.status === 'confirmed' ? '#1a3a2a' : '#3a2a1a',
                      color: b.status === 'confirmed' ? '#3bce7f' : '#ffab3b',
                    }}>
                    {b.name}
                  </div>
                ))}
                {dayBookings.length > 2 && (
                  <div style={{ fontSize: '0.5rem', color: '#6b6b7b', textAlign: 'center' }}>+{dayBookings.length - 2}</div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Details & List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Selected booking detail */}
        {selectedBooking && (
          <div style={{ background: '#111113', border: '1px solid #1e1e20', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#e8e8ed' }}>Reserva #{selectedBooking.id}</h3>
              <button onClick={() => setSelectedBooking(null)} style={{ background: 'none', border: 'none', color: '#6b6b7b', cursor: 'pointer', fontSize: '0.7rem' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.7rem' }}>
              <div><span style={{ color: '#6b6b7b' }}>Cliente: </span>{selectedBooking.name}</div>
              <div><span style={{ color: '#6b6b7b' }}>Email: </span>{selectedBooking.email}</div>
              <div><span style={{ color: '#6b6b7b' }}>Tel: </span>{selectedBooking.phone}</div>
              <div><span style={{ color: '#6b6b7b' }}>Fecha: </span>{selectedBooking.eventDate}</div>
              <div><span style={{ color: '#6b6b7b' }}>Tipo: </span>{selectedBooking.eventType}</div>
              <div><span style={{ color: '#6b6b7b' }}>Duración: </span>{selectedBooking.hours}h</div>
              <div><span style={{ color: '#6b6b7b' }}>Total: </span>${selectedBooking.total.toLocaleString()}</div>
              <div>
                <span style={{ color: '#6b6b7b' }}>Estado: </span>
                <span style={{
                  padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.6rem',
                  background: selectedBooking.status === 'confirmed' ? '#1a3a2a' : '#3a2a1a',
                  color: selectedBooking.status === 'confirmed' ? '#3bce7f' : '#ffab3b',
                }}>{selectedBooking.status}</span>
              </div>
              {selectedBooking.message && <div><span style={{ color: '#6b6b7b' }}>Mensaje: </span>{selectedBooking.message}</div>}
            </div>
          </div>
        )}

        {/* All bookings list */}
        <div style={{ background: '#111113', border: '1px solid #1e1e20', borderRadius: '12px', padding: '1.5rem', maxHeight: '400px', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', color: '#e8e8ed' }}>
            Todas las Reservas ({bookings.length})
          </h3>
          {bookings.length === 0 ? (
            <p style={{ color: '#6b6b7b', textAlign: 'center', padding: '1rem', fontSize: '0.75rem' }}>No hay reservas</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {bookings.map(b => (
                <div key={b.id} onClick={() => setSelectedBooking(b)}
                  style={{
                    border: '1px solid #161618', borderRadius: '6px', padding: '0.65rem', cursor: 'pointer',
                    borderColor: selectedBooking?.id === b.id ? '#ff3b7f' : '#161618',
                    transition: 'border-color 0.15s',
                  }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 500, fontSize: '0.7rem' }}>{b.name}</span>
                    <span style={{
                      padding: '0.1rem 0.35rem', borderRadius: '3px', fontSize: '0.55rem',
                      background: b.status === 'confirmed' ? '#1a3a2a' : '#3a2a1a',
                      color: b.status === 'confirmed' ? '#3bce7f' : '#ffab3b',
                    }}>{b.status}</span>
                  </div>
                  <div style={{ color: '#6b6b7b', fontSize: '0.6rem', marginTop: '0.2rem' }}>{b.eventDate} · ${b.total.toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Shared Styles ── */
const inputStyle: React.CSSProperties = {
  width: '100%', background: 'transparent', border: '1px solid #1e1e20', borderRadius: '6px',
  padding: '0.75rem', color: '#e8e8ed', fontFamily: 'inherit', outline: 'none',
  marginBottom: '0.75rem', fontSize: '0.75rem', boxSizing: 'border-box',
}

const btnStyle: React.CSSProperties = {
  padding: '0.5rem 1rem', border: '1px solid #2a2a2d', background: 'transparent',
  color: '#e8e8ed', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.7rem',
  textTransform: 'uppercase', letterSpacing: '0.05em', borderRadius: '6px',
  transition: 'all 0.15s ease',
}
