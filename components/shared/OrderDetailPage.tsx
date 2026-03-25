'use client'

import { useState, useEffect } from 'react'
import {
  Package,
  Clock,
  MapPin,
  User,
  CreditCard,
  Truck,
  CheckCircle,
  XCircle,
  ShoppingBag,
  ArrowRight,
  Store,
} from 'lucide-react'
import { apiClient } from '@/lib/api/client'
import AnimatedBackground from './AnimatedBackground'

interface OrderDetailPageProps {
  orderId: string
}

interface OrderData {
  id: string
  totalAmount: number
  status: string
  type: string
  paymentMethod: string
  source: string
  notes?: string
  deliveryInfo?: {
    address: string
    cost: number
    notes?: string
  }
  customer?: {
    name: string
    phone: string
  }
  store?: {
    id: string
    name: string
    slug: string
    config?: {
      branding?: { logoUrl?: string }
      currency?: string
    }
  }
  items: Array<{
    id: string
    quantity: number
    price: number
    subtotal: number
    storeProduct?: {
      id: string
      price: number
      product?: {
        name: string
        description?: string
      }
    }
  }>
  created_at: string
}

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: any }> = {
  pendiente: { label: 'Pendiente', color: 'text-yellow-700', bgColor: 'bg-yellow-50 border-yellow-200', icon: Clock },
  'en-proceso': { label: 'En Proceso', color: 'text-blue-700', bgColor: 'bg-blue-50 border-blue-200', icon: Package },
  'en-camino': { label: 'En Camino', color: 'text-purple-700', bgColor: 'bg-purple-50 border-purple-200', icon: Truck },
  completado: { label: 'Completado', color: 'text-green-700', bgColor: 'bg-green-50 border-green-200', icon: CheckCircle },
  cancelado: { label: 'Cancelado', color: 'text-red-700', bgColor: 'bg-red-50 border-red-200', icon: XCircle },
}

const statusSteps = ['pendiente', 'en-proceso', 'en-camino', 'completado']

export function OrderDetailPage({ orderId }: OrderDetailPageProps) {
  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true)
        const response = await apiClient.get(`/order/public/${orderId}`)
        setOrder(response.data.data)
      } catch (err) {
        console.error('Error fetching order:', err)
        setError('Pedido no encontrado')
      } finally {
        setLoading(false)
      }
    }
    if (orderId) fetchOrder()
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
          <p className="text-white/80">Cargando pedido...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-center max-w-md mx-auto p-6">
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Pedido no encontrado</h1>
          <p className="text-white/70">{error || 'El pedido que buscas no existe o ha sido eliminado.'}</p>
        </div>
      </div>
    )
  }

  const status = statusConfig[order.status] || statusConfig['pendiente']
  const StatusIcon = status.icon
  const currency = order.store?.config?.currency || 'Bs'
  const isCancelled = order.status === 'cancelado'
  const currentStepIndex = statusSteps.indexOf(order.status)
  const subtotal = order.items.reduce((sum, item) => sum + Number(item.subtotal || item.price * item.quantity), 0)
  const deliveryCost = order.deliveryInfo?.cost || 0

  return (
    <div className="min-h-screen py-6 sm:py-8 relative">
      <AnimatedBackground />

      <div className="relative z-10">
        {/* Title */}
        <div className="max-w-2xl mx-auto px-4 mb-4 md:mb-6 hidden md:block">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent mb-2">
              Detalle de tu pedido
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full opacity-80" />
          </div>
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white/90 rounded-2xl shadow-xl border border-gray-200 overflow-hidden backdrop-blur-sm">
            {/* Store Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {order.store?.config?.branding?.logoUrl ? (
                    <img
                      src={order.store.config.branding.logoUrl}
                      alt={order.store.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Store className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm sm:text-lg font-bold text-white truncate">
                      {order.store?.name || 'Tienda'}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-300">
                      Pedido #{order.id.substring(0, 8).toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-full border text-xs font-semibold ${status.bgColor} ${status.color}`}>
                  {status.label}
                </div>
              </div>
            </div>

            {/* Progress Steps (solo si no está cancelado) */}
            {!isCancelled && (
              <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  {statusSteps.map((step, idx) => {
                    const stepConf = statusConfig[step]
                    const StepIcon = stepConf.icon
                    const isActive = idx <= currentStepIndex
                    const isCurrent = idx === currentStepIndex
                    return (
                      <div key={step} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                              isCurrent
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110'
                                : isActive
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            <StepIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <span className={`text-[10px] sm:text-xs mt-1 font-medium ${isActive ? 'text-blue-700' : 'text-gray-400'}`}>
                            {stepConf.label}
                          </span>
                        </div>
                        {idx < statusSteps.length - 1 && (
                          <div className={`flex-1 h-0.5 mx-1 sm:mx-2 rounded ${idx < currentStepIndex ? 'bg-blue-600' : 'bg-gray-200'}`} />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Order Info */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>{new Date(order.created_at).toLocaleDateString('es-BO', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                {order.customer && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{order.customer.name}</span>
                  </div>
                )}
                {order.deliveryInfo?.address && order.deliveryInfo.address !== 'Por definir' && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="truncate">{order.deliveryInfo.address}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="capitalize">{order.paymentMethod || 'Por definir'}</span>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="px-4 sm:px-6 py-3 sm:py-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-blue-600" />
                Productos ({order.items.length})
              </h3>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.storeProduct?.product?.name || 'Producto'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} x {Number(item.price).toFixed(2)} {currency}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 ml-4">
                      {Number(item.subtotal || item.price * item.quantity).toFixed(2)} {currency}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-4 pt-3 border-t border-gray-200 space-y-1">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2)} {currency}</span>
                </div>
                {deliveryCost > 0 && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> Envío
                    </span>
                    <span>{deliveryCost.toFixed(2)} {currency}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>{Number(order.totalAmount).toFixed(2)} {currency}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            {order.store?.slug && (
              <div className="px-4 sm:px-6 py-4 border-t border-gray-100">
                <a
                  href={`https://compras.vendfy.shop/${order.store.slug}`}
                  className="btn-magic w-full flex items-center justify-center gap-2 text-sm font-semibold text-white py-3 rounded-xl cursor-pointer relative z-0 border-none transition-transform duration-200 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Hacer nuevo pedido
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
