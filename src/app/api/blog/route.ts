import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt || '',
        image: body.image || '',
        author: body.author || 'Admin',
        published: body.published ?? true,
      },
    })
    return NextResponse.json(post, { status: 201 })
  } catch (e: any) {
    if (e?.code === 'P2002') {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }
}
