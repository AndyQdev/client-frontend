'use client'

import { Store, Product, Category } from '@/lib/types'
import MinimalStoreHeader from './MinimalStoreHeader'
import MinimalProductCard from './MinimalProductCard'
import MinimalCartSheet from './MinimalCartSheet'
import { useState } from 'react'

interface MinimalStorePageProps {
  store: Store
  products: Product[]
  categories: Category[]
}

export default function MinimalStorePage({ store, products, categories }: MinimalStorePageProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filtrar productos por categoría
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category.slug === selectedCategory)
    : products

  return (
    <div className="min-h-screen bg-white">
      <MinimalStoreHeader store={store} onCartClick={() => setIsCartOpen(true)} />

      {/* Cart Sheet */}
      <MinimalCartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} storeSlug={store.slug} />

      {/* Hero ultra minimal - REDUCIDO para priorizar productos */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-8 leading-tight">
              {store.description || "Simple. Clean. Essential."}
            </h1>
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                Carefully curated products for a mindful lifestyle.
              </p>
              <button className="bg-gray-900 text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors">
                Shop Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Productos con máximo espacio */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-16 lg:pb-24">
        {/* Filtros ultra simples */}
        <div className="mb-16">
          <div className="flex flex-wrap gap-8 text-sm">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`pb-1 transition-colors ${
                selectedCategory === null
                  ? 'text-gray-900 border-b border-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`pb-1 transition-colors ${
                  selectedCategory === category.slug
                    ? 'text-gray-900 border-b border-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            {selectedCategory && ` in ${categories.find(c => c.slug === selectedCategory)?.name}`}
          </p>
        </div>

        {/* Grid con espacios generosos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {filteredProducts.map((product) => (
            <MinimalProductCard key={product.id} product={product} storeSlug={store.slug} />
          ))}
        </div>

        {/* Newsletter minimal */}
        <section className="mt-24 pt-16 border-t border-gray-100">
          <div className="max-w-md">
            <h3 className="text-2xl font-light text-gray-900 mb-6">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-8">
              Receive updates on new arrivals and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-0 py-3 border-0 border-b border-gray-200 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
              />
              <button className="ml-6 text-gray-900 hover:text-gray-600 transition-colors text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </section>
    </div>
  )
}