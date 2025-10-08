// API REAL CONECTADA AL BACKEND
import 'server-only'

import { Store, Product, Category } from '@/lib/types'
import { storeService } from './api/services/store.service'
import { productService, ProductFilters } from './api/services/product.service'
import { mapStoreEntityToStore, mapProductEntityToProduct, mapCategoryEntityToCategory } from './api/mappers'

export async function getStoreBySlug(slug: string): Promise<Store | null> {
  try {
    const storeEntity = await storeService.findBySlug(slug)
    console.log('STORE ENTITY:', storeEntity)
    return mapStoreEntityToStore(storeEntity)
  } catch (error) {
    console.error('Error fetching store by slug:', error)
    return null
  }
}

export async function getStoreProducts(storeId: string, filters?: ProductFilters): Promise<Product[]> {
  try {
    const { data: productsData } = await productService.findByStore(storeId, filters)
    // Get store to access categories (productos ya vienen con category incluida del backend)
    const store = await storeService.findById(storeId)
    return productsData.map(p => mapProductEntityToProduct(p, store.categories))
  } catch (error) {
    console.error('Error fetching store products:', error)
    return []
  }
}

// Export ProductFilters type for use in components
export type { ProductFilters }

export async function getStoreCategories(storeId: string): Promise<Category[]> {
  try {
    const store = await storeService.findById(storeId)
    return store.categories?.map(mapCategoryEntityToCategory) || []
  } catch (error) {
    console.error('Error fetching store categories:', error)
    return []
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const productEntity = await productService.findById(id)
    return mapProductEntityToProduct(productEntity)
  } catch (error) {
    console.error('Error fetching product by id:', error)
    return null
  }
}

export async function getAllStores(): Promise<Store[]> {
  try {
    const { data } = await storeService.findAll({ limit: 100 })
    return data
      .filter(store => store.isActive)
      .map(mapStoreEntityToStore)
  } catch (error) {
    console.error('Error fetching all stores:', error)
    return []
  }
}
