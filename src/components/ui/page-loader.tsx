'use client'

import { useState, useEffect } from 'react'

export default function PageLoader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const minDisplay = new Promise<void>(resolve =>
      setTimeout(resolve, 2000)
    )
    const pageReady = new Promise<void>(resolve => {
      if (document.readyState === 'complete') {
        resolve()
      } else {
        window.addEventListener('load', () => resolve(), { once: true })
      }
    })

    Promise.all([minDisplay, pageReady]).then(() => {
      setHidden(true)
    })
  }, [])

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
