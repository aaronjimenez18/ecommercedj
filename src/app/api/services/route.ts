import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { authenticate } from '@/lib/auth-guard'

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(services)
}

export async function POST(request: NextRequest) {
  const { errorResponse } = await authenticate(request)
  if (errorResponse) return errorResponse

  try {
    const body = await request.json()
    const service = await prisma.service.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        features: JSON.stringify(body.features || []),
        highlighted: body.highlighted ?? false,
      },
    })
    return NextResponse.json(service, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }
}
