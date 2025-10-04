'use client'

import { Product } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Crown, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

interface ClassicProductCardProps {
  product: Product
  storeSlug: string
}

export default function ClassicProductCard({ product, storeSlug }: ClassicProductCardProps) {
  const { addToCart, isInCart } = useCart()
  return (
    <div className="group bg-white border border-amber-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 relative">
      {/* Marco dorado clásico */}
      <div className="absolute inset-0 border-4 border-transparent group-hover:border-amber-200 transition-all duration-500 rounded-lg"></div>

      {/* Imagen con marco clásico */}
      <div className="relative h-80 bg-gradient-to-br from-amber-50 to-cream-100 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Badge premium */}
        {product.isFeatured && (
          <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-serif flex items-center space-x-1">
            <Crown className="w-3 h-3" />
            <span>Premium</span>
          </div>
        )}

        {/* Overlay clásico */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        {/* Información de hover elegante */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="bg-white/95 backdrop-blur-sm p-4 rounded border border-amber-200 space-y-2">
            <p className="text-xs text-amber-800 mb-2 font-serif text-center">
              Handcrafted Excellence
            </p>
            <button
              onClick={(e) => {
                e.preventDefault()
                addToCart(product)
              }}
              className="block w-full py-2 bg-amber-600 text-white text-sm text-center font-serif hover:bg-amber-700 transition-colors duration-300 rounded flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isInCart(product.id) ? 'Add More' : 'Add to Bag'}</span>
            </button>
            <Link
              href={`/${storeSlug}/productos/${product.slug}`}
              className="block w-full py-2 border border-amber-600 text-amber-600 text-sm text-center font-serif hover:bg-amber-50 transition-colors duration-300 rounded"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>

      {/* Información del producto estilo clásico */}
      <div className="p-6 bg-gradient-to-b from-white to-amber-50">
        {/* Categoría */}
        <div className="mb-3">
          <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-serif uppercase tracking-wider">
            {product.category.name}
          </span>
        </div>

        {/* Nombre del producto */}
        <Link href={`/${storeSlug}/productos/${product.slug}`}>
          <h3 className="text-lg font-serif text-amber-900 mb-2 line-clamp-2 hover:text-amber-700 transition-colors duration-300">
            {product.name}
          </h3>
        </Link>

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
          <span className="ml-2 text-sm text-amber-600 font-serif">(Premium Quality)</span>
        </div>

        {/* Precio con estilo clásico */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-serif text-amber-900">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-amber-400 line-through font-serif">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

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
  )
}