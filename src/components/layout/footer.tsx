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
            <a href="#" aria-label="Instagram" className="social-instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="social-youtube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="#" aria-label="TikTok" className="social-tiktok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4h5"/>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li><a href="/terminos">Términos</a></li>
            <li><a href="/privacidad">Privacidad</a></li>
            <li><a href="/cookies">Cookies</a></li>
          </ul>
        </div>
        <div>
          <h4>Contacto</h4>
          <p className="footer-contact">soporte@gdlprod.mx</p>
          <p className="footer-location">
            <span className="footer-location-label">UBICACIÓN</span>
            Querétaro y Guadalajara
          </p>
        </div>
      </footer>
      <div className="footer-bottom">
      TODOS LOS DERECHOS RESERVADOS | DEVELOPED BY <a href="https://aaronjimenez.netlify.app/">Aaron</a>
      </div>
    </>
  )
}