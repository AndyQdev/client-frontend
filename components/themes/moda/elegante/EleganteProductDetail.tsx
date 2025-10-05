'use client'

import { Product, Store } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronRight, Minus, Plus, ShoppingBag, Heart, Share2, Check } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import EleganteStoreHeader from './EleganteStoreHeader'
import EleganteCartSheet from './EleganteCartSheet'

interface EleganteProductDetailProps {
  product: Product
  store: Store
  relatedProducts?: Product[]
}

export default function EleganteProductDetail({ product, store, relatedProducts = [] }: EleganteProductDetailProps) {
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <EleganteStoreHeader store={store} onCartClick={() => setIsCartOpen(true)} />

      {/* Cart Sheet */}
      <EleganteCartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} storeSlug={store.slug} />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-100">
        <nav className="flex items-center space-x-2 text-xs uppercase tracking-widest">
          <Link href={`/${store.slug}`} className="text-gray-500 hover:text-black transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link href={`/${store.slug}`} className="text-gray-500 hover:text-black transition-colors">
            {product.category.name}
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-black">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.isFeatured && (
                <div className="absolute top-8 left-8 bg-white text-black px-4 py-2 text-xs tracking-widest uppercase font-light">
                  Nuevo
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
                    className={`relative aspect-square overflow-hidden transition-all duration-300 ${
                      selectedImage === index
                        ? 'opacity-100'
                        : 'opacity-50 hover:opacity-75'
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
          <div className="space-y-8">
            {/* Brand */}
            {product.brand && (
              <p className="text-xs text-gray-500 uppercase tracking-widest font-light">
                {product.brand.name}
              </p>
            )}

            {/* Product Name */}
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight tracking-tight">
              {product.name}
            </h1>

            {/* Category */}
            <div className="inline-block border border-gray-200 px-4 py-2">
              <span className="text-xs text-gray-600 uppercase tracking-widest font-light">
                {product.category.name}
              </span>
            </div>

            {/* Price */}
            <div className="py-6 border-t border-b border-gray-200">
              <div className="flex items-baseline space-x-4">
                <span className="text-4xl font-light text-gray-900">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through font-light">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <p className="mt-3 text-sm text-gray-600 font-light">
                  Ahorro de {discount}% en este artículo
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-3">
              {product.stock > 0 ? (
                <span className="text-sm text-gray-600 font-light">
                  {product.stock > 10 ? 'Disponible' : `Solo ${product.stock} disponibles`}
                </span>
              ) : (
                <span className="text-sm text-gray-600 font-light">Agotado</span>
              )}
            </div>

            {/* Description Preview */}
            {product.description && (
              <div className="py-4">
                <p className="text-gray-600 font-light leading-relaxed">
                  {product.description.slice(0, 200)}
                  {product.description.length > 200 && '...'}
                </p>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-4">
              <label className="text-xs uppercase tracking-widest text-gray-700 font-light">
                Cantidad
              </label>
              <div className="flex items-center border border-gray-300 w-fit">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="p-4 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-8 text-lg font-light">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  className="p-4 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full py-5 text-sm uppercase tracking-widest font-light flex items-center justify-center space-x-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  showAdded
                    ? 'bg-green-600 text-white'
                    : isInCart(product.id)
                    ? 'bg-gray-800 text-white hover:bg-black'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {showAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Agregado al carrito</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>{isInCart(product.id) ? 'Agregar más' : 'Añadir al carrito'}</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button className="py-4 border border-gray-300 text-sm uppercase tracking-widest font-light flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all duration-300">
                  <Heart className="w-4 h-4" />
                  <span>Guardar</span>
                </button>
                <button className="py-4 border border-gray-300 text-sm uppercase tracking-widest font-light flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all duration-300">
                  <Share2 className="w-4 h-4" />
                  <span>Compartir</span>
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="pt-8 space-y-3 border-t border-gray-200">
              <div className="flex items-center space-x-3 text-sm text-gray-600 font-light">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>Envío gratuito en compras superiores a $100.000</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 font-light">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>Devoluciones gratuitas dentro de 30 días</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 font-light">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>Garantía de autenticidad</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details & Specifications */}
        <div className="mt-24 border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-16">
            {/* Description */}
            <div className="space-y-6">
              <h2 className="text-2xl font-light text-gray-900 uppercase tracking-widest">
                Descripción
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600 font-light leading-relaxed">
                  {product.description || 'Este producto excepcional combina elegancia atemporal con calidad incomparable. Cada detalle ha sido cuidadosamente considerado para ofrecerle una experiencia de lujo refinado.'}
                </p>
                <p className="text-gray-600 font-light leading-relaxed">
                  Diseñado para quienes aprecian la excelencia, este artículo representa la perfecta fusión entre forma y función, tradición e innovación.
                </p>
              </div>
            </div>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-light text-gray-900 uppercase tracking-widest">
                  Especificaciones
                </h2>
                <div className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-4 border-b border-gray-100">
                      <span className="text-sm text-gray-500 uppercase tracking-widest font-light">{key}</span>
                      <span className="text-sm text-gray-900 font-light">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-gray-200 pt-16">
            <h2 className="text-3xl font-light text-gray-900 uppercase tracking-widest mb-12 text-center">
              También te puede interesar
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/${store.slug}/productos/${relatedProduct.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[3/4] bg-gray-50 mb-4 overflow-hidden">
                    <Image
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-sm text-gray-900 font-light line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-light">
                      ${relatedProduct.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Elegant Divider */}
        <div className="mt-24 flex justify-center">
          <div className="w-16 h-px bg-gray-200"></div>
        </div>
      </div>
    </div>
  )
}
