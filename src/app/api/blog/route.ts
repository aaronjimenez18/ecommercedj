import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { authenticate } from '@/lib/auth-guard'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (slug) {
    const post = await prisma.blogPost.findUnique({ where: { slug } })
    if (!post) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(post)
  }

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(posts)
}

export async function POST(request: NextRequest) {
  const { errorResponse } = await authenticate(request)
  if (errorResponse) return errorResponse

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
  } catch (e: unknown) {
    const prismaErr = e as { code?: string }
    if (prismaErr?.code === 'P2002') {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }
}
