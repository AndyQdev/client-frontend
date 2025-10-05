'use client'

import { useState } from 'react'
import { Store } from '@/lib/types'
import { Package, Truck, MapPin, CheckCircle, Phone } from 'lucide-react'
import DarkModeStoreHeader from './DarkModeStoreHeader'

interface DarkModeOrderTrackingProps {
  store: Store
  orderId?: string
  onCartClick: () => void
}

const TIMELINE_STEPS = [
  {
    id: 1,
    title: 'CONTACTANDO CON EL PROVEEDOR',
    description: 'Verificando disponibilidad del producto',
    icon: Phone,
  },
  {
    id: 2,
    title: 'PREPARANDO SU PEDIDO',
    description: 'Empaquetando su producto con cuidado',
    icon: Package,
  },
  {
    id: 3,
    title: 'SU PEDIDO ESTÁ EN CAMINO',
    description: 'En ruta hacia su destino',
    icon: Truck,
  },
  {
    id: 4,
    title: 'PEDIDO LLEGÓ AL DESTINO',
    description: 'Entregado en su dirección',
    icon: MapPin,
  },
  {
    id: 5,
    title: '¡GRACIAS POR SU COMPRA!',
    description: 'Su satisfacción es nuestra prioridad',
    icon: CheckCircle,
  },
]

export default function DarkModeOrderTracking({ store, orderId = 'DM-2024-001' }: DarkModeOrderTrackingProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isCompleted, setIsCompleted] = useState(false)

  const handleNextStep = () => {
    if (currentStep < TIMELINE_STEPS.length) {
      setCurrentStep(currentStep + 1)
      if (currentStep === TIMELINE_STEPS.length - 1) {
        setIsCompleted(true)
      }
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setIsCompleted(false)
    }
  }

  const handleReset = () => {
    setCurrentStep(1)
    setIsCompleted(false)
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <DarkModeStoreHeader store={store} />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-zinc-100 mb-2">
                SEGUIMIENTO DE PEDIDO
              </h1>
              <p className="text-lg text-zinc-500">
                Pedido #{orderId}
              </p>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-sm text-zinc-500 uppercase tracking-wide">Estado del Pedido</p>
              <p className="text-3xl font-bold text-yellow-500">
                {isCompleted ? 'COMPLETADO' : `${currentStep}/5`}
              </p>
            </div>
          </div>
        </div>

        {/* Order Information Card */}
        <div className="mb-12 bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700 p-6">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-700">
            <h2 className="text-xl font-bold text-zinc-100 uppercase tracking-tight">Detalles del Pedido</h2>
            <span className="bg-yellow-500 text-black px-4 py-1.5 rounded-lg font-bold uppercase text-sm">
              Dark Mode
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Fecha de Orden</p>
              <p className="text-lg font-semibold text-zinc-300">{new Date().toLocaleDateString('es-ES')}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Método de Envío</p>
              <p className="text-lg font-semibold text-zinc-300">EXPRESS DELIVERY</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Tiempo Estimado</p>
              <p className="text-lg font-semibold text-zinc-300">3-5 DÍAS HÁBILES</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-100 uppercase tracking-tight mb-8 flex items-center gap-3">
            <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
            Estado de su Pedido
          </h2>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-zinc-700">
              <div
                className="bg-yellow-500 transition-all duration-700 ease-in-out w-full"
                style={{ height: `${((currentStep - 1) / (TIMELINE_STEPS.length - 1)) * 100}%` }}
              />
            </div>

            {/* Timeline Steps */}
            <div className="space-y-8">
              {TIMELINE_STEPS.map((step, index) => {
                const Icon = step.icon
                const isActive = currentStep === step.id
                const isCompleted = currentStep > step.id
                const isPending = currentStep < step.id

                return (
                  <div
                    key={step.id}
                    className={`relative flex items-start transition-all duration-500 ${
                      isActive ? 'scale-105' : 'scale-100'
                    }`}
                  >
                    {/* Icon Container */}
                    <div className="relative z-10">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                          isActive
                            ? 'bg-yellow-500 scale-110 shadow-lg shadow-yellow-500/50'
                            : isCompleted
                            ? 'bg-yellow-500/20 border-2 border-yellow-500'
                            : 'bg-zinc-800 border-2 border-zinc-700'
                        }`}
                      >
                        <Icon
                          className={`w-8 h-8 transition-all duration-500 ${
                            isActive
                              ? 'text-black'
                              : isCompleted
                              ? 'text-yellow-500'
                              : 'text-zinc-600'
                          } ${isActive ? 'animate-pulse' : ''}`}
                        />
                      </div>
                      {isActive && (
                        <div className="absolute inset-0 rounded-full border-2 border-yellow-500 animate-ping opacity-20" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="ml-8 flex-1">
                      <div
                        className={`rounded-lg p-6 transition-all duration-500 ${
                          isActive
                            ? 'bg-yellow-500/10 border border-yellow-500/30'
                            : isCompleted
                            ? 'bg-zinc-800/30 border border-zinc-700/50'
                            : 'bg-zinc-800/20 border border-zinc-700/30'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3
                              className={`text-xl font-bold uppercase tracking-tight mb-2 transition-colors duration-500 ${
                                isActive
                                  ? 'text-yellow-500'
                                  : isCompleted
                                  ? 'text-zinc-300'
                                  : 'text-zinc-600'
                              }`}
                            >
                              {step.title}
                            </h3>
                            <p
                              className={`text-sm font-semibold transition-colors duration-500 ${
                                isActive
                                  ? 'text-zinc-300'
                                  : isCompleted
                                  ? 'text-zinc-500'
                                  : 'text-zinc-600'
                              }`}
                            >
                              {step.description}
                            </p>
                          </div>
                          <div
                            className={`ml-4 px-4 py-1.5 rounded-lg font-bold uppercase text-xs tracking-wider transition-all duration-500 ${
                              isActive
                                ? 'bg-yellow-500 text-black'
                                : isCompleted
                                ? 'bg-zinc-700 text-zinc-400'
                                : 'bg-zinc-800 text-zinc-600'
                            }`}
                          >
                            {isCompleted ? 'COMPLETADO' : isActive ? 'EN PROGRESO' : 'PENDIENTE'}
                          </div>
                        </div>

                        {/* Animated indicator for active step */}
                        {isActive && (
                          <div className="mt-4 flex items-center gap-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                            <span className="text-xs font-bold text-yellow-500 uppercase tracking-wide">
                              Procesando...
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
        </div>

        {/* Completion Banner */}
        {isCompleted && (
          <div className="mb-12 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-lg p-8 text-center animate-in fade-in slide-in-from-bottom duration-700">
            <CheckCircle className="w-20 h-20 text-yellow-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-3xl font-bold text-yellow-500 uppercase tracking-tight mb-2">
              ¡Pedido Completado!
            </h3>
            <p className="text-lg font-semibold text-zinc-400">
              Gracias por confiar en nosotros
            </p>
          </div>
        )}

        {/* Manual Controls */}
        <div className="border-t border-zinc-800 pt-8">
          <div className="bg-zinc-800/30 border border-zinc-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-zinc-300 uppercase tracking-tight mb-4 flex items-center gap-2">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-lg text-sm">DEMO</span>
              Controles Manuales
            </h3>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 rounded-lg font-bold uppercase tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-700"
              >
                ← Atrás
              </button>
              <button
                onClick={handleNextStep}
                disabled={currentStep === TIMELINE_STEPS.length}
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-bold uppercase tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-500"
              >
                Avanzar →
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-zinc-400 hover:text-zinc-300 rounded-lg font-bold uppercase tracking-wide transition-all"
              >
                ↻ Reiniciar
              </button>
              <div className="flex items-center ml-auto gap-2 px-4 py-2 bg-zinc-800 rounded-lg text-sm">
                <span className="font-semibold text-zinc-500">PASO:</span>
                <span className="text-yellow-500 font-bold">{currentStep}/{TIMELINE_STEPS.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
