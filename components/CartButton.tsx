'use client'

import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/store'

export default function CartButton() {
  const { totalItems, toggleCart } = useCart()

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-background"
    >
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  )
}