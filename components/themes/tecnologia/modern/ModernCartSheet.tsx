'use client'

import { useCart } from '@/lib/cart-context'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ModernCartSheetProps {
  isOpen: boolean
  onClose: () => void
  storeSlug: string
}

export default function ModernCartSheet({ isOpen, onClose, storeSlug }: ModernCartSheetProps) {
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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-[#0F0F0F] shadow-2xl z-50 transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A] bg-[#1A1A1A]">
          <div className="flex items-center space-x-3">
            <div className="bg-[#D4AF37] p-3 rounded-2xl">
              <ShoppingBag className="w-6 h-6 text-[#0F0F0F]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#F5F5F5]">Mi Carrito</h2>
              <p className="text-sm text-[#A3A3A3]">{getTotalItems()} productos</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2A2A2A] rounded-xl transition-colors duration-200"
          >
            <X className="w-6 h-6 text-[#A3A3A3]" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="bg-[#1A1A1A] p-8 rounded-full mb-6">
                <ShoppingBag className="w-16 h-16 text-[#6B7280]" />
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-[#A3A3A3] mb-6">
                Agrega productos para comenzar tu compra
              </p>
              <button
                onClick={onClose}
                className="bg-[#D4AF37] text-[#0F0F0F] px-8 py-3 rounded-2xl font-semibold hover:bg-[#E5C158] transition-all duration-300"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4 hover:border-[#D4AF37] transition-all duration-300"
              >
                <div className="flex space-x-4">
                  {/* Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 bg-[#0F0F0F] rounded-xl overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#F5F5F5] mb-1 line-clamp-2">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-[#A3A3A3] mb-3">
                      ${item.product.price.toLocaleString()} c/u
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 bg-[#0F0F0F] rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-[#2A2A2A] rounded-lg transition-colors duration-200"
                        >
                          <Minus className="w-4 h-4 text-[#A3A3A3]" />
                        </button>
                        <span className="w-8 text-center font-semibold text-[#F5F5F5]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-[#2A2A2A] rounded-lg transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4 text-[#A3A3A3]" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="mt-3 pt-3 border-t border-[#2A2A2A] flex justify-between items-center">
                  <span className="text-sm text-[#A3A3A3]">Subtotal:</span>
                  <span className="text-lg font-bold text-[#D4AF37]">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#2A2A2A] p-6 bg-[#1A1A1A]">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#A3A3A3]">Subtotal</span>
                <span className="text-[#F5F5F5] font-semibold">
                  ${getTotalPrice().toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#A3A3A3]">Envío</span>
                <span className="text-[#D4AF37] font-semibold">Gratis</span>
              </div>
              <div className="h-px bg-[#2A2A2A] my-3"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-[#F5F5F5]">Total</span>
                <span className="text-2xl font-bold text-[#D4AF37]">
                  ${getTotalPrice().toLocaleString()}
                </span>
              </div>
            </div>

            <button onClick={handleCheckout} className="w-full bg-[#D4AF37] text-[#0F0F0F] py-4 rounded-2xl font-bold text-lg hover:bg-[#E5C158] transition-all duration-300 transform hover:scale-105 shadow-lg">
              Proceder al pago
            </button>
          </div>
        )}
      </div>
    </>
  )
}