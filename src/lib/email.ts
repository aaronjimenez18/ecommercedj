import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || '')

const FROM = process.env.FROM_EMAIL || ''

function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function itemsHtml(items: { name: string; price: number; quantity: number }[]) {
  return items
    .map(
      (i) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(i.name)}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center">${i.quantity}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">$${i.price.toLocaleString()}.00</td>
        </tr>`
    )
    .join('')
}

export async function sendOrderConfirmation({
  email,
  items,
  total,
  shipping,
}: {
  email: string
  items: { name: string; price: number; quantity: number }[]
  total: number
  shipping: number
}) {
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: 'Confirmación de compra — GDL',
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px">
          <h1 style="font-size:1.5rem;margin-bottom:8px">¡Gracias por tu compra!</h1>
          <p style="color:#666;margin-bottom:24px">Hemos recibido tu pago correctamente.</p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <thead>
              <tr style="background:#f5f5f5;font-size:0.85rem">
                <th style="padding:8px;text-align:left">Producto</th>
                <th style="padding:8px;text-align:center">Cant</th>
                <th style="padding:8px;text-align:right">Total</th>
              </tr>
            </thead>
            <tbody>${itemsHtml(items)}</tbody>
          </table>
          ${shipping > 0 ? `<p style="color:#666;margin-bottom:4px">Envío: <strong>$${shipping.toLocaleString()}.00</strong></p>` : ''}
          <p style="font-size:1.2rem;margin-bottom:24px">Total pagado: <strong>$${total.toLocaleString()}.00</strong></p>
          <p style="color:#999;font-size:0.85rem;border-top:1px solid #eee;padding-top:16px">
            GDL | Producción, Música y DJ
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Error sending confirmation email:', error)
  }
}

export async function sendOrderStatusUpdate({
  email,
  orderId,
  status,
  tracking,
  items,
  total,
}: {
  email: string
  orderId: number
  status: string
  tracking?: string | null
  items: { name: string; price: number; quantity: number }[]
  total: number
}) {
  const statusLabels: Record<string, string> = {
    pending: 'Pendiente',
    paid: 'Pagado',
    shipped: 'Enviado',
    delivered: 'Entregado',
    cancelled: 'Cancelado',
  }

  const subject =
    status === 'shipped'
      ? 'Tu pedido ha sido enviado — GDL'
      : status === 'delivered'
        ? 'Tu pedido ha sido entregado — GDL'
        : status === 'cancelled'
          ? 'Tu pedido ha sido cancelado — GDL'
          : `Actualización de tu pedido #${orderId} — GDL`

  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px">
          <h1 style="font-size:1.5rem;margin-bottom:8px">Actualización de tu pedido</h1>
          <p style="color:#666;margin-bottom:24px">
            Tu pedido <strong>#${orderId}</strong> ha cambiado a: 
            <strong style="color:${status === 'cancelled' ? '#e53e3e' : '#3bce7f'}">${statusLabels[status] || status}</strong>
          </p>
          ${tracking ? `<p style="margin-bottom:24px">Número de rastreo: <strong>${tracking}</strong></p>` : ''}
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <thead>
              <tr style="background:#f5f5f5;font-size:0.85rem">
                <th style="padding:8px;text-align:left">Producto</th>
                <th style="padding:8px;text-align:center">Cant</th>
                <th style="padding:8px;text-align:right">Total</th>
              </tr>
            </thead>
            <tbody>${itemsHtml(items)}</tbody>
          </table>
          <p style="font-size:1.2rem;margin-bottom:24px">Total: <strong>$${total.toLocaleString()}.00</strong></p>
          <p style="color:#999;font-size:0.85rem;border-top:1px solid #eee;padding-top:16px">
            GDL | Producción, Música y DJ
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Error sending status email:', error)
  }
}
