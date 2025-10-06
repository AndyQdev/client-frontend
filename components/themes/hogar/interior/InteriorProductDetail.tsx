'use client'

import { Store, Product } from '@/lib/types'
import { useState } from 'react'
import Image from 'next/image'
import InteriorStoreHeader from './InteriorStoreHeader'
import InteriorCartSheet from './InteriorCartSheet'
import { Minus, Plus, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useRouter } from 'next/navigation'

interface InteriorProductDetailProps {
  store: Store
  product: Product
}

export default function InteriorProductDetail({ store, product }: InteriorProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { addToCart, items } = useCart()
  const router = useRouter()

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setIsCartOpen(true)
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <InteriorStoreHeader
        store={store}
        onCartClick={() => setIsCartOpen(true)}
        cartItemsCount={items.length}
      />
      <InteriorCartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        storeSlug={store.slug}
      />
      <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 animate-fade-in">
          <ol className="flex items-center gap-2 text-sm text-stone-600">
            <li><a href={`/${store.slug}`} className="hover:text-stone-900">Inicio</a></li>
            <li>/</li>
            <li><a href={`/${store.slug}#productos`} className="hover:text-stone-900">Productos</a></li>
            <li>/</li>
            <li className="text-stone-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div className="animate-fade-in">
            <div className="mb-4 aspect-square bg-white border border-stone-200 overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square bg-white border-2 overflow-hidden transition-all ${
                    selectedImage === idx ? 'border-stone-800' : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${idx + 1}`} width={200} height={200} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="animate-fade-in-up">
            <div className="mb-4">
              <span className="text-xs text-stone-500 uppercase tracking-widest">{product.category.name}</span>
            </div>

            <h1 className="font-serif text-4xl text-stone-900 mb-4">{product.name}</h1>

            {product.brand && (
              <p className="text-sm text-stone-600 mb-6">por <span className="font-medium">{product.brand.name}</span></p>
            )}

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-serif text-stone-900">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-stone-400 line-through">${product.originalPrice.toLocaleString()}</span>
                  <span className="text-sm bg-amber-100 text-amber-800 px-3 py-1 font-medium">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-stone-600 mb-8 leading-relaxed">{product.description}</p>

            {/* Quantity */}
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center border border-stone-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-stone-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 hover:bg-stone-100 transition-colors"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <span className="text-sm text-stone-600">
                {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                <ShoppingCart className="w-5 h-5 inline mr-2" />
                Agregar al Carrito
              </button>
              <button className="p-4 border-2 border-stone-300 hover:border-stone-800 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-4 border-2 border-stone-300 hover:border-stone-800 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-stone-200">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-stone-700" />
                <p className="text-xs text-stone-600">Envío Gratis</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-stone-700" />
                <p className="text-xs text-stone-600">Garantía</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-stone-700" />
                <p className="text-xs text-stone-600">Devolución</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-stone-200 p-8">
          <div className="flex gap-8 border-b border-stone-200 mb-8">
            {['description', 'specifications', 'shipping'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-medium uppercase tracking-wider transition-colors relative ${
                  activeTab === tab ? 'text-stone-900' : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                {tab === 'description' && 'Descripción'}
                {tab === 'specifications' && 'Especificaciones'}
                {tab === 'shipping' && 'Envío'}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-stone-800"></span>
                )}
              </button>
            ))}
          </div>

          <div className="prose max-w-none">
            {activeTab === 'description' && (
              <div className="text-stone-600 leading-relaxed">
                <p>{product.description}</p>
              </div>
            )}
            {activeTab === 'specifications' && product.specifications && (
              <dl className="grid grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <dt className="font-medium text-stone-900 mb-1">{key}</dt>
                    <dd className="text-stone-600">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {activeTab === 'shipping' && (
              <div className="text-stone-600">
                <p>Envío gratis en compras superiores a $100.000</p>
                <p className="mt-2">Tiempo estimado de entrega: 3-5 días hábiles</p>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
