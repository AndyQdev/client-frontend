'use client'

import { useState, useEffect, useRef } from 'react'
import { Product } from '@/lib/types'
import { filterProducts } from '@/app/actions/products'

export function useProductFilters(storeId: string, initialProducts: Product[]) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)
  const abortController = useRef<AbortController | null>(null)

  useEffect(() => {
    // Limpiar timer anterior
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    // Cancelar request anterior si existe
    if (abortController.current) {
      abortController.current.abort()
    }

    // Debounce para búsqueda (500ms) - sin debounce para categoría
    const delay = search ? 500 : 0

    debounceTimer.current = setTimeout(async () => {
      setIsPending(true)
      abortController.current = new AbortController()

      try {
        const filtered = await filterProducts(storeId, search, selectedCategory)
        setProducts(filtered)
      } catch (error) {
        // Ignorar errores de abort
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error filtering products:', error)
        }
      } finally {
        setIsPending(false)
      }
    }, delay)

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
      if (abortController.current) {
        abortController.current.abort()
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
