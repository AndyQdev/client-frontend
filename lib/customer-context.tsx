'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { customerService, CustomerEntity, CustomerAddress } from '@/lib/api/services/customer.service'

interface CustomerContextType {
  customer: CustomerEntity | null
  isLoading: boolean
  login: (storeId: string, name: string, phone: string, country: string, addressObject?: { name: string; latitude: number; longitude: number }) => Promise<void>
  logout: () => void
  addAddress: (address: CustomerAddress) => Promise<void>
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined)

const CUSTOMER_STORAGE_KEY = 'customer_data'

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<CustomerEntity | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Cargar cliente del localStorage al montar
  useEffect(() => {
    const loadCustomer = () => {
      try {
        const stored = localStorage.getItem(CUSTOMER_STORAGE_KEY)
        if (stored) {
          setCustomer(JSON.parse(stored))
        }
      } catch (error) {
        console.error('Error loading customer from localStorage:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCustomer()
  }, [])

  const login = async (storeId: string, name: string, phone: string, country: string, addressObject?: { name: string; latitude: number; longitude: number }) => {
    try {
      setIsLoading(true)
      
      // Construir addresses array si se proporciona un addressObject
      const addresses = addressObject ? [addressObject] : undefined
      
      const newCustomer = await customerService.createByStore(storeId, {
        name,
        phone,
        country,
        addresses,
      })
      
      setCustomer(newCustomer)
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(newCustomer))
    } catch (error) {
      console.error('Error creating customer:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setCustomer(null)
    localStorage.removeItem(CUSTOMER_STORAGE_KEY)
  }

  const addAddress = async (address: CustomerAddress) => {
    if (!customer) {
      throw new Error('No customer logged in')
    }

    try {
      setIsLoading(true)
      // Usar el nuevo endpoint público que solo agrega la dirección
      const updatedCustomer = await customerService.addAddress(
        customer.id,
        address
      )
      setCustomer(updatedCustomer)
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(updatedCustomer))
    } catch (error) {
      console.error('Error adding address:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CustomerContext.Provider value={{ customer, isLoading, login, logout, addAddress }}>
      {children}
    </CustomerContext.Provider>
  )
}

export function useCustomer() {
  const context = useContext(CustomerContext)
  if (context === undefined) {
    throw new Error('useCustomer must be used within a CustomerProvider')
  }
  return context
}
