'use client'

import { useState, useRef, useEffect } from 'react'
import { User, LogOut, Phone } from 'lucide-react'
import { useCustomer } from '@/lib/customer-context'

interface CustomerPopoverProps {
  onRegisterClick: () => void
  themeVariant?: 'classic' | 'modern' | 'elegante' | 'minimal' | 'darkmode' | 'creative' | 'interior'
}

const THEME_STYLES = {
  classic: {
    button: 'text-amber-800 hover:text-amber-600',
    popover: 'bg-white border-amber-200',
    text: 'text-amber-900',
    textMuted: 'text-amber-600',
    registerBtn: 'bg-amber-600 hover:bg-amber-700 text-white',
    logoutBtn: 'text-amber-600 hover:text-amber-700',
  },
  modern: {
    button: 'text-slate-700 hover:text-blue-600',
    popover: 'bg-white border-slate-200',
    text: 'text-slate-900',
    textMuted: 'text-slate-600',
    registerBtn: 'bg-blue-600 hover:bg-blue-700 text-white',
    logoutBtn: 'text-slate-600 hover:text-slate-700',
  },
  elegante: {
    button: 'text-rose-800 hover:text-rose-600',
    popover: 'bg-white border-rose-200',
    text: 'text-rose-900',
    textMuted: 'text-rose-600',
    registerBtn: 'bg-rose-600 hover:bg-rose-700 text-white',
    logoutBtn: 'text-rose-600 hover:text-rose-700',
  },
  minimal: {
    button: 'text-gray-700 hover:text-gray-900',
    popover: 'bg-white border-gray-200',
    text: 'text-gray-900',
    textMuted: 'text-gray-600',
    registerBtn: 'bg-gray-900 hover:bg-gray-800 text-white',
    logoutBtn: 'text-gray-600 hover:text-gray-700',
  },
  darkmode: {
    button: 'text-white hover:text-emerald-400',
    popover: 'bg-slate-800 border-slate-700',
    text: 'text-white',
    textMuted: 'text-slate-400',
    registerBtn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    logoutBtn: 'text-slate-400 hover:text-slate-300',
  },
  creative: {
    button: 'text-purple-800 hover:text-purple-600',
    popover: 'bg-white border-purple-200',
    text: 'text-purple-900',
    textMuted: 'text-purple-600',
    registerBtn: 'bg-purple-600 hover:bg-purple-700 text-white',
    logoutBtn: 'text-purple-600 hover:text-purple-700',
  },
  interior: {
    button: 'text-stone-800 hover:text-stone-600',
    popover: 'bg-white border-stone-200',
    text: 'text-stone-900',
    textMuted: 'text-stone-600',
    registerBtn: 'bg-stone-700 hover:bg-stone-800 text-white',
    logoutBtn: 'text-stone-600 hover:text-stone-700',
  },
}

export default function CustomerPopover({ onRegisterClick, themeVariant = 'classic' }: CustomerPopoverProps) {
  const { customer, logout } = useCustomer()
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  const styles = THEME_STYLES[themeVariant]

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={popoverRef}>
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.button} transition-colors p-2 relative group`}
      >
        <User className="w-6 h-6" />
        {customer && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        )}
      </button>

      {/* Popover */}
      {isOpen && (
        <div className={`absolute right-0 top-full mt-2 w-72 ${styles.popover} rounded-lg shadow-lg border z-50 overflow-hidden animate-fade-in`}>
          {customer ? (
            // Customer is logged in
            <div className="p-4">
              <div className="flex items-start gap-3 mb-4">
                <div className={`p-2 rounded-full ${themeVariant === 'darkmode' ? 'bg-slate-700' : 'bg-gray-100'}`}>
                  <User className={`w-5 h-5 ${styles.textMuted}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${styles.text} mb-1`}>
                    {customer.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Phone className={`w-4 h-4 ${styles.textMuted}`} />
                    <span className={`text-sm ${styles.textMuted}`}>
                      {customer.phone}
                    </span>
                  </div>
                </div>
              </div>

              <hr className={`my-3 ${themeVariant === 'darkmode' ? 'border-slate-700' : 'border-gray-200'}`} />

              <button
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${styles.logoutBtn} transition-colors text-sm font-medium`}
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          ) : (
            // No customer logged in
            <div className="p-4">
              <h3 className={`font-semibold ${styles.text} mb-2`}>
                Bienvenido
              </h3>
              <p className={`text-sm ${styles.textMuted} mb-4`}>
                Regístrate para realizar pedidos y acceder a beneficios exclusivos
              </p>
              <button
                onClick={() => {
                  onRegisterClick()
                  setIsOpen(false)
                }}
                className={`w-full ${styles.registerBtn} px-4 py-2 rounded-lg font-semibold transition-colors`}
              >
                Crear Cuenta
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
