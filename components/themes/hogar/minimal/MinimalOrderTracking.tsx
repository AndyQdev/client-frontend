'use client'

import { useState, useEffect } from 'react'
import { Store } from '@/lib/types'
import MinimalStoreHeader from './MinimalStoreHeader'
import { Package, Truck, CheckCircle2, Phone, Wifi, WifiOff } from 'lucide-react'
import { useWebSocket } from '@/lib/websocket-context'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface MinimalOrderTrackingProps {
  store: Store
  orderId: string
}

const steps = [
  {
    id: 1,
    title: 'Contactando con el proveedor',
    description: 'Estamos confirmando su pedido con el proveedor',
    icon: Phone,
    status: 'pendiente'
  },
  {
    id: 2,
    title: 'Preparando su pedido',
    description: 'Su pedido está siendo preparado cuidadosamente',
    icon: Package,
    status: 'en-proceso'
  },
  {
    id: 3,
    title: 'Su pedido está en camino',
    description: 'El pedido ha sido enviado y está en tránsito',
    icon: Truck,
    status: 'en-camino'
  },
  {
    id: 4,
    title: '¡Pedido Completado!',
    description: 'Entregado con éxito. ¡Gracias por su compra!',
    icon: CheckCircle2,
    status: 'completado'
  }
]

export default function MinimalOrderTracking({ store, orderId }: MinimalOrderTrackingProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [showCartSheet, setShowCartSheet] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
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
      console.log('🔔 [MinimalTracking] Order status changed:', data)
      
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
        {/* WebSocket Connection Indicator */}
        <div className="flex justify-end mb-6">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
            isConnected 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4" />
                <span>Conectado</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4" />
                <span>Desconectado</span>
              </>
            )}
          </div>
        </div>
        
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
              <motion.div
                className="bg-gray-900 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
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
                <motion.div
                  key={step.id}
                  className="relative flex items-start space-x-4"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ 
                    opacity: isFuture ? 0.4 : 1,
                    x: 0
                  }}
                  transition={{ 
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                >
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className={`absolute left-6 top-12 w-0.5 h-12 ${
                        isCompleted ? 'bg-gray-900' : 'bg-gray-200'
                      }`}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      style={{ originY: 0 }}
                    />
                  )}

                  {/* Icon Circle */}
                  <motion.div
                    className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-gray-900 text-white'
                        : isActive
                        ? 'bg-white border-2 border-gray-900 text-gray-900'
                        : 'bg-white border-2 border-gray-200 text-gray-400'
                    }`}
                    animate={{ 
                      scale: isActive || isCompleted ? 1.1 : 1,
                      rotate: isActive && step.icon === Phone ? [0, -10, 10, -10, 10, 0] : 0,
                      y: isActive && step.icon === Package ? [0, -5, 0, -5, 0] : 0,
                      x: isActive && step.icon === Truck ? [0, 3, 0, 3, 0] : 0,
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300,
                      rotate: { duration: 0.8, repeat: isActive ? Infinity : 0, repeatDelay: 0.5 },
                      y: { duration: 1, repeat: isActive ? Infinity : 0, ease: "easeInOut" },
                      x: { duration: 1.2, repeat: isActive ? Infinity : 0, ease: "easeInOut" }
                    }}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CheckCircle2 className="w-6 h-6" />
                      </motion.div>
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </motion.div>

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
                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          className="mt-2 flex items-center space-x-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <motion.div 
                            className="w-2 h-2 bg-gray-900 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <span className="text-xs font-medium text-gray-900">En progreso</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
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
            {store.contact?.phone && (
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{store.contact?.phone}</span>
              </div>
            )}
            {store.contact?.email && (
              <div className="flex items-center space-x-3 text-gray-600">
                <span className="w-4 h-4 flex items-center justify-center">@</span>
                <span>{store.contact?.email}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
