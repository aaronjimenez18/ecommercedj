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

  // Seed services
  const services = [
    {
      name: 'Standard Set',
      description: 'Servicio DJ Profesional',
      price: 5500,
      features: JSON.stringify([
        'DJ con 10+ años de experiencia',
        'Sistema de audio (hasta 100 personas)',
        'Cabina de DJ estética (Brutal Series)',
        'Micrófono inalámbrico profesional',
      ]),
      highlighted: false,
    },
    {
      name: 'Full Experience',
      description: 'Servicio Premium Gear',
      price: 7500,
      features: JSON.stringify([
        'DJ + Staff de Soporte Técnico',
        'Audio Reforzado (hasta 250 personas)',
        'Diseño de Iluminación Robótica & Láser',
        'Máquina de Humo y Efectos Especiales',
        'Pirotecnia Fría Controlada',
      ]),
      highlighted: true,
    },
  ]

  for (const s of services) {
    const existing = await prisma.service.findFirst({ where: { name: s.name } })
    if (!existing) {
      await prisma.service.create({ data: s })
      console.log(`  Created service: ${s.name}`)
    } else {
      console.log(`  Service exists: ${s.name}`)
    }
  }

  // Seed blog posts
  const posts = [
    {
      title: 'El Renacimiento del Vinilo en el 2026',
      slug: 'renacimiento-vinilo-2026',
      content: 'Por qué los sets puristas están cobrando más fuerza que nunca en la escena underground.',
      excerpt: 'Por qué los sets puristas están cobrando más fuerza que nunca en la escena underground.',
      image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=800',
      author: 'Admin',
      published: true,
    },
    {
      title: 'Guía: Acústica para tu Home Studio',
      slug: 'acustica-home-studio',
      content: 'No gastes miles en equipo si tu cuarto no está tratado. Aquí te decimos cómo empezar.',
      excerpt: 'No gastes miles en equipo si tu cuarto no está tratado. Aquí te decimos cómo empezar.',
      image: 'https://images.unsplash.com/photo-1514525253361-bee8718a34d1?q=80&w=800',
      author: 'Admin',
      published: true,
    },
  ]

  for (const p of posts) {
    const existing = await prisma.blogPost.findFirst({ where: { slug: p.slug } })
    if (!existing) {
      await prisma.blogPost.create({ data: p })
      console.log(`  Created blog: ${p.title}`)
    } else {
      console.log(`  Blog exists: ${p.title}`)
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
