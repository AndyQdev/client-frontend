'use client'

import { Product, Store } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronRight, Minus, Plus, ShoppingCart, Heart, Share2, Star, Check, Truck, Shield, RefreshCw } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import ModernStoreHeader from './ModernStoreHeader'
import ModernCartSheet from './ModernCartSheet'

interface ModernProductDetailProps {
  product: Product
  store: Store
  relatedProducts?: Product[]
}

export default function ModernProductDetail({ product, store, relatedProducts = [] }: ModernProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showAdded, setShowAdded] = useState(false)
  const { addToCart, isInCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setShowAdded(true)
    setTimeout(() => setShowAdded(false), 2000)
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

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <ModernStoreHeader store={store} onCartClick={() => setIsCartOpen(true)} />

      {/* Cart Sheet */}
      <ModernCartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} storeSlug={store.slug} />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center space-x-2 text-sm">
          <Link href={`/${store.slug}`} className="text-gray-500 hover:text-blue-600 transition-colors">
            Tienda
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href={`/${store.slug}`} className="text-gray-500 hover:text-blue-600 transition-colors">
            {product.category.name}
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-xl">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {discount > 0 && (
                <div className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  -{discount}% OFF
                </div>
              )}
              {product.isFeatured && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Destacado
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 ${
                      selectedImage === index
                        ? 'ring-4 ring-blue-500 scale-105'
                        : 'ring-2 ring-gray-200 hover:ring-blue-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div>
              <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wide">
                {product.category.name}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Brand */}
            {product.brand && (
              <p className="text-lg text-gray-600 font-medium">
                Por <span className="text-blue-600">{product.brand.name}</span>
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">4.0 (120 reseñas)</span>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6">
              <div className="flex items-baseline space-x-4">
                <span className="text-5xl font-bold text-gray-900">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <p className="mt-2 text-green-600 font-semibold">
                  Ahorras ${(product.originalPrice! - product.price).toLocaleString()}
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-3">
              {product.stock > 0 ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 font-semibold">
                    {product.stock > 10 ? 'En stock' : `Solo ${product.stock} disponibles`}
                  </span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-600 font-semibold">Agotado</span>
                </>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">Cantidad</label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-white rounded-2xl shadow-md overflow-hidden">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="p-4 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-8 text-xl font-bold">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="p-4 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
                  showAdded
                    ? 'bg-green-500 text-white'
                    : isInCart(product.id)
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                }`}
              >
                {showAdded ? (
                  <>
                    <Check className="w-6 h-6" />
                    <span>Agregado al carrito</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    <span>{isInCart(product.id) ? 'Agregar más' : 'Agregar al carrito'}</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 px-4 border-2 border-gray-300 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all duration-300">
                  <Heart className="w-5 h-5" />
                  <span>Favorito</span>
                </button>
                <button className="py-3 px-4 border-2 border-gray-300 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                  <span>Compartir</span>
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-2xl shadow-sm">
                <Truck className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Envío gratis</p>
                  <p className="text-sm font-semibold">Pedidos +$100k</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-2xl shadow-sm">
                <Shield className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Compra segura</p>
                  <p className="text-sm font-semibold">100% protegido</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-2xl shadow-sm">
                <RefreshCw className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Devoluciones</p>
                  <p className="text-sm font-semibold">30 días</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description & Specifications */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Description */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Descripción del producto</h2>
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-600 leading-relaxed">
                {product.description || 'Este producto de alta calidad está diseñado para ofrecerte la mejor experiencia. Fabricado con materiales premium y atención al detalle, combina funcionalidad y estilo de manera excepcional.'}
              </p>
            </div>
          </div>

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Especificaciones</h2>
              <div className="space-y-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">{key}</span>
                    <span className="text-gray-900 font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Productos relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/${store.slug}/productos/${relatedProduct.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-bold text-blue-600">
                      ${relatedProduct.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
