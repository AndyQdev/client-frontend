'use client'

import { Product } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { ShoppingBag, Check, Star, Heart } from 'lucide-react'
import { useState } from 'react'

interface MinimalProductCardProps {
  product: Product
  storeSlug: string
}

export default function MinimalProductCard({ product, storeSlug }: MinimalProductCardProps) {
  const { addToCart, isInCart } = useCart()
  const [showAdded, setShowAdded] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setShowAdded(true)
    setTimeout(() => setShowAdded(false), 2000)
  }

  return (
    <div className="group relative">
      {/* Badge de descuento premium */}
      {product.originalPrice && (
        <div className="absolute top-3 left-3 bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-medium z-10 shadow-sm">
          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
        </div>
      )}

      {/* Botón de favorito */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${isLiked ? 'fill-rose-400 text-rose-400' : 'text-gray-600'}`}
        />
      </button>

      {/* Imagen con gradiente suave */}
      <div className="relative aspect-square bg-gradient-to-br from-rose-50 via-white to-emerald-50 mb-4 overflow-hidden rounded-xl">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Hover overlay con gradiente suave */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-4">
          <button
            onClick={handleAddToCart}
            className="translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-rose-400/90 backdrop-blur-sm text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-rose-500 flex items-center space-x-2 shadow-lg"
          >
            {showAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Agregado</span>
              </>
            ) : isInCart(product.id) ? (
              <>
                <Check className="w-4 h-4" />
                <span>En Carrito</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Información premium */}
      <div className="space-y-2">
        <Link href={`/${storeSlug}/productos/${product.id}`}>
          <h3 className="text-gray-800 hover:text-rose-400 transition-colors text-base font-light tracking-wide line-clamp-2 leading-relaxed">
            {product.name}
          </h3>
        </Link>

        {/* Rating estrellas */}
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < 4
                  ? 'fill-amber-300 text-amber-300'
                  : 'fill-gray-200 text-gray-200'
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-2">(4.5)</span>
        </div>

        {/* Precio elegante */}
        <div className="flex items-baseline space-x-2 pt-1">
          <span className="text-gray-900 text-lg font-light">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 text-sm line-through font-light">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Stock con indicador visual */}
        <div className="flex items-center space-x-2 text-xs">
          <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-400' : product.stock > 0 ? 'bg-amber-400' : 'bg-rose-400'}`} />
          <span className="text-gray-500 font-light">
            {product.stock > 10 ? 'En stock' : product.stock > 0 ? `Solo ${product.stock} disponibles` : 'Agotado'}
          </span>
        </div>
      </div>
    </div>
  )
}