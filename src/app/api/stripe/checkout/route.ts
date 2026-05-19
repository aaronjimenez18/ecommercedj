import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/server'
import { zones } from '@/lib/shipping'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { items } = body as { items: { id: string; name: string; price: number }[] }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Carrito vacío' }, { status: 400 })
    }

    const grouped = items.reduce<Record<string, { name: string; price: number; qty: number }>>((acc, item) => {
      if (acc[item.id]) {
        acc[item.id].qty++
      } else {
        acc[item.id] = { name: item.name, price: item.price, qty: 1 }
      }
      return acc
    }, {})

    const origin = request.headers.get('origin') ?? 'http://localhost:3000'

    const metadataItems = Object.entries(grouped).map(([id, item]) => ({
      id,
      name: item.name,
      price: item.price,
      qty: item.qty,
    }))

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'oxxo'],
      payment_method_options: {
        oxxo: {
          expires_after_days: 3,
        },
      },
      shipping_address_collection: { allowed_countries: ['MX'] },
      shipping_options: zones.map((zone) => ({
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: zone.cost * 100, currency: 'mxn' },
          display_name: `Envío ${zone.name}`,
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 3 },
            maximum: { unit: 'business_day', value: 7 },
          },
        },
      })),
      line_items: Object.values(grouped).map((item) => ({
        price_data: {
          currency: 'mxn',
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.qty,
      })),
      metadata: {
        items: JSON.stringify(metadataItems),
      },
      success_url: `${origin}/pago/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pago/cancelado`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json({ error: 'Error al crear sesión de pago' }, { status: 500 })
  }
}
