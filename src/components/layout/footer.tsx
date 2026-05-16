export default function Footer() {
  return (
    <>
      <footer>
        <div>
          <div className="logo" style={{ marginBottom: '2rem', fontSize: '2rem' }}>GDL.</div>
          <p style={{ fontSize: '0.75rem', color: 'var(--muted)', maxWidth: '280px', lineHeight: 1.7 }}>
            Diseño y fabricación de equipamiento profesional para DJ. Servicios de producción musical y eventos de alto impacto.
          </p>
          <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem' }}>
            {['INSTAGRAM', 'YOUTUBE', 'TIKTOK'].map(s => (
              <a
                key={s}
                href="#"
                style={{ color: 'var(--muted)', fontSize: '0.65rem', letterSpacing: '0.15em', textDecoration: 'none' }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4>Navegación</h4>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#muebles">Catálogo</a></li>
            <li><a href="#specs">Especificaciones</a></li>
            <li><a href="#servicios">Servicios</a></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Términos</a></li>
            <li><a href="#">Privacidad</a></li>
            <li><a href="#">Cookies</a></li>
            <li><a href="#">Envíos</a></li>
          </ul>
        </div>
        <div>
          <h4>Contacto</h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--fg-dim, var(--fg))', marginBottom: '1rem' }}>soporte@gdlprod.mx</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>+52 (55) 4433 2211</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '1.5rem' }}>
            <span style={{ color: 'var(--accent)', fontSize: '0.6rem', letterSpacing: '0.15em', display: 'block', marginBottom: '0.5rem' }}>UBICACIÓN</span>
            Showroom CDMX
          </p>
        </div>
      </footer>
      <div style={{
        padding: '1.5rem',
        textAlign: 'center',
        borderTop: 'var(--border-width) solid var(--border)',
        fontSize: '0.55rem',
        color: 'var(--muted)',
        letterSpacing: '0.05em',
        background: 'var(--surface)',
      }}>
        &copy; 2026 GDL PRODUCCIÓN & MÚSICA. TODOS LOS DERECHOS RESERVADOS. &mdash; <a href="/admin" style={{color: 'var(--muted)'}}>Admin</a>
      </div>
    </>
  )
}
