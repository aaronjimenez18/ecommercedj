'use client'

import { useEffect, useRef } from 'react'
import { AudioAmbient } from '@/lib/audio-ambient'

const SECTION_IDS = ['inicio', 'muebles', 'servicios', 'blog', 'testimonios', 'faq']

export function useAudioAmbient() {
  const ambient = useRef<AudioAmbient | null>(null)
  const initFired = useRef(false)
  const ticking = useRef(false)

  useEffect(() => {
    ambient.current = new AudioAmbient()

    const onUserGesture = async () => {
      if (initFired.current) return
      initFired.current = true
      await ambient.current?.init()

      document.removeEventListener('click', onUserGesture)
      document.removeEventListener('touchstart', onUserGesture)
      document.removeEventListener('keydown', onUserGesture)
    }

    document.addEventListener('click', onUserGesture)
    document.addEventListener('touchstart', onUserGesture)
    document.addEventListener('keydown', onUserGesture)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            ambient.current?.setSection(entry.target.id)
            break
          }
        }
      },
      { threshold: 0.3 }
    )

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const max = Math.max(
            document.body.scrollHeight - window.innerHeight,
            1
          )
          const progress = Math.min(window.scrollY / max, 1)
          ambient.current?.setProgress(progress)
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      ambient.current?.stop()
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('click', onUserGesture)
      document.removeEventListener('touchstart', onUserGesture)
      document.removeEventListener('keydown', onUserGesture)
    }
  }, [])
}
