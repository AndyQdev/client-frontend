import { apiClient } from '../client'
import { ResponseMessage, QueryDto, StoreEntity } from '../types'

export class StoreService {
  private readonly basePath = '/store'

  /**
   * Get all stores with optional filters
   */
  async findAll(query?: QueryDto): Promise<{ data: StoreEntity[]; countData?: number }> {
    const response = await apiClient.get<ResponseMessage<StoreEntity[]>>(this.basePath, {
      params: query,
    })
    return {
      data: response.data.data,
      countData: response.data.countData,
    }
  }

  /**
   * Get store by slug
   */
  async findBySlug(slug: string): Promise<StoreEntity> {
    const response = await apiClient.get<ResponseMessage<StoreEntity>>(
      `${this.basePath}/slug/${slug}`
    )
    return response.data.data
  }

  /**
   * Get store by ID
   */
  async findById(id: string): Promise<StoreEntity> {
    const response = await apiClient.get<ResponseMessage<StoreEntity>>(
      `${this.basePath}/${id}`
    )
    return response.data.data
  }
}

export const storeService = new StoreService()
