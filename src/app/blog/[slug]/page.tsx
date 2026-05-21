import { prisma } from '@/lib/db/prisma'
import type { Metadata } from 'next'
import BlogClient from './blog-client'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug } })
  if (!post || !post.published) return { title: 'Post no encontrado' }

  return {
    title: post.title,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      images: post.image ? [{ url: post.image }] : [],
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      authors: [post.author],
    },
    alternates: { canonical: `/blog/${slug}` },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  })

  const serialized = post ? { ...post, createdAt: post.createdAt.toISOString() } : null
  return <BlogClient initialPost={serialized} slug={slug} />
}
