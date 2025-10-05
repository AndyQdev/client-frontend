'use client'

import { Product, Store } from '@/lib/types'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Plus, Minus, ShoppingBag, Check } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import MinimalStoreHeader from './MinimalStoreHeader'
import MinimalCartSheet from './MinimalCartSheet'

interface MinimalProductDetailProps {
  product: Product
  store: Store
}

export default function MinimalProductDetail({ product, store }: MinimalProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showAdded, setShowAdded] = useState(false)
  const { addToCart, isInCart } = useCart()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setShowAdded(true)
    setTimeout(() => setShowAdded(false), 2000)
    setIsCartOpen(true)
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <MinimalStoreHeader store={store} onCartClick={() => setIsCartOpen(true)} />

      {/* Breadcrumb Navigation */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <Link href={`/${store.slug}`} className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/${store.slug}#products`} className="hover:text-gray-900 transition-colors">
            Products
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square bg-gray-50 overflow-hidden transition-all ${
                      selectedImage === index
                        ? 'ring-2 ring-gray-900'
                        : 'ring-1 ring-gray-200 hover:ring-gray-400'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Category */}
            {product.category && (
              <div>
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  {product.category.name}
                </span>
              </div>
            )}

            {/* Product Name */}
            <div>
              <h1 className="text-4xl font-medium text-gray-900 mb-3">
                {product.name}
              </h1>
              {product.brand && (
                <p className="text-sm text-gray-500">by {product.brand.name}</p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-medium text-gray-900">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="text-sm">
              {product.stock > 0 ? (
                <span className="text-gray-600">
                  {product.stock} in stock
                </span>
              ) : (
                <span className="text-red-600">Out of stock</span>
              )}
            </div>

            {/* Quantity Controls */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-900">
                Quantity
              </label>
              <div className="flex items-center border border-gray-200 w-fit">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="w-16 text-center font-medium text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-gray-900 text-white py-4 text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {showAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            {/* Description */}
            {product.description && (
              <div className="pt-8 border-t border-gray-100 space-y-3">
                <h2 className="text-lg font-medium text-gray-900">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="pt-8 border-t border-gray-100 space-y-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Specifications
                </h2>
                <dl className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <dt className="text-gray-500">{key}</dt>
                      <dd className="text-gray-900 font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="pt-8 border-t border-gray-100 space-y-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Sheet */}
      <MinimalCartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} storeSlug={store.slug} />
    </div>
  )
}
