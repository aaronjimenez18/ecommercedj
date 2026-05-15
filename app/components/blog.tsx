export default function Blog() {
  return (
    <section id="blog">
      <div className="section-header">
        <div>
          <span className="kicker">Contenido</span>
          <h2>Blog Editorial</h2>
        </div>
        <div className="filter-nav">
          <span className="active">Novedades</span>
          <span>Tutoriales</span>
          <span>Eventos</span>
        </div>
      </div>

      <div className="blog-grid">
        <article className="blog-card">
          <div className="blog-img">
            <img src="https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=800" alt="Vinyl" />
          </div>
          <div className="blog-content">
            <span className="kicker" style={{ fontSize: '0.6rem' }}>Tendencias</span>
            <h3>El Renacimiento del Vinilo en el 2026</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
              Por qué los sets puristas están cobrando más fuerza que nunca en la escena underground.
            </p>
            <button className="btn btn-sm" style={{ alignSelf: 'flex-start' }}>Leer Más</button>
          </div>
        </article>

        <article className="blog-card">
          <div className="blog-img">
            <img src="https://images.unsplash.com/photo-1514525253361-bee8718a34d1?q=80&w=800" alt="Club" />
          </div>
          <div className="blog-content">
            <span className="kicker" style={{ fontSize: '0.6rem' }}>Producción</span>
            <h3>Guía: Acústica para tu Home Studio</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
              No gastes miles en equipo si tu cuarto no está tratado. Aquí te decimos cómo empezar.
            </p>
            <button className="btn btn-sm" style={{ alignSelf: 'flex-start' }}>Leer Más</button>
          </div>
        </article>
      </div>

      <div style={{ marginTop: '5rem', border: 'var(--border-width) solid var(--accent)', padding: '4rem', textAlign: 'center', background: 'var(--surface)' }}>
        <h3 style={{ marginBottom: '1rem' }}>Únete al Collective</h3>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>
          Recibe descuentos exclusivos en muebles y guías de producción semanalmente.
        </p>
        <form className="newsletter-form" style={{ display: 'flex', maxWidth: '600px', margin: '0 auto', gap: '1rem' }} onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="TU EMAIL" style={{ marginBottom: 0, flex: 1 }} />
          <button className="btn btn-accent" style={{ whiteSpace: 'nowrap' }}>Suscribirme</button>
        </form>
      </div>
    </section>
  )
}
