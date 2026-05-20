import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()
    const order = await prisma.order.update({
      where: { id: Number(id) },
      data: {
        status: body.status ?? undefined,
        tracking: body.tracking ?? undefined,
        customerName: body.customerName ?? undefined,
        customerPhone: body.customerPhone ?? undefined,
        shippingAddress: body.shippingAddress ?? undefined,
      },
    })
    return NextResponse.json(order)
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
