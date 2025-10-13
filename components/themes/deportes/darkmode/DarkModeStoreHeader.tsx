'use client'

import { Store } from '@/lib/types'
import Link from 'next/link'
import { Menu, ShoppingBag, User } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useState } from 'react'
import MobileMenu from '@/components/shared/MobileMenu'

interface DarkModeStoreHeaderProps {
  store: Store
  onCartClick?: () => void
}

export default function DarkModeStoreHeader({ store, onCartClick }: DarkModeStoreHeaderProps) {
  const { getTotalItems } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black border-b border-zinc-800 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href={`/${store.slug}`} className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">{store.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-100 group-hover:text-yellow-500 transition-colors">
                {store.name}
              </h1>
              <p className="text-xs text-zinc-500 uppercase tracking-wide">Premium Store</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { label: 'Inicio', href: `/${store.slug}` },
              { label: 'Novedades', href: '#' },
              { label: 'Colecciones', href: '#' },
              { label: 'Ofertas', href: '#' }
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-zinc-400 hover:text-yellow-500 transition-colors font-medium tracking-wide"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* User Icon */}
            <button className="p-2 text-zinc-400 hover:text-yellow-500 transition-colors">
              <User className="w-5 h-5" />
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-all flex items-center space-x-2 group"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-semibold">Carrito</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-zinc-900 text-yellow-500 text-xs font-bold min-w-[20px] h-5 flex items-center justify-center px-1.5 rounded-full border-2 border-yellow-500">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 text-zinc-400 hover:text-yellow-500 transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="w-6 h-6" />
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
        themeVariant="darkmode"
      />
    </header>
  )
}
