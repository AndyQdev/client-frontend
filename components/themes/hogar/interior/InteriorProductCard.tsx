'use client'

import { Product } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Eye, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useState, useEffect, useRef } from 'react'

interface InteriorProductCardProps {
  product: Product
  storeSlug: string
  index?: number
}

export default function InteriorProductCard({ product, storeSlug, index = 0 }: InteriorProductCardProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)
  
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

  // Intersection Observer para animación al scroll
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
    setIsAdding(true)
    addToCart(product, 1)
    setTimeout(() => setIsAdding(false), 1500)
  }

  return (
    <div
      ref={cardRef}
      className={`group product-card bg-white border border-stone-200 overflow-hidden transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link href={`/${storeSlug}/productos/${product.id}`}>
        <div>
          {/* Imagen del producto con carrusel */}
          <div className="product-image-wrapper relative aspect-square overflow-hidden bg-stone-50">
            <Image
              src={images[currentImageIndex]}
              alt={product.name}
              fill
              className="product-image object-cover"
            />

            {/* Carousel Controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm text-stone-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm text-stone-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-lg z-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'bg-stone-800 w-4'
                          : 'bg-stone-400/50 w-1.5'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Badge de descuento */}
            {product.originalPrice && (
              <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 text-xs font-medium uppercase tracking-wider z-10">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </div>
            )}

            {/* Badge de stock bajo */}
            {product.stock > 0 && product.stock < 5 && (
              <div className="absolute top-4 right-4 bg-stone-800 text-white px-3 py-1 text-xs font-medium uppercase tracking-wider z-10">
                ¡Últimos!
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="p-6 text-center">
            {/* Categoría */}
            {product.category && (
              <div className="mb-2">
                <span className="text-xs text-stone-500 uppercase tracking-widest font-light">
                  {product.category.name}
                </span>
              </div>
            )}

            {/* Nombre del producto */}
            <h3 className="text-base font-serif text-stone-800 mb-3 line-clamp-2 min-h-[3rem] group-hover:text-stone-600 transition-colors duration-300">
              {product.name}
            </h3>

            {/* Marca si existe */}
            {product.brand && (
              <p className="text-xs text-stone-400 mb-3 font-light uppercase tracking-wide">
                {product.brand.name}
              </p>
            )}

            {/* Precio */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-xl font-serif text-stone-800 font-medium">
                Bs {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-400 line-through font-light">
                  Bs {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Indicador de stock */}
            <div className="text-xs mb-4">
              {product.stock > 5 ? (
                <span className="text-green-700 font-medium">● En stock</span>
              ) : product.stock > 0 ? (
                <span className="text-amber-600 font-medium">● Solo {product.stock} disponibles</span>
              ) : (
                <span className="text-stone-400 font-medium">● Agotado</span>
              )}
            </div>

            {/* Fixed Add to Cart Button */}
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIsAdding(true)
                addToCart(product, 1)
                setTimeout(() => setIsAdding(false), 1500)
              }}
              disabled={product.stock === 0 || isAdding}
              className="w-full bg-stone-800 hover:bg-stone-700 text-white py-3 text-sm font-medium uppercase tracking-wider transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              {isAdding ? 'Agregando...' : product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}
