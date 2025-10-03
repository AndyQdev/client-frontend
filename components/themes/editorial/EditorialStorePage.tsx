import { Store, Product, Category } from '@/lib/types'
import EditorialStoreHeader from './EditorialStoreHeader'
import EditorialProductCard from './EditorialProductCard'
import { TrendingUp, Clock, Users, Award } from 'lucide-react'

interface EditorialStorePageProps {
  store: Store
  products: Product[]
  categories: Category[]
}

export default function EditorialStorePage({ store, products, categories }: EditorialStorePageProps) {
  return (
    <div className="min-h-screen bg-white">
      <EditorialStoreHeader store={store} />

      {/* Hero editorial principal */}
      <section className="border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contenido principal */}
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  Breaking News
                </span>
                <span className="text-xs font-mono text-gray-500">
                  {new Date().toLocaleDateString()}
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-black text-black mb-6 leading-none">
                The Future of <span className="text-red-600">Retail</span> is Here
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {store.description || "Exclusive coverage of the latest trends, innovative products, and industry insights that are shaping tomorrow's marketplace."}
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-black text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-red-600 transition-colors">
                  Explore Stories
                </button>
                <button className="border-2 border-black text-black px-8 py-3 font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
                  Subscribe Now
                </button>
              </div>
            </div>

            {/* Sidebar con estadísticas */}
            <div className="bg-gray-50 p-8 border-l-4 border-red-600">
              <h3 className="text-2xl font-black text-black mb-6 uppercase">
                This Week's Highlights
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <TrendingUp className="w-8 h-8 text-red-600" />
                  <div>
                    <div className="font-bold text-lg">{products.length}</div>
                    <div className="text-sm text-gray-600 font-mono">Featured Products</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Users className="w-8 h-8 text-red-600" />
                  <div>
                    <div className="font-bold text-lg">12.5K</div>
                    <div className="text-sm text-gray-600 font-mono">Active Readers</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Award className="w-8 h-8 text-red-600" />
                  <div>
                    <div className="font-bold text-lg">5★</div>
                    <div className="text-sm text-gray-600 font-mono">Editorial Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de categorías estilo revista */}
      <section className="py-8 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-wider">
              Sections
            </h2>
            <div className="hidden lg:flex items-center space-x-8">
              <button className="bg-white text-black px-4 py-2 font-bold text-sm uppercase tracking-wider">
                All Articles
              </button>
              {categories.slice(0, 4).map((category) => (
                <button
                  key={category.id}
                  className="text-white hover:text-red-400 transition-colors font-bold text-sm uppercase tracking-wider"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid de productos estilo revista */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Encabezado de sección */}
        <div className="mb-12 pb-8 border-b-2 border-black">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-black text-black uppercase tracking-tighter mb-2">
                Latest Stories
              </h2>
              <p className="text-gray-600 font-mono text-sm">
                In-depth coverage of {products.length} featured products
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm font-mono text-gray-500 mb-1">
                Last updated
              </div>
              <div className="font-bold">{new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        {/* Grid editorial */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => (
            <div key={product.id} className={index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}>
              <EditorialProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Newsletter editorial */}
        <section className="bg-black text-white p-12 border-4 border-black">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6">
              <span className="bg-red-600 text-white px-4 py-2 text-sm font-bold uppercase tracking-wider">
                Subscribe
              </span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-black mb-6 uppercase tracking-tighter">
              Never Miss a Story
            </h3>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Get the latest product launches, exclusive interviews, and industry insights delivered directly to your inbox every week.
            </p>

            <div className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 text-black font-mono text-sm focus:outline-none"
                />
                <button className="bg-red-600 text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-red-700 transition-colors">
                  Join
                </button>
              </div>
              <p className="text-gray-400 text-xs mt-4 font-mono">
                Join 12,500+ readers • No spam, ever
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  )
}