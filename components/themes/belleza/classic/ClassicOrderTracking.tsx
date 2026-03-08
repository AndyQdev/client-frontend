'use client'

import { useState, useEffect } from 'react'
import { Store } from '@/lib/types'
import ClassicStoreHeader from './ClassicStoreHeader'
import { Package, Truck, Crown, Phone, Wifi, WifiOff, CheckCircle } from 'lucide-react'
import { useWebSocket } from '@/lib/websocket-context'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface ClassicOrderTrackingProps {
  store: Store
  orderId: string
}

const steps = [
  {
    id: 1,
    title: 'Contactando con el proveedor',
    description: 'Confirmando su distinguido pedido con nuestro proveedor de confianza',
    icon: Phone,
    status: 'pendiente'
  },
  {
    id: 2,
    title: 'Preparando su pedido',
    description: 'Preparando su pedido con el cuidado y atención que merece',
    icon: Package,
    status: 'en-proceso'
  },
  {
    id: 3,
    title: 'Su pedido está en camino',
    description: 'Su pedido ha iniciado su viaje hacia usted',
    icon: Truck,
    status: 'en-camino'
  },
  {
    id: 4,
    title: '¡Pedido Completado!',
    description: 'Entregado con éxito. Ha sido un honor servirle',
    icon: CheckCircle,
    status: 'completado'
  }
]

export default function ClassicOrderTracking({ store, orderId }: ClassicOrderTrackingProps) {
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
          
          // Mapear status del backend a step del frontend
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
      console.log('🔔 [ClassicTracking] Order status changed:', data)
      
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
    <div className="min-h-screen bg-amber-50">
      <ClassicStoreHeader store={store} onCartClick={() => setShowCartSheet(true)} />

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* WebSocket Connection Status */}
        <div className="mb-6 flex justify-end">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
            isConnected 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4" />
                Conectado en tiempo real
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4" />
                Desconectado
              </>
            )}
          </div>
        </div>

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
          <p className="text-amber-700 font-serif italic" style={{ fontVariantNumeric: 'lining-nums' }}>
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
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-serif text-amber-800">Progreso del Pedido</span>
              <motion.span 
                key={progress}
                className="text-lg font-serif font-bold text-amber-900"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {Math.round(progress)}%
              </motion.span>
            </div>
            <div className="relative w-full bg-amber-100 rounded-full h-4 overflow-hidden border-2 border-amber-200">
              <motion.div
                className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 h-full rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-amber-700/30 to-transparent"></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              const isFuture = currentStep < step.id

              return (
                <motion.div
                  key={step.id}
                  className="relative flex items-start space-x-6"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ 
                    opacity: isFuture ? 0.5 : 1,
                    x: 0,
                    scale: isActive ? 1 : isFuture ? 0.95 : 1
                  }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  {/* Vintage Connector */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-16 w-px h-16 flex flex-col justify-between">
                      {isCompleted ? (
                        <>
                          <motion.div 
                            className="w-px h-full bg-gradient-to-b from-amber-600 to-amber-400"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                            style={{ originY: 0 }}
                          />
                          <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
                            <motion.div 
                              className="w-2 h-2 bg-amber-500 rotate-45"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.5 }}
                            />
                          </div>
                        </>
                      ) : (
                        <div className="w-px h-full bg-amber-200"></div>
                      )}
                    </div>
                  )}

                  {/* Icon Circle with Ornament */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-lg'
                          : isActive
                          ? 'bg-white border-4 border-amber-500 text-amber-700 shadow-md'
                          : 'bg-white border-4 border-amber-200 text-amber-400'
                      }`}
                      animate={{ 
                        scale: isActive || isCompleted ? 1.1 : 1,
                        rotate: isCompleted ? [0, 10, -10, 0] : 0
                      }}
                      transition={{ 
                        scale: { type: "spring", stiffness: 300 },
                        rotate: { duration: 0.5, delay: index * 0.1 }
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: 1,
                          // Animaciones específicas por icono cuando está activo
                          rotate: isActive && step.icon === Phone ? [0, -10, 10, -10, 10, 0] : 0,
                          y: isActive && step.icon === Package ? [0, -5, 0, -5, 0] : 0,
                          x: isActive && step.icon === Truck ? [0, 3, 0, 3, 0] : 0,
                        }}
                        transition={{ 
                          delay: index * 0.1 + 0.2, 
                          type: "spring",
                          rotate: { duration: 0.8, repeat: isActive ? Infinity : 0, repeatDelay: 0.5 },
                          y: { duration: 1, repeat: isActive ? Infinity : 0, ease: "easeInOut" },
                          x: { duration: 1.2, repeat: isActive ? Infinity : 0, ease: "easeInOut" }
                        }}
                      >
                        {isCompleted ? (
                          <motion.div
                            animate={{ rotate: [0, -15, 15, -15, 0] }}
                            transition={{ duration: 0.6 }}
                          >
                            <Crown className="w-8 h-8" />
                          </motion.div>
                        ) : (
                          <Icon className="w-8 h-8" />
                        )}
                      </motion.div>
                    </motion.div>
                    {/* Outer Ornamental Ring for Active */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          className="absolute inset-0 w-16 h-16 rounded-full border-2 border-amber-300"
                          initial={{ scale: 1, opacity: 0.75 }}
                          animate={{ scale: 1.5, opacity: 0 }}
                          exit={{ scale: 1, opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    className={`flex-1 pt-2 ${
                      isActive ? 'bg-amber-50 border-2 border-amber-200 rounded-lg p-4 -ml-2' : ''
                    }`}
                    animate={{
                      backgroundColor: isActive ? 'rgb(255 251 235)' : 'transparent'
                    }}
                    transition={{ duration: 0.3 }}
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
                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          className="mt-3 flex items-center space-x-3"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-amber-600 rounded-full"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-serif font-semibold text-amber-800">
                            En progreso
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {isCompleted && (
                        <motion.div 
                          className="mt-3 flex items-center space-x-2 text-amber-700"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                        >
                          <Crown className="w-4 h-4" />
                          <span className="text-sm font-serif italic">Completado con éxito</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
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
