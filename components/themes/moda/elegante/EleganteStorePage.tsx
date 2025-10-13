'use client'

import { Store, Product, Category } from '@/lib/types'
import EleganteStoreHeader from './EleganteStoreHeader'
import EleganteProductCard from './EleganteProductCard'
import EleganteCartSheet from './EleganteCartSheet'
import { useState } from 'react'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { useProductFilters } from '@/hooks/useProductFilters'

interface EleganteStorePageProps {
  store: Store
  products: Product[]
  categories: Category[]
}

export default function EleganteStorePage({ store, products, categories }: EleganteStorePageProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Use backend filters
  const {
    products: filteredProducts,
    search,
    selectedCategory,
    isPending,
    handleSearchChange,
    handleCategoryChange
  } = useProductFilters(store.id, products)

  return (
    <div id="inicio" className="min-h-screen bg-white">
      {/* Header elegante */}
      <EleganteStoreHeader store={store} onCartClick={() => setIsCartOpen(true)} />

      {/* Cart Sheet */}
      <EleganteCartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} storeSlug={store.slug} />

      {/* Banner hero minimalista y elegante - REDUCIDO para priorizar productos */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-50"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-thin text-gray-900 mb-8 tracking-wider uppercase animate-fade-in-down">
            {store.heroTitle || store.name}
          </h1>
          <div className="w-24 h-px bg-black mx-auto mb-8 animate-scale-in delay-200"></div>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto tracking-wide animate-fade-in-up delay-300">
            {store.description || "Descubre nuestra colección cuidadosamente seleccionada de piezas atemporales que definen la elegancia moderna"}
          </p>

          <div className="mt-12 animate-fade-in-up delay-500">
            <a href="#productos" className="inline-block bg-black text-white px-12 py-4 text-sm uppercase tracking-widest font-light hover:bg-gray-800 transition-all duration-500 transform hover:scale-105">
              Explorar Colección
            </a>
          </div>
        </div>

        {/* Elementos decorativos minimalistas */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-px h-16 bg-gray-300"></div>
        </div>
      </section>

      {/* Productos Section - POSICIONADO INMEDIATAMENTE DESPUÉS DEL HERO */}
      <section id="productos" className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Search Bar elegante */}
          <div className="max-w-2xl mx-auto mb-16 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                disabled={isPending}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 rounded-none focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300 disabled:opacity-50 font-light tracking-wide"
              />
            </div>
          </div>

          {/* Navegación de categorías elegante */}
          <div className="text-center mb-16">
            <div className="flex flex-wrap justify-center gap-12">
              <button
                onClick={() => handleCategoryChange(null)}
                disabled={isPending}
                className={`text-sm pb-1 uppercase tracking-widest font-light transition-colors duration-300 disabled:opacity-50 ${
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
                  onClick={() => handleCategoryChange(category.id)}
                  disabled={isPending}
                  className={`text-sm pb-1 uppercase tracking-widest font-light transition-colors duration-300 disabled:opacity-50 ${
                    selectedCategory === category.id
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
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-4xl font-thin text-gray-900 mb-4 tracking-wider uppercase">
                Nuestra Selección
              </h2>
              <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
              <p className="text-gray-600 font-light tracking-wide">
                {filteredProducts?.length || 0} {(filteredProducts?.length || 0) === 1 ? 'pieza' : 'piezas'} cuidadosamente {(filteredProducts?.length || 0) === 1 ? 'seleccionada' : 'seleccionadas'}
                {selectedCategory && (
                  <span className="ml-2">
                    en <span className="font-normal">{categories.find(c => c.id === selectedCategory)?.name}</span>
                  </span>
                )}
              </p>
            </div>

            {(filteredProducts && filteredProducts.length > 0) ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 lg:gap-16">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${(index % 8) * 100}ms` }}
                  >
                    <EleganteProductCard product={product} storeSlug={store.slug} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <div className="text-6xl font-thin text-gray-300">∅</div>
                  </div>
                  <h3 className="text-2xl font-thin text-gray-900 mb-4 tracking-wider uppercase">
                    Sin Productos
                  </h3>
                  <div className="w-12 h-px bg-gray-300 mx-auto mb-6"></div>
                  <p className="text-gray-600 font-light text-lg mb-8">
                    {selectedCategory 
                      ? 'Esta categoría no tiene productos disponibles en este momento' 
                      : 'No hay productos disponibles actualmente'
                    }
                  </p>
                  {selectedCategory && (
                    <button
                      onClick={() => handleCategoryChange(null)}
                      disabled={isPending}
                      className="bg-black text-white px-8 py-3 text-sm uppercase tracking-widest font-light hover:bg-gray-800 transition-all duration-300 disabled:opacity-50"
                    >
                      Ver Toda la Colección
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="border-t border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-thin text-gray-900 mb-4 tracking-wider uppercase">
              Acerca de Nosotros
            </h2>
            <div className="w-16 h-px bg-gray-300 mx-auto mb-8"></div>
            <p className="text-sm text-gray-500 uppercase tracking-widest font-light">
              Nuestra Historia
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <p className="text-gray-600 font-light leading-relaxed text-lg">
                {store.aboutUs || `En ${store.name}, creemos en la elegancia atemporal y la calidad excepcional. Cada pieza de nuestra colección ha sido seleccionada con cuidado para reflejar sofisticación y estilo refinado.`}
              </p>
              {!store.aboutUs && (
                <p className="text-gray-600 font-light leading-relaxed text-lg">
                  Nuestra misión es ofrecer piezas exclusivas que trasciendan las tendencias pasajeras, creando un guardarropa que perdure en el tiempo con la misma elegancia del primer día.
                </p>
              )}
              <div className="pt-8">
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div className="animate-fade-in-up delay-100">
                    <div className="text-3xl font-thin text-gray-900 mb-2">10+</div>
                    <div className="text-sm text-gray-500 uppercase tracking-widest font-light">Años</div>
                  </div>
                  <div className="animate-fade-in-up delay-200">
                    <div className="text-3xl font-thin text-gray-900 mb-2">50k+</div>
                    <div className="text-sm text-gray-500 uppercase tracking-widest font-light">Clientes</div>
                  </div>
                  <div className="animate-fade-in-up delay-300">
                    <div className="text-3xl font-thin text-gray-900 mb-2">100%</div>
                    <div className="text-sm text-gray-500 uppercase tracking-widest font-light">Premium</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] bg-gray-50 flex items-center justify-center animate-fade-in delay-300">
              {store.logoUrl ? (
                <Image
                  src={store.logoUrl}
                  alt={store.name}
                  width={200}
                  height={200}
                  className="object-contain opacity-50"
                />
              ) : (
                <div className="text-9xl font-thin text-gray-200">
                  {store.name.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer Section */}
      <footer id="contact" className="border-t border-gray-100 py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-thin text-gray-900 mb-4 tracking-wider uppercase">
              Contacto
            </h2>
            <div className="w-16 h-px bg-gray-300 mx-auto mb-8"></div>
            <p className="text-sm text-gray-500 uppercase tracking-widest font-light">
              Estamos a su disposición
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Newsletter */}
            <div className="md:col-span-2 text-center md:text-left animate-slide-in-left">
              <h3 className="text-2xl font-thin text-gray-900 mb-4 tracking-wider uppercase">
                Manténgase Informado
              </h3>
              <p className="text-gray-600 font-light mb-8 tracking-wide">
                Reciba noticias sobre nuevas colecciones y eventos exclusivos
              </p>
              <div className="flex max-w-md mx-auto md:mx-0">
                <input
                  type="email"
                  placeholder="Ingrese su correo electrónico"
                  className="flex-1 px-6 py-4 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-colors duration-300 font-light"
                />
                <button className="bg-black text-white px-8 py-4 text-sm uppercase tracking-widest font-light hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                  Suscribir
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 text-center md:text-left animate-fade-in delay-200">
              {store.email && (
                <div>
                  <h4 className="text-sm text-gray-500 uppercase tracking-widest font-light mb-2">Email</h4>
                  <a href={`mailto:${store.email}`} className="text-gray-900 hover:text-black transition-colors font-light">
                    {store.email}
                  </a>
                </div>
              )}
              {store.phone && (
                <div>
                  <h4 className="text-sm text-gray-500 uppercase tracking-widest font-light mb-2">Teléfono</h4>
                  <a href={`tel:${store.phone}`} className="text-gray-900 hover:text-black transition-colors font-light">
                    {store.phone}
                  </a>
                </div>
              )}
              {(store.address || store.city) && (
                <div>
                  <h4 className="text-sm text-gray-500 uppercase tracking-widest font-light mb-2">Ubicación</h4>
                  <p className="text-gray-900 font-light">
                    {store.address}{store.city && `, ${store.city}`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Social Links */}
          {(store.facebookUrl || store.instagramUrl || store.whatsappNumber) && (
            <div className="border-t border-gray-200 pt-12 text-center">
              <div className="flex justify-center space-x-8">
                {store.facebookUrl && (
                  <a
                    href={store.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black transition-colors duration-300"
                  >
                    <span className="text-sm uppercase tracking-widest font-light">Facebook</span>
                  </a>
                )}
                {store.instagramUrl && (
                  <a
                    href={store.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black transition-colors duration-300"
                  >
                    <span className="text-sm uppercase tracking-widest font-light">Instagram</span>
                  </a>
                )}
                {store.whatsappNumber && (
                  <a
                    href={`https://wa.me/${store.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black transition-colors duration-300"
                  >
                    <span className="text-sm uppercase tracking-widest font-light">WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Copyright */}
          <div className="border-t border-gray-200 pt-12 mt-12 text-center">
            <p className="text-sm text-gray-500 font-light tracking-wide">
              © {new Date().getFullYear()} {store.name}. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}