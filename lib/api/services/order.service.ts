import { apiClient } from '../client'
import { ResponseMessage } from '../types'

export interface DeliveryInfo {
  address: string
  cost: number
  notes?: string
}

export interface OrderItem {
  storeProductId: string
  quantity: number
  price: number
}

export interface CreateOrderDto {
  totalAmount: number
  type: 'quick' | 'delivery' | 'installment'
  paymentMethod: string
  paymentDate: string
  totalReceived: number
  deliveryInfo?: DeliveryInfo
  customerId: string
  items: OrderItem[]
  notes?: string
}

export interface OrderEntity {
  id: string
  totalAmount: number
  status: string
  type: string
  paymentMethod: string
  paymentDate: string
  totalReceived: number
  deliveryInfo?: DeliveryInfo
  customerId: string
  storeId: string
  items: any[]
  createdAt: string
}

class OrderService {
  private basePath = '/order'

  /**
   * Create order from store (public endpoint)
   */
  async createFromStore(
    storeId: string,
    orderData: CreateOrderDto
  ): Promise<OrderEntity> {
    const response = await apiClient.post<ResponseMessage<OrderEntity>>(
      `${this.basePath}/store/${storeId}`,
      orderData
    )
    return response.data.data
  }

  /**
   * Get order from store (public endpoint)
   */
  async getOrderFromStore(
    storeId: string,
    orderId: string
  ): Promise<OrderEntity> {
    const response = await apiClient.get<ResponseMessage<OrderEntity>>(
      `${this.basePath}/store/${storeId}/${orderId}`
    )
    return response.data.data
  }
}

export const orderService = new OrderService()
