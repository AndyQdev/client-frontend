'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { useCustomer } from '@/lib/customer-context'
import { useDelivery } from '@/hooks/useDelivery'
import { useRouter } from 'next/navigation'
import { Store } from '@/lib/types'
import { orderService } from '@/lib/api/services/order.service'
import { toast } from 'sonner'
import ClassicStoreHeader from './ClassicStoreHeader'
import Image from 'next/image'
import { Crown, Shield, Star } from 'lucide-react'
import CustomerDrawer from '@/components/shared/CustomerDrawer'
import DeliveryDrawer from '@/components/shared/DeliveryDrawer'
import AddAddressDialog from '@/components/shared/AddAddressDialog'
import { CustomerAddress } from '@/lib/api/services/customer.service'

interface ClassicCheckoutProps {
  store: Store
}

export default function ClassicCheckout({ store }: ClassicCheckoutProps) {
  const { items, getTotalPrice, clearCart } = useCart()
  const { customer, login, addAddress } = useCustomer()
  const router = useRouter()
  
  // SISTEMA DE COSTOS DE DELIVERY:
  // ================================
  // 1. Se obtiene la configuración de delivery del store desde store.config.delivery
  //    - type: puede ser 'pending' (por definir), 'free' (gratis), 'fixed' (valor fijo), 'calculated' (calculado por distancia)
  //    - value: el valor del costo (usado solo en type='fixed')
  //
  // 2. Se obtienen las coordenadas de la tienda desde store.config.contact.coordinates
  //    - latitude: latitud de la ubicación de la tienda
  //    - longitude: longitud de la ubicación de la tienda
  //
  // 3. El hook useDelivery procesa esta configuración y devuelve:
  //    - deliveryCost: el costo calculado del delivery (0 para free/pending, value para fixed, calculado para calculated)
  //    - getDeliveryText(): muestra el texto apropiado ("Gratis", "Por Definir", "Bs X", "El sistema lo calcula")
  //    - getDeliveryType(): retorna el tipo de delivery actual
  //    - handleDeliveryConfirm(): guarda la dirección seleccionada y el costo calculado
  //    - shouldShowDeliveryDrawer(): determina si debe mostrar el drawer de cálculo (solo para type='calculated')
  //
  // 4. Para type='calculated':
  //    - Se abre el DeliveryDrawer que muestra un mapa con la ruta desde la tienda hasta el cliente
  //    - Se calcula la distancia usando la fórmula de Haversine (distancia en línea recta entre dos coordenadas)
  //    - El costo se calcula como: 5 BOB (base) + (distancia_km × 2)
  //    - El usuario selecciona su dirección de entrega y confirma
  //    - El costo calculado se suma al total del pedido
  //
  // 5. Flujo de confirmación:
  //    a) Si no hay customer registrado → Abre CustomerDrawer para registro
  //    b) Si hay customer y type='calculated' y deliveryCost=0 → Abre DeliveryDrawer para calcular
  //    c) Si todo está listo → Genera orden y redirige a página de seguimiento
  
  const deliveryConfig = store.config?.delivery
  const storeCoordinates = store.config?.contact?.coordinates
  
  const {
    deliveryCost,
    getDeliveryText,
    getDeliveryType,
    handleDeliveryConfirm,
    shouldShowDeliveryDrawer,
  } = useDelivery({ deliveryConfig, storeCoordinates })
  console.log('Delibery Cost!: ', deliveryCost)
  const [showCustomerDrawer, setShowCustomerDrawer] = useState(false)
  const [showDeliveryDrawer, setShowDeliveryDrawer] = useState(false)
  const [showAddAddressDialog, setShowAddAddressDialog] = useState(false)
  const [isCreatingOrder, setIsCreatingOrder] = useState(false)
  const [calculatedDeliveryCost, setCalculatedDeliveryCost] = useState(0)
  console.log('Caclucaletd!!: ', calculatedDeliveryCost)
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
    
    // Si es calculated, abrir drawer de delivery después de registrarse
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
    console.log('DELIBERY OVERRIDE: ', calculatedDeliveryCost)
    setIsCreatingOrder(true)
    try {
      // Crear la orden en el backend
      const deliveryType = getDeliveryType()
      const finalDeliveryCost = deliveryType === 'calculated' ? calculatedDeliveryCost : deliveryCost
      const actualTotal = subtotal + finalDeliveryCost
      
      const orderData = {
        totalAmount: actualTotal,
        type: deliveryType === 'calculated' ? 'delivery' as const : 'quick' as const,
        paymentMethod: 'pending', // El pago se coordinará después
        paymentDate: new Date().toISOString(),
        totalReceived: 0, // No hay pago inicial desde la web
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
            cost: finalDeliveryCost,
            coordinates: {
              latitude: customer.addresses?.[0]?.latitude || 0,
              longitude: customer.addresses?.[0]?.longitude || 0,
            },
            notes: '',
          },
        }),
      }

      console.log('📦 OrderData a enviar:', JSON.stringify(orderData, null, 2))

      const createdOrder = await orderService.createFromStore(store.id, orderData)

      console.log('📦 [ClassicCheckout] deliveryType:', deliveryType)
      console.log('📦 [ClassicCheckout] deliveryCost (hook):', deliveryCost)
      console.log('📦 [ClassicCheckout] calculatedDeliveryCost:', calculatedDeliveryCost)
      console.log('📦 [ClassicCheckout] finalDeliveryCost:', finalDeliveryCost)
      console.log('📦 [ClassicCheckout] actualTotal:', actualTotal)
      console.log('📦 [ClassicCheckout] subtotal:', subtotal)

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <ClassicStoreHeader store={store} onCartClick={() => {}} />

      {/* Ornamental Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <Crown className="w-12 h-12 text-amber-200" />
          </div>
          <h1 className="text-4xl font-serif text-white mb-2">Finalizar Pedido</h1>
          <p className="text-amber-100 font-serif italic">Con la distinción de siempre</p>

          {/* Decorative divider */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-px bg-amber-300"></div>
              <Star className="w-4 h-4 text-amber-300" />
              <div className="w-12 h-px bg-amber-300"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Columna Izquierda - Información */}
          <div className="space-y-8">
            {/* Instrucciones de Pedido */}
            <div className="bg-white rounded-lg shadow-md border-2 border-amber-200 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">📋</span>
                </div>
                <h2 className="text-2xl font-serif text-amber-900">Finalizar Pedido</h2>
              </div>

              {/* Classic Instructions */}
              <div className="bg-white border-4 border-amber-300 rounded-lg p-6 relative mb-6">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-600 px-6 py-1 rounded-full">
                  <span className="text-white text-sm font-serif font-bold">INSTRUCCIONES</span>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-serif font-bold">I</span>
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-amber-900 font-serif">Revise cuidadosamente su pedido en el resumen</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-serif font-bold">II</span>
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-amber-900 font-serif">Al confirmar el pedido, nos contactaremos con usted para procesar el pago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-serif font-bold">III</span>
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-amber-900 font-serif">Coordinaremos con usted los detalles de entrega y forma de pago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-serif font-bold">IV</span>
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-amber-900 font-serif">Recibirá confirmación de su pedido una vez procesado</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vintage Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-5 text-lg font-serif font-bold hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg border-2 border-amber-800 rounded-lg relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <Crown className="w-5 h-5" />
                  <span>Confirmar Pedido</span>
                  <Crown className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>

          {/* Columna Derecha - Resumen Heritage Card */}
          <div>
            <div className="bg-white rounded-lg shadow-xl border-4 border-double border-amber-400 p-8 sticky top-8">
              {/* Ornamental header */}
              <div className="text-center mb-6 pb-6 border-b-2 border-amber-200">
                <Crown className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                <h2 className="text-2xl font-serif text-amber-900 mb-1">Resumen del Pedido</h2>
                <p className="text-sm font-serif text-amber-600 italic">Con nuestra garantía de excelencia</p>
              </div>

              {/* Items with heritage styling */}
              <div className="space-y-4 mb-6 pb-6 border-b-2 border-amber-200">
                {items.map((item) => (
                  <div key={item.product.id} className="flex space-x-4 bg-amber-50 p-3 rounded border border-amber-200">
                    <div className="relative w-20 h-20 bg-white flex-shrink-0 rounded border-2 border-amber-300">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-serif text-amber-900 mb-1 font-medium line-clamp-1">
                        {item.product.name}
                      </h3>
                      <p className="text-xs font-serif text-amber-600">Cantidad: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-serif font-bold text-amber-900" style={{ fontVariantNumeric: 'lining-nums' }}>
                      Bs {(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totales con estilo vintage */}
              <div className="space-y-4 mb-6" style={{ fontVariantNumeric: 'lining-nums' }}>
                <div className="flex justify-between items-center font-serif">
                  <span className="text-amber-700">Subtotal</span>
                  <span className="text-amber-900 font-medium">Bs {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center font-serif">
                  <span className="text-amber-700">Envío</span>
                  <span className="text-amber-900 font-medium">{getDeliveryText()}</span>
                </div>
                <div className="flex justify-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-px bg-amber-400"></div>
                    <div className="w-2 h-2 bg-amber-600 rotate-45"></div>
                    <div className="w-24 h-px bg-amber-400"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-gradient-to-r from-amber-100 to-amber-50 p-4 rounded-lg border-2 border-amber-300">
                  <span className="font-serif font-bold text-amber-900 text-lg">Total</span>
                  <span className="text-2xl font-serif font-bold text-amber-900">Bs {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Seguridad con sello vintage */}
              {/* <div className="bg-gradient-to-br from-amber-600 to-amber-800 p-6 rounded-lg text-center border-2 border-amber-900 shadow-lg">
                <Shield className="w-10 h-10 text-amber-200 mx-auto mb-3" />
                <p className="text-white font-serif font-bold mb-1">Pago Seguro Garantizado</p>
                <p className="text-amber-200 text-xs font-serif italic">Encriptación de nivel bancario</p>
                <div className="flex justify-center mt-3 space-x-1">
                  <Star className="w-4 h-4 text-amber-300" />
                  <Star className="w-4 h-4 text-amber-300" />
                  <Star className="w-4 h-4 text-amber-300" />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Registration Drawer */}
      <CustomerDrawer
        isOpen={showCustomerDrawer}
        onClose={() => setShowCustomerDrawer(false)}
        onRegister={handleCustomerRegister}
        themeVariant="classic"
      />

      {/* Delivery Calculation Drawer */}
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
        themeVariant="classic"
        cartItems={items}
        subtotal={subtotal}
        onCreateOrder={createOrder}
        isCreatingOrder={isCreatingOrder}
        onDeliveryCostCalculated={setCalculatedDeliveryCost}
      />

      {/* Add Address Dialog */}
      <AddAddressDialog
        isOpen={showAddAddressDialog}
        onClose={() => {
          setShowAddAddressDialog(false)
          // Reabrir delivery drawer después de cerrar el dialog
          setTimeout(() => setShowDeliveryDrawer(true), 300)
        }}
        onSave={handleAddAddress}
        themeVariant="classic"
      />
    </div>
  )
}
