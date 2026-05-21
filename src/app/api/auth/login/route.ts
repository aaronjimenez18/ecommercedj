import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const { allowed, errorResponse } = rateLimit(`login:${ip}`, { max: 10, windowMs: 15 * 60 * 1000 })
  if (!allowed) return errorResponse

  try {
    const { email, password } = await request.json()
    const { supabase, applyCookies } = createClient(request)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return applyCookies(
        NextResponse.json({ error: error.message }, { status: 401 })
      )
    }

    return applyCookies(
      NextResponse.json({
        user: {
          id: data.user.id,
          email: data.user.email,
        },
      })
    )
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
