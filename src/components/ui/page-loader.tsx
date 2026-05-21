'use client'

import { useState, useEffect } from 'react'
import { useLoading } from '@/lib/store/loading-context'

export default function PageLoader() {
  const { allReady } = useLoading()
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (!allReady) return

    const timeout = setTimeout(() => setHidden(true), 150)
    return () => clearTimeout(timeout)
  }, [allReady])

  return (
    <div className="page-loader" aria-hidden={hidden} style={{ opacity: hidden ? 0 : 1, visibility: hidden ? 'hidden' : 'visible', pointerEvents: hidden ? 'none' : 'auto' }}>
      <div className="loader-3">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
      </div>
    </div>
  )
}
