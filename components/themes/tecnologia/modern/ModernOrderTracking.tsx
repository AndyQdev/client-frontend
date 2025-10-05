'use client'

import { useState, useEffect } from 'react'
import { Phone, Package, Truck, MapPin, Heart, Check, ChevronRight } from 'lucide-react'
import ModernStoreHeader from './ModernStoreHeader'
import { Store } from '@/lib/types'

interface ModernOrderTrackingProps {
  store: Store
  orderId: string
  onCartClick: () => void
}

const STEPS = [
  {
    id: 0,
    title: 'Contactando con el proveedor',
    description: 'Estamos confirmando tu pedido con el proveedor',
    icon: Phone,
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-blue-100',
    color: 'text-blue-600'
  },
  {
    id: 1,
    title: 'Preparando su pedido',
    description: 'El proveedor está preparando cuidadosamente tu pedido',
    icon: Package,
    gradient: 'from-purple-500 to-purple-600',
    bgGradient: 'from-purple-50 to-purple-100',
    color: 'text-purple-600'
  },
  {
    id: 2,
    title: 'Su pedido está en camino',
    description: 'Tu pedido está en ruta hacia el destino',
    icon: Truck,
    gradient: 'from-indigo-500 to-indigo-600',
    bgGradient: 'from-indigo-50 to-indigo-100',
    color: 'text-indigo-600'
  },
  {
    id: 3,
    title: 'Pedido llegó al destino',
    description: 'Tu pedido ha llegado a la dirección de entrega',
    icon: MapPin,
    gradient: 'from-green-500 to-green-600',
    bgGradient: 'from-green-50 to-green-100',
    color: 'text-green-600'
  },
  {
    id: 4,
    title: '¡Gracias por su compra!',
    description: 'Esperamos que disfrutes tu pedido. ¡Vuelve pronto!',
    icon: Heart,
    gradient: 'from-pink-500 to-pink-600',
    bgGradient: 'from-pink-50 to-pink-100',
    color: 'text-pink-600'
  }
]

export default function ModernOrderTracking({ store, orderId, onCartClick }: ModernOrderTrackingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [animatingStep, setAnimatingStep] = useState<number | null>(null)

  const progress = ((currentStep + 1) / STEPS.length) * 100

  useEffect(() => {
    if (currentStep === 4) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [currentStep])

  useEffect(() => {
    setAnimatingStep(currentStep)
    const timer = setTimeout(() => setAnimatingStep(null), 600)
    return () => clearTimeout(timer)
  }, [currentStep])

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4))
  }

  const getEstimatedTime = () => {
    switch (currentStep) {
      case 0: return '5-10 minutos'
      case 1: return '15-20 minutos'
      case 2: return '20-30 minutos'
      case 3: return 'Ya llegó'
      case 4: return 'Completado'
      default: return '30-40 minutos'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <ModernStoreHeader store={store} onCartClick={onCartClick} />

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-20px',
                backgroundColor: ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-right">
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {Math.round(progress)}% Completado
            </span>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                Seguimiento de Pedido
              </h1>
              <p className="text-gray-500 text-lg">
                Pedido <span className="font-semibold text-gray-700">#{orderId}</span>
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end">
              <div className="text-sm text-gray-500 mb-1">Tiempo estimado</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {getEstimatedTime()}
              </div>
            </div>
          </div>

          {/* Store Info */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              {store.name.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{store.name}</div>
              <div className="text-sm text-gray-500">{store.description}</div>
            </div>
          </div>

          {/* Current Status */}
          <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-100">
            <div className="flex items-start gap-4">
              {(() => {
                const CurrentIcon = STEPS[currentStep].icon
                return (
                  <div className={`w-12 h-12 bg-gradient-to-br ${STEPS[currentStep].gradient} rounded-xl flex items-center justify-center flex-shrink-0 ${animatingStep === currentStep ? 'animate-bounce' : ''}`}>
                    <CurrentIcon className="w-6 h-6 text-white" />
                  </div>
                )
              })()}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {STEPS[currentStep].title}
                </h3>
                <p className="text-sm text-gray-600">
                  {STEPS[currentStep].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Estado del Pedido</h2>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

            {STEPS.map((step, index) => {
              const StepIcon = step.icon
              const isCompleted = index < currentStep
              const isCurrent = index === currentStep
              const isFuture = index > currentStep
              const isAnimating = animatingStep === index

              return (
                <div
                  key={step.id}
                  className={`relative flex gap-6 mb-8 last:mb-0 transition-all duration-500 ${
                    isAnimating ? 'scale-105' : ''
                  } ${
                    isCurrent ? 'opacity-100' : isFuture ? 'opacity-40' : 'opacity-100'
                  }`}
                  style={{
                    transform: isAnimating ? 'translateY(-4px)' : 'translateY(0)',
                  }}
                >
                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    {isCompleted ? (
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-6 h-6 text-white" strokeWidth={3} />
                      </div>
                    ) : (
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${
                          isCurrent
                            ? `bg-gradient-to-br ${step.gradient} animate-pulse`
                            : 'bg-gray-200'
                        }`}
                      >
                        <StepIcon
                          className={`w-6 h-6 ${isCurrent ? 'text-white' : 'text-gray-400'}`}
                          strokeWidth={isCurrent ? 2.5 : 2}
                        />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 pb-8 transition-all duration-500 ${
                      isAnimating ? 'animate-slide-up' : ''
                    }`}
                  >
                    <div
                      className={`p-6 rounded-2xl border-2 transition-all duration-500 ${
                        isCurrent
                          ? `bg-gradient-to-r ${step.bgGradient} border-current shadow-lg`
                          : isCompleted
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <h3 className={`text-lg font-bold mb-2 ${
                        isCurrent ? step.color : isCompleted ? 'text-green-700' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm ${
                        isCurrent ? 'text-gray-700' : isCompleted ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </p>
                      {isCurrent && (
                        <div className="mt-4 flex items-center gap-2">
                          <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.gradient}`}
                                style={{
                                  animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`
                                }}
                              />
                            ))}
                          </div>
                          <span className={`text-xs font-semibold ${step.color}`}>
                            En progreso...
                          </span>
                        </div>
                      )}
                      {isCompleted && (
                        <div className="mt-4 text-xs font-semibold text-green-600">
                          Completado
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Test Button */}
        {currentStep < 4 && (
          <button
            onClick={handleNextStep}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold group"
          >
            <span>Siguiente Paso</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fall {
          animation: fall 3s linear forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
