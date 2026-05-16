'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import type { CartItem } from '@/types'

interface CartContextType {
  items: CartItem[]
  count: number
  total: number
  addItem: (item: CartItem) => void
  removeItem: (idx: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('gdl_cart')
        if (stored) return JSON.parse(stored)
      } catch {}
    }
    return []
  })

  const addItem = useCallback((item: CartItem) => {
    setItems(prev => {
      const next = [...prev, item]
      localStorage.setItem('gdl_cart', JSON.stringify(next))
      return next
    })
  }, [])

  const removeItem = useCallback((idx: number) => {
    setItems(prev => {
      const next = prev.filter((_, i) => i !== idx)
      localStorage.setItem('gdl_cart', JSON.stringify(next))
      return next
    })
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    localStorage.removeItem('gdl_cart')
  }, [])

  const count = items.length
  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <CartContext.Provider value={{ items, count, total, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
