import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(bookings)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.name || !body.email || !body.phone || !body.eventDate) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const total = Number(body.total)
    if (isNaN(total)) {
      return NextResponse.json({ error: 'Total inválido' }, { status: 400 })
    }

    const booking = await prisma.booking.create({
      data: {
        name: String(body.name),
        email: String(body.email),
        phone: String(body.phone),
        eventDate: String(body.eventDate),
        eventType: String(body.eventType || 'interior'),
        hours: Number(body.hours) || 5,
        total,
        message: String(body.message || ''),
        status: 'pending',
      },
    })
    return NextResponse.json(booking, { status: 201 })
  } catch (e) {
    console.error('Booking creation error:', e)
    const message = e instanceof Error ? e.message : 'Error desconocido'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
