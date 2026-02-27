import { apiClient } from '../client'
import { ResponseMessage, CategoryEntity } from '../types'

export interface CategoryFilters {
  limit?: number
  offset?: number
  order?: 'ASC' | 'DESC'
  attr?: string
  value?: string
}

export class CategoryService {
  private readonly basePath = '/category'

  /**
   * Get all categories by store ID (Public endpoint - No auth required)
   * Este endpoint es público y no requiere autenticación
   */
  async findByStore(storeId: string, filters?: CategoryFilters): Promise<{ data: CategoryEntity[], countData: number }> {
    const response = await apiClient.get<ResponseMessage<CategoryEntity[]>>(
      `${this.basePath}/store/${storeId}`,
      { params: filters }
    )
    return {
      data: response.data.data,
      countData: response.data.countData || response.data.data.length
    }
  }
}

export const categoryService = new CategoryService()
