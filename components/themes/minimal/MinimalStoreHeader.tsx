import { Store } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Menu } from 'lucide-react'

interface MinimalStoreHeaderProps {
  store: Store
}

export default function MinimalStoreHeader({ store }: MinimalStoreHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo minimalista */}
          <Link href={`/${store.slug}`} className="flex items-center space-x-3">
            {store.logo ? (
              <Image
                src={store.logo}
                alt={store.name}
                width={32}
                height={32}
                className="rounded object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center text-white text-sm font-medium">
                {store.name.charAt(0)}
              </div>
            )}
            <h1 className="text-xl font-medium text-gray-900 tracking-tight">
              {store.name}
            </h1>
          </Link>

          {/* Navegación central ultra minimal */}
          <nav className="hidden md:flex items-center space-x-12">
            <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              Shop
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              About
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              Contact
            </Link>
          </nav>

          {/* Acciones mínimas */}
          <div className="flex items-center space-x-6">
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-600 hover:text-gray-900 transition-colors hidden sm:block text-sm font-medium">
              Cart (0)
            </button>
            <button className="md:hidden text-gray-600 hover:text-gray-900 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}