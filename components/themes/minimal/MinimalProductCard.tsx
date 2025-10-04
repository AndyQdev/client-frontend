'use client'

import { Product } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { ShoppingBag, Check } from 'lucide-react'
import { useState } from 'react'

interface MinimalProductCardProps {
  product: Product
  storeSlug: string
}

export default function MinimalProductCard({ product, storeSlug }: MinimalProductCardProps) {
  const { addToCart, isInCart } = useCart()
  const [showAdded, setShowAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setShowAdded(true)
    setTimeout(() => setShowAdded(false), 2000)
  }

  return (
    <div className="group">
      {/* Imagen ultra minimal */}
      <div className="relative aspect-square bg-gray-50 mb-6 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
        />

        {/* Hover overlay muy sutil con botón */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300 flex items-end justify-center p-4">
          <button
            onClick={handleAddToCart}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-900 text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 flex items-center space-x-2"
          >
            {showAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added</span>
              </>
            ) : isInCart(product.id) ? (
              <>
                <Check className="w-4 h-4" />
                <span>In Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Información ultra limpia */}
      <div className="space-y-3">
        <Link href={`/${storeSlug}/productos/${product.slug}`}>
          <h3 className="text-gray-900 hover:text-gray-600 transition-colors text-sm font-medium line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Precio simple */}
        <div className="flex items-center space-x-3">
          <span className="text-gray-900 text-sm font-medium">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 text-sm line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Stock minimal */}
        <div className="text-xs text-gray-500">
          {product.stock > 0 ? `${product.stock} available` : 'Sold out'}
        </div>
      </div>
    </div>
  )
}