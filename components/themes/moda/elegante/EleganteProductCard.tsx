'use client'

import { Product } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { ShoppingBag, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface EleganteProductCardProps {
  product: Product
  storeSlug: string
}

export default function EleganteProductCard({ product, storeSlug }: EleganteProductCardProps) {
  const { addToCart, isInCart } = useCart()
  const [showAdded, setShowAdded] = useState(false)
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
      <div className="group cursor-pointer">
        {/* Imagen del producto con carrusel */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-6">
          <Image
            src={images[currentImageIndex]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105"
          />

          {/* Carousel Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white z-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white z-10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-black w-4'
                        : 'bg-black/30 w-1'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Overlay sutil en hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>

          {/* Badge de nuevo producto */}
          {product.isFeatured && (
            <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-xs tracking-widest uppercase font-light z-10">
              Nuevo
            </div>
          )}
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
          <h3 className="text-sm text-gray-900 hover:text-black transition-colors duration-300 line-clamp-2 font-light">
            {product.name}
          </h3>

          {/* Precio elegante */}
          <div className="flex items-center justify-center space-x-3 pt-2 mb-4">
            <span className="text-lg text-gray-900 font-light">
              Bs {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through font-light">
                Bs {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Fixed Add to Cart Button */}
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
                <ShoppingBag className="w-4 h-4" />
                <span>Agregar Más</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Añadir al carrito</span>
              </>
            )}
          </button>

          {/* Línea divisoria sutil */}
          <div className="pt-4">
            <div className="w-8 h-px bg-gray-200 mx-auto"></div>
          </div>
        </div>
      </div>
    </Link>
  )
}