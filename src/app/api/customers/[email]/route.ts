import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { authenticate } from '@/lib/auth-guard'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  const { errorResponse } = await authenticate(request)
  if (errorResponse) return errorResponse

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
