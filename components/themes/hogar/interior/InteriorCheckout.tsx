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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!customer) {
      setShowCustomerDrawer(true)
      return
    }

    if (shouldShowDeliveryDrawer(!!customer)) {
      setShowDeliveryDrawer(true)
      return
    }
    const orderId = `ORD-${Date.now()}`
    clearCart()
    router.push(`/${store.slug}/pedido/${orderId}`)
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
          setShowDeliveryDrawer(false)
        }}
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
