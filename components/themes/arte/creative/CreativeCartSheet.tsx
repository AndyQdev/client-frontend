'use client'

import { useCart } from '@/lib/cart-context'
import { X, Plus, Minus, ShoppingBag, Trash2, Sparkles, Star, Zap, Heart } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface CreativeCartSheetProps {
  isOpen: boolean
  onClose: () => void
  storeSlug: string
}

export default function CreativeCartSheet({ isOpen, onClose, storeSlug }: CreativeCartSheetProps) {
  const router = useRouter()
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart()

  const handleCheckout = () => {
    router.push(`/${storeSlug}/checkout`)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop creativo con efectos */}
      <div
        className="fixed inset-0 bg-gradient-to-br from-purple-900/80 via-pink-900/80 to-blue-900/80 backdrop-blur-md z-40 transition-opacity duration-500 animate-in fade-in"
        onClick={onClose}
      >
        {/* Elementos decorativos en el backdrop */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-40 right-40 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-400 rounded-full blur-2xl opacity-25 animate-ping"></div>
      </div>

      {/* Sheet con estilo creativo */}
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[520px] bg-gradient-to-br from-white via-purple-50 to-pink-50 shadow-2xl z-50 transform transition-all duration-500 animate-in slide-in-from-right flex flex-col">
        {/* Header ultra creativo */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-6 border-b-4 border-yellow-400">
          {/* Elementos decorativos del header */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-400 rounded-full blur-xl opacity-30 animate-bounce"></div>
          </div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-2xl transform rotate-12 animate-pulse">
                  <ShoppingBag className="w-7 h-7 text-white transform -rotate-12" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-spin" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white flex items-center space-x-2">
                  <span>Carrito Mágico</span>
                  <Star className="w-6 h-6 text-yellow-300 animate-pulse" />
                </h2>
                <p className="text-purple-200 font-bold flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>{getTotalItems()} artículos mágicos</span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="relative p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-90 group"
            >
              <X className="w-6 h-6 text-white group-hover:text-pink-300 transition-colors" />
            </button>
          </div>

          {/* Decoración inferior del header */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-2">
            <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce delay-75"></div>
            <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce delay-150"></div>
          </div>
        </div>

        {/* Items con estilo ultra creativo */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 relative">
          {/* Elementos de fondo flotantes */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-1/4 right-10 w-16 h-16 bg-purple-200 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute top-2/3 right-20 w-12 h-12 bg-pink-200 rounded-full blur-lg opacity-40 animate-bounce"></div>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center relative">
              <div className="relative mb-8">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-12 rounded-full">
                  <ShoppingBag className="w-20 h-20 text-purple-400" />
                </div>
                <Sparkles className="absolute -top-4 -right-4 w-12 h-12 text-yellow-400 animate-spin" />
                <Star className="absolute -bottom-2 -left-2 w-8 h-8 text-pink-400 animate-pulse" />
              </div>
              <h3 className="text-3xl font-black mb-4">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  ¡Tu carrito espera la magia!
                </span>
              </h3>
              <p className="text-gray-600 mb-8 text-lg max-w-xs">
                Agrega algunos tesoros creativos para comenzar tu viaje mágico
              </p>
              <button
                onClick={onClose}
                className="relative px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-bold rounded-full text-lg hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 transition-all duration-500 transform hover:scale-110 hover:rotate-3"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Descubrir Magia</span>
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full blur opacity-40 animate-pulse"></div>
              </button>
            </div>
          ) : (
            items.map((item, index) => {
              const randomColors = [
                'from-pink-400 to-purple-500',
                'from-blue-400 to-indigo-500',
                'from-green-400 to-teal-500',
                'from-yellow-400 to-orange-500',
                'from-red-400 to-pink-500',
                'from-purple-400 to-blue-500'
              ]
              const randomColor = randomColors[index % randomColors.length]

              return (
                <div
                  key={item.product.id}
                  className="relative bg-white rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border-2 border-purple-100 group"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Elementos decorativos de la tarjeta */}
                  <div className="absolute top-3 right-3 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-3 left-3 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>

                  {/* Efecto de brillo en hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${randomColor} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>

                  <div className="flex space-x-4 relative">
                    {/* Image con efectos creativos */}
                    <div className="relative w-28 h-28 flex-shrink-0 rounded-2xl overflow-hidden transform group-hover:scale-105 group-hover:rotate-3 transition-transform duration-500">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${randomColor} opacity-0 group-hover:opacity-30 transition-opacity duration-500 mix-blend-multiply`}></div>
                      <Sparkles className="absolute top-2 right-2 w-5 h-5 text-yellow-400 opacity-0 group-hover:opacity-100 animate-spin transition-opacity duration-300" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-gray-900 mb-2 line-clamp-2 text-lg group-hover:text-purple-600 transition-colors duration-300">
                        {item.product.name}
                      </h3>
                      <p className="text-sm font-bold mb-3 flex items-center space-x-1">
                        <span className={`bg-gradient-to-r ${randomColor} bg-clip-text text-transparent`}>
                          ${item.product.price.toLocaleString()}
                        </span>
                        <span className="text-gray-400">por unidad</span>
                      </p>

                      {/* Quantity Controls creativos */}
                      <div className="flex items-center justify-between">
                        <div className={`flex items-center space-x-2 bg-gradient-to-r ${randomColor} rounded-2xl p-1.5 shadow-md`}>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 bg-white hover:bg-gray-50 rounded-xl transition-all duration-300 transform hover:scale-110 group/btn"
                          >
                            <Minus className="w-4 h-4 text-gray-700 group-hover/btn:text-purple-600" />
                          </button>
                          <span className="w-10 text-center font-black text-white text-lg">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 bg-white hover:bg-gray-50 rounded-xl transition-all duration-300 transform hover:scale-110 group/btn"
                          >
                            <Plus className="w-4 h-4 text-gray-700 group-hover/btn:text-purple-600" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-12 group/del"
                        >
                          <Trash2 className="w-5 h-5 group-hover/del:animate-bounce" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Subtotal creativo */}
                  <div className="mt-4 pt-4 border-t-2 border-purple-100 flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-bold flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>Subtotal:</span>
                    </span>
                    <span className={`text-xl font-black bg-gradient-to-r ${randomColor} bg-clip-text text-transparent`}>
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer ultra creativo */}
        {items.length > 0 && (
          <div className="relative border-t-4 border-purple-200 p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 overflow-hidden">
            {/* Elementos decorativos del footer */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-300 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-300 rounded-full blur-2xl opacity-20 animate-bounce"></div>
            </div>

            <div className="relative mb-6 bg-white/60 backdrop-blur-sm rounded-3xl p-6 border-2 border-purple-200">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-700 font-bold flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-purple-500" />
                  <span>Subtotal</span>
                </span>
                <span className="text-gray-900 font-black text-lg">
                  ${getTotalPrice().toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-700 font-bold flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-green-500" />
                  <span>Envío</span>
                </span>
                <span className="text-green-600 font-black flex items-center space-x-1">
                  <span>GRATIS</span>
                  <Heart className="w-4 h-4" />
                </span>
              </div>
              <div className="h-1 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-full my-4"></div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-black text-gray-900 flex items-center space-x-2">
                  <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
                  <span>Total</span>
                </span>
                <span className="text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  ${getTotalPrice().toLocaleString()}
                </span>
              </div>
            </div>

            <button onClick={handleCheckout} className="relative w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white py-5 rounded-3xl font-black text-xl hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 transition-all duration-500 transform hover:scale-105 shadow-2xl group/checkout overflow-hidden">
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <Zap className="w-6 h-6 group-hover/checkout:animate-bounce" />
                <span>Completar Pago Mágico</span>
                <Sparkles className="w-6 h-6 group-hover/checkout:animate-spin" />
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl blur opacity-50 animate-pulse"></div>
              {/* Elementos flotantes en el botón */}
              <div className="absolute top-1/2 left-10 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-0 group-hover/checkout:opacity-100"></div>
              <div className="absolute top-1/2 right-10 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-0 group-hover/checkout:opacity-100 delay-75"></div>
            </button>

            {/* Mensaje creativo */}
            <p className="text-center text-purple-700 text-sm mt-4 font-bold flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
              <span>Pago mágico seguro • Devoluciones gratis</span>
              <Star className="w-4 h-4 text-pink-500 animate-pulse" />
            </p>
          </div>
        )}
      </div>
    </>
  )
}
