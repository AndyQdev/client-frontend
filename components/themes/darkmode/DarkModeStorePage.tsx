'use client'

import { Store, Product, Category } from '@/lib/types'
import DarkModeStoreHeader from './DarkModeStoreHeader'
import DarkModeProductCard from './DarkModeProductCard'
import DarkModeCartSheet from './DarkModeCartSheet'
import { Sparkles, Star, TrendingUp, Mail } from 'lucide-react'
import { useState } from 'react'

interface DarkModeStorePageProps {
  store: Store
  products: Product[]
  categories: Category[]
}

export default function DarkModeStorePage({ store, products, categories }: DarkModeStorePageProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter products by category
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category.slug === selectedCategory)
    : products

  return (
    <div className="min-h-screen bg-zinc-900">
      <DarkModeStoreHeader store={store} onCartClick={() => setIsCartOpen(true)} />

      {/* Cart Sheet */}
      <DarkModeCartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} storeSlug={store.slug} />

      {/* Hero Section - Minimalista */}
      <section className="relative bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
          <div className="max-w-4xl">
            {/* Tag destacado */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-yellow-500"></div>
              <span className="text-xs uppercase tracking-[0.2em] text-yellow-500 font-semibold">
                Edición Premium
              </span>
            </div>

            {/* Título principal */}
            <h1 className="text-5xl lg:text-7xl font-bold text-zinc-100 mb-6 tracking-tight leading-tight">
              {store.name}
            </h1>

            {/* Descripción */}
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8">
              {store.description || 'Descubre nuestra colección exclusiva de productos premium seleccionados para ti.'}
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6 max-w-xl">
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-5 border border-zinc-700/50">
                <div className="text-3xl font-bold text-yellow-500 mb-1">{products.length}</div>
                <div className="text-xs uppercase tracking-wider text-zinc-500">Productos</div>
              </div>
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-5 border border-zinc-700/50">
                <div className="text-3xl font-bold text-yellow-500 mb-1">{categories.length}</div>
                <div className="text-xs uppercase tracking-wider text-zinc-500">Categorías</div>
              </div>
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-5 border border-zinc-700/50">
                <div className="text-3xl font-bold text-yellow-500 mb-1">5.0</div>
                <div className="text-xs uppercase tracking-wider text-zinc-500">Rating</div>
              </div>
            </div>
          </div>

          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Barra de Categorías */}
      <section className="sticky top-16 z-30 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 overflow-x-auto py-4 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wide whitespace-nowrap transition-all ${
                selectedCategory === null
                  ? 'bg-yellow-500 text-black'
                  : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300'
              }`}
            >
              Todo
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wide whitespace-nowrap transition-all ${
                  selectedCategory === category.slug
                    ? 'bg-yellow-500 text-black'
                    : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Productos */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Header de Sección */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl lg:text-5xl font-bold text-zinc-100 tracking-tight">
              {selectedCategory
                ? categories.find(c => c.slug === selectedCategory)?.name || 'Catálogo'
                : 'Catálogo Completo'}
            </h2>
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-zinc-500 text-sm">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'producto disponible' : 'productos disponibles'}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <DarkModeProductCard key={product.id} product={product} storeSlug={store.slug} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="inline-block bg-zinc-800/50 backdrop-blur-sm rounded-lg p-16 border border-zinc-700">
              <h3 className="text-2xl font-bold text-zinc-300 mb-4">Sin Resultados</h3>
              <p className="text-zinc-500 mb-8">No hay productos en esta categoría</p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold uppercase tracking-wide transition-all"
              >
                Ver Todo
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="bg-zinc-800 border-t border-zinc-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-yellow-500" />
                <span className="text-xs uppercase tracking-[0.2em] text-yellow-500 font-semibold">Newsletter</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-zinc-100 mb-4">
                No Te Pierdas Nada
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Recibe las últimas novedades, lanzamientos exclusivos y ofertas especiales directo en tu correo.
              </p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-6 py-4 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-yellow-500 transition-colors"
                />
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg font-semibold uppercase tracking-wide transition-all whitespace-nowrap">
                  Suscribirme
                </button>
              </div>
              <p className="text-zinc-600 text-xs mt-4">
                Únete a más de 10,000 suscriptores • Sin spam
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} {store.name} • Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  )
}