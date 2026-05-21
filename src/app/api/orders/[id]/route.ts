import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { sendOrderStatusUpdate } from '@/lib/email'
import { authenticate } from '@/lib/auth-guard'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { errorResponse } = await authenticate(request)
  if (errorResponse) return errorResponse

  const { id } = await params
  try {
    const body = await request.json()

    const current = await prisma.order.findUnique({
      where: { id: Number(id) },
      include: { items: true },
    })
    if (!current) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

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

    if (
      body.status &&
      body.status !== current.status &&
      current.email
    ) {
      await sendOrderStatusUpdate({
        email: current.email,
        orderId: current.id,
        status: body.status,
        tracking: body.tracking ?? current.tracking,
        items: current.items.map(i => ({
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        total: current.total,
      })
    }

    return NextResponse.json(order)
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
