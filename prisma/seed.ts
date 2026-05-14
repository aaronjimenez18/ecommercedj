import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { promises as fs } from 'fs'
import path from 'path'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

interface SeedProduct {
  id: string
  name: string
  desc: string
  price: number
  category: string
  tag: string | null
  amazon: boolean
  img: string
}

async function main() {
  const raw = await fs.readFile(
    path.join(process.cwd(), 'data', 'products.json'),
    'utf-8'
  )
  const products: SeedProduct[] = JSON.parse(raw)

  for (const p of products) {
    await prisma.product.upsert({
      where: { id: Number(p.id) },
      update: {
        name: p.name,
        desc: p.desc,
        price: p.price,
        category: p.category,
        tag: p.tag,
        img: p.img,
        amazon: p.amazon,
      },
      create: {
        id: Number(p.id),
        name: p.name,
        desc: p.desc,
        price: p.price,
        category: p.category,
        tag: p.tag,
        img: p.img,
        amazon: p.amazon,
      },
    })
  }

  console.log(`Seeded ${products.length} products`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
