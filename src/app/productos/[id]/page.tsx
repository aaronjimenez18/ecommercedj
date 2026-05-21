import { prisma } from '@/lib/db/prisma'
import type { Metadata } from 'next'
import ProductClient from './product-client'
import type { Product } from '@/types'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const product = await prisma.product.findUnique({ where: { id: Number(id) } })
  if (!product) return { title: 'Producto no encontrado' }

  return {
    title: product.name,
    description: product.desc,
    openGraph: {
      title: product.name,
      description: product.desc,
      images: product.img ? [{ url: product.img }] : [],
    },
    alternates: { canonical: `/productos/${id}` },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await prisma.product.findUnique({ where: { id: Number(id) } })

  return <ProductClient product={product as Product | null} />
}
