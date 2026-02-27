'use client'

import { Store } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Menu } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useCustomer } from '@/lib/customer-context'
import { useState } from 'react'
import MobileMenu from '@/components/shared/MobileMenu'
import CustomerPopover from '@/components/shared/CustomerPopover'
import CustomerDrawer from '@/components/shared/CustomerDrawer'

interface ModernStoreHeaderProps {
  store: Store
  onCartClick: () => void
  onMenuClick?: () => void
}

export default function ModernStoreHeader({ store, onCartClick, onMenuClick }: ModernStoreHeaderProps) {
  const { getTotalItems } = useCart()
  const { login } = useCustomer()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleRegister = async (name: string, phone: string, country: string, addressObject?: { name: string; latitude: number; longitude: number }) => {
    await login(store.id, name, phone, country, addressObject)
  }

  return (
    <header className="bg-[#0F0F0F]/95 backdrop-blur-xl border-b border-[#2A2A2A] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo y nombre de la tienda */}
          <Link href={`/${store.slug}`} className="flex items-center space-x-4 group">
            <div className="relative">
              {store.logo ? (
                <Image
                  src={store.logo}
                  alt={store.name}
                  width={48}
                  height={48}
                  className="rounded-xl object-cover ring-2 ring-[#2A2A2A] group-hover:ring-[#D4AF37] transition-all duration-300"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center text-[#0F0F0F] font-bold text-lg group-hover:scale-105 transition-transform duration-300">
                  {store.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#E5C158] bg-clip-text text-transparent">
                {store.name}
              </h1>
              <p className="text-sm text-[#A3A3A3] font-medium">Premium Store</p>
            </div>
          </Link>

          {/* Menú de navegación */}
          <nav className="hidden md:flex flex-1 items-ce  nter justify-center space-x-8">
            <a
              href="#inicio"
              className="text-[#A3A3A3] hover:text-[#D4AF37] font-medium transition-colors duration-300"
            >
              Inicio
            </a>
            <a
              href="#productos"
              className="text-[#A3A3A3] hover:text-[#D4AF37] font-medium transition-colors duration-300"
            >
              Productos
            </a>
            <a
              href="#about"
              className="text-[#A3A3A3] hover:text-[#D4AF37] font-medium transition-colors duration-300"
            >
              Nosotros
            </a>
            <a
              href="#contact"
              className="text-[#A3A3A3] hover:text-[#D4AF37] font-medium transition-colors duration-300"
            >
              Contacto
            </a>
          </nav>

          {/* Acciones del usuario */}
          <div className="flex items-center space-x-2">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick || (() => setIsMenuOpen(true))}
              className="md:hidden p-3 text-[#A3A3A3] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-xl transition-all duration-300"
              aria-label="Abrir menú"
            >
              <Menu className="w-6 h-6" />
            </button>

            <button className="hidden md:block p-3 text-[#A3A3A3] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-xl transition-all duration-300">
              <CustomerPopover 
                onRegisterClick={() => setIsDrawerOpen(true)}
                themeVariant="modern"
              />
            </button>
            <button
              onClick={onCartClick}
              className="relative p-3 text-[#A3A3A3] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-xl transition-all duration-300"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#0F0F0F] text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
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
        themeVariant="modern"
      />

      {/* Customer registration drawer */}
      <CustomerDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onRegister={handleRegister}
        themeVariant="modern"
      />
    </header>
  )
}