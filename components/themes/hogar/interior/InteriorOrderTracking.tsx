'use client'

import { Store } from '@/lib/types'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import InteriorStoreHeader from './InteriorStoreHeader'
import { Package, Truck, CheckCircle, MapPin } from 'lucide-react'

interface InteriorOrderTrackingProps {
  store: Store
  orderId?: string
}

export default function InteriorOrderTracking({ store, orderId }: InteriorOrderTrackingProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const router = useRouter()

  const steps = [
    {
      id: 1,
      title: 'Pedido Confirmado',
      description: 'Tu pedido ha sido recibido y confirmado',
      icon: CheckCircle,
      date: new Date().toLocaleDateString()
    },
    {
      id: 2,
      title: 'En Preparación',
      description: 'Estamos preparando tu pedido con cuidado',
      icon: Package,
      date: ''
    },
    {
      id: 3,
      title: 'En Camino',
      description: 'Tu pedido está siendo enviado',
      icon: Truck,
      date: ''
    },
    {
      id: 4,
      title: 'Entregado',
      description: '¡Tu pedido ha sido entregado!',
      icon: MapPin,
      date: ''
    }
  ]

  const handleAdvance = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <InteriorStoreHeader
        store={store}
        onCartClick={() => router.push(`/${store.slug}`)}
        cartItemsCount={0}
      />
      <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="font-serif text-4xl text-stone-900 mb-4">
            Seguimiento de Pedido
          </h1>
          {orderId && (
            <p className="text-stone-600">
              Pedido <span className="font-medium text-stone-900">#{orderId}</span>
            </p>
          )}
        </div>

        {/* Timeline */}
        <div className="bg-white border border-stone-200 p-8 md:p-12 mb-8 animate-fade-in">
          <div className="relative">
            {/* Progress line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-stone-200"></div>
            <div
              className="absolute left-8 top-0 w-0.5 bg-stone-800 transition-all duration-500 ease-out"
              style={{ height: `${((currentStep - 1) / 3) * 100}%` }}
            ></div>

            {/* Steps */}
            <div className="space-y-12">
              {steps.map((step) => {
                const Icon = step.icon
                const isCompleted = step.id < currentStep
                const isCurrent = step.id === currentStep
                const isPending = step.id > currentStep

                return (
                  <div
                    key={step.id}
                    className={`relative flex items-start gap-6 transition-all duration-500 ${
                      isCompleted || isCurrent ? 'opacity-100' : 'opacity-40'
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isCompleted
                          ? 'bg-stone-800 text-white'
                          : isCurrent
                          ? 'bg-stone-800 text-white scale-110 shadow-lg'
                          : 'bg-white border-2 border-stone-200 text-stone-400'
                      }`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <h3 className={`font-serif text-xl mb-2 transition-colors ${
                        isCompleted || isCurrent ? 'text-stone-900' : 'text-stone-400'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm mb-2 ${
                        isCompleted || isCurrent ? 'text-stone-600' : 'text-stone-400'
                      }`}>
                        {step.description}
                      </p>
                      {step.date && (
                        <p className="text-xs text-stone-500">{step.date}</p>
                      )}
                    </div>

                    {/* Checkmark for completed */}
                    {isCompleted && (
                      <div className="pt-2">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white border border-stone-200 p-8 text-center animate-fade-in-up">
          <h2 className="font-serif text-2xl text-stone-900 mb-4">
            ¿Necesitas Ayuda?
          </h2>
          <p className="text-stone-600 mb-6">
            Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href={`/${store.slug}`} className="btn-primary">
              Volver a la Tienda
            </a>
          </div>

          {/* Demo button */}
          {currentStep < 4 && (
            <button
              onClick={handleAdvance}
              className="text-sm text-stone-500 hover:text-stone-700 underline"
            >
              [Demo: Avanzar estado]
            </button>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}
