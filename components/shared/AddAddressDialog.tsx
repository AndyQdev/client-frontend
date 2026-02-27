'use client'

import { useState, FormEvent } from 'react'
import { X } from 'lucide-react'
import LocationPicker from './LocationPicker'

interface AddAddressDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (addressObject: { name: string; latitude: number; longitude: number }) => void
  themeVariant?: 'classic' | 'modern' | 'elegante' | 'minimal' | 'darkmode' | 'creative' | 'interior'
}

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
    bg: 'bg-zinc-900',
    text: 'text-zinc-100',
    accent: 'bg-purple-600 hover:bg-purple-700',
    border: 'border-zinc-700',
    input: 'border-zinc-700 focus:border-purple-500 focus:ring-purple-500',
  },
  creative: {
    bg: 'bg-orange-50',
    text: 'text-orange-900',
    accent: 'bg-orange-600 hover:bg-orange-700',
    border: 'border-orange-200',
    input: 'border-orange-200 focus:border-orange-500 focus:ring-orange-500',
  },
  interior: {
    bg: 'bg-green-50',
    text: 'text-green-900',
    accent: 'bg-green-700 hover:bg-green-800',
    border: 'border-green-200',
    input: 'border-green-200 focus:border-green-700 focus:ring-green-700',
  },
}

export default function AddAddressDialog({
  isOpen,
  onClose,
  onSave,
  themeVariant = 'classic',
}: AddAddressDialogProps) {
  const [addressName, setAddressName] = useState('')
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 })

  const styles = THEME_STYLES[themeVariant]

  const handleLocationChange = (newAddress: string, newCoords: { lat: number; lng: number }) => {
    setAddress(newAddress)
    setCoordinates(newCoords)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (addressName && coordinates.lat !== 0 && coordinates.lng !== 0) {
      onSave({
        name: addressName,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      })
      // Reset
      setAddressName('')
      setAddress('')
      setCoordinates({ lat: 0, lng: 0 })
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`sticky top-0 ${styles.bg} border-b ${styles.border} p-6 flex items-center justify-between`}>
          <h2 className={`text-2xl font-bold ${styles.text}`}>Agregar Dirección</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nombre de la dirección */}
          <div>
            <label className={`block text-sm font-medium ${styles.text} mb-2`}>
              Nombre de la Dirección *
            </label>
            <input
              type="text"
              value={addressName}
              onChange={(e) => setAddressName(e.target.value)}
              placeholder="Ej: Casa, Oficina, Departamento..."
              required
              className={`w-full px-4 py-3 border ${styles.input} rounded-lg focus:outline-none focus:ring-2`}
            />
            <p className="text-sm text-gray-500 mt-1">
              Dale un nombre para identificar esta dirección fácilmente
            </p>
          </div>

          {/* LocationPicker */}
          <div>
            <label className={`block text-sm font-medium ${styles.text} mb-2`}>
              Ubicación en el Mapa *
            </label>
            <LocationPicker
              address={address}
              onAddressChange={setAddress}
              coordinates={coordinates}
              onLocationChange={setCoordinates}
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
              themeVariant={themeVariant}
            />
            {address && (
              <p className="text-sm text-gray-600 mt-2">
                📍 {address}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!addressName || coordinates.lat === 0}
              className={`flex-1 ${styles.accent} text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Guardar Dirección
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
