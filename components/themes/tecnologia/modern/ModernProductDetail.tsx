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
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Header */}
      <ModernStoreHeader store={store} onCartClick={() => setIsCartOpen(true)} />

      {/* Cart Sheet */}
      <ModernCartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} storeSlug={store.slug} />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center space-x-2 text-sm">
          <Link href={`/${store.slug}`} className="text-[#A3A3A3] hover:text-[#D4AF37] transition-colors">
            Tienda
          </Link>
          <ChevronRight className="w-4 h-4 text-[#6B7280]" />
          <Link href={`/${store.slug}`} className="text-[#A3A3A3] hover:text-[#D4AF37] transition-colors">
            {product.category.name}
          </Link>
          <ChevronRight className="w-4 h-4 text-[#6B7280]" />
          <span className="text-[#F5F5F5] font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#1A1A1A] shadow-xl border border-[#2A2A2A]">
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
                <div className="absolute top-6 right-6 bg-[#D4AF37] text-[#0F0F0F] px-4 py-2 rounded-full text-sm font-bold shadow-lg">
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
                        ? 'ring-4 ring-[#D4AF37] scale-105'
                        : 'ring-2 ring-[#2A2A2A] hover:ring-[#D4AF37]/50'
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
              <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wide border border-[#D4AF37]/20">
                {product.category.name}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl font-bold text-[#F5F5F5] leading-tight">
              {product.name}
            </h1>

            {/* Brand */}
            {product.brand && (
              <p className="text-lg text-[#A3A3A3] font-medium">
                Por <span className="text-[#D4AF37]">{product.brand.name}</span>
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4 ? 'text-[#D4AF37] fill-current' : 'text-[#4B5563]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-[#A3A3A3] font-medium">4.0 (120 reseñas)</span>
            </div>

            {/* Price */}
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-3xl p-6">
              <div className="flex items-baseline space-x-4">
                <span className="text-5xl font-bold text-[#D4AF37]">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-[#6B7280] line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <p className="mt-2 text-[#E5C158] font-semibold">
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
              <label className="text-sm font-semibold text-[#F5F5F5]">Cantidad</label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="p-4 text-[#F5F5F5] hover:bg-[#2A2A2A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-8 text-xl font-bold text-[#F5F5F5]">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="p-4 text-[#F5F5F5] hover:bg-[#2A2A2A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                    ? 'bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#E5C158]'
                    : 'bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#E5C158]'
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
                <button className="py-3 px-4 border-2 border-[#2A2A2A] text-[#F5F5F5] rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300">
                  <Heart className="w-5 h-5" />
                  <span>Favorito</span>
                </button>
                <button className="py-3 px-4 border-2 border-[#2A2A2A] text-[#F5F5F5] rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                  <span>Compartir</span>
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center space-x-3 p-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl">
                <Truck className="w-8 h-8 text-[#D4AF37]" />
                <div>
                  <p className="text-xs text-[#A3A3A3]">Envío gratis</p>
                  <p className="text-sm font-semibold text-[#F5F5F5]">Pedidos +$100k</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl">
                <Shield className="w-8 h-8 text-[#D4AF37]" />
                <div>
                  <p className="text-xs text-[#A3A3A3]">Compra segura</p>
                  <p className="text-sm font-semibold text-[#F5F5F5]">100% protegido</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl">
                <RefreshCw className="w-8 h-8 text-[#D4AF37]" />
                <div>
                  <p className="text-xs text-[#A3A3A3]">Devoluciones</p>
                  <p className="text-sm font-semibold text-[#F5F5F5]">30 días</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description & Specifications */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Description */}
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-[#F5F5F5] mb-6">Descripción del producto</h2>
            <div className="prose prose-blue max-w-none">
              <p className="text-[#A3A3A3] leading-relaxed">
                {product.description || 'Este producto de alta calidad está diseñado para ofrecerte la mejor experiencia. Fabricado con materiales premium y atención al detalle, combina funcionalidad y estilo de manera excepcional.'}
              </p>
            </div>
          </div>

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-[#F5F5F5] mb-6">Especificaciones</h2>
              <div className="space-y-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-[#2A2A2A]">
                    <span className="text-[#A3A3A3] font-medium">{key}</span>
                    <span className="text-[#F5F5F5] font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-[#F5F5F5] mb-8">Productos relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/${store.slug}/productos/${relatedProduct.slug}`}
                  className="group bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden hover:border-[#D4AF37] transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-[#F5F5F5] line-clamp-2 mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-bold text-[#D4AF37]">
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
