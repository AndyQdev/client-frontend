import { apiClient } from '../client'
import { ResponseMessage } from '../types'

export interface CustomerAddress {
  name: string
  latitude: number
  longitude: number
}

export interface CreateCustomerData {
  name: string
  phone: string
  country: string
  email?: string
  addresses?: CustomerAddress[]
}

export interface CustomerEntity {
  id: string
  name: string
  phone: string
  email?: string
  country?: string
  addresses?: CustomerAddress[]
  createdAt: string
  updatedAt: string
}

export class CustomerService {
  private readonly basePath = '/customer'

  /**
   * Create customer by store ID (Public endpoint - No auth required)
   * Este endpoint es público y no requiere autenticación
   */
  async createByStore(storeId: string, customerData: CreateCustomerData): Promise<CustomerEntity> {
    const response = await apiClient.post<ResponseMessage<CustomerEntity>>(
      `${this.basePath}/store/${storeId}`,
      customerData
    )
    return response.data.data
  }

  /**
   * Update customer addresses
   */
  async updateAddresses(customerId: string, addresses: CustomerAddress[]): Promise<CustomerEntity> {
    const response = await apiClient.patch<ResponseMessage<CustomerEntity>>(
      `${this.basePath}/${customerId}`,
      { addresses }
    )
    return response.data.data
  }

  /**
   * Add a new address to customer (public endpoint)
   */
  async addAddress(
    customerId: string, 
    address: { name: string; latitude: number; longitude: number }
  ): Promise<CustomerEntity> {
    const response = await apiClient.patch<ResponseMessage<CustomerEntity>>(
      `${this.basePath}/${customerId}/address`,
      address
    )
    return response.data.data
  }
}

export const customerService = new CustomerService()
