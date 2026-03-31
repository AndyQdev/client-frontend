'use client'

import { Store, Product, Category } from '@/lib/types'
import ModernStoreHeader from './ModernStoreHeader'
import ModernProductGrid from './ModernProductGrid'
import ModernCartSheet from './ModernCartSheet'
import ModernMobileMenu from './ModernMobileMenu'
import { useState, useEffect, useRef, useMemo } from 'react'
import { Zap, Shield, Truck, HeadphonesIcon, Search, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react'
import { getCategoryIcon } from '@/lib/category-icons'
import { useInfiniteProducts } from '@/hooks/useInfiniteProducts'
import { useCart } from '@/lib/cart-context'

interface ModernStorePageProps {
  store: Store
  products: Product[]
  categories: Category[]
}

export default function ModernStorePage({ store, products, categories }: ModernStorePageProps) {
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
    <div id="inicio" className="min-h-screen bg-[#0F0F0F]">
      <ModernStoreHeader 
        store={store} 
        onCartClick={openCart}
        onMenuClick={() => setIsMobileMenuOpen(true)}
      />
      <ModernCartSheet isOpen={isCartOpen} onClose={closeCart} storeSlug={store.slug} />
      <ModernMobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        storeSlug={store.slug}
        storeName={store.name}
      />

      {/* Hero Section - Elegant Professional */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Fondo con grid animado */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#0F0F0F]"></div>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }}
          ></div>
          {/* Orbes brillantes dorados */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full px-6 py-2 mb-8">
              <Zap className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm font-semibold text-[#E5C158] uppercase tracking-wider">
                Tecnología de Vanguardia
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] via-[#F0D97D] to-[#D4AF37] bg-clip-text text-transparent animate-fade-in-up stagger-1">
              {store.heroTitle || store.name}
            </h1>

            <p className="text-xl lg:text-2xl text-[#A3A3A3] mb-10 max-w-3xl mx-auto animate-fade-in-up stagger-2">
              {store.description || 'Descubre nuestra selección exclusiva de productos de alta calidad'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3">
              <button className="btn-primary px-8 py-4 text-base">
                Explorar Productos
              </button>
              <button className="btn-secondary px-8 py-4 text-base">
                Ver Ofertas
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes gridMove {
            0% { transform: translateY(0); }
            100% { transform: translateY(50px); }
          }
        `}</style>
      </section>

      {/* Products Section - POSICIONADO INMEDIATAMENTE DESPUÉS DEL HERO */}
      <section id="productos" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="section-title">
              Productos Destacados
            </h2>
            <p className="section-subtitle">
              Descubre nuestra selección de tecnología premium
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-4 bg-[#1A1A1A] border border-[#2A2A2A] text-[#F5F5F5] placeholder-[#6B7280] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-300 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Category Filter - Carousel */}
          <div className="relative mb-12 animate-fade-in">
            <button
              onClick={() => scrollCategories('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-[#D4AF37] text-black rounded-full shadow-md items-center justify-center hidden sm:flex"
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
                className={`shrink-0 flex flex-col items-center gap-1.5 px-5 py-3 rounded-2xl transition-all disabled:opacity-50 ${
                  selectedCategory === null ? 'bg-[#D4AF37] text-black shadow-lg' : 'bg-[#1A1A1A] text-[#A3A3A3] hover:bg-[#2A2A2A] border border-[#2A2A2A]'
                }`}
              >
                <div className={`p-2 rounded-lg ${selectedCategory === null ? 'bg-[#B8941F]' : 'bg-[#2A2A2A]'}`}>
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium whitespace-nowrap">Todos</span>
              </button>

              {categories.map((category) => {
                const Icon = getCategoryIcon(category.name, category.icon)
                const isActive = selectedCategory === category.id
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    disabled={isLoading}
                    className={`shrink-0 flex flex-col items-center gap-1.5 px-5 py-3 rounded-2xl transition-all disabled:opacity-50 ${
                      isActive ? 'bg-[#D4AF37] text-black shadow-lg' : 'bg-[#1A1A1A] text-[#A3A3A3] hover:bg-[#2A2A2A] border border-[#2A2A2A]'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-[#B8941F]' : 'bg-[#2A2A2A]'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium whitespace-nowrap">{category.name}</span>
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => scrollCategories('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-[#D4AF37] text-black rounded-full shadow-md items-center justify-center hidden sm:flex"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Product Count */}
          <div className="mb-8 animate-fade-in">
            <p className="text-[#A3A3A3] text-center">
              Mostrando <span className="font-bold text-[#D4AF37]">{filteredProducts?.length || 0}</span> productos
              {selectedCategory && (
                <span className="ml-2">
                  en <span className="font-semibold text-[#E5C158]">{categories.find(c => c.id === selectedCategory)?.name}</span>
                </span>
              )}
            </p>
          </div>

          {/* Products Grid */}
          {isLoading && filteredProducts.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#1A1A1A] rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-square bg-[#2A2A2A]" />
                  <div className="p-4">
                    <div className="h-4 bg-[#2A2A2A] rounded w-3/4 mb-2" />
                    <div className="h-3 bg-[#2A2A2A] rounded w-1/2 mb-4" />
                    <div className="h-5 bg-[#2A2A2A] rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <ModernProductGrid products={filteredProducts} storeSlug={store.slug} />
              
              {/* Intersection Observer Target */}
              <div ref={loadMoreRef} className="flex justify-center py-8">
                {isFetchingNextPage && (
                  <div className="flex items-center justify-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="inline-block bg-[#1A1A1A] border border-[#2A2A2A] rounded-3xl p-16 animate-scale-in">
                <Zap className="w-20 h-20 text-[#D4AF37] mx-auto mb-6 animate-bounce" />
                <h3 className="text-3xl font-bold text-[#F5F5F5] mb-4">Sin Productos Disponibles</h3>
                <p className="text-[#A3A3A3] mb-8 text-lg">
                  {selectedCategory 
                    ? 'No hay productos en esta categoría actualmente' 
                    : 'No hay productos disponibles en este momento'
                  }
                </p>
                {selectedCategory && (
                  <button
                    onClick={() => handleCategoryChange(null)}
                    disabled={isLoading}
                    className="btn-primary px-8 py-3"
                  >
                    Ver Todos los Productos
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section - MOVIDO DESPUÉS DE PRODUCTOS PARA MAYOR PROFESIONALISMO */}
      {/* <section className="py-16 border-y border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">¿Por Qué Elegirnos?</h2>
            <p className="section-subtitle">Beneficios que nos distinguen</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {(store.features && store.features.length > 0 ? store.features : [
              { icon: 'Zap', title: 'Envío Express', description: '24-48 horas' },
              { icon: 'Shield', title: 'Garantía Total', description: '2 años' },
              { icon: 'Truck', title: 'Envío Gratis', description: 'Desde Bs 100.000' },
              { icon: 'HeadphonesIcon', title: 'Soporte 24/7', description: 'Siempre disponibles' }
            ]).map((feature, i) => {
              const IconComponent = feature.icon === 'Zap' ? Zap :
                                   feature.icon === 'Shield' ? Shield :
                                   feature.icon === 'Truck' ? Truck :
                                   HeadphonesIcon
              return (
                <div
                  key={i}
                  className="text-center group animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4 group-hover:border-[#D4AF37] transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-[#D4AF37] group-hover:text-[#E5C158] transition-colors" />
                  </div>
                  <h3 className="text-[#F5F5F5] font-semibold mb-1">{feature.title}</h3>
                  <p className="text-[#A3A3A3] text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section> */}

      {/* About Us Section */}
      <section id="about" className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="section-title">
              Acerca de Nosotros
            </h2>
            <p className="section-subtitle">
              Conoce nuestra historia y compromiso con la excelencia
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <p className="text-[#A3A3A3] leading-relaxed text-lg">
                {store.aboutUs || `En ${store.name}, nos dedicamos a ofrecer productos de la más alta calidad. Con años de experiencia en el mercado, hemos construido relaciones sólidas con las mejores marcas.`}
              </p>
              {!store.aboutUs && (
                <p className="text-[#A3A3A3] leading-relaxed text-lg">
                  Nuestra misión es ofrecer productos excepcionales con precios competitivos y un servicio al cliente de primera clase. Cada producto es cuidadosamente seleccionado para garantizar que cumpla con nuestros estándares de calidad.
                </p>
              )}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#D4AF37] mb-2">5+</div>
                  <div className="text-[#A3A3A3] text-sm">Años de experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#D4AF37] mb-2">10k+</div>
                  <div className="text-[#A3A3A3] text-sm">Clientes satisfechos</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#D4AF37] mb-2">98%</div>
                  <div className="text-[#A3A3A3] text-sm">Satisfacción</div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden animate-fade-in-up">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/20 flex items-center justify-center">
                <div className="text-center">
                  <Zap className="w-24 h-24 text-[#D4AF37] mx-auto mb-4" />
                  <p className="text-[#F5F5F5] text-2xl font-bold">Innovación y Calidad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer Section */}
      <footer id="contact" className="py-20 bg-[#0F0F0F] border-t border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="section-title">
              Contacto
            </h2>
            <p className="section-subtitle">
              Estamos aquí para ayudarte
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Newsletter */}
            <div className="md:col-span-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-3xl p-8 animate-fade-in-up">
              <h3 className="text-2xl font-bold text-[#F5F5F5] mb-4">
                Mantente Conectado
              </h3>
              <p className="text-[#A3A3A3] mb-6 text-lg">
                Suscríbete para recibir las últimas novedades y ofertas exclusivas
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-6 py-4 rounded-xl bg-[#0F0F0F] border border-[#2A2A2A] text-[#F5F5F5] placeholder-[#6B7280] focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <button className="btn-primary px-8 py-4">
                  Suscribirse
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 animate-fade-in-up">
              {store.email && (
                <div>
                  <h4 className="text-[#F5F5F5] font-semibold mb-2">Correo</h4>
                  <a href={`mailto:${store.email}`} className="text-[#D4AF37] hover:text-[#E5C158] transition-colors">
                    {store.email}
                  </a>
                </div>
              )}
              {store.phone && (
                <div>
                  <h4 className="text-[#F5F5F5] font-semibold mb-2">Teléfono</h4>
                  <a href={`tel:${store.phone}`} className="text-[#D4AF37] hover:text-[#E5C158] transition-colors">
                    {store.phone}
                  </a>
                </div>
              )}
              {(store.address || store.city) && (
                <div>
                  <h4 className="text-[#F5F5F5] font-semibold mb-2">Dirección</h4>
                  <p className="text-[#A3A3A3]">
                    {store.address}{store.city && `, ${store.city}`}
                  </p>
                </div>
              )}
              {store.whatsappNumber && (
                <div>
                  <h4 className="text-[#F5F5F5] font-semibold mb-2">WhatsApp</h4>
                  <a
                    href={`https://wa.me/${store.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4AF37] hover:text-[#E5C158] transition-colors"
                  >
                    Enviar mensaje
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-[#2A2A2A] pt-8 text-center">
            <p className="text-[#A3A3A3]">
              © {new Date().getFullYear()} {store.name}. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
