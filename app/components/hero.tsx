export default function Hero() {
  return (
    <section className="hero" id="inicio"
      style={{
        minHeight: '85vh',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        padding: 0,
        overflow: 'hidden',
      }}
    >
      <div
        className="hero-content"
        style={{
          padding: '6rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRight: 'var(--border-width) solid var(--border)',
        }}
      >
        <span className="kicker">Nightlife &bull; Production &bull; Gear</span>
        <h1>Música que<br />Se Siente.</h1>
        <p style={{ margin: '2.5rem 0', color: 'var(--muted)', maxWidth: '450px', fontSize: '0.95rem' }}>
          Plataforma integral para DJ/Productores. Fabricamos muebles especializados y curamos experiencias sonoras inolvidables.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a href="#muebles" className="btn btn-accent">Ver Catálogo</a>
          <a href="#servicios" className="btn">Contratar DJ</a>
          <a
            href="https://amazon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{ borderColor: '#FF9900', color: '#FF9900' }}
          >
            Amazon Store
          </a>
        </div>
      </div>
      <div
        className="hero-visual"
        style={{
          background: 'var(--surface)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?q=80&w=1200"
          alt="DJ Set"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, filter: 'grayscale(1)' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '2rem',
            background: 'var(--accent)',
            color: 'var(--bg)',
            padding: '0.5rem 1rem',
            fontSize: '0.7rem',
          }}
        >
          LIVE NOW: CDMX SESSION
        </div>
      </div>
    </section>
  )
}
