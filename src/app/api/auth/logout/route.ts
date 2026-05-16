import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const { supabase, applyCookies } = createClient(request)
  await supabase.auth.signOut()

  return applyCookies(NextResponse.json({ success: true }))
}
