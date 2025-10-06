'use client'

import { useCart } from '@/lib/cart-context'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface InteriorCartSheetProps {
  isOpen: boolean
  onClose: () => void
  storeSlug: string
}

export default function InteriorCartSheet({ isOpen, onClose, storeSlug }: InteriorCartSheetProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart()
  const router = useRouter()

  const handleCheckout = () => {
    onClose()
    router.push(`/${storeSlug}/checkout`)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Sheet */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200">
          <h2 className="font-serif text-2xl text-stone-900">
            Carrito de Compras
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-stone-700" />
          </button>
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="w-20 h-20 text-stone-300 mb-4" />
            <h3 className="font-serif text-xl text-stone-900 mb-2">
              Tu carrito está vacío
            </h3>
            <p className="text-stone-600 mb-6">
              Agrega productos para comenzar tu compra
            </p>
            <button onClick={onClose} className="btn-primary">
              Continuar Comprando
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 pb-4 border-b border-stone-100"
                >
                  {/* Image */}
                  <div className="w-24 h-24 bg-stone-100 flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-medium text-stone-900 mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-stone-600 mb-2">
                      ${item.product.price.toLocaleString()}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-stone-300">
                        <button
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:bg-stone-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1))}
                          className="p-1 hover:bg-stone-100 transition-colors"
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-xs text-stone-500 hover:text-red-600 transition-colors underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <p className="font-medium text-stone-900">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-stone-200 p-6 space-y-4 bg-stone-50">
              <div className="flex justify-between items-center">
                <span className="text-stone-600">Subtotal</span>
                <span className="text-stone-900 font-medium">
                  ${getTotalPrice().toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-stone-600">Envío</span>
                <span className="text-green-700 font-medium">Gratis</span>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-stone-300">
                <span className="font-serif text-xl text-stone-900">Total</span>
                <span className="font-serif text-2xl text-stone-900">
                  ${getTotalPrice().toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full btn-primary py-4 text-base"
              >
                Proceder al Pago
              </button>

              <button
                onClick={onClose}
                className="w-full btn-secondary py-3 text-sm"
              >
                Continuar Comprando
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
