'use client'

import { Store } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Phone, Mail, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useState } from 'react'
import MobileMenu from '@/components/shared/MobileMenu'

interface EleganteStoreHeaderProps {
  store: Store
  onCartClick: () => void
}

export default function EleganteStoreHeader({ store, onCartClick }: EleganteStoreHeaderProps) {
  const { getTotalItems } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <>
      {/* Barra superior elegante */}
      <div className="bg-black text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              {store.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{store.phone}</span>
                </div>
              )}
              {store.email && (
                <div className="hidden sm:flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{store.email}</span>
                </div>
              )}
            </div>
            <div className="text-xs uppercase tracking-widest font-light">
              Envío gratuito en compras superiores a $100.000
            </div>
          </div>
        </div>
      </div>

      {/* Header principal elegante */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Menú hamburguesa móvil */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2"
              aria-label="Abrir menú"
            >
              <Menu className="w-6 h-6 text-gray-800" />
            </button>

            {/* Logo central */}
            <Link href={`/${store.slug}#inicio`} className="flex-1 lg:flex-none lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                {store.logoUrl ? (
                  <Image
                    src={store.logoUrl}
                    alt={store.name}
                    width={40}
                    height={40}
                    className="rounded-sm object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-black text-white flex items-center justify-center text-lg font-light">
                    {store.name.charAt(0)}
                  </div>
                )}
                <div className="text-center lg:text-left">
                  <h1 className="text-2xl font-light tracking-wider text-gray-900 uppercase">
                    {store.name}
                  </h1>
                  <p className="text-xs text-gray-500 tracking-widest uppercase">
                    Luxury Collection
                  </p>
                </div>
              </div>
            </Link>

            {/* Navegación desktop */}
            <nav className="hidden lg:flex items-center space-x-12">
              <a href="#inicio" className="text-sm text-gray-800 hover:text-black transition-colors duration-300 uppercase tracking-widest font-light">
                Inicio
              </a>
              <a href="#productos" className="text-sm text-gray-800 hover:text-black transition-colors duration-300 uppercase tracking-widest font-light">
                Productos
              </a>
              <a href="#about" className="text-sm text-gray-800 hover:text-black transition-colors duration-300 uppercase tracking-widest font-light">
                Nosotros
              </a>
              <a href="#contact" className="text-sm text-gray-800 hover:text-black transition-colors duration-300 uppercase tracking-widest font-light">
                Contacto
              </a>
            </nav>

            {/* Acciones elegantes */}
            <div className="flex items-center space-x-6">
              <button className="text-sm text-gray-800 hover:text-black transition-colors duration-300 uppercase tracking-widest font-light hidden sm:block">
                Buscar
              </button>
              <button className="text-sm text-gray-800 hover:text-black transition-colors duration-300 uppercase tracking-widest font-light">
                Cuenta
              </button>
              <button
                onClick={onCartClick}
                className="relative text-sm text-gray-800 hover:text-black transition-colors duration-300 uppercase tracking-widest font-light flex items-center space-x-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Carrito ({getTotalItems()})</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu profesional */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        storeSlug={store.slug}
        storeName={store.name}
        themeVariant="elegante"
      />
    </>
  )
}