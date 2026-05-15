export default function Testimonials() {
  const testimonials = [
    {
      stars: '★★★★★',
      text: '"La Alpha Console es una obra de arte. Mi flujo de trabajo mejoró un 200% desde que la instalé."',
      author: '— Carlos R., Productor',
    },
    {
      stars: '★★★★★',
      text: '"Contratamos el set Premium para nuestra boda corporativa y los invitados no dejaron de bailar. Increíble producción."',
      author: '— Ana L., Event Planner',
    },
    {
      stars: '★★★★★',
      text: '"El envío a CDMX fue súper rápido y el armado de la mesa fue muy intuitivo. Recomendados al 100%."',
      author: '— DJ Sombra',
    },
  ]

  return (
    <section id="testimonios">
      <div className="section-header">
        <div>
          <span className="kicker">Social Proof</span>
          <h2>Lo que dicen de GDL</h2>
        </div>
        <div className="google-rating">
          <span style={{ color: 'var(--accent)' }}>GOOGLE RATING:</span>{' '}
          <span style={{ color: 'var(--fg)' }}>5.0</span>{' '}
          <span style={{ color: 'var(--accent)', letterSpacing: '2px' }}>★★★★★</span>
        </div>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial-card">
            <div style={{ color: 'var(--accent)', marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '3px' }}>{t.stars}</div>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              marginBottom: '2rem',
              lineHeight: 1.3,
              fontStyle: 'italic',
              color: 'var(--fg-dim, var(--fg))',
            }}>
              {t.text}
            </p>
            <span style={{
              fontSize: '0.7rem',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              {t.author}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
