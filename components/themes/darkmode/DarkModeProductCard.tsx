'use client'

import { Product } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingBag, Check, Zap } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useState } from 'react'

interface DarkModeProductCardProps {
  product: Product
  storeSlug: string
}

export default function DarkModeProductCard({ product, storeSlug }: DarkModeProductCardProps) {
  const { addToCart, isInCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsAdding(true)
    addToCart(product, 1)
    setTimeout(() => setIsAdding(false), 1500)
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Link href={`/${storeSlug}/productos/${product.slug}`}>
      <article className="group bg-zinc-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-zinc-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10 h-full flex flex-col">
        {/* Imagen con Overlay */}
        <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Overlay oscuro al hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Badge de Descuento */}
          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1.5 rounded-lg z-10">
              <span className="text-xs font-bold uppercase tracking-wide">-{discount}%</span>
            </div>
          )}

          {/* Badge de Stock */}
          {product.stock < 10 && product.stock > 0 && (
            <div className="absolute top-4 right-4 bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-lg z-10 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span className="text-xs font-bold uppercase tracking-wide">¡Últimos!</span>
            </div>
          )}

          {/* Botón al hacer hover */}
          <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full py-3 rounded-lg font-semibold text-sm uppercase tracking-wide transition-all ${
                isAdding
                  ? 'bg-green-600 text-white'
                  : 'bg-yellow-500 hover:bg-yellow-600 text-black'
              }`}
            >
              {isAdding ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  Agregado
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Agregar al Carrito
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Categoría */}
          <div className="mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {product.category.name}
            </span>
          </div>

          {/* Título */}
          <h3 className="text-lg font-semibold text-zinc-100 mb-2 line-clamp-2 group-hover:text-yellow-500 transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Marca */}
          {product.brand && (
            <p className="text-xs text-zinc-600 mb-3">
              {product.brand.name}
            </p>
          )}

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Precio y Rating */}
          <div className="pt-4 border-t border-zinc-700/50">
            <div className="flex items-end justify-between mb-3">
              <div>
                <div className="text-2xl font-bold text-yellow-500">
                  ${product.price.toLocaleString()}
                </div>
                {product.originalPrice && (
                  <div className="text-sm text-zinc-600 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="text-sm font-semibold text-zinc-300">5.0</span>
              </div>
            </div>

            {/* Stock Info */}
            <div className="text-xs text-zinc-500">
              {product.stock > 20 ? (
                <span className="text-green-500">✓ En Stock</span>
              ) : product.stock > 0 ? (
                <span className="text-yellow-500 font-semibold">⚠ Solo {product.stock} disponibles</span>
              ) : (
                <span className="text-zinc-600">Agotado</span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
