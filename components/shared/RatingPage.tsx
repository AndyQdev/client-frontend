'use client'

import { useState, useEffect } from 'react'
import {
  Star,
  XCircle,
  CheckCircle,
  Send,
  Clock,
  User,
  ShoppingBag,
  Store,
  ArrowRight,
} from 'lucide-react'
import { apiClient } from '@/lib/api/client'
import { toast } from 'sonner'
import AnimatedBackground from './AnimatedBackground'

interface RatingPageProps {
  orderId: string
}

interface OrderData {
  id: string
  totalAmount: number
  status: string
  calification?: { rating: number; comment?: string } | null
  customer?: { name: string }
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
    storeProduct?: {
      product?: { name: string }
    }
  }>
  created_at: string
}

export function RatingPage({ orderId }: RatingPageProps) {
  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [alreadyRated, setAlreadyRated] = useState(false)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true)
        const response = await apiClient.get(`/order/public/${orderId}`)
        const data = response.data.data
        setOrder(data)
        if (data.calification != null) {
          setAlreadyRated(true)
        }
      } catch (err) {
        console.error('Error fetching order:', err)
        setError('Pedido no encontrado')
      } finally {
        setLoading(false)
      }
    }
    if (orderId) fetchOrder()
  }, [orderId])

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Por favor selecciona una calificación')
      return
    }

    try {
      setSubmitting(true)

      await apiClient.patch(`/order/public/${orderId}/rate`, {
        calification: {
          rating,
          comment: comment.trim() || null,
        },
      })

      setSubmitted(true)
      toast.success('Gracias por tu calificación')
    } catch (err) {
      console.error('Error submitting rating:', err)
      toast.error('Error al enviar tu calificación')
    } finally {
      setSubmitting(false)
    }
  }

  const getRatingLabel = (value: number) => {
    const labels: Record<number, string> = {
      1: 'Muy malo',
      2: 'Malo',
      3: 'Regular',
      4: 'Bueno',
      5: 'Excelente',
    }
    return labels[value] || ''
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
          <p className="text-white/80">Cargando...</p>
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
          <p className="text-white/70">{error || 'El pedido que buscas no existe.'}</p>
        </div>
      </div>
    )
  }

  // Ya calificado o recién enviado
  if (alreadyRated || submitted) {
    return (
      <div className="min-h-screen py-8 relative">
        <AnimatedBackground />
        <div className="relative z-10">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white/90 rounded-2xl shadow-xl border border-gray-200 overflow-hidden backdrop-blur-sm">
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  Gracias por tu calificación
                </h1>
                <p className="text-gray-600 mb-6">
                  {submitted
                    ? 'Tu opinión nos ayuda a mejorar nuestro servicio.'
                    : 'Este pedido ya fue calificado. Agradecemos tu opinión.'}
                </p>
                {order.store?.slug && (
                  <a
                    href={`https://compras.vendfy.shop/${order.store.slug}`}
                    className="btn-magic inline-flex items-center justify-center gap-2 text-sm font-semibold text-white px-6 py-3 rounded-xl cursor-pointer relative z-0 border-none transition-transform duration-200 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Hacer nuevo pedido
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currency = order.store?.config?.currency || 'Bs'

  return (
    <div className="min-h-screen py-6 sm:py-8 relative">
      <AnimatedBackground />

      <div className="relative z-10">
        {/* Title - Hidden on mobile */}
        <div className="max-w-2xl mx-auto px-4 mb-4 md:mb-6 hidden md:block">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent mb-2">
              Califica tu experiencia
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full opacity-80" />
          </div>
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white/90 rounded-2xl shadow-xl border border-gray-200 overflow-hidden backdrop-blur-sm">
            {/* Store Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-300">
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
            </div>

            {/* Order Summary */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
              <div className="space-y-2 md:hidden">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>{new Date(order.created_at).toLocaleDateString('es-BO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                {order.customer && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{order.customer.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShoppingBag className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>{order.items.length} producto{order.items.length !== 1 ? 's' : ''} - {Number(order.totalAmount).toFixed(2)} {currency}</span>
                </div>
              </div>
              <div className="hidden md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-1.5">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>{new Date(order.created_at).toLocaleDateString('es-BO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                {order.customer && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{order.customer.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShoppingBag className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>{order.items.length} producto{order.items.length !== 1 ? 's' : ''} - {Number(order.totalAmount).toFixed(2)} {currency}</span>
                </div>
              </div>
            </div>

            {/* Rating Section */}
            <div className="p-4 sm:p-6 md:py-4">
              {/* Mobile Title */}
              <h2 className="text-lg font-bold text-gray-900 mb-1 md:hidden text-center">
                Califica tu experiencia
              </h2>
              <p className="text-sm text-gray-500 mb-4 text-center">
                Tu opinión nos ayuda a mejorar
              </p>

              {/* Stars */}
              <div className="flex justify-center gap-2 sm:gap-3 mb-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoveredRating(value)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-all duration-200 hover:scale-125 active:scale-95"
                  >
                    <Star
                      className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-200 ${
                        value <= (hoveredRating || rating)
                          ? 'text-yellow-400 fill-yellow-400 drop-shadow-md'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Rating label */}
              <div className="text-center mb-4 h-5">
                {(hoveredRating || rating) > 0 && (
                  <span className="text-sm font-medium text-blue-600 animate-fade-in">
                    {getRatingLabel(hoveredRating || rating)}
                  </span>
                )}
              </div>

              {/* Comment */}
              <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Comentarios (opcional)
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Cuéntanos sobre tu experiencia..."
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                />
                <p className="text-xs text-gray-400 text-right mt-1">{comment.length}/500</p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={rating === 0 || submitting}
                className="btn-magic w-full flex items-center justify-center gap-2 text-sm font-semibold text-white py-3 rounded-xl cursor-pointer relative z-0 border-none transition-transform duration-200 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar calificación
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
