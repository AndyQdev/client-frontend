'use client'

import { Store } from '@/lib/types'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface InteriorStoreHeaderProps {
  store: Store
  onCartClick: () => void
  cartItemsCount?: number
}

export default function InteriorStoreHeader({ store, onCartClick, cartItemsCount = 0 }: InteriorStoreHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="store-header sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar - Info */}
        <div className="hidden md:flex items-center justify-between py-2 text-xs text-stone-600 border-b border-stone-100">
          <div className="flex items-center gap-6">
            <span>Envío gratis en compras superiores a $100.000</span>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-6">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-900 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href={`/${store.slug}`} className="flex-shrink-0">
            <h1 className="store-name font-serif text-2xl md:text-3xl text-stone-800 tracking-wider uppercase">
              {store.name}
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href={`/${store.slug}`}
              className="text-sm font-medium text-stone-700 hover:text-stone-900 uppercase tracking-wider transition-colors relative group"
            >
              Inicio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-800 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href={`/${store.slug}#productos`}
              className="text-sm font-medium text-stone-700 hover:text-stone-900 uppercase tracking-wider transition-colors relative group"
            >
              Productos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-800 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href={`/${store.slug}#about`}
              className="text-sm font-medium text-stone-700 hover:text-stone-900 uppercase tracking-wider transition-colors relative group"
            >
              Nosotros
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-800 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href={`/${store.slug}#contact`}
              className="text-sm font-medium text-stone-700 hover:text-stone-900 uppercase tracking-wider transition-colors relative group"
            >
              Contacto
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-800 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* User */}
            <button
              className="hidden md:block p-2 text-stone-700 hover:text-stone-900 transition-colors"
              title="Mi cuenta"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-stone-700 hover:text-stone-900 transition-colors"
              title="Carrito"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium animate-scale-in">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-stone-200 mt-4 animate-fade-in">
            <nav className="flex flex-col gap-4 pt-4">
              <Link
                href={`/${store.slug}`}
                className="text-sm font-medium text-stone-700 hover:text-stone-900 uppercase tracking-wider transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href={`/${store.slug}#productos`}
                className="text-sm font-medium text-stone-700 hover:text-stone-900 uppercase tracking-wider transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
              <Link
                href={`/${store.slug}#about`}
                className="text-sm font-medium text-stone-700 hover:text-stone-900 uppercase tracking-wider transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link
                href={`/${store.slug}#contact`}
                className="text-sm font-medium text-stone-700 hover:text-stone-900 uppercase tracking-wider transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
