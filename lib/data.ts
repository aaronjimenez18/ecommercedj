import { promises as fs } from 'fs'
import path from 'path'

export interface Product {
  id: string
  name: string
  desc: string
  price: number
  category: string
  tag: string | null
  amazon: boolean
  img: string
}

const dataFile = path.join(process.cwd(), 'data', 'products.json')

export async function getProducts(): Promise<Product[]> {
  const raw = await fs.readFile(dataFile, 'utf-8')
  return JSON.parse(raw)
}

export async function getProduct(id: string): Promise<Product | undefined> {
  const products = await getProducts()
  return products.find(p => p.id === id)
}

export async function createProduct(data: Omit<Product, 'id'>): Promise<Product> {
  const products = await getProducts()
  const id = String(Date.now())
  const product: Product = { id, ...data }
  products.push(product)
  await fs.writeFile(dataFile, JSON.stringify(products, null, 2))
  return product
}

export async function updateProduct(id: string, data: Partial<Omit<Product, 'id'>>): Promise<Product | undefined> {
  const products = await getProducts()
  const idx = products.findIndex(p => p.id === id)
  if (idx === -1) return undefined
  products[idx] = { ...products[idx], ...data }
  await fs.writeFile(dataFile, JSON.stringify(products, null, 2))
  return products[idx]
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await getProducts()
  const filtered = products.filter(p => p.id !== id)
  if (filtered.length === products.length) return false
  await fs.writeFile(dataFile, JSON.stringify(filtered, null, 2))
  return true
}
