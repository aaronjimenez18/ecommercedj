import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function authenticate(request: NextRequest) {
  const { supabase } = createClient(request)
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return { user: null, errorResponse: NextResponse.json({ error: 'No autorizado' }, { status: 401 }) }
  }

  return { user, errorResponse: null }
}
