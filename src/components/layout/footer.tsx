export default function Footer() {
  return (
    <>
      <footer>
        <div>
          <div className="logo" style={{ marginBottom: 'var(--space-lg)', fontSize: '2rem' }}>GDL.</div>
          <p className="footer-desc">
            Diseño y fabricación de equipamiento profesional para DJ. Servicios de producción musical y eventos de alto impacto.
          </p>
          <div className="footer-social">
            {['INSTAGRAM', 'YOUTUBE', 'TIKTOK'].map(s => (
              <a key={s} href="#">{s}</a>
            ))}
          </div>
        </div>
        <div>
          <h4>Navegación</h4>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#muebles">Catálogo</a></li>
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
          <p className="footer-contact">soporte@gdlprod.mx</p>
          <p className="footer-phone">+52 (55) 4433 2211</p>
          <p className="footer-location">
            <span className="footer-location-label">UBICACIÓN</span>
            Showroom CDMX
          </p>
        </div>
      </footer>
      <div className="footer-bottom">
        &copy; 2026 GDL PRODUCCIÓN & MÚSICA. TODOS LOS DERECHOS RESERVADOS. <a href="/admin">Admin</a>
      </div>
    </>
  )
}
