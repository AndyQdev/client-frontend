'use client'

import { Product } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Eye, Heart } from 'lucide-react'
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
  const cardRef = useRef<HTMLDivElement>(null)

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
      <Link href={`/${storeSlug}/productos/${product.slug}`}>
        {/* Imagen del producto */}
        <div className="product-image-wrapper relative aspect-square overflow-hidden bg-stone-50">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="product-image object-cover"
          />

          {/* Overlay con acciones al hover */}
          <div className="product-overlay absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isAdding}
              className="bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 disabled:opacity-50"
              title="Agregar al carrito"
            >
              <ShoppingCart className="w-5 h-5 text-stone-700" />
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
              title="Vista rápida"
            >
              <Eye className="w-5 h-5 text-stone-700" />
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
              title="Agregar a favoritos"
            >
              <Heart className="w-5 h-5 text-stone-700" />
            </button>
          </div>

          {/* Badge de descuento */}
          {product.originalPrice && (
            <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 text-xs font-medium uppercase tracking-wider">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}

          {/* Badge de stock bajo */}
          {product.stock > 0 && product.stock < 5 && (
            <div className="absolute top-4 right-4 bg-stone-800 text-white px-3 py-1 text-xs font-medium uppercase tracking-wider">
              ¡Últimos!
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="p-6 text-center">
          {/* Categoría */}
          <div className="mb-2">
            <span className="text-xs text-stone-500 uppercase tracking-widest font-light">
              {product.category.name}
            </span>
          </div>

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
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-stone-400 line-through font-light">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Indicador de stock */}
          <div className="text-xs">
            {product.stock > 5 ? (
              <span className="text-green-700 font-medium">● En stock</span>
            ) : product.stock > 0 ? (
              <span className="text-amber-600 font-medium">● Solo {product.stock} disponibles</span>
            ) : (
              <span className="text-stone-400 font-medium">● Agotado</span>
            )}
          </div>
        </div>
      </Link>

      {/* Botón de agregar (visible en mobile, oculto en desktop donde está en overlay) */}
      <div className="px-6 pb-6 md:hidden">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAdding}
          className="w-full bg-stone-800 hover:bg-stone-700 text-white py-3 text-sm font-medium uppercase tracking-wider transition-colors duration-300 disabled:opacity-50"
        >
          {isAdding ? 'Agregando...' : product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
        </button>
      </div>
    </div>
  )
}
