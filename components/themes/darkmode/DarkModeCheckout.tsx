'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart-context'
import { Store } from '@/lib/types'
import DarkModeStoreHeader from './DarkModeStoreHeader'
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
  AlertCircle
} from 'lucide-react'
import Image from 'next/image'

interface DarkModeCheckoutProps {
  store: Store
}

export default function DarkModeCheckout({ store }: DarkModeCheckoutProps) {
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
      <div className="min-h-screen bg-zinc-900">
        <DarkModeStoreHeader store={store} />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700 p-12">
            <ShoppingBag className="w-20 h-20 text-zinc-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-zinc-300 uppercase mb-4">Carrito Vacío</h2>
            <p className="text-zinc-500 mb-8">No hay productos en tu carrito</p>
            <button
              onClick={() => router.push(`/${store.slug}`)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg font-bold uppercase transition-all"
            >
              Volver a la Tienda
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <DarkModeStoreHeader store={store} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-zinc-100 mb-3">FINALIZAR COMPRA</h1>
          <p className="text-sm text-zinc-500 uppercase tracking-wide">
            {getTotalItems()} productos • {new Date().toLocaleDateString('es-ES')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Payment Method Tabs */}
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700 overflow-hidden">
              <div className="bg-zinc-800 border-b border-zinc-700 p-6">
                <h2 className="text-2xl font-bold text-zinc-100 uppercase tracking-tight">Método de Pago</h2>
              </div>

              <div className="border-b border-zinc-700 grid grid-cols-3">
                <button
                  onClick={() => setPaymentMethod('qr')}
                  className={`p-4 font-semibold uppercase tracking-wide transition-all ${
                    paymentMethod === 'qr'
                      ? 'bg-yellow-500 text-black'
                      : 'bg-zinc-800/30 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300'
                  }`}
                >
                  <QrCode className="w-6 h-6 mx-auto mb-2" />
                  QR
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 font-semibold uppercase tracking-wide border-x border-zinc-700 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-yellow-500 text-black'
                      : 'bg-zinc-800/30 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300'
                  }`}
                >
                  <CreditCard className="w-6 h-6 mx-auto mb-2" />
                  Tarjeta
                </button>
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 font-semibold uppercase tracking-wide transition-all ${
                    paymentMethod === 'cash'
                      ? 'bg-yellow-500 text-black'
                      : 'bg-zinc-800/30 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300'
                  }`}
                >
                  <Wallet className="w-6 h-6 mx-auto mb-2" />
                  Efectivo
                </button>
              </div>

              {/* QR Payment Section */}
              {paymentMethod === 'qr' && (
                <div className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-zinc-100 uppercase">Escanea el Código QR</h3>
                        <p className="text-sm text-zinc-500 mt-1">Pago instantáneo y seguro</p>
                      </div>
                      <div className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        {formatTime(timeLeft)}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* QR Code */}
                      <div className="text-center">
                        <div className="border-4 border-yellow-500 bg-white p-8 rounded-lg inline-block">
                          <div className="w-64 h-64 bg-gray-100 flex items-center justify-center">
                            <QrCode className="w-32 h-32 text-gray-400" />
                          </div>
                        </div>
                        <p className="mt-4 font-semibold text-sm text-zinc-400">
                          Código válido por {formatTime(timeLeft)}
                        </p>
                      </div>

                      {/* Payment Info */}
                      <div className="space-y-4">
                        <div className="bg-zinc-800 p-6 rounded-lg">
                          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">Monto a Pagar</p>
                          <p className="text-4xl font-bold text-yellow-500">${getTotalPrice().toLocaleString()}</p>
                        </div>

                        <div className="bg-zinc-800/50 border border-zinc-700 p-4 rounded-lg">
                          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">Número de Orden</p>
                          <p className="text-xl font-bold text-zinc-300">#{Math.floor(Math.random() * 100000)}</p>
                        </div>

                        <div className="bg-zinc-800/50 border border-zinc-700 p-4 rounded-lg">
                          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">Banco</p>
                          <p className="text-lg font-bold text-zinc-300">BANCO EJEMPLO</p>
                        </div>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="mt-8 pt-6 border-t border-zinc-700">
                      <h4 className="text-lg font-bold text-zinc-300 mb-4 uppercase">Instrucciones:</h4>
                      <div className="space-y-3">
                        {[
                          'Abre la aplicación de tu banco',
                          'Selecciona la opción de pago con QR',
                          'Escanea el código QR mostrado arriba',
                          'Confirma el monto y completa el pago'
                        ].map((step, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <div className="bg-yellow-500 text-black w-8 h-8 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            <p className="font-semibold text-zinc-400 pt-1">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-yellow-500 uppercase text-sm">Importante</p>
                        <p className="text-sm text-zinc-400 mt-1">
                          El código QR expira en {formatTime(timeLeft)}. Si el tiempo se agota, deberás generar uno nuevo.
                        </p>
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
                      <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                        Número de Tarjeta
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-yellow-500 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                          Vencimiento
                        </label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-yellow-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-yellow-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Cash Payment */}
              {paymentMethod === 'cash' && (
                <div className="p-8">
                  <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
                    <h3 className="text-2xl font-bold text-zinc-100 uppercase mb-2">Pago en Efectivo</h3>
                    <p className="font-semibold text-zinc-400">
                      Pagarás al momento de recibir tu pedido.
                    </p>
                    <div className="mt-4 pt-4 border-t border-zinc-700">
                      <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">Monto a Pagar</p>
                      <p className="text-4xl font-bold text-yellow-500">${getTotalPrice().toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Customer Information Form */}
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700 overflow-hidden">
              <div className="bg-zinc-800 border-b border-zinc-700 p-6">
                <h2 className="text-2xl font-bold text-zinc-100 uppercase tracking-tight">Información de Contacto</h2>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-yellow-500 transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-yellow-500 transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-yellow-500 transition-colors"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Dirección de Entrega *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-yellow-500 transition-colors"
                    placeholder="Calle, número, ciudad"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                    Notas Adicionales
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                    placeholder="Instrucciones especiales para la entrega..."
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary - 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700 overflow-hidden sticky top-20">
              <div className="bg-zinc-800 border-b border-zinc-700 p-6">
                <h2 className="text-2xl font-bold text-zinc-100 uppercase tracking-tight">Resumen</h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Items */}
                <div className="space-y-3 pb-4 border-b border-zinc-700">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700 flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-zinc-300 line-clamp-2">{item.product.name}</p>
                        <p className="text-xs text-zinc-500">
                          {item.quantity} × ${item.product.price.toLocaleString()}
                        </p>
                        <p className="font-bold text-sm text-zinc-200 mt-1">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="uppercase tracking-wider text-zinc-500">Subtotal</span>
                    <span className="font-semibold text-zinc-300">${getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="uppercase tracking-wider text-zinc-500">Envío</span>
                    <span className="font-bold text-green-500 uppercase text-xs">Gratis</span>
                  </div>
                  <div className="h-px bg-zinc-700"></div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-zinc-100 uppercase">Total</span>
                    <span className="text-3xl font-bold text-yellow-500">${getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-4 rounded-lg text-lg font-bold uppercase tracking-wide transition-all mt-6"
                >
                  Procesar Pago
                </button>

                {/* Security Note */}
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 text-center">
                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    🔒 Pago 100% Seguro
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
