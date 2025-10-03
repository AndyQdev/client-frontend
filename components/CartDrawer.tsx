'use client'

import { Fragment } from 'react'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { useCart } from '@/lib/store'

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
    isEmpty
  } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-background shadow-xl z-50 animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border-default">
            <h2 className="text-lg font-semibold text-text-primary">
              Carrito de Compras
            </h2>
            <button
              onClick={closeCart}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-surface"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <ShoppingBag className="w-16 h-16 text-text-muted mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">
                  Tu carrito está vacío
                </h3>
                <p className="text-text-secondary mb-6">
                  Agrega algunos productos para empezar a comprar
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Explorar productos
                </button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-surface rounded-lg border border-border-default"
                  >
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      {item.product.images[0] ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-light to-accent flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-text-primary line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-text-secondary">
                        ${item.price.toLocaleString()} c/u
                      </p>
                      <p className="text-sm font-medium text-primary">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="p-1 text-text-secondary hover:text-text-primary transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.product.stock}
                        className="p-1 text-text-secondary hover:text-text-primary transition-colors disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 text-text-secondary hover:text-error transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Clear Cart Button */}
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-center text-error hover:bg-error-bg transition-colors rounded-lg text-sm"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {!isEmpty && (
            <div className="border-t border-border-default p-6 bg-surface">
              <div className="space-y-4">
                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">
                      {totalItems} producto{totalItems !== 1 ? 's' : ''}
                    </span>
                    <span className="text-text-primary">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-text-primary">Total:</span>
                    <span className="text-primary">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium">
                  Proceder al Checkout
                </button>

                {/* WhatsApp Button */}
                <button className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>Ordenar por WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}