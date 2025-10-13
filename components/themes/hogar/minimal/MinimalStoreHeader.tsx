'use client'

import { Store } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useState } from 'react'
import MobileMenu from '@/components/shared/MobileMenu'

interface MinimalStoreHeaderProps {
  store: Store
  onCartClick: () => void
}

export default function MinimalStoreHeader({ store, onCartClick }: MinimalStoreHeaderProps) {
  const { getTotalItems } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo minimalista */}
          <Link href={`/${store.slug}#inicio`} className="flex items-center space-x-3">
            {store.logoUrl ? (
              <Image
                src={store.logoUrl}
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
            <a href="#inicio" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              Inicio
            </a>
            <a href="#productos" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              Productos
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              Nosotros
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              Contacto
            </a>
          </nav>

          {/* Acciones mínimas */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="text-gray-600 hover:text-gray-900 transition-colors hidden sm:flex items-center space-x-2 text-sm font-medium"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Cart ({getTotalItems()})</span>
            </button>

            {/* Mobile cart button */}
            <button
              onClick={onCartClick}
              className="sm:hidden relative text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu profesional */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        storeSlug={store.slug}
        storeName={store.name}
        themeVariant="minimal"
      />
    </header>
  )
}