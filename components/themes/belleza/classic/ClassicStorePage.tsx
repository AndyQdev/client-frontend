'use client'

import { Store, Product, Category } from '@/lib/types'
import ClassicStoreHeader from './ClassicStoreHeader'
import ClassicProductCard from './ClassicProductCard'
import ClassicCartSheet from './ClassicCartSheet'
import { Crown, Shield, Award, Truck, Headphones, Search } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { useProductFilters } from '@/hooks/useProductFilters'

interface ClassicStorePageProps {
  store: Store
  products: Product[]
  categories: Category[]
}

export default function ClassicStorePage({ store, products, categories }: ClassicStorePageProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const {
    products: filteredProducts,
    search,
    selectedCategory,
    isPending,
    handleSearchChange,
    handleCategoryChange
  } = useProductFilters(store.id, products)
  return (
    <div id="inicio" className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-cream-100">
      <ClassicStoreHeader store={store} onCartClick={() => setIsCartOpen(true)} />

      {/* Hero banner clásico */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100 via-cream-50 to-amber-100"></div>

        {/* Patrones decorativos */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-amber-400 rounded-full animate-float"></div>
          <div className="absolute top-20 right-20 w-20 h-20 border border-amber-300 rotate-45 animate-float delay-200"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border-2 border-amber-400 rounded-full animate-float delay-400"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6 animate-scale-in">
              <Crown className="w-12 h-12 text-amber-600" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-serif text-amber-900 mb-6 leading-tight animate-fade-in-down delay-100">
              {store.heroTitle || <><span>Timeless</span> <span className="italic text-amber-700">Elegance</span></>}
            </h1>
            <div className="flex justify-center mb-8 animate-scale-in delay-200">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-px bg-amber-400"></div>
                <div className="w-4 h-4 border-2 border-amber-500 rotate-45"></div>
                <div className="w-16 h-px bg-amber-400"></div>
              </div>
            </div>
            <p className="text-lg lg:text-xl text-amber-800 font-serif leading-relaxed mb-8 italic animate-fade-in-up delay-300">
              {store.description || "Discover our heritage collection of handcrafted treasures, where tradition meets uncompromising quality."}
            </p>
          </div>
        </div>
      </section>

      {/* Productos con filtros clásicos */}
      <section id="productos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        {/* Título y filtros */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-serif text-amber-900 mb-6">
            Our <span className="italic">Collection</span>
          </h2>
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-px bg-amber-400"></div>
              <div className="w-4 h-4 border-2 border-amber-500 rotate-45"></div>
              <div className="w-20 h-px bg-amber-400"></div>
            </div>
          </div>

          {/* Buscador clásico */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search our collection..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                disabled={isPending}
                className="w-full px-6 py-4 pr-14 border-2 border-amber-300 rounded-lg text-amber-900 placeholder-amber-500 focus:outline-none focus:border-amber-500 font-serif text-lg shadow-sm transition-all duration-300 disabled:opacity-50"
              />
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-amber-500 w-5 h-5" />
            </div>
          </div>

          {/* Filtros clásicos */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <button
              onClick={() => handleCategoryChange(null)}
              disabled={isPending}
              className={`px-6 py-3 font-serif transition-colors rounded disabled:opacity-50 ${
                selectedCategory === null
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'border border-amber-300 text-amber-800 hover:bg-amber-100'
              }`}
            >
              All Treasures
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                disabled={isPending}
                className={`px-6 py-3 font-serif transition-colors rounded disabled:opacity-50 ${
                  selectedCategory === category.id
                    ? 'bg-amber-600 text-white hover:bg-amber-700'
                    : 'border border-amber-300 text-amber-800 hover:bg-amber-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de productos clásico */}
        {(filteredProducts && filteredProducts.length > 0) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${(index % 6) * 100}ms` }}
              >
                <ClassicProductCard product={product} storeSlug={store.slug} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 mb-16">
            <div className="max-w-lg mx-auto bg-gradient-to-br from-amber-50 to-cream-100 rounded-lg p-12 border-2 border-amber-200">
              <Crown className="w-20 h-20 text-amber-400 mx-auto mb-6 animate-bounce" />
              <h3 className="text-3xl font-serif text-amber-900 mb-4">No Treasures Found</h3>
              <p className="text-amber-700 font-serif text-lg mb-8">
                {selectedCategory 
                  ? 'This collection is currently being curated' 
                  : 'Our artisans are preparing new masterpieces'
                }
              </p>
              {selectedCategory && (
                <button
                  onClick={() => handleCategoryChange(null)}
                  disabled={isPending}
                  className="bg-amber-600 text-white px-8 py-3 font-serif hover:bg-amber-700 transition-all duration-300 rounded disabled:opacity-50"
                >
                  Browse All Collections
                </button>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Features Section - MOVIDO DESPUÉS DE PRODUCTOS PARA MAYOR PROFESIONALISMO */}
      <section className="py-16 bg-white border-y border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-amber-900 mb-4">Why Choose Us</h2>
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-px bg-amber-400"></div>
                <div className="w-4 h-4 border-2 border-amber-500 rotate-45"></div>
                <div className="w-16 h-px bg-amber-400"></div>
              </div>
            </div>
            <p className="text-amber-700 font-serif italic">The qualities that set us apart</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {(store.features && store.features.length > 0 ? store.features : [
              { icon: 'Crown', title: 'Premium Quality', description: 'Handcrafted with the finest materials' },
              { icon: 'Shield', title: 'Lifetime Warranty', description: 'Built to last generations' },
              { icon: 'Award', title: 'Heritage Since 1892', description: 'Over a century of excellence' }
            ]).map((feature, i) => {
              const IconComponent = feature.icon === 'Crown' ? Crown :
                                   feature.icon === 'Shield' ? Shield :
                                   feature.icon === 'Award' ? Award :
                                   feature.icon === 'Truck' ? Truck :
                                   Headphones
              return (
                <div
                  key={i}
                  className="text-center animate-fade-in-up"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <IconComponent className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="text-xl font-serif text-amber-900 mb-2">{feature.title}</h3>
                  <p className="text-amber-700 font-serif">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-serif text-amber-900 mb-6">About Us</h2>
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-px bg-amber-400"></div>
                <div className="w-4 h-4 border-2 border-amber-500 rotate-45"></div>
                <div className="w-20 h-px bg-amber-400"></div>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <p className="text-amber-800 font-serif leading-relaxed text-lg mb-4">
                {store.aboutUs || `At ${store.name}, we uphold a tradition of excellence that spans generations. Each piece in our collection represents the pinnacle of craftsmanship and timeless beauty.`}
              </p>
              {!store.aboutUs && (
                <p className="text-amber-800 font-serif leading-relaxed text-lg">
                  Our heritage is built on uncompromising quality, meticulous attention to detail, and a dedication to preserving the finest traditions of our craft.
                </p>
              )}
            </div>
            <div className="relative h-96 bg-gradient-to-br from-amber-100 to-cream-100 rounded-lg flex items-center justify-center animate-fade-in delay-300">
              {store.logoUrl ? (
                <Image
                  src={store.logoUrl}
                  alt={store.name}
                  width={250}
                  height={250}
                  className="object-contain opacity-40"
                />
              ) : (
                <div className="text-9xl font-serif text-amber-300">
                  {store.name.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="py-20 bg-gradient-to-br from-amber-50 via-white to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-serif text-amber-900 mb-6">Contact Us</h2>
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-px bg-amber-400"></div>
                <div className="w-4 h-4 border-2 border-amber-500 rotate-45"></div>
                <div className="w-20 h-px bg-amber-400"></div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Newsletter */}
            <div className="bg-white rounded-lg p-8 border-2 border-amber-200 animate-slide-in-left">
              <h3 className="text-2xl font-serif text-amber-900 mb-4">
                Join Our <span className="italic">Heritage Circle</span>
              </h3>
              <p className="text-amber-800 font-serif mb-6 italic">
                Receive exclusive invitations and early access to limited collections.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-6 py-3 border-2 border-amber-300 rounded-l text-amber-900 placeholder-amber-500 focus:outline-none focus:border-amber-500 font-serif"
                />
                <button className="bg-amber-600 text-white px-8 py-3 font-serif hover:bg-amber-700 transition-all duration-300 rounded-r transform hover:scale-105">
                  Join
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 animate-fade-in delay-200">
              {store.email && (
                <div>
                  <h4 className="font-serif text-lg text-amber-900 mb-2">Email</h4>
                  <a href={`mailto:${store.email}`} className="text-amber-700 hover:text-amber-600 transition-colors font-serif">
                    {store.email}
                  </a>
                </div>
              )}
              {store.phone && (
                <div>
                  <h4 className="font-serif text-lg text-amber-900 mb-2">Phone</h4>
                  <a href={`tel:${store.phone}`} className="text-amber-700 hover:text-amber-600 transition-colors font-serif">
                    {store.phone}
                  </a>
                </div>
              )}
              {(store.address || store.city) && (
                <div>
                  <h4 className="font-serif text-lg text-amber-900 mb-2">Address</h4>
                  <p className="text-amber-700 font-serif">
                    {store.address}{store.city && `, ${store.city}`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Social Links */}
          {(store.facebookUrl || store.instagramUrl || store.whatsappNumber) && (
            <div className="border-t border-amber-200 pt-12 text-center">
              <div className="flex justify-center gap-8">
                {store.facebookUrl && (
                  <a
                    href={store.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-700 hover:text-amber-600 transition-colors font-serif"
                  >
                    Facebook
                  </a>
                )}
                {store.instagramUrl && (
                  <a
                    href={store.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-700 hover:text-amber-600 transition-colors font-serif"
                  >
                    Instagram
                  </a>
                )}
                {store.whatsappNumber && (
                  <a
                    href={`https://wa.me/${store.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-700 hover:text-amber-600 transition-colors font-serif"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Copyright */}
          <div className="border-t border-amber-200 pt-12 mt-12 text-center">
            <p className="text-amber-700 font-serif">
              © {new Date().getFullYear()} {store.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Cart Sheet */}
      <ClassicCartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} storeSlug={store.slug} />
    </div>
  )
}