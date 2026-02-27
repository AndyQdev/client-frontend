import { apiClient } from '../client'
import { ResponseMessage, ProductEntity, InventoryEntity } from '../types'

export interface ProductFilters {
  limit?: number
  offset?: number
  order?: 'ASC' | 'DESC'
  orderBy?: string
  search?: string
  categoryId?: string
  brandId?: string
  minPrice?: number
  maxPrice?: number
  minStock?: number
  maxStock?: number
}

export class ProductService {
  private readonly basePath = '/product'

  /**
   * Get all products by store ID with filters
   * Ahora devuelve inventarios con product anidado
   */
  async findByStore(storeId: string, filters?: ProductFilters): Promise<{ data: InventoryEntity[], countData: number }> {
    const response = await apiClient.get<ResponseMessage<InventoryEntity[]>>(
      `${this.basePath}/store/${storeId}`,
      { params: filters }
    )
    return {
      data: response.data.data,
      countData: response.data.countData || response.data.data.length
    }
  }

  /**
   * Get product by ID
   */
  async findById(id: string): Promise<ProductEntity> {
    const response = await apiClient.get<ResponseMessage<ProductEntity>>(
      `${this.basePath}/${id}`
    )
    return response.data.data
  }

  /**
   * Get product by store and product ID (Public endpoint - No auth required)
   * Este endpoint es público y no requiere autenticación
   */
  async findProductByStore(storeId: string, productId: string): Promise<any> {
    const response = await apiClient.get<ResponseMessage<any>>(
      `${this.basePath}/store/${storeId}/product/${productId}`
    )
    return response.data.data
  }
}

export const productService = new ProductService()
