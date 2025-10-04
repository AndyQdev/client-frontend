'use client'

import { Store, Product, Category } from '@/lib/types'
import ModernStoreHeader from './ModernStoreHeader'
import ModernProductGrid from './ModernProductGrid'
import ModernCartSheet from './ModernCartSheet'
import { useState } from 'react'
import { SlidersHorizontal, Grid3X3, List } from 'lucide-react'

interface ModernStorePageProps {
  store: Store
  products: Product[]
  categories: Category[]
}

export default function ModernStorePage({ store, products, categories }: ModernStorePageProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filtrar productos por categoría
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category.slug === selectedCategory)
    : products

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header del tema Modern */}
      <ModernStoreHeader store={store} onCartClick={() => setIsCartOpen(true)} />

      {/* Cart Sheet */}
      <ModernCartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} storeSlug={store.slug} />

      {/* Banner hero REDUCIDO para priorizar productos */}
      <section className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">
              {store.description || "Productos Extraordinarios"}
            </h1>
            <p className="text-lg text-gray-200">
              {products.length} productos disponibles
            </p>
          </div>
        </div>
      </section>

      {/* Filtros y productos - PRIORIZADOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
          {/* Categorías */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                selectedCategory === null
                  ? 'bg-black text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  selectedCategory === category.slug
                    ? 'bg-black text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Controles de vista */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300">
              <SlidersHorizontal className="w-5 h-5" />
              <span className="font-medium">Filtros</span>
            </button>

            <div className="flex items-center space-x-2">
              <button className="p-3 bg-black text-white rounded-xl">
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300">
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Contador de productos filtrados */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando <span className="font-bold text-gray-900">{filteredProducts.length}</span> productos
            {selectedCategory && (
              <span className="ml-2 text-sm">
                en <span className="font-semibold">{categories.find(c => c.slug === selectedCategory)?.name}</span>
              </span>
            )}
          </p>
        </div>

        {/* Grid de productos */}
        <ModernProductGrid products={filteredProducts} storeSlug={store.slug} />

        {/* Newsletter reducido */}
        <section className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 text-center text-white mt-12">
          <h3 className="text-2xl font-bold mb-3">Suscríbete</h3>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Recibe ofertas exclusivas y novedades
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-3 sm:space-y-0 sm:space-x-3">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-6 py-3 rounded-2xl border-0 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button className="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300">
              Suscribirse
            </button>
          </div>
        </section>
      </section>
    </div>
  )
}