'use client'

import { Store, Product, Category } from '@/lib/types'
import { useState } from 'react'
import InteriorProductCard from './InteriorProductCard'
import InteriorStoreHeader from './InteriorStoreHeader'
import InteriorCartSheet from './InteriorCartSheet'
import { useCart } from '@/lib/cart-context'
import { ChevronDown } from 'lucide-react'

interface InteriorStorePageProps {
  store: Store
  products: Product[]
  categories: Category[]
}

export default function InteriorStorePage({ store, products, categories }: InteriorStorePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('featured')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items } = useCart()

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category.id === selectedCategory)
    : products

  return (
    <div className="min-h-screen bg-stone-50">
      <InteriorStoreHeader
        store={store}
        onCartClick={() => setIsCartOpen(true)}
        cartItemsCount={items.length}
      />

      <InteriorCartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        storeSlug={store.slug}
      />
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 to-stone-900/50 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=1920')`
          }}
        ></div>

        <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-wide">
              {store.name}
            </h1>
            <p className="text-xl md:text-2xl text-stone-200 mb-8 font-light">
              {store.description || 'Decoración y mobiliario de alta calidad para tu hogar'}
            </p>
            <button className="btn-primary">
              Explorar Colección
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Envío Gratis', desc: 'En compras superiores a $100.000' },
              { title: 'Garantía Total', desc: '30 días de garantía en todos los productos' },
              { title: 'Atención Personalizada', desc: 'Asesoría experta para tu hogar' }
            ].map((feature, i) => (
              <div
                key={i}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <h3 className="font-serif text-xl text-stone-800 mb-2">{feature.title}</h3>
                <p className="text-stone-600 text-sm font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="productos" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="section-title">Nuestra Colección</h2>
            <p className="section-subtitle">
              Descubre piezas únicas para transformar tu espacio
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            {/* Category Filter */}
            <div className="category-filter flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null ? 'active' : ''}
              >
                Todos
              </button>
              {categories.slice(0, 6).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={selectedCategory === cat.id ? 'active' : ''}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-stone-200 px-6 py-2 pr-10 text-sm font-medium text-stone-700 focus:outline-none focus:border-stone-400 cursor-pointer"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="newest">Más Recientes</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 pointer-events-none" />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.slice(0, 12).map((product, index) => (
              <InteriorProductCard
                key={product.id}
                product={product}
                storeSlug={store.slug}
                index={index}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-stone-500 text-lg">No se encontraron productos en esta categoría</p>
            </div>
          )}

          {/* Load More */}
          {filteredProducts.length > 12 && (
            <div className="text-center mt-16">
              <button className="btn-secondary">
                Ver Más Productos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="font-serif text-4xl text-stone-800 mb-6">Acerca de Nosotros</h2>
              <p className="text-stone-600 mb-4 leading-relaxed">
                Somos una empresa dedicada a transformar espacios en hogares únicos y acogedores. Con más de 10 años de experiencia, ofrecemos productos de la más alta calidad seleccionados cuidadosamente para ti.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Creemos que cada hogar merece piezas especiales que cuenten una historia. Por eso, trabajamos con los mejores proveedores para traerte diseños exclusivos que combinan funcionalidad y belleza.
              </p>
            </div>
            <div className="relative h-[400px] lg:h-[500px] animate-fade-in">
              <div className="absolute inset-0 bg-stone-200"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl mb-4">¿Necesitas Ayuda?</h2>
            <p className="text-stone-300">Estamos aquí para asesorarte en cada paso</p>
          </div>

          <div className="text-center">
            <p className="text-stone-300 mb-6">Contáctanos para más información sobre nuestros productos</p>
            <a href={`/${store.slug}#productos`} className="btn-secondary">
              Ver Productos
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
