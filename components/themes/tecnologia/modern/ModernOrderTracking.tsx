'use client'

import { useState, useEffect } from 'react'
import { Phone, Package, Truck, CheckCircle, Check, ChevronRight, Wifi, WifiOff } from 'lucide-react'
import ModernStoreHeader from './ModernStoreHeader'
import { Store } from '@/lib/types'
import { useWebSocket } from '@/lib/websocket-context'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

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
    color: 'text-blue-600',
    status: 'pendiente'
  },
  {
    id: 1,
    title: 'Preparando su pedido',
    description: 'El proveedor está preparando cuidadosamente tu pedido',
    icon: Package,
    gradient: 'from-purple-500 to-purple-600',
    bgGradient: 'from-purple-50 to-purple-100',
    color: 'text-purple-600',
    status: 'en-proceso'
  },
  {
    id: 2,
    title: 'Su pedido está en camino',
    description: 'Tu pedido está en ruta hacia el destino',
    icon: Truck,
    gradient: 'from-indigo-500 to-indigo-600',
    bgGradient: 'from-indigo-50 to-indigo-100',
    color: 'text-indigo-600',
    status: 'en-camino'
  },
  {
    id: 3,
    title: '¡Pedido Completado!',
    description: 'Entregado con éxito. ¡Gracias por tu compra!',
    icon: CheckCircle,
    gradient: 'from-green-500 to-green-600',
    bgGradient: 'from-green-50 to-green-100',
    color: 'text-green-600',
    status: 'completado'
  }
]

export default function ModernOrderTracking({ store, orderId, onCartClick }: ModernOrderTrackingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [animatingStep, setAnimatingStep] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { isConnected, onOrderStatusChange } = useWebSocket()

  const progress = ((currentStep + 1) / STEPS.length) * 100

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
            'pendiente': 0,
            'en-proceso': 1,
            'en-camino': 2,
            'completado': 3,
          }
          
          const step = statusToStep[order.status]
          if (step !== undefined) {
            setCurrentStep(step)
            if (step === 3) {
              setShowConfetti(true)
            }
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
      console.log('🔔 [ModernTracking] Order status changed:', data)
      
      if (data.orderId === orderId) {
        toast.success('¡Estado del pedido actualizado!', {
          description: `Nuevo estado: ${data.status}`,
        })
        
        const statusToStep: Record<string, number> = {
          'pendiente': 0,
          'en-proceso': 1,
          'en-camino': 2,
          'completado': 3,
        }
        
        const newStep = statusToStep[data.status]
        if (newStep !== undefined) {
          setCurrentStep(newStep)
          if (newStep === 3) {
            setShowConfetti(true)
          }
        }
      }
    })
    
    return unsubscribe
  }, [orderId, onOrderStatusChange])

  useEffect(() => {
    if (currentStep === 3) {
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
    setCurrentStep(prev => Math.min(prev + 1, 3))
  }

  const getEstimatedTime = () => {
    switch (currentStep) {
      case 0: return '5-10 minutos'
      case 1: return '15-20 minutos'
      case 2: return '20-30 minutos'
      case 3: return 'Completado'
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
        {/* WebSocket Connection Indicator */}
        <div className="flex justify-end mb-6">
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
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
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
                <motion.div
                  key={step.id}
                  className="relative flex gap-6 mb-8 last:mb-0"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ 
                    opacity: isFuture ? 0.4 : 1,
                    x: 0,
                    scale: isAnimating ? 1.05 : 1
                  }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    {isCompleted ? (
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg"
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Check className="w-6 h-6 text-white" strokeWidth={3} />
                      </motion.div>
                    ) : (
                      <motion.div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                          isCurrent
                            ? `bg-gradient-to-br ${step.gradient}`
                            : 'bg-gray-200'
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
                        <StepIcon
                          className={`w-6 h-6 ${isCurrent ? 'text-white' : 'text-gray-400'}`}
                          strokeWidth={isCurrent ? 2.5 : 2}
                        />
                      </motion.div>
                    )}
                    <AnimatePresence>
                      {isCurrent && (
                        <motion.div 
                          className="absolute inset-0 w-12 h-12 rounded-full border-2 border-current opacity-75"
                          initial={{ scale: 1, opacity: 0.75 }}
                          animate={{ scale: 1.8, opacity: 0 }}
                          exit={{ scale: 1, opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </AnimatePresence>
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
                      <AnimatePresence>
                        {isCurrent && (
                          <motion.div 
                            className="mt-4 flex items-center gap-2"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <div className="flex gap-1">
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.gradient}`}
                                  animate={{ scale: [1, 1.5, 1] }}
                                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                />
                              ))}
                            </div>
                            <span className={`text-xs font-semibold ${step.color}`}>
                              En progreso...
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <AnimatePresence>
                        {isCompleted && (
                          <motion.div 
                            className="mt-4 text-xs font-semibold text-green-600"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                          >
                            Completado
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
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
