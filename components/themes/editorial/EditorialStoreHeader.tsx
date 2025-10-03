import { Store } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Menu, Calendar, Bookmark } from 'lucide-react'

interface EditorialStoreHeaderProps {
  store: Store
}

export default function EditorialStoreHeader({ store }: EditorialStoreHeaderProps) {
  return (
    <>
      {/* Barra superior editorial */}
      <div className="bg-black text-white text-sm py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span className="font-mono">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="hidden sm:block text-red-400 font-bold uppercase tracking-wider">
                Breaking: New Collection Available
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-mono text-xs">EDITION #{Math.floor(Math.random() * 1000)}</span>
              <Bookmark className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Header editorial principal */}
      <header className="bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo y título estilo periódico */}
          <div className="py-8 text-center border-b border-gray-200">
            <Link href={`/${store.slug}`}>
              <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tighter text-black mb-2">
                {store.name}
              </h1>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <span className="font-mono">EST. 2024</span>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span className="font-mono uppercase tracking-widest">Premium Editorial</span>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span className="font-mono">{store.contact.email}</span>
              </div>
            </Link>
          </div>

          {/* Navegación estilo revista */}
          <nav className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <button className="lg:hidden p-2">
                  <Menu className="w-6 h-6" />
                </button>

                <div className="hidden lg:flex items-center space-x-8">
                  {['LATEST', 'FEATURES', 'COLLECTIONS', 'LIFESTYLE', 'REVIEWS'].map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="text-black hover:text-red-600 transition-colors font-bold text-sm tracking-wider relative group"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Búsqueda editorial */}
              <div className="flex items-center space-x-4">
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="pl-10 pr-4 py-2 border border-gray-300 focus:border-red-500 focus:outline-none text-sm font-mono"
                  />
                </div>
                <button className="bg-black text-white px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-red-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}