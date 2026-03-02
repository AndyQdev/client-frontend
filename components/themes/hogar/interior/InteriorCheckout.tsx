'use client'

import { Store } from '@/lib/types'
import { useCart } from '@/lib/cart-context'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import InteriorStoreHeader from './InteriorStoreHeader'
import { useState } from 'react'
import { useCustomer } from '@/lib/customer-context'
import { useDelivery } from '@/hooks/useDelivery'
import CustomerDrawer from '@/components/shared/CustomerDrawer'
import DeliveryDrawer from '@/components/shared/DeliveryDrawer'
import AddAddressDialog from '@/components/shared/AddAddressDialog'
import { orderService } from '@/lib/api/services/order.service'
import { toast } from 'sonner'

interface InteriorCheckoutProps {
  store: Store
}

export default function InteriorCheckout({ store }: InteriorCheckoutProps) {
  const { items, getTotalPrice, clearCart } = useCart()
  const router = useRouter()

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
  const [calculatedDeliveryCost, setCalculatedDeliveryCost] = useState(0)

  const subtotal = getTotalPrice()
  const total = subtotal + deliveryCost

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
    // Si no está registrado, mostrar drawer de registro
    if (!customer) {
      setShowCustomerDrawer(true)
      return
    }

    // Si es calculated y no se ha calculado el costo, mostrar drawer de delivery
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
      // Crear la orden en el backend
      const deliveryType = getDeliveryType()
      const finalDeliveryCost = deliveryType === 'calculated' ? calculatedDeliveryCost : deliveryCost
      const actualTotal = subtotal + finalDeliveryCost
      
      const orderData = {
        totalAmount: actualTotal,
        type: deliveryType === 'calculated' ? 'delivery' as const : 'quick' as const,
        paymentMethod: 'pending',
        paymentDate: new Date().toISOString(),
        totalReceived: 0,
        customerId: customer.id,
        items: items.map(item => ({
          storeProductId: item.product.storeProductId,
          quantity: item.quantity,
          price: item.product.price,
        })),
        notes: `Pedido desde tienda web - ${deliveryType === 'calculated' ? 'Con delivery' : 'Sin delivery'}`,
        ...(deliveryType === 'calculated' && {
          deliveryInfo: {
            address: customer.addresses?.[0]?.name || 'Dirección del cliente',
            cost: finalDeliveryCost,
            coordinates: {
              latitude: customer.addresses?.[0]?.latitude || 0,
              longitude: customer.addresses?.[0]?.longitude || 0,
            },
            notes: '',
          },
        }),
      }

      const createdOrder = await orderService.createFromStore(store.id, orderData)

      console.log('📦 [InteriorCheckout] deliveryType:', deliveryType)
      console.log('📦 [InteriorCheckout] deliveryCost (hook):', deliveryCost)
      console.log('📦 [InteriorCheckout] calculatedDeliveryCost:', calculatedDeliveryCost)
      console.log('📦 [InteriorCheckout] finalDeliveryCost:', finalDeliveryCost)
      console.log('📦 [InteriorCheckout] actualTotal:', actualTotal)
      console.log('📦 [InteriorCheckout] subtotal:', subtotal)

      // Enviar notificación WhatsApp a la tienda
      try {
        const storePhone = store.config?.contact?.phone || ''
        if (storePhone) {
          const itemsList = items.map((item, index) => 
            `${index + 1}. ${item.product.name} x${item.quantity} - Bs ${(item.product.price * item.quantity).toFixed(2)}`
          ).join('\n')

          const deliveryText = deliveryType === 'calculated' 
            ? `\n📍 *Dirección:* ${customer.addresses?.[0]?.name || 'Sin dirección'}\n🚚 *Costo de Envío:* Bs ${finalDeliveryCost.toFixed(2)}\n📍 *Ubicación:* https://maps.google.com/?q=${customer.addresses?.[0]?.latitude},${customer.addresses?.[0]?.longitude}`
            : ''

          const message = `🛍️ *NUEVO PEDIDO RECIBIDO*\n\n` +
            `📋 *Pedido:* #${createdOrder.id.slice(0, 8)}\n` +
            `👤 *Cliente:* ${customer.name}\n` +
            `📱 *Teléfono:* ${customer.country} ${customer.phone}\n\n` +
            `*PRODUCTOS:*\n${itemsList}\n${deliveryText}\n\n` +
            `💰 *TOTAL:* Bs ${actualTotal.toFixed(2)}\n\n` +
            `⏰ *Fecha:* ${new Date().toLocaleString('es-BO')}\n` +
            `🌐 *Tienda:* ${store.name}`

          // Enviar mensaje usando el endpoint público del backend
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
          await fetch(`${apiUrl}/whatsapp/send-message`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: '59164528384_ALORA', // Bot userId
              to: storePhone,
              message: message,
            }),
          })
        }
      } catch (whatsappError) {
        // No mostrar error al usuario si falla WhatsApp
        console.error('Error enviando notificación WhatsApp:', whatsappError)
      }

      toast.success('¡Pedido confirmado exitosamente!', {
        description: `Total: Bs ${total.toFixed(2)}`,
      })

      // Clear cart
      clearCart()
      setShowDeliveryDrawer(false)

      // Redirect to order tracking con el ID real de la orden
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

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50">
        <InteriorStoreHeader
          store={store}
          onCartClick={() => router.push(`/${store.slug}`)}
          cartItemsCount={0}
        />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center animate-fade-in-up">
            <h2 className="font-serif text-3xl text-stone-900 mb-4">Tu carrito está vacío</h2>
            <button onClick={() => router.push(`/${store.slug}`)} className="btn-primary">
              Ver Productos
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <InteriorStoreHeader
        store={store}
        onCartClick={() => router.push(`/${store.slug}/checkout`)}
        cartItemsCount={items.length}
      />
      <div className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl text-stone-900 text-center mb-12 animate-fade-in-up">
          Finalizar Compra
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Instructions */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-stone-200 p-8 animate-fade-in">
              <h2 className="font-serif text-2xl text-stone-900 mb-6">Instrucciones del Pedido</h2>

              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-stone-900 text-white rounded-full flex items-center justify-center font-medium">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="text-stone-900">Revise cuidadosamente su pedido en el resumen</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-stone-900 text-white rounded-full flex items-center justify-center font-medium">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-stone-900">Al confirmar el pedido, nos contactaremos con usted para procesar el pago</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-stone-900 text-white rounded-full flex items-center justify-center font-medium">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="text-stone-900">Coordinaremos con usted los detalles de entrega y forma de pago</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-stone-900 text-white rounded-full flex items-center justify-center font-medium">
                    4
                  </div>
                  <div className="flex-1">
                    <p className="text-stone-900">Recibirá confirmación de su pedido una vez procesado</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full btn-primary py-4 text-base"
              >
                Confirmar Pedido
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-stone-200 p-8 sticky top-24 animate-fade-in-up">
              <h2 className="font-serif text-2xl text-stone-900 mb-6">Resumen del Pedido</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-stone-100 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-stone-900 text-sm mb-1">{item.product.name}</h3>
                      <p className="text-sm text-stone-600">Cantidad: {item.quantity}</p>
                      <p className="text-sm font-medium text-stone-900">Bs {(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-200 pt-6 space-y-3">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>Bs {getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Envío</span>
                  <span className="text-green-700 font-medium">{getDeliveryText()}</span>
                </div>
                <div className="flex justify-between font-serif text-xl text-stone-900 pt-3 border-t border-stone-200">
                  <span>Total</span>
                  <span>Bs {(getTotalPrice() + deliveryCost).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <CustomerDrawer
        isOpen={showCustomerDrawer}
        onClose={() => setShowCustomerDrawer(false)}
        onRegister={handleCustomerRegister}
        themeVariant="interior"
      />

      <DeliveryDrawer
        isOpen={showDeliveryDrawer}
        onClose={() => setShowDeliveryDrawer(false)}
        onConfirm={(address, cost) => {
          handleDeliveryConfirm(address, cost)
        }}
        onCreateOrder={createOrder}
        isCreatingOrder={isCreatingOrder}
        onDeliveryCostCalculated={setCalculatedDeliveryCost}
        storeCoordinates={storeCoordinates}
        customerAddresses={customer?.addresses || []}
        onAddAddress={() => {
          setShowDeliveryDrawer(false)
          setShowAddAddressDialog(true)
        }}
        themeVariant="interior"
        cartItems={items}
        subtotal={subtotal}
      />

      <AddAddressDialog
        isOpen={showAddAddressDialog}
        onClose={() => {
          setShowAddAddressDialog(false)
          setTimeout(() => setShowDeliveryDrawer(true), 300)
        }}
        onSave={handleAddAddress}
        themeVariant="interior"
      />
    </div>
  )
}
