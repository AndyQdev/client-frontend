'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Store } from '@/lib/types'
import { useCart } from '@/lib/cart-context'
import ModernStoreHeader from './ModernStoreHeader'
import Image from 'next/image'
import {
  CreditCard,
  Wallet,
  Banknote,
  Timer,
  CheckCircle2,
  Building2,
  Tag,
  Truck,
  Package
} from 'lucide-react'

interface ModernCheckoutProps {
  store: Store
}

export default function ModernCheckout({ store }: ModernCheckoutProps) {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'card' | 'cash'>('qr')
  const [promoCode, setPromoCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds

  // Customer info state
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  // Timer countdown
  useEffect(() => {
    if (paymentMethod === 'qr' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [paymentMethod, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const subtotal = getTotalPrice()
  const shipping = subtotal > 100000 ? 0 : 5000
  const tax = subtotal * 0.19
  const total = subtotal + shipping + tax

  const handleConfirmPayment = () => {
    // Generate random order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Clear cart
    clearCart()

    // Redirect to order tracking
    router.push(`/${store.slug}/pedido/${orderId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ModernStoreHeader store={store} onCartClick={() => {}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Finalizar Compra
          </h1>
          <p className="text-gray-600">Completa tu pedido de manera segura</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Order Summary */}
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-blue-600" />
                Resumen del Pedido
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                      {item.product.images[0] ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                      <p className="text-lg font-bold text-blue-600 mt-1">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Código Promocional
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Ingresa tu código"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                    Aplicar
                  </button>
                </div>
              </div>

              {/* Price Summary */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Envío
                  </span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'GRATIS' : `$${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>IVA (19%)</span>
                  <span className="font-semibold">${tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Info Form */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="juan@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+57 300 123 4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dirección de Envío</label>
                  <textarea
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Calle 123 #45-67, Apto 890, Bogotá"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Methods */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Método de Pago</h2>

              {/* Payment Tabs */}
              <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-2xl">
                <button
                  onClick={() => setPaymentMethod('qr')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    paymentMethod === 'qr'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Wallet className="w-5 h-5" />
                  <span className="hidden sm:inline">QR Code</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    paymentMethod === 'card'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="hidden sm:inline">Tarjeta</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    paymentMethod === 'cash'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Banknote className="w-5 h-5" />
                  <span className="hidden sm:inline">Efectivo</span>
                </button>
              </div>

              {/* QR Payment Content */}
              {paymentMethod === 'qr' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Escanea para Pagar</h3>
                    <p className="text-gray-600 mb-6">Usa tu app bancaria para escanear el código</p>

                    {/* QR Code Placeholder */}
                    <div className="relative w-64 h-64 mx-auto mb-6 rounded-3xl overflow-hidden shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-20" />
                      <div className="absolute inset-4 bg-white rounded-2xl" />
                      <div className="absolute inset-8 bg-gradient-to-br from-blue-600 to-purple-600 opacity-10"
                           style={{
                             backgroundImage: `
                               repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px),
                               repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)
                             `
                           }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Wallet className="w-20 h-20 text-blue-600 opacity-30" />
                      </div>
                    </div>

                    {/* Timer */}
                    <div className="flex items-center justify-center gap-2 mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                      <Timer className="w-5 h-5 text-blue-600" />
                      <span className="text-2xl font-bold text-gray-900">{formatTime(timeLeft)}</span>
                    </div>

                    {/* Payment Amount */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl mb-6">
                      <p className="text-sm font-medium mb-1">Monto a Pagar</p>
                      <p className="text-4xl font-bold">${total.toLocaleString()}</p>
                    </div>

                    {/* Bank Info */}
                    <div className="bg-gray-50 p-6 rounded-2xl mb-6 text-left">
                      <div className="flex items-center gap-2 mb-4">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        <h4 className="font-bold text-gray-900">Información Bancaria</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Banco:</span>
                          <span className="font-semibold text-gray-900">Bancolombia</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cuenta:</span>
                          <span className="font-semibold text-gray-900">123-456789-01</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Titular:</span>
                          <span className="font-semibold text-gray-900">{store.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="text-left space-y-3">
                      <h4 className="font-bold text-gray-900 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        Instrucciones
                      </h4>
                      <ol className="space-y-2 text-sm text-gray-600">
                        <li className="flex gap-2">
                          <span className="font-bold text-blue-600">1.</span>
                          <span>Abre tu aplicación bancaria</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-bold text-blue-600">2.</span>
                          <span>Selecciona "Pagar con QR"</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-bold text-blue-600">3.</span>
                          <span>Escanea el código mostrado arriba</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-bold text-blue-600">4.</span>
                          <span>Confirma el pago por ${total.toLocaleString()}</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-bold text-blue-600">5.</span>
                          <span>Espera la confirmación automática</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {/* Credit Card Content */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número de Tarjeta</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Vencimiento</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Titular</label>
                    <input
                      type="text"
                      placeholder="JUAN PEREZ"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Cash Content */}
              {paymentMethod === 'cash' && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Banknote className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Pago Contra Entrega</h3>
                  <p className="text-gray-600 mb-6">
                    Paga en efectivo cuando recibas tu pedido
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                    <p className="text-sm text-green-800">
                      <strong>Monto a pagar:</strong> ${total.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-700 mt-2">
                      Por favor, prepara el monto exacto para agilizar la entrega
                    </p>
                  </div>
                </div>
              )}

              {/* Confirm Button */}
              <button
                onClick={handleConfirmPayment}
                className="w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
              >
                Confirmar Pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
