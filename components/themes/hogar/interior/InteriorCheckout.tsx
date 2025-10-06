'use client'

import { Store } from '@/lib/types'
import { useCart } from '@/lib/cart-context'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import InteriorStoreHeader from './InteriorStoreHeader'
import { CreditCard, Smartphone } from 'lucide-react'

interface InteriorCheckoutProps {
  store: Store
}

export default function InteriorCheckout({ store }: InteriorCheckoutProps) {
  const { items, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const orderId = `ORD-${Date.now()}`
    clearCart()
    router.push(`/${store.slug}/pedido/${orderId}`)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50">
        <InteriorStoreHeader
          store={store}
          onCartClick={() => router.push(`/${store.slug}`)}
          cartItemsCount={0}
        />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center animate-fade-in-up">
            <h2 className="font-serif text-3xl text-stone-900 mb-4">Tu carrito está vacío</h2>
            <button onClick={() => router.push(`/${store.slug}`)} className="btn-primary">
              Ver Productos
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <InteriorStoreHeader
        store={store}
        onCartClick={() => router.push(`/${store.slug}/checkout`)}
        cartItemsCount={items.length}
      />
      <div className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl text-stone-900 text-center mb-12 animate-fade-in-up">
          Finalizar Compra
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white border border-stone-200 p-8 animate-fade-in">
              <h2 className="font-serif text-2xl text-stone-900 mb-6">Información de Contacto</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  placeholder="Nombre completo *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-200 focus:border-stone-800 focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Teléfono *"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-200 focus:border-stone-800 focus:outline-none transition-colors"
                />
              </div>

              <div className="mb-6">
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-200 focus:border-stone-800 focus:outline-none transition-colors"
                />
              </div>

              <h2 className="font-serif text-2xl text-stone-900 mb-6 mt-8">Dirección de Envío</h2>

              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Dirección completa *"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-200 focus:border-stone-800 focus:outline-none transition-colors"
                />
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Ciudad *"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-200 focus:border-stone-800 focus:outline-none transition-colors"
                />
              </div>

              <div className="mb-8">
                <textarea
                  placeholder="Notas adicionales"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-200 focus:border-stone-800 focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <h2 className="font-serif text-2xl text-stone-900 mb-6">Método de Pago</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-6 border-2 transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-stone-800 bg-stone-50'
                      : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <Smartphone className="w-8 h-8 mx-auto mb-3 text-stone-700" />
                  <p className="font-medium text-stone-900">Pago contra entrega</p>
                  <p className="text-sm text-stone-600 mt-2">Paga cuando recibas tu pedido</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-6 border-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-stone-800 bg-stone-50'
                      : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <CreditCard className="w-8 h-8 mx-auto mb-3 text-stone-700" />
                  <p className="font-medium text-stone-900">Transferencia / QR</p>
                  <p className="text-sm text-stone-600 mt-2">Te enviaremos los datos</p>
                </button>
              </div>

              <button type="submit" className="w-full btn-primary py-4 text-base">
                Confirmar Pedido
              </button>
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-stone-200 p-8 sticky top-24 animate-fade-in-up">
              <h2 className="font-serif text-2xl text-stone-900 mb-6">Resumen del Pedido</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-stone-100 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-stone-900 text-sm mb-1">{item.product.name}</h3>
                      <p className="text-sm text-stone-600">Cantidad: {item.quantity}</p>
                      <p className="text-sm font-medium text-stone-900">${(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-200 pt-6 space-y-3">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Envío</span>
                  <span className="text-green-700 font-medium">Gratis</span>
                </div>
                <div className="flex justify-between font-serif text-xl text-stone-900 pt-3 border-t border-stone-200">
                  <span>Total</span>
                  <span>${getTotalPrice().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
