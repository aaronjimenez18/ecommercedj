'use client'

import { useState } from 'react'

const faqs = [
  { q: '¿Cuál es el tiempo de entrega de muebles?', a: 'Fabricamos sobre pedido para asegurar la máxima calidad. El tiempo estimado es de 10 a 15 días hábiles dentro de México.' },
  { q: '¿Los servicios de DJ incluyen viáticos?', a: 'Dentro de CDMX y Área Metropolitana los viáticos están incluidos. Para eventos foráneos se cotiza por separado.' },
  { q: '¿Qué garantía tienen los productos?', a: 'Todos nuestros muebles cuentan con 1 año de garantía contra defectos de fabricación y herrajes.' },
  { q: '¿Aceptan pagos internacionales?', a: 'Sí, aceptamos tarjetas internacionales a través de PayPal y Stripe, además de Mercado Pago y transferencias locales.' },
]

export default function FAQ() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="section-header">
        <div>
          <span className="kicker">Help Center</span>
          <h2>Preguntas Frecuentes</h2>
        </div>
      </div>

      <div className="faq-list">
        {faqs.map((faq, i) => (
          <div key={i} className={`faq-item ${active === i ? 'active' : ''}`}>
            <div className="faq-q" onClick={() => setActive(active === i ? null : i)}>
              <span>{faq.q}</span>
              <span className="icon">+</span>
            </div>
            <div className="faq-a">{faq.a}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
