'use client'

import { useCart } from '@/lib/cart-context'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface EleganteCartSheetProps {
  isOpen: boolean
  onClose: () => void
  storeSlug: string
}

export default function EleganteCartSheet({ isOpen, onClose, storeSlug }: EleganteCartSheetProps) {
  const router = useRouter()
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart()

  const handleCheckout = () => {
    router.push(`/${storeSlug}/checkout`)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop elegante */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Sheet elegante */}
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[500px] bg-white shadow-2xl z-50 transform transition-transform duration-500 flex flex-col">
        {/* Header elegante */}
        <div className="border-b border-gray-100 p-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-light tracking-wider text-gray-900 uppercase">
              Carrito
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-50 transition-colors duration-300"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <p className="text-sm text-gray-500 tracking-widest uppercase font-light">
            {getTotalItems()} {getTotalItems() === 1 ? 'artículo' : 'artículos'}
          </p>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 border border-gray-200 flex items-center justify-center mb-8">
                <ShoppingBag className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-3 tracking-wide uppercase">
                Carrito Vacío
              </h3>
              <p className="text-gray-500 font-light mb-8 tracking-wide">
                Aún no has agregado productos
              </p>
              <button
                onClick={onClose}
                className="bg-black text-white px-10 py-3 text-sm uppercase tracking-widest font-light hover:bg-gray-800 transition-colors duration-300"
              >
                Explorar Colección
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="border border-gray-100 p-6 hover:border-gray-200 transition-colors duration-300"
              >
                <div className="flex space-x-5">
                  {/* Image */}
                  <div className="relative w-24 h-32 flex-shrink-0 bg-gray-50">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {item.product.brand && (
                        <p className="text-xs text-gray-500 mb-1 uppercase tracking-widest font-light">
                          {item.product.brand.name}
                        </p>
                      )}
                      <h3 className="font-light text-gray-900 mb-2 line-clamp-2 text-sm tracking-wide">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-900 font-light">
                        ${item.product.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <Minus className="w-3 h-3 text-gray-600" />
                        </button>
                        <span className="w-10 text-center font-light text-sm text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <Plus className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-500 uppercase tracking-widest font-light">Subtotal</span>
                  <span className="text-gray-900 font-light">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-8 bg-gray-50">
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-light tracking-wide">Subtotal</span>
                <span className="text-gray-900 font-light">
                  ${getTotalPrice().toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-light tracking-wide">Envío</span>
                <span className="text-gray-900 font-light">Gratis</span>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-light text-gray-900 uppercase tracking-wider">Total</span>
                <span className="text-2xl font-light text-gray-900">
                  ${getTotalPrice().toLocaleString()}
                </span>
              </div>
            </div>

            <button onClick={handleCheckout} className="w-full bg-black text-white py-4 text-sm uppercase tracking-widest font-light hover:bg-gray-800 transition-colors duration-300">
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </>
  )
}
