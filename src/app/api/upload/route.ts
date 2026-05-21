import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { authenticate } from '@/lib/auth-guard'

export async function POST(request: NextRequest) {
  const { errorResponse } = await authenticate(request)
  if (errorResponse) return errorResponse

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No se envió ningún archivo' }, { status: 400 })
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Formato no soportado. Usa JPG, PNG, WebP, GIF o AVIF' }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'La imagen no puede superar los 5MB' }, { status: 400 })
    }

    const { supabase } = createClient(request)

    const ext = file.name.split('.').pop() || 'jpg'
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const bucket = 'images'

    const buffer = Buffer.from(await file.arrayBuffer())

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({ error: `Error al subir: ${uploadError.message}` }, { status: 500 })
    }

    const { data: signedUrl, error: signedUrlError } = await supabase.storage
      .from(bucket)
      .createSignedUrl(fileName, 31536000)

    if (signedUrlError || !signedUrl) {
      console.error('Signed URL error:', signedUrlError)
      return NextResponse.json({ error: 'Error al generar la URL de la imagen' }, { status: 500 })
    }

    return NextResponse.json({ url: signedUrl.signedUrl })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Error al procesar la subida' }, { status: 500 })
  }
}
