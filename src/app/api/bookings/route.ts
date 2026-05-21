import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { authenticate } from '@/lib/auth-guard'
import { rateLimit } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  const { errorResponse } = await authenticate(request)
  if (errorResponse) return errorResponse

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(bookings)
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const { allowed, errorResponse } = rateLimit(`booking:${ip}`, { max: 5, windowMs: 60 * 60 * 1000 })
  if (!allowed) return errorResponse

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
    return NextResponse.json({ error: 'Error al crear la reserva' }, { status: 400 })
  }
}
