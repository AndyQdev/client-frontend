'use client'

import { useState, FormEvent } from 'react'
import { X } from 'lucide-react'
import LocationPicker from './LocationPicker'

interface CustomerDrawerProps {
  isOpen: boolean
  onClose: () => void
  onRegister: (name: string, phone: string, country: string, addressObject?: { name: string; latitude: number; longitude: number }) => Promise<void>
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
  },
  modern: {
    bg: 'bg-slate-50',
    text: 'text-slate-900',
    accent: 'bg-blue-600 hover:bg-blue-700',
    border: 'border-slate-200',
    input: 'border-slate-200 focus:border-blue-500 focus:ring-blue-500',
  },
  elegante: {
    bg: 'bg-rose-50',
    text: 'text-rose-900',
    accent: 'bg-rose-600 hover:bg-rose-700',
    border: 'border-rose-200',
    input: 'border-rose-200 focus:border-rose-500 focus:ring-rose-500',
  },
  minimal: {
    bg: 'bg-gray-50',
    text: 'text-gray-900',
    accent: 'bg-gray-900 hover:bg-gray-800',
    border: 'border-gray-200',
    input: 'border-gray-200 focus:border-gray-900 focus:ring-gray-900',
  },
  darkmode: {
    bg: 'bg-slate-900',
    text: 'text-white',
    accent: 'bg-emerald-600 hover:bg-emerald-700',
    border: 'border-slate-700',
    input: 'border-slate-700 bg-slate-800 text-white focus:border-emerald-500 focus:ring-emerald-500',
  },
  creative: {
    bg: 'bg-purple-50',
    text: 'text-purple-900',
    accent: 'bg-purple-600 hover:bg-purple-700',
    border: 'border-purple-200',
    input: 'border-purple-200 focus:border-purple-500 focus:ring-purple-500',
  },
  interior: {
    bg: 'bg-stone-50',
    text: 'text-stone-900',
    accent: 'bg-stone-700 hover:bg-stone-800',
    border: 'border-stone-200',
    input: 'border-stone-200 focus:border-stone-500 focus:ring-stone-500',
  },
}

export default function CustomerDrawer({ isOpen, onClose, onRegister, themeVariant = 'classic' }: CustomerDrawerProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('+52')
  const [address, setAddress] = useState('')
  const [locationName, setLocationName] = useState('')
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1) // 1 = datos básicos, 2 = dirección

  const styles = THEME_STYLES[themeVariant]
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

  const handleNext = () => {
    setError('')
    if (!name.trim() || !phone.trim()) {
      setError('Por favor completa todos los campos')
      return
    }
    setStep(2)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      setIsSubmitting(true)
      // Construir objeto de dirección si hay coordenadas
      const addressObject = coordinates.lat !== 0 && coordinates.lng !== 0 ? {
        name: locationName.trim() || 'Mi dirección',
        latitude: coordinates.lat,
        longitude: coordinates.lng
      } : undefined
      
      await onRegister(name.trim(), phone.trim(), countryCode, addressObject)
      
      // Reset form
      setName('')
      setPhone('')
      setCountryCode('+52')
      setAddress('')
      setLocationName('')
      setCoordinates({ lat: 0, lng: 0 })
      setStep(1)
      onClose()
    } catch (err) {
      setError('Error al registrar. Por favor intenta de nuevo.')
      console.error('Error registering customer:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setStep(1)
    setError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={handleClose}
      />

      {/* Drawer */}
      <div className={`fixed bottom-0 left-0 right-0 ${styles.bg} rounded-t-3xl shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-2xl mx-auto w-full px-6 py-6">
          {/* Header - Fixed */}
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${styles.text}`}>
              {step === 1 ? 'Registrarse' : 'Dirección de Entrega'}
            </h2>
            <button
              onClick={handleClose}
              className={`p-2 ${styles.text} hover:opacity-70 transition-opacity`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Paso 1: Datos Básicos */}
          {step === 1 && (
            <div className="space-y-4">
              {/* Name Input */}
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

              {/* Country Code y Phone en la misma fila */}
              <div className="grid grid-cols-3 gap-3">
                {/* Country Code Select */}
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

                {/* Phone Input */}
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

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Botón Siguiente */}
              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className={`w-full ${styles.accent} text-white px-6 py-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Siguiente
              </button>

              {/* Info */}
              <p className={`text-center text-sm ${styles.text} opacity-70`}>
                Tus datos se guardarán de forma segura
              </p>
            </div>
          )}

          {/* Paso 2: Dirección */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nombre de la ubicación */}
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

              {/* Location Picker */}
              <div>
                <label className={`block text-sm font-medium ${styles.text} mb-2`}>
                  Ubicación en el Mapa (Opcional)
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

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Botones */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
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
                  {isSubmitting ? 'Registrando...' : 'Crear Cuenta'}
                </button>
              </div>

              {/* Info */}
              <p className={`text-center text-sm ${styles.text} opacity-70`}>
                Puedes omitir la dirección si lo prefieres
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
