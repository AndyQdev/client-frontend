'use client'

import { X, Home, ShoppingBag, Info, Phone } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  storeSlug: string
  storeName: string
  themeVariant?: 'modern' | 'elegante' | 'minimal' | 'classic' | 'darkmode' | 'creative' | 'interior'
}

export default function MobileMenu({
  isOpen,
  onClose,
  storeSlug,
  storeName,
  themeVariant = 'minimal'
}: MobileMenuProps) {
  // Prevenir scroll del body cuando el menu está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Estilos personalizados por tema
  const themeStyles = {
    modern: {
      overlay: 'bg-black/70',
      container: 'bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] border-l-2 border-[#D4AF37]',
      header: 'border-b border-[#2A2A2A]',
      title: 'text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#E5C158] bg-clip-text text-transparent',
      closeBtn: 'text-[#A3A3A3] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-xl',
      navItem: 'text-[#A3A3A3] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-xl',
      footer: 'border-t border-[#2A2A2A] text-[#666]'
    },
    elegante: {
      overlay: 'bg-black/60',
      container: 'bg-white',
      header: 'border-b border-gray-200',
      title: 'text-2xl font-light tracking-wider text-gray-900 uppercase',
      closeBtn: 'text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg',
      navItem: 'text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg uppercase tracking-wider text-sm font-light',
      footer: 'border-t border-gray-200 text-gray-500'
    },
    minimal: {
      overlay: 'bg-black/50',
      container: 'bg-white',
      header: 'border-b border-gray-100',
      title: 'text-xl font-medium text-gray-900 tracking-tight',
      closeBtn: 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded',
      navItem: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded',
      footer: 'border-t border-gray-100 text-gray-500'
    },
    classic: {
      overlay: 'bg-black/60',
      container: 'bg-gradient-to-b from-amber-50 to-white',
      header: 'border-b-2 border-amber-200',
      title: 'text-2xl font-serif text-amber-900 tracking-wide',
      closeBtn: 'text-amber-700 hover:text-amber-900 hover:bg-amber-100 rounded-full',
      navItem: 'text-amber-800 hover:text-amber-900 hover:bg-amber-100 rounded-lg font-serif',
      footer: 'border-t-2 border-amber-200 text-amber-600'
    },
    darkmode: {
      overlay: 'bg-black/80',
      container: 'bg-gradient-to-b from-black to-zinc-900 border-l-4 border-yellow-500',
      header: 'border-b border-zinc-800',
      title: 'text-2xl font-bold text-zinc-100',
      closeBtn: 'text-zinc-400 hover:text-yellow-500 hover:bg-zinc-800 rounded-lg',
      navItem: 'text-zinc-400 hover:text-yellow-500 hover:bg-zinc-800 rounded-lg font-medium',
      footer: 'border-t border-zinc-800 text-zinc-500'
    },
    creative: {
      overlay: 'bg-black/70 backdrop-blur-md',
      container: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
      header: 'border-b border-purple-500/30',
      title: 'text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent',
      closeBtn: 'text-purple-300 hover:text-pink-300 hover:bg-purple-800/50 rounded-full',
      navItem: 'text-purple-200 hover:text-white hover:bg-purple-700/50 rounded-lg font-medium',
      footer: 'border-t border-purple-500/30 text-purple-400'
    },
    interior: {
      overlay: 'bg-black/50',
      container: 'bg-white/95 backdrop-blur-md',
      header: 'border-b border-stone-200',
      title: 'text-2xl font-serif text-stone-800 tracking-wider uppercase',
      closeBtn: 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg',
      navItem: 'text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg uppercase tracking-wider text-sm font-medium',
      footer: 'border-t border-stone-200 text-stone-500'
    }
  }

  const styles = themeStyles[themeVariant]

  const menuItems = [
    { href: `/${storeSlug}`, label: 'Inicio', icon: Home },
    { href: `/${storeSlug}#productos`, label: 'Productos', icon: ShoppingBag },
    { href: `/${storeSlug}#about`, label: 'Nosotros', icon: Info },
    { href: `/${storeSlug}#contact`, label: 'Contacto', icon: Phone }
  ]

  return (
    <>
      {/* Overlay de fondo - z-index MUY ALTO */}
      <div
        className={`fixed inset-0 ${styles.overlay} z-[9998] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer del menú (75% de ancho) - z-index MÁXIMO */}
      <div
        className={`fixed top-0 right-0 h-full w-[75%] max-w-sm z-[9999] transform transition-transform duration-300 ease-out shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${styles.container}`}
      >
        {/* Header del menú */}
        <div className={`flex items-center justify-between p-6 ${styles.header}`}>
          <h2 className={styles.title}>
            {storeName}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 transition-all duration-200 ${styles.closeBtn}`}
            aria-label="Cerrar menú"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`flex items-center px-4 py-3 font-medium transition-all duration-200 ${styles.navItem}`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer del menú */}
        <div className={`absolute bottom-0 left-0 right-0 p-6 ${styles.footer}`}>
          <p className="text-xs text-center">
            © {new Date().getFullYear()} {storeName}
          </p>
        </div>
      </div>
    </>
  )
}
