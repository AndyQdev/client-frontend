'use client'

import { Store, Product, Category } from '@/lib/types'
import ModernStoreHeader from './ModernStoreHeader'
import ModernProductGrid from './ModernProductGrid'
import ModernCartSheet from './ModernCartSheet'
import { useState } from 'react'
import { Zap, Shield, Truck, HeadphonesIcon, Search } from 'lucide-react'
import { useProductFilters } from '@/hooks/useProductFilters'

interface ModernStorePageProps {
  store: Store
  products: Product[]
  categories: Category[]
}

export default function ModernStorePage({ store, products, categories }: ModernStorePageProps) {
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
    <div id="inicio" className="min-h-screen bg-[#0F0F0F]">
      <ModernStoreHeader store={store} onCartClick={() => setIsCartOpen(true)} />
      <ModernCartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} storeSlug={store.slug} />

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

      {/* Features Section */}
      <section className="py-16 border-y border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {(store.features && store.features.length > 0 ? store.features : [
              { icon: 'Zap', title: 'Envío Express', description: '24-48 horas' },
              { icon: 'Shield', title: 'Garantía Total', description: '2 años' },
              { icon: 'Truck', title: 'Envío Gratis', description: 'Desde $100.000' },
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
      </section>

      {/* Products Section */}
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
                disabled={isPending}
                className="w-full pl-12 pr-4 py-4 bg-[#1A1A1A] border border-[#2A2A2A] text-[#F5F5F5] placeholder-[#6B7280] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-300 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="category-filter mb-12 animate-fade-in">
            <button
              onClick={() => handleCategoryChange(null)}
              disabled={isPending}
              className={selectedCategory === null ? 'active' : ''}
            >
              Todos
            </button>
            {categories.slice(0, 6).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                disabled={isPending}
                className={selectedCategory === category.id ? 'active' : ''}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Product Count */}
          <div className="mb-8 animate-fade-in">
            <p className="text-[#A3A3A3] text-center">
              Mostrando <span className="font-bold text-[#D4AF37]">{filteredProducts.length}</span> productos
              {selectedCategory && (
                <span className="ml-2">
                  en <span className="font-semibold text-[#E5C158]">{categories.find(c => c.id === selectedCategory)?.name}</span>
                </span>
              )}
            </p>
          </div>

          {/* Products Grid */}
          <ModernProductGrid products={filteredProducts} storeSlug={store.slug} />
        </div>
      </section>

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
                  <h4 className="text-[#F5F5F5] font-semibold mb-2">Email</h4>
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
