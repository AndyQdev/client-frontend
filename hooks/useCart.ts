'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Item = { id: string; name: string; price: number; qty: number; image?: string }
type CartState = {
  storeId: string | null
  items: Item[]
  setStore: (storeId: string) => void
  add: (item: Item) => void
  remove: (id: string) => void
  clear: () => void
  total: () => number
}

export const useCart = (storeId: string) =>
  create<CartState>()(
    persist(
      (set, get) => ({
        storeId: storeId ?? null,
        items: [],
        setStore: (sid) => set({ storeId: sid, items: [] }),
        add: (item) => {
          const items = get().items.slice()
          const idx = items.findIndex((i) => i.id === item.id)
          if (idx >= 0) items[idx].qty += item.qty
          else items.push(item)
          set({ items })
        },
        remove: (id) => set({ items: get().items.filter(i => i.id !== id) }),
        clear: () => set({ items: [] }),
        total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      }),
      {
        name: `cart:${storeId}`,
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ items: state.items, storeId: state.storeId }),
      }
    )
  )
