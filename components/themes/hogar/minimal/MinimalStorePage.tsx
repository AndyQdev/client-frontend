'use client'

import { Store, Product, Category } from '@/lib/types'
import MinimalStoreHeader from './MinimalStoreHeader'
import MinimalProductCard from './MinimalProductCard'
import MinimalCartSheet from './MinimalCartSheet'
import { useState } from 'react'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { useProductFilters } from '@/hooks/useProductFilters'

interface MinimalStorePageProps {
  store: Store
  products: Product[]
  categories: Category[]
}

export default function MinimalStorePage({ store, products, categories }: MinimalStorePageProps) {
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
    <div id="inicio" className="min-h-screen bg-white">
      <MinimalStoreHeader store={store} onCartClick={() => setIsCartOpen(true)} />

      {/* Cart Sheet */}
      <MinimalCartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} storeSlug={store.slug} />

      {/* Hero ultra minimal - REDUCIDO para priorizar productos */}
      <section className="bg-gray-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-8 leading-tight animate-fade-in-down">
              {store.heroTitle || store.description || "Simple. Clean. Essential."}
            </h1>
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed animate-fade-in-up delay-200">
                {store.description || "Carefully curated products for a mindful lifestyle."}
              </p>
              <div className="animate-fade-in-up delay-400">
                <a href="#productos" className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                  Shop Collection
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Productos con máximo espacio */}
      <section id="productos" className="max-w-6xl mx-auto px-6 lg:px-8 pb-16 lg:pb-24">
        {/* Buscador */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              disabled={isPending}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* Filtros ultra simples */}
        <div className="mb-16">
          <div className="flex flex-wrap gap-8 text-sm">
            <button
              onClick={() => handleCategoryChange(null)}
              disabled={isPending}
              className={`pb-1 transition-colors ${
                selectedCategory === null
                  ? 'text-gray-900 border-b border-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              } disabled:opacity-50`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                disabled={isPending}
                className={`pb-1 transition-colors ${
                  selectedCategory === category.id
                    ? 'text-gray-900 border-b border-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                } disabled:opacity-50`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            {selectedCategory && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
          </p>
        </div>

        {/* Grid con espacios generosos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${(index % 6) * 100}ms` }}
            >
              <MinimalProductCard product={product} storeSlug={store.slug} />
            </div>
          ))}
        </div>

      </section>

      {/* About Section */}
      <section id="about" className="border-t border-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-light text-gray-900 mb-6">About Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {store.aboutUs || `At ${store.name}, we believe in simplicity and quality. Every product is carefully selected to bring you the best in design and functionality.`}
              </p>
              {!store.aboutUs && (
                <p className="text-gray-600 leading-relaxed">
                  Our mission is to curate timeless pieces that enhance your everyday life with beauty and purpose.
                </p>
              )}
            </div>
            <div className="relative h-80 bg-gray-50 flex items-center justify-center animate-fade-in delay-300">
              {store.logoUrl ? (
                <Image
                  src={store.logoUrl}
                  alt={store.name}
                  width={200}
                  height={200}
                  className="object-contain opacity-30"
                />
              ) : (
                <div className="text-9xl font-light text-gray-200">
                  {store.name.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="border-t border-gray-100 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Newsletter minimal */}
            <div className="animate-slide-in-left">
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
                <button className="ml-6 text-gray-900 hover:text-gray-600 transition-all duration-300 text-sm font-medium transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 animate-fade-in delay-200">
              {store.email && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Email</h4>
                  <a href={`mailto:${store.email}`} className="text-gray-600 hover:text-gray-900 transition-colors">
                    {store.email}
                  </a>
                </div>
              )}
              {store.phone && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Phone</h4>
                  <a href={`tel:${store.phone}`} className="text-gray-600 hover:text-gray-900 transition-colors">
                    {store.phone}
                  </a>
                </div>
              )}
              {(store.address || store.city) && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Address</h4>
                  <p className="text-gray-600">
                    {store.address}{store.city && `, ${store.city}`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Social Links */}
          {(store.facebookUrl || store.instagramUrl || store.whatsappNumber) && (
            <div className="border-t border-gray-200 pt-12 mt-12 flex justify-center gap-8">
              {store.facebookUrl && (
                <a
                  href={store.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                  Facebook
                </a>
              )}
              {store.instagramUrl && (
                <a
                  href={store.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                  Instagram
                </a>
              )}
              {store.whatsappNumber && (
                <a
                  href={`https://wa.me/${store.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                  WhatsApp
                </a>
              )}
            </div>
          )}

          {/* Copyright */}
          <div className="border-t border-gray-200 pt-12 mt-12 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} {store.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}