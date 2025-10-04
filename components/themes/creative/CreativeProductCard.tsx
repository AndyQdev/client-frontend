'use client'

import { Product } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Zap, Heart, Eye, ShoppingCart, Star } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useState } from 'react'

interface CreativeProductCardProps {
  product: Product
  storeSlug: string
}

export default function CreativeProductCard({ product, storeSlug }: CreativeProductCardProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const randomRotation = Math.random() * 6 - 3 // -3 to 3 degrees
  const randomColors = [
    'from-pink-500 to-purple-600',
    'from-blue-500 to-indigo-600',
    'from-green-500 to-teal-600',
    'from-yellow-500 to-orange-600',
    'from-red-500 to-pink-600',
    'from-purple-500 to-blue-600'
  ]
  const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)]

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart(product, 1)
    setTimeout(() => setIsAdding(false), 1000)
  }

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1"
      style={{ transform: `rotate(${randomRotation}deg)` }}
    >
      {/* Marco creativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl"></div>

      {/* Elementos decorativos */}
      <div className="absolute top-4 right-4 z-10">
        <Sparkles className="w-6 h-6 text-yellow-400 animate-spin group-hover:animate-ping" />
      </div>
      <div className="absolute top-2 left-2 w-3 h-3 bg-pink-400 rounded-full animate-pulse opacity-70"></div>
      <div className="absolute bottom-2 right-8 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60"></div>

      {/* Imagen con efectos creativos */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700"
        />

        {/* Filtros de color creativos */}
        <div className={`absolute inset-0 bg-gradient-to-t ${randomColor} opacity-0 group-hover:opacity-20 transition-all duration-500 mix-blend-multiply`}></div>

        {/* Badge creativo */}
        {product.isFeatured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transform -rotate-12 animate-pulse">
            ✨ Destacado
          </div>
        )}

        {/* Overlay de acciones */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300">
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <div className="flex space-x-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAdding}
                className={`flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-full text-sm font-bold hover:from-purple-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isAdding ? 'animate-pulse' : ''
                }`}
              >
                <span className="flex items-center justify-center space-x-1">
                  {isAdding ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>¡Agregando Magia!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>{product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}</span>
                    </>
                  )}
                </span>
              </button>
              <button className="bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full hover:bg-white transition-colors duration-300">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Información del producto con estilo creativo */}
      <div className="p-6 relative">
        {/* Categoría creativa */}
        <div className="mb-3">
          <span className={`inline-block bg-gradient-to-r ${randomColor} text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transform -rotate-1`}>
            {product.category.name}
          </span>
        </div>

        {/* Nombre del producto */}
        <Link href={`/${storeSlug}/productos/${product.slug}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors duration-300 transform hover:scale-105 origin-left">
            {product.name}
          </h3>
        </Link>

        {/* Marca con estilo */}
        {product.brand && (
          <p className="text-sm text-gray-500 mb-3 font-medium flex items-center space-x-1">
            <span>por</span>
            <span className="text-purple-600 font-bold">{product.brand.name}</span>
            <Star className="w-3 h-3 text-yellow-400" />
          </p>
        )}

        {/* Métricas creativas */}
        <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{Math.floor(Math.random() * 1000) + 100}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-3 h-3 text-red-400" />
              <span>{Math.floor(Math.random() * 50) + 10}</span>
            </div>
          </div>
          <div className="text-green-600 font-bold">
            {product.stock > 0 ? '✓ Disponible' : '✗ Agotado'}
          </div>
        </div>

        {/* Precio creativo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`text-2xl font-black bg-gradient-to-r ${randomColor} bg-clip-text text-transparent`}>
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
        </div>

        {/* Elementos decorativos en el footer */}
        <div className="mt-4 flex justify-center">
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-1 bg-purple-400 rounded-full animate-pulse delay-75"></div>
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      </div>
    </div>
  )
}