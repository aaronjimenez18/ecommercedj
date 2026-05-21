import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { authenticate } from '@/lib/auth-guard'

export async function GET(request: NextRequest) {
  const { errorResponse } = await authenticate(request)
  if (errorResponse) return errorResponse

  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(orders)
}
