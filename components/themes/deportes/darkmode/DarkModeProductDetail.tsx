'use client'

import { Product, Store } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Share2, Star, Shield, Truck, RotateCcw, Plus, Minus, ShoppingBag, Check } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import DarkModeStoreHeader from './DarkModeStoreHeader'
import DarkModeCartSheet from './DarkModeCartSheet'

interface DarkModeProductDetailProps {
  product: Product
  store: Store
}

export default function DarkModeProductDetail({ product, store }: DarkModeProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'specs'>('description')
  const { addToCart, isInCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart(product, quantity)
    setTimeout(() => {
      setIsAdding(false)
      setIsCartOpen(true)
    }, 1000)
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
      <DarkModeStoreHeader store={store} onCartClick={() => setIsCartOpen(true)} />
      <DarkModeCartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} storeSlug={store.slug} />

      <div className="bg-zinc-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-3 mb-8 text-sm">
            <Link
              href={`/${store.slug}`}
              className="text-zinc-500 hover:text-yellow-500 transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver</span>
            </Link>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-500">{product.category.name}</span>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-300">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Galería - 60% */}
            <div className="space-y-4">
              {/* Imagen Principal */}
              <div className="relative aspect-square bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700">
                <Image
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 space-y-2">
                  {hasDiscount && (
                    <div className="bg-yellow-500 text-black px-3 py-1.5 rounded-lg">
                      <span className="text-xs font-bold uppercase tracking-wide">-{discountPercentage}%</span>
                    </div>
                  )}
                  {product.stock <= 5 && product.stock > 0 && (
                    <div className="bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-lg">
                      <span className="text-xs font-bold uppercase tracking-wide">Solo {product.stock}</span>
                    </div>
                  )}
                </div>

                {/* Share Button */}
                <button className="absolute top-4 right-4 p-3 bg-zinc-800/80 backdrop-blur-sm rounded-lg text-zinc-400 hover:text-yellow-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? 'border-yellow-500'
                          : 'border-zinc-700 hover:border-zinc-600'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info - 40% */}
            <div className="space-y-6">
              {/* Título y Categoría */}
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                  {product.category.name}
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold text-zinc-100 mt-2 mb-3">
                  {product.name}
                </h1>
                {product.brand && (
                  <p className="text-zinc-400">Por {product.brand.name}</p>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-700'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-zinc-500">(127 reseñas)</span>
              </div>

              {/* Precio */}
              <div className="py-6 border-y border-zinc-800">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-yellow-500">
                    ${product.price.toLocaleString()}
                  </span>
                  {hasDiscount && (
                    <span className="text-xl text-zinc-600 line-through">
                      ${product.originalPrice!.toLocaleString()}
                    </span>
                  )}
                </div>
                {hasDiscount && (
                  <div className="mt-2 text-green-500 font-semibold text-sm">
                    Ahorra ${(product.originalPrice! - product.price).toLocaleString()}
                  </div>
                )}
              </div>

              {/* Stock */}
              <div>
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-zinc-300">
                      En Stock: {product.stock} disponibles
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-zinc-500">Agotado</span>
                  </div>
                )}
              </div>

              {/* Quantity Controls */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-3">Cantidad</h4>
                <div className="flex items-center border-2 border-zinc-700 rounded-lg w-fit">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-zinc-300"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-8 font-bold text-xl text-zinc-100">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="p-3 hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-zinc-300"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAdding}
                className={`w-full py-4 rounded-lg text-base font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-3 ${
                  isAdding
                    ? 'bg-green-600 text-white'
                    : 'bg-yellow-500 hover:bg-yellow-600 text-black'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isAdding ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Agregado al Carrito!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Agregar al Carrito</span>
                  </>
                )}
              </button>

              {isInCart(product.id) && !isAdding && (
                <p className="text-center text-sm text-green-500">
                  ✓ Ya está en tu carrito
                </p>
              )}

              {/* Features */}
              <div className="grid grid-cols-1 gap-3 pt-4">
                {[
                  { icon: Shield, text: 'Compra Segura' },
                  { icon: Truck, text: 'Envío Gratis +$500' },
                  { icon: RotateCcw, text: 'Devoluciones 30 días' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                    <feature.icon className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-zinc-300">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs - Descripción y Especificaciones */}
          <div className="mt-16">
            <div className="border-b border-zinc-800 flex gap-8 mb-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-4 font-semibold uppercase tracking-wide transition-colors relative ${
                  activeTab === 'description'
                    ? 'text-yellow-500'
                    : 'text-zinc-500 hover:text-zinc-400'
                }`}
              >
                Descripción
                {activeTab === 'description' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-4 font-semibold uppercase tracking-wide transition-colors relative ${
                  activeTab === 'specs'
                    ? 'text-yellow-500'
                    : 'text-zinc-500 hover:text-zinc-400'
                }`}
              >
                Especificaciones
                {activeTab === 'specs' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"></div>
                )}
              </button>
            </div>

            {activeTab === 'description' && (
              <div className="prose prose-invert max-w-none">
                <p className="text-zinc-300 text-lg leading-relaxed">
                  {product.description || 'Descubre la excelencia en cada detalle. Este producto ha sido cuidadosamente seleccionado para ofrecerte la mejor calidad y experiencia. Diseñado con precisión y fabricado con los mejores materiales disponibles en el mercado.'}
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div>
                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                  <div className="bg-zinc-800/30 rounded-lg border border-zinc-700/50 overflow-hidden">
                    <table className="w-full">
                      <tbody className="divide-y divide-zinc-700/50">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <tr key={key} className="hover:bg-zinc-800/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-semibold text-zinc-400 uppercase tracking-wide w-1/3">
                              {key}
                            </td>
                            <td className="px-6 py-4 text-sm text-zinc-300">
                              {value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-zinc-500">No hay especificaciones disponibles.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
