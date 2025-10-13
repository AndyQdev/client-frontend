'use client'

import { Store, Product, Category } from '@/lib/types'
import { useState } from 'react'
import InteriorProductCard from './InteriorProductCard'
import InteriorStoreHeader from './InteriorStoreHeader'
import InteriorCartSheet from './InteriorCartSheet'
import { useCart } from '@/lib/cart-context'
import { ChevronDown, Truck, Shield, Headphones, Search, X } from 'lucide-react'
import Image from 'next/image'
import { useProductFilters } from '@/hooks/useProductFilters'

interface InteriorStorePageProps {
  store: Store
  products: Product[]
  categories: Category[]
}

export default function InteriorStorePage({ store, products, categories }: InteriorStorePageProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items } = useCart()

  const {
    products: filteredProducts,
    search,
    selectedCategory,
    isPending,
    handleSearchChange,
    handleCategoryChange
  } = useProductFilters(store.id, products)

  return (
    <div id="inicio" className="min-h-screen bg-stone-50">
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
              {store.heroTitle || store.name}
            </h1>
            <p className="text-xl md:text-2xl text-stone-200 mb-8 font-light">
              {store.description || 'Decoración y mobiliario de alta calidad para tu hogar'}
            </p>
            <a href="#productos" className="btn-primary">
              Explorar Colección
            </a>
          </div>
        </div>
      </section>

      {/* Products Section - POSICIONADO INMEDIATAMENTE DESPUÉS DEL HERO */}
      <section id="productos" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="section-title">Nuestra Colección</h2>
            <p className="section-subtitle">
              Descubre piezas únicas para transformar tu espacio
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                disabled={isPending}
                className="w-full pl-12 pr-12 py-4 bg-white border-2 border-amber-200 rounded-lg text-stone-800 placeholder-amber-400 focus:outline-none focus:border-amber-400 transition-colors shadow-sm disabled:opacity-50"
              />
              {search && (
                <button
                  onClick={() => handleSearchChange('')}
                  disabled={isPending}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-700 transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            {/* Category Filter */}
            <div className="category-filter flex flex-wrap justify-center gap-2">
              <button
                onClick={() => handleCategoryChange(null)}
                disabled={isPending}
                className={`${selectedCategory === null ? 'active' : ''} disabled:opacity-50`}
              >
                Todos
              </button>
              {categories.slice(0, 6).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  disabled={isPending}
                  className={`${selectedCategory === cat.id ? 'active' : ''} disabled:opacity-50`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort - TODO: Implementar ordenamiento en el backend */}
            {/* <div className="relative">
              <select
                className="appearance-none bg-white border border-stone-200 px-6 py-2 pr-10 text-sm font-medium text-stone-700 focus:outline-none focus:border-stone-400 cursor-pointer"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="newest">Más Recientes</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 pointer-events-none" />
            </div> */}
          </div>

          {/* Product Counter */}
          <div className="mb-8 text-center">
            <p className="text-stone-600">
              Mostrando <span className="font-semibold text-amber-700">{filteredProducts?.length || 0}</span> {(filteredProducts?.length || 0) === 1 ? 'producto' : 'productos'}
              {search && <span className="ml-1">para &quot;{search}&quot;</span>}
              {selectedCategory && <span className="ml-1">en {categories.find(c => c.id === selectedCategory)?.name}</span>}
            </p>
          </div>

          {/* Products Grid */}
          {(filteredProducts && filteredProducts.length > 0) ? (
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
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-32 h-32 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <div className="text-6xl text-amber-200">🏠</div>
                </div>
                <h3 className="font-serif text-2xl text-stone-800 mb-4">Sin Productos Disponibles</h3>
                <p className="text-stone-600 text-lg mb-8">
                  {selectedCategory 
                    ? 'No se encontraron productos en esta categoría' 
                    : search 
                      ? `No se encontraron productos para "${search}"`
                      : 'No hay productos disponibles en este momento'
                  }
                </p>
                {(selectedCategory || search) && (
                  <div className="space-y-4">
                    {search && (
                      <button
                        onClick={() => handleSearchChange('')}
                        className="btn-secondary mr-4"
                      >
                        Limpiar Búsqueda
                      </button>
                    )}
                    {selectedCategory && (
                      <button
                        onClick={() => handleCategoryChange(null)}
                        className="btn-primary"
                      >
                        Ver Todos los Productos
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {filteredProducts && filteredProducts.length > 12 && (
            <div className="text-center mt-16">
              <button className="btn-secondary">
                Ver Más Productos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section - MOVIDO DESPUÉS DE PRODUCTOS PARA MAYOR PROFESIONALISMO */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-stone-800 mb-4">¿Por Qué Elegirnos?</h2>
            <p className="text-stone-600">Beneficios que nos distinguen en decoración</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {(store.features && store.features.length > 0 ? store.features : [
              { icon: 'Truck', title: 'Envío Gratis', description: 'En compras superiores a $100.000' },
              { icon: 'Shield', title: 'Garantía Total', description: '30 días de garantía en todos los productos' },
              { icon: 'Headphones', title: 'Atención Personalizada', description: 'Asesoría experta para tu hogar' }
            ]).map((feature, i) => {
              const IconComponent = feature.icon === 'Truck' ? Truck :
                                   feature.icon === 'Shield' ? Shield :
                                   Headphones
              return (
                <div
                  key={i}
                  className="text-center animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-amber-700" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl text-stone-800 mb-2">{feature.title}</h3>
                  <p className="text-stone-600 text-sm font-light">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="font-serif text-4xl text-stone-800 mb-6">Acerca de Nosotros</h2>
              <p className="text-stone-600 mb-4 leading-relaxed">
                {store.aboutUs || `Somos una empresa dedicada a transformar espacios en hogares únicos y acogedores. Con más de 10 años de experiencia, ofrecemos productos de la más alta calidad seleccionados cuidadosamente para ti.`}
              </p>
              {!store.aboutUs && (
                <p className="text-stone-600 leading-relaxed">
                  Creemos que cada hogar merece piezas especiales que cuenten una historia. Por eso, trabajamos con los mejores proveedores para traerte diseños exclusivos que combinan funcionalidad y belleza.
                </p>
              )}
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-serif text-amber-700 mb-2">10+</div>
                  <div className="text-sm text-stone-600">Años</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-serif text-amber-700 mb-2">5k+</div>
                  <div className="text-sm text-stone-600">Clientes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-serif text-amber-700 mb-2">100%</div>
                  <div className="text-sm text-stone-600">Calidad</div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] animate-fade-in bg-stone-100 flex items-center justify-center">
              {store.logoUrl ? (
                <Image
                  src={store.logoUrl}
                  alt={store.name}
                  width={250}
                  height={250}
                  className="object-contain opacity-40"
                />
              ) : (
                <div className="text-9xl font-serif text-stone-200">
                  {store.name.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl mb-4">Contacto</h2>
            <p className="text-stone-300">Estamos aquí para asesorarte en cada paso</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Newsletter */}
            <div className="md:col-span-2">
              <h3 className="font-serif text-2xl mb-4">Mantente Conectado</h3>
              <p className="text-stone-300 mb-6">
                Suscríbete para recibir las últimas novedades y ofertas exclusivas
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-6 py-3 bg-stone-800 border border-stone-700 text-white placeholder-stone-400 focus:outline-none focus:border-amber-600 transition-colors"
                />
                <button className="px-8 py-3 bg-amber-700 text-white hover:bg-amber-600 transition-colors font-medium">
                  Suscribirse
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {store.email && (
                <div>
                  <h4 className="font-serif text-lg mb-2">Email</h4>
                  <a href={`mailto:${store.email}`} className="text-stone-300 hover:text-amber-500 transition-colors">
                    {store.email}
                  </a>
                </div>
              )}
              {store.phone && (
                <div>
                  <h4 className="font-serif text-lg mb-2">Teléfono</h4>
                  <a href={`tel:${store.phone}`} className="text-stone-300 hover:text-amber-500 transition-colors">
                    {store.phone}
                  </a>
                </div>
              )}
              {(store.address || store.city) && (
                <div>
                  <h4 className="font-serif text-lg mb-2">Dirección</h4>
                  <p className="text-stone-300">
                    {store.address}{store.city && `, ${store.city}`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Social Links */}
          {(store.facebookUrl || store.instagramUrl || store.whatsappNumber) && (
            <div className="border-t border-stone-800 pt-12 text-center">
              <div className="flex justify-center gap-8">
                {store.facebookUrl && (
                  <a
                    href={store.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-300 hover:text-amber-500 transition-colors font-medium"
                  >
                    Facebook
                  </a>
                )}
                {store.instagramUrl && (
                  <a
                    href={store.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-300 hover:text-amber-500 transition-colors font-medium"
                  >
                    Instagram
                  </a>
                )}
                {store.whatsappNumber && (
                  <a
                    href={`https://wa.me/${store.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-300 hover:text-amber-500 transition-colors font-medium"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Copyright */}
          <div className="border-t border-stone-800 pt-12 mt-12 text-center">
            <p className="text-stone-400">
              © {new Date().getFullYear()} {store.name}. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
