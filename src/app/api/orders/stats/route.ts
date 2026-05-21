import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { authenticate } from '@/lib/auth-guard'

export async function GET(request: NextRequest) {
  const { errorResponse } = await authenticate(request)
  if (errorResponse) return errorResponse

  const [totalOrders, paidOrders, productsResult] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { not: 'pending' } },
    }),
    prisma.orderItem.aggregate({
      _sum: { quantity: true },
    }),
  ])

  const recentOrders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  const revenue = paidOrders._sum.total ?? 0
  const productsSold = productsResult._sum.quantity ?? 0

  return NextResponse.json({
    totalOrders,
    revenue,
    productsSold,
    recentOrders,
  })
}
