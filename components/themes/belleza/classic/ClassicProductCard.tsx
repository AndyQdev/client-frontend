'use client'

import { Product } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Crown, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useState } from 'react'

interface ClassicProductCardProps {
  product: Product
  storeSlug: string
}

export default function ClassicProductCard({ product, storeSlug }: ClassicProductCardProps) {
  console.log('Rendering ClassicProductCard for product:', product)
  const { addToCart, isInCart } = useCart()
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
  }

  return (
    <Link href={`/${storeSlug}/productos/${product.id}`} className="block">
      <div className="group bg-white border border-amber-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 relative cursor-pointer">
        {/* Marco dorado clásico */}
        <div className="absolute inset-0 border-4 border-transparent group-hover:border-amber-200 transition-all duration-500 rounded-lg pointer-events-none"></div>

        {/* Imagen con carrusel */}
        <div className="relative h-80 bg-gradient-to-br from-amber-50 to-cream-100 overflow-hidden">
          <Image
            src={images[currentImageIndex]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Badge premium */}
          {product.isFeatured && (
            <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-serif flex items-center space-x-1 z-10" style={{ fontVariantNumeric: 'lining-nums' }}>
              <Crown className="w-3 h-3" />
              <span>Premium</span>
            </div>
          )}

          {/* Controles del carrusel */}
          {images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <ChevronLeft className="w-5 h-5 text-amber-900" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <ChevronRight className="w-5 h-5 text-amber-900" />
              </button>

              {/* Indicadores de imagen */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-amber-600 w-4' : 'bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Información del producto estilo clásico */}
        <div className="p-6 bg-gradient-to-b from-white to-amber-50">
          {/* Categoría */}
          {product.category && (
            <div className="mb-3">
              <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-serif uppercase tracking-wider">
                {product.category.name}
              </span>
            </div>
          )}

          {/* Nombre del producto */}
          <h3 className="text-lg font-serif text-amber-900 mb-2 line-clamp-2 hover:text-amber-700 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Marca con estilo clásico */}
          {product.brand && (
            <p className="text-sm text-amber-600 mb-3 font-serif italic">
              by {product.brand.name}
            </p>
          )}

          {/* Rating con estrellas doradas */}
          <div className="flex items-center mb-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < 4 ? 'text-amber-400 fill-current' : 'text-amber-200'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-amber-600 font-serif">(Calidad Premium)</span>
          </div>

          {/* Precio con estilo clásico */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-serif text-amber-900">
                Bs {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-amber-400 line-through font-serif">
                  Bs {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Botón Agregar al Carrito */}
          <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-sm font-serif hover:from-amber-700 hover:to-amber-800 transition-all duration-300 rounded flex items-center justify-center space-x-2 shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isInCart(product.id) ? 'Agregar Más' : 'Agregar al Carrito'}</span>
          </button>

          {/* Ornamento inferior */}
          <div className="mt-4 pt-4 border-t border-amber-200">
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-px bg-amber-300"></div>
                <div className="w-2 h-2 border border-amber-400 rotate-45"></div>
                <div className="w-4 h-px bg-amber-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}