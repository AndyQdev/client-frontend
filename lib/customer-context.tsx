'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { customerService, CustomerEntity, CustomerAddress } from '@/lib/api/services/customer.service'

interface CustomerContextType {
  customer: CustomerEntity | null
  isLoading: boolean
  identify: (storeId: string, name: string, phone: string, country: string) => Promise<CustomerEntity>
  login: (storeId: string, name: string, phone: string, country: string, addressObject?: { name: string; latitude: number; longitude: number }) => Promise<void>
  logout: () => void
  addAddress: (address: CustomerAddress) => Promise<CustomerEntity>
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

  const persistCustomer = (next: CustomerEntity) => {
    setCustomer(next)
    localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(next))
  }

  const addAddressInternal = async (customerId: string, address: CustomerAddress) => {
    const updated = await customerService.addAddress(customerId, address)
    persistCustomer(updated)
    return updated
  }

  const identify = async (storeId: string, name: string, phone: string, country: string) => {
    try {
      setIsLoading(true)
      // Upsert por country+phone+storeOwner. NO mandamos addresses para no pisar las existentes.
      const next = await customerService.createByStore(storeId, { name, phone, country })
      persistCustomer(next)
      return next
    } catch (error) {
      console.error('Error identifying customer:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (storeId: string, name: string, phone: string, country: string, addressObject?: { name: string; latitude: number; longitude: number }) => {
    const next = await identify(storeId, name, phone, country)
    if (addressObject) {
      const alreadyExists = next.addresses?.some(
        (a) => a.latitude === addressObject.latitude && a.longitude === addressObject.longitude,
      )
      if (!alreadyExists) {
        await addAddressInternal(next.id, addressObject)
      }
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
      return await addAddressInternal(customer.id, address)
    } catch (error) {
      console.error('Error adding address:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CustomerContext.Provider value={{ customer, isLoading, identify, login, logout, addAddress }}>
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
