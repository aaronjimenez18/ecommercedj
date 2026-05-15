export default function Testimonials() {
  const testimonials = [
    {
      stars: '⭐⭐⭐⭐⭐',
      text: '"La Alpha Console es una obra de arte. Mi flujo de trabajo mejoró un 200% desde que la instalé."',
      author: '— Carlos R., Productor',
    },
    {
      stars: '⭐⭐⭐⭐⭐',
      text: '"Contratamos el set Premium para nuestra boda corporativa y los invitados no dejaron de bailar. Increíble producción."',
      author: '— Ana L., Event Planner',
    },
    {
      stars: '⭐⭐⭐⭐⭐',
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
        <div style={{ fontSize: '0.8rem' }}>GOOGLE RATING: 5.0 ⭐⭐⭐⭐⭐</div>
      </div>

      <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{ border: 'var(--border-width) solid var(--border)', padding: '3rem' }}>
            <div style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>{t.stars}</div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '2rem', lineHeight: 1.2 }}>
              {t.text}
            </p>
            <span style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase' }}>{t.author}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
