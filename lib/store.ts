'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Cart, CartItem, Product } from './types'

interface CartStore {
  cart: Cart
  isOpen: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

const initialCart: Cart = {
  items: [],
  total: 0,
  itemCount: 0,
  storeId: '',
}

function calculateCartTotals(items: CartItem[]): { total: number; itemCount: number } {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  return { total, itemCount }
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: initialCart,
      isOpen: false,

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.cart.items.find(item => item.product.id === product.id)

          let updatedItems: CartItem[]

          if (existingItem) {
            // Update quantity if item already exists
            updatedItems = state.cart.items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          } else {
            // Add new item
            const newItem: CartItem = {
              id: `cart-${product.id}-${Date.now()}`,
              product,
              quantity,
              price: product.price,
            }
            updatedItems = [...state.cart.items, newItem]
          }

          const { total, itemCount } = calculateCartTotals(updatedItems)

          return {
            cart: {
              ...state.cart,
              items: updatedItems,
              total,
              itemCount,
              storeId: product.storeId,
            },
            isOpen: true, // Auto-open cart when adding items
          }
        })
      },

      removeItem: (productId: string) => {
        set((state) => {
          const updatedItems = state.cart.items.filter(item => item.product.id !== productId)
          const { total, itemCount } = calculateCartTotals(updatedItems)

          return {
            cart: {
              ...state.cart,
              items: updatedItems,
              total,
              itemCount,
            },
          }
        })
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set((state) => {
          const updatedItems = state.cart.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          )
          const { total, itemCount } = calculateCartTotals(updatedItems)

          return {
            cart: {
              ...state.cart,
              items: updatedItems,
              total,
              itemCount,
            },
          }
        })
      },

      clearCart: () => {
        set({
          cart: initialCart,
          isOpen: false,
        })
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: 'snapstore-cart',
      partialize: (state) => ({ cart: state.cart }), // Only persist cart data, not UI state
    }
  )
)

// Hook for easier access to cart data
export function useCart() {
  const store = useCartStore()
  return {
    cart: store.cart,
    isOpen: store.isOpen,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    openCart: store.openCart,
    closeCart: store.closeCart,
    toggleCart: store.toggleCart,
    isEmpty: store.cart.items.length === 0,
    totalItems: store.cart.itemCount,
    totalPrice: store.cart.total,
  }
}