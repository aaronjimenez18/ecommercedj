import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getProducts, createProduct } from '@/lib/db/products'
import { authenticate } from '@/lib/auth-guard'

export async function GET() {
  const products = await getProducts()
  return NextResponse.json(products)
}

export async function POST(request: NextRequest) {
  const { errorResponse } = await authenticate(request)
  if (errorResponse) return errorResponse

  try {
    const body = await request.json()
    const product = await createProduct(body)
    return NextResponse.json(product, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid product data' }, { status: 400 })
  }
}
