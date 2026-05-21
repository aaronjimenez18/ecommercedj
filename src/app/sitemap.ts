import { prisma } from '@/lib/db/prisma'

const BASE = 'https://djgdl.netlify.app'

export default async function sitemap() {
  const products = await prisma.product.findMany({ select: { id: true } })
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${BASE}/pago/exito`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.1 },
    { url: `${BASE}/pago/cancelado`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.1 },
    ...products.map(p => ({
      url: `${BASE}/productos/${p.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...posts.map(p => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
