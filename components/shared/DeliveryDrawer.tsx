'use client'

import { useState, useEffect } from 'react'
import { X, MapPin, Package, ChevronDown } from 'lucide-react'
import { CustomerAddress } from '@/lib/api/services/customer.service'

// Declaración global para Google Maps
declare global {
  interface Window {
    google: any
  }
}

interface DeliveryDrawerProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (selectedAddress: CustomerAddress, deliveryCost: number) => void
  storeCoordinates?: { latitude: number; longitude: number }
  customerAddresses: CustomerAddress[]
  onAddAddress: () => void
  themeVariant?: 'classic' | 'modern' | 'elegante' | 'minimal' | 'darkmode' | 'creative' | 'interior'
  cartItems?: Array<{ product: { name: string; price: number }; quantity: number }>
  subtotal?: number
  onCreateOrder?: () => Promise<void> // Función para crear la orden
  isCreatingOrder?: boolean // Estado de loading
  onDeliveryCostCalculated?: (cost: number) => void // Callback para actualizar costo en componente padre
}

const THEME_STYLES = {
  classic: {
    bg: 'bg-amber-50',
    text: 'text-amber-900',
    accent: 'bg-amber-600 hover:bg-amber-700',
    border: 'border-amber-200',
    input: 'border-amber-200 focus:border-amber-500',
    header: 'bg-gradient-to-r from-amber-600 to-amber-700',
  },
  modern: {
    bg: 'bg-slate-50',
    text: 'text-slate-900',
    accent: 'bg-blue-600 hover:bg-blue-700',
    border: 'border-slate-200',
    input: 'border-slate-200 focus:border-blue-500',
    header: 'bg-gradient-to-r from-blue-600 to-blue-700',
  },
  elegante: {
    bg: 'bg-rose-50',
    text: 'text-rose-900',
    accent: 'bg-rose-600 hover:bg-rose-700',
    border: 'border-rose-200',
    input: 'border-rose-200 focus:border-rose-500',
    header: 'bg-gradient-to-r from-rose-600 to-rose-700',
  },
  minimal: {
    bg: 'bg-gray-50',
    text: 'text-gray-900',
    accent: 'bg-gray-900 hover:bg-gray-800',
    border: 'border-gray-200',
    input: 'border-gray-200 focus:border-gray-900',
    header: 'bg-gray-900',
  },
  darkmode: {
    bg: 'bg-zinc-900',
    text: 'text-zinc-100',
    accent: 'bg-purple-600 hover:bg-purple-700',
    border: 'border-zinc-700',
    input: 'border-zinc-700 focus:border-purple-500',
    header: 'bg-gradient-to-r from-purple-600 to-purple-700',
  },
  creative: {
    bg: 'bg-orange-50',
    text: 'text-orange-900',
    accent: 'bg-orange-600 hover:bg-orange-700',
    border: 'border-orange-200',
    input: 'border-orange-200 focus:border-orange-500',
    header: 'bg-gradient-to-r from-orange-600 to-orange-700',
  },
  interior: {
    bg: 'bg-green-50',
    text: 'text-green-900',
    accent: 'bg-green-700 hover:bg-green-800',
    border: 'border-green-200',
    input: 'border-green-200 focus:border-green-700',
    header: 'bg-gradient-to-r from-green-700 to-green-800',
  },
}

// Haversine formula para calcular distancia entre dos coordenadas
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371 // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Calcular costo de envío: Base 5 + (distancia * 2), redondeado
function calculateDeliveryCost(distanceKm: number): number {
  return Math.round(5 + distanceKm * 2)
}

export default function DeliveryDrawer({
  isOpen,
  onClose,
  onConfirm,
  storeCoordinates,
  customerAddresses,
  onAddAddress,
  themeVariant = 'classic',
  cartItems = [],
  subtotal = 0,
  onCreateOrder,
  isCreatingOrder = false,
  onDeliveryCostCalculated,
}: DeliveryDrawerProps) {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0)
  const [distance, setDistance] = useState<number>(0)
  const [deliveryCost, setDeliveryCost] = useState<number>(0)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false)

  const styles = THEME_STYLES[themeVariant]

  // Cargar Google Maps Script
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    
    if (!window.google && apiKey) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => setIsGoogleMapsLoaded(true)
      document.head.appendChild(script)
    } else if (window.google) {
      setIsGoogleMapsLoaded(true)
    }
  }, [])

  // Calcular distancia y costo cuando cambia la dirección seleccionada
  useEffect(() => {
    if (
      storeCoordinates &&
      customerAddresses.length > 0 &&
      customerAddresses[selectedAddressIndex]
    ) {
      const customerAddr = customerAddresses[selectedAddressIndex]
      const dist = calculateDistance(
        storeCoordinates.latitude,
        storeCoordinates.longitude,
        customerAddr.latitude,
        customerAddr.longitude
      )
      setDistance(dist)
      const calculatedCost = calculateDeliveryCost(dist)
      setDeliveryCost(calculatedCost)
      
      // Actualizar estado en componente padre
      if (onDeliveryCostCalculated) {
        onDeliveryCostCalculated(calculatedCost)
      }
    }
  }, [selectedAddressIndex, storeCoordinates, customerAddresses, onDeliveryCostCalculated])

  // Cargar Google Maps y mostrar ruta
  useEffect(() => {
    if (
      !isOpen ||
      !isGoogleMapsLoaded ||
      !storeCoordinates ||
      customerAddresses.length === 0 ||
      mapLoaded
    )
      return

    const loadMap = () => {
      if (!window.google) {
        console.error('Google Maps no está cargado')
        return
      }

      const customerAddr = customerAddresses[selectedAddressIndex]
      if (!customerAddr) return

      const mapElement = document.getElementById('delivery-map')
      if (!mapElement) return

      // Crear mapa centrado entre store y customer
      const centerLat = (storeCoordinates.latitude + customerAddr.latitude) / 2
      const centerLng = (storeCoordinates.longitude + customerAddr.longitude) / 2

      const map = new window.google.maps.Map(mapElement, {
        zoom: 13,
        center: { lat: centerLat, lng: centerLng },
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      })

      // Marker de la tienda
      new window.google.maps.Marker({
        position: {
          lat: storeCoordinates.latitude,
          lng: storeCoordinates.longitude,
        },
        map,
        title: 'Tienda',
        label: 'T',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        },
      })

      // Marker del cliente
      new window.google.maps.Marker({
        position: { lat: customerAddr.latitude, lng: customerAddr.longitude },
        map,
        title: customerAddr.name,
        label: 'C',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        },
      })

      // Dibujar ruta
      const directionsService = new window.google.maps.DirectionsService()
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        map,
        suppressMarkers: true, // Ya tenemos nuestros markers
        polylineOptions: {
          strokeColor: '#4F46E5',
          strokeWeight: 5,
        },
      })

      directionsService.route(
        {
          origin: {
            lat: storeCoordinates.latitude,
            lng: storeCoordinates.longitude,
          },
          destination: { lat: customerAddr.latitude, lng: customerAddr.longitude },
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result: any, status: any) => {
          if (status === 'OK' && result) {
            directionsRenderer.setDirections(result)
          } else {
            console.error('Error al obtener direcciones:', status)
          }
        }
      )

      setMapLoaded(true)
    }

    // Esperar un poco para que el drawer se abra
    setTimeout(loadMap, 300)
  }, [isOpen, isGoogleMapsLoaded, storeCoordinates, customerAddresses, selectedAddressIndex, mapLoaded])

  // Reset al cerrar
  useEffect(() => {
    if (!isOpen) {
      setMapLoaded(false)
    }
  }, [isOpen])

  const handleConfirm = async () => {
    if (customerAddresses[selectedAddressIndex]) {
      onConfirm(customerAddresses[selectedAddressIndex], deliveryCost)
      
      // Si hay función de crear orden, ejecutarla
      if (onCreateOrder) {
        await onCreateOrder()
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute bottom-0 right-0 w-full md:w-[600px] h-[90vh] bg-white shadow-xl transform transition-transform">
        {/* Header */}
        <div className={`${styles.header} p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Package className="w-6 h-6" />
              <div>
                <h2 className="text-xl font-bold">Calcular Envío</h2>
                <p className="text-sm opacity-90">Selecciona tu dirección de entrega</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto h-[calc(90vh-180px)]">
          {customerAddresses.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className={`w-16 h-16 ${styles.text} mx-auto mb-4 opacity-50`} />
              <h3 className={`text-lg font-semibold ${styles.text} mb-2`}>
                No tienes direcciones guardadas
              </h3>
              <p className="text-gray-600 mb-6">
                Agrega una dirección para calcular el costo de envío
              </p>
              <button
                onClick={onAddAddress}
                className={`${styles.accent} text-white px-6 py-3 rounded-lg font-medium transition-colors`}
              >
                Agregar Dirección
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Selector de dirección */}
              <div>
                <label className={`block text-sm font-medium ${styles.text} mb-2`}>
                  Dirección de Entrega
                </label>
                <div className="relative">
                  <select
                    value={selectedAddressIndex}
                    onChange={(e) => {
                      setSelectedAddressIndex(Number(e.target.value))
                      setMapLoaded(false) // Recargar mapa
                    }}
                    className={`w-full px-4 py-3 border ${styles.border} ${styles.input} rounded-lg appearance-none pr-10`}
                  >
                    {customerAddresses.map((addr, index) => (
                      <option key={index} value={index}>
                        {addr.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                <button
                  onClick={onAddAddress}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  + Agregar otra dirección
                </button>
              </div>

              {/* Mapa */}
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${styles.text}`}>
                  Ruta de Entrega
                </label>
                <div
                  id="delivery-map"
                  className="w-full h-64 bg-gray-100 rounded-lg border-2 border-gray-200"
                />
              </div>

              {/* Información de distancia y resumen de costos */}
              <div className={`${styles.bg} border-2 ${styles.border} rounded-lg p-4 space-y-3`}>
                {/* Distancia */}
                <div className="flex justify-between items-center pb-3 border-b border-gray-300" style={{ fontVariantNumeric: 'lining-nums' }}>
                  <span className="text-sm font-medium text-gray-600">Distancia:</span>
                  <span className={`font-semibold ${styles.text}`}>
                    {distance.toFixed(2)} km
                  </span>
                </div>

                {/* Productos */}
                <div className="space-y-2 py-2" style={{ fontVariantNumeric: 'lining-nums' }}>
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">
                        {item.product.name} (x{item.quantity})
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        Bs {(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Costo de Envío */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-300" style={{ fontVariantNumeric: 'lining-nums' }}>
                  <span className="text-sm font-medium text-gray-600">Costo de Envío:</span>
                  <span className={`font-semibold ${styles.text}`}>
                    Bs {deliveryCost.toFixed(2)}
                  </span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-3 border-t-2 border-gray-400" style={{ fontVariantNumeric: 'lining-nums' }}>
                  <span className="text-lg font-bold text-gray-700">Total:</span>
                  <span className={`text-2xl font-bold ${styles.text}`}>
                    Bs {(subtotal + deliveryCost).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {customerAddresses.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200">
            <button
              onClick={handleConfirm}
              disabled={isCreatingOrder}
              className={`w-full ${styles.accent} text-white py-4 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
              style={{ fontVariantNumeric: 'lining-nums' }}
            >
              {isCreatingOrder ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </>
              ) : (
                `Confirmar Pedido (Bs ${(subtotal + deliveryCost).toFixed(2)})`
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
