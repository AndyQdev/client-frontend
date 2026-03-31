'use client'

import { Store, Product, Category } from '@/lib/types'
import MinimalStoreHeader from './MinimalStoreHeader'
import MinimalProductCard from './MinimalProductCard'
import MinimalCartSheet from './MinimalCartSheet'
import { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import { Search, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react'
import { getCategoryIcon } from '@/lib/category-icons'
import { useInfiniteProducts } from '@/hooks/useInfiniteProducts'
import { useCart } from '@/lib/cart-context'

interface MinimalStorePageProps {
  store: Store
  products: Product[]
  categories: Category[]
}

export default function MinimalStorePage({ store, products, categories }: MinimalStorePageProps) {
  const { isCartOpen, openCart, closeCart } = useCart()
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)

  const scrollCategories = (dir: 'left' | 'right') => {
    categoriesRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' })
  }

  // Debounce del término de búsqueda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [search])

  // Hook de productos con scroll infinito
  const {
    data: productsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteProducts({
    storeId: store.id,
    pageSize: 9,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(selectedCategory && { categoryId: selectedCategory }),
  })

  // Intersection Observer para scroll infinito
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  // Productos aplanados de todas las páginas
  const filteredProducts = useMemo(() => {
    if (!productsData) return []
    const pages = (productsData as any).pages
    if (!pages) return []
    return pages.flatMap((page: any) => 
      page.data.map((inventory: any) => ({
        id: inventory.product.id,
        storeProductId: inventory.storeProductId,
        name: inventory.product.name,
        price: inventory.product.price || 0,
        originalPrice: inventory.product.originalPrice,
        images: inventory.product.imageUrls || [],
        description: inventory.product.description,
        category: inventory.product.category,
        brand: inventory.product.brand,
        sku: inventory.product.sku,
        stock: inventory.stockQuantity || 0,
        isFeatured: inventory.product.metadata?.isFeatured || false,
      }))
    )
  }, [productsData])

  const handleSearchChange = (value: string) => {
    setSearch(value)
  }

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId)
  }

  return (
    <div id="inicio" className="min-h-screen bg-white">
      <MinimalStoreHeader store={store} onCartClick={openCart} />

      {/* Cart Sheet */}
      <MinimalCartSheet isOpen={isCartOpen} onClose={closeCart} storeSlug={store.slug} />

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

      {/* Productos Section - POSICIONADO INMEDIATAMENTE DESPUÉS DEL HERO */}
      <section id="productos" className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        {/* Buscador */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              disabled={isLoading}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* Filtros ultra simples - Carousel */}
        <div className="mb-16">
          <div className="relative mb-4">
            <button
              onClick={() => scrollCategories('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-gray-900 text-white rounded-full shadow-md items-center justify-center hidden sm:flex"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div
              ref={categoriesRef}
              className="flex gap-3 overflow-x-auto pb-2 scroll-smooth px-1 sm:px-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              <button
                onClick={() => handleCategoryChange(null)}
                disabled={isLoading}
                className={`shrink-0 flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl transition-all disabled:opacity-50 ${
                  selectedCategory === null ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <div className={`p-2 rounded-lg ${selectedCategory === null ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium whitespace-nowrap">All</span>
              </button>

              {categories.map((category) => {
                const Icon = getCategoryIcon(category.name, category.icon)
                const isActive = selectedCategory === category.id
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    disabled={isLoading}
                    className={`shrink-0 flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl transition-all disabled:opacity-50 ${
                      isActive ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium whitespace-nowrap">{category.name}</span>
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => scrollCategories('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-gray-900 text-white rounded-full shadow-md items-center justify-center hidden sm:flex"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            {filteredProducts?.length || 0} {(filteredProducts?.length || 0) === 1 ? 'product' : 'products'}
            {selectedCategory && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
          </p>
        </div>

        {/* Grid con espacios generosos */}
        {isLoading && filteredProducts.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3" />
                <div className="h-3 bg-gray-100 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {filteredProducts.map((product: Product, index: number) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${(index % 9) * 100}ms` }}
                >
                  <MinimalProductCard product={product} storeSlug={store.slug} />
                </div>
              ))}
            </div>

            {/* Intersection Observer Target */}
            <div ref={loadMoreRef} className="flex justify-center py-8">
              {isFetchingNextPage && (
                <div className="flex items-center justify-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-sm mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-8">
                <div className="text-4xl font-light text-gray-400">∅</div>
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">Sin Productos</h3>
              <p className="text-gray-600 mb-8">
                {selectedCategory 
                  ? 'Esta categoría no tiene productos disponibles en este momento' 
                  : 'No hay productos disponibles actualmente'
                }
              </p>
              {selectedCategory && (
                <button
                  onClick={() => handleCategoryChange(null)}
                  disabled={isLoading}
                  className="bg-gray-900 text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition-all duration-300 disabled:opacity-50"
                >
                  Ver Todos los Productos
                </button>
              )}
            </div>
          </div>
        )}

      </section>

      {/* About Section */}
      <section id="about" className="border-t border-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Nosotros</h2>
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
                Manténte Informado
              </h3>
              <p className="text-gray-600 mb-8">
                Recibe actualizaciones sobre nuevos productos y ofertas exclusivas.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="flex-1 px-0 py-3 border-0 border-b border-gray-200 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                />
                <button className="ml-6 text-gray-900 hover:text-gray-600 transition-all duration-300 text-sm font-medium transform hover:scale-105">
                  Suscribirse
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 animate-fade-in delay-200">
              {store.email && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Correo</h4>
                  <a href={`mailto:${store.email}`} className="text-gray-600 hover:text-gray-900 transition-colors">
                    {store.email}
                  </a>
                </div>
              )}
              {store.phone && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Teléfono</h4>
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