'use client'

import { useState, useTransition, useEffect, useRef } from 'react'
import { Product } from '@/lib/types'
import { filterProducts } from '@/app/actions/products'

export function useProductFilters(storeId: string, initialProducts: Product[]) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Limpiar timer anterior
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    // Debounce para búsqueda (300ms) - no debounce para categoría
    const delay = selectedCategory !== null ? 0 : (search ? 300 : 0)

    debounceTimer.current = setTimeout(() => {
      startTransition(async () => {
        const filtered = await filterProducts(storeId, search, selectedCategory)
        setProducts(filtered)
      })
    }, delay)

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [search, selectedCategory, storeId])

  const handleSearchChange = (value: string) => {
    setSearch(value)
  }

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId)
  }

  return {
    products,
    search,
    selectedCategory,
    isPending,
    handleSearchChange,
    handleCategoryChange
  }
}
