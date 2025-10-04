'use client'

import { Store, Product, Category } from '@/lib/types'
import EleganteStoreHeader from './EleganteStoreHeader'
import EleganteProductCard from './EleganteProductCard'
import EleganteCartSheet from './EleganteCartSheet'
import { useState } from 'react'

interface EleganteStorePageProps {
  store: Store
  products: Product[]
  categories: Category[]
}

export default function EleganteStorePage({ store, products, categories }: EleganteStorePageProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filtrar productos por categoría
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category.slug === selectedCategory)
    : products

  return (
    <div className="min-h-screen bg-white">
      {/* Header elegante */}
      <EleganteStoreHeader store={store} onCartClick={() => setIsCartOpen(true)} />

      {/* Cart Sheet */}
      <EleganteCartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} storeSlug={store.slug} />

      {/* Banner hero minimalista y elegante - REDUCIDO para priorizar productos */}
      <section className="relative h-96 flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-50"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-thin text-gray-900 mb-8 tracking-wider uppercase">
            Elegancia
          </h1>
          <div className="w-24 h-px bg-black mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
            {store.description || "Descubre nuestra colección cuidadosamente seleccionada de piezas atemporales que definen la elegancia moderna"}
          </p>

          <div className="mt-12">
            <button className="bg-black text-white px-12 py-4 text-sm uppercase tracking-widest font-light hover:bg-gray-800 transition-all duration-500">
              Explorar Colección
            </button>
          </div>
        </div>

        {/* Elementos decorativos minimalistas */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-16 bg-gray-300"></div>
        </div>
      </section>

      {/* Filtros elegantes */}
      <section className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Navegación de categorías elegante */}
          <div className="text-center mb-16">
            <div className="flex flex-wrap justify-center gap-12">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`text-sm pb-1 uppercase tracking-widest font-light transition-colors duration-300 ${
                  selectedCategory === null
                    ? 'text-black border-b border-black'
                    : 'text-gray-500 hover:text-black hover:border-b hover:border-gray-300'
                }`}
              >
                Todos
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`text-sm pb-1 uppercase tracking-widest font-light transition-colors duration-300 ${
                    selectedCategory === category.slug
                      ? 'text-black border-b border-black'
                      : 'text-gray-500 hover:text-black hover:border-b hover:border-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de productos elegante */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-thin text-gray-900 mb-4 tracking-wider uppercase">
                Nuestra Selección
              </h2>
              <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
              <p className="text-gray-600 font-light tracking-wide">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'pieza' : 'piezas'} cuidadosamente {filteredProducts.length === 1 ? 'seleccionada' : 'seleccionadas'}
                {selectedCategory && (
                  <span className="ml-2">
                    en <span className="font-normal">{categories.find(c => c.slug === selectedCategory)?.name}</span>
                  </span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 lg:gap-16">
              {filteredProducts.map((product) => (
                <EleganteProductCard key={product.id} product={product} storeSlug={store.slug} />
              ))}
            </div>
          </div>

          {/* Sección de newsletter elegante */}
          <section className="border-t border-gray-100 pt-16 text-center">
            <h3 className="text-3xl font-thin text-gray-900 mb-4 tracking-wider uppercase">
              Manténgase Informado
            </h3>
            <div className="w-12 h-px bg-gray-300 mx-auto mb-8"></div>
            <p className="text-gray-600 font-light mb-12 max-w-md mx-auto tracking-wide">
              Reciba noticias sobre nuevas colecciones y eventos exclusivos
            </p>

            <div className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Ingrese su correo electrónico"
                  className="flex-1 px-6 py-4 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-colors duration-300 font-light"
                />
                <button className="bg-black text-white px-8 py-4 text-sm uppercase tracking-widest font-light hover:bg-gray-800 transition-colors duration-300">
                  Suscribir
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}