import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getProduct, updateProduct, deleteProduct } from '@/lib/db/products'
import { authenticate } from '@/lib/auth-guard'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const product = await getProduct(id)
  if (!product) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(product)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { errorResponse } = await authenticate(request)
  if (errorResponse) return errorResponse

  const { id } = await params
  const body = await request.json()
  const product = await updateProduct(id, body)
  if (!product) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(product)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { errorResponse } = await authenticate(request)
  if (errorResponse) return errorResponse

  const { id } = await params
  const deleted = await deleteProduct(id)
  if (!deleted) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}
