'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/lib/cart-context'
import { useRouter } from 'next/navigation'
import { Store } from '@/lib/types'
import ClassicStoreHeader from './ClassicStoreHeader'
import Image from 'next/image'
import { CreditCard, Smartphone, Clock, Crown, Shield, Star } from 'lucide-react'

interface ClassicCheckoutProps {
  store: Store
}

export default function ClassicCheckout({ store }: ClassicCheckoutProps) {
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <ClassicStoreHeader store={store} onCartClick={() => {}} />

      {/* Ornamental Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <Crown className="w-12 h-12 text-amber-200" />
          </div>
          <h1 className="text-4xl font-serif text-white mb-2">Finalizar Pedido</h1>
          <p className="text-amber-100 font-serif italic">Con la distinción de siempre</p>

          {/* Decorative divider */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-px bg-amber-300"></div>
              <Star className="w-4 h-4 text-amber-300" />
              <div className="w-12 h-px bg-amber-300"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Columna Izquierda - Formulario y Pago */}
          <div className="space-y-8">
            {/* Información del Cliente */}
            <div className="bg-white rounded-lg shadow-md border-2 border-amber-200 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">📋</span>
                </div>
                <h2 className="text-2xl font-serif text-amber-900">Información de Contacto</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-serif text-amber-800 mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded focus:border-amber-500 focus:outline-none transition-colors font-serif"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label className="block text-sm font-serif text-amber-800 mb-2">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded focus:border-amber-500 focus:outline-none transition-colors font-serif"
                    placeholder="juan@ejemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-serif text-amber-800 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded focus:border-amber-500 focus:outline-none transition-colors font-serif"
                    placeholder="+52 123 456 7890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-serif text-amber-800 mb-2">Dirección de Entrega</label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded focus:border-amber-500 focus:outline-none transition-colors font-serif resize-none"
                    placeholder="Calle, número, colonia, ciudad"
                  />
                </div>

                <div>
                  <label className="block text-sm font-serif text-amber-800 mb-2">Notas Especiales (opcional)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded focus:border-amber-500 focus:outline-none transition-colors font-serif resize-none"
                    placeholder="Instrucciones de entrega"
                  />
                </div>
              </form>
            </div>

            {/* Método de Pago */}
            <div className="bg-white rounded-lg shadow-md border-2 border-amber-200 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">💳</span>
                </div>
                <h2 className="text-2xl font-serif text-amber-900">Método de Pago</h2>
              </div>

              {/* Classic Tabs */}
              <div className="flex border-b-2 border-amber-200 mb-8">
                <button
                  onClick={() => setActiveTab('qr')}
                  className={`flex-1 py-4 font-serif font-medium border-b-4 transition-all ${
                    activeTab === 'qr'
                      ? 'border-amber-600 text-amber-900 bg-amber-50'
                      : 'border-transparent text-amber-600 hover:text-amber-800 hover:bg-amber-50'
                  }`}
                >
                  <Smartphone className="w-5 h-5 inline-block mr-2" />
                  Código QR
                </button>
                <button
                  onClick={() => setActiveTab('card')}
                  className={`flex-1 py-4 font-serif font-medium border-b-4 transition-all ${
                    activeTab === 'card'
                      ? 'border-amber-600 text-amber-900 bg-amber-50'
                      : 'border-transparent text-amber-600 hover:text-amber-800 hover:bg-amber-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 inline-block mr-2" />
                  Tarjeta
                </button>
              </div>

              {/* QR Payment - EMPHASIZED */}
              {activeTab === 'qr' && (
                <div className="space-y-6">
                  {/* Ornate QR Code Frame */}
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-lg border-4 border-double border-amber-400 relative">
                    {/* Decorative corners */}
                    <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-amber-600"></div>
                    <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-amber-600"></div>
                    <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-amber-600"></div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-amber-600"></div>

                    <div className="flex flex-col items-center">
                      {/* Crown decoration */}
                      <Crown className="w-10 h-10 text-amber-600 mb-4" />

                      {/* QR Code with vintage border */}
                      <div className="w-72 h-72 bg-white border-8 border-amber-700 rounded-lg p-6 shadow-lg mb-6 relative">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-600 px-4 py-1 rounded-full">
                          <span className="text-white text-xs font-serif font-bold">ESCANEAR</span>
                        </div>
                        <div className="w-full h-full bg-amber-900 flex items-center justify-center">
                          <span className="text-amber-100 text-sm font-serif">QR CODE</span>
                        </div>
                      </div>

                      {/* Ornamental Timer */}
                      <div className="bg-white rounded-full px-6 py-3 border-2 border-amber-600 shadow-md mb-4">
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-amber-700" />
                          <span className="text-sm font-serif text-amber-800">Tiempo restante:</span>
                          <span className="text-lg font-serif font-bold text-amber-900">{formatTime(timeLeft)}</span>
                        </div>
                      </div>

                      {/* Vintage Amount Display */}
                      <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg px-8 py-4 text-center shadow-lg border-2 border-amber-800">
                        <p className="text-xs font-serif text-amber-200 mb-1 tracking-wide">MONTO A PAGAR</p>
                        <p className="text-3xl font-serif font-bold text-white">${total.toLocaleString()}</p>
                        <div className="flex justify-center mt-2 space-x-1">
                          <Star className="w-3 h-3 text-amber-300" />
                          <Star className="w-3 h-3 text-amber-300" />
                          <Star className="w-3 h-3 text-amber-300" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Classic Instructions */}
                  <div className="bg-white border-4 border-amber-300 rounded-lg p-6 relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-600 px-6 py-1 rounded-full">
                      <span className="text-white text-sm font-serif font-bold">INSTRUCCIONES</span>
                    </div>

                    <div className="mt-4 space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white font-serif font-bold">I</span>
                        </div>
                        <div className="flex-1 pt-2">
                          <p className="text-amber-900 font-serif">Abra su aplicación bancaria preferida o cartera digital</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white font-serif font-bold">II</span>
                        </div>
                        <div className="flex-1 pt-2">
                          <p className="text-amber-900 font-serif">Escanee el código QR con la cámara de su dispositivo</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white font-serif font-bold">III</span>
                        </div>
                        <div className="flex-1 pt-2">
                          <p className="text-amber-900 font-serif">Verifique el monto y confirme su transacción</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white font-serif font-bold">IV</span>
                        </div>
                        <div className="flex-1 pt-2">
                          <p className="text-amber-900 font-serif">Recibirá confirmación inmediata de su pedido</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vintage Button */}
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-5 text-lg font-serif font-bold hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg border-2 border-amber-800 rounded-lg relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-3">
                      <Crown className="w-5 h-5" />
                      <span>Confirmar Pago</span>
                      <Crown className="w-5 h-5" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                </div>
              )}

              {/* Card Payment */}
              {activeTab === 'card' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-serif text-amber-800 mb-2">Número de Tarjeta</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded focus:border-amber-500 focus:outline-none transition-colors font-serif"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-serif text-amber-800 mb-2">Fecha de Expiración</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full px-4 py-3 border-2 border-amber-200 rounded focus:border-amber-500 focus:outline-none transition-colors font-serif"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-serif text-amber-800 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border-2 border-amber-200 rounded focus:border-amber-500 focus:outline-none transition-colors font-serif"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-5 text-lg font-serif font-bold hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg border-2 border-amber-800 rounded-lg mt-6"
                  >
                    Confirmar Pago
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Columna Derecha - Resumen Heritage Card */}
          <div>
            <div className="bg-white rounded-lg shadow-xl border-4 border-double border-amber-400 p-8 sticky top-8">
              {/* Ornamental header */}
              <div className="text-center mb-6 pb-6 border-b-2 border-amber-200">
                <Crown className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                <h2 className="text-2xl font-serif text-amber-900 mb-1">Resumen del Pedido</h2>
                <p className="text-sm font-serif text-amber-600 italic">Con nuestra garantía de excelencia</p>
              </div>

              {/* Items with heritage styling */}
              <div className="space-y-4 mb-6 pb-6 border-b-2 border-amber-200">
                {items.map((item) => (
                  <div key={item.product.id} className="flex space-x-4 bg-amber-50 p-3 rounded border border-amber-200">
                    <div className="relative w-20 h-20 bg-white flex-shrink-0 rounded border-2 border-amber-300">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-serif text-amber-900 mb-1 font-medium line-clamp-1">
                        {item.product.name}
                      </h3>
                      <p className="text-xs font-serif text-amber-600">Cantidad: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-serif font-bold text-amber-900">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totales con estilo vintage */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center font-serif">
                  <span className="text-amber-700">Subtotal</span>
                  <span className="text-amber-900 font-medium">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center font-serif">
                  <span className="text-amber-700">Envío</span>
                  <span className="text-amber-900 font-medium">Cortesía</span>
                </div>
                <div className="flex justify-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-px bg-amber-400"></div>
                    <div className="w-2 h-2 bg-amber-600 rotate-45"></div>
                    <div className="w-24 h-px bg-amber-400"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-gradient-to-r from-amber-100 to-amber-50 p-4 rounded-lg border-2 border-amber-300">
                  <span className="font-serif font-bold text-amber-900 text-lg">Total</span>
                  <span className="text-2xl font-serif font-bold text-amber-900">${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Seguridad con sello vintage */}
              <div className="bg-gradient-to-br from-amber-600 to-amber-800 p-6 rounded-lg text-center border-2 border-amber-900 shadow-lg">
                <Shield className="w-10 h-10 text-amber-200 mx-auto mb-3" />
                <p className="text-white font-serif font-bold mb-1">Pago Seguro Garantizado</p>
                <p className="text-amber-200 text-xs font-serif italic">Encriptación de nivel bancario</p>
                <div className="flex justify-center mt-3 space-x-1">
                  <Star className="w-4 h-4 text-amber-300" />
                  <Star className="w-4 h-4 text-amber-300" />
                  <Star className="w-4 h-4 text-amber-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
