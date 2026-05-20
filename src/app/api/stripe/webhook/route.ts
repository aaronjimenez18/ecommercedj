import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe/server'
import { prisma } from '@/lib/db/prisma'
import { sendOrderConfirmation } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const sig = request.headers.get('stripe-signature')

    if (!sig) {
      return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
    }

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!endpointSecret) {
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
    }

    const event = getStripe().webhooks.constructEvent(body, sig, endpointSecret)

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object

        const metadataItems = pi.metadata?.items
        if (!metadataItems) {
          console.log('No items metadata in payment intent', pi.id)
          break
        }

        const items: { id: string; name: string; price: number; qty: number }[] = JSON.parse(metadataItems)
        const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
        const shipping = Number(pi.metadata.shipping ?? 0)
        const total = subtotal + shipping

        await prisma.order.create({
          data: {
            stripeId: pi.id,
            email: pi.receipt_email,
            total,
            status: 'paid',
            items: {
              create: items.map((i) => ({
                name: i.name,
                price: i.price,
                quantity: i.qty,
              })),
            },
          },
        })

        if (pi.receipt_email) {
          await sendOrderConfirmation({
            email: pi.receipt_email,
            items: items.map((i) => ({ name: i.name, price: i.price, quantity: i.qty })),
            total,
            shipping,
          })
        }

        console.log('Order created for payment intent:', pi.id)
        break
      }
      case 'checkout.session.completed': {
        const session = event.data.object

        // Service booking payment
        if (session.metadata?.type === 'service_booking') {
          const bookingId = Number(session.metadata.bookingId)
          if (bookingId) {
            await prisma.booking.update({
              where: { id: bookingId },
              data: { status: 'confirmed' },
            })
            console.log('Booking confirmed:', bookingId)
          }
          break
        }

        // Product order
        const metadataItems = session.metadata?.items
        if (!metadataItems) {
          console.log('No items metadata in session', session.id)
          break
        }

        const items: { id: string; name: string; price: number; qty: number }[] = JSON.parse(metadataItems)
        const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

        let shippingTotal = 0
        if (session.shipping_cost?.amount_subtotal) {
          shippingTotal = session.shipping_cost.amount_subtotal / 100
        }

        await prisma.order.create({
          data: {
            stripeId: session.id,
            email: session.customer_details?.email,
            total: total + shippingTotal,
            status: 'paid',
            items: {
              create: items.map((i) => ({
                name: i.name,
                price: i.price,
                quantity: i.qty,
              })),
            },
          },
        })

        if (session.customer_details?.email) {
          await sendOrderConfirmation({
            email: session.customer_details.email,
            items: items.map((i) => ({ name: i.name, price: i.price, quantity: i.qty })),
            total: total + shippingTotal,
            shipping: shippingTotal,
          })
        }

        console.log('Order created for session:', session.id)
        break
      }
      case 'checkout.session.expired': {
        const session = event.data.object
        console.log('Checkout expired:', session.id)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }
}
