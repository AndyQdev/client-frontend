import { useState, useEffect } from 'react'
import { CustomerAddress } from '@/lib/api/services/customer.service'

interface DeliveryConfig {
  type: 'pending' | 'free' | 'fixed' | 'calculated'
  value: number
}

interface UseDeliveryProps {
  deliveryConfig?: DeliveryConfig
  storeCoordinates?: { latitude: number; longitude: number }
}

export function useDelivery({ deliveryConfig, storeCoordinates }: UseDeliveryProps) {
  const [deliveryCost, setDeliveryCost] = useState(0)
  const [selectedAddress, setSelectedAddress] = useState<CustomerAddress | null>(null)
    console.log('useDelivery - deliveryConfig:', deliveryConfig)
    console.log('useDelivery - storeCoordinates:', storeCoordinates)
  // Obtener el tipo de delivery
  const getDeliveryType = () => {
    if (!deliveryConfig) return 'pending'
    return deliveryConfig.type
  }

  // Mostrar texto de envío según el tipo
  const getDeliveryText = () => {
    const type = getDeliveryType()
    
    if (type === 'free') return 'Gratis'
    if (type === 'pending') return 'Por Definir'
    if (type === 'fixed') return `Bs ${deliveryConfig!.value.toFixed(2)}`
    if (type === 'calculated') {
      if (deliveryCost > 0) return `Bs ${deliveryCost.toFixed(2)}`
      return 'El sistema lo calcula'
    }
    
    return 'Por Definir'
  }

  // Establecer costo de envío según el tipo (fixed y free)
  useEffect(() => {
    const type = getDeliveryType()
    if (type === 'fixed' && deliveryConfig) {
      setDeliveryCost(deliveryConfig.value)
    } else if (type === 'free' || type === 'pending') {
      setDeliveryCost(0)
    }
  }, [deliveryConfig])

  const handleDeliveryConfirm = (address: CustomerAddress, cost: number) => {
    setSelectedAddress(address)
    setDeliveryCost(cost)
  }

  const shouldShowDeliveryDrawer = (isCustomerLoggedIn: boolean) => {
    return isCustomerLoggedIn && getDeliveryType() === 'calculated' && deliveryCost === 0
  }

  return {
    deliveryCost,
    selectedAddress,
    getDeliveryType,
    getDeliveryText,
    handleDeliveryConfirm,
    shouldShowDeliveryDrawer,
  }
}
