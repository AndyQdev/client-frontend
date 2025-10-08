'use client'

import { Store } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, User, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

interface ClassicStoreHeaderProps {
  store: Store
  onCartClick?: () => void
}

export default function ClassicStoreHeader({ store, onCartClick }: ClassicStoreHeaderProps) {
  const { getTotalItems } = useCart()
  return (
    <>
      {/* Barra superior clásica */}
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-6 text-amber-800">
              {store.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span className="font-serif">{store.phone}</span>
                </div>
              )}
              {store.email && (
                <div className="hidden sm:flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span className="font-serif">{store.email}</span>
                </div>
              )}
            </div>
            <div className="text-amber-800 font-serif italic">
              "Tradición y calidad desde 1892"
            </div>
          </div>
        </div>
      </div>

      {/* Header principal clásico */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            {/* Logo clásico */}
            <Link href={`/${store.slug}#inicio`} className="flex items-center space-x-4">
              <div className="relative">
                {store.logoUrl ? (
                  <Image
                    src={store.logoUrl}
                    alt={store.name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover border-2 border-amber-200"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-white text-xl font-serif">
                    {store.name.charAt(0)}
                  </div>
                )}
                {/* Ornamento clásico */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-serif text-amber-900 tracking-wide">
                  {store.name}
                </h1>
                <p className="text-sm text-amber-600 font-serif italic">
                  Fine Quality Since Always
                </p>
              </div>
            </Link>

            {/* Navegación clásica */}
            <nav className="hidden lg:flex items-center space-x-12">
              <a
                href="#inicio"
                className="text-amber-800 hover:text-amber-600 transition-colors font-serif text-lg relative group"
              >
                Inicio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#productos"
                className="text-amber-800 hover:text-amber-600 transition-colors font-serif text-lg relative group"
              >
                Productos
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#about"
                className="text-amber-800 hover:text-amber-600 transition-colors font-serif text-lg relative group"
              >
                Nosotros
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#contact"
                className="text-amber-800 hover:text-amber-600 transition-colors font-serif text-lg relative group"
              >
                Contacto
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>

            {/* Acciones clásicas */}
            <div className="flex items-center space-x-6">
              <button className="text-amber-800 hover:text-amber-600 transition-colors p-2 relative group">
                <User className="w-6 h-6" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-serif opacity-0 group-hover:opacity-100 transition-opacity">
                  Account
                </span>
              </button>
              <button
                onClick={onCartClick}
                className="text-amber-800 hover:text-amber-600 transition-colors p-2 relative group"
              >
                <ShoppingBag className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-serif">
                    {getTotalItems()}
                  </span>
                )}
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-serif opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Shopping Bag
                </span>
              </button>
            </div>
          </div>

          {/* Ornamento decorativo */}
          <div className="flex justify-center pb-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-300"></div>
              <div className="w-3 h-3 border-2 border-amber-400 rotate-45"></div>
              <div className="w-32 h-px bg-gradient-to-r from-amber-300 to-amber-300"></div>
              <div className="w-3 h-3 border-2 border-amber-400 rotate-45"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-300"></div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}