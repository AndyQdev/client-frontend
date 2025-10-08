'use server'

import { getStoreProducts } from '@/lib/api'
import { Product } from '@/lib/types'

export async function filterProducts(
  storeId: string,
  search?: string,
  categoryId?: string | null
): Promise<Product[]> {
  const filters: any = {}

  if (search && search.trim()) {
    filters.search = search.trim()
  }

  if (categoryId) {
    filters.categoryId = categoryId
  }

  return await getStoreProducts(storeId, filters)
}
