'use client'

import { Product } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { ShoppingBag, Check, Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface MinimalProductCardProps {
  product: Product
  storeSlug: string
}

export default function MinimalProductCard({ product, storeSlug }: MinimalProductCardProps) {
  const { addToCart, isInCart } = useCart()
  const [showAdded, setShowAdded] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const images = product.images && product.images.length > 0 ? product.images : ['/placeholder-product.jpg']

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const previousImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    setShowAdded(true)
    setTimeout(() => setShowAdded(false), 2000)
  }

  return (
    <Link href={`/${storeSlug}/productos/${product.id}`}>
      <div className="group relative">
        {/* Badge de descuento premium */}
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-medium z-10 shadow-sm">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}

        {/* Botón de favorito */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsLiked(!isLiked)
          }}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isLiked ? 'fill-rose-400 text-rose-400' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Imagen con gradiente suave y carrusel */}
        <div className="relative aspect-square bg-gradient-to-br from-rose-50 via-white to-emerald-50 mb-4 overflow-hidden rounded-xl">
          <Image
            src={images[currentImageIndex]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Carousel Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white z-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white z-10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-rose-400 w-4'
                        : 'bg-white/70 w-1.5'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Información premium */}
        <div className="space-y-2">
          <h3 className="text-gray-800 hover:text-rose-400 transition-colors text-base font-light tracking-wide line-clamp-2 leading-relaxed">
            {product.name}
          </h3>

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
          <div className="flex items-baseline space-x-2 pt-1 mb-3">
            <span className="text-gray-900 text-lg font-light">
              Bs {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 text-sm line-through font-light">
                Bs {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock con indicador visual */}
          <div className="flex items-center space-x-2 text-xs mb-4">
            <div className={`w-2 h-2 rounded-full ${
              product.stock > 10
                ? 'bg-emerald-400'
                : product.stock > 0
                ? 'bg-amber-400'
                : 'bg-rose-400'
            }`} />
            <span className="text-gray-500 font-light">
              {product.stock > 10
                ? 'En stock'
                : product.stock > 0
                ? `Solo ${product.stock} disponibles`
                : 'Agotado'}
            </span>
          </div>

          {/* Fixed Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-rose-400/90 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-rose-500 flex items-center justify-center space-x-2 shadow-lg transition-all duration-300"
          >
            {showAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Agregado</span>
              </>
            ) : isInCart(product.id) ? (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Agregar Más</span>
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
    </Link>
  )
}