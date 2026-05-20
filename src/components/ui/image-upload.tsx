'use client'

import { useState, useRef } from 'react'

export default function ImageUpload({
  currentUrl,
  onUpload,
  folder = 'general',
}: {
  currentUrl?: string
  onUpload: (url: string) => void
  folder?: string
}) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentUrl || '')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')
    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al subir')
      }

      setPreview(data.url)
      onUpload(data.url)
    } catch (err: any) {
      setError(err.message || 'Error al subir la imagen')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div
        onClick={() => inputRef.current?.click()}
        style={{
          border: '1px dashed #2a2a2d',
          borderRadius: '8px',
          padding: '1rem',
          textAlign: 'center',
          cursor: uploading ? 'wait' : 'pointer',
          background: preview ? 'transparent' : '#111113',
          transition: 'border-color 0.15s',
          position: 'relative',
          minHeight: preview ? '120px' : '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
        onMouseEnter={e => { if (!uploading) e.currentTarget.style.borderColor = '#ff3b7f' }}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2a2d'}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          onChange={handleFile}
          style={{ display: 'none' }}
        />

        {uploading ? (
          <div style={{ color: '#6b6b7b', fontSize: '0.75rem' }}>Subiendo imagen...</div>
        ) : preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '6px',
                position: 'absolute',
                inset: 0,
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              background: 'rgba(0,0,0,0.7)',
              padding: '0.3rem',
              fontSize: '0.6rem',
              color: '#e8e8ed',
              textAlign: 'center',
            }}>
              Click para cambiar imagen
            </div>
          </>
        ) : (
          <div style={{ color: '#6b6b7b', fontSize: '0.75rem' }}>
            Click para subir imagen<br />
            <span style={{ fontSize: '0.6rem', color: '#4a4a4d' }}>JPG, PNG, WebP · Máx 5MB</span>
          </div>
        )}
      </div>
      {error && <p style={{ color: '#ff3b7f', fontSize: '0.65rem', marginTop: '0.3rem' }}>{error}</p>}
    </div>
  )
}
