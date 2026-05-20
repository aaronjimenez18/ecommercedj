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
  const modalRef = useRef<HTMLDivElement>(null)

  const extraHours = Math.max(0, hours - 5)
  const total = serviceBase + extraHours * 1200

  useEffect(() => {
    if (!open) return
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

        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
          }}
        >
          <div className="booking-grid">
            <input type="text" placeholder="NOMBRE COMPLETO" required className="span-2" aria-label="Nombre completo" />
            <input type="email" placeholder="EMAIL" required aria-label="Correo electrónico" />
            <input type="tel" placeholder="TELÉFONO" required aria-label="Teléfono" />
            <input type="date" required id="event-date" aria-label="Fecha del evento" />
            <select id="event-type" aria-label="Tipo de evento">
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
