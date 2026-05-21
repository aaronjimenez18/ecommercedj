'use client'

import { CartProvider } from '@/lib/store/cart-context'

export default function CartProviderWrap({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}
