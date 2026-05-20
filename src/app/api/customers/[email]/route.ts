import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ email: string }> }
) {
  const { email } = await params
  const decodedEmail = decodeURIComponent(email)

  const [orders, bookings] = await Promise.all([
    prisma.order.findMany({
      where: { email: decodedEmail },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.booking.findMany({
      where: { email: decodedEmail },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  return NextResponse.json({ email: decodedEmail, orders, bookings })
}
