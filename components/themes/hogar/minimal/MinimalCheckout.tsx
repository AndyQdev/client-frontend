'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/lib/cart-context'
import { useRouter } from 'next/navigation'
import { Store } from '@/lib/types'
import MinimalStoreHeader from './MinimalStoreHeader'
import Image from 'next/image'
import { CreditCard, Smartphone, Clock, CheckCircle2 } from 'lucide-react'

interface MinimalCheckoutProps {
  store: Store
}

export default function MinimalCheckout({ store }: MinimalCheckoutProps) {
  const { items, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'qr' | 'card'>('qr')
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutos
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  })

  // Countdown timer
  useEffect(() => {
    if (activeTab === 'qr' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [activeTab, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate random order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Clear cart
    clearCart()

    // Redirect to order tracking
    router.push(`/${store.slug}/pedido/${orderId}`)
  }

  const subtotal = getTotalPrice()
  const envio = 0
  const total = subtotal + envio

  return (
    <div className="min-h-screen bg-white">
      <MinimalStoreHeader store={store} onCartClick={() => {}} />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Checkout</h1>
          <p className="text-sm text-gray-500">Completa tu pedido</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Columna Izquierda - Formulario y Pago */}
          <div className="space-y-8">
            {/* Información del Cliente */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Información de contacto</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Nombre completo</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors text-sm"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors text-sm"
                    placeholder="juan@ejemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors text-sm"
                    placeholder="+52 123 456 7890"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Dirección de entrega</label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors text-sm resize-none"
                    placeholder="Calle, número, colonia, ciudad"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Notas (opcional)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors text-sm resize-none"
                    placeholder="Instrucciones especiales"
                  />
                </div>
              </form>
            </div>

            {/* Método de Pago */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Método de pago</h2>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-8">
                <button
                  onClick={() => setActiveTab('qr')}
                  className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'qr'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Smartphone className="w-4 h-4 inline-block mr-2" />
                  Código QR
                </button>
                <button
                  onClick={() => setActiveTab('card')}
                  className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'card'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <CreditCard className="w-4 h-4 inline-block mr-2" />
                  Tarjeta
                </button>
              </div>

              {/* QR Payment */}
              {activeTab === 'qr' && (
                <div className="space-y-6">
                  {/* QR Code */}
                  <div className="bg-gray-50 p-8 flex flex-col items-center border border-gray-200">
                    <div className="w-64 h-64 bg-white border-2 border-gray-900 p-4 mb-4">
                      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                        <span className="text-white text-xs">QR CODE</span>
                      </div>
                    </div>

                    {/* Timer */}
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                      <Clock className="w-4 h-4" />
                      <span>Expira en: <span className="font-medium text-gray-900">{formatTime(timeLeft)}</span></span>
                    </div>

                    {/* Monto */}
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Monto a pagar</p>
                      <p className="text-2xl font-medium text-gray-900">${total.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Instrucciones */}
                  <div className="bg-white border border-gray-200 p-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Cómo pagar</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center mt-0.5">1</span>
                        <span className="text-sm text-gray-600">Abre tu app de banco o wallet digital</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center mt-0.5">2</span>
                        <span className="text-sm text-gray-600">Escanea el código QR con tu cámara</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center mt-0.5">3</span>
                        <span className="text-sm text-gray-600">Confirma el monto y realiza el pago</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center mt-0.5">4</span>
                        <span className="text-sm text-gray-600">Recibirás confirmación automáticamente</span>
                      </li>
                    </ul>
                  </div>

                  {/* Botón */}
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-gray-900 text-white py-4 text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Pagar Ahora
                  </button>
                </div>
              )}

              {/* Card Payment */}
              {activeTab === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Número de tarjeta</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Expiración</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full px-4 py-3 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-gray-900 text-white py-4 text-sm font-medium hover:bg-gray-800 transition-colors mt-6"
                  >
                    Pagar Ahora
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Columna Derecha - Resumen */}
          <div>
            <div className="border border-gray-200 p-8 sticky top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Resumen del pedido</h2>

              {/* Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                {items.map((item) => (
                  <div key={item.product.id} className="flex space-x-4">
                    <div className="relative w-16 h-16 bg-gray-50 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm text-gray-900 mb-1 line-clamp-1">{item.product.name}</h3>
                      <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totales */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Envío</span>
                  <span className="text-gray-900">Gratis</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="text-xl font-medium text-gray-900">${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Seguridad */}
              <div className="bg-gray-50 p-4 border border-gray-200">
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pago seguro y encriptado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
