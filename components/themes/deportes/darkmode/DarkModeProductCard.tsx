'use client'

import { Product } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingBag, Check, Zap, TrendingUp, Award } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useState } from 'react'

interface DarkModeProductCardProps {
  product: Product
  storeSlug: string
}

export default function DarkModeProductCard({ product, storeSlug }: DarkModeProductCardProps) {
  const { addToCart, isInCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

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
      <article
        className="group bg-gradient-to-br from-zinc-900 to-black rounded-xl overflow-hidden border border-zinc-800 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 h-full flex flex-col relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Barra de energía superior */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-violet-500 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

        {/* Imagen con Overlay energético */}
        <div className="relative aspect-[4/5] bg-black overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          {/* Overlay con gradiente energético */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

          {/* Badge de Descuento energético */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1.5 rounded-lg z-10 shadow-lg shadow-emerald-500/50 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs font-bold uppercase tracking-wide">-{discount}%</span>
            </div>
          )}

          {/* Badge de Bestseller */}
          {product.isFeatured && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-lg z-10 shadow-lg shadow-amber-500/50 flex items-center gap-1">
              <Award className="w-3 h-3" />
              <span className="text-xs font-bold uppercase tracking-wide">Top</span>
            </div>
          )}

          {/* Badge de Stock bajo */}
          {product.stock < 10 && product.stock > 0 && !product.isFeatured && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-lg z-10 shadow-lg shadow-orange-500/50 flex items-center gap-1 animate-pulse">
              <Zap className="w-3 h-3" />
              <span className="text-xs font-bold uppercase tracking-wide">¡Últimos!</span>
            </div>
          )}

          {/* Botón de acción rápida */}
          <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full py-3.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all shadow-lg relative overflow-hidden ${
                isAdding
                  ? 'bg-emerald-600 text-white shadow-emerald-500/50'
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-emerald-500/50'
              }`}
            >
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              {isAdding ? (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <Check className="w-4 h-4" />
                  ¡Agregado!
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <ShoppingBag className="w-4 h-4" />
                  Agregar al Carrito
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-5 flex-1 flex flex-col bg-gradient-to-b from-zinc-900/50 to-black/50">
          {/* Categoría con icono */}
          <div className="mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              {product.category.name}
            </span>
          </div>

          {/* Título */}
          <h3 className="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors leading-tight">
            {product.name}
          </h3>

          {/* Marca */}
          {product.brand && (
            <p className="text-xs text-zinc-500 mb-3 font-medium uppercase tracking-wide">
              {product.brand.name}
            </p>
          )}

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Precio y Rating */}
          <div className="pt-4 border-t border-zinc-800">
            <div className="flex items-end justify-between mb-3">
              <div>
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">
                  ${product.price.toLocaleString()}
                </div>
                {product.originalPrice && (
                  <div className="text-sm text-zinc-600 line-through font-medium">
                    ${product.originalPrice.toLocaleString()}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-md">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-amber-400">4.8</span>
              </div>
            </div>

            {/* Stock Info con barra de progreso */}
            <div className="space-y-2">
              {product.stock > 20 ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-emerald-400 font-bold">✓ Disponible</span>
                </div>
              ) : product.stock > 0 ? (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-xs text-amber-400 font-bold">⚡ Solo {product.stock} unidades</span>
                  </div>
                  {/* Barra de stock */}
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((product.stock / 20) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  <span className="text-xs text-zinc-600 font-bold">Agotado</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
