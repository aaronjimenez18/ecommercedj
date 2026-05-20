import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { bookingId, serviceName, total, deposit } = body

    if (!bookingId || !serviceName) {
      return NextResponse.json({ error: 'Faltan datos de la reserva' }, { status: 400 })
    }

    const origin = request.headers.get('origin') ?? 'http://localhost:3000'

    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'oxxo'],
      payment_method_options: {
        oxxo: { expires_after_days: 3 },
      },
      line_items: [
        {
          price_data: {
            currency: 'mxn',
            product_data: {
              name: `Anticipo: ${serviceName}`,
              description: `Anticipo para reserva #${bookingId} - Saldo pendiente: $${(total - deposit).toLocaleString()}`,
            },
            unit_amount: Math.round(deposit * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: 'service_booking',
        bookingId: String(bookingId),
        serviceName,
      },
      success_url: `${origin}/pago/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pago/cancelado`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating service checkout:', error)
    return NextResponse.json({ error: 'Error al crear sesión de pago' }, { status: 500 })
  }
}
