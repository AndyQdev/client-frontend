'use client'

import { Product } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { ShoppingBag, Check } from 'lucide-react'
import { useState } from 'react'

interface EleganteProductCardProps {
  product: Product
  storeSlug: string
}

export default function EleganteProductCard({ product, storeSlug }: EleganteProductCardProps) {
  const { addToCart, isInCart } = useCart()
  const [showAdded, setShowAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setShowAdded(true)
    setTimeout(() => setShowAdded(false), 2000)
  }

  return (
    <div className="group cursor-pointer">
      {/* Imagen del producto con overlay elegante */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-6">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105"
        />

        {/* Overlay sutil en hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>

        {/* Badge de nuevo producto */}
        {product.isFeatured && (
          <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-xs tracking-widest uppercase font-light">
            Nuevo
          </div>
        )}

        {/* Información de hover elegante */}
        <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="bg-white/95 backdrop-blur-sm p-4 text-center space-y-2">
            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-black text-white text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              {showAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Agregado</span>
                </>
              ) : isInCart(product.id) ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>En el carrito</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Añadir al carrito</span>
                </>
              )}
            </button>
            <Link
              href={`/${storeSlug}/productos/${product.slug}`}
              className="inline-block w-full py-3 border border-black text-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-colors duration-300"
            >
              Ver detalles
            </Link>
          </div>
        </div>
      </div>

      {/* Información del producto estilo elegante */}
      <div className="text-center space-y-2">
        {/* Marca */}
        {product.brand && (
          <p className="text-xs text-gray-500 uppercase tracking-widest font-light">
            {product.brand.name}
          </p>
        )}

        {/* Nombre del producto */}
        <Link href={`/${storeSlug}/productos/${product.slug}`}>
          <h3 className="text-sm text-gray-900 hover:text-black transition-colors duration-300 line-clamp-2 font-light">
            {product.name}
          </h3>
        </Link>

        {/* Precio elegante */}
        <div className="flex items-center justify-center space-x-3 pt-2">
          <span className="text-lg text-gray-900 font-light">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through font-light">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Línea divisoria sutil */}
        <div className="pt-4">
          <div className="w-8 h-px bg-gray-200 mx-auto"></div>
        </div>
      </div>
    </div>
  )
}