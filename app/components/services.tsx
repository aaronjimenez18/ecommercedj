export default function Services({ onBookingOpen }: { onBookingOpen: (base: number, name: string) => void }) {
  return (
    <section id="servicios" style={{ padding: 0 }}>
      <div className="services-split">
        <div className="service-panel">
          <span className="kicker">Standard Set</span>
          <h3>Servicio DJ Profesional</h3>
          <span className="price" style={{ fontSize: '3.5rem' }}>
            $5,500 <small style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>/ 5H</small>
          </span>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
            Curaduría musical experta para eventos privados, lanzamientos y corporativos.
          </p>
          <ul className="service-list">
            <li>DJ con 10+ años de experiencia</li>
            <li>Sistema de audio (hasta 100 personas)</li>
            <li>Cabina de DJ estética (Brutal Series)</li>
            <li>Micrófono inalámbrico profesional</li>
          </ul>
          <button className="btn btn-accent" onClick={() => onBookingOpen(5500, 'DJ Estándar')}>
            Reservar Ahora
          </button>
        </div>

        <div className="service-panel">
          <span className="tag">RECOMENDADO</span>
          <span className="kicker">Full Experience</span>
          <h3>Servicio Premium Gear</h3>
          <span className="price" style={{ fontSize: '3.5rem' }}>
            $7,500 <small style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>/ 5H</small>
          </span>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
            Producción audiovisual completa. Transformamos cualquier espacio en un club de primer nivel.
          </p>
          <ul className="service-list">
            <li>DJ + Staff de Soporte Técnico</li>
            <li>Audio Reforzado (hasta 250 personas)</li>
            <li>Diseño de Iluminación Robótica & Láser</li>
            <li>Máquina de Humo y Efectos Especiales</li>
            <li>Pirotecnia Fría Controlada</li>
          </ul>
          <button className="btn btn-accent" onClick={() => onBookingOpen(7500, 'Servicio Premium')}>
            Mejorar Experiencia
          </button>
        </div>
      </div>
    </section>
  )
}
