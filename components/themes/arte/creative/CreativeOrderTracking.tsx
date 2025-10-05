'use client'

import { useState, useEffect } from 'react'
import { Store } from '@/lib/types'
import { Package, Truck, MapPin, CheckCircle, Phone, Sparkles, Star } from 'lucide-react'
import CreativeStoreHeader from './CreativeStoreHeader'

interface CreativeOrderTrackingProps {
  store: Store
  orderId?: string
}

const TIMELINE_STEPS = [
  {
    id: 1,
    title: 'CONTACTANDO CON EL PROVEEDOR',
    description: 'Verificando disponibilidad del producto',
    icon: Phone,
    emoji: '📞',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
  },
  {
    id: 2,
    title: 'PREPARANDO SU PEDIDO',
    description: 'Empaquetando su producto con cuidado',
    icon: Package,
    emoji: '📦',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
  },
  {
    id: 3,
    title: 'SU PEDIDO ESTÁ EN CAMINO',
    description: 'En ruta hacia su destino',
    icon: Truck,
    emoji: '🚚',
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
  },
  {
    id: 4,
    title: 'PEDIDO LLEGÓ AL DESTINO',
    description: 'Entregado en su dirección',
    icon: MapPin,
    emoji: '📍',
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-50 to-emerald-50',
  },
  {
    id: 5,
    title: '¡GRACIAS POR SU COMPRA!',
    description: 'Su satisfacción es nuestra prioridad',
    icon: CheckCircle,
    emoji: '🎉',
    gradient: 'from-yellow-500 to-orange-500',
    bgGradient: 'from-yellow-50 to-orange-50',
  },
]

export default function CreativeOrderTracking({ store, orderId = 'CR-2024-001' }: CreativeOrderTrackingProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleNextStep = () => {
    if (currentStep < TIMELINE_STEPS.length) {
      setCurrentStep(currentStep + 1)
      if (currentStep === TIMELINE_STEPS.length - 1) {
        setIsCompleted(true)
        setShowConfetti(true)
        // Generate sparkles for celebration
        const newSparkles = Array.from({ length: 20 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
        }))
        setSparkles(newSparkles)
        setTimeout(() => setShowConfetti(false), 3000)
      }
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setIsCompleted(false)
      setShowConfetti(false)
    }
  }

  const handleReset = () => {
    setCurrentStep(1)
    setIsCompleted(false)
    setShowConfetti(false)
    setSparkles([])
  }

  const currentGradient = TIMELINE_STEPS[currentStep - 1]?.gradient || 'from-purple-500 to-pink-500'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute animate-ping"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                animationDelay: `${sparkle.id * 100}ms`,
              }}
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10">
        <CreativeStoreHeader store={store} onCartClick={() => {}} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Creativo */}
          <div className="mb-12 text-center relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <Star className="w-96 h-96 text-purple-500 animate-spin" style={{ animationDuration: '20s' }} />
            </div>
            <h1 className={`text-6xl lg:text-7xl font-black bg-gradient-to-r ${currentGradient} bg-clip-text text-transparent mb-4 animate-in slide-in-from-top duration-700 relative`}>
              SEGUIMIENTO DE PEDIDO
            </h1>
            <p className="text-2xl font-bold text-gray-600 mb-2 animate-in slide-in-from-bottom duration-700">
              Order #{orderId}
            </p>
            <div className="flex items-center justify-center space-x-2 animate-bounce">
              <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${currentGradient}`} />
              <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${currentGradient} animate-pulse`} style={{ animationDelay: '150ms' }} />
              <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${currentGradient} animate-pulse`} style={{ animationDelay: '300ms' }} />
            </div>
          </div>

          {/* Rainbow Progress Bar */}
          <div className="mb-12 relative">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full overflow-hidden shadow-lg">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 via-orange-500 to-yellow-500 transition-all duration-700 ease-out relative"
                style={{ width: `${(currentStep / TIMELINE_STEPS.length) * 100}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm font-bold text-gray-600">0%</span>
              <span className={`text-lg font-black bg-gradient-to-r ${currentGradient} bg-clip-text text-transparent animate-pulse`}>
                {Math.round((currentStep / TIMELINE_STEPS.length) * 100)}%
              </span>
              <span className="text-sm font-bold text-gray-600">100%</span>
            </div>
          </div>

          {/* Order Information Card - Creative Style */}
          <div className="mb-12 rounded-3xl bg-gradient-to-br from-white to-purple-50 p-8 shadow-2xl border-4 border-purple-200 relative overflow-hidden transform hover:scale-105 transition-transform duration-500">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full blur-3xl opacity-20 animate-pulse" />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  DETALLES DEL PEDIDO
                </h2>
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold uppercase text-sm shadow-lg animate-bounce">
                  Creative
                </span>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-2xl border-2 border-blue-200 transform hover:rotate-3 transition-transform duration-300">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Fecha de Orden</p>
                  <p className="text-xl font-black text-blue-900">{new Date().toLocaleDateString()}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-2xl border-2 border-purple-200 transform hover:rotate-3 transition-transform duration-300">
                  <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">Método de Envío</p>
                  <p className="text-xl font-black text-purple-900">EXPRESS 🚀</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-2xl border-2 border-orange-200 transform hover:rotate-3 transition-transform duration-300">
                  <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">Tiempo Estimado</p>
                  <p className="text-xl font-black text-orange-900">3-5 DÍAS ⚡</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Creativo con Animaciones */}
          <div className="mb-12">
            <h2 className="text-4xl font-black text-center mb-12 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent animate-pulse">
              ESTADO DE SU PEDIDO
            </h2>

            <div className="space-y-8">
              {TIMELINE_STEPS.map((step, index) => {
                const Icon = step.icon
                const isActive = currentStep === step.id
                const isCompleted = currentStep > step.id
                const isPending = currentStep < step.id

                return (
                  <div
                    key={step.id}
                    className={`relative transition-all duration-700 ${
                      isActive ? 'scale-105' : 'scale-100'
                    }`}
                  >
                    <div className={`rounded-3xl bg-gradient-to-br ${step.bgGradient} p-8 border-4 ${
                      isActive
                        ? `border-transparent bg-gradient-to-r ${step.gradient} shadow-2xl`
                        : isCompleted
                        ? 'border-green-300 shadow-lg'
                        : 'border-gray-200 opacity-60'
                    } relative overflow-hidden transform transition-all duration-500 ${
                      isActive ? 'rotate-1' : 'rotate-0'
                    }`}>
                      {/* Background Animation */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
                      )}

                      <div className="flex items-start space-x-6 relative z-10">
                        {/* Icon with Emoji */}
                        <div className="relative flex-shrink-0">
                          <div
                            className={`w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-500 transform ${
                              isActive
                                ? `bg-gradient-to-br ${step.gradient} scale-110 rotate-12 shadow-2xl animate-bounce`
                                : isCompleted
                                ? `bg-gradient-to-br from-green-400 to-emerald-500 rotate-6`
                                : 'bg-gradient-to-br from-gray-200 to-gray-300'
                            }`}
                          >
                            <div className="text-4xl">{step.emoji}</div>
                          </div>
                          {isActive && (
                            <>
                              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.gradient} animate-ping opacity-30`} />
                              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-spin" />
                            </>
                          )}
                          {isCompleted && (
                            <CheckCircle className="absolute -top-2 -right-2 w-8 h-8 text-green-500 animate-bounce" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3
                                className={`text-2xl lg:text-3xl font-black mb-2 transition-all duration-500 ${
                                  isActive
                                    ? 'text-white'
                                    : isCompleted
                                    ? 'text-green-700'
                                    : 'text-gray-500'
                                }`}
                              >
                                {step.title}
                              </h3>
                              <p
                                className={`text-base lg:text-lg font-bold transition-colors duration-500 ${
                                  isActive
                                    ? 'text-white/90'
                                    : isCompleted
                                    ? 'text-green-600'
                                    : 'text-gray-400'
                                }`}
                              >
                                {step.description}
                              </p>
                            </div>
                            <div
                              className={`ml-4 px-4 py-2 rounded-full font-black uppercase text-xs tracking-wider transition-all duration-500 ${
                                isActive
                                  ? 'bg-white text-purple-600 animate-pulse shadow-lg'
                                  : isCompleted
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-300 text-gray-500'
                              }`}
                            >
                              {isCompleted ? '✓ HECHO' : isActive ? '⚡ ACTIVO' : '○ PENDIENTE'}
                            </div>
                          </div>

                          {/* Animated Progress for Active Step */}
                          {isActive && (
                            <div className="mt-6">
                              <div className="flex items-center space-x-3 mb-2">
                                <div className="flex space-x-1">
                                  {[0, 1, 2, 3, 4].map((i) => (
                                    <div
                                      key={i}
                                      className="w-2 h-8 bg-white rounded-full animate-pulse"
                                      style={{ animationDelay: `${i * 100}ms` }}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm font-bold text-white uppercase tracking-wider animate-pulse">
                                  Procesando...
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Connection Line */}
                    {index < TIMELINE_STEPS.length - 1 && (
                      <div className="flex justify-center py-4">
                        <div className={`w-1 h-8 rounded-full transition-all duration-500 ${
                          currentStep > step.id
                            ? `bg-gradient-to-b ${TIMELINE_STEPS[index + 1].gradient}`
                            : 'bg-gray-300'
                        }`} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Completion Celebration */}
          {isCompleted && (
            <div className="mb-12 rounded-3xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-12 text-center text-white shadow-2xl transform scale-105 animate-in fade-in slide-in-from-bottom duration-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
              <div className="relative z-10">
                <div className="text-8xl mb-4 animate-bounce">🎉</div>
                <CheckCircle className="w-24 h-24 mx-auto mb-4 animate-spin" style={{ animationDuration: '3s' }} />
                <h3 className="text-5xl font-black uppercase mb-4 animate-pulse">
                  ¡PEDIDO COMPLETADO!
                </h3>
                <p className="text-2xl font-bold">
                  Gracias por confiar en nosotros ✨
                </p>
                <div className="flex justify-center space-x-2 mt-6">
                  {['⭐', '🌟', '✨', '💫', '⚡'].map((emoji, i) => (
                    <span
                      key={i}
                      className="text-4xl animate-bounce"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Manual Controls - Creative Style */}
          <div className="rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 p-8 shadow-xl border-4 border-purple-200">
            <h3 className="text-2xl font-black mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full mr-3 text-sm animate-pulse">
                DEMO
              </span>
              CONTROLES MANUALES
            </h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black uppercase tracking-wider rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-110 hover:-rotate-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:rotate-0 shadow-lg"
              >
                ← ANTERIOR
              </button>
              <button
                onClick={handleNextStep}
                disabled={currentStep === TIMELINE_STEPS.length}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black uppercase tracking-wider rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-110 hover:rotate-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:rotate-0 shadow-lg"
              >
                SIGUIENTE →
              </button>
              <button
                onClick={handleReset}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black uppercase tracking-wider rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-110 hover:rotate-6 shadow-lg"
              >
                ↻ REINICIAR
              </button>
              <div className="flex items-center ml-auto space-x-3 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl font-mono text-sm shadow-lg">
                <span className="font-bold">PASO:</span>
                <span className={`text-xl font-black bg-gradient-to-r ${currentGradient} bg-clip-text text-transparent animate-pulse`}>
                  {currentStep}/{TIMELINE_STEPS.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
