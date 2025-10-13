'use client'

import { Store, Product, Category } from '@/lib/types'
import CreativeStoreHeader from './CreativeStoreHeader'
import CreativeProductCard from './CreativeProductCard'
import CreativeCartSheet from './CreativeCartSheet'
import { Sparkles, Palette, Zap, Star, Rocket, Heart, Wand2, Search } from 'lucide-react'
import { useState } from 'react'
import { useProductFilters } from '@/hooks/useProductFilters'

interface CreativeStorePageProps {
  store: Store
  products: Product[]
  categories: Category[]
}

export default function CreativeStorePage({ store, products, categories }: CreativeStorePageProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const {
    products: filteredProducts,
    search: searchTerm,
    selectedCategory,
    isPending,
    handleSearchChange: setSearchTerm,
    handleCategoryChange: setSelectedCategory
  } = useProductFilters(store.id, products)

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-fuchsia-50 to-orange-100 relative overflow-hidden">
      {/* Elementos de fondo animados */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl opacity-25 animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <CreativeStoreHeader store={store} onCartClick={() => setIsCartOpen(true)} />
      <CreativeCartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} storeSlug={store.slug} />

      {/* Hero Creativo */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center relative">
            {/* Iconos flotantes */}
            <div className="flex justify-center gap-6 mb-8">
              <Sparkles className="w-10 h-10 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
              <Star className="w-10 h-10 text-pink-500 animate-pulse" />
              <Wand2 className="w-10 h-10 text-purple-500 animate-bounce" />
            </div>

            {/* Título Principal */}
            <h1 className="text-6xl lg:text-8xl font-black mb-6 leading-none">
              <span className="block bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Crea
              </span>
              <span className="block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Magia
              </span>
            </h1>

            {/* Descripción */}
            <p className="text-xl lg:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              {store.description}
            </p>

            {/* Botones CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button className="group relative px-10 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-black rounded-full text-lg overflow-hidden transform hover:scale-110 transition-all duration-300">
                <span className="relative z-10 flex items-center gap-3">
                  <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Explorar Colección
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="px-10 py-4 border-4 border-purple-500 text-purple-700 font-black rounded-full text-lg hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105 hover:rotate-2">
                Ver Galería
              </button>
            </div>

            {/* Stats Creativos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { icon: Palette, label: 'Obras de Arte', value: products.length, color: 'text-purple-600' },
                { icon: Heart, label: 'Clientes Felices', value: '2.5K+', color: 'text-pink-600' },
                { icon: Sparkles, label: 'Magia Creada', value: '∞', color: 'text-yellow-600' },
                { icon: Star, label: 'Sueños Cumplidos', value: '∞+1', color: 'text-blue-600' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 transform hover:scale-110 hover:rotate-3 transition-all duration-300 shadow-lg hover:shadow-2xl"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <stat.icon className={`w-10 h-10 mx-auto mb-3 ${stat.color} animate-bounce`} style={{ animationDelay: `${index * 200}ms` }} />
                  <div className="text-3xl font-black text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - POSICIONADO INMEDIATAMENTE DESPUÉS DEL HERO */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Colecciones Creativas
              </span>
            </h2>
            <p className="text-gray-600 text-lg font-medium">Explora nuestras categorías mágicas</p>
          </div>

          {/* Buscador Creativo */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-full shadow-xl overflow-hidden">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-purple-500 animate-pulse" />
                <input
                  type="text"
                  placeholder="Busca tu producto creativo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={isPending}
                  className="w-full pl-16 pr-6 py-5 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none font-bold text-lg disabled:opacity-50"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    disabled={isPending}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform font-black text-sm disabled:opacity-50"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Pills de Categorías */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button
              onClick={() => setSelectedCategory(null)}
              disabled={isPending}
              className={`px-8 py-3 rounded-full font-black text-sm transition-all duration-300 transform hover:scale-110 disabled:opacity-50 ${
                selectedCategory === null
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-110'
                  : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white shadow-md'
              }`}
            >
              Todas las Categorías
            </button>
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                disabled={isPending}
                className={`px-8 py-3 rounded-full font-black text-sm transition-all duration-300 transform hover:scale-110 hover:rotate-2 disabled:opacity-50 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg scale-110'
                    : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white shadow-md'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Grid de Productos */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-black text-gray-800">
                {searchTerm ? (
                  <span>
                    Resultados para: <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{searchTerm}</span>
                  </span>
                ) : selectedCategory ? (
                  categories.find(c => c.id === selectedCategory)?.name || 'Productos'
                ) : (
                  'Todos los Productos'
                )}
              </h3>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <Zap className="w-5 h-5 text-orange-500" />
                <span className="font-black text-gray-700">{filteredProducts?.length || 0} Productos</span>
              </div>
            </div>
          </div>

          {(filteredProducts && filteredProducts.length > 0) ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CreativeProductCard product={product} storeSlug={store.slug} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-block bg-white/80 backdrop-blur-sm rounded-3xl p-16 shadow-2xl transform hover:scale-105 transition-transform">
                <Palette className="w-20 h-20 text-purple-500 mx-auto mb-6 animate-bounce" />
                <h3 className="text-3xl font-black text-gray-800 mb-4">No Hay Productos</h3>
                <p className="text-gray-600 mb-8 text-lg">
                  {selectedCategory 
                    ? 'Esta categoría está vacía por ahora' 
                    : 'No hay productos disponibles en este momento'
                  }
                </p>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    disabled={isPending}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
                  >
                    Ver Todos
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Creativo */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-16 h-16 mx-auto mb-6 animate-spin" style={{ animationDuration: '3s' }} />
            <h3 className="text-4xl font-black mb-4">Únete a la Magia</h3>
            <p className="text-xl mb-8 text-purple-100">
              Recibe ofertas exclusivas, nuevos lanzamientos y contenido creativo directo en tu correo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-6 py-4 rounded-full text-gray-800 font-bold focus:outline-none focus:ring-4 focus:ring-white/50"
              />
              <button className="px-8 py-4 bg-white text-purple-600 font-black rounded-full hover:bg-yellow-300 hover:text-purple-700 transition-all duration-300 transform hover:scale-110 whitespace-nowrap">
                Suscribirme
              </button>
            </div>
            <p className="text-purple-200 text-sm mt-4 font-medium">✨ Más de 5,000 creativos ya se unieron • Sin spam</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm py-8 border-t-2 border-purple-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-gray-600 font-medium">
            © {new Date().getFullYear()} {store.name} • Hecho con <Heart className="w-4 h-4 inline text-pink-500" /> y Creatividad
          </p>
        </div>
      </footer>
    </div>
  )
}
