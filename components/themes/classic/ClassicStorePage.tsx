import { Store, Product, Category } from '@/lib/types'
import ClassicStoreHeader from './ClassicStoreHeader'
import ClassicProductCard from './ClassicProductCard'
import { Crown, Shield, Award } from 'lucide-react'

interface ClassicStorePageProps {
  store: Store
  products: Product[]
  categories: Category[]
}

export default function ClassicStorePage({ store, products, categories }: ClassicStorePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-cream-100">
      <ClassicStoreHeader store={store} />

      {/* Hero banner clásico */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100 via-cream-50 to-amber-100"></div>

        {/* Patrones decorativos */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-amber-400 rounded-full"></div>
          <div className="absolute top-20 right-20 w-20 h-20 border border-amber-300 rotate-45"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border-2 border-amber-400 rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <Crown className="w-16 h-16 text-amber-600" />
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif text-amber-900 mb-8 leading-tight">
              Timeless <span className="italic text-amber-700">Elegance</span>
            </h1>
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-px bg-amber-400"></div>
                <div className="w-4 h-4 border-2 border-amber-500 rotate-45"></div>
                <div className="w-16 h-px bg-amber-400"></div>
              </div>
            </div>
            <p className="text-xl lg:text-2xl text-amber-800 font-serif leading-relaxed mb-12 italic">
              {store.description || "Discover our heritage collection of handcrafted treasures, where tradition meets uncompromising quality."}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-amber-600 text-white px-10 py-4 text-lg font-serif hover:bg-amber-700 transition-all duration-300 rounded shadow-lg">
                Explore Heritage Collection
              </button>
              <button className="border-2 border-amber-600 text-amber-600 px-10 py-4 text-lg font-serif hover:bg-amber-600 hover:text-white transition-all duration-300 rounded">
                Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Características clásicas */}
      <section className="py-16 bg-white border-y border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <Crown className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-serif text-amber-900 mb-2">Premium Quality</h3>
              <p className="text-amber-700 font-serif">Handcrafted with the finest materials</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-serif text-amber-900 mb-2">Lifetime Warranty</h3>
              <p className="text-amber-700 font-serif">Built to last generations</p>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-serif text-amber-900 mb-2">Heritage Since 1892</h3>
              <p className="text-amber-700 font-serif">Over a century of excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Productos con filtros clásicos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Título y filtros */}
        <div className="text-center mb-16">
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

          {/* Filtros clásicos */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <button className="bg-amber-600 text-white px-6 py-3 font-serif hover:bg-amber-700 transition-colors rounded">
              All Treasures
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className="border border-amber-300 text-amber-800 px-6 py-3 font-serif hover:bg-amber-100 transition-colors rounded"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de productos clásico */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {products.map((product) => (
            <ClassicProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Newsletter clásico */}
        <section className="mt-24 bg-gradient-to-r from-amber-100 to-cream-100 rounded-lg p-12 text-center border-2 border-amber-200">
          <Crown className="w-12 h-12 text-amber-600 mx-auto mb-6" />
          <h3 className="text-3xl font-serif text-amber-900 mb-4">
            Join Our <span className="italic">Heritage Circle</span>
          </h3>
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-px bg-amber-400"></div>
              <div className="w-3 h-3 border-2 border-amber-500 rotate-45"></div>
              <div className="w-12 h-px bg-amber-400"></div>
            </div>
          </div>
          <p className="text-amber-800 font-serif mb-8 max-w-2xl mx-auto italic text-lg">
            Receive exclusive invitations to our heritage exhibitions, early access to limited collections, and insights into our craftsmanship traditions.
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Your distinguished email"
                className="flex-1 px-6 py-4 border-2 border-amber-300 rounded-l text-amber-900 placeholder-amber-500 focus:outline-none focus:border-amber-500 font-serif"
              />
              <button className="bg-amber-600 text-white px-8 py-4 font-serif hover:bg-amber-700 transition-colors rounded-r">
                Join Circle
              </button>
            </div>
          </div>
        </section>
      </section>
    </div>
  )
}