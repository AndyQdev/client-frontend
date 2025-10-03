import { Store, Product, Category } from '@/lib/types'
import CreativeStoreHeader from './CreativeStoreHeader'
import CreativeProductCard from './CreativeProductCard'
import { Sparkles, Palette, Zap, Star, Rocket, Heart } from 'lucide-react'

interface CreativeStorePageProps {
  store: Store
  products: Product[]
  categories: Category[]
}

export default function CreativeStorePage({ store, products, categories }: CreativeStorePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Elementos de fondo animados */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full blur-2xl opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/3 w-32 h-32 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full blur-xl opacity-25 animate-ping"></div>
      </div>

      <CreativeStoreHeader store={store} />

      {/* Hero section ultra creativo */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative">
            {/* Título principal con efectos */}
            <div className="mb-8">
              <h1 className="text-6xl lg:text-8xl font-black mb-4 transform hover:scale-105 transition-transform duration-500">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
                  Create
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  Magic
                </span>
              </h1>
              <div className="flex justify-center space-x-4 mb-6">
                <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
                <Star className="w-8 h-8 text-pink-400 animate-pulse" />
                <Zap className="w-8 h-8 text-purple-400 animate-bounce" />
              </div>
            </div>

            <p className="text-xl lg:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              {store.description || "Welcome to a universe where creativity knows no bounds. Discover extraordinary pieces that spark imagination and transform ordinary moments into magical experiences."}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <button className="relative px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold rounded-full text-lg hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 transition-all duration-500 transform hover:scale-110 hover:rotate-3">
                <span className="relative z-10 flex items-center space-x-2">
                  <Rocket className="w-5 h-5" />
                  <span>Launch Creativity</span>
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full blur opacity-30 animate-pulse"></div>
              </button>
              <button className="px-8 py-4 border-3 border-purple-400 text-purple-700 font-bold rounded-full text-lg hover:bg-purple-400 hover:text-white transition-all duration-300 transform hover:scale-105">
                Explore Gallery
              </button>
            </div>

            {/* Stats creativos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {[
                { icon: Palette, label: 'Art Pieces', value: products.length },
                { icon: Heart, label: 'Happy Creators', value: '2.5K' },
                { icon: Sparkles, label: 'Magic Made', value: '∞' },
                { icon: Star, label: 'Dreams', value: '∞+1' }
              ].map((stat, index) => (
                <div key={index} className="text-center transform hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-purple-500 animate-bounce" style={{ animationDelay: `${index * 200}ms` }} />
                  <div className="text-2xl font-black text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filtros creativos */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Creative Collections
              </span>
            </h2>
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
                <div className="w-12 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-75"></div>
                <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>

            {/* Filtros con estilo creativo */}
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold hover:from-purple-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:rotate-1">
                ✨ All Magic
              </button>
              {categories.map((category, index) => {
                const rotations = [-2, 1, -1, 2, 0]
                return (
                  <button
                    key={category.id}
                    className="px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-purple-200 text-purple-700 rounded-full font-bold hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105"
                    style={{ transform: `rotate(${rotations[index % rotations.length]}deg)` }}
                  >
                    {category.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Grid de productos creativo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="transform transition-all duration-500 hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <CreativeProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Newsletter creativo */}
        <section className="mt-20 relative">
          <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-blue-900 rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-4 left-4 w-16 h-16 bg-yellow-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="absolute top-8 right-8 w-12 h-12 bg-pink-400 rounded-full blur-lg opacity-40 animate-bounce"></div>
              <div className="absolute bottom-4 left-1/3 w-8 h-8 bg-blue-400 rounded-full blur-md opacity-50 animate-ping"></div>
            </div>

            <div className="relative z-10">
              <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-spin" />
              <h3 className="text-4xl font-black text-white mb-6">
                Join the <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">Creative Revolution</span>
              </h3>
              <p className="text-purple-200 mb-8 text-lg max-w-2xl mx-auto">
                Be the first to discover new artistic treasures, get exclusive access to limited editions, and receive inspiration directly to your inbox.
              </p>

              <div className="max-w-md mx-auto">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="your.magic@email.com"
                    className="flex-1 px-6 py-4 rounded-l-full text-gray-900 placeholder-gray-500 focus:outline-none font-medium"
                  />
                  <button className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white px-8 py-4 rounded-r-full font-bold hover:from-green-400 hover:via-blue-500 hover:to-purple-600 transition-all duration-500 transform hover:scale-105">
                    ✨ Join Magic
                  </button>
                </div>
                <p className="text-purple-300 text-sm mt-4">
                  Join 10,000+ creative souls • Pure magic, no spam
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>

    </div>
  )
}