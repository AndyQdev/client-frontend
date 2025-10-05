'use client'

import { Product } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star, ShoppingCart, Check } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useState } from 'react'

interface ModernProductCardProps {
  product: Product
  storeSlug: string
}

export default function ModernProductCard({ product, storeSlug }: ModernProductCardProps) {
  const { addToCart, isInCart } = useCart()
  const [showAdded, setShowAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setShowAdded(true)
    setTimeout(() => setShowAdded(false), 2000)
  }

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
      {/* Imagen del producto */}
      <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Badge de descuento */}
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}

        {/* Botón de favorito */}
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50">
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
        </button>

        {/* Botón de añadir al carrito - aparece en hover */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            className={`w-full py-3 px-4 rounded-2xl font-medium flex items-center justify-center space-x-2 transition-all duration-200 ${
              showAdded
                ? 'bg-green-500 text-white'
                : isInCart(product.id)
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {showAdded ? (
              <>
                <Check className="w-5 h-5" />
                <span>¡Agregado!</span>
              </>
            ) : isInCart(product.id) ? (
              <>
                <Check className="w-5 h-5" />
                <span>En el carrito</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>Añadir al carrito</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Información del producto */}
      <div className="p-6">
        {/* Categoría */}
        <div className="mb-2">
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
            {product.category.name}
          </span>
        </div>

        {/* Nombre del producto */}
        <Link href={`/${storeSlug}/productos/${product.slug}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* Marca */}
        {product.brand && (
          <p className="text-sm text-gray-500 mb-3 font-medium">
            {product.brand.name}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600 font-medium">4.0 (120)</span>
        </div>

        {/* Precio */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="text-right">
            {product.stock > 0 ? (
              <span className="text-sm text-green-600 font-medium">En stock</span>
            ) : (
              <span className="text-sm text-red-600 font-medium">Agotado</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}