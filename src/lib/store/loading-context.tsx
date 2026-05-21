'use client'

import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react'

interface LoadingContextType {
  registerLoading: (id: string) => void
  unregisterLoading: (id: string) => void
  allReady: boolean
}

const LoadingContext = createContext<LoadingContextType>({
  registerLoading: () => {},
  unregisterLoading: () => {},
  allReady: false,
})

export function LoadingProvider({ children }: { children: ReactNode }) {
  const pendingRef = useRef<Set<string>>(new Set())
  const [ready, setReady] = useState(false)

  const registerLoading = useCallback((id: string) => {
    pendingRef.current.add(id)
    setReady(false)
  }, [])

  const unregisterLoading = useCallback((id: string) => {
    pendingRef.current.delete(id)
    if (pendingRef.current.size === 0) {
      const timer = setTimeout(() => setReady(true), 100)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <LoadingContext.Provider value={{ registerLoading, unregisterLoading, allReady: ready }}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  return useContext(LoadingContext)
}
