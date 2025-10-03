import { Store } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Phone, Mail } from 'lucide-react'

interface EleganteStoreHeaderProps {
  store: Store
}

export default function EleganteStoreHeader({ store }: EleganteStoreHeaderProps) {
  return (
    <>
      {/* Barra superior elegante */}
      <div className="bg-black text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{store.contact.phone}</span>
              </div>
              <div className="hidden sm:flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{store.contact.email}</span>
              </div>
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
            <button className="lg:hidden p-2">
              <Menu className="w-6 h-6 text-gray-800" />
            </button>

            {/* Logo central */}
            <Link href={`/${store.slug}`} className="flex-1 lg:flex-none lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                {store.logo ? (
                  <Image
                    src={store.logo}
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
              <Link href="#" className="text-sm text-gray-800 hover:text-black transition-colors duration-300 uppercase tracking-widest font-light">
                Nuevos
              </Link>
              <Link href="#" className="text-sm text-gray-800 hover:text-black transition-colors duration-300 uppercase tracking-widest font-light">
                Mujer
              </Link>
              <Link href="#" className="text-sm text-gray-800 hover:text-black transition-colors duration-300 uppercase tracking-widest font-light">
                Hombre
              </Link>
              <Link href="#" className="text-sm text-gray-800 hover:text-black transition-colors duration-300 uppercase tracking-widest font-light">
                Accesorios
              </Link>
            </nav>

            {/* Acciones elegantes */}
            <div className="flex items-center space-x-6">
              <button className="text-sm text-gray-800 hover:text-black transition-colors duration-300 uppercase tracking-widest font-light hidden sm:block">
                Buscar
              </button>
              <button className="text-sm text-gray-800 hover:text-black transition-colors duration-300 uppercase tracking-widest font-light">
                Cuenta
              </button>
              <button className="relative text-sm text-gray-800 hover:text-black transition-colors duration-300 uppercase tracking-widest font-light">
                Carrito (0)
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}