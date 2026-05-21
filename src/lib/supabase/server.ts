import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export function createClient(request: NextRequest) {
  type CookieOptions = {
    name: string
    value: string
    options: {
      path?: string
      maxAge?: number
      secure?: boolean
      httpOnly?: boolean
      sameSite?: boolean | 'lax' | 'strict' | 'none'
      domain?: string
      encode?: (val: string) => string
      expires?: Date
      priority?: 'low' | 'medium' | 'high'
      partitioned?: boolean
    }
  }

  const cookiesToApply: Array<CookieOptions> = []

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookiesToApply.push({ name, value, options: options ?? {} })
          )
        },
      },
    }
  )

  function applyCookies(response: NextResponse) {
    cookiesToApply.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options)
    })
    return response
  }

  return { supabase, applyCookies }
}
