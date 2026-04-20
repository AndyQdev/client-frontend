'use client'

import { useState, FormEvent, useEffect } from 'react'
import { X, MapPin, Plus, Check } from 'lucide-react'
import LocationPicker from './LocationPicker'
import { useCustomer } from '@/lib/customer-context'
import type { CustomerAddress } from '@/lib/api/services/customer.service'

interface CustomerDrawerProps {
  isOpen: boolean
  onClose: () => void
  storeId: string
  onComplete?: () => void
  themeVariant?: 'classic' | 'modern' | 'elegante' | 'minimal' | 'darkmode' | 'creative' | 'interior'
}

const COUNTRY_CODES = [
  { code: '+1', country: 'Estados Unidos/Canadá', flag: '🇺🇸' },
  { code: '+52', country: 'México', flag: '🇲🇽' },
  { code: '+34', country: 'España', flag: '🇪🇸' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
  { code: '+56', country: 'Chile', flag: '🇨🇱' },
  { code: '+57', country: 'Colombia', flag: '🇨🇴' },
  { code: '+51', country: 'Perú', flag: '🇵🇪' },
  { code: '+58', country: 'Venezuela', flag: '🇻🇪' },
  { code: '+593', country: 'Ecuador', flag: '🇪🇨' },
  { code: '+591', country: 'Bolivia', flag: '🇧🇴' },
  { code: '+595', country: 'Paraguay', flag: '🇵🇾' },
  { code: '+598', country: 'Uruguay', flag: '🇺🇾' },
]

const THEME_STYLES = {
  classic: {
    bg: 'bg-amber-50',
    text: 'text-amber-900',
    accent: 'bg-amber-600 hover:bg-amber-700',
    border: 'border-amber-200',
    input: 'border-amber-200 focus:border-amber-500 focus:ring-amber-500',
    selected: 'border-amber-600 bg-amber-100',
  },
  modern: {
    bg: 'bg-slate-50',
    text: 'text-slate-900',
    accent: 'bg-blue-600 hover:bg-blue-700',
    border: 'border-slate-200',
    input: 'border-slate-200 focus:border-blue-500 focus:ring-blue-500',
    selected: 'border-blue-600 bg-blue-100',
  },
  elegante: {
    bg: 'bg-rose-50',
    text: 'text-rose-900',
    accent: 'bg-rose-600 hover:bg-rose-700',
    border: 'border-rose-200',
    input: 'border-rose-200 focus:border-rose-500 focus:ring-rose-500',
    selected: 'border-rose-600 bg-rose-100',
  },
  minimal: {
    bg: 'bg-gray-50',
    text: 'text-gray-900',
    accent: 'bg-gray-900 hover:bg-gray-800',
    border: 'border-gray-200',
    input: 'border-gray-200 focus:border-gray-900 focus:ring-gray-900',
    selected: 'border-gray-900 bg-gray-200',
  },
  darkmode: {
    bg: 'bg-slate-900',
    text: 'text-white',
    accent: 'bg-emerald-600 hover:bg-emerald-700',
    border: 'border-slate-700',
    input: 'border-slate-700 bg-slate-800 text-white focus:border-emerald-500 focus:ring-emerald-500',
    selected: 'border-emerald-500 bg-slate-800',
  },
  creative: {
    bg: 'bg-purple-50',
    text: 'text-purple-900',
    accent: 'bg-purple-600 hover:bg-purple-700',
    border: 'border-purple-200',
    input: 'border-purple-200 focus:border-purple-500 focus:ring-purple-500',
    selected: 'border-purple-600 bg-purple-100',
  },
  interior: {
    bg: 'bg-stone-50',
    text: 'text-stone-900',
    accent: 'bg-stone-700 hover:bg-stone-800',
    border: 'border-stone-200',
    input: 'border-stone-200 focus:border-stone-500 focus:ring-stone-500',
    selected: 'border-stone-700 bg-stone-200',
  },
}

type Step = 'data' | 'addresses' | 'newAddress'

export default function CustomerDrawer({ isOpen, onClose, storeId, onComplete, themeVariant = 'classic' }: CustomerDrawerProps) {
  const { customer, identify, addAddress } = useCustomer()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('+52')
  const [address, setAddress] = useState('')
  const [locationName, setLocationName] = useState('')
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState<Step>('data')
  const [existingAddresses, setExistingAddresses] = useState<CustomerAddress[]>([])

  const styles = THEME_STYLES[themeVariant]
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

  // Pre-llenar el formulario si ya hay un cliente logueado
  useEffect(() => {
    if (isOpen && customer) {
      setName(customer.name)
      setPhone(customer.phone)
      if (customer.country) setCountryCode(customer.country)
    }
  }, [isOpen, customer])

  const resetForm = () => {
    setName('')
    setPhone('')
    setCountryCode('+52')
    setAddress('')
    setLocationName('')
    setCoordinates({ lat: 0, lng: 0 })
    setStep('data')
    setExistingAddresses([])
    setError('')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleNext = async () => {
    setError('')
    if (!name.trim() || !phone.trim()) {
      setError('Por favor completa todos los campos')
      return
    }

    try {
      setIsSubmitting(true)
      const result = await identify(storeId, name.trim(), phone.trim(), countryCode)
      const addresses = result.addresses || []
      setExistingAddresses(addresses)
      setStep(addresses.length > 0 ? 'addresses' : 'newAddress')
    } catch (err) {
      setError('No pudimos guardar tus datos. Intenta de nuevo.')
      console.error('Error identifying customer:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddNewAddress = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (coordinates.lat === 0 && coordinates.lng === 0) {
      setError('Selecciona la ubicación en el mapa')
      return
    }

    try {
      setIsSubmitting(true)
      await addAddress({
        name: locationName.trim() || 'Mi dirección',
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      })
      finish()
    } catch (err) {
      setError('No pudimos guardar la dirección. Intenta de nuevo.')
      console.error('Error adding address:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFinishWithExisting = () => {
    finish()
  }

  const finish = () => {
    resetForm()
    onClose()
    onComplete?.()
  }

  if (!isOpen) return null

  const headerTitle =
    step === 'data'
      ? customer ? 'Confirmar tus datos' : 'Identifícate'
      : step === 'addresses'
        ? 'Tus direcciones'
        : 'Agregar dirección'

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={handleClose}
      />

      <div className={`fixed bottom-0 left-0 right-0 ${styles.bg} rounded-t-3xl shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'} max-h-[90vh] overflow-y-auto`}>
        <div className="max-w-2xl mx-auto w-full px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${styles.text}`}>{headerTitle}</h2>
            <button
              onClick={handleClose}
              className={`p-2 ${styles.text} hover:opacity-70 transition-opacity`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {step === 'data' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium ${styles.text} mb-2`}>
                  Nombre Completo
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Juan Pérez"
                  className={`w-full px-4 py-3 rounded-lg border ${styles.input} focus:outline-none focus:ring-2 transition-colors`}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label htmlFor="country" className={`block text-sm font-medium ${styles.text} mb-2`}>
                    País
                  </label>
                  <select
                    id="country"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className={`w-full px-3 py-3 rounded-lg border ${styles.input} focus:outline-none focus:ring-2 transition-colors text-sm`}
                    disabled={isSubmitting}
                  >
                    {COUNTRY_CODES.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.code}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label htmlFor="phone" className={`block text-sm font-medium ${styles.text} mb-2`}>
                    Número de Teléfono
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="1234567890"
                    className={`w-full px-4 py-3 rounded-lg border ${styles.input} focus:outline-none focus:ring-2 transition-colors`}
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className={`w-full ${styles.accent} text-white px-6 py-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? 'Buscando...' : 'Siguiente'}
              </button>

              <p className={`text-center text-sm ${styles.text} opacity-70`}>
                Si ya te has registrado, cargaremos tus direcciones automáticamente
              </p>
            </div>
          )}

          {step === 'addresses' && (
            <div className="space-y-4">
              <p className={`text-sm ${styles.text} opacity-80`}>
                ¡Hola de nuevo! Estas son las direcciones que tenemos registradas.
              </p>

              <div className="space-y-2">
                {existingAddresses.map((addr, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 ${styles.border} bg-white/50`}
                  >
                    <MapPin className={`w-5 h-5 ${styles.text} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${styles.text} truncate`}>{addr.name}</p>
                      <p className={`text-xs ${styles.text} opacity-60 truncate`}>
                        {addr.latitude.toFixed(5)}, {addr.longitude.toFixed(5)}
                      </p>
                    </div>
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setStep('newAddress')}
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 border-2 ${styles.border} ${styles.text} px-6 py-3 rounded-lg font-semibold transition-colors hover:opacity-80 disabled:opacity-50`}
              >
                <Plus className="w-5 h-5" />
                Agregar otra dirección
              </button>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleFinishWithExisting}
                disabled={isSubmitting}
                className={`w-full ${styles.accent} text-white px-6 py-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Listo
              </button>
            </div>
          )}

          {step === 'newAddress' && (
            <form onSubmit={handleAddNewAddress} className="space-y-4">
              <div>
                <label htmlFor="locationName" className={`block text-sm font-medium ${styles.text} mb-2`}>
                  Nombre de la Ubicación
                </label>
                <input
                  id="locationName"
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="Ej: Casa, Oficina, Trabajo..."
                  className={`w-full px-4 py-3 rounded-lg border ${styles.input} focus:outline-none focus:ring-2 transition-colors`}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${styles.text} mb-2`}>
                  Ubicación en el Mapa
                </label>
                <LocationPicker
                  address={address}
                  onAddressChange={setAddress}
                  coordinates={coordinates}
                  onLocationChange={setCoordinates}
                  apiKey={apiKey}
                  themeVariant={themeVariant}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(existingAddresses.length > 0 ? 'addresses' : 'data')}
                  disabled={isSubmitting}
                  className={`flex-1 border-2 ${styles.border} ${styles.text} px-6 py-4 rounded-lg font-semibold transition-colors hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 ${styles.accent} text-white px-6 py-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? 'Guardando...' : 'Guardar y continuar'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
