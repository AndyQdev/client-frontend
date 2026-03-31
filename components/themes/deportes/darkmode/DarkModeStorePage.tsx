'use client'

import { Store, Product, Category } from '@/lib/types'
import DarkModeStoreHeader from './DarkModeStoreHeader'
import DarkModeProductCard from './DarkModeProductCard'
import DarkModeCartSheet from './DarkModeCartSheet'
import DarkModeMobileMenu from './DarkModeMobileMenu'
import { Sparkles, Star, TrendingUp, Mail, Search, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react'
import { getCategoryIcon } from '@/lib/category-icons'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useInfiniteProducts } from '@/hooks/useInfiniteProducts'
import { useCart } from '@/lib/cart-context'

interface DarkModeStorePageProps {
  store: Store
  products: Product[]
  categories: Category[]
}

export default function DarkModeStorePage({ store, products, categories }: DarkModeStorePageProps) {
  const { isCartOpen, openCart, closeCart } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
    <div className="min-h-screen bg-zinc-900">
      <DarkModeStoreHeader 
        store={store} 
        onCartClick={openCart}
        onMenuClick={() => setIsMobileMenuOpen(true)}
      />

      {/* Cart Sheet */}
      <DarkModeCartSheet isOpen={isCartOpen} onClose={closeCart} storeSlug={store.slug} />

      {/* Mobile Menu */}
      <DarkModeMobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        storeSlug={store.slug}
        storeName={store.name}
      />

      {/* Hero Section - Minimalista */}
      <section className="relative bg-zinc-900 border-b border-zinc-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
          <div className="max-w-4xl">
            {/* Tag destacado */}
            <div className="flex items-center gap-3 mb-6 animate-slide-in-left">
              <div className="w-12 h-px bg-yellow-500"></div>
              <span className="text-xs uppercase tracking-[0.2em] text-yellow-500 font-semibold">
                Edición Premium
              </span>
            </div>

            {/* Título principal */}
            <h1 className="text-5xl lg:text-7xl font-bold text-zinc-100 mb-6 tracking-tight leading-tight animate-fade-in-down delay-100">
              {store.name}
            </h1>

            {/* Descripción */}
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8 animate-fade-in-up delay-200">
              {store.description || 'Descubre nuestra colección exclusiva de productos premium seleccionados para ti.'}
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6 max-w-xl">
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-5 border border-zinc-700/50 animate-scale-in delay-300">
                <div className="text-3xl font-bold text-yellow-500 mb-1">{products.length}</div>
                <div className="text-xs uppercase tracking-wider text-zinc-500">Productos</div>
              </div>
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-5 border border-zinc-700/50 animate-scale-in delay-400">
                <div className="text-3xl font-bold text-yellow-500 mb-1">{categories.length}</div>
                <div className="text-xs uppercase tracking-wider text-zinc-500">Categorías</div>
              </div>
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-5 border border-zinc-700/50 animate-scale-in delay-500">
                <div className="text-3xl font-bold text-yellow-500 mb-1">5.0</div>
                <div className="text-xs uppercase tracking-wider text-zinc-500">Rating</div>
              </div>
            </div>
          </div>

          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-float"></div>
        </div>
      </section>

      {/* Products Section - POSICIONADO INMEDIATAMENTE DESPUÉS DEL HERO */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Barra de Búsqueda y Categorías */}
        <div className="sticky top-16 z-30 bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-lg p-6 mb-12">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors disabled:opacity-50"
              />
            </div>

            {/* Category Filters - Carousel */}
            <div className="relative">
              <button
                onClick={() => scrollCategories('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-yellow-500 text-black rounded-full shadow-md items-center justify-center hidden sm:flex"
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
                  className={`shrink-0 flex flex-col items-center gap-1.5 px-5 py-3 rounded-full transition-all disabled:opacity-50 ${
                    selectedCategory === null ? 'bg-yellow-500 text-black shadow-lg' : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${selectedCategory === null ? 'bg-yellow-400' : 'bg-zinc-700'}`}>
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide whitespace-nowrap">Todo</span>
                </button>

                {categories.map((category) => {
                  const Icon = getCategoryIcon(category.name, category.icon)
                  const isActive = selectedCategory === category.id
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      disabled={isLoading}
                      className={`shrink-0 flex flex-col items-center gap-1.5 px-5 py-3 rounded-full transition-all disabled:opacity-50 ${
                        isActive ? 'bg-yellow-500 text-black shadow-lg' : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-yellow-400' : 'bg-zinc-700'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wide whitespace-nowrap">{category.name}</span>
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => scrollCategories('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-yellow-500 text-black rounded-full shadow-md items-center justify-center hidden sm:flex"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Header de Sección */}
        <div className="mb-12 animate-fade-in-up">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl lg:text-5xl font-bold text-zinc-100 tracking-tight">
              {selectedCategory
                ? categories.find(c => c.slug === selectedCategory)?.name || 'Catálogo'
                : 'Catálogo Completo'}
            </h2>
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-zinc-500 text-sm">
            {filteredProducts?.length || 0} {(filteredProducts?.length || 0) === 1 ? 'producto disponible' : 'productos disponibles'}
          </p>
        </div>

        {/* Products Grid */}
        {isLoading && filteredProducts.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-zinc-800 rounded-xl overflow-hidden animate-pulse">
                <div className="aspect-square bg-zinc-700" />
                <div className="p-4">
                  <div className="h-4 bg-zinc-700 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-zinc-700 rounded w-1/2 mb-4" />
                  <div className="h-5 bg-zinc-700 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product: Product, index: number) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${(index % 9) * 100}ms` }}
                >
                  <DarkModeProductCard product={product} storeSlug={store.slug} />
                </div>
              ))}
            </div>

            {/* Intersection Observer Target */}
            <div ref={loadMoreRef} className="flex justify-center py-8">
              {isFetchingNextPage && (
                <div className="flex items-center justify-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-bounce" />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-24">
            <div className="inline-block bg-zinc-800/50 backdrop-blur-sm rounded-lg p-16 border border-zinc-700 animate-scale-in">
              <Sparkles className="w-20 h-20 text-yellow-500 mx-auto mb-6 animate-bounce" />
              <h3 className="text-2xl font-bold text-zinc-300 mb-4">Sin Productos Disponibles</h3>
              <p className="text-zinc-500 mb-8">
                {selectedCategory 
                  ? 'No hay productos en esta categoría actualmente' 
                  : 'No hay productos disponibles en este momento'
                }
              </p>
              {selectedCategory && (
                <button
                  onClick={() => handleCategoryChange(null)}
                  disabled={isLoading}
                  className="px-6 py-3 bg-yellow-500 text-black rounded-full font-semibold hover:bg-yellow-400 transition-colors disabled:opacity-50"
                >
                  Ver Todos
                </button>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="bg-zinc-800 border-t border-zinc-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
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
            <div className="animate-fade-in delay-200">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-6 py-4 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-yellow-500 transition-colors"
                />
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg font-semibold uppercase tracking-wide transition-all whitespace-nowrap transform hover:scale-105">
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