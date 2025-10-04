'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Store } from '@/lib/types'
import { useCart } from '@/lib/cart-context'
import EleganteStoreHeader from './EleganteStoreHeader'
import Image from 'next/image'
import {
  CreditCard,
  Smartphone,
  Banknote,
  Clock,
  CheckCircle2,
  Building2,
  Tag,
  TruckIcon,
  Package
} from 'lucide-react'

interface EleganteCheckoutProps {
  store: Store
}

export default function EleganteCheckout({ store }: EleganteCheckoutProps) {
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
    <div className="min-h-screen bg-white">
      <EleganteStoreHeader store={store} onCartClick={() => {}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16 border-b border-gray-200 pb-8">
          <h1 className="font-serif text-5xl text-gray-900 mb-3 tracking-tight">
            Finalizar Compra
          </h1>
          <p className="text-gray-600 font-light tracking-wider uppercase text-sm">
            Complete su pedido con elegancia
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Order Summary */}
          <div className="space-y-8">
            {/* Cart Items */}
            <div className="border border-gray-200 p-8">
              <h2 className="font-serif text-2xl text-gray-900 mb-8 pb-4 border-b border-gray-200 flex items-center gap-3">
                <Package className="w-6 h-6" />
                Resumen del Pedido
              </h2>

              <div className="space-y-6 mb-8">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-6 pb-6 border-b border-gray-100 last:border-0">
                    <div className="relative w-24 h-24 border border-gray-200 flex-shrink-0 overflow-hidden">
                      {item.product.images[0] ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-lg text-gray-900 mb-1">{item.product.name}</h3>
                      <p className="text-sm text-gray-500 font-light tracking-wide">
                        Cantidad: {item.quantity}
                      </p>
                      <p className="text-xl font-light text-gray-900 mt-2">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mb-8">
                <label className="block text-sm font-light text-gray-700 mb-3 uppercase tracking-widest flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Código Promocional
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Ingrese su código"
                    className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors font-light"
                  />
                  <button className="px-8 py-3 bg-black text-white font-light uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors">
                    Aplicar
                  </button>
                </div>
              </div>

              {/* Price Summary */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-gray-600 font-light">
                  <span className="tracking-wide">Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-light">
                  <span className="tracking-wide flex items-center gap-2">
                    <TruckIcon className="w-4 h-4" />
                    Envío
                  </span>
                  <span>
                    {shipping === 0 ? 'GRATIS' : `$${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 font-light">
                  <span className="tracking-wide">IVA (19%)</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-2xl font-serif text-gray-900 pt-6 border-t border-gray-300">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Customer Info Form */}
            <div className="border border-gray-200 p-8">
              <h2 className="font-serif text-2xl text-gray-900 mb-8 pb-4 border-b border-gray-200">
                Información de Contacto
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2 uppercase tracking-widest">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors font-light"
                    placeholder="Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2 uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors font-light"
                    placeholder="juan@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2 uppercase tracking-widest">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors font-light"
                    placeholder="+57 300 123 4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2 uppercase tracking-widest">
                    Dirección de Envío
                  </label>
                  <textarea
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors font-light resize-none"
                    placeholder="Calle 123 #45-67, Apto 890, Bogotá"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Methods */}
          <div>
            <div className="border border-gray-200 p-8 sticky top-32">
              <h2 className="font-serif text-2xl text-gray-900 mb-8 pb-4 border-b border-gray-200">
                Método de Pago
              </h2>

              {/* Payment Tabs */}
              <div className="grid grid-cols-3 gap-2 mb-10 border border-gray-200">
                <button
                  onClick={() => setPaymentMethod('qr')}
                  className={`py-4 px-3 font-light uppercase tracking-widest text-xs transition-all flex flex-col items-center justify-center gap-2 ${
                    paymentMethod === 'qr'
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                  <span>QR Code</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`py-4 px-3 font-light uppercase tracking-widest text-xs transition-all flex flex-col items-center justify-center gap-2 border-l border-r border-gray-200 ${
                    paymentMethod === 'card'
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Tarjeta</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`py-4 px-3 font-light uppercase tracking-widest text-xs transition-all flex flex-col items-center justify-center gap-2 ${
                    paymentMethod === 'cash'
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Banknote className="w-5 h-5" />
                  <span>Efectivo</span>
                </button>
              </div>

              {/* QR Payment Content */}
              {paymentMethod === 'qr' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="font-serif text-3xl text-gray-900 mb-2">Escanea para Pagar</h3>
                    <p className="text-gray-600 font-light tracking-wide mb-8">
                      Utilice su aplicación bancaria
                    </p>

                    {/* QR Code Placeholder with Decorative Frame */}
                    <div className="relative inline-block mb-8">
                      {/* Decorative corners */}
                      <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-black" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-black" />
                      <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-black" />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-black" />

                      {/* QR Code */}
                      <div className="w-72 h-72 border-4 border-black p-4 bg-white">
                        <div className="w-full h-full relative">
                          <div className="absolute inset-0 border border-gray-200" />
                          <div className="absolute inset-4"
                               style={{
                                 backgroundImage: `
                                   repeating-linear-gradient(0deg, transparent, transparent 8px, #000 8px, #000 10px),
                                   repeating-linear-gradient(90deg, transparent, transparent 8px, #000 8px, #000 10px)
                                 `,
                                 opacity: 0.1
                               }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Smartphone className="w-16 h-16 text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Elegant Timer */}
                    <div className="flex items-center justify-center gap-3 mb-8 py-4 border-t border-b border-gray-200">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <span className="font-serif text-3xl text-gray-900">{formatTime(timeLeft)}</span>
                    </div>

                    {/* Payment Amount Box */}
                    <div className="bg-black text-white p-8 mb-8">
                      <p className="text-sm font-light uppercase tracking-widest mb-2">Monto a Pagar</p>
                      <p className="font-serif text-5xl">${total.toLocaleString()}</p>
                    </div>

                    {/* Bank Info - Elegant */}
                    <div className="border border-gray-200 p-6 mb-8 text-left">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                        <Building2 className="w-5 h-5" />
                        <h4 className="font-serif text-lg text-gray-900">Información Bancaria</h4>
                      </div>
                      <div className="space-y-4 text-sm font-light">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600 uppercase tracking-wide">Banco</span>
                          <span className="text-gray-900">Bancolombia</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600 uppercase tracking-wide">Cuenta</span>
                          <span className="text-gray-900">123-456789-01</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600 uppercase tracking-wide">Titular</span>
                          <span className="text-gray-900">{store.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Elegant Instructions */}
                    <div className="text-left space-y-4">
                      <h4 className="font-serif text-lg text-gray-900 flex items-center gap-2 mb-6">
                        <CheckCircle2 className="w-5 h-5" />
                        Pasos a Seguir
                      </h4>
                      <div className="space-y-5">
                        <div className="flex gap-4">
                          <span className="flex-shrink-0 w-8 h-8 border border-black flex items-center justify-center font-light text-sm">
                            1
                          </span>
                          <p className="text-gray-600 font-light pt-1">
                            Abra su aplicación bancaria
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <span className="flex-shrink-0 w-8 h-8 border border-black flex items-center justify-center font-light text-sm">
                            2
                          </span>
                          <p className="text-gray-600 font-light pt-1">
                            Seleccione la opción "Pagar con QR"
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <span className="flex-shrink-0 w-8 h-8 border border-black flex items-center justify-center font-light text-sm">
                            3
                          </span>
                          <p className="text-gray-600 font-light pt-1">
                            Escanee el código QR mostrado
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <span className="flex-shrink-0 w-8 h-8 border border-black flex items-center justify-center font-light text-sm">
                            4
                          </span>
                          <p className="text-gray-600 font-light pt-1">
                            Confirme el pago de ${total.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <span className="flex-shrink-0 w-8 h-8 border border-black flex items-center justify-center font-light text-sm">
                            5
                          </span>
                          <p className="text-gray-600 font-light pt-1">
                            Aguarde la confirmación automática
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Credit Card Content */}
              {paymentMethod === 'card' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2 uppercase tracking-widest">
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors font-light"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2 uppercase tracking-widest">
                        Vencimiento
                      </label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors font-light"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2 uppercase tracking-widest">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors font-light"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-light text-gray-700 mb-2 uppercase tracking-widest">
                      Titular de la Tarjeta
                    </label>
                    <input
                      type="text"
                      placeholder="JUAN PEREZ"
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors font-light uppercase"
                    />
                  </div>
                </div>
              )}

              {/* Cash Content */}
              {paymentMethod === 'cash' && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 border-4 border-black flex items-center justify-center mx-auto mb-6">
                    <Banknote className="w-12 h-12 text-gray-900" />
                  </div>
                  <h3 className="font-serif text-2xl text-gray-900 mb-3">Pago Contra Entrega</h3>
                  <p className="text-gray-600 font-light tracking-wide mb-8 max-w-sm mx-auto">
                    Realice su pago en efectivo al recibir su pedido
                  </p>
                  <div className="border-2 border-black p-6 bg-gray-50">
                    <p className="text-sm font-light text-gray-900 mb-2">
                      <span className="uppercase tracking-widest">Monto a pagar:</span>
                    </p>
                    <p className="font-serif text-3xl text-gray-900 mb-4">
                      ${total.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 font-light">
                      Le recomendamos preparar el monto exacto para facilitar la transacción
                    </p>
                  </div>
                </div>
              )}

              {/* Confirm Button */}
              <button
                onClick={handleConfirmPayment}
                className="w-full mt-10 py-5 bg-black text-white font-light uppercase tracking-widest hover:bg-gray-800 transition-all text-sm"
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
