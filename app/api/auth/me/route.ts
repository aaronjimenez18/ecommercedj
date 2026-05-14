import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { supabase } = createClient(request)

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ user: null })
  }

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
    },
  })
}
