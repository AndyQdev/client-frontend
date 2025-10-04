'use client'

import { useState } from 'react'
import { Store } from '@/lib/types'
import ClassicStoreHeader from './ClassicStoreHeader'
import { Package, Truck, MapPin, Crown, Phone } from 'lucide-react'

interface ClassicOrderTrackingProps {
  store: Store
  orderId: string
}

const steps = [
  {
    id: 1,
    title: 'Contactando con el proveedor',
    description: 'Confirmando su distinguido pedido con nuestro proveedor de confianza',
    icon: Phone
  },
  {
    id: 2,
    title: 'Preparando su pedido',
    description: 'Preparando su pedido con el cuidado y atención que merece',
    icon: Package
  },
  {
    id: 3,
    title: 'Su pedido está en camino',
    description: 'Su pedido ha iniciado su viaje hacia usted',
    icon: Truck
  },
  {
    id: 4,
    title: 'Pedido llegó al destino',
    description: 'Su pedido ha arribado a la ubicación de entrega',
    icon: MapPin
  },
  {
    id: 5,
    title: '¡Gracias por su compra!',
    description: 'Ha sido un honor servirle. Esperamos su próxima visita',
    icon: Crown
  }
]

export default function ClassicOrderTracking({ store, orderId }: ClassicOrderTrackingProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [showCartSheet, setShowCartSheet] = useState(false)

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-amber-50">
      <ClassicStoreHeader store={store} onCartClick={() => setShowCartSheet(true)} />

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Ornamental Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
            <div className="mx-4 w-4 h-4 border-2 border-amber-500 rotate-45"></div>
            <div className="w-48 h-px bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400"></div>
            <div className="mx-4 w-4 h-4 border-2 border-amber-500 rotate-45"></div>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>
          <h1 className="text-4xl font-serif text-amber-900 mb-2">
            Seguimiento de Pedido
          </h1>
          <p className="text-amber-700 font-serif italic">
            Orden No. {orderId}
          </p>
        </div>

        {/* Main Order Card */}
        <div className="bg-white rounded-lg shadow-xl border-4 border-amber-200 p-8 mb-8 relative overflow-hidden">
          {/* Corner Ornaments */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-amber-300 opacity-50"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-amber-300 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-amber-300 opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-amber-300 opacity-50"></div>

          {/* Status Badge */}
          {currentStep === steps.length && (
            <div className="absolute top-8 right-8 flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-full shadow-lg">
              <Crown className="w-5 h-5" />
              <span className="font-serif font-semibold">Completado</span>
            </div>
          )}

          {/* Progress Section */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-serif text-amber-800">Progreso del Pedido</span>
              <span className="text-lg font-serif font-bold text-amber-900">{Math.round(progress)}%</span>
            </div>
            <div className="relative w-full bg-amber-100 rounded-full h-4 overflow-hidden border-2 border-amber-200">
              <div
                className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 h-full rounded-full transition-all duration-700 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-amber-700/30 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              const isFuture = currentStep < step.id

              return (
                <div
                  key={step.id}
                  className={`relative flex items-start space-x-6 transition-all duration-500 ${
                    isActive ? 'opacity-100 scale-100' : isFuture ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
                  }`}
                >
                  {/* Vintage Connector */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-16 w-px h-16 flex flex-col justify-between">
                      {isCompleted ? (
                        <>
                          <div className="w-px h-full bg-gradient-to-b from-amber-600 to-amber-400"></div>
                          <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
                            <div className="w-2 h-2 bg-amber-500 rotate-45"></div>
                          </div>
                        </>
                      ) : (
                        <div className="w-px h-full bg-amber-200"></div>
                      )}
                    </div>
                  )}

                  {/* Icon Circle with Ornament */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isCompleted
                          ? 'bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-lg scale-110'
                          : isActive
                          ? 'bg-white border-4 border-amber-500 text-amber-700 shadow-md scale-110'
                          : 'bg-white border-4 border-amber-200 text-amber-400'
                      }`}
                    >
                      {isCompleted ? (
                        <Crown className="w-8 h-8" />
                      ) : (
                        <Icon className="w-8 h-8" />
                      )}
                    </div>
                    {/* Outer Ornamental Ring for Active */}
                    {isActive && (
                      <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-amber-300 animate-ping opacity-75"></div>
                    )}
                  </div>

                  {/* Content Card */}
                  <div
                    className={`flex-1 pt-2 ${
                      isActive ? 'bg-amber-50 border-2 border-amber-200 rounded-lg p-4 -ml-2' : ''
                    }`}
                  >
                    <h3
                      className={`text-xl font-serif font-semibold mb-2 transition-colors ${
                        isActive || isCompleted ? 'text-amber-900' : 'text-amber-400'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`font-serif italic transition-colors ${
                        isActive || isCompleted ? 'text-amber-700' : 'text-amber-400'
                      }`}
                    >
                      {step.description}
                    </p>
                    {isActive && (
                      <div className="mt-3 flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse delay-75"></div>
                          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-150"></div>
                        </div>
                        <span className="text-sm font-serif font-semibold text-amber-800">
                          En progreso
                        </span>
                      </div>
                    )}
                    {isCompleted && (
                      <div className="mt-3 flex items-center space-x-2 text-amber-700">
                        <Crown className="w-4 h-4" />
                        <span className="text-sm font-serif italic">Completado con éxito</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Manual Control Button */}
          {currentStep < steps.length && (
            <div className="mt-10 pt-8 border-t-2 border-amber-200">
              <button
                onClick={handleNextStep}
                className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white py-4 px-8 rounded-lg font-serif text-lg font-semibold hover:from-amber-700 hover:via-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Avanzar al Siguiente Paso
              </button>
            </div>
          )}

          {/* Completion Message */}
          {currentStep === steps.length && (
            <div className="mt-10 pt-8 border-t-2 border-amber-200 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mb-6 shadow-lg">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-amber-900 mb-3">
                ¡Su Pedido Ha Sido Completado!
              </h3>
              <p className="text-amber-700 font-serif italic text-lg mb-4">
                Ha sido un honor servirle
              </p>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
                <div className="w-2 h-2 bg-amber-500 rotate-45"></div>
                <div className="w-24 h-px bg-amber-400"></div>
                <div className="w-2 h-2 bg-amber-500 rotate-45"></div>
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
              </div>
              <p className="text-amber-600 font-serif mt-4">
                Esperamos tener el placer de servirle nuevamente pronto
              </p>
            </div>
          )}
        </div>

        {/* Contact Information Card */}
        <div className="bg-white rounded-lg shadow-lg border-2 border-amber-200 p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>

          <h3 className="text-xl font-serif font-semibold text-amber-900 mb-6 text-center">
            Información de Contacto
          </h3>

          <div className="space-y-4">
            {store.contact.phone && (
              <div className="flex items-center justify-center space-x-3 text-amber-800 bg-amber-50 rounded-lg py-3 px-4 border border-amber-100">
                <Phone className="w-5 h-5 text-amber-600" />
                <span className="font-serif">{store.contact.phone}</span>
              </div>
            )}
            {store.contact.email && (
              <div className="flex items-center justify-center space-x-3 text-amber-800 bg-amber-50 rounded-lg py-3 px-4 border border-amber-100">
                <span className="w-5 h-5 flex items-center justify-center text-amber-600 font-serif font-bold">@</span>
                <span className="font-serif">{store.contact.email}</span>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-center space-x-2">
            <div className="w-16 h-px bg-amber-300"></div>
            <Crown className="w-4 h-4 text-amber-500" />
            <div className="w-16 h-px bg-amber-300"></div>
          </div>
        </div>

        {/* Heritage Footer */}
        <div className="mt-8 text-center">
          <p className="text-amber-700 font-serif italic text-sm">
            "Servicio de calidad y tradición desde siempre"
          </p>
        </div>
      </div>
    </div>
  )
}
