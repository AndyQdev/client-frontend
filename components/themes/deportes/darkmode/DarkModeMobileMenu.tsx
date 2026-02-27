'use client'

import { X, Home, ShoppingBag, Info, Phone } from 'lucide-react'
import Link from 'next/link'

interface DarkModeMobileMenuProps {
  isOpen: boolean
  onClose: () => void
  storeSlug: string
  storeName: string
}

export default function DarkModeMobileMenu({
  isOpen,
  onClose,
  storeSlug,
  storeName
}: DarkModeMobileMenuProps) {
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
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed right-0 top-0 bottom-0 w-[75%] max-w-sm bg-gradient-to-b from-black to-zinc-900 border-l-4 border-yellow-500 shadow-2xl z-50 transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h2 className="text-2xl font-bold text-zinc-100">
            {storeName}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-yellow-500 hover:bg-zinc-800 rounded-lg transition-all duration-200"
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
                className="flex items-center px-4 py-3 text-zinc-400 hover:text-yellow-500 hover:bg-zinc-800 rounded-lg font-medium transition-all duration-200"
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-800">
          <p className="text-xs text-center text-zinc-500">
            © {new Date().getFullYear()} {storeName}
          </p>
        </div>
      </div>
    </>
  )
}