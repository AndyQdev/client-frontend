'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart-context'
import { Store } from '@/lib/types'
import CreativeStoreHeader from './CreativeStoreHeader'
import {
  CreditCard,
  Wallet,
  QrCode,
  Clock,
  ShoppingBag,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Zap,
  Star
} from 'lucide-react'
import Image from 'next/image'

interface CreativeCheckoutProps {
  store: Store
}

export default function CreativeCheckout({ store }: CreativeCheckoutProps) {
  const router = useRouter()
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'card' | 'cash'>('qr')
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  })

  // Timer countdown
  useEffect(() => {
    if (paymentMethod !== 'qr') return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [paymentMethod])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
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

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <CreativeStoreHeader store={store} onCartClick={() => {}} />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="relative bg-white rounded-3xl p-12 transform hover:rotate-1 transition-transform duration-300">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl blur opacity-30 animate-pulse"></div>
            <div className="relative">
              <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
                Carrito Vacío
              </h2>
              <p className="text-gray-600 mb-8">No hay productos en tu carrito</p>
              <button
                onClick={() => router.push(`/${store.slug}`)}
                className="relative bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-bold hover:from-purple-500 hover:to-blue-500 transition-all transform hover:scale-105"
              >
                Volver a la Tienda
                <Sparkles className="inline w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <CreativeStoreHeader store={store} onCartClick={() => {}} />

      {/* Floating elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-lg opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-md opacity-40 animate-ping"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2 transform hover:scale-105 transition-transform">
            Checkout Mágico
          </h1>
          <p className="text-white/80 flex items-center justify-center space-x-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{getTotalItems()} productos</span>
            <span>•</span>
            <span>{new Date().toLocaleDateString()}</span>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Payment Method Tabs */}
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden transform hover:rotate-1 transition-transform duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl blur opacity-20"></div>

              <div className="relative">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <Zap className="w-6 h-6 mr-2" />
                    Método de Pago
                  </h2>
                </div>

                <div className="flex p-2">
                  <button
                    onClick={() => setPaymentMethod('qr')}
                    className={`flex-1 p-4 font-bold rounded-2xl transition-all transform hover:scale-105 ${
                      paymentMethod === 'qr'
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <QrCode className="w-6 h-6 mx-auto mb-2" />
                    QR
                  </button>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 p-4 font-bold rounded-2xl mx-2 transition-all transform hover:scale-105 ${
                      paymentMethod === 'card'
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2" />
                    Tarjeta
                  </button>
                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`flex-1 p-4 font-bold rounded-2xl transition-all transform hover:scale-105 ${
                      paymentMethod === 'cash'
                        ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Wallet className="w-6 h-6 mx-auto mb-2" />
                    Efectivo
                  </button>
                </div>

                {/* QR Payment Section - EMPHASIZED */}
                {paymentMethod === 'qr' && (
                  <div className="p-8">
                    <div className="relative bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/30">
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-3xl blur opacity-30 animate-pulse"></div>

                      <div className="relative">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-white flex items-center">
                              <Sparkles className="w-6 h-6 mr-2 text-yellow-400" />
                              Escanea el Código QR
                            </h3>
                            <p className="text-white/70 text-sm mt-1">Pago instantáneo y seguro</p>
                          </div>
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold animate-pulse">
                            <Clock className="w-5 h-5 inline mr-2" />
                            {formatTime(timeLeft)}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                          {/* QR Code */}
                          <div className="text-center">
                            <div className="relative inline-block">
                              <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur-lg opacity-50 animate-pulse"></div>
                              <div className="relative bg-white rounded-3xl p-8 transform hover:rotate-3 transition-transform">
                                <div className="w-64 h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                                  <QrCode className="w-32 h-32 text-gray-400" />
                                </div>
                              </div>
                            </div>
                            <p className="mt-4 font-bold text-white text-sm flex items-center justify-center">
                              <Star className="w-4 h-4 mr-2 text-yellow-400" />
                              Válido por {formatTime(timeLeft)}
                            </p>
                          </div>

                          {/* Payment Info */}
                          <div className="space-y-4">
                            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-4 text-white transform hover:scale-105 transition-transform">
                              <p className="text-xs uppercase tracking-wider mb-2 opacity-90">Monto a Pagar</p>
                              <p className="text-4xl font-black">${getTotalPrice().toLocaleString()}</p>
                            </div>

                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 transform hover:scale-105 transition-transform">
                              <p className="text-xs uppercase tracking-wider mb-2 text-white/70">Número de Orden</p>
                              <p className="text-xl font-bold text-white">#{Math.floor(Math.random() * 100000)}</p>
                            </div>

                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 transform hover:scale-105 transition-transform">
                              <p className="text-xs uppercase tracking-wider mb-2 text-white/70">Banco</p>
                              <p className="text-lg font-bold text-white">BANCO EJEMPLO</p>
                            </div>
                          </div>
                        </div>

                        {/* Instructions */}
                        <div className="mt-8 pt-6 border-t border-white/20">
                          <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                            <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                            Instrucciones:
                          </h4>
                          <div className="space-y-3">
                            {[
                              { icon: '📱', text: 'Abre la aplicación de tu banco' },
                              { icon: '🔍', text: 'Selecciona la opción de pago con QR' },
                              { icon: '📸', text: 'Escanea el código QR mostrado arriba' },
                              { icon: '✅', text: 'Confirma el monto y completa el pago' }
                            ].map((step, index) => (
                              <div key={index} className="flex items-start space-x-4 group">
                                <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-black flex-shrink-0 transform group-hover:scale-110 transition-transform">
                                  {index + 1}
                                </div>
                                <div className="pt-2">
                                  <span className="text-2xl mr-2">{step.icon}</span>
                                  <span className="font-bold text-white">{step.text}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-2xl border border-orange-500/30 p-4 flex items-start space-x-3">
                          <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5 animate-pulse" />
                          <div>
                            <p className="font-bold text-orange-300 uppercase text-sm">Importante</p>
                            <p className="text-sm text-white/80 mt-1">
                              El código QR expira en {formatTime(timeLeft)}. Si el tiempo se agota, deberás generar uno nuevo.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Card Payment */}
                {paymentMethod === 'card' && (
                  <div className="p-8">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider mb-2 text-white/80">
                          Número de Tarjeta
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full bg-white/10 border-2 border-white/20 rounded-2xl p-3 text-white font-mono focus:border-pink-500 outline-none backdrop-blur-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider mb-2 text-white/80">
                            Vencimiento
                          </label>
                          <input
                            type="text"
                            placeholder="MM/AA"
                            className="w-full bg-white/10 border-2 border-white/20 rounded-2xl p-3 text-white font-mono focus:border-pink-500 outline-none backdrop-blur-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider mb-2 text-white/80">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full bg-white/10 border-2 border-white/20 rounded-2xl p-3 text-white font-mono focus:border-pink-500 outline-none backdrop-blur-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cash Payment */}
                {paymentMethod === 'cash' && (
                  <div className="p-8">
                    <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-3xl border border-green-500/30 p-6">
                      <CheckCircle2 className="w-12 h-12 text-green-400 mb-4 animate-bounce" />
                      <h3 className="text-2xl font-bold text-white mb-2">Pago en Efectivo</h3>
                      <p className="font-bold text-white/80">
                        Pagarás al momento de recibir tu pedido.
                      </p>
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <p className="text-xs uppercase tracking-wider text-white/70 mb-2">Monto a Pagar</p>
                        <p className="text-4xl font-black bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                          ${getTotalPrice().toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Information Form */}
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden transform hover:-rotate-1 transition-transform duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20"></div>

              <div className="relative">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <User className="w-6 h-6 mr-2" />
                    Información de Contacto
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2 text-white/80 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/10 border-2 border-white/20 rounded-2xl p-3 text-white font-bold focus:border-pink-500 outline-none backdrop-blur-sm"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-2 text-white/80 flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/10 border-2 border-white/20 rounded-2xl p-3 text-white font-bold focus:border-pink-500 outline-none backdrop-blur-sm"
                        placeholder="tu@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-2 text-white/80 flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/10 border-2 border-white/20 rounded-2xl p-3 text-white font-bold focus:border-pink-500 outline-none backdrop-blur-sm"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2 text-white/80 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Dirección de Entrega *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-white/10 border-2 border-white/20 rounded-2xl p-3 text-white font-bold focus:border-pink-500 outline-none backdrop-blur-sm"
                      placeholder="Calle, número, ciudad"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2 text-white/80">
                      Notas Adicionales
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      className="w-full bg-white/10 border-2 border-white/20 rounded-2xl p-3 text-white font-bold focus:border-pink-500 outline-none backdrop-blur-sm resize-none"
                      placeholder="Instrucciones especiales para la entrega..."
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Order Summary - 1 column */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden transform hover:rotate-1 transition-transform duration-300">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 rounded-3xl blur opacity-20 animate-pulse"></div>

                <div className="relative">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                      <ShoppingBag className="w-6 h-6 mr-2" />
                      Resumen
                    </h2>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Items */}
                    <div className="space-y-3 pb-4 border-b border-white/20">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex space-x-3 group">
                          <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 transform group-hover:scale-110 transition-transform">
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-white text-sm line-clamp-2">{item.product.name}</p>
                            <p className="text-xs text-white/60">
                              {item.quantity} × ${item.product.price.toLocaleString()}
                            </p>
                            <p className="font-bold text-pink-400 text-sm mt-1">
                              ${(item.product.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/70">Subtotal</span>
                        <span className="font-bold text-white">${getTotalPrice().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/70">Envío</span>
                        <span className="font-bold text-green-400 uppercase text-xs tracking-wider flex items-center">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Gratis
                        </span>
                      </div>
                      <div className="h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"></div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-lg font-bold text-white">Total</span>
                        <span className="text-3xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                          ${getTotalPrice().toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      className="relative w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 text-lg font-bold rounded-full hover:from-purple-500 hover:to-blue-500 transition-all transform hover:scale-105 mt-6 group"
                    >
                      <span className="flex items-center justify-center">
                        <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                        Pagar Ahora
                        <Sparkles className="w-5 h-5 ml-2 group-hover:animate-spin" />
                      </span>
                      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    </button>

                    {/* Security Note */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-4 text-center">
                      <p className="text-xs uppercase tracking-wider text-white/80 flex items-center justify-center">
                        <Star className="w-4 h-4 mr-2 text-yellow-400" />
                        Pago 100% Seguro
                        <Star className="w-4 h-4 ml-2 text-yellow-400" />
                      </p>
                    </div>
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
