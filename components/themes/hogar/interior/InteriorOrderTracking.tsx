'use client'

import { Store } from '@/lib/types'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import InteriorStoreHeader from './InteriorStoreHeader'
import { Package, Truck, CheckCircle, Phone, Wifi, WifiOff } from 'lucide-react'
import { useWebSocket } from '@/lib/websocket-context'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface InteriorOrderTrackingProps {
  store: Store
  orderId?: string
}

export default function InteriorOrderTracking({ store, orderId }: InteriorOrderTrackingProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { isConnected, onOrderStatusChange } = useWebSocket()

  // Obtener estado inicial de la orden al cargar
  useEffect(() => {
    if (!orderId) return

    const fetchOrderStatus = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/public/${orderId}`)
        
        if (response.ok) {
          const result = await response.json()
          const order = result.data
          
          const statusToStep: Record<string, number> = {
            'pendiente': 1,
            'en-proceso': 2,
            'en-camino': 3,
            'completado': 4,
          }
          
          const step = statusToStep[order.status]
          if (step !== undefined) {
            setCurrentStep(step)
          }
        }
      } catch (error) {
        console.error('Error fetching order status:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrderStatus()
  }, [orderId])

  // Escuchar cambios de status en tiempo real
  useEffect(() => {
    if (!orderId) return
    
    const unsubscribe = onOrderStatusChange((data) => {
      console.log('🔔 [InteriorTracking] Order status changed:', data)
      
      if (data.orderId === orderId) {
        toast.success('¡Estado del pedido actualizado!', {
          description: `Nuevo estado: ${data.status}`,
        })
        
        const statusToStep: Record<string, number> = {
          'pendiente': 1,
          'en-proceso': 2,
          'en-camino': 3,
          'completado': 4,
        }
        
        const newStep = statusToStep[data.status]
        if (newStep !== undefined) {
          setCurrentStep(newStep)
        }
      }
    })
    
    return unsubscribe
  }, [orderId, onOrderStatusChange])

  const steps = [
    {
      id: 1,
      title: 'Contactando con el proveedor',
      description: 'Tu pedido ha sido recibido y confirmado',
      icon: Phone,
      date: new Date().toLocaleDateString(),
      status: 'pendiente'
    },
    {
      id: 2,
      title: 'En Preparación',
      description: 'Estamos preparando tu pedido con cuidado',
      icon: Package,
      date: '',
      status: 'en-proceso'
    },
    {
      id: 3,
      title: 'En Camino',
      description: 'Tu pedido está siendo enviado',
      icon: Truck,
      date: '',
      status: 'en-camino'
    },
    {
      id: 4,
      title: '¡Pedido Completado!',
      description: 'Entregado con éxito. ¡Gracias por tu compra!',
      icon: CheckCircle,
      date: '',
      status: 'completado'
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
      
      {/* WebSocket Connection Indicator */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex justify-end mb-4">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            isConnected 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4" />
                <span>Conectado en tiempo real</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4" />
                <span>Desconectado</span>
              </>
            )}
          </div>
        </div>
      </div>
      
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
            <motion.div
              className="absolute left-8 top-0 w-0.5 bg-stone-800"
              initial={{ height: 0 }}
              animate={{ height: `${((currentStep - 1) / 3) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {/* Steps */}
            <div className="space-y-12">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isCompleted = step.id < currentStep
                const isCurrent = step.id === currentStep
                const isPending = step.id > currentStep

                return (
                  <motion.div
                    key={step.id}
                    className="relative flex items-start gap-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ 
                      opacity: isCompleted || isCurrent ? 1 : 0.4,
                      x: 0
                    }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    {/* Icon */}
                    <motion.div
                      className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'bg-stone-800 text-white'
                          : isCurrent
                          ? 'bg-stone-800 text-white shadow-lg'
                          : 'bg-white border-2 border-stone-200 text-stone-400'
                      }`}
                      animate={{ 
                        scale: isCurrent ? 1.1 : 1,
                        rotate: isCurrent && step.icon === Phone ? [0, -10, 10, -10, 10, 0] : 0,
                        y: isCurrent && step.icon === Package ? [0, -5, 0, -5, 0] : 0,
                        x: isCurrent && step.icon === Truck ? [0, 3, 0, 3, 0] : 0,
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300,
                        rotate: { duration: 0.8, repeat: isCurrent ? Infinity : 0, repeatDelay: 0.5 },
                        y: { duration: 1, repeat: isCurrent ? Infinity : 0, ease: "easeInOut" },
                        x: { duration: 1.2, repeat: isCurrent ? Infinity : 0, ease: "easeInOut" }
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                      >
                        <Icon className="w-7 h-7" />
                      </motion.div>
                    </motion.div>

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
                    <AnimatePresence>
                      {isCompleted && (
                        <motion.div 
                          className="pt-2"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
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
