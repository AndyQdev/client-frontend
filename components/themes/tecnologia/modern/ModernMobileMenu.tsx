'use client'

import { X, Home, ShoppingBag, Info, Phone } from 'lucide-react'
import Link from 'next/link'

interface ModernMobileMenuProps {
  isOpen: boolean
  onClose: () => void
  storeSlug: string
  storeName: string
}

export default function ModernMobileMenu({
  isOpen,
  onClose,
  storeSlug,
  storeName
}: ModernMobileMenuProps) {
  const menuItems = [
    { href: `/${storeSlug}`, label: 'Inicio', icon: Home },
    { href: `/${storeSlug}#productos`, label: 'Productos', icon: ShoppingBag },
    { href: `/${storeSlug}#about`, label: 'Nosotros', icon: Info },
    { href: `/${storeSlug}#contact`, label: 'Contacto', icon: Phone }
  ]

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed right-0 top-0 bottom-0 w-[75%] max-w-sm bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] border-l-2 border-[#D4AF37] shadow-2xl z-50 transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#E5C158] bg-clip-text text-transparent">
            {storeName}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-[#A3A3A3] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-xl transition-all duration-200"
            aria-label="Cerrar menú"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navegación - flex-1 para ocupar espacio disponible */}
        <nav className="flex-1 flex flex-col p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="flex items-center px-4 py-3 text-[#A3A3A3] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-xl font-medium transition-all duration-200"
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-[#2A2A2A]">
          <p className="text-xs text-center text-[#666]">
            © {new Date().getFullYear()} {storeName}
          </p>
        </div>
      </div>
    </>
  )
}