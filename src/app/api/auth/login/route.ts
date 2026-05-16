import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
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
