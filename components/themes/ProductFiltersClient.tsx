'use client'

import { useState, useTransition } from 'react'
import { Search } from 'lucide-react'
import { Category } from '@/lib/types'

interface ProductFiltersClientProps {
  categories: Category[]
  onFilterChange: (search: string, categoryId: string | null) => Promise<void>
  className?: string
  searchClassName?: string
  categoryClassName?: string
  categoryButtonClassName?: string
  categoryActiveClassName?: string
}

export default function ProductFiltersClient({
  categories,
  onFilterChange,
  className = '',
  searchClassName = '',
  categoryClassName = '',
  categoryButtonClassName = '',
  categoryActiveClassName = ''
}: ProductFiltersClientProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSearchChange = (value: string) => {
    setSearch(value)
    startTransition(async () => {
      await onFilterChange(value, selectedCategory)
    })
  }

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId)
    startTransition(async () => {
      await onFilterChange(search, categoryId)
    })
  }

  return (
    <div className={className}>
      {/* Search Bar */}
      <div className={searchClassName}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            disabled={isPending}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 disabled:opacity-50"
          />
        </div>
      </div>

      {/* Category Filters */}
      {categories.length > 0 && (
        <div className={categoryClassName}>
          <button
            onClick={() => handleCategoryChange(null)}
            disabled={isPending}
            className={`${categoryButtonClassName} ${!selectedCategory ? categoryActiveClassName : ''}`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              disabled={isPending}
              className={`${categoryButtonClassName} ${selectedCategory === category.id ? categoryActiveClassName : ''}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
