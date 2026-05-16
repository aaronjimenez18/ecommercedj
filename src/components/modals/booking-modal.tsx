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

  const extraHours = Math.max(0, hours - 5)
  const total = serviceBase + extraHours * 1200

  return (
    <div className={`modal ${open ? 'active' : ''}`}>
      <div className="modal-inner">
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: 'var(--fg)', cursor: 'pointer' }}
        >
          [CERRAR]
        </button>
        <span className="kicker">{serviceName}</span>
        <h2 style={{ fontSize: '3rem', marginBottom: '2.5rem' }}>RESERVAR FECHA</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            alert('Reserva enviada con éxito. Redirigiendo a pasarela de pago para el anticipo ($1,500).')
            onClose()
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input type="text" placeholder="NOMBRE COMPLETO" required style={{ gridColumn: 'span 2' }} />
            <input type="email" placeholder="EMAIL" required />
            <input type="tel" placeholder="TELÉFONO" required />
            <input type="date" required id="event-date" />
            <select id="event-type">
              <option value="interior">EVENTO INTERIOR</option>
              <option value="exterior">EVENTO EXTERIOR</option>
            </select>
            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>DURACIÓN (HORAS):</label>
              <input
                type="number"
                value={hours}
                min={5}
                max={12}
                onChange={(e) => setHours(parseInt(e.target.value) || 5)}
                style={{ width: '80px', marginBottom: 0 }}
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--accent)' }}>+ $1,200 POR HORA EXTRA</span>
            </div>
          </div>

          <div style={{ background: 'var(--surface)', padding: '2rem', border: 'var(--border-width) solid var(--accent)', margin: '1.5rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>ESTIMADO TOTAL:</span>
              <span className="price">${total.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--accent)' }}>
              <span>ANTICIPO REQUERIDO:</span>
              <span>$1,500</span>
            </div>
          </div>

          <button type="submit" className="btn btn-accent" style={{ width: '100%' }}>PAGAR ANTICIPO Y CONFIRMAR</button>
        </form>
      </div>
    </div>
  )
}
