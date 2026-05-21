import { NextResponse } from 'next/server'

const store = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(
  key: string,
  { max, windowMs }: { max: number; windowMs: number }
) {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true }
  }

  if (entry.count >= max) {
    return { allowed: false, errorResponse: NextResponse.json(
      { error: 'Demasiadas solicitudes. Intenta de nuevo más tarde.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((entry.resetAt - now) / 1000)) } }
    )}
  }

  entry.count++
  return { allowed: true }
}
