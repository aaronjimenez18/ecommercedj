import { prisma } from './prisma'
import type { Product } from '@/types'

function toProduct(row: {
  id: number
  name: string
  desc: string
  price: number
  category: string
  tag: string | null
  amazon: boolean
  img: string
  stock: number
}): Product {
  return {
    id: String(row.id),
    name: row.name,
    desc: row.desc,
    price: row.price,
    category: row.category,
    tag: row.tag,
    amazon: row.amazon,
    img: row.img,
    stock: row.stock,
  }
}

export async function getProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({ orderBy: { id: 'asc' } })
  return rows.map(toProduct)
}

export async function getProduct(id: string): Promise<Product | undefined> {
  const row = await prisma.product.findUnique({ where: { id: Number(id) } })
  return row ? toProduct(row) : undefined
}

export async function createProduct(data: Omit<Product, 'id'>): Promise<Product> {
  const row = await prisma.product.create({
    data: {
      name: data.name,
      desc: data.desc,
      price: data.price,
      category: data.category,
      tag: data.tag,
      img: data.img,
      amazon: data.amazon,
      stock: data.stock || 0,
    },
  })
  return toProduct(row)
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, 'id'>>
): Promise<Product | undefined> {
  try {
    const row = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.desc !== undefined && { desc: data.desc }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.tag !== undefined && { tag: data.tag }),
        ...(data.img !== undefined && { img: data.img }),
        ...(data.amazon !== undefined && { amazon: data.amazon }),
        ...(data.stock !== undefined && { stock: data.stock }),
      },
    })
    return toProduct(row)
  } catch {
    return undefined
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    await prisma.product.delete({ where: { id: Number(id) } })
    return true
  } catch {
    return false
  }
}
