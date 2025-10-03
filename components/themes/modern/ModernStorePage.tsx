import { Store, Product, Category } from '@/lib/types'
import ModernStoreHeader from './ModernStoreHeader'
import ModernProductGrid from './ModernProductGrid'
import { Filter, SlidersHorizontal, Grid3X3, List } from 'lucide-react'

interface ModernStorePageProps {
  store: Store
  products: Product[]
  categories: Category[]
}

export default function ModernStorePage({ store, products, categories }: ModernStorePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header del tema Modern */}
      <ModernStoreHeader store={store} />

      {/* Banner hero con diseño modern */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
          <div className="absolute inset-0 bg-black/20"></div>
          {/* Patron de grid sutil */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Descubre lo <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Extraordinario</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200 leading-relaxed">
              {store.description || "Productos únicos y experiencias increíbles te esperan"}
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Explorar Ahora
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                Ver Colecciones
              </button>
            </div>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-32 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
        <div className="absolute top-32 right-1/4 w-16 h-16 bg-yellow-400/30 rounded-full blur-lg"></div>
      </section>

      {/* Filtros y ordenamiento con diseño modern */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
          {/* Categorías */}
          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-3 bg-black text-white rounded-2xl font-medium hover:bg-gray-800 transition-all duration-300">
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-2xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Controles de vista y filtros */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300">
              <SlidersHorizontal className="w-5 h-5" />
              <span className="font-medium">Filtros</span>
            </button>

            <div className="flex items-center space-x-2">
              <button className="p-3 bg-black text-white rounded-xl">
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300">
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid de productos con diseño modern */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Productos Destacados
              <span className="ml-3 text-lg text-gray-500 font-normal">({products.length} productos)</span>
            </h2>
          </div>

          <ModernProductGrid products={products} />
        </div>

        {/* Sección de newsletter con diseño modern */}
        <section className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-12 text-center text-white mt-16">
          <h3 className="text-3xl font-bold mb-4">Mantente al día</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter y recibe las últimas novedades, ofertas exclusivas y contenido especial.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-6 py-4 rounded-2xl border-0 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300">
              Suscribirse
            </button>
          </div>
        </section>
      </section>
    </div>
  )
}