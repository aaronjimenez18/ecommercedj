export default function Footer() {
  return (
    <>
      <footer>
        <div>
          <div className="logo" style={{ marginBottom: '2rem' }}>GDL.</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)', maxWidth: '300px', lineHeight: 1.6 }}>
            Diseño y fabricación de equipamiento profesional para DJ. Servicios de producción musical y eventos de alto impacto.
          </p>
          <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem' }}>
            <a href="https://www.instagram.com/">INSTAGRAM</a>
            <a href="https://www.youtube.com/">YOUTUBE</a>
            <a href="https://www.tiktok.com/">TIKTOK</a>
          </div>
        </div>
        <div>
          <h4>Navegación</h4>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#muebles">Catálogo</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Términos y Condiciones</a></li>
            <li><a href="#">Política de Privacidad</a></li>
            <li><a href="#">Cookies</a></li>
            <li><a href="#">Envíos y Devoluciones</a></li>
          </ul>
        </div>
        <div>
          <h4>Soporte</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '1rem' }}>soporte@gdlprod.mx</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>+52 (55) 4433 2211</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '1rem' }}>Showroom: CDMX (Cita previa)</p>
        </div>
      </footer>
      <div style={{ padding: '2rem', textAlign: 'center', borderTop: 'var(--border-width) solid var(--border)', fontSize: '0.6rem', color: 'var(--muted)' }}>
        &copy; 2026 GDL PRODUCCIÓN & MÚSICA. TODOS LOS DERECHOS RESERVADOS. &mdash; <a href="/admin" style={{color: 'var(--muted)'}}>Admin</a>
      </div>
    </>
  )
}
