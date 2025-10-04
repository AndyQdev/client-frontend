'use client'

import { useState } from 'react'
import { Store } from '@/lib/types'
import MinimalStoreHeader from './MinimalStoreHeader'
import { Package, Truck, MapPin, CheckCircle2, Phone } from 'lucide-react'

interface MinimalOrderTrackingProps {
  store: Store
  orderId: string
}

const steps = [
  {
    id: 1,
    title: 'Contactando con el proveedor',
    description: 'Estamos confirmando su pedido con el proveedor',
    icon: Phone
  },
  {
    id: 2,
    title: 'Preparando su pedido',
    description: 'Su pedido está siendo preparado cuidadosamente',
    icon: Package
  },
  {
    id: 3,
    title: 'Su pedido está en camino',
    description: 'El pedido ha sido enviado y está en tránsito',
    icon: Truck
  },
  {
    id: 4,
    title: 'Pedido llegó al destino',
    description: 'Su pedido ha llegado a la ubicación de entrega',
    icon: MapPin
  },
  {
    id: 5,
    title: '¡Gracias por su compra!',
    description: 'Esperamos que disfrute su pedido',
    icon: CheckCircle2
  }
]

export default function MinimalOrderTracking({ store, orderId }: MinimalOrderTrackingProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [showCartSheet, setShowCartSheet] = useState(false)

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <MinimalStoreHeader store={store} onCartClick={() => setShowCartSheet(true)} />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Order Info Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-medium text-gray-900 mb-2">
                Seguimiento de Pedido
              </h1>
              <p className="text-gray-500">
                Pedido #{orderId}
              </p>
            </div>
            {currentStep === steps.length && (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-medium">Completado</span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progreso</span>
              <span className="text-sm font-medium text-gray-900">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gray-900 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              const isFuture = currentStep < step.id

              return (
                <div
                  key={step.id}
                  className={`relative flex items-start space-x-4 transition-all duration-300 ${
                    isActive ? 'opacity-100' : isFuture ? 'opacity-40' : 'opacity-100'
                  }`}
                >
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute left-6 top-12 w-0.5 h-12 transition-all duration-500 ${
                        isCompleted ? 'bg-gray-900' : 'bg-gray-200'
                      }`}
                    />
                  )}

                  {/* Icon Circle */}
                  <div
                    className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? 'bg-gray-900 text-white'
                        : isActive
                        ? 'bg-white border-2 border-gray-900 text-gray-900'
                        : 'bg-white border-2 border-gray-200 text-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3
                      className={`font-medium mb-1 transition-colors ${
                        isActive || isCompleted ? 'text-gray-900' : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm transition-colors ${
                        isActive || isCompleted ? 'text-gray-600' : 'text-gray-400'
                      }`}
                    >
                      {step.description}
                    </p>
                    {isActive && (
                      <div className="mt-2 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-900 rounded-full animate-pulse" />
                        <span className="text-xs font-medium text-gray-900">En progreso</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Manual Control Button */}
          {currentStep < steps.length && (
            <div className="mt-8 pt-8 border-t border-gray-100">
              <button
                onClick={handleNextStep}
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
              >
                Avanzar al siguiente paso
              </button>
            </div>
          )}

          {/* Completion Message */}
          {currentStep === steps.length && (
            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                ¡Pedido Completado!
              </h3>
              <p className="text-gray-600">
                Gracias por su compra. Esperamos volver a verle pronto.
              </p>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="font-medium text-gray-900 mb-4">Información de Contacto</h3>
          <div className="space-y-3 text-sm">
            {store.contact.phone && (
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{store.contact.phone}</span>
              </div>
            )}
            {store.contact.email && (
              <div className="flex items-center space-x-3 text-gray-600">
                <span className="w-4 h-4 flex items-center justify-center">@</span>
                <span>{store.contact.email}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
