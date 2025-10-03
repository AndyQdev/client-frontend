import { Store } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, Palette, Zap, Star } from 'lucide-react'

interface CreativeStoreHeaderProps {
  store: Store
}

export default function CreativeStoreHeader({ store }: CreativeStoreHeaderProps) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Elementos decorativos animados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-lg opacity-40 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-md opacity-50 animate-ping"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          {/* Logo creativo */}
          <Link href={`/${store.slug}`} className="flex items-center space-x-4 group">
            <div className="relative">
              {store.logo ? (
                <div className="relative">
                  <Image
                    src={store.logo}
                    alt={store.name}
                    width={56}
                    height={56}
                    className="rounded-2xl object-cover group-hover:rotate-12 transition-transform duration-500"
                  />
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                </div>
              ) : (
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold group-hover:rotate-12 transition-transform duration-500">
                    {store.name.charAt(0)}
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                </div>
              )}
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-spin" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent group-hover:from-yellow-400 group-hover:via-pink-400 group-hover:to-purple-400 transition-all duration-500">
                {store.name}
              </h1>
              <p className="text-sm text-gray-300 font-medium flex items-center space-x-1">
                <Palette className="w-4 h-4" />
                <span>Creative Space</span>
                <Star className="w-3 h-3 text-yellow-400" />
              </p>
            </div>
          </Link>

          {/* Navegación creativa */}
          <nav className="hidden lg:flex items-center space-x-8">
            {['Gallery', 'Collections', 'Artists', 'Experiments', 'Studio'].map((item, index) => (
              <Link
                key={item}
                href="#"
                className="relative text-white hover:text-pink-300 transition-colors duration-300 font-medium group"
                style={{
                  transform: `rotate(${(index - 2) * 2}deg)`,
                }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Acciones creativas */}
          <div className="flex items-center space-x-4">
            <button className="relative p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white hover:from-purple-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-110 hover:rotate-12">
              <Zap className="w-5 h-5" />
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-30 animate-pulse"></div>
            </button>
            <button className="relative px-6 py-3 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full text-white font-bold hover:from-green-400 hover:via-blue-500 hover:to-purple-600 transition-all duration-500 transform hover:scale-105">
              <span className="relative z-10">Create Magic</span>
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full blur opacity-40 animate-pulse"></div>
            </button>
          </div>
        </div>

        {/* Elementos flotantes */}
        <div className="absolute top-4 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute top-16 left-1/3 w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
      </div>
    </header>
  )
}