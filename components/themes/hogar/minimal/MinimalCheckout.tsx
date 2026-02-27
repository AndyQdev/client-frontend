'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/lib/cart-context'
import { useRouter } from 'next/navigation'
import { Store } from '@/lib/types'
import { orderService } from '@/lib/api/services/order.service'
import { toast } from 'sonner'
import MinimalStoreHeader from './MinimalStoreHeader'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { useCustomer } from '@/lib/customer-context'
import { useDelivery } from '@/hooks/useDelivery'
import CustomerDrawer from '@/components/shared/CustomerDrawer'
import DeliveryDrawer from '@/components/shared/DeliveryDrawer'
import AddAddressDialog from '@/components/shared/AddAddressDialog'

interface MinimalCheckoutProps {
  store: Store
}

export default function MinimalCheckout({ store }: MinimalCheckoutProps) {
  const { items, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  console.log('Rendering MinimalCheckout with items:', items)
  const { customer, login, addAddress } = useCustomer()

  const deliveryConfig = store.config?.delivery
  const storeCoordinates = store.config?.contact?.coordinates

  const {
    deliveryCost,
    getDeliveryText,
    getDeliveryType,
    handleDeliveryConfirm,
    shouldShowDeliveryDrawer,
  } = useDelivery({ deliveryConfig, storeCoordinates })

  const [showCustomerDrawer, setShowCustomerDrawer] = useState(false)
  const [showDeliveryDrawer, setShowDeliveryDrawer] = useState(false)
  const [showAddAddressDialog, setShowAddAddressDialog] = useState(false)
  const [isCreatingOrder, setIsCreatingOrder] = useState(false)

  const handleCustomerRegister = async (
    name: string,
    phone: string,
    country: string,
    addressObject?: { name: string; latitude: number; longitude: number }
  ) => {
    await login(store.id, name, phone, country, addressObject)
    setShowCustomerDrawer(false)
    
    if (getDeliveryType() === 'calculated') {
      setTimeout(() => setShowDeliveryDrawer(true), 300)
    }
  }

  const handleAddAddress = async (addressObject: { name: string; latitude: number; longitude: number }) => {
    await addAddress(addressObject)
    setShowAddAddressDialog(false)
  }

  const handleSubmit = async () => {
    if (!customer) {
      setShowCustomerDrawer(true)
      return
    }

    if (shouldShowDeliveryDrawer(!!customer)) {
      setShowDeliveryDrawer(true)
      return
    }
    
    await createOrder()
  }

  const createOrder = async () => {
    if (!customer) return
    
    setIsCreatingOrder(true)
    try {
      const deliveryType = getDeliveryType()
      const orderData = {
        totalAmount: total,
        type: deliveryType === 'calculated' ? 'delivery' as const : 'quick' as const,
        paymentMethod: 'pending',
        paymentDate: new Date().toISOString(),
        totalReceived: 0,
        customerId: customer.id,
        items: items.map(item => {
          console.log('🔍 Item del carrito:', item)
          console.log('🔍 Product:', item.product)
          console.log('🔍 storeProductId:', item.product.storeProductId)
          return {
            storeProductId: item.product.storeProductId,
            quantity: item.quantity,
            price: item.product.price,
          }
        }),
        notes: `Pedido desde tienda web - ${deliveryType === 'calculated' ? 'Con delivery' : 'Sin delivery'}`,
        ...(deliveryType === 'calculated' && {
          deliveryInfo: {
            address: customer.addresses?.[0]?.name || 'Dirección del cliente',
            cost: deliveryCost,
            notes: `Coordenadas: ${customer.addresses?.[0]?.latitude}, ${customer.addresses?.[0]?.longitude}`,
          },
        }),
      }

      const createdOrder = await orderService.createFromStore(store.id, orderData)
      
      toast.success('¡Pedido confirmado exitosamente!', {
        description: `Total: Bs ${total.toFixed(2)}`,
      })
      
      clearCart()
      setShowDeliveryDrawer(false)
      router.push(`/${store.slug}/pedido/${createdOrder.id}`)
    } catch (error) {
      console.error('Error creating order:', error)
      toast.error('Error al crear el pedido', {
        description: 'Por favor intenta de nuevo',
      })
    } finally {
      setIsCreatingOrder(false)
    }
  }

  const subtotal = getTotalPrice()
  const total = subtotal + deliveryCost

  return (
    <div className="min-h-screen bg-white">
      <MinimalStoreHeader store={store} onCartClick={() => {}} />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Checkout</h1>
          <p className="text-sm text-gray-500">Completa tu pedido</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Columna Izquierda - Instrucciones */}
          <div className="space-y-8">
            {/* Información del Pedido */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Instrucciones del Pedido</h2>

              {/* Instrucciones */}
              <div className="bg-white border border-gray-200 p-6 mb-6">
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center mt-0.5">1</span>
                    <span className="text-sm text-gray-600">Revise cuidadosamente su pedido en el resumen</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center mt-0.5">2</span>
                    <span className="text-sm text-gray-600">Al confirmar el pedido, nos contactaremos con usted para procesar el pago</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center mt-0.5">3</span>
                    <span className="text-sm text-gray-600">Coordinaremos con usted los detalles de entrega y forma de pago</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center mt-0.5">4</span>
                    <span className="text-sm text-gray-600">Recibirá confirmación de su pedido una vez procesado</span>
                  </li>
                </ul>
              </div>

              {/* Botón */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gray-900 text-white py-4 text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Confirmar Pedido
              </button>
            </div>
          </div>

          {/* Columna Derecha - Resumen */}
          <div>
            <div className="border border-gray-200 p-8 sticky top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Resumen del pedido</h2>

              {/* Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                {items.map((item) => (
                  <div key={item.product.id} className="flex space-x-4">
                    <div className="relative w-16 h-16 bg-gray-50 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm text-gray-900 mb-1 line-clamp-1">{item.product.name}</h3>
                      <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                        Bs {(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totales */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">Bs {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Envío</span>
                  <span className="text-gray-900">{getDeliveryText()}</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="text-xl font-medium text-gray-900">Bs {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Seguridad */}
              {/* <div className="bg-gray-50 p-4 border border-gray-200">
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pago seguro y encriptado</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <CustomerDrawer
        isOpen={showCustomerDrawer}
        onClose={() => setShowCustomerDrawer(false)}
        onRegister={handleCustomerRegister}
        themeVariant="minimal"
      />

      <DeliveryDrawer
        isOpen={showDeliveryDrawer}
        onClose={() => setShowDeliveryDrawer(false)}
        onConfirm={(address, cost) => {
          handleDeliveryConfirm(address, cost)
        }}
        storeCoordinates={storeCoordinates}
        customerAddresses={customer?.addresses || []}
        onAddAddress={() => {
          setShowDeliveryDrawer(false)
          setShowAddAddressDialog(true)
        }}
        themeVariant="minimal"
        cartItems={items}
        subtotal={subtotal}
        onCreateOrder={createOrder}
        isCreatingOrder={isCreatingOrder}
      />

      <AddAddressDialog
        isOpen={showAddAddressDialog}
        onClose={() => {
          setShowAddAddressDialog(false)
          setTimeout(() => setShowDeliveryDrawer(true), 300)
        }}
        onSave={handleAddAddress}
        themeVariant="minimal"
      />
    </div>
  )
}
