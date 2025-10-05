'use client'

import { useState, useEffect } from 'react'
import { Phone, Package, Truck, MapPin, Heart, Check } from 'lucide-react'
import EleganteStoreHeader from './EleganteStoreHeader'
import { Store } from '@/lib/types'

interface EleganteOrderTrackingProps {
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
    decorativeChar: '◆'
  },
  {
    id: 1,
    title: 'Preparando su pedido',
    description: 'El proveedor está preparando cuidadosamente tu pedido',
    icon: Package,
    decorativeChar: '◆'
  },
  {
    id: 2,
    title: 'Su pedido está en camino',
    description: 'Tu pedido está en ruta hacia el destino',
    icon: Truck,
    decorativeChar: '◆'
  },
  {
    id: 3,
    title: 'Pedido llegó al destino',
    description: 'Tu pedido ha llegado a la dirección de entrega',
    icon: MapPin,
    decorativeChar: '◆'
  },
  {
    id: 4,
    title: '¡Gracias por su compra!',
    description: 'Esperamos que disfrutes tu pedido. Vuelve pronto.',
    icon: Heart,
    decorativeChar: '◆'
  }
]

export default function EleganteOrderTracking({ store, orderId, onCartClick }: EleganteOrderTrackingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [animatingStep, setAnimatingStep] = useState<number | null>(null)

  const progress = ((currentStep + 1) / STEPS.length) * 100

  useEffect(() => {
    setAnimatingStep(currentStep)
    const timer = setTimeout(() => setAnimatingStep(null), 800)
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
    <div className="min-h-screen bg-white">
      <EleganteStoreHeader store={store} onCartClick={onCartClick} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Decorative Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-black" />
            <span className="text-2xl">◆</span>
            <div className="h-px w-12 bg-black" />
          </div>
          <h1 className="text-4xl font-light tracking-wider text-gray-900 mb-2" style={{ fontFamily: 'serif' }}>
            Seguimiento de Pedido
          </h1>
          <p className="text-sm text-gray-500 tracking-widest uppercase">
            Orden #{orderId}
          </p>
        </div>

        {/* Elegant Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 tracking-widest uppercase">Progreso</span>
            <span className="text-xs font-light tracking-wider" style={{ fontFamily: 'serif' }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-px bg-gray-200 relative overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Order Details Card */}
        <div className="border border-black mb-12 p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8 pb-8 border-b border-gray-200">
            <div>
              <div className="text-xs text-gray-500 tracking-widest uppercase mb-2">
                Tiempo Estimado
              </div>
              <div className="text-3xl font-light tracking-wider" style={{ fontFamily: 'serif' }}>
                {getEstimatedTime()}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 tracking-widest uppercase mb-2">
                Tienda
              </div>
              <div className="text-xl font-light tracking-wider" style={{ fontFamily: 'serif' }}>
                {store.name}
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-black text-white p-6">
            <div className="flex items-start gap-4">
              {(() => {
                const CurrentIcon = STEPS[currentStep].icon
                return (
                  <div className={`w-12 h-12 border border-white flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                    animatingStep === currentStep ? 'scale-110' : ''
                  }`}>
                    <CurrentIcon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                )
              })()}
              <div className="flex-1">
                <h3 className="text-lg font-light tracking-wider mb-2" style={{ fontFamily: 'serif' }}>
                  {STEPS[currentStep].title}
                </h3>
                <p className="text-sm text-gray-300 font-light">
                  {STEPS[currentStep].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Timeline */}
        <div className="border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gray-200" />
            <h2 className="text-lg font-light tracking-widest uppercase text-gray-900">
              Estado del Pedido
            </h2>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="relative">
            {/* Elegant Connecting Line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200" />

            {STEPS.map((step, index) => {
              const StepIcon = step.icon
              const isCompleted = index < currentStep
              const isCurrent = index === currentStep
              const isFuture = index > currentStep
              const isAnimating = animatingStep === index

              return (
                <div
                  key={step.id}
                  className={`relative flex gap-8 mb-12 last:mb-0 transition-all duration-700 ${
                    isFuture ? 'opacity-30' : 'opacity-100'
                  }`}
                  style={{
                    transform: isAnimating ? 'translateX(8px)' : 'translateX(0)',
                  }}
                >
                  {/* Decorative Icon Container */}
                  <div className="relative z-10 flex-shrink-0">
                    {isCompleted ? (
                      <div className="w-12 h-12 border-2 border-black bg-black flex items-center justify-center transition-all duration-500">
                        <Check className="w-6 h-6 text-white" strokeWidth={1.5} />
                      </div>
                    ) : (
                      <div
                        className={`w-12 h-12 border-2 flex items-center justify-center transition-all duration-500 ${
                          isCurrent
                            ? 'border-black bg-white'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        <StepIcon
                          className={`w-6 h-6 ${isCurrent ? 'text-black' : 'text-gray-300'}`}
                          strokeWidth={1.5}
                        />
                      </div>
                    )}

                    {/* Decorative Element */}
                    <div className={`absolute -right-4 top-1/2 -translate-y-1/2 text-xs transition-all duration-500 ${
                      isCurrent ? 'text-black scale-125' : isCompleted ? 'text-black' : 'text-gray-300'
                    }`}>
                      {step.decorativeChar}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 pb-12 transition-all duration-700 ${
                      isAnimating ? 'animate-elegant-slide' : ''
                    }`}
                  >
                    <div
                      className={`p-6 border transition-all duration-500 ${
                        isCurrent
                          ? 'border-black bg-gray-50'
                          : isCompleted
                          ? 'border-gray-300 bg-white'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <h3 className={`text-xl font-light tracking-wider mb-3 transition-colors duration-500 ${
                        isCurrent ? 'text-black' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                      }`} style={{ fontFamily: 'serif' }}>
                        {step.title}
                      </h3>
                      <p className={`text-sm font-light leading-relaxed transition-colors duration-500 ${
                        isCurrent ? 'text-gray-700' : isCompleted ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </p>
                      {isCurrent && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-3">
                            <div className="flex gap-1">
                              {[...Array(3)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-1 h-1 bg-black"
                                  style={{
                                    animation: `elegant-pulse 1.5s ease-in-out ${i * 0.3}s infinite`
                                  }}
                                />
                              ))}
                            </div>
                            <span className="text-xs tracking-widest uppercase text-gray-600">
                              En progreso
                            </span>
                          </div>
                        </div>
                      )}
                      {isCompleted && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <span className="text-xs tracking-widest uppercase text-gray-500">
                            ✓ Completado
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Completion Message */}
        {currentStep === 4 && (
          <div className="mt-12 text-center animate-elegant-fade-in">
            <div className="inline-block border border-black p-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-8 bg-black" />
                <Heart className="w-6 h-6" strokeWidth={1.5} />
                <div className="h-px w-8 bg-black" />
              </div>
              <p className="text-2xl font-light tracking-wider mb-2" style={{ fontFamily: 'serif' }}>
                Gracias por confiar en nosotros
              </p>
              <p className="text-sm text-gray-600 tracking-wide">
                Esperamos verte de nuevo pronto
              </p>
            </div>
          </div>
        )}

        {/* Test Button - Elegant Style */}
        {currentStep < 4 && (
          <button
            onClick={handleNextStep}
            className="fixed bottom-8 right-8 bg-black text-white px-8 py-4 border border-black hover:bg-white hover:text-black transition-all duration-300 group"
          >
            <span className="text-xs tracking-widest uppercase font-light flex items-center gap-3">
              Siguiente Paso
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes elegant-slide {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes elegant-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        @keyframes elegant-fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-elegant-slide {
          animation: elegant-slide 0.8s ease-out;
        }
        .animate-elegant-fade-in {
          animation: elegant-fade-in 1s ease-out;
        }
      `}</style>
    </div>
  )
}
