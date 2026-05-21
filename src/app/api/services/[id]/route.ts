import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { authenticate } from '@/lib/auth-guard'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const service = await prisma.service.findUnique({ where: { id: Number(id) } })
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(service)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { errorResponse } = await authenticate(request)
  if (errorResponse) return errorResponse

  const { id } = await params
  try {
    const body = await request.json()
    const service = await prisma.service.update({
      where: { id: Number(id) },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        features: JSON.stringify(body.features || []),
        highlighted: body.highlighted,
      },
    })
    return NextResponse.json(service)
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { errorResponse } = await authenticate(request)
  if (errorResponse) return errorResponse

  const { id } = await params
  try {
    await prisma.service.delete({ where: { id: Number(id) } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
