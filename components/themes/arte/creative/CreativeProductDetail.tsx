'use client'

import { Product, Store } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Share2, Star, Shield, Truck, RotateCcw, Sparkles, Zap, Heart, Plus, Minus, ShoppingBag, Eye, Palette, Flame } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import CreativeStoreHeader from './CreativeStoreHeader'
import CreativeCartSheet from './CreativeCartSheet'

interface CreativeProductDetailProps {
  product: Product
  store: Store
}

export default function CreativeProductDetail({ product, store }: CreativeProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { addToCart, isInCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  const randomColors = [
    'from-pink-500 to-purple-600',
    'from-blue-500 to-indigo-600',
    'from-green-500 to-teal-600',
    'from-yellow-500 to-orange-600',
    'from-red-500 to-pink-600',
    'from-purple-500 to-blue-600'
  ]
  const gradientColor = randomColors[Math.floor(Math.random() * randomColors.length)]

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart(product, quantity)
    setTimeout(() => {
      setIsAdding(false)
      setIsCartOpen(true)
    }, 1500)
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
    <>
      <CreativeStoreHeader store={store} onCartClick={() => setIsCartOpen(true)} />
      <CreativeCartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} storeSlug={store.slug} />

      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen relative overflow-hidden">
        {/* Floating decorative elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full blur-3xl opacity-20 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full blur-2xl opacity-15 animate-ping"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Creative Breadcrumb */}
          <nav className="flex items-center space-x-3 mb-8">
            <Link
              href={`/${store.slug}`}
              className="group flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-purple-600 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 group-hover:animate-bounce" />
              <span>Volver a la Magia</span>
            </Link>
            <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
            <span className={`bg-gradient-to-r ${gradientColor} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform rotate-2`}>
              {product.category.name}
            </span>
          </nav>

          {/* Creative Product Header */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-2xl border-4 border-purple-200 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-300 to-indigo-300 rounded-full blur-xl opacity-40 animate-bounce"></div>

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`bg-gradient-to-r ${gradientColor} p-3 rounded-2xl transform rotate-12 animate-pulse`}>
                    <Palette className="w-6 h-6 text-white transform -rotate-12" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 font-bold flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>{Math.floor(Math.random() * 5000) + 1000} vistas mágicas</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-12 ${
                      isLiked
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                        : 'bg-white/80 text-gray-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white'
                    } shadow-lg`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl text-white hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-lg">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-none">
                <span className={`bg-gradient-to-r ${gradientColor} bg-clip-text text-transparent animate-pulse`}>
                  {product.name}
                </span>
              </h1>

              {product.description && (
                <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium italic">
                  {product.description}
                </p>
              )}

              <div className="flex items-center space-x-6">
                {product.brand && (
                  <div className={`bg-gradient-to-r ${gradientColor} text-white px-6 py-3 rounded-full font-bold shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300`}>
                    Por {product.brand.name}
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 transition-all duration-300 ${
                        i < 4
                          ? 'text-yellow-400 fill-current animate-pulse'
                          : 'text-gray-300'
                      }`}
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                  <span className="ml-2 text-gray-600 font-bold">(4.5 ★ 89 reseñas)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Images */}
            <div className="lg:col-span-2 space-y-6">
              {/* Featured Image - Creative Style */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-200 group">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={product.images[selectedImageIndex]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                    priority
                  />

                  {/* Creative overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-multiply`}></div>

                  {/* Floating badges */}
                  <div className="absolute top-6 left-6 space-y-3">
                    {product.isFeatured && (
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-black uppercase tracking-wider shadow-2xl transform -rotate-6 animate-bounce flex items-center space-x-2">
                        <Sparkles className="w-5 h-5 animate-spin" />
                        <span>¡Magia Destacada!</span>
                      </div>
                    )}
                    {hasDiscount && (
                      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full text-sm font-black uppercase tracking-wider shadow-2xl transform rotate-3 animate-pulse flex items-center space-x-2">
                        <Flame className="w-5 h-5" />
                        <span>Oferta Caliente: -{discountPercentage}% OFF</span>
                      </div>
                    )}
                    {product.stock <= 5 && product.stock > 0 && (
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full text-sm font-black uppercase tracking-wider shadow-2xl transform -rotate-3 flex items-center space-x-2">
                        <Zap className="w-5 h-5 animate-pulse" />
                        <span>¡Solo {product.stock} Disponibles!</span>
                      </div>
                    )}
                  </div>

                  {/* Floating sparkles */}
                  <Sparkles className="absolute top-1/4 right-10 w-8 h-8 text-yellow-400 opacity-0 group-hover:opacity-100 animate-spin transition-opacity duration-300" />
                  <Star className="absolute bottom-1/4 left-10 w-6 h-6 text-pink-400 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
                </div>
              </div>

              {/* Thumbnail Gallery - Creative Grid */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square rounded-3xl overflow-hidden transition-all duration-300 transform hover:scale-110 hover:rotate-3 ${
                        selectedImageIndex === index
                          ? 'ring-4 ring-purple-500 shadow-2xl scale-105'
                          : 'ring-2 ring-purple-200 hover:ring-purple-400'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                      {selectedImageIndex === index && (
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-30 mix-blend-multiply`}></div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Creative Description Section */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-purple-200 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-xl opacity-50"></div>

                <h2 className={`text-4xl font-black mb-6 bg-gradient-to-r ${gradientColor} bg-clip-text text-transparent flex items-center space-x-3`}>
                  <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
                  <span>Los Detalles Mágicos</span>
                </h2>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6 text-lg font-medium">
                    {product.description || '¡Entra en un mundo de creatividad y maravilla! Esta pieza extraordinaria combina diseño innovador con calidad excepcional, creando una experiencia que trasciende lo ordinario. Cada detalle ha sido elaborado con pasión y precisión para traer magia a tu vida.'}
                  </p>

                  {/* Creative pull quote */}
                  <div className={`relative bg-gradient-to-r ${gradientColor} rounded-3xl p-8 my-8 text-white shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300`}>
                    <Sparkles className="absolute top-4 right-4 w-8 h-8 text-yellow-300 animate-spin" />
                    <p className="text-2xl font-black italic leading-tight mb-4">
                      "¡Esto no es solo un producto – es un portal a la creatividad y la alegría!"
                    </p>
                    <cite className="text-sm font-bold uppercase tracking-wider not-italic opacity-90">
                      — Reseña de la Comunidad Creativa
                    </cite>
                  </div>

                  {/* Specifications - Creative Style */}
                  {product.specifications && Object.keys(product.specifications).length > 0 && (
                    <div className="mt-8">
                      <h3 className={`text-3xl font-black mb-6 bg-gradient-to-r ${gradientColor} bg-clip-text text-transparent`}>
                        Especificaciones Mágicas
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(product.specifications).map(([key, value], index) => {
                          const specColor = randomColors[index % randomColors.length]
                          return (
                            <div
                              key={key}
                              className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-purple-100"
                            >
                              <span className={`bg-gradient-to-r ${specColor} bg-clip-text text-transparent font-bold uppercase tracking-wider text-sm`}>
                                {key}
                              </span>
                              <span className="text-gray-900 font-black">{value}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags - Creative Style */}
                {product.tags && product.tags.length > 0 && (
                  <div className="mt-8 pt-8 border-t-2 border-purple-200">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-600 mb-4 flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-purple-500" />
                      <span>Etiquetas Mágicas:</span>
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {product.tags.map((tag, index) => {
                        const tagColor = randomColors[index % randomColors.length]
                        return (
                          <span
                            key={tag}
                            className={`bg-gradient-to-r ${tagColor} text-white px-4 py-2 rounded-full text-sm font-bold hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg transform ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'} hover:rotate-0`}
                          >
                            #{tag}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Creative Purchase Section */}
            <div className="space-y-6">
              {/* Price Card - Creative */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-200 sticky top-8">
                {/* Decorative gradient header */}
                <div className={`bg-gradient-to-r ${gradientColor} p-6 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                  <h3 className="relative text-white text-sm font-bold uppercase tracking-widest mb-2 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Precio Mágico</span>
                  </h3>
                  <div className="relative flex items-baseline space-x-3">
                    <span className="text-5xl font-black text-white">
                      ${product.price.toLocaleString()}
                    </span>
                    {hasDiscount && (
                      <span className="text-xl text-white/70 line-through">
                        ${product.originalPrice!.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {hasDiscount && (
                    <div className="relative mt-2 text-yellow-300 font-bold text-sm uppercase tracking-wider flex items-center space-x-1">
                      <Flame className="w-4 h-4" />
                      <span>Ahorra ${(product.originalPrice! - product.price).toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* Stock Status - Creative */}
                <div className="p-6 border-b-2 border-purple-100">
                  {product.stock > 0 ? (
                    <div className="flex items-center space-x-3 bg-green-50 p-4 rounded-2xl">
                      <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-bold text-green-700 uppercase tracking-wider text-sm">
                        ✨ En Stock: {product.stock} Disponibles
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 bg-red-50 p-4 rounded-2xl">
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="font-bold text-red-700 uppercase tracking-wider text-sm">
                        Sin Magia Disponible
                      </span>
                    </div>
                  )}
                </div>

                {/* Quantity Controls - Creative */}
                <div className="p-6 border-b-2 border-purple-100">
                  <h4 className="text-gray-600 text-sm font-bold uppercase tracking-widest mb-3 flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-purple-500" />
                    <span>Cantidad</span>
                  </h4>
                  <div className={`flex items-center bg-gradient-to-r ${gradientColor} rounded-2xl p-2 shadow-lg`}>
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="p-4 bg-white hover:bg-gray-50 rounded-xl transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-5 h-5 text-gray-700" />
                    </button>
                    <span className="flex-1 text-center font-black text-3xl text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                      className="p-4 bg-white hover:bg-gray-50 rounded-xl transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button - Creative */}
                <div className="p-6">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0 || isAdding}
                    className={`relative w-full py-6 text-lg font-black uppercase tracking-widest transition-all duration-500 transform hover:scale-105 rounded-3xl overflow-hidden ${
                      isAdding
                        ? 'bg-gradient-to-r from-green-500 to-teal-500'
                        : `bg-gradient-to-r ${gradientColor} hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600`
                    } text-white shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-3">
                      {isAdding ? (
                        <>
                          <Sparkles className="w-6 h-6 animate-spin" />
                          <span>¡Agregando Magia!</span>
                          <Star className="w-6 h-6 animate-pulse" />
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-6 h-6" />
                          <span>Agregar al Carrito Mágico</span>
                          <Sparkles className="w-6 h-6" />
                        </>
                      )}
                    </span>
                    <div className={`absolute -inset-1 bg-gradient-to-r ${gradientColor} rounded-3xl blur opacity-40 animate-pulse`}></div>
                  </button>

                  {isInCart(product.id) && !isAdding && (
                    <p className="text-center text-sm font-bold uppercase tracking-wider text-green-600 mt-4 flex items-center justify-center space-x-2">
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>¡Ya está en tu carrito mágico!</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Features - Creative Icons */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-200">
                <div className={`bg-gradient-to-r ${gradientColor} p-6`}>
                  <h3 className="text-white text-lg font-black uppercase tracking-widest flex items-center space-x-2">
                    <Star className="w-5 h-5 animate-pulse" />
                    <span>Nuestras Promesas Mágicas</span>
                  </h3>
                </div>
                <div className="divide-y-2 divide-purple-100">
                  <div className="p-6 flex items-start space-x-4 hover:bg-purple-50 transition-colors group">
                    <div className={`bg-gradient-to-r ${gradientColor} p-4 rounded-2xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-1 flex items-center space-x-2">
                        <span>Seguridad Mágica</span>
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                      </h4>
                      <p className="text-sm text-gray-600 font-medium">Transacción 100% protegida</p>
                    </div>
                  </div>
                  <div className="p-6 flex items-start space-x-4 hover:bg-purple-50 transition-colors group">
                    <div className="bg-gradient-to-r from-green-500 to-teal-500 p-4 rounded-2xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-1 flex items-center space-x-2">
                        <span>Envío Gratis</span>
                        <Zap className="w-4 h-4 text-green-400" />
                      </h4>
                      <p className="text-sm text-gray-600 font-medium">Envío súper rápido</p>
                    </div>
                  </div>
                  <div className="p-6 flex items-start space-x-4 hover:bg-purple-50 transition-colors group">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-2xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                      <RotateCcw className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-1 flex items-center space-x-2">
                        <span>Devoluciones Fáciles</span>
                        <Heart className="w-4 h-4 text-pink-400" />
                      </h4>
                      <p className="text-sm text-gray-600 font-medium">Garantía de satisfacción de 30 días</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trending Badge - Creative */}
              <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-6 rounded-3xl shadow-2xl border-4 border-yellow-300 overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                <div className="relative flex items-center space-x-3 mb-3">
                  <Flame className="w-8 h-8 animate-bounce" />
                  <h4 className="font-black uppercase tracking-wider text-xl">¡Tendencia Caliente!</h4>
                  <Sparkles className="w-6 h-6 animate-spin" />
                </div>
                <p className="relative text-sm font-bold">
                  ¡Este artículo mágico es tendencia en {product.category.name}! 🔥✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
