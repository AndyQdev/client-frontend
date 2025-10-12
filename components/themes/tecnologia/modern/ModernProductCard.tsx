'use client'

import { Product } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star, ShoppingCart, Check, Eye } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useState, useEffect, useRef } from 'react'

interface ModernProductCardProps {
  product: Product
  storeSlug: string
  index?: number
}

export default function ModernProductCard({ product, storeSlug, index = 0 }: ModernProductCardProps) {
  const { addToCart, isInCart } = useCart()
  const [showAdded, setShowAdded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
    setShowAdded(true)
    setTimeout(() => setShowAdded(false), 2000)
  }

  return (
    <div
      ref={cardRef}
      className={`product-card group transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link href={`/${storeSlug}/productos/${product.id}`}>
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#1E2749] to-[#151B3B]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="product-image object-cover"
          />

          {/* Discount Badge */}
          {product.originalPrice && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </div>
          )}

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end justify-center pb-6 gap-3">
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
              title="Favorito"
            >
              <Heart className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || showAdded}
              className={`px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-lg ${
                showAdded
                  ? 'bg-green-500 text-white'
                  : product.stock === 0
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-blue-500/50'
              }`}
              title="Agregar al carrito"
            >
              {showAdded ? (
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Agregado</span>
                </div>
              ) : product.stock === 0 ? (
                'Agotado'
              ) : (
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Agregar</span>
                </div>
              )}
            </button>

            <button
              className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
              title="Vista rápida"
            >
              <Eye className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Stock Badge */}
          {product.stock > 0 && product.stock < 5 && (
            <div className="absolute top-4 right-4 bg-orange-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              ¡Solo {product.stock}!
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info p-6">
          {/* Category */}
          <div className="mb-3">
            <span className="product-category">
              {product.category.name}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="product-title mb-2 line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>

          {/* Brand */}
          {product.brand && (
            <p className="product-brand mb-4">
              {product.brand.name}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600 fill-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500 font-medium">4.0</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="product-price">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-600 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock Indicator */}
          <div className="mt-4 text-sm">
            {product.stock > 5 ? (
              <span className="text-green-400 font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                En stock
              </span>
            ) : product.stock > 0 ? (
              <span className="text-orange-400 font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                Pocas unidades
              </span>
            ) : (
              <span className="text-gray-600 font-medium">Agotado</span>
            )}
          </div>
        </div>
      </Link>

      {/* Mobile Add to Cart Button */}
      <div className="px-6 pb-6 md:hidden">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || showAdded}
          className={`w-full py-3 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
            showAdded
              ? 'bg-green-500 text-white'
              : product.stock === 0
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/50'
          }`}
        >
          {showAdded ? (
            <div className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span>Agregado</span>
            </div>
          ) : product.stock === 0 ? (
            'Agotado'
          ) : (
            <div className="flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span>Agregar al Carrito</span>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}
