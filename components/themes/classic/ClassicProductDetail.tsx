'use client'

import { Product, Store } from '@/lib/types'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Plus, Minus, ShoppingBag, Check, Star, Crown, Award } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import ClassicStoreHeader from './ClassicStoreHeader'
import ClassicCartSheet from './ClassicCartSheet'

interface ClassicProductDetailProps {
  product: Product
  store: Store
}

export default function ClassicProductDetail({ product, store }: ClassicProductDetailProps) {
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-cream-50">
      {/* Header */}
      <ClassicStoreHeader store={store} onCartClick={() => setIsCartOpen(true)} />

      {/* Breadcrumb Navigation with Classic Style */}
      <div className="bg-gradient-to-r from-amber-100 via-cream-100 to-amber-100 border-y border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm font-serif">
            <Link
              href={`/${store.slug}`}
              className="text-amber-700 hover:text-amber-900 transition-colors flex items-center space-x-1"
            >
              <Crown className="w-3 h-3" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-amber-400" />
            <Link
              href={`/${store.slug}#products`}
              className="text-amber-700 hover:text-amber-900 transition-colors"
            >
              Collection
            </Link>
            <ChevronRight className="w-4 h-4 text-amber-400" />
            <span className="text-amber-900 font-semibold">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Ornamental Divider */}
      <div className="flex justify-center py-6">
        <div className="flex items-center space-x-3">
          <div className="w-24 h-px bg-gradient-to-r from-transparent to-amber-300"></div>
          <div className="w-3 h-3 border-2 border-amber-400 rotate-45"></div>
          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
          <div className="w-3 h-3 border-2 border-amber-400 rotate-45"></div>
          <div className="w-24 h-px bg-gradient-to-l from-transparent to-amber-300"></div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Images with Ornamental Frame */}
          <div className="space-y-6">
            {/* Main Image with Classic Frame */}
            <div className="relative bg-white p-6 border-4 border-amber-200 shadow-xl">
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-amber-400"></div>
              <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-amber-400"></div>
              <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-amber-400"></div>
              <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-amber-400"></div>

              <div className="relative aspect-square bg-gradient-to-br from-amber-50 to-cream-100 overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Premium Badge */}
              {product.isFeatured && (
                <div className="absolute top-8 -right-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 font-serif shadow-lg transform rotate-3">
                  <div className="flex items-center space-x-1">
                    <Crown className="w-4 h-4" />
                    <span className="text-sm">Premium Quality</span>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnails with Classic Style */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square bg-white p-2 transition-all ${
                      selectedImage === index
                        ? 'border-4 border-amber-500 shadow-lg'
                        : 'border-2 border-amber-200 hover:border-amber-400'
                    }`}
                  >
                    <div className="relative w-full h-full bg-gradient-to-br from-amber-50 to-cream-100">
                      <Image
                        src={image}
                        alt={`${product.name} - ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info with Heritage Style */}
          <div className="space-y-6">
            {/* Category Badge */}
            {product.category && (
              <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 border border-amber-300">
                <Award className="w-4 h-4" />
                <span className="text-sm font-serif uppercase tracking-wider">
                  {product.category.name}
                </span>
              </div>
            )}

            {/* Product Name */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-serif text-amber-900 mb-3 leading-tight">
                {product.name}
              </h1>
              {product.brand && (
                <p className="text-lg text-amber-700 font-serif italic">
                  Crafted by {product.brand.name}
                </p>
              )}
            </div>

            {/* Ornamental Divider */}
            <div className="flex items-center space-x-3 py-2">
              <div className="w-16 h-px bg-amber-400"></div>
              <div className="w-2 h-2 border border-amber-500 rotate-45"></div>
              <div className="flex-1 h-px bg-amber-300"></div>
            </div>

            {/* Quality Rating */}
            <div className="bg-gradient-to-r from-amber-50 to-cream-50 p-4 border-2 border-amber-200">
              <div className="flex items-center space-x-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-sm text-amber-800 font-serif italic">
                Certified Premium Quality
              </p>
            </div>

            {/* Price with Classic Style */}
            <div className="bg-white p-6 border-2 border-amber-200 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-700 font-serif mb-2">Heritage Price</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl font-serif text-amber-900">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-2xl text-amber-400 line-through font-serif">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                {product.originalPrice && (
                  <div className="bg-amber-600 text-white px-3 py-1 font-serif text-sm">
                    Save ${(product.originalPrice - product.price).toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="font-serif text-sm">
              {product.stock > 0 ? (
                <div className="flex items-center space-x-2 text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{product.stock} pieces available in our heritage collection</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-red-700">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Currently unavailable</span>
                </div>
              )}
            </div>

            {/* Quantity Selector with Classic Style */}
            <div className="space-y-3">
              <label className="block text-lg font-serif text-amber-900">
                Select Quantity
              </label>
              <div className="flex items-center space-x-3 bg-amber-50 border-2 border-amber-200 p-2 w-fit">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="p-3 hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed border border-amber-200"
                >
                  <Minus className="w-5 h-5 text-amber-700" />
                </button>
                <span className="w-20 text-center font-serif text-2xl text-amber-900 font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  className="p-3 hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed border border-amber-200"
                >
                  <Plus className="w-5 h-5 text-amber-700" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-5 text-lg font-serif font-bold hover:from-amber-700 hover:to-amber-800 transition-all duration-300 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg transform hover:scale-105"
            >
              {showAdded ? (
                <>
                  <Check className="w-6 h-6" />
                  <span>Added to Your Collection</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-6 h-6" />
                  <span>Add to Shopping Bag</span>
                </>
              )}
            </button>

            {/* Ornamental Divider */}
            <div className="flex items-center space-x-3 py-4">
              <div className="flex-1 h-px bg-amber-300"></div>
              <Crown className="w-5 h-5 text-amber-600" />
              <div className="flex-1 h-px bg-amber-300"></div>
            </div>

            {/* Description with Ornaments */}
            {product.description && (
              <div className="bg-white p-6 border-2 border-amber-200 shadow-md">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-px bg-amber-400"></div>
                  <h2 className="text-2xl font-serif text-amber-900">Heritage Description</h2>
                  <div className="flex-1 h-px bg-amber-400"></div>
                </div>
                <p className="text-amber-800 leading-relaxed font-serif">
                  {product.description}
                </p>
              </div>
            )}

            {/* Specifications with Classic Layout */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="bg-gradient-to-br from-amber-50 to-cream-50 p-6 border-2 border-amber-200 shadow-md">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-px bg-amber-400"></div>
                  <h2 className="text-2xl font-serif text-amber-900">Specifications</h2>
                  <div className="flex-1 h-px bg-amber-400"></div>
                </div>
                <dl className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between text-sm py-2 border-b border-amber-200 last:border-0"
                    >
                      <dt className="text-amber-700 font-serif">{key}</dt>
                      <dd className="text-amber-900 font-serif font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Tags with Classic Style */}
            {product.tags && product.tags.length > 0 && (
              <div className="bg-white p-6 border-2 border-amber-200 shadow-md">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-px bg-amber-400"></div>
                  <h2 className="text-2xl font-serif text-amber-900">Collection Tags</h2>
                  <div className="flex-1 h-px bg-amber-400"></div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-amber-100 text-amber-800 border border-amber-300 font-serif text-sm hover:bg-amber-200 transition-colors"
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

      {/* Bottom Ornamental Divider */}
      <div className="flex justify-center pb-8">
        <div className="flex items-center space-x-3">
          <div className="w-32 h-px bg-gradient-to-r from-transparent to-amber-300"></div>
          <div className="w-3 h-3 border-2 border-amber-400 rotate-45"></div>
          <Crown className="w-5 h-5 text-amber-600" />
          <div className="w-3 h-3 border-2 border-amber-400 rotate-45"></div>
          <div className="w-32 h-px bg-gradient-to-l from-transparent to-amber-300"></div>
        </div>
      </div>

      {/* Cart Sheet */}
      <ClassicCartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} storeSlug={store.slug} />
    </div>
  )
}
