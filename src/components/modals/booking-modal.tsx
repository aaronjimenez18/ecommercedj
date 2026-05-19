'use client'

import { useState } from 'react'

export default function BookingModal({
  open,
  serviceBase,
  serviceName,
  onClose,
}: {
  open: boolean
  serviceBase: number
  serviceName: string
  onClose: () => void
}) {
  const [hours, setHours] = useState(5)
  const [submitted, setSubmitted] = useState(false)

  const extraHours = Math.max(0, hours - 5)
  const total = serviceBase + extraHours * 1200

  if (submitted) {
    return (
      <div className={`modal ${open ? 'active' : ''}`}>
        <div className="modal-inner" style={{ textAlign: 'center' }}>
          <button onClick={onClose} className="modal-close">
            [CERRAR]
          </button>
          <span className="kicker">SOLICITUD ENVIADA</span>
          <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-lg)' }}>RESERVA CONFIRMADA</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '45ch', margin: '0 auto var(--space-lg)', lineHeight: 1.7 }}>
            Redirigiendo a pasarela de pago para el anticipo de $1,500.
          </p>
          <button className="btn" onClick={onClose}>CERRAR</button>
        </div>
      </div>
    )
  }

  return (
    <div className={`modal ${open ? 'active' : ''}`}>
      <div className="modal-inner">
        <button onClick={onClose} className="modal-close">
          [CERRAR]
        </button>
        <span className="kicker">{serviceName}</span>
        <h2>RESERVAR FECHA</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
          }}
        >
          <div className="booking-grid">
            <input type="text" placeholder="NOMBRE COMPLETO" required className="span-2" />
            <input type="email" placeholder="EMAIL" required />
            <input type="tel" placeholder="TELÉFONO" required />
            <input type="date" required id="event-date" />
            <select id="event-type">
              <option value="interior">EVENTO INTERIOR</option>
              <option value="exterior">EVENTO EXTERIOR</option>
            </select>
            <div className="booking-hours">
              <label>DURACIÓN (HORAS):</label>
              <input
                type="number"
                value={hours}
                min={5}
                max={12}
                onChange={(e) => setHours(parseInt(e.target.value) || 5)}
              />
              <span>+ $1,200 POR HORA EXTRA</span>
            </div>
          </div>

          <div className="booking-total">
            <div className="booking-total-row">
              <span>ESTIMADO TOTAL:</span>
              <span className="price">${total.toLocaleString()}</span>
            </div>
            <div className="booking-total-row">
              <span>ANTICIPO REQUERIDO:</span>
              <span>$1,500</span>
            </div>
          </div>

          <button type="submit" className="btn btn-accent btn-full">PAGAR ANTICIPO Y CONFIRMAR</button>
        </form>
      </div>
    </div>
  )
}
