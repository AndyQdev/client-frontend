'use client'

import { useCart } from '@/lib/cart-context'
import { X, Plus, Minus, ShoppingBag, Trash2, Crown } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ClassicCartSheetProps {
  isOpen: boolean
  onClose: () => void
  storeSlug: string
}

export default function ClassicCartSheet({ isOpen, onClose, storeSlug }: ClassicCartSheetProps) {
  const router = useRouter()
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart()

  const handleCheckout = () => {
    router.push(`/${storeSlug}/checkout`)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop con estilo vintage */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sheet con estilo clásico */}
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[500px] bg-gradient-to-b from-amber-50 to-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col border-l-4 border-amber-300">
        {/* Header clásico */}
        <div className="relative p-6 border-b-2 border-amber-200 bg-gradient-to-r from-amber-100 to-cream-100">
          {/* Ornamentos decorativos superiores */}
          <div className="absolute top-2 left-4 w-12 h-12 border border-amber-300 rounded-full opacity-30"></div>
          <div className="absolute top-4 right-8 w-8 h-8 border border-amber-400 rotate-45 opacity-20"></div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-amber-600 to-amber-800 p-3 rounded-lg shadow-md">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-serif text-amber-900 flex items-center space-x-2">
                  <span>Shopping Bag</span>
                  <Crown className="w-5 h-5 text-amber-600" />
                </h2>
                <p className="text-sm text-amber-700 font-serif italic">{getTotalItems()} treasures selected</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-amber-200 rounded-full transition-colors duration-200"
            >
              <X className="w-6 h-6 text-amber-800" />
            </button>
          </div>

          {/* Ornamento divisor */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-16 h-px bg-amber-400"></div>
              <div className="w-2 h-2 border border-amber-500 rotate-45"></div>
              <div className="w-16 h-px bg-amber-400"></div>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-gradient-to-br from-amber-100 to-cream-100 p-8 rounded-full mb-6 border-2 border-amber-200">
                <ShoppingBag className="w-16 h-16 text-amber-600" />
              </div>
              <h3 className="text-2xl font-serif text-amber-900 mb-3">
                Your Bag is Empty
              </h3>
              <p className="text-amber-700 font-serif mb-6 italic max-w-xs">
                Discover our curated collection of timeless treasures
              </p>
              <div className="flex justify-center mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-px bg-amber-400"></div>
                  <div className="w-2 h-2 border border-amber-500 rotate-45"></div>
                  <div className="w-8 h-px bg-amber-400"></div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="bg-amber-600 text-white px-8 py-3 rounded font-serif hover:bg-amber-700 transition-all duration-300 shadow-md"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white border-2 border-amber-100 rounded-lg p-4 hover:shadow-lg hover:border-amber-200 transition-all duration-300 relative"
              >
                {/* Ornamento esquina */}
                <div className="absolute top-2 right-2 w-4 h-4 border border-amber-300 rotate-45 opacity-30"></div>

                <div className="flex space-x-4">
                  {/* Image con marco clásico */}
                  <div className="relative w-24 h-24 flex-shrink-0 bg-gradient-to-br from-amber-50 to-cream-100 rounded-lg overflow-hidden border-2 border-amber-200">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-amber-900 mb-1 line-clamp-2 font-semibold">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-amber-600 mb-3 font-serif">
                      ${item.product.price.toLocaleString()} each
                    </p>

                    {/* Quantity Controls con estilo clásico */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200 rounded p-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-white rounded transition-colors duration-200"
                        >
                          <Minus className="w-4 h-4 text-amber-700" />
                        </button>
                        <span className="w-8 text-center font-serif font-semibold text-amber-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-white rounded transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4 text-amber-700" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subtotal con ornamento */}
                <div className="mt-3 pt-3 border-t border-amber-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-amber-700 font-serif">Subtotal:</span>
                    <span className="text-lg font-serif font-bold text-amber-900">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer clásico */}
        {items.length > 0 && (
          <div className="border-t-2 border-amber-200 p-6 bg-gradient-to-b from-amber-50 to-cream-50">
            {/* Ornamento superior */}
            <div className="flex justify-center mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-px bg-amber-400"></div>
                <div className="w-2 h-2 border border-amber-500 rotate-45"></div>
                <div className="w-12 h-px bg-amber-400"></div>
              </div>
            </div>

            <div className="mb-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-amber-800 font-serif">Subtotal</span>
                <span className="text-amber-900 font-serif font-semibold">
                  ${getTotalPrice().toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-amber-800 font-serif">Shipping</span>
                <span className="text-green-700 font-serif font-semibold italic">Complimentary</span>
              </div>
              <div className="h-px bg-amber-300 my-3"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-serif font-bold text-amber-900">Grand Total</span>
                <span className="text-2xl font-serif font-bold text-amber-900">
                  ${getTotalPrice().toLocaleString()}
                </span>
              </div>
            </div>

            {/* Ornamento antes del botón */}
            <div className="flex justify-center mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-px bg-amber-400"></div>
                <Crown className="w-4 h-4 text-amber-600" />
                <div className="w-12 h-px bg-amber-400"></div>
              </div>
            </div>

            <button onClick={handleCheckout} className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded font-serif font-bold text-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}
