'use client'

import { CartProvider } from '@/lib/cart-context'
import { CustomerProvider } from '@/lib/customer-context'
import { ReactNode } from 'react'

interface StoreLayoutClientProps {
  children: ReactNode
  storeSlug: string
}

export default function StoreLayoutClient({ children, storeSlug }: StoreLayoutClientProps) {
  return (
    <CustomerProvider>
      <CartProvider storeSlug={storeSlug}>
        {children}
      </CartProvider>
    </CustomerProvider>
  )
}
