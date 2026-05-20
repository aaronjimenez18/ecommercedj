'use client'

import { useState, useRef, useEffect } from 'react'

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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventType, setEventType] = useState('interior')

  const deposit = 1500
  const extraHours = Math.max(0, hours - 5)
  const total = serviceBase + extraHours * 1200

  useEffect(() => {
    if (!open) return
    setSubmitted(false)
    setError('')
    setLoading(false)
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>('button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKey)
    const timer = setTimeout(() => {
      const first = modalRef.current?.querySelector<HTMLElement>('button, input, select, textarea')
      first?.focus()
    }, 50)
    return () => {
      document.removeEventListener('keydown', handleKey)
      clearTimeout(timer)
    }
  }, [open, onClose])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!name || !email || !phone || !eventDate) {
      setError('Completa todos los campos requeridos')
      return
    }

    setLoading(true)

    try {
      const payload = { name, email, phone, eventDate, eventType, hours, total, message: '' }
      const bookingRes = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!bookingRes.ok) {
        const err = await bookingRes.json()
        throw new Error(err.error || 'Error al crear reserva')
      }

      const booking = await bookingRes.json()

      const checkoutRes = await fetch('/api/services/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: booking.id,
          serviceName,
          total,
          deposit,
        }),
      })

      if (!checkoutRes.ok) {
        throw new Error('Error al crear sesión de pago')
      }

      const { url } = await checkoutRes.json()
      window.location.href = url
    } catch (err: any) {
      setError(err.message || 'Error al procesar la reserva')
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className={`modal ${open ? 'active' : ''}`} role="dialog" aria-modal="true" aria-label="Reserva confirmada" ref={modalRef}>
        <div className="modal-inner" style={{ textAlign: 'center' }}>
          <button onClick={onClose} className="modal-close" aria-label="Cerrar modal">
            [CERRAR]
          </button>
          <span className="kicker">SOLICITUD ENVIADA</span>
          <h2 style={{ marginBottom: 'var(--space-lg)' }}>RESERVA CONFIRMADA</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '45ch', margin: '0 auto var(--space-lg)', lineHeight: 1.7 }}>
            Redirigiendo a pasarela de pago para el anticipo de $1,500.
          </p>
          <button className="btn" onClick={onClose}>CERRAR</button>
        </div>
      </div>
    )
  }

  return (
    <div className={`modal ${open ? 'active' : ''}`} role="dialog" aria-modal="true" aria-label="Formulario de reserva" ref={modalRef}>
      <div className="modal-inner">
        <button onClick={onClose} className="modal-close" aria-label="Cerrar modal">
          [CERRAR]
        </button>
        <span className="kicker">{serviceName}</span>
        <h2>RESERVAR FECHA</h2>

        <form onSubmit={handleSubmit}>
          <div className="booking-grid">
            <input type="text" placeholder="NOMBRE COMPLETO" required className="span-2"
              value={name} onChange={e => setName(e.target.value)} aria-label="Nombre completo" />
            <input type="email" placeholder="EMAIL" required
              value={email} onChange={e => setEmail(e.target.value)} aria-label="Correo electrónico" />
            <input type="tel" placeholder="TELÉFONO" required
              value={phone} onChange={e => setPhone(e.target.value)} aria-label="Teléfono" />
            <input type="date" required id="event-date"
              value={eventDate} onChange={e => setEventDate(e.target.value)} aria-label="Fecha del evento" />
            <select id="event-type" value={eventType} onChange={e => setEventType(e.target.value)} aria-label="Tipo de evento">
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
            <div className="booking-total-row">
              <span>RESTANTE (DÍA DEL EVENTO):</span>
              <span>${(total - deposit).toLocaleString()}</span>
            </div>
          </div>

          {error && <p style={{ color: 'var(--accent)', fontSize: '0.75rem', marginBottom: '1rem' }}>{error}</p>}

          <button type="submit" className="btn btn-accent btn-full" disabled={loading}>
            {loading ? 'PROCESANDO...' : 'PAGAR ANTICIPO Y CONFIRMAR'}
          </button>
        </form>
      </div>
    </div>
  )
}
