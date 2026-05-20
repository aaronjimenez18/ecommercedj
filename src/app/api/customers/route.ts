import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  const [orders, bookings] = await Promise.all([
    prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
    }),
  ])

  const customerMap = new Map<string, {
    email: string
    name: string
    phone: string
    totalSpent: number
    orderCount: number
    bookingCount: number
    lastOrder: string | null
    lastBooking: string | null
  }>()

  orders.forEach(o => {
    const email = o.email || 'unknown'
    const existing = customerMap.get(email) || {
      email,
      name: o.customerName || '',
      phone: o.customerPhone || '',
      totalSpent: 0,
      orderCount: 0,
      bookingCount: 0,
      lastOrder: null,
      lastBooking: null,
    }
    existing.totalSpent += o.total
    existing.orderCount += 1
    if (!existing.lastOrder || o.createdAt.toISOString() > existing.lastOrder) {
      existing.lastOrder = o.createdAt.toISOString()
      if (o.customerName) existing.name = o.customerName
      if (o.customerPhone) existing.phone = o.customerPhone
    }
    customerMap.set(email, existing)
  })

  bookings.forEach(b => {
    const email = b.email || 'unknown'
    const existing = customerMap.get(email) || {
      email,
      name: b.name || '',
      phone: b.phone || '',
      totalSpent: 0,
      orderCount: 0,
      bookingCount: 0,
      lastOrder: null,
      lastBooking: null,
    }
    existing.bookingCount += 1
    existing.totalSpent += b.total
    if (!existing.lastBooking || b.createdAt.toISOString() > existing.lastBooking) {
      existing.lastBooking = b.createdAt.toISOString()
    }
    if (!existing.name) existing.name = b.name
    if (!existing.phone) existing.phone = b.phone
    customerMap.set(email, existing)
  })

  const customers = Array.from(customerMap.values())
    .sort((a, b) => b.totalSpent - a.totalSpent)

  return NextResponse.json(customers)
}
