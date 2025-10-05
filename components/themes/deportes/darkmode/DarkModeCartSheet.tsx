'use client'

import { useCart } from '@/lib/cart-context'
import { X, Plus, Minus, ShoppingBag, Trash2, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface DarkModeCartSheetProps {
  isOpen: boolean
  onClose: () => void
  storeSlug: string
}

export default function DarkModeCartSheet({ isOpen, onClose, storeSlug }: DarkModeCartSheetProps) {
  const router = useRouter()
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart()

  const handleCheckout = () => {
    router.push(`/${storeSlug}/checkout`)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[500px] bg-zinc-900 border-l border-zinc-800 shadow-2xl z-50 transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="bg-black border-b border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-500 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-zinc-100 uppercase tracking-tight">
                  TU CARRITO
                </h2>
                <p className="text-sm text-zinc-500 mt-1">
                  {getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Items section */}
        <div className="flex-1 overflow-y-auto bg-zinc-900">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              {/* Empty state */}
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700 p-12 mb-6">
                <ShoppingBag className="w-20 h-20 text-zinc-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-zinc-300 uppercase tracking-tight mb-3">
                  Carrito Vacío
                </h3>
                <p className="text-zinc-500 mb-2">
                  Tu carrito está vacío
                </p>
                <div className="w-16 h-1 bg-yellow-500 mx-auto my-6 rounded-full"></div>
                <p className="text-sm text-zinc-600 uppercase tracking-wide mb-8">
                  Comienza a agregar productos
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-10 py-4 rounded-lg text-sm font-bold uppercase tracking-wide transition-all"
              >
                Seguir Comprando
              </button>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {items.map((item, index) => (
                <article
                  key={item.product.id}
                  className="bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700/50 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-4">
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="relative w-24 h-24 flex-shrink-0 bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 group-hover:border-yellow-500/50 transition-colors">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        {/* Category */}
                        <div className="inline-block px-2 py-1 bg-zinc-700/50 rounded text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                          {item.product.category.name}
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-zinc-100 mb-2 line-clamp-2 text-sm leading-tight group-hover:text-yellow-500 transition-colors">
                          {item.product.name}
                        </h3>

                        {/* Price */}
                        <div className="mb-3">
                          <span className="text-lg font-bold text-yellow-500">
                            ${item.product.price.toLocaleString()}
                          </span>
                          <span className="text-xs text-zinc-600 ml-2">
                            por unidad
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-2 hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-zinc-200"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-bold text-zinc-100 py-2">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-2 hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-zinc-200"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 text-zinc-500 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="mt-4 pt-4 border-t border-zinc-700/50 flex justify-between items-center">
                      <div>
                        <span className="text-xs text-zinc-600 uppercase tracking-wider block">
                          Subtotal
                        </span>
                        <span className="text-xs text-zinc-600">
                          {item.quantity} × ${item.product.price.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-xl font-bold text-zinc-100">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-zinc-800 bg-zinc-900">
            {/* Price breakdown */}
            <div className="p-6 bg-zinc-800/30 border-b border-zinc-800">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm uppercase tracking-wider text-zinc-500">
                    Subtotal
                  </span>
                  <span className="text-lg font-semibold text-zinc-300">
                    ${getTotalPrice().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm uppercase tracking-wider text-zinc-500">
                    Envío
                  </span>
                  <span className="text-sm font-bold text-green-500 uppercase tracking-wide">
                    Gratis
                  </span>
                </div>
                <div className="h-px bg-zinc-700 my-4"></div>
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <span className="text-lg font-bold text-zinc-100 uppercase tracking-tight">
                      Total
                    </span>
                    <p className="text-xs text-zinc-600 mt-1">
                      {getTotalItems()} {getTotalItems() === 1 ? 'producto incluido' : 'productos incluidos'}
                    </p>
                  </div>
                  <span className="text-3xl font-bold text-yellow-500">
                    ${getTotalPrice().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 bg-black">
              <div className="flex items-start gap-3 mb-4 text-zinc-300">
                <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    Información Importante
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    Envío gratis en todos los pedidos • Checkout seguro garantizado
                  </p>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-4 rounded-lg text-base font-bold uppercase tracking-wide transition-all duration-300"
              >
                Proceder al Checkout
              </button>

              <button
                onClick={onClose}
                className="w-full mt-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-colors"
              >
                Seguir Comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
